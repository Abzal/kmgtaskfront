import axios from "axios";
import store from "@/store"
axios.defaults.baseURL = process.env.VUE_APP_ENDPOINT;
// Create an Axios instance
const axiosInstance = axios.create();

// Request interceptor to show loader
axiosInstance.interceptors.request.use((config) => {
    store.commit('setLoading', true); // Show loader
    return config;
}, (error) => {
    store.commit('setLoading', false); // Hide loader
    return Promise.reject(error);
});

// Response interceptor to hide loader
axiosInstance.interceptors.response.use((response) => {
    store.commit('setLoading', false); // Hide loader
    return response;
}, (error) => {
    store.commit('setLoading', false); // Hide loader
    return Promise.reject(error);
});

export default axiosInstance;

