import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useModal} from "mui-modal-provider";
import {jwtDecode} from "jwt-decode";
import {EmailAuthProvider, GoogleAuthProvider} from "firebase/auth";
import Firebase from "../../Firebase.js";
import ServiceClient from "../../ServiceClient.js";
import ErrorDialog from "../../components/dialogs/ErrorDialog.jsx";
import "../Page.css";
import "./SignUpPage.css";

export default function SignUpPage() {

  const [searchParams] = useSearchParams();
  const {showModal} = useModal();

  const [container, setContainer] = useState();
  const [payload, setPayload] = useState();

  useEffect(() => {
    Firebase.auth.signOut();
    if (!searchParams) { return; }
    const token = searchParams.get("token");
    try {
      const payload = jwtDecode(token);
      setPayload(payload);
    } catch (error) {
      console.log(error.message);
      showError("There was an unknown issue trying to sign you up. Please contact the administrator.");
      return;
    }
    const error = searchParams.get("error");
    if (error) {
      let message = "There was an unknown issue trying to sign you up. Please contact the administrator.";
      if (error === "IE") { message = "You attempted to sign up with an email other than that from your invitation."; }
      showError(message);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!payload?.email || !container) { return; }
    Firebase.ui.start(container, {
      signInOptions: [
        {provider: GoogleAuthProvider.PROVIDER_ID, customParameters: {prompt: "select_account"}, fullLabel: "Sign up with Google"},
        {provider: EmailAuthProvider.PROVIDER_ID, requireDisplayName: true, buttonColor: "olive", fullLabel: "Sign up with Email"}
      ],
      signInFlow: "popup",
      callbacks: {
        signInSuccessWithAuthResult: onFirebaseSignInSuccess
      }
    });
  }, [payload, container]);

  function onFirebaseSignInSuccess(result) {
    console.log("onFirebaseSignInSuccess", result);
    if (result.user.email !== payload.email) {
      Firebase.auth.signOut();
      if (result.additionalUserInfo.isNewUser) { ServiceClient.request(`/user/${result.user.uid}`, "DELETE"); }
      window.location.assign(`/sign-up?token=${searchParams.get("token")}&error=IE`);
      return false;
    }
    ServiceClient
      .request(`/user/${result.user.email}/invited`, "POST", {payload})
      .then(() => {
        window.location.assign("/");
      })
      .catch(error => showError(error));
    return false;
  }

  function showError(error) {
    let message = typeof error === "string" ? error : error.message;
    if (error.code === 409) { message = "There is at least one outstanding invitation for that email."; }
    const dialog = showModal(
      ErrorDialog,
      {
        title: "Error",
        description: message,
        confirm: "CLOSE",
        onConfirm: () => { dialog.hide(); },
      }
    );
  }

  return <div className="sign-up-page page">
    <div>Welcome!</div>
    <div>You have been invited to sign up with this email address: {payload?.email}</div>
    <div ref={ref => setContainer(ref)} />
  </div>

}
