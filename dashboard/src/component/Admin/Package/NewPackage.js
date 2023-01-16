/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from "react";
import "./newPackage.css";

import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createPackage,
  getAdminLabCategory,
  getAdminSample,
} from "../../../actions/testAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import Loader from "../../layout/Loader/Loader";
import { NEW_PACKAGE_RESET } from "../../../constants/testConstants";
import { useNavigate } from "react-router-dom";

const NewPackage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newPackage);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [verify, setVerify] = useState("");
  const [tests, setTests] = useState("");
  const [numOfTest, setNumOfTest] = useState(0);
  const [testTiming, setTestTiming] = useState("");
  const [category, setCategory] = useState("");
  const [sample, setSample] = useState("");
  const [report, setReport] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { labCategories } = useSelector((state) => state.labCategories);
  const { samples } = useSelector((state) => state.samples);

  useEffect(() => {
    dispatch(getAdminLabCategory());
    dispatch(getAdminSample());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Package Created Successfully");
      Navigate("/admin/packages");
      dispatch({ type: NEW_PACKAGE_RESET });
    }
  }, [dispatch, alert, error, Navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("verify", verify);
    myForm.set("tests", tests);
    myForm.set("numOfTest", numOfTest);
    myForm.set("testTiming", testTiming);
    myForm.set("category", category);
    myForm.set("sample", sample);
    myForm.set("report", report);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createPackage(myForm));
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
      <MetaData title="Create Package" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div className="lab_package">
              <form
                className="add_package_row"
                encType="multipart/form-data"
                onSubmit={createProductSubmitHandler}
              >
                <div className="content_add_package">
                  <div className="package_row">
                    <h1>Add Package</h1>
                  </div>
                  <div className="package_row">
                    <div className="inside-input">
                      <input
                        type="text"
                        placeholder="Package Name"
                        className="package_add"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />

                      <input
                        placeholder="Package Description"
                        className="package_add"
                        onChange={(e) => setDescription(e.target.value)}
                      ></input>
                      <input
                        type="number"
                        placeholder="Price"
                        className="package_add"
                        required
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Verify"
                        className="package_add"
                        required
                        onChange={(e) => setVerify(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="tests"
                        className="package_add"
                        required
                        onChange={(e) => setTests(e.target.value)}
                      />
                      <input
                        type="Number"
                        placeholder="numOfTest"
                        className="package_add"
                        required
                        onChange={(e) => setNumOfTest(e.target.value)}
                      />
                    </div>
                    <div className="inside-input">
                      <input
                        type="text"
                        placeholder="testTiming"
                        className="package_add"
                        required
                        onChange={(e) => setTestTiming(e.target.value)}
                      />
                      <div>
                        <select
                          className="package_add"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="">Choose Lab Category</option>
                          {labCategories &&
                            labCategories.map((cate) => (
                              <option key={cate.categoryName} value={cate._id}>
                                {cate.categoryName}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div>
                        <select
                          className="package_add"
                          onChange={(e) => setSample(e.target.value)}
                        >
                          <option value="">Choose Sample</option>
                          {samples &&
                            samples.map((sam) => (
                              <option key={sam.name} value={sam._id}>
                                {sam.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <input
                        type="text"
                        placeholder="report"
                        className="package_add"
                        required
                        onChange={(e) => setReport(e.target.value)}
                      />

                      <input
                        type="file"
                        name="avatar"
                        className="package_add_image"
                        accept="image/*"
                        onChange={createProductImagesChange}
                        multiple
                      />
                      <div id="createPackageFormImage">
                        {imagesPreview.map((image, index) => (
                          <img key={index} src={image} alt="Product Preview" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="package_row">
                    <button
                      id="createProductBtn"
                      type="submit"
                      disabled={loading ? true : false}
                    >
                      Add Package
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

export default NewPackage;
