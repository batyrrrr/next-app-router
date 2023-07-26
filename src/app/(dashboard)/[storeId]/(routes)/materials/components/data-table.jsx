
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CellAction } from './cell-action';


const DataTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Название</TableCell>
            <TableCell >В архиве</TableCell>
            <TableCell >В избранном</TableCell>
            <TableCell >Цена</TableCell>
            <TableCell >Категория</TableCell>
            <TableCell >Размер</TableCell>
            <TableCell >Цвет</TableCell>
            <TableCell align='right'>Дата</TableCell>
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
              <TableCell component="th" scope="row">
                {item.isArchived ? 'Да' : 'Нет'}
              </TableCell>
              <TableCell component="th" scope="row">
                {item.isFeatured ? 'Да' : 'Нет'}
              </TableCell>
              <TableCell component="th" scope="row">
                {item.price}
              </TableCell>
              <TableCell component="th" scope="row">
                {item.category}
              </TableCell>
              <TableCell component="th" scope="row">
                {item.size}
              </TableCell>
              <TableCell
                className='flex'
                component="th" scope="row">
                {item.color}
                <div className='
                w-5
                h-5
                border
                rounded-full
                '
                  style={{ backgroundColor: `${item.color}` }}
                ></div>
              </TableCell>
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