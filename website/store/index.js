import { createStore } from "vuex";
import taskModule from "./modules/task";
import warehouseModule from "./modules/warehouse";
import userModule from "./modules/user";

const state = () => ({
  // 用于页面和区块的加载中状态
  spinning: false,
  // 用于页面全局导航菜单
  navigation: [],
});

const getters = {};

const actions = {
  setGlobalNavigationMenu: (
    { commit },
    routes
  ) => {
    let navs_ = routes?.matched.find(
      (route) => route.meta?.navigator
    );

    let menus_ = navs_?.children.map((item) => {
      return {
        ...item?.meta,
        key: item?.name,
      };
    });

    commit("SET_NAVIGATION", menus_);
  },
};

const mutations = {
  SET_SPINNING: (state) => {
    state.spinning = !state.spinning;
  },
  SET_NAVIGATION: (state, menus) => {
    state.navigation = menus;
  },
};

const modules = { taskModule, warehouseModule, userModule };


export default createStore({
  state,
  getters,
  actions,
  mutations,
  modules,
});
