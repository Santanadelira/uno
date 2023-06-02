import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/auth/login/Login";
import PrivateRoute from "../components/privateRoutes/PrivateRoute";
import Dashboard from "../pages/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);
