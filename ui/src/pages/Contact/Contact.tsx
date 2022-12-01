import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function Contact(){
    return(<>
        <Helmet>
            <title>Contact Us</title>
        </Helmet>
        <Container fixed>
            
        <div>     
        <h1>Contact Us</h1>            
            <Card>
                <CardContent>                    
                   <Typography variant="h5" component="div">
                                MAYA ACCOUNTING ONLINE TRAINING CENTER
                            </Typography>
                            <Typography>
                                PMC 17 / 418,
                            </Typography>
                            <Typography >
                                MATTAMANA BUILDING,2 ND FLOOR,
                            </Typography>
                            <Typography>
                                OPP. MUNICIPAL OFFICE                   
                            </Typography>
                            <Typography>
                                PERUMBAVOOR P O                                      
                            </Typography>
                            <Typography>
                                PERUMBAVOOR
                            </Typography>
                            <Typography>
                                ERNAKULAM DIST.                   
                            </Typography>
                            <Typography>
                                KERALA, INDIA- 683542             
                            </Typography>
                            <Typography>
                                MOB :   <a href="tel://09497550035">09497550035</a> , OFFICE :<a href="tel://04842595578">04842595578</a>              
                            </Typography>
                            <Typography>
                                Email: <a href="mailto:mayataxtraining@gmail.com.com">mayataxtraining@gmail.com</a>
                            </Typography>
                </CardContent>                
            </Card>                    
        </div>
        </Container>
        
    </>);
}
    
