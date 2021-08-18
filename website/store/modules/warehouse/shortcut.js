import {
  deleteSpecifiedShortcutData,
  findShortcutData,
} from "website/api/warehouse/shortcut";

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
  deleteSpecifiedShortcutCard: () => {
    deleteSpecifiedShortcutData().then((response) => {});
  },
  // 查询全部数据
  findShortcutCards: ({ commit }, activeKey) => {
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
                };

              default:
                // 类型为箱子
                return {
                  key: item.id,
                  label: item.warehouseBoxInfo.boxName,
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
