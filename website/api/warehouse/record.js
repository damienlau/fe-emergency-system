// 「仓库」借还记录

import request from "website/utils/request";

// 保养/维修记录列表
export function findMaintenanceData(params) {
  return request.get("/maintenance/list", {
    params,
  });
}

// 更新保养记录状态
export function updateSpecifiedMaintenanceData(params) {
  return request.post("/maintenance/detail/update", params);
}

// 查询事件全部数据
export function findEventData(params) {
  return request.get("/outForm/event/all", {
    params,
  });
}

// 维修记录
