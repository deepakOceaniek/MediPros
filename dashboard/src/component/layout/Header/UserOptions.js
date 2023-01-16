import React, { useEffect, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Backdrop } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Loader from "../Loader/Loader";

const UserOptions = ({ loading, user }) => {
  const Naviagte = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  // const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    // {
    //   icon: (
    //     <ShoppingCartIcon
    //       style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
    //     />
    //   ),
    //   name: `Cart(${cartItems.length})`,
    //   func: cart,
    // },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    Naviagte("/admin/dashboard");
  }
  function orders() {
    Naviagte("/orders");
  }
  function account() {
    Naviagte("/admin/me");
  }
  // function cart() {
  //   Naviagte("/cart");
  // }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
    Navigate("/login");
  }

  // console.log(user);
  // console.log(user.user.avatar.url);
  // console.log(user.loading);

  return (
    <>
      {user.loading ? (
        <Loader />
      ) : (
        <>
          <Backdrop open={open} style={{ zIndex: "10" }} />
          <SpeedDial
            ariaLabel="SpeedDial toolTip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            className="speedDial"
            direction="down"
            style={{ zIndex: "11" }}
            icon={
              <img
                className="speedDialIcon"
                src={
                  user.user.profileImage.url
                    ? user.user.profileImage.url
                    : "Images/Profile.png"
                }
                alt="Profile"
              />
            }
          >
            {options.map((item) => (
              <SpeedDialAction
                key={item.name}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
                tooltipOpen={window.innerWidth <= 600 ? true : false}
              />
            ))}
          </SpeedDial>
        </>
      )}
    </>
  );
};

export default UserOptions;
