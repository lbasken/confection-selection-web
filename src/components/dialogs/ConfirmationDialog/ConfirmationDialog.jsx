import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

export default function ConfirmationDialog({onConfirm, onCancel, ...props}) {

  return <Dialog {...props}>
    <DialogTitle>{props.title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{props.description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        {props.cancel ?? "CANCEL"}
      </Button>
      <Button onClick={onConfirm} color="primary">
        {props.confirm ?? "CONFIRM"}
      </Button>
    </DialogActions>
  </Dialog>;

}
