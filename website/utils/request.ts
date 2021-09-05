import { message as Message } from "ant-design-vue";
import axios from "axios";
import store from "../store";

enum messageStatus {
  "error",
  "success",
}

enum responseCode {
  Success,
  ParametrError = 400,
  LimitError = 401,
  TokenTimeout = 402,
  NoAuth = 403,
  NotFound = 404,
  DownGrade = 406,
  ServerError = 500,
}

Message.config({
  top: `var(--size-88)`,
  maxCount: 1,
});

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_REQUEST_URL,
});

const handleUse = (msg?: string, status?: responseCode) => {
  store.commit("SET_SPINNING");

  if (msg) {
    if (status === responseCode.Success) {
      Message.success(msg);
    } else {
      Message.error(msg);
    }
  }
};

instance.interceptors.request.use(
  (config) => {
    handleUse();
    config.headers["authorization"] = localStorage.getItem("token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (typeof response.headers.authorization !== "undefined") {
      store.commit("userModule/SET_TOKEN", response.headers.authorization);
    }
    handleUse(response.data.message, response.data.code);
    return response.data.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
