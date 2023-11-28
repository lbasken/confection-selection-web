import "./SignInPage.css";
import "../Page.css";
import "firebaseui/dist/firebaseui.css";
import ServiceClient from "../../ServiceClient.js";
import Firebase from "../../Firebase.js";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GoogleAuthProvider, EmailAuthProvider} from "firebase/auth";

export default function SignInPage() {

  const navigate = useNavigate();

  const [container, setContainer] = useState();

  useEffect(() => {
    if (!container) { return; }
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
    if (result.additionalUserInfo.isNewUser) { // if Firebase auth created a new user, remove it, we only want sign in here
      ServiceClient
        .request(`/user/${result.user.uid}`, "DELETE")
        .then(async () => {
          await Firebase.auth.signOut();
          window.location.assign("/");
        });
      return false;
    }
    window.location.assign("/");
    return false;
  }

  return <div className="page log-in-prompt">
    <div ref={ref => setContainer(ref)} />
  </div>

}
