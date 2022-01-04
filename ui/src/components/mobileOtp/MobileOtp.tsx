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
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';


const MobileOtp = forwardRef((props, ref:any) =>  {
    const [open, setOpen] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState<any>(null);
    

    const mobile = useSelector((state: RootState) => state.otpMobile.mobile)
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      
    const verify = (data:any) =>{        
        if(data?.code && confirmationResult){
          confirmationResult?.confirm(data?.code).then((result:any) => {
                console.log(result)
                // User signed in successfully.
                const user = result.user;
                localStorage.setItem("user", JSON.stringify(user));
                // ...
            }).catch((error:any) => {
                console.log(error);
                setOpen(true);            
            });
        }else{
          throw new Error('sms api not respond');    
        }        
    };
    
    const onError  = (errors:any) => {
      throw new Error('Validation failed');        
  };

  useEffect(() => {    
    PhoneOtp(`+91${mobile}`).then((confirmationResult) => {            
      setConfirmationResult(confirmationResult);                
    });    
  }, [mobile]);
    useImperativeHandle(ref, () => ({
      verification(){
        if(confirmationResult)
          return handleSubmit(verify, onError);
          

      }
  }));

    return (<><Paper  component="form"
    sx={{  display: 'flex', alignItems: 'center'}} 
    onSubmit={handleSubmit(verify)}>

<FormControl fullWidth>                    
                    <Controller
                        name={"code"}
                        rules={{ required: { value: true, message: 'Code is required'} }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                            error={!!errors.code}
                            helperText={ (errors.code) ? errors.code?.message: '' }
                            label="Code"
                            onChange={onChange} value={value} 
                            placeholder='Enter your OTP'                            
                            sx={{ m: 1,  }}                            
                          />
                        )}
                    />                   
                </FormControl>
                        
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Invalid OTP
        </Alert>
      </Snackbar>
   </Paper><Button>If not get Re-sent OTP?</Button></>);
});





export default MobileOtp;