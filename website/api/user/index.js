import request from "utils/request";

const userRequestUrls = {
  add: "user/add",
  delete: "user/deleteBatch",
  find: "user/list",
  login: "user/login",
  logout: "user/loginOut",
  update: "user/update",
};

export const addUserData = (parameter) => {
  return request.post(userRequestUrls.add, parameter).then((response) => {
    return response;
  });
};

export const deleteUserData = (parameter) => {
  return request.post(userRequestUrls.delete, parameter).then((response) => {
    return response;
  });
};

export const findUserData = (parameter) => {
  return request
    .get(userRequestUrls.find, { params: { parameter } })
    .then((response) => {
      return response;
    });
};

export const signIn = (parameter) => {
  return request.post(userRequestUrls.login, parameter).then((response) => {
    return response;
  });
};

export const signOut = () => {
  return request.get(userRequestUrls.logout).then((response) => {
    return response;
  });
};

export const updateUserData = (parameter) => {
  return request.post(userRequestUrls.update, parameter).then((response) => {
    return response;
  });
};
