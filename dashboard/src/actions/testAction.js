import axios from "axios";

import {
  ADMIN_TEST_REQUEST,
  ADMIN_TEST_SUCCESS,
  ADMIN_TEST_FAIL,
  NEW_TEST_REQUEST,
  NEW_TEST_SUCCESS,
  NEW_TEST_FAIL,
  NEW_TEST_RESET,
  UPDATE_TEST_REQUEST,
  UPDATE_TEST_SUCCESS,
  UPDATE_TEST_FAIL,
  UPDATE_TEST_RESET,
  DELETE_TEST_REQUEST,
  DELETE_TEST_SUCCESS,
  DELETE_TEST_FAIL,
  DELETE_TEST_RESET,
  TEST_DETAILS_REQUEST,
  TEST_DETAILS_SUCCESS,
  TEST_DETAILS_FAIL,
  ADMIN_PACKAGE_REQUEST,
  ADMIN_PACKAGE_SUCCESS,
  ADMIN_PACKAGE_FAIL,
  NEW_PACKAGE_REQUEST,
  NEW_PACKAGE_SUCCESS,
  NEW_PACKAGE_FAIL,
  NEW_PACKAGE_RESET,
  UPDATE_PACKAGE_REQUEST,
  UPDATE_PACKAGE_SUCCESS,
  UPDATE_PACKAGE_FAIL,
  UPDATE_PACKAGE_RESET,
  DELETE_PACKAGE_REQUEST,
  DELETE_PACKAGE_SUCCESS,
  DELETE_PACKAGE_FAIL,
  DELETE_PACKAGE_RESET,
  PACKAGE_DETAILS_REQUEST,
  PACKAGE_DETAILS_SUCCESS,
  PACKAGE_DETAILS_FAIL,
  ALL_PACKAGE_REVIEW_REQUEST,
  ALL_PACKAGE_REVIEW_SUCCESS,
  ALL_PACKAGE_REVIEW_FAIL,
  DELETE_PACKAGE_REVIEW_REQUEST,
  DELETE_PACKAGE_REVIEW_SUCCESS,
  DELETE_PACKAGE_REVIEW_FAIL,
  DELETE_PACKAGE_REVIEW_RESET,
  ADMIN_LABCATEGORY_REQUEST,
  ADMIN_LABCATEGORY_SUCCESS,
  ADMIN_LABCATEGORY_FAIL,
  NEW_LABCATEGORY_REQUEST,
  NEW_LABCATEGORY_SUCCESS,
  NEW_LABCATEGORY_FAIL,
  NEW_LABCATEGORY_RESET,
  UPDATE_LABCATEGORY_REQUEST,
  UPDATE_LABCATEGORY_SUCCESS,
  UPDATE_LABCATEGORY_FAIL,
  UPDATE_LABCATEGORY_RESET,
  DELETE_LABCATEGORY_REQUEST,
  DELETE_LABCATEGORY_SUCCESS,
  DELETE_LABCATEGORY_FAIL,
  DELETE_LABCATEGORY_RESET,
  LABCATEGORY_DETAILS_REQUEST,
  LABCATEGORY_DETAILS_SUCCESS,
  LABCATEGORY_DETAILS_FAIL,
  SAMPLE_REQUEST,
  SAMPLE_SUCCESS,
  SAMPLE_FAIL,
  NEW_SAMPLE_REQUEST,
  NEW_SAMPLE_SUCCESS,
  NEW_SAMPLE_FAIL,
  NEW_SAMPLE_RESET,
  UPDATE_SAMPLE_REQUEST,
  UPDATE_SAMPLE_SUCCESS,
  UPDATE_SAMPLE_FAIL,
  UPDATE_SAMPLE_RESET,
  DELETE_SAMPLE_REQUEST,
  DELETE_SAMPLE_SUCCESS,
  DELETE_SAMPLE_FAIL,
  DELETE_SAMPLE_RESET,
  SAMPLE_DETAILS_REQUEST,
  SAMPLE_DETAILS_SUCCESS,
  SAMPLE_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/testConstants";

// Get All Test For Admin
export const getAdminTest = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TEST_REQUEST });

    const { data } = await axios.get("/api/v1/admin/tests");

    dispatch({
      type: ADMIN_TEST_SUCCESS,
      payload: data.tests,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_TEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create test --admin
export const createTest = (testData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_TEST_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/test/new`,
      testData,
      config
    );

    dispatch({
      type: NEW_TEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_TEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update test - admin
export const updateTest = (id, testData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TEST_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/test/${id}`,
      testData,
      config
    );

    dispatch({
      type: UPDATE_TEST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete test -admin
export const deleteTest = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TEST_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/test/${id}`);

    dispatch({
      type: DELETE_TEST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Test Details admin
export const getTestDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TEST_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/admin/test/${id}`);
    console.log(data);
    dispatch({
      type: TEST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Package For Admin
export const getAdminPackage = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PACKAGE_REQUEST });

    const { data } = await axios.get("/api/v1/admin/package");

    dispatch({
      type: ADMIN_PACKAGE_SUCCESS,
      payload: data.packages,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Package --admin
export const createPackage = (packageData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PACKAGE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/admin/package/new`,
      packageData,
      config
    );

    dispatch({
      type: NEW_PACKAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update package - admin
export const updatePackage = (id, packageData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PACKAGE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/package/${id}`,
      packageData,
      config
    );

    dispatch({
      type: UPDATE_PACKAGE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete package -admin
export const deletePackage = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PACKAGE_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/package/${id}`);

    dispatch({
      type: DELETE_PACKAGE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Package Details admin
export const getPackageDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PACKAGE_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/admin/package/${id}`);
    console.log(data);
    dispatch({
      type: PACKAGE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PACKAGE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All  Reviews of a Package
export const getAllPackageReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PACKAGE_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/packagereview?id=${id}`);

    dispatch({
      type: ALL_PACKAGE_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_PACKAGE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete package Review of a Product
export const deletePackageReviews =
  (reviewId, packageId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PACKAGE_REVIEW_REQUEST });

      const { data } = await axios.delete(
        `/api/v1/packagereviews?id=${reviewId}&packageId =${packageId}`
      );

      dispatch({
        type: DELETE_PACKAGE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PACKAGE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All labCategory For Admin
export const getAdminLabCategory = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LABCATEGORY_REQUEST });

    const { data } = await axios.get("/api/v1/admin/labcategory");
    dispatch({
      type: ADMIN_LABCATEGORY_SUCCESS,
      payload: data.labCategories,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: ADMIN_LABCATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create labCategory --admin
export const createLabCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_LABCATEGORY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/admin/labcategory/new`,
      categoryData,
      config
    );
    console.log(data);

    dispatch({
      type: NEW_LABCATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_LABCATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update labCategory - admin
export const updateLabCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_LABCATEGORY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/labcategory/${id}`,
      categoryData,
      config
    );

    dispatch({
      type: UPDATE_LABCATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_LABCATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete labCategory -admin
export const deleteLabCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LABCATEGORY_REQUEST });
    const { data } = await axios.delete(`/api/v1/admin/labcategory/${id}`);

    dispatch({
      type: DELETE_LABCATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_LABCATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get labCategory Details admin
export const getLabCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LABCATEGORY_DETAILS_REQUEST,
    });
    console.log(id);

    const { data } = await axios.get(`/api/v1/admin/labcategory/${id}`);
    console.log(data);
    dispatch({
      type: LABCATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LABCATEGORY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Sample For Admin
export const getAdminSample = () => async (dispatch) => {
  try {
    dispatch({ type: SAMPLE_REQUEST });

    const { data } = await axios.get("/api/v1/admin/sample");
    dispatch({
      type: SAMPLE_SUCCESS,
      payload: data.samples,
    });
  } catch (error) {
    dispatch({
      type: SAMPLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Sample --admin
export const createSample = (testData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_SAMPLE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/sample/new`,
      testData,
      config
    );

    dispatch({
      type: NEW_SAMPLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_SAMPLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Sample - admin
export const updateSample = (id, testData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SAMPLE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/sample/${id}`,
      testData,
      config
    );

    dispatch({
      type: UPDATE_SAMPLE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SAMPLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete test -admin
export const deleteSample = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SAMPLE_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/sample/${id}`);

    dispatch({
      type: DELETE_SAMPLE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SAMPLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Test Details admin
export const getSampleDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SAMPLE_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/admin/sample/${id}`);
    console.log(data);
    dispatch({
      type: SAMPLE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SAMPLE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// // Get All Category For Admin
// export const getBanner = () => async (dispatch) => {
//   try {
//     dispatch({ type: BANNER_REQUEST });

//     const { data } = await axios.get("/api/v1/allbanner");
//     dispatch({
//       type: BANNER_SUCCESS,
//       payload: data.banner,
//     });
//   } catch (error) {
//     dispatch({
//       type: BANNER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Create Category --admin
// export const createBanner = (categoryData) => async (dispatch) => {
//   try {
//     dispatch({ type: NEW_BANNER_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };
//     const { data } = await axios.post(
//       `/api/v1/admin/banner/new`,
//       categoryData,
//       config
//     );
//     console.log(data);

//     dispatch({
//       type: NEW_BANNER_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: NEW_BANNER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
