// 「仓库」借还记录

import request from "website/utils/request";

// 保养记录
//
// 查询全部数据
export function findMaintenanceRecordData(params) {
  return request.get("/maintenance/list", {
    params,
  });
}
// 更新指定数据
export function updateSpecifiedMaintenanceRecordData(params) {
  return request.post("/maintenance/update", params);
}

// 维修记录
