import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";

export default function Login(){
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = (data:any) => { console.log(data) };
    return (<><h1>Login</h1>
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
                            onChange={onChange} value={value} 
                            placeholder='Enter your Password'                            
                            sx={{ m: 1,  }}                            
                          />
                        )}
                    />                   
                </FormControl>
                <Button type="submit" variant="contained">
                    Sign In
                </Button>
        </Stack></>
    );
}