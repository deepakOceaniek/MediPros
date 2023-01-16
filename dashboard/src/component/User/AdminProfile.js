import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AdminProfile.css";
import Sidebar from "../Admin/Sidebar";

const Profile = () => {
  const Navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  console.log(loading);
  console.log(isAuthenticated);
  console.log(user);

  useEffect(() => {
    if (isAuthenticated === false) {
      Navigate("/admin/login");
    }
  }, [isAuthenticated, user, loading, Navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={` ${user.name}'s Profile`} />
          <div className="profileContainer">
            <Sidebar />
            <div className="row-profile">
              <div className="profileTitle">
                <p className="profile_title_text">Pharmacy Profile</p>
              </div>
              <div className="innerRow">
                <div className="content">
                  <div className="textPart">
                    {" "}
                    <label>User Name</label>
                    <p>{user.name} </p>{" "}
                  </div>
                  <div className="textPart">
                    {" "}
                    <label>Contact</label>
                    <p>{user.contact}</p>{" "}
                  </div>
                  <div className="textPart">
                    {" "}
                    <label>Address</label>
                    <p>{user.address}</p>{" "}
                  </div>
                </div>
                <div className="imgdiv">
                  <img src={user.certificateImage.url} alt="certificate" />
                </div>
              </div>
              <div className="innerRow">
                <div className="imgdiv">
                  <img src={user.profileImage.url} alt="profile" />
                </div>
                <div className="content">
                  <div className="textPart">
                    {" "}
                    <label>Category</label>
                    <p>{user.category}</p>{" "}
                  </div>
                  <div className="textPart">
                    {" "}
                    <label>Status</label>
                    <p>{user.status}</p>{" "}
                  </div>
                  <div className="textPart">
                    {" "}
                    <label>Timing</label>
                    <p>Opening Time : {user.fromTime} </p>{" "}
                    <p>Closing &nbsp; Time : {user.toTime}</p>
                  </div>
                </div>
              </div>
              <div>
                <span className="edit_btn">
                  <Link to="/admin/me/update">Edit Profile</Link>
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
