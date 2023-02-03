import React, { useEffect } from "react";
import "./LabDashboard.css";
import Sidebar from "./Sidebar";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { getAllOrders } from "../../actions/orderAction";
import { getAdminProduct } from "../../actions/productAction";
import { getAllUsers } from "../../actions/userAction.js";
import { getAdminPackage, getAdminTest } from "../../actions/testAction.js";
import { CircularProgressbar } from "react-circular-progressbar";
import { textAlign } from "@mui/system";

const LabDashboard = () => {
  const dispatch = useDispatch();

  const { user, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  console.log(user);

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);
  const { packages } = useSelector((state) => state.packages);
  const { tests } = useSelector((state) => state.tests);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    if (user && user.category === "Pharmacy") {
      dispatch({ type: "PHARMACY", payload: true });
    }

    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAdminPackage());
    dispatch(getAdminTest());
  }, [dispatch, user]);

  let myOrders;
  if (user && user.category === "Pharmacy") {
    myOrders =
      orders && orders.filter((order) => order.ordersFor === "Pharmacy");
  } else {
    myOrders = orders && orders.filter((order) => order.ordersFor === "Lab");
  }

  let amountToBePaid = 0;
  myOrders &&
    myOrders.forEach((item) => {
      amountToBePaid += item.amountToBePaid;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [
          0,

          amountToBePaid,
          // 4000,
        ],
      },
    ],
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
              <h1 id="dashboardHeading">Lab Dashboard</h1>

              <div className="dashboardSummary">
                <div>
                  <p>
                    Total Amount <br />₹{amountToBePaid}
                  </p>
                </div>
              </div>
              <div className="dashboardSummaryBoxlab">
                <Link to="/admin/users">
                  <div
                    className="CircularProgressbar"
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  >
                    <CircularProgressbar
                      value={users && users.length / 100}
                      text={`${users && users.length / 100}%`}
                      styles={{
                        root: {},
                        // Customize the text
                        text: {
                          // Text color
                          fill: "#f88",
                          // Text size
                          fontSize: "16px",
                        },
                      }}
                    />
                    <p> {`User | ${users && users.length}`} </p>
                  </div>
                </Link>

                <Link to="/admin/packages">
                  <div
                    className="CircularProgressbar"
                    style={{
                      width: 100,
                      height: 100,
                      // fontSize: 25,
                      // marginTop: 25,
                    }}
                  >
                    <CircularProgressbar
                      value={packages && packages.length / 100}
                      text={`${packages && packages.length / 100}%`}
                      styles={{
                        root: {},
                        // Customize the text
                        text: {
                          // Text color
                          fill: "#f88",
                          // Text size
                          fontSize: "16px",
                        },
                      }}
                    />
                    <p>{`Packages | ${packages && packages.length}`}</p>
                  </div>
                </Link>
                <Link to="/admin/tests">
                  <div
                    className="CircularProgressbar"
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  >
                    <CircularProgressbar
                      value={tests && tests.length / 100}
                      text={`${tests && tests.length / 100}%`}
                      styles={{
                        root: {},
                        // Customize the text
                        text: {
                          // Text color
                          fill: "#f88",
                          // Text size
                          fontSize: "16px",
                        },
                      }}
                    />
                    <p>{`Test | ${tests && tests.length}`}</p>
                  </div>
                </Link>

                <Link to ="/admin/orders">
                <div
                  className="CircularProgressbar"
                  style={{ width: 100, height: 100 }}
                >
                  <CircularProgressbar
                    value={myOrders && myOrders.length / 100}
                    text={`${myOrders && myOrders.length / 100}%`}
                    styles={{
                      root: {},
                      // Customize the text
                      text: {
                        // Text color
                        fill: "#f88",
                        // Text size
                        fontSize: "16px",
                      },
                    }}
                  />
                  <p>{`Booked Test | ${myOrders && myOrders.length}`} </p>
                </div>
                </Link>
                <div
                  className="CircularProgressbar"
                  style={{ width: 100, height: 100 }}
                >
                  <CircularProgressbar
                    value={50}
                    text={`${1 * 100}%`}
                    styles={{
                      root: {},
                      // Customize the text
                      text: {
                        // Text color
                        fill: "#f88",
                        // Text size
                        fontSize: "16px",
                      },
                    }}
                  />
                  <p>Delivered |</p>
                </div>

                <div
                  className="CircularProgressbar"
                  style={{
                    width: 100,
                    height: 100,
                  }}
                >
                  <CircularProgressbar
                    value={50}
                    text={`${1 * 100}%`}
                    styles={{
                      root: {},
                      // Customize the text
                      text: {
                        // Text color
                        fill: "#f88",
                        // Text size
                        fontSize: "16px",
                      },
                    }}
                  />
                  <p>Pending |</p>
                </div>
              </div>
              <div className="lineChart">
                <Line data={lineState} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LabDashboard;
