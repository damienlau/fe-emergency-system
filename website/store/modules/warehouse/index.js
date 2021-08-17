import materialModule from "./material";
import recordModule from "./record";
import scannerModule from "./scanner";
import shortcutModule from "./shortcut";

const state = () => ({});
const getters = {};
const actions = {};
const mutations = {};
const modules = { materialModule, recordModule, scannerModule, shortcutModule };

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules,
};
