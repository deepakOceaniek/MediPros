import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../Product/productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminPrscription,
  deletePrescription,
} from "../../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "../Sidebar";
import { DELETE_PRESCRIPTION_RESET } from "../../../constants/productConstants";
import NotFoundProduct from "../../layout/NotFound/NotFoundProduct";
import Loader from "../../layout/Loader/Loader";
const PrescriptionList = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const alert = useAlert();

  const { loading, error, prescriptions } = useSelector(
    (state) => state.prescriptions
  );
  console.log(prescriptions);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deletePrescription(id));
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
      alert.success("Prescription Deleted Successfully");
      Navigate("/admin/Dashboard");
      dispatch({ type: DELETE_PRESCRIPTION_RESET });
    }

    dispatch(getAdminPrscription());
  }, [dispatch, alert, error, deleteError, Navigate, isDeleted]);

  const columns = [
    {
      field: "id",
      headerName: "Prescription ID",
      minWidth: 250,
      flex: 0,
      headerAlign: "center",
      align: "center",
      hide: true,
    },

    {
      field: "name",
      headerName: "User Name",
      minWidth: 250,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "contact",
      headerName: "User Contact",
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
          <div style={{ height: "90px", width: "180px", borderRadius: "30%" }}>
            <img
              style={{ height: "100%", width: "100%" }}
              src={params.value}
              alt="prescription"
            />
          </div>
        );
      },
      // editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 250,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      cellClassName: (params) => {
        return params.getValue(params.id, "status") ===
          "Your Medicine Get Ready Pay Now"
          ? "greenColor"
          : "redColor";
      },
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
            <Link
              to={`/admin/prescription/${params.getValue(params.id, "id")}`}
            >
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

  prescriptions &&
    prescriptions.forEach((item) => {
      rows.push({
        id: item._id,
        type: "image",
        image: item.images[0].url,
        name: item.user.name,
        contact: item.user.contact,
        status: item.status,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRESCRIPTION - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h1 id="productListHeading">ALL PRESCRIPTION</h1>
              {prescriptions && prescriptions.length > 0 ? (
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
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default PrescriptionList;
