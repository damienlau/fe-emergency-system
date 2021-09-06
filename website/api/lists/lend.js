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

export const addLendListsData = (parameter) => {
  return request.post(lendRequestUrls.add, parameter).then((response) => {
    return response;
  });
};

export const deleteLendListsData = (parameter) => {
  return request.post(lendRequestUrls.delete, parameter).then((response) => {
    return response;
  });
};

export const findLendListsData = (parameter) => {
  return request
    .get(lendRequestUrls.find, { params: { parameter } })
    .then((response) => {
      return response;
    });
};

export const updateLendListsData = (parameter) => {
  return request.post(lendRequestUrls.update, parameter).then((response) => {
    return response;
  });
};
