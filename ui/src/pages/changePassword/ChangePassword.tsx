import * as React from 'react';
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { useChangePasswordMutation } from '../../api/rtk/user'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import CustomSnackbar from '../../components/snakBar/CustomSnackbar';

export default function ChangePassword(){
    const [snakMessage, setSnakMessage] = React.useState<string>('');
    const formSchema = Yup.object().shape({
        old_password: Yup.string()
          .required('Old Password is required'),
        new_password: Yup.string()
          .required('New Password is required')
          .min(4, 'New Password length should be at least 4 characters'),
        confirm_password: Yup.string()
          .required('Confirm Password is required')
          .oneOf([Yup.ref('new_password')], 'Passwords must and should match'),
      })

    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            old_password:  '',
            new_password:  '',
            confirm_password:  ''
        }
    });

    const [ changePassword ] = useChangePasswordMutation();

    const onSubmit = (data:any) => { 
        console.log(data)
      const loginResponse = changePassword(data).unwrap().then(res=>{
        setSnakMessage('Password changes successfully');
          console.log(res);        
      }).catch(err=>{
          console.log(err)
      });
    };

    return (
        <div>
            <Typography gutterBottom variant="h5" component="div">
                Change Password
            </Typography>
            <Stack component="form"                         
            onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth>                    
                    <Controller
                        name={"old_password"}                        
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                            error={!!errors.old_password}
                            helperText={ (errors.old_password) ? errors.old_password?.message: '' }
                            label="Old Password"
                            onChange={onChange} value={value} 
                            placeholder='Enter your Old Password'                            
                            sx={{ m: 1,  }}                            
                          />
                        )}
                    />                   
                </FormControl>

                <FormControl fullWidth>
                    <Controller
                        name={"new_password"}                        
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                            error={!!errors.new_password}
                            helperText={ (errors.new_password) ? errors.new_password?.message: '' }
                            label="New password"
                            onChange={onChange} value={value} 
                            placeholder='Enter your New password'                            
                            sx={{ m: 1,  }}                            
                          />
                          )}
                        />
                </FormControl>

                <FormControl fullWidth>
                    <Controller
                        name={"confirm_password"}                        
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                            error={!!errors.confirm_password}
                            helperText={ (errors.confirm_password) ? errors.confirm_password?.message: '' }
                            label="Confirm password"
                            onChange={onChange} value={value} 
                            placeholder='Enter your Confirm password'                            
                            sx={{ m: 1,  }}                            
                          />
                          )}
                        />
                </FormControl>
                                
                <Button variant="contained" color="primary" type="submit">
                    Change Password
                </Button>

                {
                    snakMessage && snakMessage.length >0 && <CustomSnackbar message={snakMessage} setSnakMessage={setSnakMessage}/>
                } 
            </Stack>
        </div>        
    )
}    