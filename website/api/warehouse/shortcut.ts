import request from "utils/request";

const shortcutRequestUrl = {
  // 新增指定数据
  add: "batchPending/add",
  // 删除指定数据
  delete: "batchPending/deleteBatch",
  // 查询指定数据
  find: "batchPending/list",
  // 查询指定数据长度
  findCount: "batchPending/count",
  // 更新指定数据
  update: "batchPending/update",
};

export const addSpecifiedShortcutData = (parameter?: any) => {
  return request.post(shortcutRequestUrl.add, parameter).then((response) => {
    return new Promise((reslove) => {
      reslove(response);
    });
  });
};

export const deleteSpecifiedShortcutData = (parameter?: any) => {
  return request.post(shortcutRequestUrl.delete, parameter).then((response) => {
    return new Promise((reslove) => {
      reslove(response);
    });
  });
};

export const findSpecifiedShortcutData = (parameter?: any) => {
  return request
    .get(shortcutRequestUrl.find, { params: parameter })
    .then((response) => {
      return new Promise((reslove) => {
        reslove(response);
      });
    });
};

export const findShortcutCountData = () => {
  return request.get(shortcutRequestUrl.findCount).then((response) => {
    return new Promise((reslove) => {
      reslove(response);
    });
  });
};

export const updateSpecifiedShortcutData = (parameter?: any) => {
  return request.post(shortcutRequestUrl.update, parameter).then((response) => {
    return new Promise((reslove) => {
      reslove(response);
    });
  });
};
