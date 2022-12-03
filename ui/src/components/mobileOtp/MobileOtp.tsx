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
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import {
  triggerRegister,
  setRegistration
} from "../../api/users/RegistartionSlice";
import { useNavigate } from "react-router-dom";

const MobileOtp = forwardRef((props:any, ref:any) =>  {
  const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState<any>(null);
    const mayaRegister = useSelector(setRegistration)?.register;
    const { otpMobile, registerForm } = useSelector((state: RootState) => state)
    const dispatch = useDispatch();
    const {  page } = otpMobile;

    const formData = registerForm[page as keyof typeof registerForm];
    
    const mobile = formData?.phone ?? props?.mobile;
    
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      
    const verify = (data:any) =>{  
      console.log({...formData, ...{page: page}})
      // dispatch(triggerRegister({postData: formData, page: page}));      
        if(data?.code && confirmationResult){
          confirmationResult?.confirm(data?.code).then(async (result:any) => {
              const user = result.user;
              if(props.forgotPass){
                // user?.phoneNumber
                navigate(`/set-new-password/${result._tokenResponse.idToken}`);
              }else{
                await dispatch(triggerRegister({...formData, ...{page: page, accessToken: result._tokenResponse.idToken}}));
                localStorage.setItem("user", JSON.stringify(user));
                navigate(`/sign-in`);
              }                                  
                                
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


  const sendSMsOTP = () =>{   
    if(mobile){      
      PhoneOtp(`${mobile}`).then((confirmationResult) => {             
        console.log(confirmationResult);   
        setConfirmationResult(confirmationResult);                
      }).catch(err=>{        
        console.error(err);
      }); 
    }else{
      throw new Error('no mobile number found');
    }    
  }
  useEffect(() => {    
    sendSMsOTP();
    
    return( () =>{
      console.log(confirmationResult);
    })
  }, []);
    useImperativeHandle(ref, () => ({
      verification(){
        if(confirmationResult){
          return handleSubmit(verify, onError);
        }
        return () => Promise.reject({});
          
          

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
   </Paper>
   {props?.childDom}
   OTP sent to your mobile <Button onClick={sendSMsOTP}>If not click here to Re-sent OTP?</Button>
   
   
   </>);
});





export default MobileOtp;