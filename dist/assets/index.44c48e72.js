import {
  d as e,
  c as t,
  r as a,
  z as n,
  R as o,
  a as s,
  b as i,
  m as r,
  C as m,
  h as d,
  e as l,
  f as u,
  A as c,
} from "./vendor.0a6eeafb.js";
var p = e({
  setup: () => () =>
    t(
      a("a-config-provider"),
      { locale: n },
      { default: () => [t(a("router-view"), null, null)] }
    ),
});
let h;
const T = {},
  _ = function (e, t) {
    if (!t || 0 === t.length) return e();
    if (void 0 === h) {
      const e = document.createElement("link").relList;
      h =
        e && e.supports && e.supports("modulepreload")
          ? "modulepreload"
          : "preload";
    }
    return Promise.all(
      t.map((e) => {
        if ((e = `/${e}`) in T) return;
        T[e] = !0;
        const t = e.endsWith(".css"),
          a = t ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${e}"]${a}`)) return;
        const n = document.createElement("link");
        return (
          (n.rel = t ? "stylesheet" : h),
          t || ((n.as = "script"), (n.crossOrigin = "")),
          (n.href = e),
          document.head.appendChild(n),
          t
            ? new Promise((e, t) => {
                n.addEventListener("load", e), n.addEventListener("error", t);
              })
            : void 0
        );
      })
    ).then(() => e());
  },
  g = [
    {
      path: "/",
      name: "Home",
      component: () =>
        _(
          () => import("./BasicLayout.38a2f3bb.js"),
          [
            "assets/BasicLayout.38a2f3bb.js",
            "assets/BasicLayout.6fcd865e.css",
            "assets/vendor.0a6eeafb.js",
            "assets/index.352a7032.js",
            "assets/index.5e4b9f63.css",
          ]
        ),
      children: [
        {
          path: "warehouse",
          name: "Warehouse",
          meta: { navigator: !0 },
          component: o,
          children: [
            {
              path: "meterial",
              name: "Meterial",
              meta: { label: "仓库" },
              component: () =>
                _(
                  () => import("./index.ce3889af.js"),
                  [
                    "assets/index.ce3889af.js",
                    "assets/index.352a7032.js",
                    "assets/index.5e4b9f63.css",
                    "assets/vendor.0a6eeafb.js",
                  ]
                ),
            },
            {
              path: "record",
              name: "Record",
              meta: { label: "借还记录" },
              component: () =>
                _(
                  () => import("./index.fe269349.js"),
                  [
                    "assets/index.fe269349.js",
                    "assets/vendor.0a6eeafb.js",
                    "assets/index.352a7032.js",
                    "assets/index.5e4b9f63.css",
                  ]
                ),
            },
            {
              path: "shortcut",
              name: "Shortcut",
              meta: { label: "一键操作" },
              component: () =>
                _(
                  () => import("./index.af37620d.js"),
                  [
                    "assets/index.af37620d.js",
                    "assets/vendor.0a6eeafb.js",
                    "assets/index.352a7032.js",
                    "assets/index.5e4b9f63.css",
                  ]
                ),
            },
            {
              path: "scanner",
              name: "Scanner",
              meta: { label: "出/归仓扫描" },
              component: o,
              children: [
                {
                  path: "",
                  component: () =>
                    _(
                      () => import("./index.ae117b27.js"),
                      [
                        "assets/index.ae117b27.js",
                        "assets/vendor.0a6eeafb.js",
                        "assets/index.352a7032.js",
                        "assets/index.5e4b9f63.css",
                      ]
                    ),
                },
                {
                  path: "pending",
                  name: "Pending",
                  meta: { label: "待出仓" },
                  component: () =>
                    _(
                      () => import("./pending.901ad483.js"),
                      [
                        "assets/pending.901ad483.js",
                        "assets/vendor.0a6eeafb.js",
                        "assets/index.352a7032.js",
                        "assets/index.5e4b9f63.css",
                      ]
                    ),
                },
              ],
            },
          ],
        },
        { path: "command", name: "Command", component: o },
      ],
    },
    {
      path: "/user",
      name: "User",
      component: o,
      redirect: { name: "Login" },
      children: [
        {
          path: "login",
          name: "Login",
          component: () =>
            _(
              () => import("./login.e2e4ed23.js"),
              [
                "assets/login.e2e4ed23.js",
                "assets/vendor.0a6eeafb.js",
                "assets/index.352a7032.js",
                "assets/index.5e4b9f63.css",
              ]
            ),
        },
      ],
    },
  ],
  x = s({ history: i(), routes: g });
x.beforeEach((e, t, a) => {
  "Login" === e.name || localStorage.getItem("token")
    ? a()
    : a({ name: "Login" });
});
var E = {
  namespaced: !0,
  state: () => ({}),
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    eventModule: {
      namespaced: !0,
      state: () => ({ events: {} }),
      getters: {},
      actions: {
        findTaskEvents: () =>
          new Promise((e, t) => {
            (void 0).then((t) => {
              e(t.data);
            });
          }),
      },
      mutations: {
        SET_EVENT: (e, t) => {
          e.events = t;
        },
      },
    },
  },
};
var I = {
  namespaced: !0,
  state: () => ({}),
  getters: {},
  actions: {},
  mutations: {},
};
r.config({ top: "72px", maxCount: 1 });
const k = m.create({ baseURL: {}.VITE_APP_BASE_API, timeout: 23333 });
k.interceptors.request.use(
  (e) => (
    S.commit("SET_LOADING"),
    S.state.userModule.token || S.commit("userModule/GET_TOKEN"),
    (e.headers.authorization = S.state.userModule.token),
    e
  ),
  () => {
    r.error("请求失败，请稍后重试", () => {
      S.commit("SET_LOADING");
    });
  }
),
  k.interceptors.response.use(
    (e) => {
      switch (
        (S.commit("SET_LOADING"),
        void 0 !== e.headers.authorization &&
          S.commit("userModule/SET_TOKEN", e.headers.authorization),
        e.data.code)
      ) {
        case 400:
        case 402:
        case 500:
          r.error(e.data.message).then((e) => {
            console.log(e, 123);
          });
          break;
        default:
          return r.success(e.data.message), e.data;
      }
    },
    () => {
      r.error("网络错误，请稍后重试", () => {
        S.commit("SET_LOADING");
      });
    }
  );
const y = [
    { title: "物资名称", dataIndex: "materialName", key: "materialName" },
    { title: "所属箱子", dataIndex: "boxName", key: "boxName" },
    {
      title: "保养公司",
      dataIndex: "personnelCompany",
      key: "personnelCompany",
    },
    { title: "保养人", dataIndex: "personnelName", key: "personnelName" },
    {
      title: "保养人联系方式",
      dataIndex: "personnelPhone",
      key: "personnelPhone",
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      slots: { customRender: "status" },
    },
    {
      title: "是否出仓库",
      dataIndex: "isOutWarehouseText",
      key: "isOutWarehouseText",
    },
    { title: "问题描述", dataIndex: "description", key: "description" },
    { title: "保养开始时间", dataIndex: "startTime", key: "startTime" },
    { title: "保养完成时间", dataIndex: "endTime", key: "endTime" },
    { title: "操作", key: "id", slots: { customRender: "operation" } },
  ],
  N = [
    { title: "事件名称", key: "eventName", width: "15%" },
    {
      title: "数量详情",
      key: "numDetail",
      slots: { customRender: "numDetail" },
    },
    { title: "时间", key: "eventTime", slots: { customRender: "eventTime" } },
  ],
  f = [
    { title: "箱子/物资名称", dataIndex: "goodsName", key: "goodsName" },
    { title: "所属箱子", dataIndex: "boxName", key: "boxName" },
    { title: "借贷科室", dataIndex: "departmentType", key: "departmentType" },
    { title: "借贷人", dataIndex: "personnelName", key: "personnelName" },
    {
      title: "借贷人联系方式",
      dataIndex: "personnelPhone",
      key: "personnelPhone",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      slots: { customRender: "status" },
    },
    { title: "归还人", dataIndex: "returnMan", key: "returnMan" },
    { title: "归还人联系方式", dataIndex: "returnPhone", key: "returnPhone" },
    {
      dataIndex: "time",
      key: "time",
      slots: { title: "customTitle", customRender: "time" },
    },
    { title: "归还时间", dataIndex: "returnTime", key: "returnTime" },
    { title: "操作", key: "operation", slots: { customRender: "operation" } },
  ];
var v = {
  namespaced: !0,
  state: () => ({}),
  getters: {},
  actions: {
    getMaintainList: (e, t) =>
      new Promise((e) => {
        const a = [];
        var n;
        ((n = { operationType: t }),
        k.get("/maintenance/list", { params: n })).then((t) => {
          t.data.content.map((e) => {
            e.detailList.map((t) => {
              a.push({
                materialName: t.materialInfo.materialName,
                boxName: t.materialInfo.boxName,
                personnelCompany: e.personnelCompany,
                personnelName: e.personnelName,
                personnelPhone: e.personnelPhone,
                status: t.status,
                isOutWarehouseText: e.isOutWarehouse ? "出库" : "在库",
                description: e.description,
                startTime: t.startTime,
                endTime: t.endTime,
                id: t.id,
              });
            });
          }),
            e({ tableData: a, tableColumn: y });
        });
      }),
    getEventList: ({ dispatch: e }) =>
      new Promise((e) => {
        const t = [];
        var a;
        k.get("/outForm/event/all", { params: a }).then((a) => {
          a.data.map((e) => {
            t.push({
              eventName: e.eventName,
              numDetail: e,
              eventTime: { startTime: e.startTime, endTime: e.endTime },
              id: e.id,
            });
          }),
            e({ tableData: t, tableColumn: N });
        });
      }),
    getEventExpandList: ({ dispatch: e }, t) =>
      new Promise((e) => {
        const a = [];
        var n;
        ((n = { eventId: t }),
        k.get("/outForm/event/detail", { params: n })).then((t) => {
          t.data.map((e) => {
            e.outDetailSet.map((e) => {
              a.push({ boxName: "ccccccccc" });
            });
          }),
            e({ expandTableData: a, expandTableColumn: f });
        });
      }),
    changeMaintainStatus: ({ dispatch: e }, t) =>
      new Promise((e) => {
        (function (e) {
          return k.post("/maintenance/detail/update", e);
        })({
          operationType: t.key,
          id: t.id,
          status: 2,
          endTime: d().format("YYYY-MM-DD HH:mm:ss"),
        }).then((e) => {});
      }),
  },
  mutations: {},
};
var b = {
  namespaced: !0,
  state: () => ({}),
  getters: {},
  actions: {},
  mutations: {},
};
const P = {
    title: "深圳多特医疗技术有限公司",
    iconUrl: "//at.alicdn.com/t/font_2563603_cxkwc7ixb18.js",
    department: {
      1: "急救/重症",
      2: "门诊",
      3: "后勤",
      4: "指挥",
      5: "重症",
      6: "超声",
      7: "清创",
      8: "留观",
      9: "药房",
      10: "耗材",
      11: "手术",
      12: "防疫/隔离",
      13: "消毒",
      14: "住院",
      15: "检验",
    },
    shelf: {
      position: {
        0: "未知",
        1: "一层(下)",
        2: "二层(中)",
        3: "三层(上)",
        4: "四层(顶)",
      },
    },
  },
  { shelf: L } = P;
var S = l({
  state: () => ({ loading: !1 }),
  mutations: {
    SET_LOADING: (e) => {
      e.loading = !e.loading;
    },
  },
  modules: {
    taskModule: E,
    warehouseModule: {
      namespaced: !0,
      state: () => ({}),
      getters: {},
      actions: {},
      mutations: {},
      modules: {
        materialModule: I,
        recordModule: v,
        scannerModule: b,
        shortcutModule: {
          namespaced: !0,
          state: () => ({
            totals: { borrowCount: 0, repairCount: 0, maintainCount: 0 },
          }),
          getters: {
            computeTotalSum: (e) =>
              Object.values(e.totals).reduce((e, t) => e + t),
          },
          actions: {
            deleteSpecifiedShortcutCard: ({ dispatch: e }, t) =>
              new Promise((e, a) => {
                var n;
                ((n = t), k.post("/batchPending/deleteBatch", n)).then((t) => {
                  e(t.data);
                });
              }),
            findShortcutCards: ({ dispatch: e }, t) =>
              e("findShortcutTotalNum").then(
                () =>
                  new Promise((e, a) => {
                    var n;
                    ((n = { operationType: t }),
                    k.get("/batchPending/all", { params: n })).then((t) => {
                      e(
                        t.data.map((e) => {
                          switch (e.resourceType) {
                            case 1:
                              return {
                                key: e.id,
                                label: e.warehouseMaterialInfo.materialName,
                                position: `1号货架(${
                                  L.position[
                                    e.warehouseMaterialInfo.rackPosition
                                  ]
                                })`,
                              };
                            default:
                              return {
                                key: e.id,
                                label: e.warehouseBoxInfo.boxName,
                                position: `2号货架(${
                                  L.position[
                                    e.warehouseMaterialInfo.rackPosition
                                  ]
                                })`,
                                capacities: [
                                  e.warehouseBoxInfo.materialCount,
                                  e.warehouseBoxInfo.maximumCapacity,
                                ],
                              };
                          }
                        })
                      );
                    });
                  })
              ),
            findShortcutTotalNum: ({ commit: e }) =>
              new Promise((t, a) => {
                k.get("/batchPending/count").then((a) => {
                  e("SET_TOTAL", {
                    borrowCount: a.data.outNum,
                    repairCount: a.data.weiXiuNum,
                    maintainCount: a.data.baoYangNum,
                  }),
                    t();
                });
              }),
          },
          mutations: {
            SET_TOTAL: (e, t) => {
              e.totals = t;
            },
          },
        },
      },
    },
    userModule: {
      namespaced: !0,
      state: () => ({ name: "未登录用户", token: "" }),
      getters: {},
      actions: {
        userLogin: ({ commit: e }, t) => {
          var a;
          ((a = t), k.post("/user/login", a)).then((t) => {
            console.log(t.data),
              t.data.userName && e("SET_NAME", t.data.userName);
          });
        },
      },
      mutations: {
        GET_TOKEN: (e) => {
          e.token = localStorage.getItem("token");
        },
        SET_NAME: (e, t) => {
          e.name = t;
        },
        SET_TOKEN: (e, t) => {
          (e.token = t), localStorage.setItem("token", t);
        },
      },
    },
  },
});
const w = u(p);
w.use(c), w.use(x), w.use(S), w.mount("#dottmed");
export { P as c };
