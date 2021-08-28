import { message } from "ant-design-vue";
import axios from "axios";
import store from "website/store";

// 全局配置
message.config({
  top: `72px`,
  maxCount: 1,
});

// 创建请求实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 23333,
});

// 拦截请求
instance.interceptors.request.use(
  (config) => {
    store.commit("SET_LOADING");
    if (!store.state.userModule.token) {
      store.commit("userModule/GET_TOKEN");
    }

    config.headers["authorization"] = store.state.userModule.token;

    return config;
  },
  () => {
    message.error(`请求失败，请稍后重试`, () => {
      store.commit("SET_LOADING");
    });
  }
);

// 拦截响应
instance.interceptors.response.use(
  (response) => {
    store.commit("SET_LOADING");
    if (typeof response.headers.authorization !== "undefined") {
      store.commit("userModule/SET_TOKEN", response.headers.authorization);
    }

    switch (response.data.code) {
      case 400:
      case 402:
      case 500:
        message.error(response.data.message).then((a) => {
          console.log(a, 123);
        });
        break;
      default:
        message.success(response.data.message);
        return response.data;
    }
  },
  () => {
    message.error(`网络错误，请稍后重试`, () => {
      store.commit("SET_LOADING");
    });
  }
);

export default instance;
