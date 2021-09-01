import request from "utils/request";

const userRequestUrl = {
  userLogin: "user/login",
};

export const findUserData = (parameter) => {
  return request.post(userRequestUrl.userLogin, parameter);
};
