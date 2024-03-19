import axios from "axios";
import { getToken } from "../redux/actions/notifications";
// import handleResponseError from "./handleResponseError";

const requestHeaders = { "Content-Type": "application/json" };
const authToken = localStorage.getItem("auth_token");
axios.interceptors.request.use(
  function(config) {
    const token = getToken(); 
    if (token) {
      config.headers["Authorization"] = getToken();
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

if (authToken) {
  requestHeaders.Authorization = `${authToken}`;
}

// baseURL: "http://localhost:4000/api",
const Axios = axios.create({
  //you can change this when running locally with your local backend server
  baseURL: process.env.REACT_APP_URL,
  // baseURL: base_url,
  headers: requestHeaders,
});

export const Instance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("auth_token")
  }
});

// Add a request interceptor
Axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
Axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // if (parseInt(error?.response?.status) === 406) {
    //   window.location.href = "/dashboard/account?section=plans";
    // }
    // if (parseInt(error?.response?.status) === 401) {
    //   window.location.href = "/login";
    // }
    // handleResponseError(error.response);
    return Promise.reject(error);
  }
);

export default Axios;
