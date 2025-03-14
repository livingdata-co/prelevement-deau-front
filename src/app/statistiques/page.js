import {Box} from '@mui/material'

import {getStats} from '@/app/api/points-prelevement.js'
import Counter from '@/components/counter.js'
import Pie from '@/components/pie.js'

const Page = async () => {
  const stats = await getStats()
  const unactivExploitations = stats.exploitationsCount - stats.activExploitationsCount
  const {activExploitationsCount, exploitationsCount} = stats

  return (
    <Box className='flex flex-wrap justify-between items-center m-auto pt-8' sx={{maxWidth: '1200px'}}>
      <Box className='flex m-auto'>
        <Counter
          label='Nombre total d’exploitations :'
          number={exploitationsCount}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'end'
        }}
      >
        <Pie
          data={[
            {id: 'unactivExploitations', value: unactivExploitations, label: 'Exploitations terminées'},
            {id: 'activExploitations', value: activExploitationsCount, label: 'Exploitations en activité'}
          ]}
        />
      </Box>
    </Box>
  )
}

export default Page
