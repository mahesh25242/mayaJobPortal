import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { FormControl, MenuItem, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import { useGetCategoriesQuery } from '../../api/rtk/Categories';
import { useGetEmployersQuery } from '../../api/rtk/Employer';
import { useGetSeekersQuery } from '../../api/rtk/jobSeeker';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { usePlacesWidget } from "react-google-autocomplete";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export default function SearchBar(){
    const [loading, setLoading] = useState(false);

    const [filter , SetFilter] = useState(null);
    const { register, handleSubmit, control, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            type: 'employee',
            state: '',
            category: '',
            district: ''
        }
    });
    const onSubmit = (data:any) => {
        setLoading(true)
        SetFilter(data);        
    };
    const { data, error, isLoading } = useGetCategoriesQuery('categories');

    const { ref: refState } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
        onPlaceSelected: (place) => {
            console.log(place);
            place.address_components.forEach((element: any) => {                                                
                if (element.types.includes("administrative_area_level_1")) {
                    setValue("state", element.long_name)
                }              
            });           
        },
        options: {
            types: ["(regions)"],
            // componentRestrictions: { country: "ru" },
        },

    });

    const { ref: refDistrict } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
        onPlaceSelected: (place) => {
            console.log(place);
            place.address_components.forEach((element: any) => {                                
                if (element.types.includes("administrative_area_level_2")) {
                    setValue("district", element.long_name)
                }                
            });           
        },
        options: {
            types: ["(regions)"],
            // componentRestrictions: { country: "ru" },
        },

    });

    return(<>
    <h3>Search a Job or Staff Here</h3>
        <Stack component="form" 
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: '2px 4px',  alignItems: 'center' }} 
        onSubmit={handleSubmit(onSubmit)}>              
                <FormControl fullWidth sx={{ marginBottom: { xs: "20px", md: "0" } }}>                    
                    <Controller
                        name={"state"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField inputRef={refState} fullWidth onChange={onChange} value={value} label={"State"} />                                                    
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
                        <TextField inputRef={refDistrict} fullWidth onChange={onChange} value={value} label={"District"} />                                                    
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
                            <ToggleButton value="employee">Looking for a staff</ToggleButton>
                            <ToggleButton value="employeer">Looking for a job</ToggleButton>                            
                        </ToggleButtonGroup>
                        )}
                    />                   
                </FormControl>                 
                <LoadingButton
                loading={loading}                
              
                 type="submit" variant="contained" color="primary" fullWidth sx={{
                    marginTop: '10px',
                    display: { xs: "block", md: "none" }
                    }}>Search</LoadingButton>
                <LoadingButton 
                loading={loading}                
                variant="outlined"
              
                type="submit" sx={{ padding: '10px 0px', marginLeft: '10px', display: { xs: "none", md: "block" } }} aria-label="search">
                    <SearchIcon />
                </LoadingButton>                
    </Stack>
    {
        getValues("type")=="employee" && filter &&  <SearchEmployerResult loading={loading} filter={filter} setLoading={setLoading}/>
    }    
    {
         getValues("type")!=="employee" && filter &&  <SearchJobSeekerResult loading={loading} filter={filter} setLoading={setLoading}/>
    }
    </>);
};

function SearchEmployerResult(props: any){    
    const { data, error, isLoading } = useGetEmployersQuery(props.filter);        
      
    useEffect(() => {           
        props.setLoading(!!isLoading);
    }, [isLoading, props.loading]);
    let total = 0;
    if(data?.data?.total >= 0){
        total = data?.data?.total;
    }else{
        total = data?.data;
    }    
    return (<div style={{marginTop: '20px'}}>
        {
            total > 0 && <Alert severity="info">
                We found {total} job seeker(s) registered!
                <Link sx={{ml: 3}}                    
                    component={RouterLink} to="contact">Click Here to contact</Link>
            </Alert>
        }  
        {
            total === 0 && <Alert severity="info">No job seeker found!</Alert>
        }     
    </div>);
}

function SearchJobSeekerResult(props: any){
    const { data, error, isLoading } = useGetSeekersQuery(props.filter);
    useEffect(() => {           
        props.setLoading(!!isLoading);
    }, [isLoading, props.loading]);
    let total = 0;
    
    if(data?.data?.total >= 0){
        total = data?.data?.total;
    }else{
        total = data?.data;
    }
    total = total ?? 0;    
    return (<div style={{marginTop: '20px'}}>
        {
            total > 0 && <Alert severity="info">
                We found {total} employer(s) registered!
                <Link sx={{ml: 3}}                    
                    component={RouterLink} to="contact">Click Here to contact</Link>
            </Alert>
        }    
        {
            total === 0 && <Alert severity="info">No employer found!</Alert>
        }    
    </div>);
}