import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useSaveBlogMutation } from '../../../api/rtk/blog'
import MenuItem from '@mui/material/MenuItem';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height:'85%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto'
};

export default function CreateBlog(props: any) {
    

    const { register, handleSubmit, control, formState: { errors }, setValue, getValues } = useForm({
        defaultValues: {
            name: props?.blog?.name ?? '',
            image: null,
            description: props?.blog?.description ?? '',
            meta_description: props?.blog?.meta_description ?? '',
            meta_keywords: props?.blog?.meta_keywords ?? '',
            id: props?.blog?.id ?? 0,
            status: props?.blog?.status ?? 1,
        }
    });

    React.useEffect(() => {
        setValue("name", props?.blog?.name ?? '');
        setValue("description", props?.blog?.description ?? '');
        setValue("meta_description", props?.blog?.meta_description ?? '');
        setValue("meta_keywords", props?.blog?.meta_keywords ?? '');
        setValue("id", props?.blog?.id ?? 0);
        setValue("status", +props?.blog?.status ?? 1);
    }, [props]);
  
    
  const handleClose = () => props?.setBlog(null);
const [ saveBlog ] = useSaveBlogMutation();
// const [login] = useLoginMutation();

      
  const onSubmit = (data:any) => { 
    console.log(data.description)
    const loginResponse = saveBlog(data).unwrap().then(res=>{
        


        console.log(res); 
        props.setSnakMessage(res.message);   
        handleClose();    
    }).catch(err=>{
        console.log(err)
    });
  };

  
  return (     
      <Modal
        open={!!props?.blog ?? false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Stack component="form"                         
            onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth>                    
                    <Controller
                        name={"name"}
                        rules={{ required: { value: true, message: 'Name is required'} }}
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField
                            error={!!errors.name}
                            helperText={ (errors.name) ? errors.name?.message: '' }
                            label="Name"
                            onChange={onChange} value={value} 
                            placeholder='Enter your Name'                            
                            sx={{ m: 1,  }}                            
                          />
                        )}
                    />                   
                </FormControl>

                <Button
                            variant="contained"
                            component="label"
                            >                                
                            {  (getValues("image") as any)?.name ? (getValues("image") as any)?.name : 'Choose Image' }                            
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => setValue("image", (e as any)?.target?.files?.[0])}
                            />
                            </Button>

       
    
                <FormControl fullWidth>                    
                    <Controller
                        name={"description"}                        
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (                            
                            <TextField  multiline                           
                            label="Description"
                            onChange={onChange} value={value} 
                            placeholder='Enter your Description'                            
                            sx={{ m: 1,  }}                            
                          />
                        )}
                    />                   
                </FormControl> 

                <FormControl fullWidth>                    
                    <Controller
                        name={"meta_description"}                        
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField  multiline                           
                            label="Meta Description"
                            onChange={onChange} value={value} 
                            placeholder='Enter your Meta Description'                            
                            sx={{ m: 1,  }}                            
                          />
                        )}
                    />                   
                </FormControl> 

                <FormControl fullWidth>                    
                    <Controller
                        name={"meta_keywords"}                        
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField  multiline                           
                            label="Meta Keywords"
                            onChange={onChange} value={value} 
                            placeholder='Enter your Meta Keywords'                            
                            sx={{ m: 1,  }}                            
                          />
                        )}
                    />                   
                </FormControl>                             
                <FormControl fullWidth>                    
                    <Controller
                        name={"status"}                        
                        control={control}
                        render={({ field: { onChange, value = '' } }) => (
                            <TextField  select                           
                            label="Status"
                            onChange={onChange} value={value} 
                            placeholder='Choose Status'                            
                            sx={{ m: 1,  }}                            
                          >
                            <MenuItem value={1}>
                                Publish
                            </MenuItem>
                              <MenuItem value={0}>
                               Save as Draft
                            </MenuItem>
                        </TextField>
                        )}
                    />                   
                </FormControl> 
                <div>
                    <Button type="button" variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                    { ' ' }
                    <Button type="submit" variant="contained">
                        Save
                    </Button>
                </div>                 

            </Stack>         
           
        </Box>
      </Modal>    
  );
}
