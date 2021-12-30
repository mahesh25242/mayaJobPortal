import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { PhoneOtp } from '../../firebase/Firebase';
import { useForm, Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const VerifyOtp = (props: any) => {
    const [open, setOpen] = useState(true);

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      
    const verify = (data:any) =>{
        if(data?.code){
            props.confirmationResult.confirm(data?.code).then((result:any) => {
                console.log(result)
                // User signed in successfully.
                const user = result.user;
                localStorage.setItem("user", JSON.stringify(user));
                // ...
            }).catch((error:any) => {
                console.log(error);
                setOpen(true);            
            });
        }        
    };

    return (<Paper  component="form"
    sx={{ position: 'absolute', top: '7px', p: '2px 4px', display: 'flex', alignItems: 'center'}} 
    onSubmit={handleSubmit(verify)}>

<FormControl fullWidth>                    
                    <Controller
                        name={"code"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                            label="Code"
                            onChange={onChange} value={value} 
                            placeholder='Enter your OTP'                            
                            sx={{ m: 1,  }}                            
                          />
                        )}
                    />                   
                </FormControl>

   
    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
      <SendIcon />
    </IconButton>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Invalid OTP
        </Alert>
      </Snackbar>
   </Paper>);
};

const OtpSection = (props: any) => {    
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const sentOtp = (data:any) =>{
        if(data?.mobile){
            PhoneOtp(`+91${data?.mobile}`).then((confirmationResult) => {
                props.setConfirmationResult(confirmationResult);                
            });
        }
    };

    return (<Paper  component="form"
    sx={{ position: 'absolute', top: '7px', p: '2px 4px', display: 'flex', alignItems: 'center'}} 
    onSubmit={handleSubmit(sentOtp)}>

<FormControl fullWidth>                    
                    <Controller
                        name={"mobile"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                            label="Mobile"
                            onChange={onChange} value={value} 
                            placeholder='Enter your Mobile'
                            id="outlined-start-adornment"
                            sx={{ m: 1,  }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                            }}
                          />
                        )}
                    />                   
                </FormControl>

   
    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
      <SendIcon />
    </IconButton>
   </Paper>);
};

export default function MobileOtp() {
    
    const [confirmationResult, setConfirmationResult] = useState(null);

    return ( <>
    {
        !confirmationResult && <OtpSection  setConfirmationResult={setConfirmationResult}/>
    } 
    {
         confirmationResult && <VerifyOtp  confirmationResult={confirmationResult}/>
    }   
    </> );
}