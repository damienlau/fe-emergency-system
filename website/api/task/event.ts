import { requestProps } from "api/utils";
import request from "utils/request";

const eventRequestUrls = {
  add: "event/info/add",
  delete: "event/info/deleteBatch",
  find: "event/info/list",
  update: "event/info/update",
};

export interface eventRequestProps extends requestProps {
  createMan?: number;
  createTime?: string;
  id?: number;
  eventName?: string;
  eventType?: number;
  eventSource?: number;
  maintenance?: number;
  eventStatus?: number;
  remark?: string;
  startTime?: string;
  endTime?: string;
}

export const addEventData = (parameter: eventRequestProps) => {
  return request.post(eventRequestUrls.add, parameter).then((response) => {
    return response;
  });
};

export const deleteEventData = (parameter: eventRequestProps) => {
  return request.post(eventRequestUrls.delete, parameter).then((response) => {
    return response;
  });
};

export const findEventData = (parameter?: eventRequestProps) => {
  return request
    .get(eventRequestUrls.find, { params: parameter })
    .then((response) => {
      return response.data;
    });
};

export const updateEventData = (parameter: eventRequestProps) => {
  return request.post(eventRequestUrls.update, parameter).then((response) => {
    return response;
  });
};
