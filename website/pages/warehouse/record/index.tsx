// 借还记录
import { defineComponent, ref } from "vue";

import EventList from "./eventList";
import DailyList from "./dailyList";
import MaintainList from "./maintainList";

export default defineComponent({
  components: {
    EventList,
    DailyList,
    MaintainList,
  },
  setup() {
    const menuActiveKey = ref("event");
    return () => (
      <>
        <a-tabs
          v-model={menuActiveKey.value}
          animated={false}
          class="dark:bg-navy-4"
        >
          <a-tab-pane key={"event"} tab="事件记录">
            <EventList></EventList>
          </a-tab-pane>
          <a-tab-pane key={"daily"} tab="日常记录">
            <DailyList></DailyList>
          </a-tab-pane>
          <a-tab-pane key={"2"} tab="维修记录">
            <MaintainList menuActiveKey={"2"}></MaintainList>
          </a-tab-pane>
          <a-tab-pane key={"1"} tab="保养记录">
            <MaintainList menuActiveKey={"1"}></MaintainList>
          </a-tab-pane>
        </a-tabs>
      </>
    );
  },
});
