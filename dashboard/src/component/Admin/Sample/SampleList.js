import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../Product/productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminSample,
  deleteSample,
} from "../../../actions/testAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "../Sidebar";
import { DELETE_SAMPLE_RESET } from "../../../constants/testConstants";
import NotFoundProduct from "../../layout/NotFound/NotFoundProduct";
import Loader from "../../layout/Loader/Loader";
const SampleList = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const alert = useAlert();

  const { loading, error, samples } = useSelector((state) => state.samples);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.testPackage
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteSample(id));
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
      alert.success("Sample Deleted Successfully");
      Navigate("/admin/Dashboard");
      dispatch({ type: DELETE_SAMPLE_RESET });
    }

    dispatch(getAdminSample());
  }, [dispatch, alert, error, deleteError, Navigate, isDeleted]);

  const columns = [
    {
      field: "id",
      headerName: "Sample ID",
      minWidth: 0,
      flex: 0.1,
      headerAlign: "center",
      align: "center",
      hide: true,
    },

    {
      field: "name",
      headerName: "Sample Name",
      minWidth: 250,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sampleCode",
      headerName: "Sample Code",
      minWidth: 250,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
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
            <Link to={`/admin/sample/${params.getValue(params.id, "id")}`}>
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

  samples &&
    samples.forEach((item) => {
      rows.push({
        id: item._id,
        sampleCode: item.sampleCode,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL SAMPLES - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h1 id="productListHeading">ALL SAMPLES</h1>
              {samples && samples.length > 0 ? (
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

export default SampleList;
