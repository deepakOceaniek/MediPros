import axios from "axios";

import {
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  ADMIN_CATEGORY_REQUEST,
  ADMIN_CATEGORY_SUCCESS,
  ADMIN_CATEGORY_FAIL,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  BANNER_REQUEST,
  BANNER_SUCCESS,
  BANNER_FAIL,
  NEW_BANNER_REQUEST,
  NEW_BANNER_SUCCESS,
  NEW_BANNER_FAIL,
  UPDATE_BANNER_REQUEST,
  UPDATE_BANNER_SUCCESS,
  UPDATE_BANNER_FAIL,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  DELETE_BANNER_FAIL,
  BANNER_DETAILS_REQUEST,
  BANNER_DETAILS_SUCCESS,
  BANNER_DETAILS_FAIL,
  ADMIN_PRESCRIPTION_REQUEST,
  ADMIN_PRESCRIPTION_SUCCESS,
  ADMIN_PRESCRIPTION_FAIL,
  NEW_PRESCRIPTION_REQUEST,
  NEW_PRESCRIPTION_SUCCESS,
  NEW_PRESCRIPTION_FAIL,
  UPDATE_PRESCRIPTION_REQUEST,
  UPDATE_PRESCRIPTION_SUCCESS,
  UPDATE_PRESCRIPTION_FAIL,
  DELETE_PRESCRIPTION_REQUEST,
  DELETE_PRESCRIPTION_SUCCESS,
  DELETE_PRESCRIPTION_FAIL,
  PRESCRIPTION_DETAILS_REQUEST,
  PRESCRIPTION_DETAILS_SUCCESS,
  PRESCRIPTION_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products");

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product --admin
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product - admin
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product -admin
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Products Details admin
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/admin/product/${id}`);
    console.log(data);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Category For Admin
export const getAdminCategory = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CATEGORY_REQUEST });

    const { data } = await axios.get("/api/v1/admin/allcategory");
    dispatch({
      type: ADMIN_CATEGORY_SUCCESS,
      payload: data.categories,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: ADMIN_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Category --admin
export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CATEGORY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/admin/category/new`,
      categoryData,
      config
    );
    console.log(data);

    dispatch({
      type: NEW_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Category - admin
export const updateCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/category/${id}`,
      categoryData,
      config
    );

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Category -admin
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    const { data } = await axios.delete(`/api/v1/admin/category/${id}`);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Category Details admin
export const getCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_DETAILS_REQUEST,
    });
    console.log(id);

    const { data } = await axios.get(`/api/v1/admin/category/${id}`);
    console.log(data);
    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Banner -- Admin
export const getAdminBanner = () => async (dispatch) => {
  try {
    dispatch({ type: BANNER_REQUEST });

    const { data } = await axios.get("/api/v1/admin/banner");
    dispatch({
      type: BANNER_SUCCESS,
      payload: data.banners,
    });
  } catch (error) {
    dispatch({
      type: BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create banner --admin
export const createBanner = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_BANNER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/admin/banner/new`,
      categoryData,
      config
    );
    console.log(data);

    dispatch({
      type: NEW_BANNER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Banner - admin
export const updateBanner = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BANNER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/banner/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_BANNER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete banner -admin
export const deleteBannner = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BANNER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/banner/${id}`);

    dispatch({
      type: DELETE_BANNER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Products Details admin
export const getBannerDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: BANNER_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/admin/banner/${id}`);
    console.log(data);
    dispatch({
      type: BANNER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BANNER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Prescription For Admin
export const getAdminPrscription = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRESCRIPTION_REQUEST });

    const { data } = await axios.get("/api/v1/admin/prescription");

    dispatch({
      type: ADMIN_PRESCRIPTION_SUCCESS,
      payload: data.prescription,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRESCRIPTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Prescription --admin
export const createPrescription = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRESCRIPTION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/prescription/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRESCRIPTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRESCRIPTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Prescription - admin
export const updatePrescription = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRESCRIPTION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    console.log(productData);
    const { data } = await axios.put(
      `/api/v1/admin/prescription/${id}`,
      productData,
      config
    );
    console.log(data);

    dispatch({
      type: UPDATE_PRESCRIPTION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRESCRIPTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Prescription -admin
export const deletePrescription = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRESCRIPTION_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/prescription/${id}`);

    dispatch({
      type: DELETE_PRESCRIPTION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRESCRIPTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Prescription Details admin
export const getPrescriptionDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRESCRIPTION_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/admin/prescription/${id}`);
    console.log(data);
    dispatch({
      type: PRESCRIPTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRESCRIPTION_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
