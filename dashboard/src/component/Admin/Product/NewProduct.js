/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createProduct,
  getAdminCategory,
} from "../../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import Loader from "../../layout/Loader/Loader";
import { NEW_PRODUCT_RESET } from "../../../constants/productConstants";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [safetyInformation, setSafetyInformation] = useState("");
  const [salt, setSalt] = useState("");
  const [expired, setExpired] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState(0);
  const [gst, setGst] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAdminCategory());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      Navigate("/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, Navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("type", type);
    myForm.set("salt", salt);
    myForm.set("safetyInformation", safetyInformation);
    myForm.set("expired", expired);
    myForm.set("productQuantity", productQuantity);
    myForm.set("company", company);
    myForm.set("category", category);
    myForm.set("discount", discount);
    myForm.set("stock", stock);
    myForm.set("gst", gst);
    myForm.set("batchCode", batchCode);
    myForm.set("hsnCode", hsnCode);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
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

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <MetaData title="Create Product" />
            <SideBar />
            <div className="newProductContainer">
              <div className="addproductrow">
                <form
                  className="content_addproduct"
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <div className="product_row">
                    <h3>Add Product</h3>
                  </div>
                  <div className="product_row">
                    <div className="inputdiv">
                      <div className="add_product_label">
                        <label>Product Name</label>

                        <input
                          type="text"
                          className="productadd"
                          placeholder="Name"
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="add_product_label">
                        <label>Price</label>

                        <input
                          type="number"
                          className="productadd"
                          placeholder="Price"
                          required
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="add_product_label">
                        <label>Medicine Type</label>
                        <select
                          className="productadd"
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value="">Choose Type</option>
                          {/* {categories && */}
                          {/* categories.map((cate) => ( */}
                          <option value="Bottle">Bottle</option>
                          <option value="Strip">Strip</option>
                          <option value="Tube">Tube</option>
                          {/* // ))} */}
                        </select>
                      </div>

                      <div className="add_product_label">
                        <label>Expiry Date</label>

                        <input
                          className="productadd"
                          type="date"
                          placeholder="Expiry Date"
                          required
                          onChange={(e) => setExpired(e.target.value)}
                        />
                      </div>
                      <div className="add_product_label">
                        <label>Product Quantity</label>

                        <input
                          className="productadd"
                          type="number"
                          placeholder="Enter No. Of Tablet/ml/gm"
                          required
                          onChange={(e) => setProductQuantity(e.target.value)}
                        />
                      </div>

                    </div>

                    <div className="inputdiv">
                      <div className="add_product_label">
                        <label>Product Description</label>

                        <input
                          type="text"
                          className="productadd"
                          placeholder="Description"
                          onChange={(e) => setDescription(e.target.value)}
                          cols="30"
                          rows="1"
                        />
                      </div>
                      <div className="add_product_label">
                        <label>Safety Information</label>

                        <input
                          type="text"
                          className="productadd"
                          placeholder="Safety Information"
                          onChange={(e) => setSafetyInformation(e.target.value)}
                        />
                      </div>
                      <div className="add_product_label">
                        <label>Choose Category</label>
                        <select
                          className="productadd"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="">Choose Category</option>
                          {categories &&
                            categories.map((cate) => (
                              <option key={cate.categoryName} value={cate._id}>
                                {cate.categoryName}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="add_product_label">
                        <label>Company</label>

                        <input
                          type="text"
                          className="productadd"
                          placeholder="Company"
                          required
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </div>
                      <div className="add_product_label">
                        <label>Stock</label>
                        <input
                          type="number"
                          className="productadd"
                          placeholder="Stock"
                          required
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </div>
                      <div className="add_product_label">
                        <label>Discount On Product</label>

                        <input
                          type="number"
                          className="productadd"
                          placeholder="Discount on %"
                          required
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="inputdiv">
                      <div className="add_product_label">
                        <label>Salt</label>

                        <input
                          type="text"
                          className="productadd"
                          placeholder="Salt"
                          required
                          onChange={(e) => setSalt(e.target.value)}
                        />
                      </div>
                      <div className="add_product_label">
                        <label>GST</label>

                        <input
                          type="text"
                          className="productadd"
                          placeholder="Gst"
                          required
                          onChange={(e) => setGst(e.target.value)}
                        />
                      </div>
                      <div className="add_product_label">
                        <label>Batch Code</label>

                        <input
                          type="text"
                          className="productadd"
                          placeholder="BatchCode"
                          required
                          onChange={(e) => setBatchCode(e.target.value)}
                        />
                      </div>
                      <div className="add_product_label">
                        <label>HSN Code</label>

                        <input
                          type="text"
                          className="productadd"
                          placeholder="HsnCode"
                          required
                          onChange={(e) => setHsnCode(e.target.value)}
                        />
                      </div>
                      <div className="add_product_label">
                        <label>Product Image</label>

                        <input
                          type="file"
                          className="addImage"
                          placeholder=" Product Image Upload"
                          name="avatar"
                          accept="image/png, image/jpeg"
                          onChange={createProductImagesChange}
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                  <div id="createProductFormImage">
                    {imagesPreview.map((image, index) => (
                      <img key={index} src={image} alt="Product Preview" />
                    ))}
                  </div>
                  <div className="button_row_update_product">
                    <button
                      id="createUpdateProductBtn"
                      type="submit"
                      disabled={loading ? true : false}
                    >
                      Add Product
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

export default NewProduct;
