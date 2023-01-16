import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY__FAIL,
  REGISTER_ADMIN_REQUEST,
  REGISTER_ADMIN_SUCCESS,
  REGISTER_ADMIN_FAIL,
  LOAD_ADMIN_REQUEST,
  LOAD_ADMIN_SUCCESS,
  LOAD_ADMIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_ADMIN_PROFILE_REQUEST,
  UPDATE_ADMIN_PROFILE_SUCCESS,
  UPDATE_ADMIN_PROFILE_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";
import axios from "axios";

//Login
export const login = (contact) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    // const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.get(
      `/api/v1/login?contact=${contact}&channel=sms`
    );
    console.log(`loginData :${data.message}`);

    dispatch({ type: LOGIN_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//verify
export const verify = (code, contactNum, formData) => async (dispatch) => {
  if (formData === "") {
    formData = new FormData();
    formData.append("contact", contactNum);
  }
  formData.append("code", code);

  console.log(formData);
  try {
    dispatch({ type: VERIFY_REQUEST });
    // const config = { headers: { "Content-Type": "application/json" } };
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    // console.log(code, contact, formData);
    const { data } = await axios.post(`api/v1/verify`, formData, config);
    dispatch({ type: VERIFY_SUCCESS, payload: data });
    console.log(`VerifyData :${data.user}`);
  } catch (error) {
    dispatch({ type: VERIFY__FAIL, payload: error.response.data.message });
  }
};

// Register -- Admin
export const registerAdmin = (userData) => async (dispatch) => {
  console.log(userData.get("contact"));
  const contact = userData.get("contact");
  try {
    dispatch({ type: REGISTER_ADMIN_REQUEST });
    // const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.get(
      `/api/v1/admin/register?contact=${contact}&channel=sms`
      // userData,
      // config
    );
    console.log(data);
    dispatch({ type: REGISTER_ADMIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_ADMIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Load admin -- backend mai get userDetails
export const loadadmin = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_ADMIN_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/me`);
    dispatch({ type: LOAD_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_ADMIN_FAIL, payload: error.response.data.message });
  }
};

//Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Update Profile --admin bnana hai8
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADMIN_PROFILE_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(
      `/api/v1/admin/me/update`,
      userData,
      config
    );
    console.log(data);
    dispatch({ type: UPDATE_ADMIN_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ADMIN_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get All Users -Admin Access
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/users`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// get  User Details -Admin Access
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User -Admin Access
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User -Admin Access
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
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
