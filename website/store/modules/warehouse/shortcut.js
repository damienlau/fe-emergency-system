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
const actions = {};
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
