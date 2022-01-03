import { Button, FormControl, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { forwardRef, MutableRefObject, useEffect } from "react";

import { RootState } from '../../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { setOtpPhone } from '../OtpMobileSlice'

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
const genders  = ["any", "male", "female"];
const maritalStatus  = ["any", "married", "unmarried"];


  
const Employer = ()  => {
    // const mobile = useSelector((state: RootState) => state.otpMobile.mobile)
    const { register, handleSubmit, control, formState: { errors }, getValues, watch } = useForm();
    const dispatch = useDispatch()
    


    const onSubmit = (data:any) => {
        dispatch(setOtpPhone( getValues('phone') ))

        console.log(data)
    };
 

    

    return(
        <form onSubmit={handleSubmit(onSubmit)} >
            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                <FormControl fullWidth>                    
                    <Controller
                        rules={{ required: { value: true, message: 'Category is required'} }}
                        name={"category"}
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
                        fullWidth onChange={onChange} value={value} label={"Company Name"} />
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
                            }
                        }}
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
                        rules={{ required: { value: true, message: 'Primary Phone is required'} }}             
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
                        <TextField  type="tel" fullWidth onChange={onChange} value={value} label={"Alternate Phone"} />
                        )}
                    />                   
                </FormControl>

                <FormControl fullWidth>                    
                    <Controller
                        name={"contact_name"}
                        rules={{ required: { value: true, message: 'Contact Name is required'} }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField 
                        error={!!errors.contact_name}
                        helperText={ (errors.contact_name) ? errors.contact_name?.message: '' }
                        fullWidth onChange={onChange} value={value} label={"Contact Name"} />
                        )}
                    />                   
                </FormControl>
               
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={2}>
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

                    <FormControl fullWidth>                    
                        <Controller
                            name={"country"}
                            control={control}
                            render={({ field: { onChange, value = '' } }) => (
                            <TextField  fullWidth onChange={onChange} value={value} label={"Country"} />
                            )}
                        />                   
                    </FormControl>

                    <FormControl fullWidth>                    
                        <Controller
                            name={"pin"}
                            control={control}
                            render={({ field: { onChange, value = '' } }) => (
                            <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  fullWidth onChange={onChange} value={value} label={"Pin"} />
                            )}
                        />                   
                    </FormControl>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={2}>
                    <FormControl fullWidth>                    
                        <Controller
                            name={"state"}
                            control={control}
                            render={({ field: { onChange, value = '' } }) => (
                            <TextField  fullWidth onChange={onChange} value={value} label={"State"} />
                            )}
                        />                   
                    </FormControl>
                    <FormControl fullWidth>                    
                        <Controller
                            name={"distric"}
                            control={control}
                            render={({ field: { onChange, value = '' } }) => (
                            <TextField  fullWidth onChange={onChange} value={value} label={"Distric"} />
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
                        name={"gender"}
                        control={control}
                        render={({ field: { onChange, value = 'any' } }) => (
                        <TextField fullWidth onChange={onChange} value={value} label={"Gender Preference"} select>
                             {genders.map((gender) => (
                                <MenuItem key={gender} value={gender}>
                                {gender}
                                </MenuItem>
                            ))}
                        </TextField>
                        )}
                    />                   
                </FormControl>
                <FormControl fullWidth>                    
                    <Controller
                        name={"marital_status"}
                        control={control}
                        render={({ field: { onChange, value = 'any' } }) => (
                        <TextField fullWidth onChange={onChange} value={value} label={"Marital Preference"} select>
                            {maritalStatus.map((marital) => (
                                <MenuItem key={marital} value={marital}>
                                {marital}
                                </MenuItem>
                            ))}
                        </TextField>
                        )}
                    />                   
                </FormControl>

                <FormControl fullWidth>                    
                    <Controller
                        name={"food_accommodation"}
                        control={control}
                        render={({ field: { onChange, value = 'N/A' } }) => (
                        <TextField fullWidth onChange={onChange} value={value} label={"Food & Accommodation Preference"} select>
                            <MenuItem value="N/A">
                                N/A
                            </MenuItem>
                            <MenuItem value="Yes">
                                Yes
                            </MenuItem>
                            <MenuItem value="No">
                                No
                            </MenuItem>
                        </TextField>
                        )}
                    />                   
                </FormControl>

                <FormControl fullWidth>                    
                    <Controller
                        name={"working_time"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField fullWidth onChange={onChange} value={value} label={"Working Time"} />                            
                        )}
                    />                   
                </FormControl>

            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={2}>
                   <FormControl fullWidth>                    
                    <Controller
                        name={"salary"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField fullWidth onChange={onChange} value={value} label={"Starting Salary"} />                            
                        )}
                    />                   
                </FormControl> 

                <FormControl fullWidth>                    
                    <Controller
                        name={"experience"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField fullWidth onChange={onChange} value={value} label={"Experience"} />                            
                        )}
                    />                   
                </FormControl>
            
                

                

            </Stack>
            
            <Stack direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            mt={2}>
                <FormControl fullWidth>                    
                    <Controller
                        name={"qualifications"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField multiline fullWidth onChange={onChange} value={value} label={"Qualifications"} />                            
                        )}
                    />                   
                </FormControl>
                
                <FormControl fullWidth>                    
                    <Controller
                        name={"other_demands"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField multiline fullWidth onChange={onChange} value={value} label={"Other Demands"} />                            
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

export default Employer;