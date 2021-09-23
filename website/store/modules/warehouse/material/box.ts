import {
  boxRequestProps,
  findBoxCountData,
  findBoxData,
} from "api/warehouse/material/box";
import { Commit, Store } from "vuex";

const state = () => ({
  boxs: [],
});

const getters = {};

const actions = {
  getBoxCount: ({ commit }: Store<Commit>, shelfNumber: number) => {
    return new Promise((reslove) => {
      findBoxCountData(shelfNumber).then((response) => {
        reslove(response.data.content);
      });
    });
  },
};

const mutations = {
  // SET_BOX_COUNT: (state: State, boxLists: boxRequestProps) => {
  //   state.boxs = boxLists;
  // },
};

export interface State {
  boxs: boxRequestProps[];
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
