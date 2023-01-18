import React, { Fragment, useEffect, useState } from "react";
import "./newBanner.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createBanner } from "../../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import { NEW_BANNER_RESET } from "../../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../../layout/Loader/Loader";

const NewBanner = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newBanner);

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Create Banner Successfully");
      Navigate("/admin/banner");
      dispatch({ type: NEW_BANNER_RESET });
    }
  }, [dispatch, alert, error, Navigate, success]);

  const createBannerSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createBanner(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Banner" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div className="create_banner">
              <form
                className="add_banner_row"
                encType="multipart/form-data"
                onSubmit={createBannerSubmitHandler}
              >
                <div className="content_banner">
                  <div className="banner_row">
                    <h1>Create Banner</h1>
                  </div>

                  <div className="banner_row_label">
                    <label>Banner Image</label>
                    <div className="input_banner_upload">
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={createProductImagesChange}
                        multiple
                      />
                    </div>
                  </div>
                  <div id="createBannerFormImage">
                    {imagesPreview.map((image, index) => (
                      <img key={index} src={image} alt="Product Preview" />
                    ))}
                  </div>

                  <div className="button_banner">
                    <button
                      id="createBannerBtn"
                      type="submit"
                      disabled={loading ? true : false}
                    >
                      Add Banner
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default NewBanner;
