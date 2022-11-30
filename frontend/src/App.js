import React, { useEffect,useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import WebFont from "webfontloader";
import Home from "./component/Home/Home.js";
import Loader from "./component/layout/Loader/Loader.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOption from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProfileUpdate from "./component/User/ProfileUpdate.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js"
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import axios from "axios";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import ProtectedRoute from "./component/Route/ProtectedRoute"; // Its not working
import Registration from "./component/Register/Registration";
import AddMedicine from "./component/Register/AddMedicine";
import AddTest from "./component/Register/AddTest";
import AdminDashborad from "./component/Register/AdminDashborad";
import AdminProfile from "./component/Register/AdminProfile";
function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    // getStripeApiKey();
  }, []);

  return (
    <>
      <Router>
        <Header />

        {isAuthenticated && <UserOption user={{ loading, user }} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loading" element={<Loader />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />

          <Route path="/search" element={<Search />} />
          {isAuthenticated && <Route path="/account" element={<Profile />} />}
          {isAuthenticated && (
            <Route path="/me/update" element={<ProfileUpdate />} />
          )}
          {isAuthenticated && (
            <Route path="/password/update" element={<UpdatePassword />} />
          )}
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/cart" element={<Cart />} />
          {isAuthenticated && (
            <Route path="/login/shipping" element={<Shipping />} />
          )}
          {isAuthenticated && (
            <Route path="/order/confirm" element={<ConfirmOrder />} />
          )}



{/* {stripeApiKey && <Elements  stripe ={loadStripe(stripeApiKey)}> */}
   {isAuthenticated && (<Route path="/process/payment" element={<Payment />} />)}
          {/* </Elements>} */}
          {isAuthenticated && (<Route path="/success" element={<OrderSuccess />} />)}



          <Route path="/Registration" element={<Registration />} />
          <Route path="/dashboard" element={<AdminDashborad />} />
          <Route path="/adminprofile" element={<AdminProfile />} />

          <Route path="/addMedicine" element={<AddMedicine />} />
          <Route path="/addTest" element={<AddTest />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
