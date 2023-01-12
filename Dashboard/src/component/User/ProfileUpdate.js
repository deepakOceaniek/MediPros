import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  updateProfile,
  loadadmin,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_ADMIN_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Admin/Sidebar";

const ProfileUpdate = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [certificateImage, setCertificateImage] = useState();
  const [certificateImagePreview, setCertificateImagePreview] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("contact", contact);
    myForm.set("address", address);
    myForm.set("category", category);
    myForm.set("status", status);
    myForm.set("fromTime", fromTime);
    myForm.set("toTime", toTime);
    myForm.set("profileImage", profileImage);
    myForm.set("certificateImage", certificateImage);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImagePreview(reader.result);
        setProfileImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateCertificateDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setCertificateImagePreview(reader.result);
        setCertificateImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setContact(user.contact);
      setAddress(user.address);
      setCategory(user.category);
      setStatus(user.status);
      setProfileImagePreview(user.profileImage.url);
      setCertificateImagePreview(user.certificateImage.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadadmin());

      Navigate("/admin/me");

      dispatch({
        type: UPDATE_ADMIN_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, Navigate, user, isUpdated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="sideBar">
              <Sidebar />
            </div>
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Your Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="profile_main_Content">
                  <div className="inner_content_div">
                    <div className="profile_update_label">
                      <label> Name</label>
                      <div className="updateProfileName">
                        <input
                          type="text"
                          placeholder="Name"
                          required
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="profile_update_label">
                      <label>Contact</label>
                      <div className="updateProfileContact">
                        <input
                          type="number"
                          placeholder="Contact"
                          required
                          name="contact"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="profile_update_label">
                      <label>Address</label>
                      <div className="updateProfileAddress">
                        <input
                          type="text"
                          placeholder="Address"
                          required
                          name="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="profile_update_label">
                      <label>Profile Image</label>
                      <div id="updateProfileImageAdmin">
                        <input
                          type="file"
                          name="profileImagePreview"
                          accept="image/*"
                          onChange={updateProfileDataChange}
                        />
                        <img src={profileImagePreview} alt="Profile Preview" />
                      </div>
                    </div>
                  </div>
                  <div className="inner_content_div">
                    <div id="updateCertificateImageAdmin">
                      <img
                        src={certificateImagePreview}
                        alt="Certificate Preview"
                      />
                      <div className="profile_update_label">
                        <label>Certificate Image</label>
                        <div>
                          <input
                            type="file"
                            name="certificateImagePreview"
                            accept="image/*"
                            onChange={updateCertificateDataChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="profile_update_label">
                      <label>Status</label>
                      <div className="updateProfileStatus">
                        <input
                          type="text"
                          placeholder="Status"
                          required
                          name="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="profile_update_label">
                      <label>From Time</label>
                      <div className="updateProfileTime">
                        <input
                          type="time"
                          placeholder="fromTime"
                          required
                          name="fromTime"
                          value={fromTime}
                          onChange={(e) => setFromTime(e.target.value)}
                        />
                        <label>To Time</label>
                        <input
                          type="time"
                          placeholder="toTime"
                          required
                          name="toTime"
                          value={toTime}
                          onChange={(e) => setToTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="updateProfileBtn"> Save
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileUpdate;
