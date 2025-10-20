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
import ProductsDetails from "./Pages/AllProducts/ProductsDetails.jsx";
import SliderImages from "./Pages/SliderImages/SliderImages.jsx";
import CustomerMessageDetails from "./Pages/CustomerMassage/CustomerMessageDetails.jsx";
import RaningOrderDetails from "./Pages/Orders/RaningOrderDetails.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/add-products",
        element:   <AddProducts></AddProducts>  ,
      },
      {
        path: "/all-products",
        element:   <AllProducts></AllProducts>  ,
      },
      {
        path: "/all-products/:id",
        element:   <ProductsDetails></ProductsDetails>  ,
      },
      {
        path: "/add-catagories",
        element:   <AddCatagories></AddCatagories>  ,
      },
      {
        path: "/review-request",
        element:   <ReviewRequest></ReviewRequest>  ,
      },
      {
        path: "/completed-order",
        element:   <CompetedOrders></CompetedOrders>  ,
      },
      {
        path: "/running-order",
        element:   <RunningOrders></RunningOrders>  ,
      },
      {
        path: "/running-order/:id",
        element:   <RaningOrderDetails></RaningOrderDetails>  ,
      },
      {
        path: "/customer-message",
        element:   <CustomerMassage></CustomerMassage>  ,
      },
      {
        path: "/customer-message/:id",
        element:   <CustomerMessageDetails></CustomerMessageDetails>  ,
      },
      {
        path: "/slider-images",
        element:   <SliderImages></SliderImages>  ,
      },
      {
        path: "/settings",
        element:   <Settings></Settings>  ,
      },
      {
        path: "/add-admin",
        element:   <Admins></Admins>  ,
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
        element:  <Profile></Profile> ,
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
