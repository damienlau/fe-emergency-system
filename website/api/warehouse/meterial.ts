// 「仓库」物资与箱子

import request from "website/utils/request";

// 新增指定数据
export function addSpecifiedMeterialData(params) {
  return request.post("/material/info/add", params);
}

// 删除指定数据
export function deleteSpecifiedMeterialData(params) {
  return request.post("/material/info/deleteBatch", params);
}

// 查询全部数据
export function findMeterialData(params) {
  return request.get("/box/info/page/criteria", {
    params,
  });
}

// 查询指定数据
export function findSpecifiedMeterialData(params) {
  return request.get("/material/info/find", {
    params,
  });
}

// 更新指定数据
export function updateSpecifiedMeterialData(params) {
  return request.post("/material/info/update", params);
}
