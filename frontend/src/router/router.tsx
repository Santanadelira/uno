import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/auth/login/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
])