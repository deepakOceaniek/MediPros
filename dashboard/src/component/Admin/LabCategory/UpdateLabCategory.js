import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateLabCategory,
  getLabCategoryDetails,
} from "../../../actions/testAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import { UPDATE_LABCATEGORY_RESET } from "../../../constants/testConstants";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../layout/Loader/Loader";

const UpdateLabCategory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();

  const { error, labCategory } = useSelector(
    (state) => state.labCategoryDetails
  );
  console.log(labCategory);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.testPackage);

  const [categoryName, setCategoryName] = useState("");

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const labCategoryId = id;

  useEffect(() => {
    if (labCategory && labCategory._id !== labCategoryId) {
      dispatch(getLabCategoryDetails(labCategoryId));
    } else {
      setCategoryName(labCategory.categoryName);
      setOldImages(labCategory.images);
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
      alert.success("Product Updated Successfully");
      Navigate("/admin/labcategories");
      dispatch({ type: UPDATE_LABCATEGORY_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    Navigate,
    isUpdated,
    labCategoryId,
    labCategory,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("categoryName", categoryName);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateLabCategory(labCategoryId, myForm));
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
      <MetaData title="Update Lab Category" />
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
                onSubmit={updateProductSubmitHandler}
              >
                <div className="content_create_Category">
                  <div className="Category_row">
                    <h1>Update Lab Category</h1>
                  </div>
                  <div className="Category_row">
                    <div className="input_Category">
                      <div className="update_lab_category_label">
                        <label>Category Name :</label>
                        <input
                          type="text"
                          placeholder="Category Name"
                          required
                          className="category_input"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="input_Category_upload">
                      <div className="input_Category">
                        <div className="update_lab_category_label">
                          <label>Category Image :</label>
                          <input
                            accept="image/png image/jpeg"
                            className="Category_add_image"
                            type="file"
                            name="categoryImage"
                            onChange={updateProductImagesChange}
                            placeholder=" Product Image Upload"
                          />
                        </div>
                        <div id="createProductFormImage">
                          {oldImages &&
                            oldImages.map((image, index) => (
                              <img
                                key={index}
                                src={image.url}
                                alt="Old Product Preview"
                              />
                            ))}
                          {imagesPreview.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt="Product Preview"
                            />
                          ))}
                        </div>

                        {/* <div id="createProductFormImage">
                       
                      </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="button_Category">
                    <button
                      id="createProductBtn"
                      type="submit"
                      disabled={loading ? true : false}
                    >
                      Update Lab Category
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update lab categroy</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Lab Category Name"
                required
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form> */}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateLabCategory;
