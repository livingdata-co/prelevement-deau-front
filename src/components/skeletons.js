import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton
} from '@mui/material'

export const TableSkeleton = () => {
  const rows = 10 // Number of rows
  const columns = 7 // Number of columns

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Array.from({length: columns}).map((_, index) => (
              <TableCell key={index}>
                <Skeleton variant='text' width='100%' />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({length: rows}).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({length: columns}).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton variant='rectangular' width='100%' height={20} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
