import request from "utils/request";

const shortcutRequestUrls = {
  add: "batchPending/add",
  delete: "batchPending/deleteBatch",
  find: "batchPending/list",
  findCount: "batchPending/count",
  update: "batchPending/update",
};

export const addShortcutData = (parameter) => {
  return request.post(shortcutRequestUrls.add, parameter).then((response) => {
    return response;
  });
};

export const deleteShortcutData = (parameter) => {
  return request
    .post(shortcutRequestUrls.delete, parameter)
    .then((response) => {
      return response;
    });
};

export const findShortcutData = (parameter) => {
  return request
    .get(shortcutRequestUrls.find, { params: { parameter } })
    .then((response) => {
      return response;
    });
};

export const findShortcutCountData = () => {
  return request.get(shortcutRequestUrls.findCount).then((response) => {
    return response;
  });
};

export const updateShortcutData = (parameter) => {
  return request
    .post(shortcutRequestUrls.update, parameter)
    .then((response) => {
      return response;
    });
};
