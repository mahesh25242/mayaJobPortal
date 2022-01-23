import Header from './header/Header';
import Footer from './footer/Footer';
import { Outlet } from 'react-router-dom';



export default function LayOut(pros: any) {
    return (
        <>
            <Header />  
            {/* {pros.children}           */}            
                <Outlet />            
            <Footer description={''} title={''} />
        </>
    );
}