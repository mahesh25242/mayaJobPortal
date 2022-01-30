import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import RegistrationStepper from '../../components/registration/RegistrationStepper';
import Employer from "../../components/registration/employer/Employer";
import JobSeeker from "../../components/registration/jobSeeker/JobSeeker";


const RegisterEmployer = () => <>
  <h1>Register as a employer</h1>
  <RegistrationStepper><Employer/></RegistrationStepper>
</>;
const RegisterSeeker = () =>  <>
          <h1>Register as a job seeker</h1>
          <RegistrationStepper>      
            <JobSeeker/>
          </RegistrationStepper>
        </>;

export default function Register(){ 
   

    return (<>    
    
    <Routes>
            <Route path="/employer" element={<RegisterEmployer />} />                        
            <Route path="/employee" element={<RegisterSeeker /> } />                                           
        </Routes>                
        <Outlet />
      </>);
}


  