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
import { useGetCategoriesQuery } from "../../../api/rtk/Categories";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility'; 
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React from "react";
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'



const genders  = ["any", "male", "female"];
const maritalStatus  = ["any", "married", "unmarried"];

interface IFormValues {
    phone: string;
    category_id?: number;
    name?: string;
    email?: string;
    secondry_phone: string;
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
    password?: string;
    lat?: string;
    lng?: string;
    

  }
  
  
const Employer = forwardRef((props, empRef) =>  {
    // const mobile = useSelector((state: RootState) => state.otpMobile.mobile)
    const formData = useSelector((state: RootState) => state.registerForm?.employer)    
    const { register, handleSubmit, control, formState: { errors }, getValues, setValue, setError } = useForm<IFormValues>({
        defaultValues: {phone: '',...formData, ...{category_id: (formData?.category_id > 0) ? formData?.category_id : 0}}
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const dispatch = useDispatch()
    
    const { data, error, isLoading } = useGetCategoriesQuery('categories');
    
   
    useImperativeHandle(empRef, () => ({

        saveIt() {            
            return handleSubmit(onSubmit, onError);                        
        },
        formAllData(){
            return getValues();
        },
        setErrors(errors:any){            
            for(let err in errors){                
                setError((err as keyof IFormValues), { type: 'required', message: errors[err][0] })
            }
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
                        name={"category_id"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField 
                        error={!!errors.category_id}
                        helperText={ (errors.category_id) ? errors.category_id?.message: '' }

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
                        name={"password"}   
                        rules={{ required: { value: (!formData?.id) ? true : false, message: 'Password is required'} }}             
                        control={control}
                        render={({ field: { onChange, value =  '' } }) => (
                        <TextField 
                        error={!!errors.password}
                        helperText={ (errors.password) ? errors.password?.message: '' }
                        type={showPassword ? "text" : "password"} 
                        fullWidth onChange={onChange} value={value} label={"Password"} 
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}  
                        />
                        )}
                    />                   
                </FormControl>
                <FormControl fullWidth>                    
                    <Controller
                        name={"phone"}
                        rules={{ validate: matchIsValidTel }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <MuiTelInput
                            {...field}
                            defaultCountry="IN"
                            helperText={fieldState.invalid ? "Mobile is invalid" : ""}
                            error={fieldState.invalid}
                            placeholder="Primary Mobile number"
                            label="Primary Mobile"
                          />
                        )}
                    />                   
                </FormControl>
                {/* <FormControl fullWidth>                    
                    <Controller
                        name={"phone"}   
                        rules={{ required: { value: true, message: 'Primary Phone is required (with country code)'} }}             
                        control={control}
                        render={({ field: { onChange, value =  '' } }) => (
                        <TextField 
                        error={!!errors.phone}
                        helperText={ (errors.phone) ? errors.phone?.message: '' }
                        type="tel" fullWidth onChange={onChange} value={value} label={"Primay Phone (with country code)"} />
                        )}
                    />                   
                </FormControl> */}

                <FormControl fullWidth>                    
                    <Controller
                        name={"secondry_phone"}
                        rules={{ validate: matchIsValidTel }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <MuiTelInput
                            {...field}
                            defaultCountry="IN"
                            helperText={fieldState.invalid ? "Mobile is invalid" : ""}
                            error={fieldState.invalid}
                            placeholder="Alternate Mobile number"
                            label="Alternate Mobile"
                          />
                        )}
                    />                   
                </FormControl>

                {/* <FormControl fullWidth>                    
                    <Controller
                        name={"secondry_phone"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                        <TextField  type="tel" fullWidth onChange={onChange} value={value} label={"Alternate Phone"} />
                        )}
                    />                   
                </FormControl> */}

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