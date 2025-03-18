'use client'

import {useMemo} from 'react'

import {fr} from '@codegouvfr/react-dsfr'
import {BarChart} from '@mui/x-charts/BarChart'

function getColorForStatus(index) {
  const colors = [
    fr.colors.decisions.artwork.major.greenBourgeon.active,
    fr.colors.decisions.artwork.major.redMarianne.active
  ]

  return colors[index % colors.length]
}

const RegularisationsCharts = ({data}) => {
  const {xAxisData, series} = useMemo(() => {
    const regimeData = data
    const sortedData = [...regimeData].sort((a, b) => b.nb_exploitations_concernees - a.nb_exploitations_concernees)
    const regimes = sortedData.map(item => item.regime)
    const seriesData = [
      {
        label: 'Exploitations autorisées',
        data: sortedData.map(item => item.nb_exploitations_autorisees),
        stack: 'total',
        color: getColorForStatus(0)
      },
      {
        label: 'Exploitations non autorisées',
        data: sortedData.map(item => item.nb_exploitations_non_autorisees),
        stack: 'total',
        color: getColorForStatus(1)
      }
    ]

    return {
      xAxisData: regimes,
      series: seriesData
    }
  }, [data])

  return (
    <div style={{width: '100%', height: 500, marginTop: '1em'}}>
      <BarChart
        series={series}
        xAxis={[
          {
            data: xAxisData,
            scaleType: 'band',
            label: 'Régime'
          }
        ]}
        yAxis={[
          {
            label: 'Nombre exploitations\n'
          }
        ]}
        height={450}
      />
    </div>
  )
}

export default RegularisationsCharts
