'use client'

import {useMemo} from 'react'

import {fr} from '@codegouvfr/react-dsfr'
import {BarChart} from '@mui/x-charts/BarChart'

import LegendChart from '@/components/prelevements/legend-chart.js'

function getColorForNature(index) {
  const colors = [
    fr.colors.decisions.artwork.major.greenTilleulVerveine.hover,
    fr.colors.decisions.artwork.major.greenBourgeon.hover,
    fr.colors.decisions.artwork.major.greenEmeraude.hover,
    fr.colors.decisions.artwork.major.greenMenthe.hover,
    fr.colors.decisions.artwork.major.greenArchipel.hover,
    fr.colors.decisions.artwork.major.blueEcume.hover,
    fr.colors.decisions.artwork.major.blueCumulus.hover,
    fr.colors.decisions.artwork.major.purpleGlycine.hover
  ]

  return colors[index % colors.length]
}

const DocumentChart = ({data}) => {
  const {xAxisData, series} = useMemo(() => {
    const groupedByYear = {}

    for (const item of data) {
      groupedByYear[item.annee] ||= {}
      groupedByYear[item.annee][item.nature] ||= 0
      groupedByYear[item.annee][item.nature]++
    }

    const natureTypes = [...new Set(data.map(item => item.nature))]
    const sortedYears = Object.keys(groupedByYear).sort()

    const seriesData = natureTypes.map(nature => ({
      label: nature,
      data: sortedYears.map(year => groupedByYear[year][nature] || 0),
      stack: 'total',
      color: getColorForNature(natureTypes.indexOf(nature))
    }))

    return {
      xAxisData: sortedYears,
      series: seriesData
    }
  }, [data])

  return (
    <div className='my-4'>
      <BarChart
        series={series}
        slotProps={{
          legend: {
            hidden: true
          }
        }}
        xAxis={[
          {
            data: xAxisData,
            scaleType: 'band',
            label: 'Année'
          }
        ]}
        yAxis={[
          {
            label: 'Nombre de documents'
          }
        ]}
        height={450}
      />
      <LegendChart series={series} />
    </div>
  )
}

export default DocumentChart
