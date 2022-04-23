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

import { setRegisterForm } from '../../../components/registration/registerFormSlice'
import { setOtpPhone } from '../../../components/mobileOtp/OtpMobileSlice'
import Link from '@mui/material/Link';
import Search from '../Search';
import Alert from '@mui/material/Alert';
import CustomSnackbar from '../../../components/snakBar/CustomSnackbar';
import { Helmet } from 'react-helmet-async';

export default function EmployersList() {
  const [snakMessage, setSnakMessage] = React.useState<string>('');
    const [employer, setEmployer] = React.useState<any>(null);

    const dispatch = useDispatch();    
    const { data, error, isLoading } = useGetEmployersQuery('')
    const [ deleteEmployer ] = useDeleteEmployerMutation();
    
    
    
  //   React.useEffect(() => {
  //     dispatch(fetchCategories());    
  // }, []);
  const delEmployer = (employer: any) =>{
    const conf =  window.confirm(`Are you sure you want to delete ${employer.name}?`);
    if(conf){
      deleteEmployer(employer).unwrap().then(res=>{
        console.log(res);
        setSnakMessage('employer deleted successfully');
      }).catch(err=>{
        console.log(err);
      });
    }
    
  }

  const editEmployer = (employer: any) =>{    
    let empData = employer;
    if(employer){
      empData = {...employer, ...{
        email: employer?.user?.email,
        phone: employer?.user?.phone,                
        contact_name: employer?.user?.name,
        id: employer?.user?.id,
      }}
    }
    
    dispatch(setOtpPhone( {page: 'employer' } ))    
    dispatch(setRegisterForm({employer: empData}));
    setEmployer(employer); 
  };
  return (
    <TableContainer component={Paper}>
        <Helmet>
          <title>Employers</title>
        </Helmet>
        <CreateJobSekkers employer={employer} setEmployer={setEmployer} setSnakMessage={setSnakMessage}/>
       <Typography gutterBottom variant="h5" component="div">
          Employers
        </Typography>
      <Button variant="contained" onClick={(e)=> editEmployer({id: 0})}>Careate New</Button>
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
          { data && data?.data && data?.data?.data && data?.data?.data.map((row:any) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">
                <Link href='#' onClick={() => editEmployer(row) }>{row.name}</Link>
              </TableCell>
              <TableCell align="right">{row.status_text}</TableCell>              
              <TableCell align="right">                
                <Button onClick={() => delEmployer(row)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
          {
            (!data || !data?.data?.data.length) && <TableRow><TableCell colSpan={4}><Alert severity="info">No result found!</Alert></TableCell></TableRow>
          }
        </TableBody>
      </Table>
      {
        snakMessage && snakMessage.length >0 && <CustomSnackbar message={snakMessage} setSnakMessage={setSnakMessage}/>
      }  

    </TableContainer>
  );
}
