import { signIn, userRequestProps } from "api/user";
import { AxiosResponse } from "axios";
import { Commit, Store } from "vuex";

const state = () => ({
  name: "",
  hasLogin: false,
});

const getters = {};

const actions = {
  // 登录
  setUserOnline: ({ commit }: Store<Commit>, userInfo: userRequestProps) => {
    return new Promise((reslove) => {
      signIn(userInfo).then((response: AxiosResponse<userRequestProps>) => {
        commit("GET_ONLINE");
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.id,
            phone: response.data.phone,
            userName: response.data.userName,
            userType: response.data.userType,
            workNumber: response.data.workNumber,
          })
        );
        reslove(null);
      });
    });
  },
};

const mutations = {
  GET_ONLINE: (state: State) => {
    localStorage.getItem("token")
      ? (state.hasLogin = true)
      : (state.hasLogin = false);
  },
};

export interface State {
  name?: string;
  hasLogin: boolean;
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
