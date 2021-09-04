// 出仓列表

import request from "utils/request";

const shortcutRequestUrls = {
  find: "/outForm/all",
};

// 出仓待出仓列表
export const findSpecifiedShortcutData = (params) => {
  return request.get(shortcutRequestUrls.find,{params} ).then((response) => {
    return response;
  });
};
