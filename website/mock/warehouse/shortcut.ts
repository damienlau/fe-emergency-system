import Mock from "mockjs";

const shortcutMockRequestUrl = {
  // 新增指定数据
  add: /\/mock-api\/batchPending\/add/,
  // 删除指定数据
  delete: /\/mock-api\/batchPending\/deleteBatch/,
  // 查询指定数据
  find: /\/mock-api\/batchPending\/list/,
  // 查询指定数据长度
  findCount: /\/mock-api\/batchPending\/count/,
  // 更新指定数据
  update: /\/mock-api\/batchPending\/update/,
};

Mock.mock(shortcutMockRequestUrl.add, "post", {
  code: 200,
  message: "操作成功",
  data: {
    name: "@cname()",
  },
});

Mock.mock(shortcutMockRequestUrl.delete, "post", {
  code: 200,
  message: "操作成功",
  data: {
    name: "@cname()",
  },
});

Mock.mock(shortcutMockRequestUrl.find, "get", {
  code: 200,
  message: "操作成功",
  data: {
    name: "@cname()",
  },
});

Mock.mock(shortcutMockRequestUrl.findCount, "get", {
  code: 200,
  message: "操作成功",
  data: {
    name: "@cname()",
  },
});

Mock.mock(shortcutMockRequestUrl.update, "post", {
  code: 200,
  message: "操作成功",
  data: {
    name: "@cname()",
  },
});
