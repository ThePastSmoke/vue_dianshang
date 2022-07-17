// 封装获取本地存储功能的数据
export const setSesscat = (key, data) => {
  sessionStorage.setItem(
    key,
    typeof data === "object" ? JSON.stringify(data) : data
  );
};

export const getSesscat = (key) => {
  const data = sessionStorage.getItem(key);
  // JSON.parse(data);
  // try {
  //   JSON.parse(data);
  // } catch (error) {
  //   console.log(error);
  // }
  return data;
};
