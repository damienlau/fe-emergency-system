import { createStore, Store } from "vuex";
import task from "./modules/task";
import user from "./modules/user";
import warehouseModule from "./modules/warehouse";

const state = () => ({});

const getters = {};

const actions = {};

const mutations = {};

const modules = { task, user, warehouseModule };

export interface State {}

export default createStore({
  state,
  getters,
  actions,
  mutations,
  modules,
});
