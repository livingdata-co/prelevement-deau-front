'use client'

import {
  useCallback, useEffect, useMemo, useState
} from 'react'

import {Box} from '@mui/material'

import {getPointsPrelevement} from '@/app/api/points-prelevement.js'
import SidePanelLayout from '@/components/layout/side-panel.js'
import LoadingOverlay from '@/components/loading-overlay.js'
import Map from '@/components/map/index.js'
import MapFilters from '@/components/map/map-filters.js'
import SidePanel from '@/components/map/point-side-panel.js'
import {extractTypeMilieu, extractUsages} from '@/lib/points-prelevement.js'

const Page = () => {
  // État pour les données
  const [points, setPoints] = useState([])
  const [loading, setLoading] = useState(true)

  // États locaux pour l'interface
  const [selectedPoint, setSelectedPoint] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [filters, setFilters] = useState({
    name: '',
    typeMilieu: '',
    usages: []
  })
  const [filteredPoints, setFilteredPoints] = useState([])

  // Récupération des données côté client via l'API
  useEffect(() => {
    async function fetchPoints() {
      try {
        const points = await getPointsPrelevement()
        setPoints(points)
      } catch (error) {
        console.error('Erreur lors du chargement des points:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPoints()
  }, [])

  // Calculer les options pour les filtres dès que les données sont disponibles
  const {typeMilieuOptions, usagesOptions} = useMemo(() => {
    const typeMilieuOptions = points ? extractTypeMilieu(points) : []
    const usagesOptions = points ? extractUsages(points) : []

    return {typeMilieuOptions, usagesOptions}
  }, [points])

  // Gestion de la sélection d'un point sur la carte
  const handleSelectedPoint = useCallback(pointId => {
    const point = points.find(p => p.id_point === pointId)
    setSelectedPoint(point)
    setExpanded(true)
  }, [points])

  // Mise à jour des points filtrés en fonction des filtres
  useEffect(() => {
    const filtered = points.filter(point => {
      let matches = true

      if (filters.name) {
        matches &&= point.nom && point.nom.toLowerCase().includes(filters.name.toLowerCase())
      }

      if (filters.typeMilieu) {
        matches &&= point.typeMilieu === filters.typeMilieu
      }

      if (filters.usages && filters.usages.length > 0) {
        matches &&= filters.usages.some(usage => point.usages.includes(usage))
      }

      return matches
    })

    setFilteredPoints(filtered.map(point => point.id_point))
  }, [filters, points])

  return (
    <SidePanelLayout
      title={
        selectedPoint
          ? selectedPoint.nom || 'Pas de nom renseigné'
          : 'Aucun point sélectionné'
      }
      isOpen={expanded}
      handleOpen={setExpanded}
      panelContent={<SidePanel point={selectedPoint} />}
    >
      <Box className='flex h-full flex-col relative'>
        {loading && <LoadingOverlay />}
        {/* Barre de filtres */}
        <MapFilters
          filters={filters}
          typeMilieuOptions={typeMilieuOptions}
          usagesOptions={usagesOptions}
          onFilterChange={setFilters}
          onClearFilters={() =>
            setFilters({name: '', typeMilieu: '', usages: []})}
        />
        {/* Composant de la carte interactive */}
        <Map
          points={points}
          filteredPoints={filteredPoints}
          selectedPoint={selectedPoint}
          handleSelectedPoint={handleSelectedPoint}
        />
      </Box>
    </SidePanelLayout>
  )
}

export default Page
