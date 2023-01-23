import axios from "axios";

const API = axios.create({
  // baseURL: "http://65.2.126.223:4000",
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export default API;
