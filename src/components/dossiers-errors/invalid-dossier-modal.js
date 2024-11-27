'use client'

import {
  useCallback, useEffect, useState
} from 'react'

import {Badge} from '@codegouvfr/react-dsfr/Badge'
import {Button} from '@codegouvfr/react-dsfr/Button'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  List,
  ListItemText,
  Collapse,
  ListItemButton,
  ListItemIcon,
  Box,
  CircularProgress
} from '@mui/material'

import {getDossier, getFile} from '@/app/api/dossiers.js'
import FileValidationErrors from '@/components/dossiers-errors/file-validation-errors.js'

const InvalidDossierModal = ({selectedDossier}) => {
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
                <div className='flex gap-2'>
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
    )
  )
}

export default InvalidDossierModal
