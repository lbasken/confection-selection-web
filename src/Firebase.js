import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import * as firebaseui from "firebaseui";

export default class Firebase {

  static firebaseConfig = {
    apiKey: "AIzaSyCd6phPgYrE3PRJakSHnLgYuWZG2ooTIwk",
    authDomain: "confection-selection.firebaseapp.com",
    projectId: "confection-selection",
    storageBucket: "confection-selection.appspot.com",
    messagingSenderId: "773960931020",
    appId: "1:773960931020:web:5bfb26e810244012d05469",
    measurementId: "G-F8VBR4NERR"
  };

  static app;
  static auth;

  static init() {
    Firebase.app = initializeApp(Firebase.firebaseConfig);
    Firebase.auth = getAuth(Firebase.app);
    Firebase.ui = new firebaseui.auth.AuthUI(Firebase.auth)
  }

  static async getUser() {
    if (Firebase.auth.currentUser) {
      const tokenResult = await Firebase.auth.currentUser.getIdTokenResult();
      return {...Firebase.auth.currentUser, ...{claims: tokenResult.claims}};
    }
  }

  static async isAdmin() {
    const user = await Firebase.getUser();
    return user?.role === "admin";
  }

}
