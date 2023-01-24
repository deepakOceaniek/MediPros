import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateTest,
  getTestDetails,
  getAdminPackage,
  getAdminLabCategory,
  getAdminSample,
} from "../../../actions/testAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import { UPDATE_TEST_RESET } from "../../../constants/testConstants";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../layout/Loader/Loader";
import "./newTest.css";

const UpdateTest = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();

  const { error, test } = useSelector((state) => state.testDetails);
  const { labCategories } = useSelector((state) => state.labCategories);
  const { packages } = useSelector((state) => state.packages);
  const { samples } = useSelector((state) => state.samples);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.testPackage);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [packageTest, setPackageTest] = useState("");
  const [sample, setSample] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const testId = id;

  useEffect(() => {
    if (test && test._id !== testId) {
      dispatch(getTestDetails(testId));
      dispatch(getAdminPackage());
      dispatch(getAdminLabCategory());
      dispatch(getAdminSample());
    } else {
      setName(test.name);
      setDescription(test.description);
      setPrice(test.price);
      setPackageTest(test.packageTest);
      setCategory(test.category);
      setSample(test.sample);
      setOldImages(test.images);
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
      alert.success("Test Updated Successfully");
      Navigate("/admin/test");
      dispatch({ type: UPDATE_TEST_RESET });
    }
  }, [dispatch, alert, error, Navigate, isUpdated, testId, test, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("packageTest", packageTest);
    myForm.set("category", category);
    myForm.set("sample", sample);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateTest(testId, myForm));
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <MetaData title="Update Test" />
            <SideBar />
            <div className="newProductContainer">
              <div className="test">
                <form
                  className="add_test_row"
                  encType="multipart/form-data"
                  onSubmit={updateProductSubmitHandler}
                >
                  <div className="content_add_test">
                    <div className="test_row">
                      <h1>Update Test</h1>
                    </div>
                    <div className="test_row">
                      <div className="input-inside">
                        <div>
                          <label>Test Name </label>
                          <input
                            type="text"
                            placeholder="Test Name"
                            required
                            className="test_add"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>Test Description </label>
                          <input
                            placeholder="Test Description"
                            value={description}
                            className="test_add"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>Price </label>
                          <input
                            type="number"
                            placeholder="Price"
                            required
                            value={price}
                            className="test_add"
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>Choose Sample </label>
                          <select
                            className="test_add"
                            onChange={(e) => setSample(e.target.value)}
                          >
                            <option value="">Choose Sample</option>
                            {samples &&
                              samples.map((sam) => (
                                <option key={sam._id} value={sam._id}>
                                  {sam.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="input-inside">
                        <div>
                          <label>Choose Package </label>
                          <select
                            className="test_add"
                            onChange={(e) => setPackageTest(e.target.value)}
                          >
                            <option value="">Choose Package</option>
                            {packages &&
                              packages.map((pack) => (
                                <option key={pack._id} value={pack._id}>
                                  {pack.name}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div>
                          <label>Choose Lab Category </label>
                          <select
                            className="test_add"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="">Choose Lab Category</option>
                            {labCategories &&
                              labCategories.map((cate) => (
                                <option key={cate._id} value={cate._id}>
                                  {cate.categoryName}
                                </option>
                              ))}
                          </select>
                        </div>


                        <div className="test_labels_name_image">
                          <label>Choose Image </label>
                          <input
                            type="file"
                            name="avatar"
                            className="package_add imageUpload"
                            accept="image/*"
                            onChange={updateProductImagesChange}
                            multiple
                          />
                        </div>
                        <div className="oldAndNewImg">
                          <div id="createTestFormImage">
                            {oldImages &&
                              oldImages.map((image, index) => (
                                <img
                                  key={index}
                                  src={image.url}
                                  alt="Old Product Preview"
                                />
                              ))}
                          </div>

                          <div id="createTestFormImage">
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
                    </div>
                    <div className="test_row">
                      <button
                        id="createTestButton"
                        type="submit"
                        disabled={loading ? true : false}
                      >
                        Update Test
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

export default UpdateTest;
