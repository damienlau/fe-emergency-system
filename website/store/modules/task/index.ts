import { eventRequestProps, findEventData } from "api/task/event";
import { responseProps } from "api/utils";
import { selectOptionProps } from "components/Form";
import { Commit, Store } from "vuex";

const state = () => ({
  events: [],
});

const getters = {};

const actions = {
  // 获取所有事件
  getEvents: ({ commit }: Store<Commit>) => {
    findEventData().then((response: responseProps) => {
      commit(
        "SET_EVENTS",
        response.content?.map((eventOptions: eventRequestProps) => {
          return {
            label: eventOptions.eventName,
            key: eventOptions.id,
          };
        })
      );
    });
  },
};

const mutations = {
  SET_EVENTS: (state: State, eventOptions: selectOptionProps) => {
    state.events = eventOptions;
    localStorage.setItem("events", JSON.stringify(eventOptions));
  },
};

export interface State {
  events?: object;
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
