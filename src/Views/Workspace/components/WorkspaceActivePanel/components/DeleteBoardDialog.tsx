import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
export interface SimpleDialogProps {
  open: boolean;
  onClose: any;
  Delete: any;

}

export function DeleteDialog(props: SimpleDialogProps) {
  const { onClose, open, Delete } = props;

  const handleClose = () => {
    onClose(false);
  };
  const handleDelete = () => {
    Delete();
    onClose(false);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Eliminar espacio de trabajo</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Si eliminas esta Lista no podras recuperar los datos
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant={"outlined"} onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          variant={"contained"}
          onClick={handleDelete}
          color={"error"}
          autoFocus
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}