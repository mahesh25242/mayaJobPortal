import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { FormControl, MenuItem, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import { useGetCategoriesQuery } from '../../api/rtk/Categories'
import Button from '@mui/material/Button';

export default function SearchBar(){
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            type: 'employee',
            state: '',
            category: '',
            district: ''
        }
    });
    const onSubmit = (data:any) => console.log(data);
    const { data, error, isLoading } = useGetCategoriesQuery('categories')

    return(<Stack component="form" 
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: '2px 4px',  alignItems: 'center' }} 
        onSubmit={handleSubmit(onSubmit)}>  
                <FormControl fullWidth sx={{ marginBottom: { xs: "20px", md: "0" } }}>                    
                    <Controller
                        name={"state"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField fullWidth onChange={onChange} value={value} label={"State"} />                                                    
                        )}
                    />                   
                </FormControl>                 
                <Divider sx={{ height: 28, m: 0.5, display: { xs: "none", md: "block" }
 }} orientation="vertical" />
                <FormControl fullWidth sx={{ marginBottom: { xs: "20px", md: "0" } }}>                    
                    <Controller
                        name={"district"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField fullWidth onChange={onChange} value={value} label={"District"} />                                                    
                        )}
                    />                   
                </FormControl> 
                {
                    data && <>
                     <Divider sx={{ height: 28, m: 0.5, display: { xs: "none", md: "block" }
 }} orientation="vertical" />
                    <FormControl fullWidth sx={{ marginBottom: { xs: "20px", md: "0" } }}>                    
                       <Controller
                           name={"category"}
                           control={control}
                           render={({ field: { onChange, value = '' } }) => (
                           <TextField fullWidth onChange={onChange} value={value} label={"Job Category"} select>
                                { data.map((cat:any) => (
                                   <MenuItem key={cat.id} value={cat.id}>
                                   {cat.name}
                                   </MenuItem>
                               ))}
                           </TextField>
                           )}
                       />                   
                   </FormControl></>
                }
                
                <Divider sx={{ height: 28, m: 0.5, display: { xs: "none", md: "block" }
 }} orientation="vertical" />
                <FormControl fullWidth>                    
                    <Controller
                        name={"type"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <ToggleButtonGroup fullWidth onChange={onChange} value={value} exclusive>                                                    
                            <ToggleButton value="employee">Employee</ToggleButton>
                            <ToggleButton value="employeer">Employeer</ToggleButton>                            
                        </ToggleButtonGroup>
                        )}
                    />                   
                </FormControl>                 
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{
                    marginTop: '10px',
                    display: { xs: "block", md: "none" }
                    }}>Search</Button>
                <IconButton type="submit" sx={{ p: '10px', display: { xs: "none", md: "block" } }} aria-label="search">
                    <SearchIcon />
                </IconButton>                
    </Stack>);
};