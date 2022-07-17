import axios from "axios";
// 引入vuex
import store from "@/store/index";

const request = axios.create({
  // 基准地址
  baseURL: "http://liufusong.top:8899/api/private/v1/",
});

// 设置请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = store.state?.user;
    // 判断token是否存在 存在的话设置请求头
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    // 最后放行
    return config;
  },
  (err) => {
    // 出现错误后把错误传递下去
    return Promise.reject(err);
  }
);

export default request;
