'use client'

import {
  useCallback, useEffect, useState
} from 'react'

import {Badge} from '@codegouvfr/react-dsfr/Badge'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemButton,
  ListItemIcon,
  Button,
  Box,
  Grid2 as Grid,
  CircularProgress
} from '@mui/material'
import {deburr, camelCase} from 'lodash-es'

import {getDossier, getFile} from '../../app/api/dossiers.js'

const ErrorToggleButton = ({onClick}) => (
  <Button variant='contained' size='small' onClick={onClick}>
    Voir plus
  </Button>
)

const InvalidDossierModal = ({selectedDossier}) => {
  const [openFiles, setOpenFiles] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [limit, setLimit] = useState(10)
  const [files, setFiles] = useState([])

  useEffect(() => {
    async function fetchDossier() {
      const dossier = await getDossier(selectedDossier.id)
      setFiles(dossier.files || [])
      setIsLoading(false)
    }

    fetchDossier()
  }, [selectedDossier.id])

  const toggleFile = useCallback(file => {
    setLimit(10)
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
    isLoading || files.length === 0 ? (
      <Box container>
        <CircularProgress />
      </Box>
    ) : (
      <List>
        {files.map(
          ({filename, errors, checksum}) => {
            const declarantErrors = errors.filter(({destinataire}) => destinataire === 'déclarant')
            const administrateurErrors = errors.filter(({destinataire}) => destinataire === 'administrateur')

            return (
              <div key={filename}>
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
                <Collapse unmountOnExit in={openFiles[filename]} timeout='auto'>
                  <List disablePadding component='div'>
                    {declarantErrors.length > 0 && (
                      <>
                        <ListItem style={{paddingLeft: '2rem'}}>
                          <Grid display='flex' flex={1} align='center' justifyContent='space-between'>
                            <Badge noIcon severity='warning'>
                              {`${declarantErrors.length} erreurs déclarant`}
                            </Badge>
                            <Button variant='contained' onClick={() => downloadFile({checksum, filename})}>
                              Télécharger
                            </Button>
                          </Grid>
                        </ListItem>

                        {declarantErrors.slice(0, limit).map(error => (
                          <ListItem key={`declarant-${camelCase(deburr(error.message))}`} style={{paddingLeft: '3rem'}}>
                            <ListItemIcon>
                              <ErrorOutlineIcon color='error' />
                            </ListItemIcon>
                            <ListItemText primary={`${error.message}`} />
                          </ListItem>
                        ))}

                        {declarantErrors.length > limit && (
                          <ErrorToggleButton onClick={() => setLimit(limit + 10)} />
                        )}
                      </>
                    )}
                    {administrateurErrors.length > 0 && (
                      <>
                        <ListItem style={{paddingLeft: '2rem', marginTop: '1rem'}}>
                          <Badge noIcon severity='error'>
                            {`${administrateurErrors.length} erreurs administrateur`}
                          </Badge>
                        </ListItem>

                        {administrateurErrors.slice(0, limit).map(error => (
                          <ListItem key={`admin-${camelCase(deburr(error.message))}`} style={{paddingLeft: '3rem'}}>
                            <ListItemIcon>
                              <ErrorOutlineIcon color='error' />
                            </ListItemIcon>
                            <ListItemText primary={`${error.message}`} />
                          </ListItem>
                        ))}

                        {administrateurErrors.length > limit && (
                          <ErrorToggleButton onClick={() => setLimit(limit + 10)} />
                        )}
                      </>
                    )}
                  </List>
                </Collapse>
              </div>
            )
          }
        )}
      </List>
    )
  )
}

export default InvalidDossierModal
