import { RouterView } from "vue-router";

const routesConfig = [
  {
    name: "Home",
    path: "/",
    component: () => import("layouts/BasicLayout"),
    children: [
      {
        name: "Warehouse",
        path: "warehouse",
        meta: { label: "应急仓库", navigator: true },
        component: RouterView,
        children: [
          {
            name: "Material",
            path: "material",
            meta: { label: "仓库" },
            component: () => import("pages/warehouse/meterial"),
          },
          {
            name: "Record",
            path: "record",
            meta: { label: "借还记录" },
            component: () => import("pages/warehouse/record"),
          },
          {
            name: "Shortcut",
            path: "shortcut",
            meta: { label: "一键操作" },
            component: () => import("pages/warehouse/shortcut"),
          },
          {
            name: "Scanner",
            path: "scanner",
            meta: { label: "出/归仓扫描" },
            component: RouterView,
            children: [
              {
                path:'',
                component: () => import("pages/warehouse/scanner"),
              },
              {
                name: "Pending",
                path: "pending",
                meta: { label: "出仓扫描" },
                component: () => import("pages/warehouse/scanner/pending"),
              }
            ]             
          },
        ],
      },
    ],
  },
  {
    name: "User",
    path: "/user",
    meta: { label: "个人中心" },
    component: () => import("layouts/BasicLayout"),
    children: [
      {
        name: "Login",
        path: "login",
        meta: { label: "登录" },
        component: () => import("pages/user/login"),
      },
    ],
  },
];

export default routesConfig;
