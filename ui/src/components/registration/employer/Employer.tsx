import { Button, FormControl, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

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

export default function Employer(){
 
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const onSubmit = (data:any) => console.log(data);


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                <FormControl fullWidth>                    
                    <Controller
                        name={"category"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField fullWidth onChange={onChange} value={value} label={"Job Category"} select>
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
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField fullWidth onChange={onChange} value={value} label={"Company Name"} />
                        )}
                    />                   
                </FormControl>

                <FormControl fullWidth>                    
                    <Controller
                        name={"email"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField fullWidth type="email" onChange={onChange} value={value} label={"Email"} />
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
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField type="tel" fullWidth onChange={onChange} value={value} label={"Primay Phone"} />
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
                        name={"contact_name"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField  fullWidth onChange={onChange} value={value} label={"Contact Name"} />
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
                            control={control}
                            render={({ field: { onChange, value = '' } }) => (
                            <TextField multiline
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