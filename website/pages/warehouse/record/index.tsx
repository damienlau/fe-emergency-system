// 借还记录
import { defineComponent, onMounted, ref } from "vue";
import { Tabs } from "components";

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
    // 菜单配置项
    const menus = ref([
      {
        label: "事件记录",
        key: "event",
      },
      {
        label: "日常记录",
        key: "daily",
      },
      {
        label: "维修记录",
        key: "1",
      },
      {
        label: "保养记录",
        key: "2",
      },
    ]);
    const componentsName = ref("");
    // 监听点击标签页菜单事件
    const handleClickTabPane = ({ activeKey, item }) => {
      console.log(activeKey, item);
    };

    return () => (
      <>
        <Tabs
          class="dark:bg-navy-4"
          columns={menus.value}
          onClick={handleClickTabPane}
        >
          <div class="flex flex-col">
            <EventList />
          </div>
        </Tabs>
      </>
    );
  },
});
