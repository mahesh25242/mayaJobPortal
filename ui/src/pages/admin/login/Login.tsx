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

export default function Login(){
    const navigate = useNavigate();

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: '', //"admin@mayajobs.com",
            password: '' //"123456"
        }
    });
    const dispatch = useAppDispatch();
    const { token } = useSelector(getAuth);

    const onSubmit = (data:any) => { 
        dispatch(checkLogin(data)).then((res) => {            
            dispatch(UserApi.util.invalidateTags(['LoggedUser']))             
            if(res?.payload?.role_id === 1){
                navigate("/admin");
            }else if(res?.payload?.role_id === 2){
                navigate("/employer");
            }else if(res?.payload?.role_id === 3){
                navigate("/candidate");
            }
        });                

    };
   
    return (<>
    <Helmet>
        <title>Login</title>
    </Helmet>    
    <h1>Login</h1>
        <Stack component="form"             
            sx={{ p: '2px 4px',  alignItems: 'center' }}
            onSubmit={handleSubmit(onSubmit)}>
            

            <FormControl fullWidth>                    
                    <Controller
                        name={"email"}
                        rules={{ required: { value: true, message: 'Email is required'} }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                            error={!!errors.email}
                            helperText={ (errors.email) ? errors.email?.message: '' }
                            label="Email"
                            onChange={onChange} value={value} 
                            placeholder='Enter your Email'                            
                            sx={{ m: 1,  }}                            
                          />
                        )}
                    />                   
                </FormControl>

                <FormControl fullWidth>                    
                    <Controller
                        name={"password"}
                        rules={{ required: { value: true, message: 'Password is required'} }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                            error={!!errors.password}
                            helperText={ (errors.password) ? errors.password?.message: '' }
                            label="Password"
                            type="password"
                            onChange={onChange} value={value} 
                            placeholder='Enter your Password'                            
                            sx={{ m: 1,  }}                            
                          />
                        )}
                    />                   
                </FormControl>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Link to={'/forgot-password'}>Forgot Password?</Link>
                        
                    </Grid>
                    <Grid item xs={4}>
                    <Button type="submit" variant="contained">
                            Sign In
                        </Button>
                    </Grid> 
                </Grid>

                
              
        </Stack></>
    );
}