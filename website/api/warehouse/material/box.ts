import request from "utils/request";
import { materialImageRequestProps } from "./index";

const boxRequestUrls = {
  add: "box/info/add",
  delete: "box/info/deleteBatch",
  all: "box/info/all",
  find: "box/info/page/criteria",
  findCount: "box/info/rack/count",
  update: "box/info/update",
  pendingDataRack: "batchPending/add/rack"
};

export interface boxRequestProps {
  createMan?: number;
  createTime?: string;
  id?: number;
  boxName?: string;
  boxCode?: string;
  assetCode?: string;
  departmentType?: number;
  unit?: string;
  weight?: string;
  size?: number;
  rackNumber?: string;
  rackPosition?: number;
  status?: number;
  materialRemainNumber?: number;
  materialTotalNumber?: number;
  remark?: string;
  isDelete?: number;
  boxImages: materialImageRequestProps[];
  inBatchPendingStatus?: number;
}

export const addBoxData = (parameter: boxRequestProps) => {
  return request.post(boxRequestUrls.add, parameter).then((response) => {
    return response;
  });
};

export const deleteBoxData = (parameter: boxRequestProps) => {
  return request.post(boxRequestUrls.delete, parameter).then((response) => {
    return response;
  });
};

// 查询全部仓库箱子--有分页复杂条件
export const findBoxData = (parameter?: boxRequestProps) => {
  return request
    .get(boxRequestUrls.find, { params: parameter })
    .then((response) => {
      return response.data;
    });
};

// 查询全部仓库箱子--无分页
export const findBoxAllData = (parameter?: boxRequestProps) => {
  return request
    .get(boxRequestUrls.all, { params: parameter })
    .then((response) => {
      return response.data;
    });
};

export const findBoxCountData = (parameter?: number) => {
  return request
    .get(boxRequestUrls.findCount, { params: { rackNumber: parameter } })
    .then((response) => {
      return response.data;
    });
};

export const updateBoxData = (parameter: boxRequestProps) => {
  return request.post(boxRequestUrls.update, parameter).then((response) => {
    return response;
  });
};

// 新增货架批量待处理清单
export const addBatchPendingDataRack = (parameter?: string) => {
  return request
    .get(boxRequestUrls.pendingDataRack, { params: { rackNumber: parameter } })
    .then((response) => {
      return response.data;
    });
};
