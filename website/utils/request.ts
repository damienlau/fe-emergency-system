import axios from "axios";
import store from "../store";
import { message } from "ant-design-vue";
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
      if (
        response.data.message !== "处理成功" &&
        response.data.message !== "处理成功"
      ) {
        message.info(response.data.message);
      }
      return response.data;
    } else if (response.data.code === 402 || response.data.code === 403) {
      store.commit("userModule/SET_OFFLINE");
    } else {
      message.info(response.data.message);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
