// 「用户」

import request from "utils/request";

// 登录
export function getSpecifiedUserData(params) {
  return request.post("/user/login", params);
}
