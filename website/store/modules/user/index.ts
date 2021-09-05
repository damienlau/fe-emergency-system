import { signIn } from "api/user";
import { Commit, Store } from "vuex";

const state = () => ({
  hasLogin: false,
});

const getters = {};

const actions = {
  // 登录
  setUserOnline: ({ commit }: Store<Commit>, userInfo) => {
    return new Promise<void>((reslove) => {
      signIn(userInfo).then((response) => {
        commit("SET_ONLINE");
      });
    });
  },
};

const mutations = {
  SET_ONLINE: (state: State) => {
    state.hasLogin = true;
  },
  SET_TOKEN: (state: State, token: string) => {
    state.hasLogin = true;
    localStorage.setItem("token", token);
  },
};

export interface State {
  hasLogin?: boolean;
}

const modules = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules,
};
