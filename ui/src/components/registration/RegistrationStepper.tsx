import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MobileOtp from '../mobileOtp/MobileOtp';
const steps = ['Register', 'OTP Verification'];

type content = {
  step1?: any,  
}


const RegistrationStepper  = (props:any) => {  
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const childRef: null | {current: any} = React.useRef();  


  
  
  const handleNext = () => {
      
    if(activeStep === steps.length - 1) {
      
      childRef?.current?.verification()().then((res:any)=>{
        console.log(res)
      }).catch((err:any)=>{
        console.log(err)
      });
    }else{      
      childRef?.current?.saveIt()().then((res:any)=>{
        setActiveStep((prevActiveStep) => prevActiveStep + 1);   
      }).catch((err:any)=>{
        console.log(err)
      });  
    }            
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
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
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
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