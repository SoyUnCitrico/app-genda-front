import { forwardRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { SnackbarCloseReason } from '@mui/base';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


type ToastProps = {
  isOpen: boolean
  message: string
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string | SnackbarCloseReason) =>void
  isSuccesful?: boolean
  time?: number
}

const Toast = ({isOpen, handleClose, message, isSuccesful, time=3000} :ToastProps) => {

  return (
      
      <Snackbar open={isOpen} autoHideDuration={time} onClose={handleClose}>
        <Alert onClose={handleClose} severity={isSuccesful?'success':'error'} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>

  );  
}

export default Toast;