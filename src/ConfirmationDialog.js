import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmationDialog = ({ open, options, onCancel, onConfirm }) => {
  const {
    title,
	description,
    confirmationText,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
	cancellationButtonProps,
	reasonTextProps,
	reason,
  } = options;

  return (
    <Dialog fullWidth {...dialogProps} open={open} onClose={onCancel}>
      {title && (
        <DialogTitle>{title}</DialogTitle>
      )}
      {(description || reason) && (
	    <DialogContent>
        {description && (
          <DialogContentText>{description}</DialogContentText>
        )}
	    {reason && (
		  <TextField 
			  error={reason.error}
			  helperText={reason.errorMsg}
			  autoFocus
			  margin="dense"
			  label="Reason"
			  fullWidth
			  id="material-ui-confirm-reason"
        inputProps={{
          autoComplete: "off",
        }}
			  {...reasonTextProps}
		  />
	    )}
	    </DialogContent>)
	  }
      <DialogActions>
        <Button {...cancellationButtonProps} onClick={onCancel}>
          {cancellationText}
        </Button>
        <Button color="primary" {...confirmationButtonProps} onClick={onConfirm}>
          {confirmationText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
