// 配置路由

import { RouterView } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: { name: "Warehouse" },
    component: () => import("website/layouts/BasicLayout"),
    children: [
      {
        path: "warehouse",
        name: "Warehouse",
        redirect: { name: "Shortcut" },
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
            component: () => import("website/pages/warehouse/scanner"),
          },
			{
			path: "pending",
			name: "Pending",
			meta: { label: "待出仓" },
			component: () => import("website/pages/warehouse/pending"),
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
