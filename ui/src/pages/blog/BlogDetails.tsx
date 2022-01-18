import * as React from 'react';
import { useParams } from "react-router-dom";
import { useGetABlogQuery } from '../../api/rtk/blog'


import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Helmet } from 'react-helmet-async';


const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BlogDetails() {
    let params = useParams();
    // let data = {
    //     name: '',
    //     updated_at: '',
    //     image_path: '',
    //     description: ''
    // };
  const [expanded, setExpanded] = React.useState(false);
  console.log(params?.id as string)
  const { data, error, isLoading } = useGetABlogQuery((params?.id as string));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (<>
    { data && <Card> 
        <Helmet>
        <title>{data.name}</title>
        {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
        </Helmet>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }        
        title={data.name}
        subheader={data.updated_at}
      />
      <CardMedia
        component="img"
        height="194"
        image={data?.image_path}
        alt={data?.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data?.description}
        </Typography>
      </CardContent>          
    </Card>
    }
  </>);
}

