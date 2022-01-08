import Banner from './Banner';
import Registration from '../../components/registration/Registration';
import SearchBar from '../../components/searchBar/SearchBar';
import { BlogHome } from '../blog/BlogHome';
const Home = () => {
  return (<>
    <Banner />
    <SearchBar />
    <Registration/>    
    <BlogHome />
    </>);
};

export default Home;