import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_ENDPOINT;
// Create an Axios instance
const axiosInstance = axios.create();

export default axiosInstance;

