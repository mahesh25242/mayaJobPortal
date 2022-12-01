
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

export default function RegisterButtons(){
    return(<Stack 
    direction={{ xs: 'column', md: 'row' }}
    sx={{ p: '2px 4px',  alignItems: 'center' }}>
       
        <Card sx={{ width: {xs: '100%', md: '50%'}, marginBottom: {xs: '20px', md: '0'}, marginRight: {xs: '0', md: '10px'} , padding: '10px' }}>
            <CardContent>
                <Typography  color="text.secondary" component="div" variant="h5">
                    I need a job, Create your C.V. for free
                </Typography>
                <br/>
                <Button 
                    variant="contained" color="primary"
                    component={RouterLink} to="register/employee">Employee Register</Button>
            </CardContent>
        </Card>  

        <Card sx={{ width: {xs: '100%', md: '50%'}, marginLeft: {xs: '0', md: '10px'}, padding: '10px' }}>
            <CardContent>
                <Typography  color="text.secondary" component="div" variant="h5">
                    I need a staff, Create your company details
                </Typography>
                <br/>
                <Button 
                    component={RouterLink} to="register/employer"
                    variant="contained" color="primary">Employer Register</Button>
            </CardContent>
        </Card>               
    </Stack>)
}