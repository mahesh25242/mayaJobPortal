import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { useBannersQuery } from '../../api/rtk/Setting';


const Item = (props: any) =>{
    console.log(props)
    return (
        <Paper style={{height: '200px'}}>
            <img src={props.item.image_path} />      
        </Paper>
    )
};

const Banner = () => {
    const { data, error, isLoading } = useBannersQuery('')
    

    

    return (
        <div>
            <Carousel>
            {
               data &&  data.map( (item:any, i:number) => item.image_path && <Item key={i} item={item} /> )
            }
            </Carousel>
        </div>
    )

}

export default Banner;