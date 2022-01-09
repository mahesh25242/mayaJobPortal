import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
type Props = {
  message: string;
  setSnakMessage: (message: string) => void;
}

const CustomSnackbar = React.forwardRef((props:Props, snakRef) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {    
    if(props?.message)
      setOpen(true);
  }, [props]);
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setSnakMessage('');

    setOpen(false);
  };

  const action = (
    <React.Fragment>     
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>      
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={props.message}
        action={action}
      />
    </div>
  );
});

export default CustomSnackbar;
