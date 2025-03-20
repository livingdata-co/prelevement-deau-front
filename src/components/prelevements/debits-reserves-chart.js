'use client'

import {useState, useEffect} from 'react'

import {PieChart} from '@mui/x-charts/PieChart'

const DebitsReservesChart = ({data}) => {
  const [mounted, setMounted] = useState(false)

  const total = data.reduce((sum, item) => sum + item.nb_exploitations, 0)

  const chartData = data.map(item => ({
    id: item.debit_reserve,
    value: item.nb_exploitations,
    label: item.debit_reserve,
    percentage: ((item.nb_exploitations / total) * 100).toFixed(2) + '%'
  }))

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className='w-full h-[500px] flex justify-center'>
      <PieChart
        series={[
          {
            data: chartData,
            highlightScope: {faded: 'global', highlighted: 'item'},
            arcLabel: item => `${item.percentage}`,
            arcLabelMinAngle: 45
          }
        ]}
        width={600}
        height={400}
        margin={{
          top: 50,
          bottom: 50,
          left: 50,
          right: 180
        }}
      />
    </div>
  )
}

export default DebitsReservesChart
