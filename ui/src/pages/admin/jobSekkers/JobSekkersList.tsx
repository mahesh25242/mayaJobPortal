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
import CustomSnackbar from '../../../components/snakBar/CustomSnackbar';
import { setOtpPhone } from '../../../components/mobileOtp/OtpMobileSlice'
import { setRegisterForm } from '../../../components/registration/registerFormSlice'

import Link from '@mui/material/Link';
import Search from '../Search';
import Alert from '@mui/material/Alert';

import { Helmet } from 'react-helmet-async';
import ListTable from './ListTable';

export default function JobSekkersList() {
    const [snakMessage, setSnakMessage] = React.useState<string>('');
    const [seeker, setSeeker] = React.useState<any>(null);
    const [filters, setFilters] = React.useState<any>(null);

    const dispatch = useDispatch();    
    const { data, error, isLoading } = useGetSeekersQuery('')
    const [ deleteSeeker ] = useDeleteSeekerMutation();
    
    
  //   React.useEffect(() => {
  //     dispatch(fetchCategories());    
  // }, []);
  const delCat = (seeker: any) =>{
    const conf =  window.confirm(`Are you sure you want to delete ${seeker.name}?`);
    if(conf){
      deleteSeeker(seeker).unwrap().then(res=>{
        console.log(res);
        setSnakMessage('seeker deleted successfully');
      }).catch(err=>{
        console.log(err);
      });
    }
    
  }

  const editSeeker = (seeker: any) =>{    
    let seekData = seeker;
    if(seeker){
      seekData = {...seeker, ...{
        email: seeker?.user?.email,
        phone: seeker?.user?.phone,                
        name: seeker?.user?.name,
        id: seeker?.user?.id,
      }}
    }    
    dispatch(setOtpPhone( {page: 'seeker' } ))    
    dispatch(setRegisterForm({seeker: seekData}));
    setSeeker(seeker); 
  };

  return (
    <TableContainer component={Paper}>
      <Helmet>
        <title>Job Seekers</title>
      </Helmet>
      <Typography gutterBottom variant="h5" component="div">
          Job Sekkers
        </Typography>      
        <CreateJobSekkers seeker={seeker} setSeeker={setSeeker} setSnakMessage={setSnakMessage} />       
        
      <Button variant="contained" onClick={(e)=> editSeeker({id: 0})}>Create New</Button>
      <Search setFilters={setFilters}/>
      
      <ListTable editSeeker={editSeeker} filters={filters} setFilters={setFilters}/>
      {
        snakMessage && snakMessage.length >0 && <CustomSnackbar message={snakMessage} setSnakMessage={setSnakMessage}/>
      } 
    </TableContainer>
  );
}
