import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "app/app";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "app/contexts/auth-context";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
