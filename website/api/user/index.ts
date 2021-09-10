import request from "utils/request";

const userRequestUrls = {
  add: "user/add",
  delete: "user/deleteBatch",
  find: "user/list",
  login: "user/login",
  logout: "user/loginOut",
  update: "user/update",
};

export interface userRequestProps {
  id?: number;
  userName?: string;
  phone?: string;
  loginAccount?: string;
  loginPassword?: string;
  userType?: number;
  workNumber?: string;
  createMan?: string;
  createTime?: string;
}

export const addUserData = (parameter: userRequestProps) => {
  return request.post(userRequestUrls.add, parameter).then((response) => {
    return response;
  });
};

export const deleteUserData = (parameter: userRequestProps) => {
  return request.post(userRequestUrls.delete, parameter).then((response) => {
    return response;
  });
};

export const findUserData = (parameter: userRequestProps) => {
  return request
    .get(userRequestUrls.find, { params: { parameter } })
    .then((response) => {
      return response;
    });
};

export const signIn = (parameter: userRequestProps) => {
  return request.post(userRequestUrls.login, parameter).then((response) => {
    return response;
  });
};

export const signOut = () => {
  return request.get(userRequestUrls.logout).then((response) => {
    return response;
  });
};

export const updateUserData = (parameter: userRequestProps) => {
  return request.post(userRequestUrls.update, parameter).then((response) => {
    return response;
  });
};
