import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx"; 
import Profile from "./Pages/User/Profile.jsx"; 
import Login from "./Pages/User/Login.jsx";
import Register from "./Pages/User/Register.jsx";  
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import Privetroute from "./PrivetRoute/PrivetRoute.jsx"; 
import AddProducts from "./Pages/AddProducts/AddProducts.jsx";
import AllProducts from "./Pages/AllProducts/AllProducts.jsx";
import AddCatagories from "./Pages/AddCatagories/AddCatagories.jsx";
import ReviewRequest from "./Pages/Review/ReviewRequest.jsx";
import Settings from "./Pages/Settings/Settings.jsx"; 
import CompetedOrders from "./Pages/Orders/CompetedOrders.jsx";
import RunningOrders from "./Pages/Orders/RunningOrders.jsx";
import CustomerMassage from "./Pages/CustomerMassage/CustomerMassage.jsx";
import Admins from "./Pages/Admins.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        path: "/",
        element: <Privetroute> <Home></Home> </Privetroute>,
      },
      {
        path: "/add-products",
        element: <Privetroute> <AddProducts></AddProducts> </Privetroute>,
      },
      {
        path: "/all-products",
        element: <Privetroute> <AllProducts></AllProducts> </Privetroute>,
      },
      {
        path: "/add-catagories",
        element: <Privetroute> <AddCatagories></AddCatagories> </Privetroute>,
      },
      {
        path: "/review-request",
        element: <Privetroute> <ReviewRequest></ReviewRequest> </Privetroute>,
      },
      {
        path: "/completed-order",
        element: <Privetroute> <CompetedOrders></CompetedOrders> </Privetroute>,
      },
      {
        path: "/running-order",
        element: <Privetroute> <RunningOrders></RunningOrders> </Privetroute>,
      },
      {
        path: "/customer-message",
        element: <Privetroute> <CustomerMassage></CustomerMassage> </Privetroute>,
      },
      {
        path: "/settings",
        element: <Privetroute> <Settings></Settings> </Privetroute>,
      }, 
      {
        path: "/add-admin",
        element: <Privetroute> <Admins></Admins> </Privetroute>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/profile",
        element: <Privetroute><Profile></Profile></Privetroute>,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
