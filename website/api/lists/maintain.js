// 维修/保养清单
import request from "utils/request";

const maintainRequestUrls = {
  add: "maintenance/add",
  delete: "maintenance/deleteBatch",
  find: "maintenance/list",
  update: "maintenance/update",
};

export const addMaintainListsData = (parameter) => {
  return request.post(maintainRequestUrls.add, parameter).then((response) => {
    return response;
  });
};

export const deleteMaintainListsData = (parameter) => {
  return request
    .post(maintainRequestUrls.delete, parameter)
    .then((response) => {
      return response;
    });
};

export const findMaintainListsData = (parameter) => {
  return request
    .get(maintainRequestUrls.find, { params: { parameter } })
    .then((response) => {
      return response;
    });
};

export const updateMaintainListsData = (parameter) => {
  return request
    .post(maintainRequestUrls.update, parameter)
    .then((response) => {
      return response;
    });
};
