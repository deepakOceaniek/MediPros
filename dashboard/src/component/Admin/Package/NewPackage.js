/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from "react";
import "./newPackage.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createPackage,
  getAdminLabCategory,
  getAdminSample,
  getAdminTest,
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
  // const [tests, setTests] = useState("");
  const [numOfTest, setNumOfTest] = useState(0);
  const [testTiming, setTestTiming] = useState("");
  const [category, setCategory] = useState("");
  const [sample, setSample] = useState("");
  const [report, setReport] = useState("");
  const [discount, setDiscount] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [testList, setTestList] = useState([{ test: "" }]);

  const { labCategories } = useSelector((state) => state.labCategories);
  const { samples } = useSelector((state) => state.samples);
  const { tests } = useSelector((state) => state.tests);
  // console.log(`test ${tests}`);

  useEffect(() => {
    dispatch(getAdminLabCategory());
    dispatch(getAdminSample());
    dispatch(getAdminTest());
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
    myForm.set("numOfTest", numOfTest);
    myForm.set("testTiming", testTiming);
    myForm.set("category", category);
    myForm.set("sample", sample);
    myForm.set("report", report);
    myForm.set("discount", discount);
    myForm.set("testList", testList);

    console.log(`testList ${JSON.stringify(testList)}`);
    console.log(`testList ${testList}`);

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

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    console.log(`name ${name} ...... value ${value}`);
    const list = [...testList];
    console.log(`List1.....${JSON.stringify(list)}`);
    list[index][name] = value;
    console.log(list[index][name]);
    console.log(`List2.....${JSON.stringify(list)}`);
    setTestList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...testList];
    list.splice(index, 1);
    setTestList(list);
  };

  const handleServiceAdd = () => {
    setTestList([...testList, { test: "" }]);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <MetaData title="Create Package" />
            <SideBar />
            <div className="newProductContainer">
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
                        <div>
                          <label>Package Name</label>
                          <input
                            type="text"
                            placeholder="Package Name"
                            className="package_add"
                            required
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>Package Description</label>
                          <input
                            placeholder="Package Description"
                            className="package_add"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>Package Price</label>
                          <input
                            type="number"
                            placeholder="Price"
                            className="package_add"
                            required
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>Package Verify</label>
                          <input
                            type="text"
                            placeholder="Verify"
                            className="package_add"
                            required
                            onChange={(e) => setVerify(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="inside-input">
                        {/* <div>
                          <label>Package Tests</label>
                          <input
                            type="text"
                            placeholder="Tests"
                            className="package_add"
                            required
                            onChange={(e) => setTests(e.target.value)}
                          />
                        </div> */}
                        <div>
                          <label>Discount</label>
                          <input
                            type="text"
                            placeholder="Tests"
                            className="package_add"
                            required
                            onChange={(e) => setDiscount(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>Number Of Test</label>
                          <input
                            type="Number"
                            placeholder="Num of Test"
                            className="package_add"
                            required
                            onChange={(e) => setNumOfTest(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>Test Timing</label>

                          <input
                            type="text"
                            placeholder="Test Timing"
                            className="package_add"
                            required
                            onChange={(e) => setTestTiming(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>Choose Lab Category</label>

                          <select
                            className="package_add"
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="">Choose Lab Category</option>
                            {labCategories &&
                              labCategories.map((cate) => (
                                <option
                                  key={cate.categoryName}
                                  value={cate._id}
                                >
                                  {cate.categoryName}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="inside-input">
                        <div>
                          <label>Choose Sample</label>

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

                        <div>
                          <label>Report</label>

                          <input
                            type="text"
                            placeholder="Report"
                            className="package_add"
                            required
                            onChange={(e) => setReport(e.target.value)}
                          />
                        </div>
                        <div>
                          <label> Upload Package Image</label>
                          <input
                            type="file"
                            name="avatar"
                            className="package_add imageUpload"
                            accept="image/*"
                            onChange={createProductImagesChange}
                            multiple
                          />
                        </div>

                        <div id="createPackageFormImage">
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

                    <label htmlFor="test">Tests</label>
                    <div className="add_test">
                      {/* <div className="form-field"> */}

                      {testList.map((singleTest, index) => (
                        <div key={index} className="test-input">
                          <div className="first-division">
                            {/* <input
                              name="service"
                              type="text"
                              id="service"
                              className="package_add"
                              value={singleTest.test}
                              onChange={(e) => handleServiceChange(e, index)}
                              required
                            /> */}

                            <select
                              className="package_add"
                              onChange={(e) => handleServiceChange(e, index)}
                              name="test"
                            >
                              <option
                              // value={singleTest.test}
                              >
                                Choose Test
                              </option>
                              {tests &&
                                tests.map((test) => (
                                  <option key={test._id} value={test._id}>
                                    {test.name}
                                  </option>
                                ))}
                            </select>

                            {testList.length - 1 === index &&
                              testList.length < 8 && (
                                <button
                                  type="button"
                                  onClick={handleServiceAdd}
                                  className="add-btn"
                                >
                                  <span>Add a Test</span>
                                </button>
                              )}
                          </div>
                          <div className="second-division">
                            {testList.length !== 1 && (
                              <button
                                type="button"
                                onClick={() => handleServiceRemove(index)}
                                className="remove-btn"
                              >
                                <span>Remove</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* </div> */}
                      {/* <div className="output">
                        <h2>Output</h2>
                        {serviceList &&
                          serviceList.map((singleService, index) => (
                            <ul key={index}>
                              {singleService.service && (
                                <li>{singleService.service}</li>
                              )}
                            </ul>
                          ))}
                      </div> */}
                    </div>

                    <div className="package_row">
                      <button
                        id="createPackageBtn"
                        type="submit"
                        disabled={loading ? true : false}
                      >
                        Add Package
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

export default NewPackage;
