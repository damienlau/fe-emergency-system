// 出仓列表

import request from "utils/request";

const shortcutRequestUrls = {
  find: "/outForm/all",
  save: "/outDetail/confirm/out",
};

// 出仓待出仓列表
export const findSpecifiedShortcutData = (params) => {
  return request.get(shortcutRequestUrls.find,{params} ).then((response) => {
    return response;
  });
};

// 出仓确认出仓
export const saveSpecifiedShortcutData = (params) => {
  return request.post(shortcutRequestUrls.save,params ).then((response) => {
    return response;
  });
};
