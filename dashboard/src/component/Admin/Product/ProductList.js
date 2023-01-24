import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "../Sidebar";
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstants";
import NotFoundProduct from "../../layout/NotFound/NotFoundProduct";
import Loader from "../../layout/Loader/Loader";
const ProductList = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const alert = useAlert();

  const { loading, error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      Navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, Navigate, isDeleted]);

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 0,
      flex: 0.1,
      headerAlign: "center",
      align: "center",
      hide: true,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "image",
      headerName: "Image",
      minWidth: 250,
      flex: 0.5,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        return (
          <div style={{ height: "90px", width: "60px", borderRadius: "30%" }}>
            <img
              style={{ height: "100%", width: "100%" }}
              src={params.value}
              alt="products"
            />
          </div>
        );
      },
      // editable: true,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 250,
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 250,
      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 250,
      headerAlign: "center",
      align: "center",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        type: "image",
        image: item.images[0].url,
        stock: `${item.stock} quantity`,
        price: `₹ ${parseFloat(item.price).toFixed(2)}`,
        name: item.name,
      });
    });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <MetaData title={`ALL PRODUCTS - Admin`} />
            <SideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL PRODUCTS</h1>
              {products && products.length > 0 ? (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={8}
                  disableSelectionOnClick
                  className="productListTable"
                  rowHeight={100}
                  // checkboxSelection
                />
              ) : (
                <NotFoundProduct />
              )}
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default ProductList;
