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
import CreateJobSekkers from './CreateJobSekkers';
import { useDispatch, useSelector } from 'react-redux';
import { useGetSeekersQuery, useDeleteSeekerMutation } from '../../../api/rtk/jobSeeker'


import Link from '@mui/material/Link';


export default function JobSekkersList() {

    const [seeker, setSeeker] = React.useState<any>(null);

    const dispatch = useDispatch();    
    const { data, error, isLoading } = useGetSeekersQuery('')
    const [ deleteSeeker ] = useDeleteSeekerMutation();
    
    
  //   React.useEffect(() => {
  //     dispatch(fetchCategories());    
  // }, []);
  const delCat = (seeker: any) =>{
    deleteSeeker(seeker).unwrap().then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    });
  }
  return (
    <TableContainer component={Paper}>
        <CreateJobSekkers seeker={seeker} setSeeker={setSeeker}/>
       <Typography gutterBottom variant="h5" component="div">
          Job Sekkers
        </Typography>
      <Button variant="contained" onClick={(e)=> setSeeker({id: 0})}>Careate New</Button>
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
                <Link href='#' onClick={() => setSeeker(row)}>{row.name}</Link>
              </TableCell>
              <TableCell align="right">{row.status_text}</TableCell>              
              <TableCell align="right">                
                <Button onClick={() => delCat(row)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
