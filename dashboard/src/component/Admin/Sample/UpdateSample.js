import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateSample,
  getSampleDetails,
} from "../../../actions/testAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../layout/Loader/Loader";
import { UPDATE_SAMPLE_RESET } from "../../../constants/testConstants";

const UpdateSample = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();

  const { error, sample } = useSelector((state) => state.sampleDetails);
  console.log(sample);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.testPackage);

  const [name, setName] = useState("");
  const [sampleCode, setSampleCode] = useState("");

  const sampleId = id;

  useEffect(() => {
    if (sample && sample._id !== sampleId) {
      dispatch(getSampleDetails(sampleId));
    } else {
      setName(sample.name);
      setSampleCode(sample.sampleCode);
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
      alert.success("Update Sample Successfully");
      Navigate("/admin/samples");
      dispatch({ type: UPDATE_SAMPLE_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    Navigate,
    isUpdated,
    sampleId,
    sample,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("sampleCode", sampleCode);
    dispatch(updateSample(sampleId, myForm));
  };
  return (
    <Fragment>
      <MetaData title="Update Sample" />
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
                    <h1>Update Sample</h1>
                  </div>
                  <div className="Category_row">
                    <div className="update_sample_label">
                      <label>Sample Name :</label>
                      <input
                        type="text"
                        placeholder="Sample Name"
                        className="sample_input"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="update_sample_label">
                      <label>Sample Code :</label>
                      <input
                        type="text"
                        placeholder="Sample Code"
                        required
                        className="sample_input"
                        value={sampleCode}
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
                      Update Sample
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* {loading ? <Loader /> : <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Sample</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Sample Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
       

            <div>
              <DescriptionIcon />

              <input
                placeholder="Sample Code"
                value={sampleCode}
                onChange={(e) => setSampleCode(e.target.value)}
                required

              ></input>
            </div>
           
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>} */}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateSample;
