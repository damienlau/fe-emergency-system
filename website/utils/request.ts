import axios from "axios";
import store from "../store";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_REQUEST_URL,
});

instance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers["authorization"] = localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.data.code === 0) {
      if (response.headers["authorization"]) {
        localStorage.setItem("token", response.headers["authorization"]);
      }
      return response.data;
    } else {
      store.commit("user/SET_OFFLINE");
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
