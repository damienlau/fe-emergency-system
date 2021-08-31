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
});

Mock.mock(shortcutMockRequestUrl.find, "get", {
  code: 200,
  message: "操作成功",
  data: {
    "currentPage|1-100": 100,
    "pageSize|1-100": 100,
    "pageTotal|1-100": 100,
    "totalNum|1-100": 100,
    "content|1-100": [
      {
        createMan: "@cname",
        createTime: "@date(yyyy-MM-dd HH:mm:ss)",
        id: "@increment",
        operationType: "@pick([1, 2, 3])",
        resourceType: "@pick([1, 2])",
        warehouseMaterialInfo: {
          createMan: "@cname",
          createTime: "@date(yyyy-MM-dd HH:mm:ss)",
          id: "@natural",
          materialName: "@ctitle(4, 12)",
          materialCode: "@guid",
          assetCode: "@id",
          departmentType: "@natural(1, 15)",
          brand: "@ctitle(4, 12)",
          specification:
            "@pick(['1920*1080', '1024*1080', '1024*1366', '768*1024', '375*667', '320*568'])",
          unit: "@pick(['台', '件', '个', '袋', '包'])",
          status: "@natural(1, 7)",
          isBox: "@pick([0, 1])",
          boxCode: "@guid",
          boxName: "@ctitle(4, 12)",
          rackNumber: "@natural(1, 100)",
          rackPosition: "@natural(0, 4)",
          productionDate: "@date(yyyy-MM-dd HH:mm:ss)",
          productionEnterprise: "",
          productionBatch: "@guid",
          isExpiration: "@pick([0, 1])",
          expirationDate: "@date(yyyy-MM-dd HH:mm:ss)",
          remark: "@cparagraph",
          "materialImages|1-10": [
            {
              id: "@increment",
              materialId: "@increment",
              oldFileName: "@ctitle(4, 12)",
              newFileName: "@ctitle(4, 12)",
              fileType: "",
              fileUrl: "@image",
            },
          ],
        },
        warehouseBoxInfo: {
          createMan: "@cname",
          createTime: "@date(yyyy-MM-dd HH:mm:ss)",
          id: "@natural",
          boxName: "@ctitle(4, 12)",
          boxCode: "@guid",
          assetCode: "@id",
          departmentType: "@natural(1, 15)",
          unit: "@pick(['台', '件', '个', '袋', '包'])",
          weight: "@natural(1, 7)",
          size: "@natural(1, 4)",
          rackNumber: "@natural(1, 100)",
          rackPosition: "@natural(0, 4)",
          status: "@pick([1, 2, 3])",
          materialRemainNumber: "@natural(1, 100)",
          materialTotalNumber: "@natural(1, 100)",
          remark: "@cparagraph",
          "boxImages|1-10": [
            {
              id: "@increment",
              boxId: "@increment",
              oldFileName: "@ctitle(4, 12)",
              newFileName: "@ctitle(4, 12)",
              fileType: "",
              fileUrl: "@image",
            },
          ],
        },
      },
    ],
  },
});

Mock.mock(shortcutMockRequestUrl.findCount, "get", {
  code: 200,
  message: "操作成功",
  data: {
    "totalNum|0-500": 500,
    "outNum|0-500": 500,
    "weiXiuNum|0-500": 500,
    "baoYangNum|0-500": 500,
  },
});

Mock.mock(shortcutMockRequestUrl.update, "post", {
  code: 200,
  message: "操作成功",
  data: {
    name: "@cname()",
  },
});
