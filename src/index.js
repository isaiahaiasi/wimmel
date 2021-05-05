import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";

import firebase from "firebase/app";
import { firebaseConfig } from "./.env.local/firebaseConfig";

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
