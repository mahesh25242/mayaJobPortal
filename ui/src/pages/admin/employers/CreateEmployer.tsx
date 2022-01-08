import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useSaveEmployerMutation } from '../../../api/rtk/Employer'


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

export default function CreateEmployer(props: any) {
    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: props?.employer?.name ?? '',
            description: props?.employer?.description ?? '',
            id: props?.employer?.id ?? 0
        }
    });

    React.useEffect(() => {
        setValue("name", props?.employer?.name ?? '');
        setValue("description", props?.employer?.description ?? '');
        setValue("id", props?.employer?.id ?? 0);
    }, [props]);
  
  const handleClose = () => props?.setEmployer(null);
const [ saveEmployer ] = useSaveEmployerMutation();
// const [login] = useLoginMutation();

  
    console.log(props);
  const onSubmit = (data:any) => { 
      console.log(data)
    const loginResponse = saveEmployer(data).unwrap().then(res=>{
        console.log(res);        
    }).catch(err=>{
        console.log(err)
    });
  };
  return (     
      <Modal
        open={!!props?.employer ?? false}
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
