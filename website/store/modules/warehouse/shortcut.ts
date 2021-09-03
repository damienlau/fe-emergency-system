import {
  deleteShortcutData,
  findShortcutData,
  findShortcutCountData,
} from "api/warehouse/shortcut";
import { Commit, Dispatch, Store } from "vuex";

const state = () => ({
  total: { all: 0, maintain: 0, repair: 0, lend: 0 },
});

const getters = {};

const actions = {
  // 获取待操作清单数量
  getTotals: ({ commit }: Store<Commit>) => {
    return new Promise<void>((reslove) => {
      findShortcutCountData().then((total) => {
        commit("SET_TOTAL", {
          all: total.totalNum,
          maintain: total.baoYangNum,
          repair: total.weiXiuNum,
          lend: total.outNum,
        });
        reslove();
      });
    });
  },

  // 获取待操作清单列表
  getLists: ({ dispatch }: Store<Dispatch>) => {
    return new Promise((reslove) => {
      dispatch("getTotals").then(() => {
        findShortcutData().then((response: any) => {
          reslove({
            pagination: {
              current: response.currentPage,
              total: response.totalNum,
              pageSize: response.pageSize,
            },
            data: response.content.map((lists: any) => {
              switch (lists.resourceType) {
                case MaterialType.box:
                  return {
                    id: lists.id,
                    label: lists.warehouseBoxInfo.boxName || "暂无数据",
                    thumbnail: lists.warehouseBoxInfo.boxImages,
                    quantity: {
                      remain: lists.warehouseBoxInfo.materialRemainNumber,
                      total: lists.warehouseBoxInfo.materialTotalNumber,
                    },
                  };
                  break;

                case MaterialType.goods:
                  return {
                    id: lists.id,
                    label:
                      lists.warehouseMaterialInfo.materialName || "暂无数据",
                    thumbnail: lists.warehouseMaterialInfo.materialImages,
                  };
                  break;
              }
            }),
          });
        });
      });
    });
  },

  // 批量删除待操作清单列表
  removeLists: ({ dispatch }: Store<Dispatch>, deleteLists) => {
    deleteShortcutData(deleteLists).then((response: any) => {
      dispatch("getLists");
    });
  },
};

const mutations = {
  SET_TOTAL: (state: Store<State>, totals: State) => {
    state.total = totals;
  },
};

export enum MaterialType {
  goods = 1,
  box,
}

export interface State {
  total: {
    all?: number;
    maintain: number;
    repair: number;
    lend: number;
  };
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
