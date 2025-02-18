import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.sass";
import App from "./containers/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
