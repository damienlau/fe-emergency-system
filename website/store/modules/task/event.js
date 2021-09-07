import { findTaskEventData } from "api/task/event";

const state = () => ({
  events: {},
});
const getters = {};
const actions = {
  // 获取全部事件
  findTaskEvents: () => {
    return new Promise((resolve, reject) => {
      findTaskEventData().then((response) => {
        resolve(response);
      });
    });
  },
};
const mutations = {
  SET_EVENT: (state, eventData) => {
    state.events = eventData;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
