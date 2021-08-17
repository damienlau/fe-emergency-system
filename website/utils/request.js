import axios from "axios";

// 创建请求实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 1000,
});

// 拦截请求
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
  }
);

// 拦截响应
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
  }
);

export default instance;
