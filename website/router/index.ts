import { createRouter, createWebHashHistory } from "vue-router";
import routes from "config/routes";

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
