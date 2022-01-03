import { Button, FormControl, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { useDispatch, useSelector } from 'react-redux'
import { setOtpPhone } from '../OtpMobileSlice'
import { RootState } from "../../../app/store";

export default function JobSeeker(){
    const categories = [
        {
            id: 1,
            name: 'category 1'
        },
        {
            id: 2,
            name: 'category 2'
        }
    ]
    const { register, handleSubmit, control, formState: { errors }, getValues, watch } = useForm();
    
    const dispatch = useDispatch()
    const onSubmit = (data:any) => {
        dispatch(setOtpPhone( getValues('phone') ))
        console.log(data)
    };


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                <FormControl fullWidth>                    
                    <Controller
                        name={"category"}
                        rules={{ required: { value: true, message: 'Category is required'} }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField 
                        error={!!errors.category}
                        helperText={ (errors.category) ? errors.category?.message: '' }
                        fullWidth onChange={onChange} value={value} label={"Job Category"} select>
                             {categories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        )}
                    />                   
                </FormControl>
                <FormControl fullWidth>                    
                    <Controller
                        name={"name"}
                        rules={{ required: { value: true, message: 'Name is required'} }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField 
                        error={!!errors.name}
                        helperText={ (errors.name) ? errors.name?.message: '' }
                        fullWidth onChange={onChange} value={value} label={"Name"} />
                        )}
                    />                   
                </FormControl>

                <FormControl fullWidth>                    
                    <Controller
                        name={"email"}
                        rules={{ required: { value: true, message: 'Email is required'}, 
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        } }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField 
                        error={!!errors.email}
                        helperText={ (errors.email) ? errors.email?.message: '' }
                        fullWidth type="email" onChange={onChange} value={value} label={"Email"} />
                        )}
                    />                   
                </FormControl>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={2}>
                <FormControl fullWidth>                    
                    <Controller
                        name={"phone"}
                        rules={{ required: { value: true, message: 'Phone is required'} }}
                        control={control}
                        render={({ field: { onChange, value =  '' } }) => (
                        <TextField 
                        error={!!errors.phone}
                        helperText={ (errors.phone) ? errors.phone?.message: '' }
                        type="tel" fullWidth onChange={onChange} value={value} label={"Primay Phone"} />
                        )}
                    />                   
                </FormControl>

                <FormControl fullWidth>                    
                    <Controller
                        name={"secondry_phone"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField type="tel" fullWidth onChange={onChange} value={value} label={"Alternate Phone"} />
                        )}
                    />                   
                </FormControl>

                <FormControl fullWidth>                    
                    <Controller
                        name={"address"}  
                        rules={{ required: { value: true, message: 'Address is required'} }}                      
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField multiline
                        error={!!errors.address}
                        helperText={ (errors.address) ? errors.address?.message: '' }
                        maxRows={4} fullWidth onChange={onChange} value={value} label={"Address"} />
                        )}
                    />                   
                </FormControl>
            </Stack>
            
            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={2}>
                <FormControl fullWidth>                    
                    <Controller
                        name={"nationality"}
                        rules={{ required: { value: true, message: 'Nationality is required'} }}   
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField 
                        error={!!errors.nationality}
                        helperText={ (errors.nationality) ? errors.nationality?.message: '' }
                        type="tel" fullWidth onChange={onChange} value={value} label={"Nationality"} />
                        )}
                    />                   
                </FormControl>    

                <FormControl fullWidth>                    
                    <Controller
                        name={"state"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField fullWidth onChange={onChange} value={value} label={"State"} />
                        )}
                    />                   
                </FormControl>     

                <FormControl fullWidth>                    
                    <Controller
                        name={"district"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField  fullWidth onChange={onChange} value={value} label={"District"} />
                        )}
                    />                   
                </FormControl> 

                <FormControl fullWidth>                    
                    <Controller
                        name={"city"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField  fullWidth onChange={onChange} value={value} label={"City"} />
                        )}
                    />                   
                </FormControl>       
            </Stack>    

            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={2}>
                <FormControl fullWidth>                    
                    <Controller
                        name={"pin"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField  fullWidth onChange={onChange} value={value} label={"Pin"} />
                        )}
                    />                   
                </FormControl> 
                
                <FormControl fullWidth>                    
                    <Controller
                        name={"dob"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <MobileDatePicker
                            label="Date of birth"
                            inputFormat="dd/MM/yyyy"
                            value={value}
                            onChange={onChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        )}
                    />                   
                </FormControl>  

                <FormControl fullWidth>                    
                    <Controller
                        name={"gender"}
                        control={control}
                        render={({ field: { onChange, value = 'any' } }) => (
                        <TextField fullWidth onChange={onChange} value={value} label={"Gender"} select>                             
                            <MenuItem value="any">
                                Any
                            </MenuItem>                            
                            <MenuItem value="male">
                                Male
                            </MenuItem>                            
                            <MenuItem value="female">
                                Female
                            </MenuItem>                            
                        </TextField>
                        )}
                    />                   
                </FormControl>                
            </Stack>  
            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={2}>
                <FormControl fullWidth>                    
                    <Controller
                        name={"religion"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField  fullWidth onChange={onChange} value={value} label={"Religion"} />
                        )}
                    />                   
                </FormControl> 

                <FormControl fullWidth>                    
                    <Controller
                        name={"marital"}
                        control={control}
                        render={({ field: { onChange, value = 'any' } }) => (
                        <TextField fullWidth onChange={onChange} value={value} label={"Marital"} select>                             
                            <MenuItem value="any">
                                Any
                            </MenuItem>                            
                            <MenuItem value="single">
                                Single
                            </MenuItem>                            
                            <MenuItem value="married">
                                Married
                            </MenuItem>                            
                        </TextField>
                        )}
                    />                   
                </FormControl>   

                <FormControl fullWidth>                    
                    <Controller
                        name={"languages"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField  fullWidth onChange={onChange} value={value} label={"Languages Known"} />
                        )}
                    />                   
                </FormControl> 

            </Stack>

            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Save
            </Button>
        </form>
    );
};