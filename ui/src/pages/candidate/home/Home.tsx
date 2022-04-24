import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useLoggedUserQuery }  from '../../../api/rtk/user';
export default function Home() {    
    
    return (
        <div>
            <Helmet>
                <title>
                    Candidate Dashboard
                </title>
            </Helmet>

            <Profile  />
        </div>
    );
}

const Profile = () => {
    const { data, error, isLoading } = useLoggedUserQuery('');  
     
    return (
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
                <Button size="small">Edit</Button>
                <Button size="small">Download PDF</Button>
            </CardActions>
        </Card>
    );
}