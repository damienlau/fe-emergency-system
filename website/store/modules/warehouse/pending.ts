import { findSpecifiedShortcutData } from "api/warehouse/pending";

const state = () => ({});
const getters = {};
const actions = {
  // 待出仓物资测试数据
  findSpecifiedShortcutList: ({ dispatch },params) => {
    return new Promise((reslove) => {
      findSpecifiedShortcutData(params).then((res) => {
        reslove(res.data);
      });
    });
  },
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
