import { createRouter, createWebHashHistory } from "vue-router";
import routes from "config/routes";
import store from "../store";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  store.commit("userModule/GET_ONLINE");
  store.dispatch("warehouseModule/shortcutModule/getTotals");

  if (to.name !== "Login" && !store.state.userModule.hasLogin)
    next({ name: "Login" });
  else next();
});

export default router;
