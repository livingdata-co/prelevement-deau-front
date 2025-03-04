'use client'

import {useCallback, useEffect, useRef} from 'react'

import {fr} from '@codegouvfr/react-dsfr'
import {Box} from '@mui/material'
import maplibre from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import {createRoot} from 'react-dom/client'

import Popup from './popup.js'
import photo from './styles/photo.json'
import planIGN from './styles/plan-ign.json'
import vectorIGN from './styles/vector-ign.json'
import vector from './styles/vector.json'

import {
  computeBestPopupAnchor,
  createUsagePieChart,
  createPointPrelevementFeatures
} from '@/lib/points-prelevement.js'

const SOURCE_ID = 'points-prelevement'
const styles = {
  photo,
  'plan-ign': planIGN,
  vector,
  'vector-ign': vectorIGN
}

function loadMap(map, points) {
  // Vérifie si la source existe déjà
  if (map.getSource(SOURCE_ID)) {
    // Si la source existe déjà, on met à jour ses données
    map.getSource(SOURCE_ID).setData(createPointPrelevementFeatures(points))
  } else {
    map.addSource(SOURCE_ID, {
      type: 'geojson',
      data: createPointPrelevementFeatures(points)
    })
  }

  // Vérifie si le layer existe déjà avant de l'ajouter
  if (!map.getLayer('points-prelevement-nom')) {
    map.addLayer({
      id: 'points-prelevement-nom',
      type: 'symbol',
      source: SOURCE_ID,
      layout: {
        'text-field': ['get', 'nom'],
        'text-anchor': 'bottom',
        'text-offset': ['get', 'textOffset']
      },
      paint: {
        'text-halo-color': '#fff',
        'text-halo-width': 2,
        'text-color': '#000'
      }
    })
  }
}

/**
 * Props attendues :
 *  - points : tableau complet des points (chargé côté serveur)
 *  - filteredPoints : tableau d'id (point.id_point) correspondant aux points à afficher
 *  - selectedPoint : point sélectionné (objet ou null)
 *  - handleSelectedPoint : callback recevant l'id du point sélectionné
 *  - style : style de la carte (photo, plan-ign, vector)
 */
const Map = ({points, filteredPoints, selectedPoint, handleSelectedPoint, style}) => {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const popupRef = useRef(null)

  // 1. On crée une ref pour stocker la valeur actuelle de `points`
  const pointsRef = useRef(points)

  // 2. À chaque fois que la prop `points` change, on met à jour la ref
  useEffect(() => {
    pointsRef.current = points
  }, [points])

  /**
   * Cache des markers :
   *  - clé : id unique (cluster_id ou id_point)
   *  - valeur : instance de maplibre.Marker
   */
  const markersCacheRef = useRef({})
  /** Markers actuellement ajoutés sur la carte */
  const markersOnScreenRef = useRef({})

  const updateMarkers = useCallback(() => {
    const map = mapRef.current
    if (!map || !map.isStyleLoaded()) {
      return
    }

    const newMarkers = {}
    const features = map.querySourceFeatures(SOURCE_ID)

    for (const feature of features) {
      const coords = feature.geometry.coordinates
      const props = feature.properties
      const id = props.id_point

      let marker = markersCacheRef.current[id]
      if (!marker) {
        const el = createUsagePieChart(props)

        if (!props.cluster && !el.dataset.eventsAttached) {
          el.dataset.eventsAttached = 'true'
          el.addEventListener('mouseenter', () => {
            map.getCanvas().style.cursor = 'pointer'
            const popupContainer = document.createElement('div')
            const root = createRoot(popupContainer)
            const hoveredPoint = pointsRef.current.find(
              point => point.id_point === props.id_point
            )
            root.render(<Popup point={hoveredPoint} />)

            // Supprimez l'ancienne popup si elle existe
            if (popupRef.current) {
              popupRef.current.remove()
            }

            // Créez une nouvelle popup avec l'ancre calculée
            const dynamicPopup = new maplibre.Popup({
              closeButton: false,
              closeOnClick: false,
              anchor: computeBestPopupAnchor(map, coords)
            })

            dynamicPopup
              .setLngLat(coords)
              .setDOMContent(popupContainer)
              .addTo(map)

            popupRef.current = dynamicPopup
          })

          el.addEventListener('mouseleave', () => {
            map.getCanvas().style.cursor = ''
            popupRef.current.remove()
          })
          el.addEventListener('click', () => {
            handleSelectedPoint(props.id_point)
            popupRef.current.remove()
          })
        }

        markersCacheRef.current[id] = new maplibre.Marker({element: el}).setLngLat(coords)
        marker = markersCacheRef.current[id]
      }

      newMarkers[id] = marker

      if (!markersOnScreenRef.current[id]) {
        marker.addTo(map)
      }
    }

    // Retire de la carte les markers qui ne sont plus visibles.
    for (const id in markersOnScreenRef.current) {
      if (!newMarkers[id]) {
        markersOnScreenRef.current[id].remove()
      }
    }

    markersOnScreenRef.current = newMarkers
  }, [handleSelectedPoint])

  // Création de la carte et attachement unique des événements
  useEffect(() => {
    if (!mapContainerRef.current) {
      return
    }

    const map = new maplibre.Map({
      container: mapContainerRef.current,
      style: styles[style],
      center: [55.55, -21.13],
      zoom: 10,
      debug: true,
      attributionControl: {compact: true}
    })

    popupRef.current = new maplibre.Popup({
      closeButton: false,
      closeOnClick: false
    })

    const scale = new maplibre.ScaleControl({
      maxWidth: 80,
      unit: 'metric'
    })
    map.addControl(scale, 'bottom-right')

    mapRef.current = map

    // Lors du chargement initial de la carte
    map.on('load', () => {
      loadMap(map, points)
      updateMarkers()
      // Attachez ces écouteurs une seule fois
      map.on('move', updateMarkers)
      map.on('moveend', updateMarkers)
      map.on('render', updateMarkers)
    })

    return () => {
      map.remove()
    }
    // Laisser le tableau de dépendances vide pour n'exécuter cet effet qu'une seule fois
  }, [updateMarkers, style, points])

  // Mise à jour de la source GeoJSON lorsque les points filtrés changent
  useEffect(() => {
    if (mapRef.current && mapRef.current.getSource(SOURCE_ID)) {
      const visiblePoints = points.filter(pt => filteredPoints.includes(pt.id_point))
      const newData = createPointPrelevementFeatures(visiblePoints)
      mapRef.current.getSource(SOURCE_ID).setData(newData)
    }
  }, [points, filteredPoints])

  // Met à jour le style du layer pour le point sélectionné
  useEffect(() => {
    const map = mapRef.current
    if (!map || !map.getLayer('points-prelevement-nom')) {
      return
    }

    if (selectedPoint) {
      map.setLayoutProperty(
        'points-prelevement-nom',
        'text-size',
        [
          'case',
          ['==', ['get', 'id_point'], selectedPoint.id_point],
          20,
          16
        ]
      )
      map.setPaintProperty(
        'points-prelevement-nom',
        'text-halo-color',
        [
          'case',
          ['==', ['get', 'id_point'], selectedPoint.id_point],
          fr.colors.getHex({isDark: true}).decisions.background.flat.blueFrance.default,
          '#fff'
        ]
      )
      map.setPaintProperty(
        'points-prelevement-nom',
        'text-color',
        [
          'case',
          ['==', ['get', 'id_point'], selectedPoint.id_point],
          '#fff',
          '#000'
        ]
      )
    } else {
      map.setLayoutProperty('points-prelevement-nom', 'text-size', 16)
      map.setPaintProperty('points-prelevement-nom', 'text-halo-color', '#fff')
      map.setPaintProperty('points-prelevement-nom', 'text-color', '#000')
    }
  }, [selectedPoint])

  // Centrage et zoom sur le selectedPoint
  useEffect(() => {
    const map = mapRef.current
    if (map && selectedPoint) {
      const coords
        = selectedPoint.coordinates
        || (selectedPoint.geom && selectedPoint.geom.coordinates)
      if (coords) {
        map.flyTo({
          center: coords,
          zoom: 14,
          speed: 1.2,
          curve: 1.42
        })
      }
    }
  }, [selectedPoint])

  // Gestion du changement de fond de carte (style)
  useEffect(() => {
    if (mapRef.current && style) {
      mapRef.current.setStyle(styles[style])
      // Une fois le nouveau style chargé, ré-ajoutez la source et mettez à jour les markers
      mapRef.current.once('styledata', () => {
        loadMap(mapRef.current, points)
        updateMarkers()
      })
    }
  }, [style, points, updateMarkers])

  return (
    <Box className='flex h-full w-full relative'>
      <div ref={mapContainerRef} className='flex h-full w-full' />
    </Box>
  )
}

export default Map
