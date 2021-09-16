import request from "utils/request";
import { goodsRequestProps } from "./goods";

const maintainRequestUrls = {
  add: "maintenance/add",
  delete: "maintenance/deleteBatch",
  find: "maintenance/page/criteria",
  update: "maintenance/update",
};

export interface maintainRequestProps {
  id?: number;
  operationType?: number;
  isOutWarehouse?: number;
  personnelCompany?: string;
  personnelName?: string;
  personnelPhone?: string;
  description?: string;
  createMan?: number;
  createTime?: string;
  detailList: [
    {
      id?: number;
      maintenanceId?: number;
      materialInfo: goodsRequestProps;
      status?: number;
      startTime?: string;
      endTime?: string;
    }
  ];
}

export const addMaintainData = (parameter: maintainRequestProps) => {
  return request.post(maintainRequestUrls.add, parameter).then((response) => {
    return response;
  });
};

export const deleteMaintainData = (parameter: maintainRequestProps) => {
  return request
    .post(maintainRequestUrls.delete, parameter)
    .then((response) => {
      return response;
    });
};

export const findMaintainData = (parameter?: maintainRequestProps) => {
  return request
    .get(maintainRequestUrls.find, { params: { parameter } })
    .then((response) => {
      return response;
    });
};

export const updateMaintainData = (parameter: maintainRequestProps) => {
  return request
    .post(maintainRequestUrls.update, parameter)
    .then((response) => {
      return response;
    });
};
