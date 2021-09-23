import { AxiosResponse } from "axios";
import request from "utils/request";
import { materialImageRequestProps } from "./index";

const goodsRequestUrls = {
  add: "material/info/add",
  delete: "material/info/deleteBatch",
  find: "material/info/page/criteria",
  update: "material/info/update",
  distinct: "/material/info/all/distinct",
};

export interface goodsRequestProps {
  createMan?: number;
  createTime?: string;
  id?: number;
  materialName?: string;
  materialCode?: string;
  assetCode?: string;
  departmentType?: number;
  brand?: string;
  specification?: string;
  unit?: string;
  status?: number;
  isBox?: number;
  boxCode?: string;
  boxName?: string;
  rackNumber?: string;
  rackPosition?: number;
  productionDate?: string;
  productionEnterprise?: string;
  productionBatch?: string;
  isExpiration?: number;
  expirationDate?: string;
  remark?: string;
  isDelete?: number;
  materialImages?: materialImageRequestProps[];
  inBatchPendingStatus?: number;
}

export const addGoodsData = (parameter: goodsRequestProps) => {
  return request.post(goodsRequestUrls.add, parameter).then((response) => {
    return response;
  });
};

export const deleteGoodsData = (parameter: goodsRequestProps) => {
  return request.post(goodsRequestUrls.delete, parameter).then((response) => {
    return response;
  });
};

export const findGoodsData = (parameter?: goodsRequestProps) => {
  return request
    .get(goodsRequestUrls.find, { params: parameter })
    .then((response: AxiosResponse) => {
      return response.data;
    });
};

export const updateGoodsData = (parameter: goodsRequestProps) => {
  return request.post(goodsRequestUrls.update, parameter).then((response) => {
    return response;
  });
};

// 获取箱内物资清单-去重
export const findBoxDistinct = (params: any) => {
  return request.get(goodsRequestUrls.distinct, { params }).then((response) => {
    return response;
  });
};
