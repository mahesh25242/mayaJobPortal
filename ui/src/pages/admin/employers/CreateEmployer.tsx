import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSaveEmployerMutation } from '../../../api/rtk/Employer'
import Employer from '../../../components/registration/employer/Employer';
import Button from '@mui/material/Button';
import { setRegisterForm } from '../../../components/registration/registerFormSlice'
import { useDispatch } from 'react-redux';
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

export default function CreateEmployer(props: any) {
  const childRef: null | { current: any } = React.useRef();
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    dispatch(setRegisterForm({ employer: {} }));
    props?.setEmployer(null)
  };
  const [saveEmployer] = useSaveEmployerMutation();
  // const [login] = useLoginMutation();



  // console.log(registerForm, page);
  const onSubmit = () => {
    setLoading(true);
    childRef?.current?.saveIt()().then(() => {
      const formData = childRef?.current?.formAllData();

      const postData = {
        ...formData,
        ...{marital: formData?.marital_status,}
      }
      return saveEmployer(postData).unwrap();
    })
      .then((res: any) => {
        console.log(res);


        dispatch(setRegisterForm({ employer: {} }));

        props.setSnakMessage('employer created successfully');
        handleClose();
      })
      .catch((err: any) => {
        if(err?.status == 422){        
          childRef?.current?.setErrors(err?.data?.errors)
        }
        console.log(err)
      }).finally(()=>{
        setLoading(false);    
      });

    // const loginResponse = saveEmployer(data).unwrap().then(res=>{
    //     console.log(res);        
    // }).catch(err=>{
    //     console.log(err)
    // });
  };
  return (
    <Modal
      open={!!props?.employer ?? false}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Employer ref={childRef} />
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
