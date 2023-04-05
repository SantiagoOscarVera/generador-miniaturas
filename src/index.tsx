import * as React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";

interface MyAuth0ProviderOptions {
  domain: string;
  clientId: string;
  redirectUri: string;
}

const auth0Options: MyAuth0ProviderOptions = {
  domain: "dev-8eo5t7k4kwgat7pr.us.auth0.com",
  clientId: "7F2p5G1fCtITyp6vNcyGG8g34eefSU1k",
  redirectUri: window.location.origin,
};

ReactDOM.render(
  <ScopedCssBaseline>
    <Auth0Provider {...auth0Options}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Auth0Provider>
  </ScopedCssBaseline>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

