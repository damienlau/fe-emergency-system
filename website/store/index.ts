import { createStore } from "vuex";
import taskModule from "./modules/task";
import warehouseModule from "./modules/warehouse";
import userModule from "./modules/user";

export default createStore({
  state: () => ({
    loading: false,
  }),
  mutations: {
    SET_LOADING: (state) => {
      state.loading = !state.loading;
    },
  },
  modules: { taskModule, warehouseModule, userModule },
});
