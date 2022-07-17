import request from "@/utils/request";

/*
 ** 请求登录接口
 */
export const logining = (username, password) => {
  return request({
    method: "POST",
    url: "login",
    data: {
      username,
      password,
    },
  });
};
