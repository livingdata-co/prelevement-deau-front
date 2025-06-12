import {fr} from '@codegouvfr/react-dsfr'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {Alert, Box, Typography} from '@mui/material'

const Spreadsheet = ({file, downloadFile}) => (
  file ? (
    <Box
      key={file.id_file}
      className='flex flex-wrap justify-between'
    >
      <Box className='flex flex-col p-2'>
        <Typography>
          <Box component='span' className='pr-1' sx={{color: fr.colors.decisions.text.label.blueFrance.default}} />
          {file.storageKey}
        </Typography>
      </Box>

      <Button
        variant='contained'
        size='small'
        onClick={() => downloadFile(file.storageKey)}
      >
        Télécharger
      </Button>
    </Box>
  ) : (
    <Alert severity='error'>
      Aucun fichier trouvé
    </Alert>
  )
)

export default Spreadsheet
