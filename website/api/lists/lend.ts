// 借货清单
import request from "utils/request";

export interface lendRequestProps {
  currentPage?: number;
  pageSize?: number;
  id: string;
  eventId: string | number;
  eventName?: string;
  personnelName: string;
  personnelPhone: string;
  personnelJobNo: string;
  departmentType: string | number;
  createMan?: string;
  createTime?: string;
}

const lendRequestUrls = {
  add: "outForm/add",
  delete: "outForm/deleteBatch",
  find: "outForm/list",
  login: "outForm/login",
  logout: "outForm/loginOut",
  update: "outForm/update",
};

export const addLendListsData = (parameter: lendRequestProps) => {
  return request.post(lendRequestUrls.add, parameter).then((response) => {
    return response;
  });
};

export const deleteLendListsData = (parameter: lendRequestProps) => {
  return request.post(lendRequestUrls.delete, parameter).then((response) => {
    return response;
  });
};

export const findLendListsData = (parameter: lendRequestProps) => {
  return request
    .get(lendRequestUrls.find, { params: { parameter } })
    .then((response) => {
      return response;
    });
};

export const updateLendListsData = (parameter: lendRequestProps) => {
  return request.post(lendRequestUrls.update, parameter).then((response) => {
    return response;
  });
};
