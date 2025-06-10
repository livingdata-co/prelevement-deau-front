import Alert from '@codegouvfr/react-dsfr/Alert'
import Button from '@codegouvfr/react-dsfr/Button'
import {Box, Typography} from '@mui/material'

import LabelWithIcon from '@/components/ui/label-with-icon.js'
import {getPreleveurURL} from '@/lib/urls.js'

const PreleveurDetails = ({preleveur}) => (
  <Box className='mt-2'>
    <Box className='flex justify-between items-center mb-2'>
      <Typography gutterBottom variant='h6' className='flex items-center gap-1'>
        <Box className='flex items-center gap-2'>
          <div className='fr-icon-user-line' />
          Préleveur
        </Box>
      </Typography>

      <Button
        priority='secondary'
        disabled={!preleveur.id_preleveur}
        linkProps={preleveur.id_preleveur ? {
          href: getPreleveurURL(preleveur),
          target: '_blank'
        } : undefined}
      >
        Consulter la fiche
      </Button>
    </Box>
    <Typography
      color='primary'
      variant='h4'
    >
      {preleveur.nom} {preleveur.prenom}
    </Typography>

    <Box className='flex flex-col gap-1 my-2'>
      <LabelWithIcon icon='ri-at-line'>
        {preleveur.email && (
          <a href={`mailto:${preleveur.email}`}>{preleveur.email}</a>
        )}
      </LabelWithIcon>
      <LabelWithIcon icon='fr-icon-phone-line'>
        {preleveur.telephone && (
          <a href={`tel:${preleveur.telephone}`}>{preleveur.telephone}</a>
        )}
      </LabelWithIcon>
      <LabelWithIcon icon='fr-icon-home-4-line'>
        {preleveur.adresse}
      </LabelWithIcon>
    </Box>

    {!preleveur.id_preleveur && (
      <Alert
        severity='warning'
        description='Ce préleveur n’a pas pu être identifié'
      />
    )}
  </Box>
)

export default PreleveurDetails
