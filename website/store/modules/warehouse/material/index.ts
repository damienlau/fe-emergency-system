import { findGoodsData, goodsRequestProps } from "api/warehouse/material/goods";
import { AxiosResponse } from "axios";
import { Commit, Store } from "vuex";
import boxModule from "./box";

const state = () => ({});

const getters = {};

const actions = {
  getGoods: ({ commit }: Store<Commit>, goodsInfo: goodsRequestProps) => {
    return new Promise((reslove) => {
      findGoodsData(goodsInfo).then((response: AxiosResponse) => {
        reslove(response.data);
      });
    });
  },
};

const mutations = {};

const modules = { boxModule };

export interface State {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules,
};
