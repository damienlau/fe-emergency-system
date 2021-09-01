// 借还记录
import { defineComponent, onMounted, ref } from "vue";
import { Tabs } from "website/components";

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
    // 菜单列表空状态
    const menuEmpty = ref(false);
    // 菜单当前激活值
    const menuActiveKey = ref(menus.value[0].key); //监听点击标签页菜单事件
    // 监听点击标签页菜单事件
    const handleClickTabPane = (activeKey = menuActiveKey.value) => {
      if (activeKey === "1" || activeKey === "2") {
        componentsName.value = "MaintainList";
      } else if (activeKey === "event") {
        componentsName.value = "EventList";
      } else if (activeKey === "daily") {
        componentsName.value = "DailyList";
      }
    };
    onMounted(() => {
      handleClickTabPane();
    });

    return () => (
      <>
        <Tabs
          class="dark:bg-navy-4"
          v-model={[menuActiveKey.value, "activeKey"]}
          columns={menus.value}
          empty={menuEmpty.value}
          onClick={handleClickTabPane}
          rowKey={(index) => index}
          size="small"
        >
          <section class="overflow-y-auto">
            <component is={componentsName.value}></component>
          </section>
        </Tabs>
      </>
    );
  },
});
