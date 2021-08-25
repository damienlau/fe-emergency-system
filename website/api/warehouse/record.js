// 「仓库」借还记录

import request from "website/utils/request";

// 保养记录列表
export function getMaintenanceList(params) {
  return request.get("/maintenance/list", {
    params,
  });
}
// 保养记录-点击保养完成
export function changeMaintenanceStatus(params) {
  return request.post("/maintenance/update", params);
}
