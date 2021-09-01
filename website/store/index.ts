import { createStore } from "vuex";
import { MenuItemProps } from "components/Menu";
import { RouteLocationNormalizedLoaded, RouteRecordRaw } from "vue-router";
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
    routes: RouteLocationNormalizedLoaded
  ) => {
    let navs_ = routes?.matched.find(
      (route: RouteRecordRaw) => route.meta?.navigator
    );

    let menus_ = navs_?.children.map((item: RouteRecordRaw) => {
      return {
        ...item?.meta,
        key: item?.name,
      };
    });

    commit("SET_NAVIGATION", menus_);
  },
};

const mutations = {
  SET_SPINNING: (state: State) => {
    state.spinning = !state.spinning;
  },
  SET_NAVIGATION: (state: State, menus: MenuItemProps) => {
    state.navigation = menus;
  },
};

const modules = { taskModule, warehouseModule, userModule };

export interface State {
  spinning: boolean;
  navigation: object;
}

export default createStore<State>({
  state,
  getters,
  actions,
  mutations,
  modules,
});
