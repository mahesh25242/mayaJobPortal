import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import React from "react";
import { Button, MenuItem } from "@mui/material";
import { useGetCategoriesQuery } from "../../api/rtk/Categories";
import Grid from '@mui/material/Grid';

export default function Search(props: any) {
    const [val, setVal] = React.useState<DateRange<Date>>([null, null]);
    const { data, error, isLoading } = useGetCategoriesQuery('categories');

    const { register, handleSubmit, control, formState: { errors }, setValue, getValues } = useForm({
        defaultValues: {
            name: '',
            email: '',
            mobile: '',
            category: '',
            joined_range: null
        }
    });

    const resetForm = () => {
        setValue('name', '');
        setValue('email', '');
        setValue('mobile', '');
        setValue('category', '');
        setValue('joined_range', null);
        props.setFilters(getValues());
    }
    const onSubmit = (data: any) => {
        const postParms = {
            category: data.category,
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            start: data.joined_range ? data.joined_range[0].toISOString() : '',
            end: data.joined_range ? data.joined_range[1].toISOString() : '',
        }
        props.setFilters(postParms);
    };

    return <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
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
                </Grid>
                <Grid item md={6}  xs={12}>
                    <FormControl fullWidth>
                        <Controller
                            name={"name"}
                            control={control}
                            render={({ field: { onChange, value = '' } }) => (
                                <TextField
                                    label="Name"
                                    onChange={onChange} value={value}
                                    placeholder='Enter your Name'
                                />
                            )}
                        />
                    </FormControl>
                </Grid>

                <Grid item md={6}  xs={12}>
                    <FormControl fullWidth>
                        <Controller
                            name={"email"}
                            control={control}
                            render={({ field: { onChange, value = '' } }) => (
                                <TextField
                                    type="email"
                                    label="Email"
                                    onChange={onChange} value={value}
                                    placeholder='Enter your Name'
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={6}  xs={12}>
                    <FormControl fullWidth>
                        <Controller
                            name={"mobile"}
                            control={control}
                            render={({ field: { onChange, value = '' } }) => (
                                <TextField
                                    type="tel"
                                    label="Mobile"
                                    onChange={onChange} value={value}
                                    placeholder='Mobile'
                                />
                            )}
                        />
                    </FormControl>
                </Grid>

                <Grid item md={6}  xs={12}>
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
                </Grid>

                <Grid item md={6}  xs={12}>
                    <Box display="flex" justifyContent="space-around">
                    <Button type="submit" variant="contained">
                        Search
                    </Button>
                    <Button type="button" variant="outlined" onClick={resetForm} >
                        Reset
                    </Button>
                    </Box>
                   
                </Grid>
            </Grid>










        </form>
    </Box>;
}