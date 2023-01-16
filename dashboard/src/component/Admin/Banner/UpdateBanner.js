import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateBanner,
  getBannerDetails,
} from "../../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import { UPDATE_BANNER_RESET } from "../../../constants/productConstants";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../layout/Loader/Loader";


const UpdateBanner = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();

  const { error, banner } = useSelector((state) => state.bannerDetails);
  console.log(banner);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const bannerId = id;

  useEffect(() => {
    if (banner && banner._id !== bannerId) {
      dispatch(getBannerDetails(bannerId));
    } else {
      setOldImages(banner.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Banner Updated  Successfully");
      Navigate("/admin/banner");
      dispatch({ type: UPDATE_BANNER_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    Navigate,
    isUpdated,
    bannerId,
    banner,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateBanner(bannerId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      <MetaData title="Update Banner" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? <Loader /> :(<form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <div className="content_update_banner">
              <div className="banner_row">
                <h1>Update Banner</h1>
              </div>

              <div className="banner_row_label">
                <label>Banner Image</label>
                <div className="input_banner_upload">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProductImagesChange}
                    multiple
                  />
                </div>
              </div>

              <div id="createBannerFormImage">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt="Old Product Preview"
                    />
                  ))}
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
                  Update Banner
                </button>
              </div>
            </div>
          </form>)}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateBanner;
