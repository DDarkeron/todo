import "@abraham/reflection";
import React from "react";
import ReactDOM from "react-dom";
import "tailwindcss/tailwind.css";
import App from "./components/App";
import Providers from "./components/Providers";

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById("root"),
);
