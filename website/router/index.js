import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "config/routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !localStorage.getItem("token"))
    next({ name: "Login" });
  else next();
});

export default router;
