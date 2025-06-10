import {Box, Typography} from '@mui/material'

import LabelWithIcon from '@/components/ui/label-with-icon.js'

const MandataireDetails = ({mandataire}) => (
  <Box className='mt-2'>
    <Box className='flex justify-between items-center mb-2'>
      <Typography gutterBottom variant='h6' className='flex items-center gap-1'>
        <Box className='flex items-center gap-2'>
          <div className='fr-icon-user-line' />
          Mandataire
        </Box>
      </Typography>

    </Box>
    <Typography
      color='primary'
      variant='h4'
    >
      {mandataire.raisonSociale}
    </Typography>

    <Box className='flex flex-col gap-1 my-2'>
      <LabelWithIcon icon='ri-at-line'>
        {mandataire.email && (
          <a href={`mailto:${mandataire.email}`}>{mandataire.email}</a>
        )}
      </LabelWithIcon>
      <LabelWithIcon icon='fr-icon-phone-line'>
        {mandataire.telephone && (
          <a href={`tel:${mandataire.telephone}`}>{mandataire.telephone}</a>
        )}
      </LabelWithIcon>
      <LabelWithIcon icon='fr-icon-home-4-line'>
        {mandataire.adresse}
      </LabelWithIcon>
    </Box>
  </Box>
)

export default MandataireDetails
