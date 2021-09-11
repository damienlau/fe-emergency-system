import { RouterView } from "vue-router";

export default [
  {
    path: "/",
    name: "Home",
    component: () => import("layouts/BasicLayout"),
    children: [
      {
        path: "warehouse",
        name: "Warehouse",
        component: RouterView,
        children: [
          {
            path: "material",
            component: RouterView,
            children: [
              {
                path: "",
                name: "Material",
                component: () => import("pages/warehouse/material/index.vue"),
              },
              {
                path: "shelf",
                name: "Shelf",
                component: () => import("pages/warehouse/material/shelf"),
              },
            ],
          },
          {
            path: "record",
            component: RouterView,
            children: [
              {
                path: "",
                name: "Record",
                component: () => import("pages/warehouse/record"),
              },
            ],
          },
          {
            path: "scanner",
            component: RouterView,
            children: [
              {
                path: "",
                name: "Scanner",
                component: () => import("pages/warehouse/scanner"),
              },
            ],
          },
          {
            path: "shortcut",
            component: RouterView,
            children: [
              {
                path: "",
                name: "Shortcut",
                component: () => import("pages/warehouse/shortcut"),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/user",
    name: "User",
    component: () => import("layouts/UserLayout"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("pages/user/login"),
      },
    ],
  },
];
