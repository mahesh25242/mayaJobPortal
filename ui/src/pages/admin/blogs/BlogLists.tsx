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
import CreateBlog from './CreateBlog';
import { useDispatch, useSelector } from 'react-redux';
import { useGetBlogsQuery, useDeleteBlogMutation, blogsApi } from '../../../api/rtk/blog'


import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import CustomSnackbar from '../../../components/snakBar/CustomSnackbar';

import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function BlogListList() {  
    
    
    const [blog, setBlog] = React.useState<any>(null);
    const [snakMessage, setSnakMessage] = React.useState<string>('');

    const dispatch = useDispatch();    
    const { data, error, isLoading } = useGetBlogsQuery('')
    const [ deleteBlog ] = useDeleteBlogMutation();
    
    
    React.useEffect(() => {      
      dispatch(blogsApi.util.invalidateTags(['Blogs']))        
    }, []);
  const delBlog = (blog: any) =>{
    const isDelete = window.confirm('Are you sure you want to delete this blog?');
    if(isDelete){
      deleteBlog(blog).unwrap().then(res=>{
        console.log(res);
        setSnakMessage('blog deleted successfully');
      }).catch(err=>{
        console.log(err);
      });
    }    
  }
  return (<>
    <Helmet>
        <title>Blogs</title>
    </Helmet>
    <Typography gutterBottom variant="h5" component="div">
        <Grid container spacing={2}>
              <Grid item md={10}>
              Blogs
              </Grid>
              <Grid item md={2} >
                <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" onClick={(e)=> setBlog({id: 0, status: 0})}>Create New</Button>
                </Box>
              </Grid>
          </Grid>
          
          
        </Typography>    

    <TableContainer component={Paper}>
      
        <CreateBlog blog={blog} setBlog={setBlog} setSnakMessage={setSnakMessage}/>       
      

      <Table  aria-label="simple table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Options</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row:any) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">
                <Link href='#' onClick={() => setBlog(row)}>{row.name}</Link>
              </TableCell>
              <TableCell align="right">{row.status_text}</TableCell>              
              <TableCell align="right">                
                <Button onClick={() => delBlog(row)}>Delete</Button>
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
    </>
  );
}
