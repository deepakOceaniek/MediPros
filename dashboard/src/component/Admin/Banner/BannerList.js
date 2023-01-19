import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../Product/productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminBanner,
  deleteBannner,
} from "../../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "../Sidebar";
import { DELETE_BANNER_RESET } from "../../../constants/productConstants";
import NotFoundProduct from "../../layout/NotFound/NotFoundProduct";
import Loader from "../../layout/Loader/Loader";
const BannerList = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const alert = useAlert();

  const { loading, error, banners } = useSelector((state) => state.banners);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteBannner(id));
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
      alert.success("Banner Deleted Successfully");
      Navigate("/admin/banner");
      dispatch({ type: DELETE_BANNER_RESET });
    }

    dispatch(getAdminBanner());
  }, [dispatch, alert, error, deleteError, Navigate, isDeleted]);

  const columns = [
    {
      field: "id",
      headerName: "Banner ID",
      minWidth: 0,
      flex: 0.1,
      headerAlign: "center",
      align: "center",
      hide: true,
    },

    {
      field: "image",
      headerName: "Image",
      minWidth: 900,
      flex: 1,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        return (
          <div style={{ height: "90px", width: "200px", borderRadius: "30%" }}>
            <img
              style={{ height: "100%", width: "100%" }}
              src={params.value}
              alt="banner"
            />
          </div>
        );
      },
      // editable: true,
    },

    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 300,
      headerAlign: "center",
      align: "center",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/banner/${params.getValue(params.id, "id")}`}>
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

  banners &&
    banners.forEach((item) => {
      rows.push({
        id: item._id,
        type: "image",
        image: item.images[0].url,
      });
    });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <SideBar />
            <MetaData title={`Banners - Admin`} />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL Banners</h1>
              {banners && banners.length > 0 ? (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
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

export default BannerList;
