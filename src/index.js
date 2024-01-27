import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { WishProvider } from "./context/WishCtx";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="moviefy001.us.auth0.com"
    clientId="caPsH0coZxgXQwdWzKr6tas7GdOk2HVN"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <WishProvider>
      <App />
    </WishProvider>
  </Auth0Provider>
);
