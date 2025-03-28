'use client'

import {useState, useEffect} from 'react'

import {getPointPrelevement} from '@/app/api/points-prelevement.js'
import LoadingOverlay from '@/components/loading-overlay.js'
import PointExploitations from '@/components/prelevements/point-exploitations.js'
import PointIdentification from '@/components/prelevements/point-identification.js'
import PointLocalistation from '@/components/prelevements/point-localisation.js'
import PointTabs from '@/components/prelevements/point-tabs.js'

const PointLoader = ({id, selectedTab}) => {
  const [loading, setLoading] = useState(true)
  const [pointPrelevement, setPointPrelevement] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pointData = await getPointPrelevement(id)

        setPointPrelevement(pointData)
        setLoading(false)
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <LoadingOverlay />
  }

  return (
    <>
      <PointTabs selectedTab={selectedTab} />
      {selectedTab === 'identification' && (
        <PointIdentification pointPrelevement={pointPrelevement} />
      )}
      {selectedTab === 'localisation' && (
        <PointLocalistation pointPrelevement={pointPrelevement} />
      )}
      {selectedTab === 'exploitations' && (
        <PointExploitations pointPrelevement={pointPrelevement} />
      )}
    </>
  )
}

export default PointLoader
