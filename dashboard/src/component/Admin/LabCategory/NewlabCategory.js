/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from "react";
import "../Category/newCategory.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createLabCategory } from "../../../actions/testAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import Loader from "../../layout/Loader/Loader";
import { NEW_LABCATEGORY_RESET } from "../../../constants/testConstants";
import { useNavigate } from "react-router-dom";

const NewlabCategory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.newLabCategory
  );

  const [categoryName, setCategoryName] = useState("");

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Lab Category Added Successfully");
      Navigate("/admin/labcategory");
      dispatch({ type: NEW_LABCATEGORY_RESET });
      setCategoryName("");
      setImages([]);
      setImagesPreview([]);
    }
  }, [dispatch, alert, error, Navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("categoryName", categoryName);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createLabCategory(myForm));
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <MetaData title="Create Lab Category" />
            <SideBar />
            <div className="newProductContainer">
              <div className="create_Category">
                <form
                  className="add_Category_row"
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <div className="content_create_Category">
                    <div className="Category_row">
                      <h1>Create Lab Category</h1>
                    </div>
                    <div className="Category_row">
                      <div className="input_Category">
                        <label>Category Name</label>
                        <input
                          type="text"
                          placeholder="Category Name"
                          required
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                      </div>
                      <div className="input_Category">
                        <label>Category Image</label>
                        <input
                          accept="image/png, image/jpeg"
                          className="Category_add package_add imageUpload"
                          type="file"
                          name="categoryImage"
                          onChange={createProductImagesChange}
                          placeholder=" Product Image Upload"
                        />
                        <div className="categoryDiv">
                          {imagesPreview.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt="Product Preview"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="button_Category">
                      <button
                        id="create_lab_test_Btn"
                        type="submit"
                        disabled={loading ? true : false}
                      >
                        Add Lab Category
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default NewlabCategory;
