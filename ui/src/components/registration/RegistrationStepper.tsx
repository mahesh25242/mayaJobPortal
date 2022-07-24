import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import MobileOtp from '../mobileOtp/MobileOtp';
import { useSaveSeekerMutation } from '../../api/rtk/jobSeeker';
import { useDispatch } from 'react-redux';
import { setRegisterForm } from './registerFormSlice';
import { useSaveEmployerMutation } from '../../api/rtk/Employer';
const steps = ['Register', 'OTP Verification'];



const RegistrationStepper  = (props:any) => {  
  const [activeStep, setActiveStep] = React.useState(0);  
  const childRef: null | {current: any} = React.useRef();  
  const dispatch = useDispatch();
  
  const [saveSeeker] = useSaveSeekerMutation();
  const [saveEmployer] = useSaveEmployerMutation();
  
  const handleNext = () => {
      
    if(activeStep === steps.length - 1) {
      
      childRef?.current?.verification()().then((res:any)=>{
        console.log(res)
      }).catch((err:any)=>{
        console.log(err)
      });
    }else{      
      childRef?.current?.saveIt()().then(()=>{
        console.log(childRef?.current)
        if(childRef?.current?.isSeeker){
          const ret = saveSeeker(childRef?.current?.formAllData()).unwrap();      
          return ret;
        }else{
          const ret = saveEmployer(childRef?.current?.formAllData()).unwrap();      
          return ret;
        }                  
      }).then((res:any)=>{        
        if(childRef?.current?.isSeeker){
          dispatch(setRegisterForm({ seeker: {...childRef?.current?.formAllData(), user_id: res?.user.id} }));
        }else{
          dispatch(setRegisterForm({ employer: {...childRef?.current?.formAllData(), user_id: res?.user.id} }));
        }
        

        setActiveStep((prevActiveStep) => prevActiveStep + 1); 
      }).catch((err:any)=>{
        if(err?.status === 422){        
          childRef?.current?.setErrors(err?.data?.errors)
        }
        
        console.log(err)
      });  
    }            
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
        
          
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <br/>
      <React.Fragment>
          {
            activeStep === 0 && <div>{React.cloneElement(props.children, {...props, ...{ref: childRef}})}</div>

          }
          {
            activeStep !== 0 && <MobileOtp ref={childRef}/>
          }
          
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {/* <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button> */}
            <Box sx={{ flex: '1 1 auto' }} />           
            <Button onClick={handleNext} variant="contained">
              {activeStep === steps.length - 1 ? 'Verify OTP' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
    </Box>
  );
};

export default RegistrationStepper;