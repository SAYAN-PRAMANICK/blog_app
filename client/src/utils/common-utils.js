export const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

export const addElipsis = (str, limit) => {
  return str.length > limit ? str.substring(0, limit) + "..." : str;
};
