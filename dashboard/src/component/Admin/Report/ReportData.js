/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from "react";
import "../Test/newTest.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminTest,
  getAdminSample,
} from "../../../actions/testAction";
import { getAllUsers } from "../../../actions/userAction";
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

  const [patientName, setPatientName] = useState("");
  const [patientAdress, setPatientAddress] = useState("");
  const [contact, setContact] = useState(0);
  const [sample, setSample] = useState("");
  const [testOne, setTestOne] = useState("");
  const [testTwo, setTestTwo] = useState("");
  const [testThree, setTestThree] = useState("");
  const [refBy, setRefBy] = useState("");
  const [sampleDrownDate, setSampleDrownDate] = useState("");
  const [sampleReceived, setSampleReceived] = useState("");

  //   const [images, setImages] = useState([]);
  //   const [imagesPreview, setImagesPreview] = useState([]);

  const { samples } = useSelector((state) => state.samples);
  const { tests } = useSelector((state) => state.tests);
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAdminTest());
    dispatch(getAdminSample());
    dispatch(getAllUsers());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Report Genrated");
      Navigate("/admin/test");
      dispatch({ type: NEW_TEST_RESET });
    }
  }, [dispatch, alert, error, Navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("patientName", patientName);
    myForm.set("patientAdress", patientAdress);
    myForm.set("contact", contact);
    myForm.set("sample", sample);
    myForm.set("testOne", testOne);
    myForm.set("testTwo", testTwo);
    myForm.set("testThree", testThree);
    myForm.set("refBy", refBy);
    myForm.set("sampleDrownDate", sampleDrownDate);
    myForm.set("sampleReceived", sampleReceived);

    // images.forEach((image) => {
    //   myForm.append("images", image);
    // });
    // dispatch(createTest(myForm));
  };

  //   const createProductImagesChange = (e) => {
  //     const files = Array.from(e.target.files);

  //     setImages([]);
  //     setImagesPreview([]);

  //     files.forEach((file) => {
  //       const reader = new FileReader();

  //       reader.onload = () => {
  //         if (reader.readyState === 2) {
  //           setImagesPreview((old) => [...old, reader.result]);
  //           setImages((old) => [...old, reader.result]);
  //         }
  //       };

  //       reader.readAsDataURL(file);
  //     });
  //   };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <MetaData title="Genrate Report" />
            <SideBar />
            <div className="newProductContainer">
              <div className="test">
                <form
                  className="add_test_row"
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <div className="content_add_test">
                    <div className="test_row">
                      <h1>Report Data</h1>
                    </div>
                    <div className="test_row">
                      <div className="input-inside">
                        <div>
                          <label> Patient Name</label>

                          <select
                            className="test_add"
                            onChange={(e) => setPatientName(e.target.value)}
                          >
                            <option value="">Patient Name</option>
                            {users &&
                              users.map((user) => (
                                <option key={user.name} value={user._id}>
                                  {user.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div>
                          <label> Patient Address</label>
                          <input
                            placeholder=" Patient Address"
                            className="test_add"
                            onChange={(e) => setPatientAddress(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>Contact</label>
                          <input
                            type="number"
                            placeholder="Contact"
                            required
                            className="test_add"
                            onChange={(e) => setContact(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>Sample</label>
                          <select
                            className="test_add"
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
                          <label>Test One</label>
                          <select
                            className="test_add"
                            onChange={(e) => setTestOne(e.target.value)}
                          >
                            <option value="">Select Test One </option>
                            {tests &&
                              tests.map((test) => (
                                <option key={test.name} value={test._id}>
                                  {test.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="input-inside">
                        <div>
                          <label>Test Two </label>
                          <select
                            className="test_add"
                            onChange={(e) => setTestTwo(e.target.value)}
                          >
                            <option value="">Select Test Two</option>
                            {tests &&
                              tests.map((test) => (
                                <option key={test.name} value={test._id}>
                                  {test.name}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div>
                          <label>Test Three</label>
                          <select
                            className="test_add"
                            onChange={(e) => setTestThree(e.target.value)}
                          >
                            <option value="">Select Test Third</option>
                            {tests &&
                              tests.map((test) => (
                                <option key={test.name} value={test._id}>
                                  {test.name}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div>
                          <label>Ref By</label>
                          <input
                            type="text"
                            placeholder="Ref By"
                            required
                            className="test_add"
                            onChange={(e) => setRefBy(e.target.value)}
                          />
                        </div>

                        <div>
                          <label>Sample Drown Date</label>
                          <input
                            type="date"
                            placeholder="SampleDrownDate"
                            required
                            className="test_add"
                            onChange={(e) => setSampleDrownDate(e.target.value)}
                          />
                        </div>

                        <div>
                          <label>Sample Received</label>
                          <input
                            type="date"
                            placeholder="Sample Received"
                            required
                            className="test_add"
                            onChange={(e) => setSampleReceived(e.target.value)}
                          />
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
                      Genrate Report
                    </button>
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

export default NewTest;
