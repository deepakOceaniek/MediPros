import React from "react";
import "./notFoundProduct.css";

const NotFoundProduct = () => {
  return (
    <>
        <div className="no_Order">
          <div className="No_Order_found">
            <div className="no_order_details">
              <div className="No_order_row">
                {/* <h1>All Orders   </h1> */}
              </div>
                <div className="no_order_image">
                  <img src="/Images/noItems.png" alt="not Found" />
                </div>
                <h3>No Order Found</h3>
            </div>
          </div>
        </div>
    </>
  );
};

export default NotFoundProduct;
