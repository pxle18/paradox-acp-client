import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "app/app";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "app/contexts/auth-context";
import { HudProvider } from "app/contexts/hud-context";
import axios from "axios";
import { UserProvider } from "app/contexts/user-context";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <HudProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </HudProvider>
    </AuthProvider>
  </BrowserRouter>
);
