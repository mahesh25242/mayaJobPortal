import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

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
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility'; 
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useParams, useNavigate } from "react-router-dom";
import { useSetNewPasswordMutation } from '../../../api/rtk/user';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';


export default function SetNewPassword(){
  
    const [loading, setLoading] = React.useState(false);
    let params = useParams();
    const childRef: null | {current: any} = React.useRef();  
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const [ setNewPassword ] = useSetNewPasswordMutation();

    const { register, handleSubmit, control, formState: { errors }, getValues, setError } = useForm({
        defaultValues: {
            newPassword: '', //"admin@mayajobs.com",            
        }
    });
    
    

    const onSubmit = (data:any) => {        
      setLoading(true);          
     
     const loginResponse = setNewPassword({...data, key: params?.key}).unwrap().then(res=>{      
      // setSnakMessage('Password changes successfully');
        console.log(res); 
        navigate("/sign-in");       
    }).catch(err=>{
      setError("newPassword",  { type: 'custom', message: err?.data?.message });
        console.log(err)
    }).finally(()=>{
      setLoading(false);          
    });
    };
   
    return (<>
    <Helmet>
        <title>Set New Password</title>
    </Helmet>    
    <h1>Set New Password</h1>
        <Stack component="form"             
            sx={{ p: '2px 4px',  alignItems: 'center' }}
            onSubmit={handleSubmit(onSubmit)}>
            
            <FormControl fullWidth>                    
                    <Controller
                        name="newPassword"
                        rules={{ required: { value: true, message: 'Password is required'} }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField                             
                            type={showPassword ? "text" : "password"} 
                            error={!!errors.newPassword}
                            helperText={ (errors.newPassword) ? errors.newPassword?.message: '' }
                            label="New password"
                            onChange={onChange} value={value} 
                            placeholder='Enter your New password'                            
                            sx={{ m: 1,  }}    
                            InputProps={{ // <-- This is where the toggle button is added.
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                  </InputAdornment>
                                )
                              }}                        
                          />
                        )}
                    />                   
                </FormControl>               

                
              
                <Grid container spacing={2}>
                    <Grid item xs={8}>                        
                        
                    </Grid>
                    <Grid item xs={4}>
                    <Button type="submit" variant="contained" disabled={loading}>
                            Save
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                                }}
                            />
                            )}
                    </Grid> 
                </Grid>

                
              
        </Stack></>
    );
}