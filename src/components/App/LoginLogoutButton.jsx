import React from "react";
import {Button} from "@mui/material";
import {GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import Firebase from "../../Firebase.js";
import useAuth from "../../hooks/useAuth.js";

export default function LoginLogoutButton() {

    const {user} = useAuth();

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(Firebase.auth, provider)
            .then(() => {
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function googleSignOut() {
        signOut(Firebase.auth).then(() => {
            console.log("User signed out successfully.");
        }).catch((error) => {
            console.error(error);
        });
    }

    if (user) {
        return <Button id="login-logout" onClick={googleSignOut} color="inherit">Logout</Button>;
    } else {
        return <Button id="login-logout" onClick={signInWithGoogle} color="inherit">Login</Button>;
    }
}
