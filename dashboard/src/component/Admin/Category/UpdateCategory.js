import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateCategory,
  getCategoryDetails,
} from "../../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import SideBar from "../Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCategory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();

  const { error, category } = useSelector((state) => state.categoryDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState();
  const [categoryPreview, setCategoryPreview] = useState("");

  const categoryId = id;
  useEffect(() => {
    if (category && category._id !== categoryId) {
      dispatch(getCategoryDetails(categoryId));
    } else {
      setCategoryName(category.categoryName);
      setCategoryImage(category.categoryImage.url);
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
      alert.success("Category Updated Successfully");
      Navigate("/admin/categories");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    Navigate,
    isUpdated,
    categoryId,
    category,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("categoryName", categoryName);
    myForm.set("categoryImage", categoryImage);

    dispatch(updateCategory(categoryId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setCategoryPreview(reader.result);
        setCategoryImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <MetaData title="Update Category" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Category</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div id="updateProfileImage">
              <img src={categoryPreview} alt="Category Preview" />
              <input
                type="file"
                name="categoryImage"
                accept="image/*"
                disabled={loading ? true : false}
                onChange={updateProductImagesChange}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateCategory;
