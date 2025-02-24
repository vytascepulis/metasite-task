import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.sass";
import App from "./containers/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />,
  </StrictMode>,
);
