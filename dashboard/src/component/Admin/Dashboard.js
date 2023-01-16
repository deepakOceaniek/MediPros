import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import Chart from "chart.js/auto";
import Loader from "../layout/Loader/Loader.js";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  console.log(user);

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

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
  }, [dispatch, user]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
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

          totalAmount,
          // 4000,
        ],
      },
    ],
  };
  let doughnutState;

  if (products) {
    doughnutState = {
      labels: ["Out of Stock", "InStock"],

      datasets: [
        {
          backgroundColor: ["#FF6347", "#308c89"],
          hoverBackgroundColor: ["#4B5000", "#a7beae"],
          data: [
            outOfStock,
            products.length - outOfStock,
            // 2, 10,
          ],
        },
      ],
    };
  }

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
              <h1 id="dashboardHeading">Dashboard</h1>

              <div className="dashboardSummary">
                <div>
                  <p>
                    Total Amount <br />₹{totalAmount}
                  </p>
                </div>
                <div className="dashboardSummaryBox2">
                  <Link to="/admin/products">
                    <p>{`Products | ${products && products.length} `}</p>
                    <p></p>
                  </Link>
                  <Link to="/admin/orders">
                    <p>{`Orders | ${orders && orders.length}`}</p>
                  </Link>
                  <Link to="/admin/users">
                    <p>{`Users | ${users && users.length} `}</p>
                  </Link>
                </div>
              </div>

              <div className="lineChart">
                <Line data={lineState} />
              </div>

              <div className="doughnutChart">
                <Doughnut data={doughnutState} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
