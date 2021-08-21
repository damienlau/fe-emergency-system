import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "config/routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {});

export default router;
