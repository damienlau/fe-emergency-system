import { signIn } from "api/user";

const state = () => ({
  hasLogin: false,
});

const getters = {};

const actions = {
  // 登录
  setUserOnline: ({ commit }, userInfo) => {
    return new Promise((reslove) => {
      signIn(userInfo).then((response) => {
        commit("SET_ONLINE");
      });
    });
  },
};

const mutations = {
  SET_ONLINE: (state) => {
    state.hasLogin = true;
  },
  SET_TOKEN: (state, token) => {
    state.hasLogin = true;
    localStorage.setItem("token", token);
  },
};


const modules = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules,
};
