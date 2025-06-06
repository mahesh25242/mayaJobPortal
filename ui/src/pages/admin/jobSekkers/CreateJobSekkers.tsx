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
import { useDispatch } from 'react-redux';
import { setRegisterForm } from '../../../components/registration/registerFormSlice'
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '85%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto'
};

export default function CreateJobSekkers(props: any) {
  const childRef: null | { current: any } = React.useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: props?.seeker?.name ?? '',
      description: props?.seeker?.description ?? '',
      id: props?.seeker?.id ?? 0
    }
  });

  const { otpMobile, registerForm } = useSelector((state: RootState) => state)
  const { page } = otpMobile;
  const formData = registerForm[page as keyof typeof registerForm];

 

  const handleClose = () => {
    dispatch(setRegisterForm({ seeker: {} }));
    props?.setSeeker(null)
  };
  const [saveSeeker] = useSaveSeekerMutation();
  // const [login] = useLoginMutation();


  const onSubmit = (data: any) => {    
    setLoading(true);     
    childRef?.current?.saveIt()().then((res: any) => {      
      const ret = saveSeeker(childRef?.current?.formAllData()).unwrap();      
      return ret;
    }).then((res: any) => {
      props.setSnakMessage('seeker created successfully');
      dispatch(setRegisterForm({ seeker: {} }));
      handleClose();
    }).catch((err: any) => {
      if(err?.status === 422){        
        childRef?.current?.setErrors(err?.data?.errors)
      }
      
      console.log(err)
    }).finally(()=>{
      setLoading(false);    
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
        <JobSeeker ref={childRef} />
        <div style={{ marginTop: '10px' }}>
          <Button type="button" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          {' '}
          <Button type="submit" variant="contained" onClick={onSubmit} disabled={loading}>
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
      </Box>
    </Modal>
  );
}
