import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useSaveCategoryMutation } from '../../../api/rtk/Categories'
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateCategory(props: any) {
    const { register, handleSubmit, control, formState: { errors }, setValue, getValues,reset } = useForm({
        // defaultValues: {
        //     name: props?.category?.name ?? '',
        //     description: props?.category?.description ?? '',
        //     id: props?.category?.id ?? 0,
        //     status: !!props?.category?.status ?? 1,
        // }
    });
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        const status = !props?.category ? 1 : +props?.category?.status ?? 1;
        setValue("name", props?.category?.name ?? '');
        setValue("description", props?.category?.description ?? '');
        setValue("id", props?.category?.id ?? 0);
        setValue("status", status);        
    }, []);
  
  const handleClose = () => props?.setCategory(null);
const [ saveCategory ] = useSaveCategoryMutation();
// const [login] = useLoginMutation();

      
  const onSubmit = (data:any) => {  
    
    setLoading(true);     
    const loginResponse = saveCategory(data).unwrap().then(res=>{        
        props.setSnakMessage(res.message);   
        handleClose();    
    }).catch(err=>{
        console.log(err)
    }).finally(()=>{
      setLoading(false);    
    });
  };
  return (     
      <Modal
        open={!!props?.category ?? false}
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
                        name={"status"}                        
                        control={control}
                        render={({ field: { onChange, value = 1 } }) => (
                            <TextField  select                           
                            label="Description"
                            onChange={onChange} value={value} 
                            placeholder='Enter your Description'                            
                            sx={{ m: 1,  }}                            
                          >
                            <MenuItem value={1}>
                                Active
                            </MenuItem>
                              <MenuItem value={0}>
                                In Active
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
                    <Button type="submit" variant="contained" disabled={loading}>
                        Save
                    </Button>

                    {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                                }}
                            />
                            )}

                </div>                 

            </Stack>         
           
        </Box>
      </Modal>    
  );
}
