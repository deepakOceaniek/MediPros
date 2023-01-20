import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateCategory,
  getCategoryDetails,
} from "../../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../layout/Loader/Loader";

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
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="dashboard">
            <MetaData title="Update Category" />
            <SideBar />
            <div className="newProductContainer">
              <div className="create_Category">
                <form
                  className="add_Category_row"
                  encType="multipart/form-data"
                  onSubmit={updateProductSubmitHandler}
                >
                  <div className="content_create_Category">
                    <div className="Category_row_category">
                      <h1>Update Category</h1>
                      <div className="Category_row_category">
                        <div className="input_Category">
                          <div className="category_label">
                            <label>Category Name</label>
                            <input
                              type="text"
                              placeholder="Category Name"
                              required
                              value={categoryName}
                              onChange={(e) => setCategoryName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="input_Category_upload">
                          <div className="category_label">
                            <label>Category Image</label>
                            <input
                              type="file"
                              name="categoryImage"
                              accept="image/jpg, image/jpeg"
                              disabled={loading ? true : false}
                              onChange={updateProductImagesChange}
                            />
                          </div>
                          <div className="categoryDiv">
                            <img src={categoryPreview} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="button_Category_create">
                      <button
                        id="category_Button"
                        type="submit"
                        disabled={loading ? true : false}
                      >
                        Update
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

export default UpdateCategory;
