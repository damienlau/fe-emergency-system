import { addLendListsData } from "api/lists/lend";
import { addMaintainListsData } from "api/lists/maintain";
import {
  deleteShortcutData,
  findShortcutData,
  findShortcutCountData,
} from "api/warehouse/shortcut";
import defaultConfig from "config/defaultSettings";

const { departments, shelf } = defaultConfig;

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
  getLists: ({ dispatch }, selectedTabPane) => {
    return new Promise((reslove) => {
      dispatch("getTotals").then(() => {
        findShortcutData({ operationType: selectedTabPane.key }).then(
          (response) => {
            reslove({
              pagination: {
                current: response.data.currentPage,
                total: response.data.totalNum,
                pageSize: response.data.pageSize,
              },
              data: response.data.content.map((lists) => {
                switch (lists.resourceType) {
                  case 1:
                    return {
                      id: lists.id,
                      label:
                        lists.warehouseMaterialInfo.materialName || "暂无数据",
                      code: lists.warehouseMaterialInfo.materialCode,
                      thumbnail: lists.warehouseMaterialInfo.materialImages,
                      type: departments[
                        lists.warehouseMaterialInfo.departmentType
                      ],
                      position: `${
                        lists.warehouseMaterialInfo.rackNumber
                      }号货架${
                        shelf[lists.warehouseMaterialInfo.rackPosition]
                      }`,
                      boxName: lists.warehouseMaterialInfo.boxName,
                    };

                  case 2:
                    return {
                      id: lists.id,
                      label: lists.warehouseBoxInfo.boxName || "暂无数据",
                      code: lists.warehouseBoxInfo.boxCode,
                      thumbnail: lists.warehouseBoxInfo.boxImages,
                      quantity: {
                        remain: lists.warehouseBoxInfo.materialRemainNumber,
                        total: lists.warehouseBoxInfo.materialTotalNumber,
                      },
                      size: lists.warehouseBoxInfo.size,
                      type: departments[lists.warehouseBoxInfo.departmentType],
                      position: `${lists.warehouseBoxInfo.rackNumber}号货架${
                        shelf[lists.warehouseBoxInfo.rackPosition]
                      }`,
                    };
                }
              }),
            });
          }
        );
      });
    });
  },

  // 添加清单列表
  setLists: ({ dispatch }, formData) => {
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
    deleteShortcutData(deleteLists).then(() => {
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
