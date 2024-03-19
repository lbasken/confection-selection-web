import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import * as firebaseui from "firebaseui";
import {EventBus, State} from "@d4lton/node-frontend";
import {apiKey, appId} from "../config.json";

export default class Firebase {

  static firebaseConfig = {
    apiKey: apiKey,
    authDomain: "confection-selection.firebaseapp.com",
    projectId: "confection-selection",
    storageBucket: "confection-selection.appspot.com",
    messagingSenderId: "773960931020",
    appId: appId,
    measurementId: "G-F8VBR4NERR"
  };

  static app;
  static auth;
  static user;
  static token;

  static init() {
    Firebase.app = initializeApp(Firebase.firebaseConfig);
    Firebase.auth = getAuth(Firebase.app);
    Firebase.ui = new firebaseui.auth.AuthUI(Firebase.auth);
    Firebase.subscribe();
    setInterval(() => { Firebase.user?.getIdToken(); }, 30000);
  }

  static subscribe() {
    Firebase.auth.onAuthStateChanged(Firebase.onAuthStateChanged);
    Firebase.auth.onIdTokenChanged(Firebase.onIdTokenChanged);
  }

  static onAuthStateChanged(user) {
    Firebase.user = user;
    Firebase.reconnectEvents();
  }

  static async onIdTokenChanged(user) {
    Firebase.token = await user?.getIdToken();
    Firebase.reconnectEvents();
  }

  static reconnectEvents() {
    if (Firebase.eventSource) {
      Firebase.eventSource.removeEventListener("message", Firebase.onMessage);
      Firebase.eventSource.removeEventListener("error", Firebase.onError);
      Firebase.eventSource.close();
    }
    if (Firebase.user && Firebase.token) {
      Firebase.eventSource = new EventSource(`${window.process.env.API_URL}/events?token=${Firebase.token}`);
      Firebase.eventSource.addEventListener("message", Firebase.onMessage);
      Firebase.eventSource.addEventListener("error", Firebase.onError);
    }
  }

  static onMessage(event) {
    const data = JSON.parse(event.data);
    const match = data?.type?.match(/^state:(.+)$/);
    if (match) {
      State.set(match[1], data.value);
    } else {
      EventBus.dispatch(data);
    }
  }

  static onError() {
    setTimeout(() => Firebase.reconnectEvents(), 10000);
  }

}
