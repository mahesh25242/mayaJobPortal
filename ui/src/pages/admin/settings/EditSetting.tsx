import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useSaveSettingMutation } from '../../../api/rtk/Setting'


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

export default function EditSetting(props: any) {
    const { register, handleSubmit, control, formState: { errors }, setValue, getValues } = useForm({
        defaultValues: {            
            value: props?.setting?.value ?? '',
            id: props?.setting?.id ?? 0
        }
    });

   
  
  const handleClose = () => props?.setSetting(null);
const [ saveSetting ] = useSaveSettingMutation();
// const [login] = useLoginMutation();

      
  const onSubmit = (data:any) => {   
    
    
    const loginResponse = saveSetting(data).unwrap().then(res=>{        
        props.setSnakMessage(res.message);
        handleClose();       
    }).catch(err=>{
        console.log(err)
    });
  };

  console.log(getValues())
  const ValueComponents = (props:any) =>{
    if(props?.setting?.type == 'file'){
        return <Button
              variant="contained"
              component="label"
              >                                
              {  (getValues("value") as any)?.name ? (getValues("value") as any)?.name : 'Choose Image' }                            
              <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setValue("value", (e as any)?.target?.files?.[0])}
              />
              </Button>
    }else{
      return <FormControl fullWidth>                    
                <Controller
                    name={"value"}                        
                    control={control}
                    render={({ field: { onChange, value = '' } }) => (
                        <TextField  multiline                           
                        label="Value"
                        onChange={onChange} value={value} 
                        placeholder='Enter Value'                            
                        sx={{ m: 1,  }}                            
                      />
                    )}
                />                   
            </FormControl>
    }
  }
  return (     
      <Modal
        open={!!props?.setting ?? false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Stack component="form"                         
            onSubmit={handleSubmit(onSubmit)}>
               <h2>
                { props?.setting?.name }
               </h2>
                
               
                <ValueComponents setting={props?.setting}/>


                 <br/>
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
