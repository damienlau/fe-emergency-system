import { createStore, Store } from "vuex";
import user from "./modules/user";
import warehouseModule from "./modules/warehouse";

const state = () => ({});

const getters = {};

const actions = {};

const mutations = {};

const modules = { user, warehouseModule };

export interface State {}

export default createStore({
  state,
  getters,
  actions,
  mutations,
  modules,
});
