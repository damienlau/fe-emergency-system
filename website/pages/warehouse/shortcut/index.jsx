// 一键操作

import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { Card, Icon, Tabs } from "website/components";

export default defineComponent({
  setup() {
    const store = useStore();
    // 菜单数据条数
    const menuCountTotal = computed(
      () => store.state.warehouseModule.shortcutModule.totals
    );
    // 菜单配置项
    const menus = ref([
      {
        label: "借货清单",
        count: menuCountTotal.value.borrowCount,
        key: "borrow",
      },
      {
        label: "维修清单",
        count: menuCountTotal.value.repairCount,
        key: "repair",
      },
      {
        label: "保养清单",
        count: menuCountTotal.value.maintainCount,
        key: "maintain",
      },
    ]);

    return () => (
      <Tabs block columns={menus.value}>
        {/* 卡片容器 */}
        <section class="h-full overflow-y-auto grid grid-cols-5 gap-16 p-16">
          <Card></Card>
        </section>
      </Tabs>
    );
  },
});
