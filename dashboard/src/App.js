import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Loader from "./component/layout/Loader/Loader.js";
import store from "./store";
import { loadadmin } from "./actions/userAction";
import { useSelector } from "react-redux";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/Product/ProductList.js";
import NewProduct from "./component/Admin/Product/NewProduct.js";
import UpdateProduct from "./component/Admin/Product/UpdateProduct.js";
import OrderList from "./component/Admin/Order/OrderList.js";
import ProcessOrder from "./component/Admin/Order/ProcessOrder.js";
import UserList from "./component/Admin/User/UserList.js";
import UpdateUser from "./component/Admin/User/UpdateUser.js";
import ProductReviews from "./component/Admin/Product/ProductReviews.js";
import ErrorPage from "./component/layout/NotFound/ErrorPage.js";
import AdminLoginSignUp from "./component/User/AdminLoginSignUp";
import AdminProfile from "./component/User/AdminProfile.js";
import NewCategory from "./component/Admin/Category/NewCategory.js";
import CategoryList from "./component/Admin/Category/CategoryList.js";
import UpdateCategory from "./component/Admin/Category/UpdateCategory.js";
import LoginScreen from "./component/User/LoginScreen";
import RegisterScreen from "./component/User/RegisterScreen";
import OtpScreen from "./component/User/OtpScreen";
import PrescriptionList from "./component/Admin/Prescription/PrescriptionList.js";
import NewPrescription from "./component/Admin/Prescription/NewPrescription";
import PrescriptionProcess from "./component/Admin/Prescription/PrescriptionProcess";
import BannerList from "./component/Admin/Banner/BannerList.js";
import NewBanner from "./component/Admin/Banner/NewBanner.js";
import UpdateBanner from "./component/Admin/Banner/UpdateBanner";
import ProfileUpdate from "./component/User/ProfileUpdate";

import Home from "./component/User/payment/Home.js";
import PaymentSuccess from "./component/User/payment/PaymentSuccess.js";
import NewlabCategory from "./component/Admin/LabCategory/NewlabCategory";
import LabCategoryList from "./component/Admin/LabCategory/LabCategoryList";
import UpdateLabCategory from "./component/Admin/LabCategory/UpdateLabCategory";
import NewTest from "./component/Admin/Test/NewTest.js";
import TestList from "./component/Admin/Test/TestList.js";
import UpdateTest from "./component/Admin/Test/UpdateTest.js";
import NewPackage from "./component/Admin/Package/NewPackage.js";
import PackageList from "./component/Admin/Package/PackageList.js";
import UpdatePackage from "./component/Admin/Package/UpdatePackage.js";
import SampleList from "./component/Admin/Sample/SampleList";
import NewSample from "./component/Admin/Sample/NewSample";
import UpdateSample from "./component/Admin/Sample/UpdateSample";

function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const [contactData, setContactData] = useState("");
  const [registerData, setRegisterData] = useState("");
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadadmin());
    // store.dispatch(loadUser());
  }, []);
  // It will disable the rightclick so we can not inspect
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <Router>
        {/* <Header /> */}

        {/* {isAuthenticated && <UserOption user={{ loading, user }} />} */}
        <Routes>
          <Route path="/loading" element={<Loader />} />

          {/* <Route path="/search" element={<Search />} /> */}
          {isAuthenticated && (
            <Route path="/admin/me/update" element={<ProfileUpdate />} />
          )}

          {/* <Route path="/admin/login" element={<AdminLoginSignUp />} /> */}
          <Route
            path="/"
            element={<LoginScreen setContactData={setContactData} />}
          />
          <Route
            path="/admin/register"
            element={<RegisterScreen setRegisterData={setRegisterData} />}
          />
          <Route
            path="/otp"
            element={<OtpScreen data={[contactData, registerData]} />}
          />

          <Route
            OtpScreen
            path="/admin/dashboard"
            element={
              // <ProtectedRoute isAdmin={true}>
              <Dashboard />
              // </ProtectedRoute>
            }
          />
          {isAuthenticated && (
            <Route path="/admin/products" element={<ProductList />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/product" element={<NewProduct />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
          )}

          {isAuthenticated && (
            <Route path="/admin/orders" element={<OrderList />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/order/:id" element={<ProcessOrder />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/users" element={<UserList />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/user/:id" element={<UpdateUser />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/reviews" element={<ProductReviews />} />
          )}
          {/* <Route path="*" element={<ErrorPage />} /> */}

          {isAuthenticated && (
            <Route path="/admin/me" element={<AdminProfile />} />
          )}

          {isAuthenticated && (
            <Route path="/admin/categories" element={<CategoryList />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/category" element={<NewCategory />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/category/:id" element={<UpdateCategory />} />
          )}

          {isAuthenticated && (
            <Route path="/admin/prescription" element={<PrescriptionList />} />
          )}
          {isAuthenticated && (
            <Route
              path="/admin/prescription/:id"
              element={<PrescriptionProcess />}
            />
          )}

          {isAuthenticated && (
            <Route
              path="/admin/addPrescription"
              element={<NewPrescription />}
            />
          )}

          <Route path="/admin/banner" element={<BannerList />} />

          {isAuthenticated && (
            <Route path="/admin/addbanner" element={<NewBanner />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/banner/:id" element={<UpdateBanner />} />
          )}

          <Route path="/payment" element={<Home />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />

          <Route path="/admin/labcategory" element={<NewlabCategory />} />
          <Route path="/admin/labcategories" element={<LabCategoryList />} />
          <Route
            path="/admin/labcategory/:id"
            element={<UpdateLabCategory />}
          />

          <Route path="/admin/test" element={<NewTest />} />
          <Route path="/admin/tests" element={<TestList />} />
          <Route path="/admin/test/:id" element={<UpdateTest />} />

          <Route path="/admin/package" element={<NewPackage />} />
          <Route path="/admin/packages" element={<PackageList />} />
          <Route path="/admin/package/:id" element={<UpdatePackage />} />

          <Route path="/admin/samples" element={<SampleList />} />
          <Route path="/admin/sample" element={<NewSample />} />
          <Route path="/admin/sample/:id" element={<UpdateSample />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
