import { Helmet } from 'react-helmet-async';

export default function Home() {    
    return (
        <div>
            <Helmet>
                <title>
                    Admin Dashboard
                </title>
            </Helmet>
            <h1>Home</h1>
        </div>
    );
}