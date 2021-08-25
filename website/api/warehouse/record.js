// 「仓库」借还记录

import request from "website/utils/request";

// 保养记录列表
export function getMaintenanceList(params) {
  return request.get("/maintenance/list", {
    params,
  });
}
