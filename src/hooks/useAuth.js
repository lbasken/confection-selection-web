import {useEffect, useState} from "react";
import Firebase from "../Firebase.js";

export default function useAuth() {

  const [user, setUser] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    // handle any user changes (sign-in/sign-out) and call getIdTokenResult() if signed in to get "claims" with the user role
    const onAuthStateChangedUnsubscribe = Firebase.auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        firebaseUser.getIdTokenResult().then(result => setUser({...firebaseUser, role: result?.claims?.role}));
      } else {
        setUser(firebaseUser);
      }
    });
    // handle any time the user token changes (if they sign in or out, or a new token is assigned)
    const onIdTokenChangedUnsubscribe = Firebase.auth.onIdTokenChanged(async (firebaseUser) => setToken(await firebaseUser?.getIdToken()));
    return () => {
      onAuthStateChangedUnsubscribe();
      onIdTokenChangedUnsubscribe();
    };
  }, []);

  return {user, token};

}
