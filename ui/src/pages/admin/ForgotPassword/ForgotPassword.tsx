import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    checkLogin,
    getAuth
  } from "../../../api/users/AuthenticationSlice";
import { useAppDispatch } from "../../../app/store";
import { Helmet } from 'react-helmet-async';
import { UserApi} from '../../../api/rtk/user';
import Grid from '@mui/material/Grid';
import { Link  } from 'react-router-dom';
import MobileOtp from '../../../components/mobileOtp/MobileOtp';
import React from "react";
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'



export default function ForgotPassword(){
    const [ mobile, setMobile] = React.useState('');
    const childRef: null | {current: any} = React.useRef();  
    const navigate = useNavigate();

    const { register, handleSubmit, control, formState: { errors }, getValues } = useForm({
        defaultValues: {
            mobile: '', //"admin@mayajobs.com",            
        }
    });
    const dispatch = useAppDispatch();
    const { token } = useSelector(getAuth);

    const onSubmit = (data:any) => {              
      if(mobile){
        childRef?.current?.verification()().then((res:any)=>{
            console.log(res)
          }).catch((err:any)=>{
            console.log(err)
          });
      }else{
        setMobile(getValues('mobile')); 
      }
      
    };
   
    return (<>
    <Helmet>
        <title>Forgot Password</title>
    </Helmet>    
    <h1>Forgot Password</h1>
        <Stack component="form"             
            sx={{ p: '2px 4px',  alignItems: 'center' }}
            onSubmit={handleSubmit(onSubmit)}>
                        
           {!mobile && <FormControl fullWidth>                    
                    <Controller
                        name={"mobile"}
                        rules={{ validate: matchIsValidTel }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <MuiTelInput
                            {...field}
                            defaultCountry="IN"
                            helperText={fieldState.invalid ? "Mobile is invalid" : ""}
                            error={fieldState.invalid}
                            placeholder="Mobile number"
                            label="Registered Mobile"                             
                            onChange={(e, contryCode) => field.onChange(contryCode?.numberValue)} 
                            splitCallingCode={true}
                          />
                        )}
                    />                   
                </FormControl>} 
                {mobile && <MobileOtp forgotPass={true} mobile={mobile} ref={childRef} childDom={<Button onClick={()=> setMobile('')}>Back to Forgot Password?</Button>}/>}
                          <br/>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Link to={'/sign-in'}>Back to Log In?</Link>
                        
                    </Grid>
                    <Grid item xs={4}>
                    <Button type="submit" variant="contained">
                            Retrieve Password
                        </Button>
                    </Grid> 
                </Grid>

                
              
        </Stack></>
    );
}