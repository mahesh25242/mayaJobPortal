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
import CreateJobSekkers from './CreateEmployer';
import { useDispatch, useSelector } from 'react-redux';
import { useGetEmployersQuery, useDeleteEmployerMutation } from '../../../api/rtk/Employer'


import Link from '@mui/material/Link';
import Search from '../Search';
import Alert from '@mui/material/Alert';

export default function EmployersList() {

    const [employer, setEmployer] = React.useState<any>(null);

    const dispatch = useDispatch();    
    const { data, error, isLoading } = useGetEmployersQuery('')
    const [ deleteEmployer ] = useDeleteEmployerMutation();
    
    
  //   React.useEffect(() => {
  //     dispatch(fetchCategories());    
  // }, []);
  const delEmployer = (employer: any) =>{
    deleteEmployer(employer).unwrap().then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    });
  }
  return (
    <TableContainer component={Paper}>
        
        <CreateJobSekkers employer={employer} setEmployer={setEmployer}/>
       <Typography gutterBottom variant="h5" component="div">
          Employers
        </Typography>
      <Button variant="contained" onClick={(e)=> setEmployer({id: 0})}>Careate New</Button>
      <Search /> 
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
          {data && data.map((row:any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">
                <Link href='#' onClick={() => setEmployer(row)}>{row.name}</Link>
              </TableCell>
              <TableCell align="right">{row.status_text}</TableCell>              
              <TableCell align="right">                
                <Button onClick={() => delEmployer(row)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
          {
            (!data || !data.length) && <TableRow><TableCell colSpan={4}><Alert severity="info">No result found!</Alert></TableCell></TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
