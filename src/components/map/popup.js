import {Person, WaterDropOutlined} from '@mui/icons-material'
import {Box, Chip, Typography} from '@mui/material'

import {formatAutresNoms} from '@/lib/points-prelevement.js'

const Popup = ({point}) => {
  const {nom, autres_noms: autresNoms, beneficiaires, exploitation, usage, typeMilieu} = point
  return (
    <Box className='flex flex-col gap-2'>
      <Typography variant='h6'>{nom || 'Pas de nom renseigné'}</Typography>

      <Typography variant='caption'>
        {autresNoms ? formatAutresNoms(autresNoms) : 'Pas de nom renseigné'}
      </Typography>

      <Box>
        {beneficiaires.length > 0 ? (
          <Box className='flex items-center gap-1'>
            <Person /> {beneficiaires.length} bénéficiaire{beneficiaires.length > 1 ? 's' : ''}
          </Box>
        ) : (
          <Typography variant='caption'>Aucun bénéficiaire</Typography>
        )}
      </Box>

      <Box>
        {exploitation.length > 0 ? (
          <Box className='flex items-center gap-1'>
            <WaterDropOutlined /> {exploitation.length} exploitation{exploitation.length > 1 ? 's' : ''}
          </Box>
        ) : (
          <Typography variant='caption'>Aucun bénéficiaire</Typography>
        )}
      </Box>

      <Box className='flex gap-1'>
        <Chip label={usage} size='small' variant='outlined' />
        <Chip label={typeMilieu} size='small' />
      </Box>
    </Box>
  )
}

export default Popup
