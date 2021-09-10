import { createRouter, createWebHashHistory } from "vue-router";
import routes from "config/routes";
import store from "../store";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  store.commit("user/GET_ONLINE");

  if (to.name !== "Login" && !store.state.user.hasLogin)
    next({ name: "Login" });
  else next();
});

export default router;
