import { Button, FormControl, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { useDispatch, useSelector } from 'react-redux'
import { setOtpPhone } from '../../mobileOtp/OtpMobileSlice'
import { RootState } from "../../../app/store";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { setRegisterForm } from '../registerFormSlice'
import { usePlacesWidget } from "react-google-autocomplete";
import { useGetCategoriesQuery } from "../../../api/rtk/Categories";




interface IFormValues {
    phone?: string;
    category_id?: number;
    name?: string;
    email?: string;
    secondry_phone?: string;
    address?: string;
    nationality?: string;
    dob?: string;
    gender?: string;
    marital?: string;
    languages?: string;
    religion?: string;
    password?: string;
    country?: string;
    pin?: string;
    state?: string;
    district?: string;
    city?: string;

    experience?: string;
    edu_qualification?: string;
    tech_qualification?: string;
    academic_profile?: string;
    expected_salary?: string;

    lat?: string;
    lng?: string;
    user: any;
    contact_name?: string;
}

const JobSeeker = forwardRef((props, seekRef) => {
    const formData = useSelector((state: RootState) => state.registerForm?.seeker)    
    const { register, handleSubmit, control, formState: { errors }, getValues, setValue } = useForm<IFormValues>({
        defaultValues: { ...formData, ...{ category_id: (formData?.category_id > 0) ? formData?.category_id : 0 } }
    });

    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetCategoriesQuery('categories');






    const onSubmit = (data: any) => {        
        dispatch(setRegisterForm({ seeker: data }))
        dispatch(setOtpPhone({ mobile: getValues('phone'), page: 'seeker' }))
    };
    const onError = (errors: any) => {
        throw new Error('Validation failed');
    };



    useImperativeHandle(seekRef, () => ({
        saveIt() {
            return handleSubmit(onSubmit, onError);

        },
        formAllData() {
            let data = getValues();
            data = { ...data, contact_name: data?.name };
            return data;
        }

    }));

    const { ref, autocompleteRef } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
        onPlaceSelected: (place) => {

            place.address_components.forEach((element: any) => {
                if (element.types.includes("locality")) {
                    setValue("city", element.long_name)
                }
                if (element.types.includes("administrative_area_level_2")) {
                    setValue("district", element.long_name)
                }
                if (element.types.includes("administrative_area_level_1")) {
                    setValue("state", element.long_name)
                }
                if (element.types.includes("country")) {
                    setValue("country", element.long_name)
                }
                if (element.types.includes("postal_code")) {
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

    return (
        <>
            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <FormControl fullWidth>
                    <Controller
                        rules={{ required: { value: true, message: 'Category is required' } }}
                        name={"category_id"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                                error={!!errors.category_id}
                                helperText={(errors.category_id) ? errors.category_id?.message : ''}

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
                        rules={{ required: { value: true, message: 'Name is required' } }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                                error={!!errors.name}
                                helperText={(errors.name) ? errors.name?.message : ''}
                                fullWidth onChange={onChange} value={value} label={"Name"} />
                        )}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <Controller
                        name={"email"}
                        rules={{
                            required: { value: true, message: 'Email is required' },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                                error={!!errors.email}
                                helperText={(errors.email) ? errors.email?.message : ''}
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
                        rules={{ required: { value: (!formData?.id) ? true : false, message: 'Passord is required' } }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                                error={!!errors.password}
                                helperText={(errors.password) ? errors.password?.message : ''}
                                type="password" fullWidth onChange={onChange} value={value} label={"Password"} />
                        )}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <Controller
                        name={"phone"}
                        rules={{ required: { value: true, message: 'Phone is required' } }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                                error={!!errors.phone}
                                helperText={(errors.phone) ? errors.phone?.message : ''}
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
                        name={"nationality"}
                        rules={{ required: { value: true, message: 'Nationality is required' } }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                                error={!!errors.nationality}
                                helperText={(errors.nationality) ? errors.nationality?.message : ''}
                                type="text" fullWidth onChange={onChange} value={value} label={"Nationality"} />
                        )}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <Controller
                        name={"address"}
                        rules={{ required: { value: true, message: 'Address is required' } }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                                inputRef={ref}
                                error={!!errors.address}
                                helperText={(errors.address) ? errors.address?.message : ''}
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
                        name={"country"}
                        rules={{ required: { value: true, message: 'Country is required' } }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                                error={!!errors.country}
                                helperText={(errors.country) ? errors.country?.message : ''}
                                type="text" fullWidth onChange={onChange} value={value} label={"Country"} />
                        )}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <Controller
                        name={"state"}
                        rules={{ required: { value: true, message: 'State is required' } }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                                error={!!errors.state}
                                helperText={(errors.state) ? errors.state?.message : ''}
                                fullWidth onChange={onChange} value={value} label={"State"} />
                        )}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <Controller
                        name={"district"}
                        rules={{ required: { value: true, message: 'State is required' } }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                                error={!!errors.district}
                                helperText={(errors.district) ? errors.district?.message : ''}
                                fullWidth onChange={onChange} value={value} label={"District"} />
                        )}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <Controller
                        name={"city"}
                        rules={{ required: { value: true, message: 'City is required' } }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                                error={!!errors.city}
                                helperText={(errors.city) ? errors.city?.message : ''}
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
                        name={"pin"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField fullWidth onChange={onChange} value={value} label={"Pin"} />
                        )}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <Controller
                        name={"dob"}
                        control={control}
                        render={({ field: { onChange, value = null } }) => (
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
                            <TextField fullWidth onChange={onChange} value={value} label={"Religion"} />
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
                            <TextField fullWidth onChange={onChange} value={value} label={"Languages Known"} />
                        )}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <Controller
                        name={"expected_salary"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField fullWidth onChange={onChange} value={value} label={"Expected Salary"} />
                        )}
                    />
                </FormControl>

            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={2}>
                <FormControl fullWidth>
                    <Controller
                        name={"edu_qualification"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField multiline fullWidth onChange={onChange} value={value} label={"Eductional Qualifications"} />
                        )}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <Controller
                        name={"tech_qualification"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField multiline fullWidth onChange={onChange} value={value} label={"Technical Qualifications"} />
                        )}
                    />
                </FormControl>

            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={2}>
                <FormControl fullWidth>
                    <Controller
                        name={"experience"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField multiline fullWidth onChange={onChange} value={value} label={"Work Experience"} />
                        )}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <Controller
                        name={"academic_profile"}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField multiline fullWidth onChange={onChange} value={value} label={"Academic Profile"} />
                        )}
                    />
                </FormControl>

            </Stack>
        </>
    );
});

export default JobSeeker;