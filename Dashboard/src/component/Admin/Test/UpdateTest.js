import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateTest,
  getTestDetails,
} from "../../../actions/testAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "../Sidebar";
import { UPDATE_TEST_RESET } from "../../../constants/testConstants";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTest = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();

  const { error, test } = useSelector((state) => state.testDetails);
console.log(test)
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

  const categories = [
    "Ayurveda",
    "Vitamins & supplements",
    "Healthcare devices",
    "Pain Relief",
    "Diabetes Care",
    "Skin Care"
  ];
  const packages = [
    "Full Body Check up",
    "Vitamins Check up",
    "Healthcare devices",
    "Diabetes Care",
  ];
  const samples = [
    "Blood",
    "Urine",
  ];

  const testId = id;

  useEffect(() => {
    if (test && test._id !== testId) {
      dispatch(getTestDetails(testId));
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
  }, [
    dispatch,
    alert,
    error,
    Navigate,
    isUpdated,
    testId,
    test,
    updateError,
  ]);

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
      <MetaData title="Update Test" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Test</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Test Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
       

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Test Description"
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
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Lab Category</option>
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
                value={packageTest}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Package</option>
                {packages.map((cate) => (
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
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateTest;