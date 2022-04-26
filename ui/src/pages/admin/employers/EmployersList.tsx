import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CreateJobSekkers from './CreateEmployer';
import { useDispatch } from 'react-redux';

import { setRegisterForm } from '../../../components/registration/registerFormSlice'
import { setOtpPhone } from '../../../components/mobileOtp/OtpMobileSlice'
import Search from '../Search';
import CustomSnackbar from '../../../components/snakBar/CustomSnackbar';
import { Helmet } from 'react-helmet-async';
import ListTable from './ListTable';
export default function EmployersList() {
  const [snakMessage, setSnakMessage] = React.useState<string>('');
  const [employer, setEmployer] = React.useState<any>(null);
  const [filters, setFilters] = React.useState<any>(null);

  const dispatch = useDispatch();



  const editEmployer = (employer: any) => {
    let empData = employer;
    
    if (employer) {
      empData = {
        ...employer, ...{
          email: employer?.user?.email,
          secondry_phone: employer?.phone,
          phone: employer?.user?.phone,
          contact_name: employer?.user?.name,
          id: employer?.user?.id,
          gender: employer?.seeker_preference?.gender,
          marital_status: employer?.seeker_preference?.marital,
          food_accommodation: employer?.seeker_preference?.food_accommodation,
          working_time: employer?.seeker_preference?.working_time,
          salary: employer?.seeker_preference?.salary,
          experience: employer?.seeker_preference?.experience,
          qualifications: employer?.seeker_preference?.qualifications,
          other_demands: employer?.seeker_preference?.other_demands,

        }
      }
    }
    console.log(empData)
    dispatch(setOtpPhone({ page: 'employer' }))
    dispatch(setRegisterForm({ employer: empData }));
    setEmployer(employer);
  };
  return (
    <TableContainer component={Paper}>
      <Helmet>
        <title>Employers</title>
      </Helmet>
      <CreateJobSekkers employer={employer} setEmployer={setEmployer} setSnakMessage={setSnakMessage} />
      <Typography gutterBottom variant="h5" component="div">
        Employers
      </Typography>
      <Button variant="contained" onClick={(e) => editEmployer({ id: 0 })}>Create New</Button>
      <Search setFilters={setFilters}/>

      <ListTable editEmployer={editEmployer} filters={filters} setFilters={setFilters} />
      {
        snakMessage && snakMessage.length > 0 && <CustomSnackbar message={snakMessage} setSnakMessage={setSnakMessage} />
      }

    </TableContainer>
  );
}
