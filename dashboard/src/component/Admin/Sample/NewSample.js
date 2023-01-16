/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from "react";
import "../Category/newCategory.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createSample } from "../../../actions/testAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import Loader from "../../layout/Loader/Loader";
import { NEW_SAMPLE_RESET } from "../../../constants/testConstants";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newSample);

  const [name, setName] = useState("");
  const [sampleCode, setSampleCode] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Sample Created Successfully");
      Navigate("/admin/dashboard");
      dispatch({ type: NEW_SAMPLE_RESET });
    }
  }, [dispatch, alert, error, Navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("sampleCode", sampleCode);
    dispatch(createSample(myForm));
  };

  return (
    <Fragment>
      <MetaData title="Create Sample" />
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
                    <h1>Add New Sample</h1>
                  </div>
                  <div className="Category_row">
                    <div className="add_new_sample_label">
                      <label>Sample Name :</label>
                    <input
                      type="text"
                      placeholder="Sample Name"
                      className="sample_input"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                    <div className="add_new_sample_label">
                      <label>Sample Code :</label>
                    <input
                      type="text"
                      placeholder="Sample Code"
                      required
                      className="sample_input"
                      onChange={(e) => setSampleCode(e.target.value)}
                    />
                    </div>

                  </div>

                  <div className="button_Category">
                    <button
                      id="createProductBtn"
                      type="submit"
                      disabled={loading ? true : false}
                    >
                    
                      Add Sample
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

export default NewProduct;
