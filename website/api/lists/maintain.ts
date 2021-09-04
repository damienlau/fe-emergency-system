// 维修/保养清单
import request from "utils/request";

// 操作类型
enum operationTypeProps {
  maintain = 1,
  repair,
}

// 库存状态
export enum inventoryStatus {
  // 在库
  store,
  // 出库
  deliver,
}

export interface maintainRequestProps {
  currentPage?: number;
  pageSize?: number;
  id: string;
  operationType: operationTypeProps;
  isOutWarehouse: inventoryStatus;
  personnelCompany: string;
  personnelName: string;
  personnelPhone: string;
  description?: string;
  createMan?: string;
  createTime?: string;
}

const maintainRequestUrls = {
  add: "maintenance/add",
  delete: "maintenance/deleteBatch",
  find: "maintenance/list",
  update: "maintenance/update",
};

export const addMaintainListsData = (parameter: maintainRequestProps) => {
  return request.post(maintainRequestUrls.add, parameter).then((response) => {
    return response;
  });
};

export const deleteMaintainListsData = (parameter: maintainRequestProps[]) => {
  return request
    .post(maintainRequestUrls.delete, parameter)
    .then((response) => {
      return response;
    });
};

export const findMaintainListsData = (parameter: maintainRequestProps) => {
  return request
    .get(maintainRequestUrls.find, { params: { parameter } })
    .then((response) => {
      return response;
    });
};

export const updateMaintainListsData = (parameter: maintainRequestProps) => {
  return request
    .post(maintainRequestUrls.update, parameter)
    .then((response) => {
      return response;
    });
};
