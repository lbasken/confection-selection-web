import React, {useEffect, useState} from "react";
import Firebase from "../../Firebase.js";
import {GoogleAuthProvider, EmailAuthProvider} from "firebase/auth";
import "./SignInPage.css";
import "firebaseui/dist/firebaseui.css";
import ServiceClient from "../../ServiceClient.js";

export default function SignInPage() {
  const [container, setContainer] = useState();

  useEffect(() => {
    if (!container) {
      return;
    }
    Firebase.ui.start(container, {
      signInOptions: [
        {provider: GoogleAuthProvider.PROVIDER_ID, customParameters: {prompt: "select_account"}},
        {provider: EmailAuthProvider.PROVIDER_ID, requireDisplayName: true, buttonColor: "olive"}
      ],
      signInFlow: "popup",
      callbacks: {
        signInSuccessWithAuthResult: onFirebaseSignInSuccess
      }
    });
  }, [container]);

  function onFirebaseSignInSuccess(result) {
    console.log("onFirebaseSignInSuccess", result);
    if (result.additionalUserInfo.isNewUser) {
      ServiceClient.request(`/user/${result.user.uid}`, "DELETE");
      window.location.replace("/");
    }
    return false;
  }

  return <div className="sign-in-page">
    <h1>Home Of The Annual Basken Family Christmas Cookie Competition</h1>
    <div ref={ref => setContainer(ref)} />
  </div>

}
