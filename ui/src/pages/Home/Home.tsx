import Registration from '../../components/registration/Registration';
import SearchBar from '../../components/searchBar/SearchBar';
import { BlogHome } from '../blog/BlogHome';
import { Helmet } from 'react-helmet-async';
import Paper from '@mui/material/Paper';

const Home = () => {
  return (<>
    <Helmet>
      <title>Home</title>    
    </Helmet>
    <Paper elevation={5} sx={{ padding: { xs: "10px", md: "25px" } }}  style={{   
      margin: "20px auto"      
    }}>
      <SearchBar />
    </Paper>    
    <Registration/>    
    <BlogHome />
    </>);
};

export default Home;