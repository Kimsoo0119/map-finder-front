import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

declare global {
  interface Window {
    naver: any;
    Kakao: any;
  }
}
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
axios.defaults.withCredentials = true;

root.render(<App />);
