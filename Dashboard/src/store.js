import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
  newProductReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducer";
import {
  userReducer,
  profileReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducer";
import {
  allOrdersReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer, // all product and category
  productDetails: productDetailsReducer, // product and category details
  user: userReducer,
  profile: profileReducer,
  orderDetails: orderDetailsReducer,
  newProduct :newProductReducer, //add product and category
  product : productReducer, // update and delete products and category
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews :productReviewsReducer,
  review : reviewReducer

});

let initialState = {
  // cart: {
  //   cartItems: localStorage.getItem("cartItems")
  //     ? JSON.parse(localStorage.getItem("cartItems"))
  //     : [],
  //   shippingInfo: localStorage.getItem("shippingInfo")
  //     ? JSON.parse(localStorage.getItem("shippingInfo"))
  //     : {},
  // },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
