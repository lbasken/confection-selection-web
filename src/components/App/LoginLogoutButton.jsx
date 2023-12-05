import React from "react";
import {Button} from "@mui/material";
import Firebase from "../../Firebase.js";
import useAuth from "../../hooks/useAuth.js";
import {useNavigate} from "react-router-dom";

export default function LoginLogoutButton() {

  const navigate = useNavigate();
  const {user} = useAuth();

  function signOut() {
    Firebase.auth
      .signOut()
      .then(() => {
        navigate("/", {replace: true});
      });
  }

  if (user) {
    return <Button id="login-logout" onClick={signOut} color="inherit">Logout</Button>;
  }
}
