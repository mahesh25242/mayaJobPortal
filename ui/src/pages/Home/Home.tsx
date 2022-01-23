import Registration from '../../components/registration/Registration';
import SearchBar from '../../components/searchBar/SearchBar';
import { BlogHome } from '../blog/BlogHome';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (<>
    <Helmet>
      <title>Home</title>    
    </Helmet>
    
    <SearchBar />
    <Registration/>    
    <BlogHome />
    </>);
};

export default Home;