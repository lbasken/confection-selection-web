import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GoogleAuthProvider, EmailAuthProvider} from "firebase/auth";
import Firebase from "../../Firebase.js";
import ServiceClient from "../../ServiceClient.js";
import "firebaseui/dist/firebaseui.css";
import "../Page.css";
import "./SignInPage.css";

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
          navigate("/", {replace: true});
        });
      return false;
    }
    navigate("/", {replace: true});
    return false;
  }

  return <div className="sign-in-page page">
    <h1>Home Of The Annual Basken Family Christmas Cookie Competition</h1>
    <div ref={ref => setContainer(ref)} />
  </div>

}
