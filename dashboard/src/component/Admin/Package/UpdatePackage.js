import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updatePackage,
  getPackageDetails,
  getAdminLabCategory,
  getAdminSample

} from "../../../actions/testAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import { UPDATE_PACKAGE_RESET } from "../../../constants/testConstants";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../layout/Loader/Loader";

const UpdatePackage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();

  const { error, testPackage } = useSelector((state) => state.packageDetails);
  console.log(testPackage);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const [verify, setVerify] = useState("");
  const [test, setTest] = useState("");
  const [numOfTest, setNumOfTest] = useState("");
  const [testTiming, setTestTiming] = useState("");
  const [category, setCategory] = useState("");
  const [sample, setSample] = useState(0);
  const [report, setReport] = useState("");

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { labCategories } = useSelector((state) => state.labCategories);
  const { samples } = useSelector((state) => state.samples);

  console.log(labCategories)
  console.log(samples)
  const testPackageId = id;

  useEffect(() => {
    if (testPackage && testPackage._id !== testPackageId) {
      dispatch(getPackageDetails(testPackageId));
      dispatch(getAdminSample())
      dispatch(getAdminLabCategory())
    } else {
      setName(testPackage.name);
      setDescription(testPackage.description);
      setPrice(testPackage.price);
      setVerify(testPackage.verify);
      setTest(testPackage.tests);
      setNumOfTest(testPackage.numOfTest);
      setTestTiming(testPackage.testTiming);
      setCategory(testPackage.category);
      setSample(testPackage.sample);
      setReport(testPackage.report);
      setOldImages(testPackage.images);
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
      Navigate("/admin/products");
      dispatch({ type: UPDATE_PACKAGE_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    Navigate,
    isUpdated,
    testPackageId,
    testPackage,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("verify", verify);
    myForm.set("test", test);
    myForm.set("numOfTest", numOfTest);
    myForm.set("testTiming", testTiming);
    myForm.set("category", category);
    myForm.set("sample", sample);
    myForm.set("report", report);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updatePackage(testPackageId, myForm));
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
      <MetaData title="Update Package" />
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
                onSubmit={updateProductSubmitHandler}
              >
                <div className="content_add_package">
                  <div className="package_row">
                    <h1>Update Package</h1>
                  </div>
                  <div className="package_row">
                    <div className="inside-input">
                      <div className="form_Label">
                        <label>Package Name :</label>
                        <input
                          type="text"
                          placeholder="Package Name"
                          className="package_add"
                          s
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form_Label">
                        <label>Package Description :</label>
                        <input
                          placeholder="Package Description"
                          value={description}
                          className="package_add"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="form_Label">
                        <label>Price :</label>
                        <input
                          type="number"
                          placeholder="Price"
                          className="package_add"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="form_Label">
                        <label>Verify :</label>
                        <input
                          type="text"
                          placeholder="Verify"
                          className="package_add"
                          required
                          value={verify}
                          onChange={(e) => setVerify(e.target.value)}
                        />
                      </div>
                      <div className="form_Label">
                        <label>Tests :</label>
                        <input
                          type="text"
                          placeholder="tests"
                          className="package_add"
                          required
                          value={test}
                          onChange={(e) => setTest(e.target.value)}
                        />
                      </div>
                      <div className="form_Label">
                        <label>Num Of Test :</label>
                        <input
                          type="Number"
                          placeholder="numOfTest"
                          className="package_add"
                          required
                          value={numOfTest}
                          onChange={(e) => setNumOfTest(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="inside_input_row ">
                      <div className="form_Label">
                        <label>Test Timing :</label>
                      <input
                        type="text"
                        placeholder="testTiming"
                        className="package_add"
                        required
                        value={testTiming}
                        onChange={(e) => setTestTiming(e.target.value)}
                      />
                      </div>
                      <div>
                        <div className="form_Label">
                          <label>Choose Category :</label>
                        <select
                          className="package_add"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value={category}>Choose Category</option>
                          { labCategories && labCategories.map((cate) => (
                            <option key={cate._id} value={cate._id}>
                              {cate.categoryName}
                            </option>
                          ))}
                        </select>
                        </div>
                      </div>
                      <div>
                        <div className="form_Label">
                          <label>Choose Sample :</label>
                        <select
                          className="package_add"
                          onChange={(e) => setSample(e.target.value)}
                        >
                          <option value={sample}>Choose Sample</option>
                          {samples && samples.map((sam) => (
                            <option key={sam._id} value={sam._id}>
                              {sam.name}
                            </option>
                          ))}
                        </select>
                        </div>
                      </div>
                      <div className="form_Label">
                        <label>Report :</label>
                      <input
                        type="text"
                        placeholder="report"
                        className="package_add"
                        required
                        value={report}
                        onChange={(e) => setReport(e.target.value)}
                      />
                      </div>
                      <div className="form_Label">
                        <label>Choose Package Image :</label>
                      </div>
                      <input
                        type="file"
                        name="avatar"
                        className="package_add_image"
                        accept="image/*"
                        onChange={updateProductImagesChange}
                        multiple
                      />
                      <div id="createPackageFormImage">
                        {oldImages &&
                          oldImages.map((image, index) => (
                            <img
                              key={index}
                              src={image.url}
                              alt="Old Product Preview"
                            />
                          ))}
                      </div>
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
                      Update Package
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
            <h1>Update Package</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Package Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Package Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Verify"
                required
                value={verify}
                onChange={(e) => setVerify(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Test"
                required
                value={test}
                onChange={(e) => setTest(e.target.value)}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="Number"
                placeholder="tabletPerStrip"
                required
                value={numOfTest}
                onChange={(e) => setNumOfTest(e.target.value)}
              />
            </div>

    

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            
            <div>
              <AccountTreeIcon />
              <select
                value={sample}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Sample</option>
                {samples.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

        
     
            <div>
              <StorageIcon />
              <input
                type="text"
                placeholder="Report"
                valuereport
                value={report}
                required
                onChange={(e) => setReport(e.target.value)}
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
              Create
            </Button>
          </form> */}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePackage;
