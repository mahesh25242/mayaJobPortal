import Header from './header/Header';
import Footer from './footer/Footer';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';


export default function LayOut(pros: any) {
    return (
        <>
            <Header />  
            {/* {pros.children}           */}
            <Container>
                <Outlet />
            </Container>            
            <Footer description={''} title={''} />
        </>
    );
}