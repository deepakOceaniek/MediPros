import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import { useParams } from "react-router-dom";
import SideBar from "../Sidebar";
import {
  getPrescriptionDetails,
  clearErrors,
  updatePrescription,
} from "../../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../layout/Loader/Loader";
import { useAlert } from "react-alert";
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <MetaData title="Process Order" />
            <SideBar />
            <div className="newPrescriptionContainer">
              <div className="confirmPrescriptionOrderPage">
                <div className="prescriptionOrderDetails">
                  <div className="confirmPrescriptionShippingArea">
                    <h1>Prescription</h1>
                    <div className="prescriptionOrderDetailsContainerBox">
                      <h1>User Details</h1>
                      <div className="label_parameter">
                        <p>Name:</p>
                        <p>{prescription.user && prescription.user.name}</p>
                      </div>
                      <div className="label_parameter">
                        <p>Contact:</p>
                        <p>{prescription.user && prescription.user.contact}</p>
                      </div>
                    </div>
                  </div>
                  <form
                    className="updatePrescriptionForm"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <h1>Update Prescription status </h1>

                    <div className="prescription_label">
                      <label>Update status</label>
                      <div className="prescription_input">
                        <select onChange={(e) => setStatus(e.target.value)}>
                          <option value="">Update Status</option>
                          {prescription &&
                            prescription.status === "Processing" && (
                              <>
                                <option value="Your Medicine Getting Ready">
                                  Your Medicine Getting Ready
                                </option>
                                <option value="Due to old date we can not accept this precription">
                                  Due to old date we can not accept this
                                  precription.
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
                      <div className="prescription_label">
                        <label>Total Price </label>
                        <div className="prescription_input">
                          <input
                            type="number"
                            onChange={(e) => setTotalPrice(e.target.value)}
                            placeholder="Total Price"
                          />
                        </div>
                      </div>

                      <div className="prescription_label">
                        <label>Total Saving</label>
                        <div className="prescription_input">
                          <input
                            type="number"
                            onChange={(e) => setTotalSaving(e.target.value)}
                            placeholder="Total Saving"
                          />
                        </div>
                      </div>

                      <div className="prescription_label">
                        <label>Shipping Fee</label>
                        <div className="prescription_input">
                          <input
                            type="number"
                            onChange={(e) => setShippingFee(e.target.value)}
                            placeholder="Shipping Fee"
                          />
                        </div>
                      </div>

                      <div className="prescription_label">
                        <label>Amount To Be Paid</label>
                        <div className="prescription_input">
                          <input
                            type="number"
                            onChange={(e) => setAmountToBePaid(e.target.value)}
                            placeholder="Amount To Be Paid"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      id="prescriptionBtn"
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Process
                    </button>
                  </form>
                </div>

                <div>
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
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default PrescriptionProcess;
