'use client'

import {
  useCallback, useEffect, useState
} from 'react'

import {Badge} from '@codegouvfr/react-dsfr/Badge'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {Person} from '@mui/icons-material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  List,
  ListItemText,
  Collapse,
  ListItemButton,
  ListItemIcon,
  Box,
  CircularProgress,
  Typography, Grid2 as Grid
} from '@mui/material'

import {getDossier, getFile} from '@/app/api/dossiers.js'
import DossierStateBadge from '@/components/demarches-simplifiees/dossier-state-badge.js'
import FileValidationErrors from '@/components/demarches-simplifiees/file-validation-errors.js'
import PrelevementTypeBadge from '@/components/demarches-simplifiees/prelevement-type-badge.js'

const DemandeurDetails = ({nom, prenom}) => (
  <Box className='mt-2'>
    <Typography gutterBottom variant='h6' className='flex items-center gap-1'>
      <Person />
      Demandeur
    </Typography>
    <Grid container spacing={2}>
      <Grid xs={6}>
        <Typography variant='body1' color='text.secondary'>
          <strong>Nom:</strong>
        </Typography>
      </Grid>
      <Grid xs={6}>
        <Typography variant='body1'>{nom}</Typography>
      </Grid>

      <Grid xs={6}>
        <Typography variant='body1' color='text.secondary'>
          <strong>Prénom:</strong>
        </Typography>
      </Grid>
      <Grid xs={6}>
        <Typography variant='body1'>{prenom}</Typography>
      </Grid>
    </Grid>
  </Box>
)

const DossierInfo = ({dateDepot, prelevementType, state}) => (
  <Box className='flex justify-between mt-2'>
    <Box className='flex flex-wrap gap-2'>
      <Typography variant='body1' color='text.secondary'>
        <strong>Date de dépôt:</strong>
      </Typography>
      <Typography variant='body1'>
        {new Intl.DateTimeFormat('fr-FR', {dateStyle: 'short'}).format(new Date(dateDepot))}
      </Typography>
    </Box>

    <Box className='flex gap-2 mb-2'>
      <DossierStateBadge value={state} />
      <PrelevementTypeBadge value={prelevementType} />
    </Box>
  </Box>
)

const DossierModal = ({selectedDossier}) => {
  const [openFiles, setOpenFiles] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [files, setFiles] = useState([])

  useEffect(() => {
    async function fetchDossier() {
      const dossier = await getDossier(selectedDossier.id)
      setFiles(dossier.files?.filter(({errors}) => errors.length > 0) || [])
      setIsLoading(false)
    }

    fetchDossier()
  }, [selectedDossier.id])

  const toggleFile = useCallback(file => {
    setOpenFiles(prev => ({...prev, [file]: !prev[file]}))
  }, [])

  const downloadFile = useCallback(async ({checksum, filename}) => {
    try {
      const file = await getFile(selectedDossier.id, checksum)
      const url = URL.createObjectURL(file)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download file', error)
    }
  }, [selectedDossier.id])

  return (
    <Box>
      <DossierInfo {...selectedDossier} />
      <DemandeurDetails {...selectedDossier.demandeur} />

      {isLoading && (
        <Box>
          <CircularProgress />
        </Box>
      )}

      {selectedDossier.errorsCount > 0 && files.length > 0 && (
        <Box className='mt-8'>
          <Typography variant='h6'>
            <ErrorOutlineIcon color='error' className='mr-1' />
            Erreurs
          </Typography>
          <List>
            {files.map(
              ({filename, errors, checksum}) => {
                const declarantErrors = errors.filter(({destinataire}) => destinataire === 'déclarant')
                const administrateurErrors = errors.filter(({destinataire}) => destinataire === 'administrateur')

                return (
                  <div key={filename}>
                    <div className='flex gap-2 items-center'>
                      <ListItemButton onClick={() => toggleFile(filename)}>
                        <ListItemText primary={filename} />
                        <ListItemIcon>
                          {declarantErrors.length > 0 && (
                            <div>
                              <Badge noIcon severity='warning'>
                                {declarantErrors.length}
                              </Badge>
                            </div>
                          )}
                          {administrateurErrors.length > 0 && (
                            <div style={{marginLeft: '8px'}}>
                              <Badge noIcon severity='error'>
                                {administrateurErrors.length}
                              </Badge>
                            </div>)}
                          {openFiles[filename] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemIcon>
                      </ListItemButton>
                      <Button
                        iconId='fr-icon-download-line'
                        title='Télécharger'
                        onClick={() => downloadFile({checksum, filename})}
                      />
                    </div>
                    <Collapse unmountOnExit in={openFiles[filename]} timeout='auto'>
                      <FileValidationErrors errors={errors} />
                    </Collapse>
                  </div>
                )
              }
            )}
          </List>
        </Box>
      )}
    </Box>
  )
}

export default DossierModal
