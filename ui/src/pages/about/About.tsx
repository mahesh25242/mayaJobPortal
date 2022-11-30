import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';

export default function About(){
    return(<>
        <Helmet>
            <title>About Us</title>
        </Helmet>
        <Container fixed>
        <div>
            <p>
                Fiya.In Website Is Only For Job Activity. FIA is just a domain name. The registered name on the fia.in website is under the name Maya Accounting Online Training. 
            </p>
            
            <div>
            <h5>Office Address</h5>
                    MAYA ACCOUNTING ONLINE TRAINING CENTER
                    PMC 17 / 418,
                    MATTAMANA BUILDING,2 ND FLOOR,
                    OPP. MUNICIPAL OFFICE
                    PERUMBAVOOR P O
                    PERUMBAVOOR
                    ERNAKULAM DIST.
                    KERALA
                    INDIA- 683542

                    MOB :  09497550035 , OFFICE :04842595578 
                    Email: mayataxtraining@gmail.com
            </div>
        </div>
        </Container>
        
    </>);
}
    
