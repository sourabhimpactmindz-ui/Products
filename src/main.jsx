import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
    />
    <App />
  </StrictMode>
);
