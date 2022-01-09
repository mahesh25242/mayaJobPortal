import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { useSaveEmployerMutation } from '../../../api/rtk/Employer'
import Employer from '../../../components/registration/employer/Employer';
import Button from '@mui/material/Button';
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

export default function CreateEmployer(props: any) {
    const childRef: null | {current: any} = React.useRef();  
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
  
    const { otpMobile, registerForm } = useSelector((state: RootState) => state)
    const {  page } = otpMobile;
    const formData = registerForm[page as keyof typeof registerForm];
    

  const handleClose = () => props?.setEmployer(null);
const [ saveEmployer ] = useSaveEmployerMutation();
// const [login] = useLoginMutation();

  
    console.log(props);
  const onSubmit = (data:any) => { 
      console.log(childRef?.current)
    childRef?.current?.saveIt()().then((res:any)=>{
        console.log(res)
        return saveEmployer(formData).unwrap();
      }).catch((err:any)=>{
        console.log(err)
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
            <Employer ref={childRef}/>   
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
