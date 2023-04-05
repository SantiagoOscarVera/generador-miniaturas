import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Landing from "../views/Landing";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
        path: "/home",
        element: <App />,
      }
  ]);