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
import { useGetCategoriesQuery, useDeleteCategoryMutation } from '../../../api/rtk/Categories'


import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import CustomSnackbar from '../../../components/snakBar/CustomSnackbar';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function CategoriesList() {
  
    const [category, setCategory] = React.useState<any>(null);
    const [snakMessage, setSnakMessage] = React.useState<string>('');

    const dispatch = useDispatch();    
    const { data, error, isLoading } = useGetCategoriesQuery('categories')
    const [ deleteCategory ] = useDeleteCategoryMutation();
    
    
  //   React.useEffect(() => {
  //     dispatch(fetchCategories());    
  // }, []);
  const delCat = (category: any) =>{
    const isDelete = window.confirm('Are you sure you want to delete this category?');
    if(isDelete){
      deleteCategory(category).unwrap().then(res=>{
        console.log(res);
        setSnakMessage('Category deleted successfully');
      }).catch(err=>{
        console.log(err);
      });
    }    
  }
  return (<>
   <Helmet>
        <title>Categories</title>
      </Helmet>
      <Typography gutterBottom variant="h5" component="div">
        <Grid container spacing={2}>
              <Grid item md={10}>
              Categories
              </Grid>
              <Grid item md={2} >
                <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" onClick={(e)=> setCategory({id: 0, status: 1})}>Create New</Button>
                </Box>
              </Grid>
          </Grid>
          
          
        </Typography>    

    <TableContainer>
     
      {
        category?.id >= 0 && <CreateCategory category={category} setCategory={setCategory} setSnakMessage={setSnakMessage}/>
      }        
      
      <Table  aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Employers</TableCell>
            <TableCell align="right">Seeker</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Options</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row:any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">
                <Link href='#' onClick={() => setCategory(row)}>{row.name}</Link>
              </TableCell>
              <TableCell align="right">
                {row.employer_count}
              </TableCell>
              <TableCell align="right">
                {row.seeker_count}
              </TableCell>
              <TableCell align="right">{row.status_text}</TableCell>              
              <TableCell align="right">                
                <Button onClick={() => delCat(row)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
          {
            (!data || !data.length) && <TableRow><TableCell colSpan={4}><Alert severity="info">No result found!</Alert></TableCell></TableRow>
          }
        </TableBody>
      </Table>
      {
        snakMessage && snakMessage.length >0 && <CustomSnackbar message={snakMessage} setSnakMessage={setSnakMessage}/>
      }      
    </TableContainer>
    </>);
}
