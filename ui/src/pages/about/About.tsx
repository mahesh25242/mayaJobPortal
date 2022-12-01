import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function About(){
    return(<>
        <Helmet>
            <title>About Us</title>
        </Helmet>
        <Container fixed>
            
        <div>     
        <h1>About Us</h1>            
            <Card>
                <CardContent>                    
                   <Grid container spacing={2}>                        
                        <Grid item md={4}>
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
                                MOB :  <a href="tel://09497550035">09497550035</a> , OFFICE :<a href="tel://04842595578">04842595578</a>              
                            </Typography>
                            <Typography>
                                Email: <a href="mailto:mayataxtraining@gmail.com.com">mayataxtraining@gmail.com</a>            
                            </Typography>
                        </Grid>    
                        <Grid item md={8}>
                            <Typography>
                                Fiya.In Website Is Only For Job Activity. FIA is just a domain name. The registered name on the fia.in website is under the name Maya Accounting Online Training. 
                            </Typography>
                        </Grid>                   
                    </Grid>
                </CardContent>                
            </Card>                    
        </div>
        </Container>
        
    </>);
}
    
