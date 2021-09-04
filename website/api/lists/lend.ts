// 借货清单
import request from "utils/request";

const lendRequestUrls = {
  add: "outForm/add",
  delete: "outForm/deleteBatch",
  find: "outForm/list",
  login: "outForm/login",
  logout: "outForm/loginOut",
  update: "outForm/update",
};

export const addLendListData = (parameter) => {
  return request.post(lendRequestUrls.add, parameter).then((response) => {
    return response;
  });
};

export const deleteLendListData = (parameter) => {
  return request.post(lendRequestUrls.delete, parameter).then((response) => {
    return response;
  });
};

export const findLendListData = (parameter) => {
  return request
    .get(lendRequestUrls.find, { params: { parameter } })
    .then((response) => {
      return response;
    });
};

export const updateLendListData = (parameter) => {
  return request.post(lendRequestUrls.update, parameter).then((response) => {
    return response;
  });
};
