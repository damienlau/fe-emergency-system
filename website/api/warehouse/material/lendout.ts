import request from "utils/request";
import { shortcutRequestProps } from "../shortcut";
import { boxRequestProps } from "./box";
import { goodsRequestProps } from "./goods";

const lendOutRequestUrls = {
  add: "outForm/add",
  delete: "outForm/deleteBatch",
  find: "outForm/list",
  update: "outForm/update",
};

export interface lendOutRequestProps {
  id?: number;
  eventId?: number;
  eventName?: string;
  personnelName?: string;
  personnelPhone?: string;
  personnelJobNo?: string;
  departmentType?: number;
  createMan?: number;
  createTime?: string;
  batchPendingList: shortcutRequestProps[];
  outDetails: [
    {
      id?: number;
      outFormId?: number;
      resourceType?: number;
      materialInfo: goodsRequestProps;
      warehouseBoxInfo: boxRequestProps;
      status?: number;
      outTime?: string;
      returnMan?: string;
      returnJobNo?: string;
      returnPhone?: string;
      returnTime?: string;
      outDetailList: [
        {
          id?: number;
          outDetailId?: number;
          materialInfo: goodsRequestProps;
          status?: number;
          outTime?: string;
          returnMan?: string;
          returnJobNo?: string;
          returnPhone?: string;
          returnTime?: string;
        }
      ];
    }
  ];
}

export const addLendOutData = (parameter: lendOutRequestProps) => {
  return request.post(lendOutRequestUrls.add, parameter).then((response) => {
    return response;
  });
};

export const deleteLendOutData = (parameter: lendOutRequestProps) => {
  return request.post(lendOutRequestUrls.delete, parameter).then((response) => {
    return response;
  });
};

export const findLendOutData = (parameter?: lendOutRequestProps) => {
  return request
    .get(lendOutRequestUrls.find, { params: { parameter } })
    .then((response) => {
      return response;
    });
};

export const updateLendOutData = (parameter: lendOutRequestProps) => {
  return request.post(lendOutRequestUrls.update, parameter).then((response) => {
    return response;
  });
};
