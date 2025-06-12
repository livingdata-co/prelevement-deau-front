import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

const VolumesPompes = ({volumesPompes}) => (
  <Box className='mt-4'>
    <Typography gutterBottom variant='h6'>
      Volumes prélevés
    </Typography>
    <Box className='mt-2'>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Point de prélèvement</TableCell>
              <TableCell>Date / Année</TableCell>
              <TableCell align='right'>Volume (m³)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volumesPompes.map(row => (
              <TableRow key={`${row.pointPrelevement}-${row.datePrelevement || row.anneePrelevement}-${row.volumePompeM3}`}>
                <TableCell>{row.pointPrelevement}</TableCell>
                <TableCell>{row.datePrelevement || row.anneePrelevement}</TableCell>
                <TableCell align='right'>{row.volumePompeM3}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Box>
)

export default VolumesPompes
