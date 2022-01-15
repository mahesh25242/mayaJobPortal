import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useSaveSeekerMutation } from '../../../api/rtk/jobSeeker'
import JobSeeker from '../../../components/registration/jobSeeker/JobSeeker';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

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

export default function CreateJobSekkers(props: any) {
    const childRef: null | {current: any} = React.useRef();  
    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: props?.seeker?.name ?? '',
            description: props?.seeker?.description ?? '',
            id: props?.seeker?.id ?? 0
        }
    });

    const { otpMobile, registerForm } = useSelector((state: RootState) => state)
    const {  page } = otpMobile;
    const formData = registerForm[page as keyof typeof registerForm];
    
    React.useEffect(() => {
        setValue("name", props?.seeker?.name ?? '');
        setValue("description", props?.seeker?.description ?? '');
        setValue("id", props?.seeker?.id ?? 0);
    }, [props]);
  
  const handleClose = () => props?.setSeeker(null);
const [ saveSeeker ] = useSaveSeekerMutation();
// const [login] = useLoginMutation();

      
  const onSubmit = (data:any) => { 
    childRef?.current?.saveIt()().then((res:any)=>{
        console.log(res)
        return saveSeeker(childRef?.current?.formAllData()).unwrap();
      }).catch((err:any)=>{
        console.log(err)
      });


    //   console.log(data)
    // const loginResponse = saveSeeker(data).unwrap().then(res=>{
    //     console.log(res);        
    // }).catch(err=>{
    //     console.log(err)
    // });
  };
  return (     
      <Modal
        open={!!props?.seeker ?? false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <JobSeeker ref={childRef}/>        
           <div style={{marginTop : '10px'}}>
                    <Button type="button" variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                    { ' ' }
                    <Button type="submit" variant="contained" onClick={onSubmit}>
                        Save
                    </Button>
                </div>  
        </Box>
      </Modal>    
  );
}
