import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../Product/productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminTest,
  deleteTest,
} from "../../../actions/testAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "../Sidebar";
import { DELETE_TEST_RESET } from "../../../constants/testConstants";
import NotFoundProduct from "../../layout/NotFound/NotFoundProduct";
import Loader from "../../layout/Loader/Loader";

const TestList = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const alert = useAlert();

  const { loading, error, tests } = useSelector((state) => state.tests);
  console.log(tests);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.testPackage
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteTest(id));
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
      alert.success("Test Deleted Successfully");
      Navigate("/admin/tests");
      dispatch({ type: DELETE_TEST_RESET });
    }

    dispatch(getAdminTest());
  }, [dispatch, alert, error, deleteError, Navigate, isDeleted]);

  const columns = [
    {
      field: "id",
      headerName: "Test ID",
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
    // {
    //   field: "image",
    //   headerName: "Image",
    //   minWidth: 300,
    //   flex: 0.5,
    //   headerAlign: "center",
    //   align: "center",

    //   renderCell: (params) => {
    //     return (
    //       <div style={{ height: "90px", width: "200px", borderRadius: "30%" }}>
    //         {" "}
    //         <img
    //           style={{ height: "100%", width: "100%" }}
    //           src={params.value}
    //           alt="package"
    //         />
    //       </div>
    //     );
    //   },
    //   // editable: true,
    // },
    // {
    //   field: "category",
    //   headerName: "Category",
    //   minWidth: 250,
    //   flex: 0.3,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "description",
    //   headerName: "Description",
    //   minWidth: 250,
    //   flex: 0.3,
    //   headerAlign: "center",
    //   align: "center",
    // },

    // {
    //   field: "price",
    //   headerName: "Price",
    //   type: "number",
    //   minWidth: 200,
    //   headerAlign: "center",
    //   align: "center",
    //   flex: 0.5,
    // },

    {
      field: "referenceRange",
      headerName: "Reference Range",
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/test/${params.getValue(params.id, "id")}`}>
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
  console.log(tests);
  tests &&
    tests.forEach((item) => {
      rows.push({
        id: item._id,
        // type: "image",
        // image: item.images[0].url,
        // price: `₹ ${parseFloat(item.price).toFixed(1)}`,
        // category: item.category,
        // description: item.description,
        name: item.name,
        referenceRange: item.referenceRange,
      });
    });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <MetaData title={`ALL TEST - Admin`} />
            <SideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL TEST</h1>
              {tests && tests.length > 0 ? (
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

export default TestList;
