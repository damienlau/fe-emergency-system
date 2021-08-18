import { getSpecifiedUserData } from "website/api/user";

const state = () => ({
  name: "未登录用户",
  token: "",
});
const getters = {};
const actions = {
  userLogin: ({ commit }, userData) => {
    getSpecifiedUserData(userData).then((response) => {
      response.data.userName && commit("SET_NAME", response.data.userName);
    });
  },
};
const mutations = {
  GET_TOKEN: (state) => {
    state.token = localStorage.getItem("token");
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
    localStorage.setItem("token", token);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
