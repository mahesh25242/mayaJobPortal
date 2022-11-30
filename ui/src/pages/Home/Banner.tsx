import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import { useBannersQuery } from '../../api/rtk/Setting';


const Item = (props: any) =>{    
    return (
        <Paper style={{height: '250px', background: `url(${props.item.image_path})`, backgroundSize:' contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>            
        </Paper>
    )
};

const Banner = () => {
    const { data, error, isLoading } = useBannersQuery('')  
  
    
    return (
        <div>   
            {
                data != null && <Carousel>
                {
                     data.map( (item:any, i:number) => item.image_path && <Item key={i} item={item} /> )
                }
                </Carousel>
            }         
            
        </div>
    )

}

export default Banner;