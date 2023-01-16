/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from "react";
import "./newTest.css";

import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createTest,
  getAdminLabCategory,
  getAdminPackage,
  getAdminSample,
} from "../../../actions/testAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import Loader from "../../layout/Loader/Loader";
import { NEW_TEST_RESET } from "../../../constants/testConstants";
import { useNavigate } from "react-router-dom";

const NewTest = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newTest);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [sample, setSample] = useState("");
  const [category, setCategory] = useState("");
  const [packageTest, setPackageTest] = useState("");

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  const { labCategories } = useSelector((state) => state.labCategories);
  const { packages } = useSelector((state) => state.packages);
  const { samples } = useSelector((state) => state.samples);

  console.log(packages);
  console.log(labCategories);
  console.log(samples);
  useEffect(() => {
    dispatch(getAdminLabCategory());
    dispatch(getAdminPackage());
    dispatch(getAdminSample());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Test Created Successfully");
      Navigate("/admin/test");
      dispatch({ type: NEW_TEST_RESET });
    }
  }, [dispatch, alert, error, Navigate, success]);

  // const data = categories &&  categories.map((category)=> console.log(category.categoryName))

  // console.log(Object.values(categories))
  // console.log(categories)
  // console.log(data)

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("sample", sample);
    myForm.set("packageTest", packageTest);
    myForm.set("category", category);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createTest(myForm));
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
      <MetaData title="Create Test" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div className="test">
              <form
                className="add_test_row"
                encType="multipart/form-data"
                onSubmit={createProductSubmitHandler}
              >
                <div className="content_add_test">
                  <div className="test_row">
                    <h1>Add Test</h1>
                  </div>
                  <div className="test_row">
                    <div className="input-inside">
                      <div className="test_labels_name">
                        <label>Test Name</label>
                      <input
                        type="text"
                        placeholder="Test Name"
                        required
                        className="test_add"
                        onChange={(e) => setName(e.target.value)}
                      />
                      </div>
                      <div className="test_labels_name">
                        <label>Test Description</label>
                      <input
                        placeholder="Test Description"
                        className="test_add"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      </div>
                      <div className="test_labels_name">
                        <label>Price</label>
                      <input
                        type="number"
                        placeholder="Price"
                        required
                        className="test_add"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      </div>
                      <div>
                      <div className="test_labels_name">
                        <label>Choose Sample</label>
                        <select className="test_add" onChange={(e) => setSample(e.target.value)}>
                          <option value="">Choose Sample</option>
                          {samples &&
                            samples.map((sam) => (
                              <option key={sam.name} value={sam._id}>
                                {sam.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      </div>
                    </div>
                    <div className="input-inside">
                      <div>
                      <div className="test_labels_name">
                        <label>Choose Package</label>
                        <select className="test_add"
                          onChange={(e) => setPackageTest(e.target.value)}
                        >
                          <option value="">Choose Package</option>
                          {packages &&
                            packages.map((pack) => (
                              <option key={pack.name} value={pack._id}>
                                {pack.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      </div>

                      <div>
                      <div className="test_labels_name">
                        <label>Choose Category</label>
                        <select className="test_add" onChange={(e) => setCategory(e.target.value)}>
                          <option value="">Choose Category</option>
                          {labCategories &&
                            labCategories.map((cate) => (
                              <option key={cate.categoryName} value={cate._id}>
                                {cate.categoryName}
                              </option>
                            ))}
                        </select>
                      </div>
                      </div>

                      <div id="createProductFormFile">
                      <div className="test_labels_name_image">
                        <label>Test Image</label>
                        <input
                          type="file"
                          name="avatar"
                          className="test_add_image"
                          accept="image/*"
                          onChange={createProductImagesChange}
                          multiple
                        />
                      </div>
                          <div id="createTestFormImage">
                    {imagesPreview.map((image, index) => (
                      <img key={index} src={image} alt="Product Preview" />
                    ))}
                  </div>
                      </div>
                    </div>
                  </div>
                

                  <div className="button_test_row">
                    <button
                      id="create_Test_Btn"
                      type="submit"
                      disabled={loading ? true : false}
                    >
                      Add Test
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

export default NewTest;
