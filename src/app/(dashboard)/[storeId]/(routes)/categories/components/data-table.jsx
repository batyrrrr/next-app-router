
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CellAction } from './cell-action';


const DataTable = ({ data }) => {
  const headerRow = ['Name', 'Панель', 'Дата']
  console.log('data-id', data.id)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Категория</TableCell>
            <TableCell align='right'>Панель</TableCell>
            <TableCell align='right'>Дата создании</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align='right'>{item.billboardLabel}</TableCell>
              <TableCell align='right'>{item.createdAt}</TableCell>
              <TableCell align='right'>{<CellAction item={item} />}</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DataTable