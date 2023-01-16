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
  categoriesReducer,
  newCategoryReducer,
  categoryDetailsReducer,
  bannersReducer,
  newBannerReducer,
  bannerDetailsReducer,
  prescriptionReducer,
  newPrescriptionsReducer,
  prescriptionDetailsReducer,
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
import { labCategoriesReducer, labCategoryDetailsReducer, newLabCategoryReducer, newPackageReducer, newSampleReducer, newTestReducer, PackageDetailsReducer, packageReducer, packageReviewsReducer, reviewPackageReducer, sampleDetailsReducer, samplesReducer, testDetailsReducer, testPackageReducer, testsReducer } from "./reducers/testReducer";

const reducer = combineReducers({
  products: productsReducer, 
  categories: categoriesReducer,
  productDetails: productDetailsReducer,
  categoryDetails: categoryDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  orderDetails: orderDetailsReducer,
  newProduct: newProductReducer,
  newCategory: newCategoryReducer,
  product: productReducer, 
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,


 prescriptions : prescriptionReducer,
 newPrescription: newPrescriptionsReducer,
 prescriptionDetails: prescriptionDetailsReducer,

  banners : bannersReducer,
  newBanner:newBannerReducer,
  bannerDetails : bannerDetailsReducer,

  tests:testsReducer,
  packages:packageReducer,
  labCategories: labCategoriesReducer,
  newTest :newTestReducer,
  newPackage:newPackageReducer,
  newLabCategory : newLabCategoryReducer,
  testPackage : testPackageReducer,
  testDetails: testDetailsReducer,
  packageDetails: PackageDetailsReducer,
  labCategoryDetails : labCategoryDetailsReducer,
  packageReviews :packageReviewsReducer,
  reviewPackage: reviewPackageReducer,


  samples:samplesReducer,
  newSample:newSampleReducer,
  sampleDetails:sampleDetailsReducer,



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
