import request from "@/utils/request";
/*
 ** 请求左侧菜单栏目
 */
export const getMenulist = () => {
  return request({
    method: "GET",
    url: "menus",
  });
};
