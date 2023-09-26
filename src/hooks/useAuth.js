import {useEffect, useState} from "react";
import Firebase from "../Firebase.js";

export default function useAuth() {

    const [user, setUser] = useState();

    useEffect(() => {
        Firebase.auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        })
    }, []);

    return {user};
}