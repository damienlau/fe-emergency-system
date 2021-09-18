import { createStore, Store } from "vuex";
import taskModule from "./modules/task";
import userModule from "./modules/user";
import warehouseModule from "./modules/warehouse";

const state = () => ({});

const getters = {};

const actions = {};

const mutations = {};

const modules = { taskModule, userModule, warehouseModule };

export interface State {}

export default createStore({
  state,
  getters,
  actions,
  mutations,
  modules,
});
