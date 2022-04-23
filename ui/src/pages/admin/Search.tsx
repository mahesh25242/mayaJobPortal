import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import React from "react";
import { Button, MenuItem } from "@mui/material";
import { useGetCategoriesQuery } from "../../api/rtk/Categories";

export default function Search(props: any) {
    const [val, setVal] = React.useState<DateRange<Date>>([null, null]);
    const { data, error, isLoading } = useGetCategoriesQuery('categories');

    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: '',
            category: '',
            joined_range: null
        }
    });

    const onSubmit = (data:any) => { 
        console.log(data);
    };

    return <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth>
                <Controller                    
                    name={"category"}
                    control={control}
                    render={({ field: { onChange, value = '' } }) => (
                        <TextField                                                        
                            fullWidth onChange={onChange} value={value} label={"Job Category"} select>
                            <MenuItem value={0}>
                                Please Select
                            </MenuItem>
                            {data && data.map((cat: any) => (
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
                        <TextField
                            label="Name"
                            onChange={onChange} value={value}
                            placeholder='Enter your Name'
                            sx={{ m: 1, }}
                        />
                    )}
                />
            </FormControl>


            <FormControl fullWidth>
                <Controller
                    name={"joined_range"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
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

            <Button type="submit" variant="contained">
                Search
            </Button>


        </form>
    </Box>;
}