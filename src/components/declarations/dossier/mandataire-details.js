import {Box, Typography} from '@mui/material'

import LabelWithIcon from '@/components/ui/label-with-icon.js'
import SectionCard from '@/components/ui/section-card.js'

const MandataireDetails = ({mandataire}) => (
  <SectionCard
    title='Mandataire'
    icon='fr-icon-user-line'
  >
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
  </SectionCard>
)

export default MandataireDetails
