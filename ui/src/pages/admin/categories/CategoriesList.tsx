import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CreateCategory from './CreateCategory';
import { useDispatch, useSelector } from 'react-redux';
import { categoryFetch, fetchCategories } from '../../../api/catgories/CategorySlice';

import Link from '@mui/material/Link';


export default function CategoriesList() {

    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();
    const { categories } = useSelector(categoryFetch);
    
    
    React.useEffect(() => {
      dispatch(fetchCategories());    
  }, []);
  
  return (
    <TableContainer component={Paper}>
        <CreateCategory open={open} setOpen={setOpen}/>
       <Typography gutterBottom variant="h5" component="div">
          Categories
        </Typography>
      <Button variant="contained" onClick={(e)=> setOpen(true)}>Careate New</Button>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Options</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.categories && categories.categories.map((row:any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">
                <Link href='#' onClick={() => setOpen(true)}>{row.name}</Link>
              </TableCell>
              <TableCell align="right">{row.status_text}</TableCell>              
              <TableCell align="right">                
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
