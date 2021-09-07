// 「仓库」物资与箱子

import request from "utils/request";

// 新增指定数据
export function addSpecifiedMeterialData(params) {
  return request.post("/material/info/add", params);
}

// 删除指定数据-批量
export function deleteSpecifiedMeterialData(params) {
  return request.post("/material/info/deleteBatch", params);
}

// 删除指定数据- 物资 单独
export function deleteMeterialInfoData(params) {
  return request.get("/material/info/delete", params);
}

// 删除指定数据- 箱子 单独
export function deleteBoxInfoData(id) {
  return request.get(`/box/info/delete?id=${id}`);
}
// 查询全部数据
export function findMeterialData(params) {
  return request.get("/box/info/page/criteria", {
    params,
  });
}

// 查询指定数据 -物资
export function findSpecifiedMeterialData(params) {
  return request.get("/material/info/find", {
    params,
  });
}
// 查询指定数据 -箱子
export function findSpecifiedBoxData(params) {
  return request.get("/box/info/find", {
    params,
  });
}
// 更新指定数据
export function updateSpecifiedMeterialData(params) {
  return request.post("/material/info/update", params);
}

// 全部仓库物资信息-分页-复杂条件
export function findCriteriaPageData(params) {
  return request.get("/material/info/page/criteria", {
    params,
  });
}
// 全部仓库箱子信息-分页-复杂条件
export function findBoxPageData(params) {
  return request.get("/box/info/page/criteria", {
    params,
  });
}
// 新增仓库批量待处理清单
export function addBatchPendingData(params) {
  return request.post("/batchPending/add", {
    ...params,
  });
}
// 仓库新增箱子
export function addBoxData(params) {
  return request.post("/box/info/add", {
    ...params,
  });
}
// 仓库编辑箱子
export function updateBoxData(params) {
  return request.post("/box/info/update", {
    ...params,
  });
}
// 仓库新增物资
export function addMeterialData(params) {
  return request.post("/material/info/add", {
    ...params,
  });
}
// 删除仓库批量待处理清单
export function deleteByFindData(params) {
  return request.get("/batchPending/deleteByFind", {
    params,
  });
}
// 全部仓库箱子信息-无分页
export function findBoxInfoAllData(params) {
  return request.get("/box/info/all", {
    params,
  });
}
// 全部仓库物资信息-分页
export function findMaterialListData(params) {
  return request.get("/material/info/list", {
    params,
  });
}
