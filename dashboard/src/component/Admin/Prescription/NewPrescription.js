import React, { Fragment, useEffect, useState } from "react";
import "../Product/newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createPrescription} from "../../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import Loader from "../../layout/Loader/Loader";
import { NEW_PRESCRIPTION_RESET } from "../../../constants/productConstants";
import { useNavigate } from "react-router-dom";

const NewPrescription = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newPrescription);


  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Prescription Sended to the Nearest Pharmacy");
      Navigate("/admin/Dashboard");
      dispatch({ type: NEW_PRESCRIPTION_RESET });
    }
  }, [dispatch, alert, error, Navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createPrescription(myForm));
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
      <MetaData title="ADD  Prescription" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
         {loading ? <Loader /> :  <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>ADD  Prescription</h1>

            <div id="createProductFormFile">
              <input
                type="file"
                name="prescription"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <button 
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </button>
          </form>}
        </div>
      </div>
    </Fragment>
  );
};

export default NewPrescription;
