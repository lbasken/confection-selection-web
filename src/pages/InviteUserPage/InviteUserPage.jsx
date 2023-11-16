import "../Page.css";
import "./InviteUserPage.css";
import ErrorDialog from "../../components/dialogs/ErrorDialog.jsx";
import ServiceClient from "../../ServiceClient.js";
import Utilities from "../../Utilities.js";
import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {useModal} from "mui-modal-provider";

export default function InviteUserPage() {

  const {showModal} = useModal();

  const [invitation, setInvitation] = useState();

  async function onSubmit(values) {
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
    if (error.code === 409) { message = "An account already exists for that email."; }
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

  function validate(values) {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  }

  function renderInvitationLink() {
    if (!invitation) { return; }
    return <div className="invite-user-invitation-link">
      <pre>
      {invitation}
      </pre>
    </div>;
  }

  const values = {
    email: ""
  };

  return <div className="invite-user-page page">
    <div className="invite-user-page-title">Invite User</div>
    <Formik enableReinitialize initialValues={values} validateOnMount validate={validate} onSubmit={onSubmit}>
      {props => {
        return <>
          <Form className="invite-user-form">
            <Field name="email">{(props) => <TextField className="invite-user-form-email" required fullWidth variant="standard" type="email" label="Email" {...props.field} />}</Field>
            <Button variant="contained" disabled={!props.isValid} onClick={() => props.submitForm()}>Create Invitation Link</Button>
          </Form>
        </>
      }}
    </Formik>
    {renderInvitationLink()}
  </div>

}
