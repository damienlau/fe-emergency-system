import {
  getMaintenanceList,
  changeMaintenanceStatus,
} from "website/api/warehouse/record";
const state = () => ({
  totals: {
    eventCount: 250, // 事件记录
    dailyCount: 0, // 日常记录
    repairCount: 0, // 维修记录
    maintainCount: 0, // 保养记录
  },
});
const getters = {};
const actions = {
  // 获取保养记录列表
  getMaintainList: () => {
    return new Promise((reslove) => {
      const params = {
        operationType: 1, // 1 保养 2 维修
      };
      getMaintenanceList(params).then((res) => {
        reslove(res.data);
      });
    });
  },
  // 保养记录-点击保养完成
  changeMaintainStatus: ({ dispatch }, id) => {
    return new Promise((reslove) => {
      const params = {
        id: id,
        status: 2,
      };
      changeMaintenanceStatus(params).then((res) => {
        // reslove(res.data);
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
