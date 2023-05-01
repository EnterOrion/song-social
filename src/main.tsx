import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import RouteSwitch from "./routeSwitch.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>
);
