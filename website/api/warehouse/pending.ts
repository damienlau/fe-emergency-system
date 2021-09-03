// 出仓列表

import request from "utils/request";

const shortcutRequestUrls = {
  find: "api/outForm/all",
};

// 出仓待出仓列表
export const findSpecifiedShortcutData = (parameter) => {
  return request.post(shortcutRequestUrls.find, parameter).then((response) => {
    return response;
  });
};
