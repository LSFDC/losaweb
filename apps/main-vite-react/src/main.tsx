import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@losaweb/ui/globals.css";
import "@/assets/app.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
