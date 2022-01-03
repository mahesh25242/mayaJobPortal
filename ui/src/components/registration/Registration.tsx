import { createRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Employer from './employer/Employer';
import JobSeeker from './jobSeeker/JobSeeker';
import { PhoneOtp } from '../../firebase/Firebase';
import Backdrop from '@mui/material/Backdrop';
import MobileOtp from '../mobileOtp/MobileOtp';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton';
import StepContent from '@mui/material/StepContent';
import RegistrationStepper from './RegistrationStepper';


function TabPanel(props:any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index:any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function Registration() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(true);
  

  


  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {      
    setOpen(!open);
  };

  

  


  return (
    <Box>
      <button type='button' onClick={handleToggle}>asas</button>
      {/* <button type='button' onClick={() => PhoneOtp('+919995453566')}>asas</button> */}
      {/* <Backdrop
        sx={{ position: "absolute", color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}        
      >
          
       <MobileOtp />
        
      </Backdrop> */}      
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Employer" {...a11yProps(0)} />
          <Tab label="Job Seekers" {...a11yProps(1)} />          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>    
        <RegistrationStepper >                        
          <Employer/>
        </RegistrationStepper>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RegistrationStepper>             
          <JobSeeker />
        </RegistrationStepper>        
      </TabPanel>      
    </Box>
  );
}
