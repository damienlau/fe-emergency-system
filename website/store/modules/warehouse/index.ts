import materialModule from "./material";
import recordModule from "./record";
import scannerModule from "./scanner";
import shortcut from "./shortcut";
import pendingModule from "./pending";

const state = () => ({});
const getters = {};
const actions = {};
const mutations = {};
const modules = { materialModule, recordModule, scannerModule, shortcut, pendingModule };

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules,
};
