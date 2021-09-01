import { findSpecifiedShortcutData } from "api/warehouse/shortcut";

const state = () => ({});
const getters = {};
const actions = {
  // 待出仓物资测试数据
  getMaintainList: ({ dispatch }) => {
    return new Promise((reslove) => {
      findSpecifiedShortcutData().then((res) => {
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
