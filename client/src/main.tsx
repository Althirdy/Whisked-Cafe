import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Style/Index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <>
    <Toaster position="bottom-right" reverseOrder={false} />
    <App />
  </>
);
