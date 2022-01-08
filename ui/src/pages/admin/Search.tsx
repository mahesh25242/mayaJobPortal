import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import React from "react";

export default function Search(props: any){
    const [val, setVal] = React.useState<DateRange<Date>>([null, null]);
console.log(val)
    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: '',
            category: '',
            joined_range:  null
        }
    });

    return <Box>
        <form>
        <FormControl fullWidth>                    
            <Controller
                name={"category"}                
                control={control}
                render={({ field: { onChange, value = '' } }) => (
                    <TextField                  
                    label="Category"
                    onChange={onChange} value={value} 
                    placeholder='Enter Category'                            
                    sx={{ m: 1,  }}                            
                    />
                )}
            />                   
        </FormControl>
        <FormControl fullWidth>                    
            <Controller
                name={"name"}                
                control={control}
                render={({ field: { onChange, value = '' } }) => (
                    <TextField                    
                    label="Name"
                    onChange={onChange} value={value} 
                    placeholder='Enter your Name'                            
                    sx={{ m: 1,  }}                            
                    />
                )}
            />                   
        </FormControl>


        <FormControl fullWidth>                    
            <Controller
                name={"joined_range"}
                control={control}
                render={({ field: { onChange, value  } }) => (
                    <DateRangePicker
                        startText="Join Date From"
                        endText="Join Date To"
                        value={value ?? [null, null]}
                        onChange={onChange}
                        inputFormat="dd/MM/yyyy"
                        renderInput={(startProps, endProps) => (
                        <>
                            <TextField {...startProps} />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField {...endProps} />
                        </>
                        )}
                    />            
                )}
            />                   
        </FormControl>  




        </form>
    </Box>;
}