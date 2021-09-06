import Mock from "mockjs";

const userMockRequestUrl = {
  userLogin: /\/mock-api\/user\/login/,
};

Mock.mock(userMockRequestUrl.userLogin, "post", {
  code: 200,
  message: "登录成功",
  data: {
    name: "@cname()",
  },
});
