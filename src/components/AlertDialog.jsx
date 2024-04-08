import  React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import ClearIcon from '@mui/icons-material/Clear';

// {handleOpenAlert,isAlertOpen}
export default function AlertDialog({handleOpenAlert,isAlertOpen,handleEdit,handleDelete}) {

  return (
    <div className='relative'>
      <Dialog
        open={isAlertOpen}
        onClose={handleOpenAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <div className='right-1 absolute cursor-pointer px-1 mb-2' onClick={handleOpenAlert}>
      <ClearIcon />
      </div>
        <DialogTitle id="alert-dialog-title">

          {"Are you sure to delete or edit?"}
        </DialogTitle>
        <DialogActions>
          <Button size="small" variant="contained" color="error" onClick={handleDelete} >
            Delete
          </Button>
          <Button size="small" variant="contained" onClick={handleEdit} autoFocus>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}