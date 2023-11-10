import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

export default function ErrorDialog({onConfirm, ...props}) {

  return <Dialog {...props}>
    <DialogTitle>{props.title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{props.description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onConfirm} color="primary">
        {props.confirm ?? "CONFIRM"}
      </Button>
    </DialogActions>
  </Dialog>;

}
