import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export default function Home() {
    return (
        <div>
            <Helmet>
                <title>
                    Candidate Dashboard
                </title>
            </Helmet>

            <Profile />
        </div>
    );
}

const Profile = () => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                    zsas
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
                <Button size="small">Download PDF</Button>
            </CardActions>
        </Card>
    );
}