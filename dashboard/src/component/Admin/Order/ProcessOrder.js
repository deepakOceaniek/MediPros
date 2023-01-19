import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import SideBar from "../Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstant";
import "./processOrder.css";

const ProcessOrder = () => {
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  console.log(order);
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <MetaData title="Process Order" />
            <SideBar />
            <div className="newOrderContainer">
              <div className="orderProcess">
                <div className="orderContainer">
                  <div className="confirmshippingArea">
                    <div>
                      <h2>Order Details :</h2>
                    </div>
                    <div className="orderDetailsContainerBox">
                      <h1>Shipping Info</h1>
                      <div>
                        <p>Name :</p>
                        <p>
                          &nbsp;&nbsp;&nbsp;
                          {order.user && order.user.defaultAddress[0].name}
                        </p>
                      </div>
                      <div>
                        <p>Phone :</p>
                        <p>
                          &nbsp;&nbsp;&nbsp;
                          {order.user && order.user.defaultAddress[0].contact}
                        </p>
                      </div>
                      <div>
                        <p>Address:</p>
                        <p>
                          {order.user &&
                            `${order.user.defaultAddress[0].address}, ${order.user.defaultAddress[0].area}, ${order.user.defaultAddress[0].city}, ${order.user.defaultAddress[0].pinCode}, ${order.user.defaultAddress[0].state}`}
                        </p>
                      </div>
                    </div>

                    <div className="orderDetailsContainerBox">
                      <h1>Payment</h1>
                      <div>
                        <p>Paid : </p>
                        <p
                          className={
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>

                      <div>
                        <p>Total Amount :</p>
                        <p>
                          <b>
                            ₹
                            {parseFloat(
                              order.amountToBePaid && order.amountToBePaid
                            ).toFixed(2)}
                          </b>
                        </p>
                      </div>
                    </div>

                    <div className="orderDetailsContainerBox">
                      <h1>Order Status</h1>
                      <div>
                        <p>Order Status :</p>
                        <p
                          className={
                            order.orderStatus &&
                            order.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.orderStatus && order.orderStatus}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display:
                        order.orderStatus === "Delivered" ? "none" : "block",
                    }}
                  >
                    <form
                      className="updateOrderForm"
                      onSubmit={updateOrderSubmitHandler}
                    >
                      <h1>Order Status</h1>
                      <div>
                        {/* <AccountTreeIcon /> */}
                        <select onChange={(e) => setStatus(e.target.value)}>
                          <option value="">Update Status</option>
                          {order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}

                          {order.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select>
                      </div>

                      <Button
                        id="update_order_status_Btn"
                        type="submit"
                        disabled={
                          loading ? true : false || status === "" ? true : false
                        }
                      >
                        Process
                      </Button>
                    </form>
                  </div>
                </div>
                <div>
                  <div className="confirmCartItems">
                    <h1>Order Items </h1>
                    <div className="confirmCartItemsContainer">
                      <div>
                        <p>Product Image</p>
                        <p>Name</p>
                        <p>quantity</p>
                        <p>Product price</p>
                        <p>Product Total Price</p>
                      </div>
                    </div>
                    <div className="confirmCartItemsContainer">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div key={item._id}>
                            <p>
                              <img src={item.images[0].url} alt="Product" />
                            </p>

                            <p>
                              <Link to={`/product/${item.productId}`}>
                                {item.name}
                              </Link>
                            </p>

                            <p>{item.quantity}</p>
                            <p>₹{parseFloat(item.price).toFixed(2)}</p>
                            <p>
                              <b>
                                ₹
                                {parseFloat(item.price * item.quantity).toFixed(
                                  2
                                )}
                              </b>
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default ProcessOrder;
