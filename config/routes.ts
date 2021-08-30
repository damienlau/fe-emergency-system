// 配置路由

import { RouterView } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("website/layouts/BasicLayout"),
    children: [
      {
        path: "warehouse",
        name: "Warehouse",
        meta: { navigator: true },
        component: RouterView,
        children: [
          {
            path: "meterial",
            name: "Meterial",
            meta: { label: "仓库" },
            component: () => import("website/pages/warehouse/meterial"),
          },
          {
            path: "record",
            name: "Record",
            meta: { label: "借还记录" },
            component: () => import("website/pages/warehouse/record"),
          },
          {
            path: "shortcut",
            name: "Shortcut",
            meta: { label: "一键操作" },
            component: () => import("website/pages/warehouse/shortcut"),
          },
          {
            path: "scanner",
            name: "Scanner",
            meta: { label: "出/归仓扫描" },
            component: RouterView,
            children: [
              {
                path: "",
                component: () => import("website/pages/warehouse/scanner"),
              },
              {
                path: "pending",
                name: "Pending",
                meta: { label: "出仓扫描" },
                component: () => import("website/pages/warehouse/scanner/pending"),
              },
              {
                path: "belong",
                name: "Belong",
                meta: { label: "归仓扫描" },
                component: () => import("website/pages/warehouse/scanner/belong"),
              },
              {
                path: "emergency",
                name: "Emergency",
                meta: { label: "紧急扫描" },
                component: () => import("website/pages/warehouse/scanner/emergency"),
              },
            ]
           
          },
			
        ],
      },
      {
        path: "command",
        name: "Command",
        component: RouterView,
      },
    ],
  },
  {
    path: "/user",
    name: "User",
    component: RouterView,
    redirect: { name: "Login" },
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("website/pages/user/login"),
      },
    ],
  },
];

export { routes };
