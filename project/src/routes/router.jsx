import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Students from "../pages/Students";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import AddStudent from "../pages/AddStudent";
import Certificate from "../components/Certificate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/addStudent", element: <AddStudent /> },
      { path: "/students", element: <Students /> },
      { path: "/settings", element: <Settings /> },
      { path: "/certificate", element: <Certificate /> },


    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
