import { Button, FormControl, Input, InputLabel, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { forwardRef, MutableRefObject, useEffect, useImperativeHandle, useMemo, useRef } from "react";

import { RootState } from '../../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { setOtpPhone } from '../../mobileOtp/OtpMobileSlice'
import { setRegisterForm } from '../registerFormSlice'
import { usePlacesWidget } from "react-google-autocomplete";

import {
    fetchCategories,
    categoryFetch
  } from "../../../api/catgories/CategorySlice";
  


// const categories = [
//     {
//         id: 1,
//         name: 'category 1'
//     },
//     {
//         id: 2,
//         name: 'category 2'
//     }
// ]
const genders  = ["any", "male", "female"];
const maritalStatus  = ["any", "married", "unmarried"];

interface IFormValues {
    phone?: string;
    category?: string;
    name?: string;
    email?: string;
    secondry_phone?: string;
    contact_name?: string;
    address?: string;
    country?: string;
    pin?: string;
    state?: string;
    district?: string;
    city?: string;
    gender?: string;
    marital_status?: string;
    food_accommodation?: string;
    working_time?: string;
    salary?: string;
    experience?: string;
    qualifications?: string;
    other_demands?: string,

    lat?: string;
    lng?: string;
    

  }
  
  
const Employer = forwardRef((props, empRef) =>  {
    // const mobile = useSelector((state: RootState) => state.otpMobile.mobile)
    const formData = useSelector((state: RootState) => state.registerForm?.employer)
    
    const { register, handleSubmit, control, formState: { errors }, getValues, setValue } = useForm<IFormValues>({
        defaultValues: formData
    });
    const dispatch = useDispatch()
    
    const { categories } = useSelector(categoryFetch);
    
    useEffect(() => {
        dispatch(fetchCategories());    
    }, []);
    useImperativeHandle(empRef, () => ({

        saveIt() {            
            return handleSubmit(onSubmit, onError);                        
        }
    
      }));
    

    const onSubmit = (data:any) => {
        dispatch(setOtpPhone( {mobile: getValues('phone'),page: 'employer' } ))        
        dispatch(setRegisterForm({employer: data}))        
    };

    const onError  = (errors:any) => {
        throw new Error('Validation failed');        
    };
 
    const { ref, autocompleteRef } = usePlacesWidget({
        apiKey:process.env.REACT_APP_GOOGLE_MAP_API,
        onPlaceSelected: (place) => {
            
            place.address_components.forEach((element:any) => {
                if(element.types.includes("locality")){
                    setValue("city", element.long_name)
                }
                if(element.types.includes("administrative_area_level_2")){
                    setValue("district", element.long_name)
                }
                if(element.types.includes("administrative_area_level_1")){
                    setValue("state", element.long_name)
                }
                if(element.types.includes("country")){
                    setValue("country", element.long_name)
                }
                if(element.types.includes("postal_code")){
                    setValue("pin", element.long_name)
                }
            });
            setValue('lat', place.geometry.location.lat());  
            setValue('lng', place.geometry.location.lng());  
            setValue('address', place.formatted_address);           
        },
        options: {
            // types: ["(regions)"],
            // componentRestrictions: { country: "ru" },
          },
      
      });
    
    

    return(
        <>
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
                             <MenuItem value={''}>
                                Please Select
                            </MenuItem>
                             {categories.categories && categories.categories.map((cat: any) => (
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
                            <TextField  
                            inputRef={ref}
                            error={!!errors.address}
                            helperText={ (errors.address) ? errors.address?.message: '' }
                             fullWidth onChange={onChange} value={value} label={"Address"} />
                            )}
                        />                   
                    </FormControl>

                    <FormControl fullWidth>                    
                        <Controller
                            name={"country"}
                            rules={{ required: { value: true, message: 'Country is required'} }}
                            control={control}
                            render={({ field: { onChange, value = '' } }) => (
                            <TextField 
                            error={!!errors.country}
                            helperText={ (errors.country) ? errors.country?.message: '' }
                             fullWidth onChange={onChange} value={value} label={"Country"} />
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
                            rules={{ required: { value: true, message: 'State is required'} }}
                            control={control}
                            render={({ field: { onChange, value = '' } }) => (
                            <TextField  
                            error={!!errors.state}
                            helperText={ (errors.state) ? errors.state?.message: '' }
                            fullWidth onChange={onChange} value={value} label={"State"} />
                            )}
                        />                   
                    </FormControl>
                    <FormControl fullWidth>                    
                        <Controller
                            name={"district"}
                            rules={{ required: { value: true, message: 'District is required'} }}
                            control={control}
                            render={({ field: { onChange, value = '' } }) => (
                            <TextField 
                            error={!!errors.district}
                            helperText={ (errors.district) ? errors.district?.message: '' }
                             fullWidth onChange={onChange} value={value} label={"District"} />
                            )}
                        />                   
                    </FormControl>
                    <FormControl fullWidth>                    
                        <Controller
                            name={"city"}
                            rules={{ required: { value: true, message: 'City is required'} }}
                            control={control}
                            render={({ field: { onChange, value = '' } }) => (
                            <TextField 
                            error={!!errors.city}
                            helperText={ (errors.city) ? errors.city?.message: '' }
                             fullWidth onChange={onChange} value={value} label={"City"} />
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
        </>
    );
});

export default Employer;