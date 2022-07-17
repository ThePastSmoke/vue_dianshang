import request from "@/utils/request";
/*
 ** 获取用户列表
 */
export const getUserList = (params) => {
  return request({
    mmethod: "GET",
    url: "users",
    params,
  });
};

/*
 ** 修改用户状态
 */
export const changeUserStatus = (id, type) => {
  return request({
    method: "PUT",
    url: `users/${id}/state/${type}`,
  });
};
