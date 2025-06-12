import {Badge} from '@codegouvfr/react-dsfr/Badge'
import Tag from '@codegouvfr/react-dsfr/Tag'
import {Speed} from '@mui/icons-material'
import {
  Alert,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import {format} from 'date-fns'

const Compteur = ({compteur, relevesIndex}) => (
  <>
    <Box className='my-4'>
      <Box className='flex justify-between items-center'>
        <Box className='flex items-center gap-2'>
          <Speed />
          <Typography className='fr-text--lead bold'>
            Compteur {compteur.numeroSerie ? `n°${compteur.numeroSerie}` : ''}
          </Typography>
          {!compteur.compteurVolumetrique && <Tag>Volumétrique</Tag>}
        </Box>

        <Badge severity='info'>
          {compteur.lectureDirecte ? 'Lecture directe' : 'Lecture indirecte'}
        </Badge>
      </Box>
    </Box>

    {compteur.signalementPanneOuChangement && (
      <Alert severity='info'>
        Une panne ou un changement de compteur a été signalé sur ce compteur.
      </Alert>
    )}

    {relevesIndex && relevesIndex.length > 0 ? (
      <Box className='mt-2'>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align='right'>Valeur</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {relevesIndex.map(row => (
                <TableRow key={`releve-${row.date}-${row.valeur}`}>
                  <TableCell>{format(new Date(row.date), 'dd/MM/yyyy')}</TableCell>
                  <TableCell align='right'>{row.valeur}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    ) : (
      <Alert severity='warning'>
        Aucun relevé trouvé pour ce compteur.
      </Alert>
    )}
  </>
)

export default Compteur
