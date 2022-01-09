import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { useChangePasswordMutation } from '../../api/rtk/user'



export default function ChangePassword(){
    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
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
                        rules={{ required: { value: true, message: 'Old Password is required'} }}
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
                        rules={{ required: { value: true, message: 'New Password is required'} }}
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
                        rules={{ required: { value: true, message: 'Confirm Password is required'} }}
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
            </Stack>
        </div>        
    )
}    