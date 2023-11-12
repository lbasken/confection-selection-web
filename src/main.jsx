import React from "react";
import Firebase from "./Firebase";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "./index.css";

Firebase.init();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
