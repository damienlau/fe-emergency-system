import {
  findSpecifiedShortcutData,
  saveSpecifiedShortcutData
} from "api/warehouse/pending";

const state = () => ({});
const getters = {};
const actions = {
  // 待出仓物资数据
  findSpecifiedShortcutList: ({ dispatch },params) => {
    return new Promise((reslove) => {
      findSpecifiedShortcutData(params).then((res) => {
        reslove(res.data);
      });
    });
  },
  //待出仓物资确认

  saveSpecifiedShortcutSure: ({ dispatch }, params) => {
    return new Promise((reslove) => {
      saveSpecifiedShortcutData(params).then((res) => {
        reslove(res.data);
      })
    })
  }
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
