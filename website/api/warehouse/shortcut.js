// 「仓库」一键操作

import request from "website/utils/request";

// 新增指定数据
export function addSpecifiedShortcutData(params) {
  return request.post("/batchPending/add", params);
}

// 删除指定数据
export function deleteSpecifiedShortcutData(params) {
  return request.post("/batchPending/deleteBatch", params);
}

// 查询全部数据
export function findShortcutData(params) {
  return request.get("/batchPending/all", {
    params,
  });
}

// 查询指定数据
export function findSpecifiedShortcutData(params) {
  return request.get("/batchPending/all", {
    params,
  });
}

// 更新指定数据
export function updateSpecifiedShortcutData(params) {
  return request.post("/batchPending/update", params);
}
