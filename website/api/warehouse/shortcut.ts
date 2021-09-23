import { responseProps } from "api/utils";
import { AxiosResponse } from "axios";
import request from "utils/request";
import { boxRequestProps } from "./material/box";
import { goodsRequestProps } from "./material/goods";

const shortcutRequestUrls = {
  add: "batchPending/add",
  delete: "batchPending/deleteBatch",
  find: "batchPending/list",
  findCount: "batchPending/count",
  update: "batchPending/update",
  deleteByFind: "batchPending/deleteByFind"
};

export interface shortcutCountRequestProps {
  totalNum?: number;
  outNum?: number;
  weiXiuNum?: number;
  baoYangNum?: number;
}

export interface shortcutRequestProps {
  id?: number;
  operationType?: number;
  resourceType?: number;
  materialId?: number;
  boxId?: number;
  createMan?: number;
  createTime?: string;
  warehouseMaterialInfo?: goodsRequestProps;
  warehouseBoxInfo?: boxRequestProps;
}

// 删除仓库批量待处理清单
export const deleteByFindData = (params: any) => {
  return request.get(shortcutRequestUrls.deleteByFind, { params }).then((response) => {
    return response.data
  })
}

export const addShortcutData = (parameter: shortcutRequestProps) => {
  return request.post(shortcutRequestUrls.add, parameter).then((response) => {
    console.log(response);
  });
};

export const deleteShortcutData = (parameter: shortcutRequestProps[]) => {
  return request
    .post(shortcutRequestUrls.delete, parameter)
    .then((response) => {
      return response;
    });
};

export const findShortcutData = (parameter?: shortcutRequestProps) => {
  return request
    .get(shortcutRequestUrls.find, { params: parameter })
    .then((response: AxiosResponse<responseProps>) => {
      return response.data;
    });
};

export const findShortcutCountData = () => {
  return request
    .get(shortcutRequestUrls.findCount)
    .then((response: AxiosResponse<shortcutCountRequestProps>) => {
      return response;
    });
};

export const updateShortcutData = (parameter: shortcutRequestProps) => {
  return request
    .post(shortcutRequestUrls.update, parameter)
    .then((response) => {
      console.log(response);
    });
};
