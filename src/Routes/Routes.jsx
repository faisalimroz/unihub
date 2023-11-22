import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Home/Home/Login/Login";
import Signup from "../Pages/Home/Home/Signup/Signup";
import AddInfo from "../Pages/Home/AddInfo/AddInfo";
import Contactus from "../Pages/Home/Contactus/Contactus";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/home',
        element:<Home></Home>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/signup',
        element:<Signup></Signup>
      },
      {
        path:'/addinfo',
        element:<AddInfo></AddInfo>
      },
      {
        path:'/contactus',
        element:<Contactus></Contactus>
      }
      ]
    },
  ]);
  