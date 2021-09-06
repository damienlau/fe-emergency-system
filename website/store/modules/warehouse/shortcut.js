import { addLendListsData } from "api/lists/lend";
import { addMaintainListsData } from "api/lists/maintain";
import {
  deleteShortcutData,
  findShortcutData,
  findShortcutCountData,
} from "api/warehouse/shortcut";

const state = () => ({
  total: { all: 0, maintain: 0, repair: 0, lend: 0 },
});

const getters = {};

const actions = {
  // 获取待操作清单数量
  getTotals: ({ commit }) => {
    return new Promise((reslove) => {
      findShortcutCountData().then((total) => {
        commit("SET_TOTAL", {
          all: total?.totalNum,
          maintain: total?.baoYangNum,
          repair: total?.weiXiuNum,
          lend: total?.outNum,
        });
        reslove();
      });
    });
  },

  // 获取待操作清单列表
  getLists: ({ dispatch }) => {
    return new Promise((reslove) => {
      dispatch("getTotals").then(() => {
        findShortcutData().then((response) => {
          reslove({
            pagination: {
              current: response?.currentPage,
              total: response?.totalNum,
              pageSize: response?.pageSize,
            },
            data: response?.content.map((lists) => {
              switch (lists.resourceType) {
                case 2:
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

                case 1:
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

  // 添加清单列表
  setLists: (
    { dispatch },
    formData
  ) => {
    return new Promise((reslove) => {
      if (formData.operationType) {
        addMaintainListsData(formData).then((response) => {
          dispatch("getLists").then(() => {
            reslove(response);
          });
        });
      } else {
        addLendListsData(formData).then((response) => {
          dispatch("getLists").then(() => {
            reslove(response);
          });
        });
      }
    });
  },

  // 批量删除待操作清单列表
  removeLists: ({ dispatch }, deleteLists) => {
    deleteShortcutData(deleteLists).then((response) => {
      dispatch("getLists");
    });
  },
};

const mutations = {
  SET_TOTAL: (state, totals) => {
    state.total = totals;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
