import React, { Fragment, useEffect, useState } from "react";
import "./newCategory.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createCategory } from "../../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import { NEW_CATEGORY_RESET } from "../../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../../layout/Loader/Loader";

const NewCategory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newCategory);

  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryPreview, setCategoryPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Category Created Successfully");
      Navigate("/admin/dashboard");
      dispatch({ type: NEW_CATEGORY_RESET });
    }
  }, [dispatch, alert, error, Navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("categoryName", categoryName);
    myForm.set("categoryImage", categoryImage);

    dispatch(createCategory(myForm));
  };

  const createProductImagesChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setCategoryPreview((old) => [...old, reader.result]);
        setCategoryImage((old) => [...old, reader.result]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <MetaData title="Create Category" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div className="create_Category">
              <form
                className="add_Category_row"
                encType="multipart/form-data"
                onSubmit={createProductSubmitHandler}
              >
                <div className="content_create_Category">
                  <div className="Category_row">
                    <h1>Create Category</h1>
                  </div>
                  <div className="Category_row">
                    <div className="input_Category">
                      <input
                        type="text"
                        placeholder="Category Name"
                        required
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                    </div>
                    <div className="input_Category_upload">
                      <input
                        accept="image/png image/jpeg"
                        className="Category_add"
                        type="file"
                        name="categoryImage"
                        onChange={createProductImagesChange}
                        placeholder=" Product Image Upload"
                      />
                      <div className="categoryDiv">
                        {categoryPreview.map((image, index) => (
                          <img key={index} src={image} alt="Product Preview" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="button_Category">
                    <button
                      id="createProductBtn"
                      type="submit"
                      disabled={loading ? true : false}
                    >
                      Add Category
                    </button>
                  </div>

                  {/* <h1>Create Category</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Category Name"
                required
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <div id="updateProfileImage">
              <input
                type="file"
                name="categoryImage"
                accept="image/*"
                onChange={createProductImagesChange}
              />
            </div>
            <div className="categoryDiv">
            <img src={categoryPreview} id="Category" style={{height:"100%",width:"100%"}} alt="Category Preview" />

            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button> */}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default NewCategory;
