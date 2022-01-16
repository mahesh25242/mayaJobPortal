import * as React from 'react';
import Typography from "@mui/material/Typography";
import { useGetBlogsQuery } from '../../api/rtk/blog'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';


export function BlogHome(){
    const { data, error, isLoading } = useGetBlogsQuery('')

    return (
        <div>
            <Typography gutterBottom variant="h5" component="div">
                Blog Home
            </Typography>
            {data && data.map((row:any) => <BlogCard blog={row}/>)}
        </div>
    );
}





function BlogCard(props: any) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.blog.image_path}
        alt={props.blog.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.blog.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.blog.description}
        </Typography>
      </CardContent>
      <CardActions>        
        <Button size="small">Detail</Button>
      </CardActions>
    </Card>
  );
}
