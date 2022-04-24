import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useLoggedUserQuery } from '../../../api/rtk/user';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setOtpPhone } from '../../../components/mobileOtp/OtpMobileSlice';
import { setRegisterForm } from '../../../components/registration/registerFormSlice';
import CreateJobSekkers from '../../admin/jobSekkers/CreateJobSekkers';

export default function Home() {
    return (
        <div>
            <Helmet>
                <title>
                    Employer Dashboard
                </title>
            </Helmet>
            <Profile />

        </div>
    );
}

const Profile = () => {    
    const { data, error, isLoading } = useLoggedUserQuery('');  
    const [snakMessage, setSnakMessage] = React.useState<string>('');
    const [seeker, setSeeker] = React.useState<any>();    
    const dispatch = useDispatch();   

    const edit = () => {
        const seeker = {id : 0};
        dispatch(setOtpPhone( {page: 'seeker' } ))    
        dispatch(setRegisterForm({seeker: seeker}));
        setSeeker(seeker); 
    }

    return (<>
        <CreateJobSekkers seeker={seeker} setSeeker={setSeeker} setSnakMessage={setSnakMessage}/>      
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {data?.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {data?.phone}
                </Typography>
                <Typography variant="body2">
                    Click EDIT for edit your profile and Download PDF for download details in pdf format.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={edit}>Edit</Button>
                <Button size="small">Download PDF</Button>
            </CardActions>
        </Card>
        </>
    );
}