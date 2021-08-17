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
    // 卡片列表
    const cardData = ref([
      {
        label: "川-后勤-1",
      },
      {
        label: "川-后勤-2",
      },
      {
        label: "川-后勤-3",
      },
      {
        label: "川-后勤-4",
      },
    ]);

    return () => (
      <Tabs
        block
        columns={menus.value}
        v-slots={{
          // 菜单附加操作区
          extra: () => (
            <a-space size={8}>
              <a-button
                class="flex flex-row items-center p-0"
                type="text"
                v-slots={{
                  icon: () => <Icon type="revoke" />,
                }}
              >
                撤销
              </a-button>
              <a-button ghost danger>
                清空借货清单
              </a-button>
              <a-button type="primary">全部借出</a-button>
            </a-space>
          ),
        }}
      >
        {/* 卡片容器 */}
        <section class="overflow-y-auto grid grid-cols-5 gap-16">
          {cardData.value.map((listItem) => {
            return (
              <Card title={listItem.label}>
                {{
                  // 卡片自定义标题
                  title: () => (
                    <p class="text-16 font-medium">
                      <span>{listItem.label}</span>
                      <span>(17/20)</span>
                    </p>
                  ),
                  // 卡片自定义附加操作区
                  extra: () => (
                    <a-button
                      class="flex flex-row items-center p-0"
                      type="text"
                      danger
                      v-slots={{
                        icon: () => <Icon type="delete" />,
                      }}
                    >
                      移出
                    </a-button>
                  ),
                  default: () => <p>test</p>,
                }}
              </Card>
            );
          })}
        </section>
      </Tabs>
    );
  },
});
