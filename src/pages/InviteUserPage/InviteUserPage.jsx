import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {useModal} from "mui-modal-provider";
import ServiceClient from "../../ServiceClient.js";
import Utilities from "../../Utilities.js";
import ErrorDialog from "../../components/dialogs/ErrorDialog.jsx";
import "./InviteUserPage.css";

export default function InviteUserPage() {

  const {showModal} = useModal();

  const [invitation, setInvitation] = useState();

  async function onSubmit(values) {
    console.log("onSubmit", values);
    if (Utilities.isEmpty(values.email)) { return; }
    try {
      const response = await ServiceClient.request("/user/invite", "POST", values);
      const url = `${window.location.origin}/sign-up?token=${response.invitation.token}`;
      console.log(response, url);
      setInvitation(url);
    } catch (error) {
      console.log(error.message, error.code);
      showError(error);
    }
  }

  function showError(error) {
    let message = error.message;
    if (error.code === 409) { message = "There is at least one outstanding invitation for that email."; }
    const dialog = showModal(
      ErrorDialog,
      {
        title: "Error",
        description: message,
        confirm: "OKAY",
        onConfirm: () => { dialog.hide(); },
      }
    );
  }

  const values = {
    email: ""
  };

  return <div className="invite-user-page">
    <div className="invite-user-page-title">Invite User</div>
    <Formik enableReinitialize initialValues={values} onSubmit={onSubmit}>
      {props => {
        return <>
          <Form className="invite-user-form">
            <Field name="email">{(props) => <TextField className="invite-user-form-email" required fullWidth variant="standard" type="email" label="Email" {...props.field} />}</Field>
            <Button variant="contained" onClick={() => props.submitForm()}>Create Invitation Link</Button>
          </Form>
        </>
      }}
    </Formik>
    <div className="invite-user-invitation-link">
      <pre>
      {invitation}
      </pre>
    </div>
  </div>

}
