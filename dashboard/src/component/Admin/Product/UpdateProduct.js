import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../layout/Loader/Loader";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();

  const { error, product } = useSelector((state) => state.productDetails);
  console.log(product);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [salt, setSalt] = useState("");
  const [type, setType] = useState("");
  const [safetyInformation, setSafetyInformation] = useState("");
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
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { categories } = useSelector((state) => state.categories);

  const productId = id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setSalt(product.salt);
      setType(product.type);
      setExpired(product.expired);
      setSafetyInformation(product.safetyInformation);
      setProductQuantity(product.productQuantity);
      setCompany(product.company);
      setCategory(product.category);
      setDiscount(product.discount);
      setStock(product.stock);
      setGst(product.gst);
      setBatchCode(product.batchCode);
      setHsnCode(product.hsnCode);
      setOldImages(product.images);
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
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    Navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("type", type);
    myForm.set("salt", salt);
    myForm.set("safetyInformation", safetyInformation);
    myForm.set("productQuantity", productQuantity);
    myForm.set("expired", expired);
    myForm.set("company", company);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("gst", gst);
    myForm.set("batchCode", batchCode);
    myForm.set("hsnCode", hsnCode);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
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
          <MetaData title="Create Product" />
          <div className="dashboard">
            <SideBar />
            <div className=" newProductContainer">
              <div className="addproductrow">
                <form
                  className="content_addproduct"
                  encType="multipart/form-data"
                  onSubmit={updateProductSubmitHandler}
                >
                  <div className="product_row">
                    <h3>Updated Product</h3>
                  </div>
                  <div className="product_row">
                    <div className="inputdiv">
                      <div className="add_product_label">
                        <label>Product Name</label>
                        <input
                          type="text"
                          className="productadd"
                          placeholder="Product Name"
                          required
                          value={name}
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
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="add_product_label">
                        <label>Product Type</label>
                        <input
                          type="text"
                          className="productadd"
                          placeholder="Product Type"
                          required
                          value={type}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="add_product_label">
                        <label>Expiry Date</label>
                        <input
                          className="productadd"
                          type="date"
                          placeholder="Expiry Date"
                          value={expired}
                          required
                          onChange={(e) => setExpired(e.target.value)}
                        />
                      </div>

                      <div className="add_product_label">
                        <label>Product Quantity</label>
                        <input
                          className="productadd"
                          type="number"
                          placeholder="Product Quantity"
                          value={productQuantity}
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
                          placeholder="Product Description"
                          value={description}
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
                          value={safetyInformation}
                          onChange={(e) => setSafetyInformation(e.target.value)}
                        />
                      </div>

                      <div className="add_product_label">
                        <label>Choose Category</label>
                        <select
                          className="productadd"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value={category}>Choose Category</option>
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
                          value={company}
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
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </div>
                      <div className="add_product_label">
                        <label>Discount on Product</label>
                        <input
                          type="number"
                          className="productadd"
                          placeholder="Discount % "
                          required
                          value={discount}
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
                          value={salt}
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
                          value={gst}
                          required
                          onChange={(e) => setGst(e.target.value)}
                        />
                      </div>
                      <div className="add_product_label">
                        <label>BatchCode</label>
                        <input
                          type="text"
                          className="productadd"
                          placeholder="BatchCode"
                          required
                          value={batchCode}
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
                          value={hsnCode}
                          onChange={(e) => setHsnCode(e.target.value)}
                        />
                      </div>
                      <div className="add_product_label">
                        <label>Product Image</label>
                        <input
                          type="file"
                          className="addImage"
                          placeholder="Product Image Upload"
                          name="avatar"
                          accept="image/*"
                          onChange={updateProductImagesChange}
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                  <div id="createProductFormImage">
                    {oldImages &&
                      oldImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt="Old Product Preview"
                        />
                      ))}
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
                      Updated Product
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

export default UpdateProduct;
