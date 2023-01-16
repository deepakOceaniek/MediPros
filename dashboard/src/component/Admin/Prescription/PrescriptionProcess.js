import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "../Sidebar";
import {
  getPrescriptionDetails,
  clearErrors,
  updatePrescription,
} from "../../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { UPDATE_PRESCRIPTION_RESET } from "../../../constants/productConstants";
import "./prescriptionProcess.css";

const PrescriptionProcess = () => {
  const { id } = useParams();
  const { prescription, error, loading } = useSelector(
    (state) => state.prescriptionDetails
  );
  console.log(prescription);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.product
  );
  const [status, setStatus] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSaving, setTotalSaving] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [amountToBePaid, setAmountToBePaid] = useState(0);
  // console.log(prescription)
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);
    myForm.set("totalPrice", totalPrice);
    myForm.set("totalSaving", totalSaving);
    myForm.set("shippingFee", shippingFee);
    myForm.set("amountToBePaid", amountToBePaid);

    dispatch(updatePrescription(id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

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
      alert.success("Prescription Updated Successfully");
      dispatch({ type: UPDATE_PRESCRIPTION_RESET });
    }

    dispatch(getPrescriptionDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);
  console.log(prescription.status);
  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newPrescriptionContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmPrescriptionOrderPage"
              // style={{
              //   display:
              //     prescription &&
              //     prescription.status === "Your Medicine Get Ready Pay Now"
              //       ? "block"
              //       : "grid",
              // }}
            >
              <div className="prescriptionOrderDetails">
                <div className="confirmPrescriptionShippingArea">
                  <h1>Prescription Info</h1>
                  <div className="prescriptionOrderDetailsContainerBox">
                    <h1>User Details</h1>
                    <div>
                      <p>Name:</p>
                      <p>{prescription.user && prescription.user.name}</p>
                    </div>
                    <div>
                      <p>Contact:</p>
                      <p>
                        {prescription.user && prescription.user.contact}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="prescriptionConfirmCartItems">
                  <h1>Prescription Images </h1>
                  <div className="prescriptionConfirmCartItemsContainer">
                    {prescription.images &&
                      prescription.images.map((item) => (
                        <div key={item._id}>
                          <img src={item.url} alt="prescription" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div
                // style={{
                //   display:
                //     prescription.status === "Your Medicine Get Ready Pay Now"
                //       ? "none"
                //       : "block",
                // }}
              >
                <form
                  className="updatePrescriptionForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Update Prescription status </h1>

                  <div>
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Update Status</option>
                      {prescription && prescription.status === "Processing" && (
                        <>
                          <option value="Your Medicine Getting Ready">
                            Your Medicine Getting Ready
                          </option>
                          <option value="Due to old date we can not accept this precription">
                            Due to old date we can not accept this precription.
                          </option>
                        </>
                      )}

                      {prescription &&
                        prescription.status ===
                          "Your Medicine Getting Ready" && (
                          <option value="Your Medicine Get Ready Pay Now">
                            Your Medicine Get Ready Pay Now
                          </option>
                        )}
                    </select>
                  </div>

                  <div
                    className="billForm"
                    style={{
                      display:
                        prescription.status === "Your Medicine Getting Ready"
                          ? "block"
                          : "none",
                    }}
                  >
                    <div>
                      <label>Total Price </label>
                      <input
                        type="number"
                        onChange={(e) => setTotalPrice(e.target.value)}
                        placeholder="totalPrice"
                      />
                    </div>

                    <div>
                      <label>Total Saving</label>
                      <input
                        type="number"
                        onChange={(e) => setTotalSaving(e.target.value)}
                        placeholder="totalSaving"
                      />
                    </div>

                    <div>
                      <label>Shipping Fee</label>
                      <input
                        type="number"
                        onChange={(e) => setShippingFee(e.target.value)}
                        placeholder="shippingFee"
                      />
                    </div>

                    <div>
                      <label>Amount To Be Paid</label>
                      <input
                        type="number"
                        onChange={(e) => setAmountToBePaid(e.target.value)}
                        placeholder="amountToBePaid"
                      />
                    </div>
                  </div>

                  <button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default PrescriptionProcess;
