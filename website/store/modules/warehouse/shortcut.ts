import {
  deleteShortcutData,
  findShortcutCountData,
  findShortcutData,
  shortcutCountRequestProps,
  shortcutRequestProps,
} from "api/warehouse/shortcut";
import { Commit, Dispatch, Store } from "vuex";

const state = () => ({
  totalNum: 0,
  outNum: 0,
  weiXiuNum: 0,
  baoYangNum: 0,
});

const getters = {};

const actions = {
  getTotals: ({ commit }: Store<Commit>) => {
    return new Promise((reslove) => {
      findShortcutCountData().then((response) => {
        commit("SET_COUNT", response?.data);
        reslove(null);
      });
    });
  },

  getLists: ({ dispatch }: Store<Dispatch>, listInfo: shortcutRequestProps) => {
    return new Promise((reslove) => {
      dispatch("getTotals").then(() => {
        findShortcutData(listInfo).then((response) => {
          reslove(response);
        });
      });
    });
  },

  removeLists: (
    { dispatch }: Store<Dispatch>,
    listInfo: shortcutRequestProps[]
  ) => {
    return new Promise((reslove) => {
      deleteShortcutData(listInfo).then(() => {
        reslove(null);
      });
    });
  },
};

const mutations = {
  SET_COUNT: (state: State, totals: shortcutCountRequestProps) => {
    state.totalNum = totals?.totalNum;
    state.baoYangNum = totals?.baoYangNum;
    state.outNum = totals?.outNum;
    state.weiXiuNum = totals?.weiXiuNum;
  },
};

export interface State {
  totalNum?: number;
  outNum?: number;
  weiXiuNum?: number;
  baoYangNum?: number;
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
