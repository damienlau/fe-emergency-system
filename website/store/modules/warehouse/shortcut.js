import {
  deleteSpecifiedShortcutData,
  findShortcutData,
  findShortcutTotalData,
} from "website/api/warehouse/shortcut";
import defaultConfig from "config/config";

const { shelf } = defaultConfig;

const state = () => ({
  totals: {
    borrowCount: 1,
    repairCount: 68,
    maintainCount: 388,
  },
});
const getters = {
  // 计算总和
  computeTotalSum: (state) =>
    Object.values(state.totals).reduce((count, num) => count + num),
};
const actions = {
  // 删除指定数据
  deleteSpecifiedShortcutCard: ({ dispatch }, id) => {
    return dispatch("findShortcutTotalNum").then(() => {
      return new Promise((reslove, reject) => {
        deleteSpecifiedShortcutData(id).then((response) => {
          reslove(response.data);
        });
      });
    });
  },

  // 查询全部数据
  findShortcutCards: ({ dispatch }, activeKey) => {
    return dispatch("findShortcutTotalNum").then(() => {
      return new Promise((resolve, reject) => {
        findShortcutData({ operationType: activeKey }).then((response) => {
          resolve(
            response.data.map((item) => {
              switch (item.resourceType) {
                case 1:
                  // 类型为物资
                  return {
                    key: item.id,
                    label: item.warehouseMaterialInfo.materialName,
                    position: `1号货架(${
                      shelf.position[item.warehouseMaterialInfo.rackPosition]
                    })`,
                    // position: `${item.warehouseMaterialInfo.rackNumber}号货架(${
                    //   shelf.position[item.warehouseMaterialInfo.rackPosition]
                    // })`,
                  };

                default:
                  // 类型为箱子
                  return {
                    key: item.id,
                    label: item.warehouseBoxInfo.boxName,
                    position: `2号货架(${
                      shelf.position[item.warehouseMaterialInfo.rackPosition]
                    })`,
                    // position: `${item.warehouseMaterialInfo.rackNumber}号货架(${
                    //   shelf.position[item.warehouseMaterialInfo.rackPosition]
                    // })`,
                    capacities: [
                      item.warehouseBoxInfo.materialCount,
                      item.warehouseBoxInfo.maximumCapacity,
                    ],
                  };
              }
            })
          );
        });
      });
    });
  },

  // 查询全部数据数量
  findShortcutTotalNum: ({ commit }) => {
    return new Promise((resolve, reject) => {
      findShortcutTotalData().then((response) => {
        console.log(response);
        resolve(response);
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
