// 组件-标签页

import { defineComponent, onMounted, ref, toRefs } from "vue";
import { Empty } from "website/components";
// import "./style.less";

export default defineComponent({
  name: "Tabs",
  props: {
    // 标签页选项卡的配置描述
    columns: {
      type: Object,
      required: true,
    },
    // 是否自动填充至父元素大小
    block: { type: Boolean, required: false, default: true },
    // 是否显示标签页空状态
    empty: { type: Boolean, required: false, default: true },
  },
  emits: ["select"],
  setup(props, { emit, slots }) {
    const { columns, block, empty } = toRefs(props);
    // 默认选中的标签页选项卡
    const tabActiveKey = ref(columns.value[0].key);

    // 监听点击标签页选项卡事件
    const handleTabClick = (key = tabActiveKey.value) => {
      tabActiveKey.value = key;
      emit(
        "select",
        tabActiveKey.value,
        columns.value.filter((item) => (item.key = key))
      );
    };

    onMounted(() => {
      handleTabClick();
    });

    return () => (
      <a-tabs
        v-model={[tabActiveKey.value, "activeKey"]}
        class="rs-tabs dark:bg-navy-4 pt-18 rounded"
        class={block.value && "rs-tabs-full"}
        animated={false}
        onTabClick={handleTabClick}
        v-slots={{
          tabBarExtraContent: () => slots.extra && slots.extra(),
        }}
      >
        {columns.value.map((tabPane) => {
          return (
            <a-tab-pane key={tabPane.key}>
              {{
                tab: () => (
                  <a-badge class="rs-tabs-badge" count={tabPane.count}>
                    <span class="text-18">{tabPane.label}</span>
                  </a-badge>
                ),
                default: () =>
                  empty.value ? (
                    <Empty class="self-center" />
                  ) : (
                    slots.default && (
                      <section class="w-full h-full overflow-hidden">
                        {slots.default()}
                      </section>
                    )
                  ),
              }}
            </a-tab-pane>
          );
        })}
      </a-tabs>
    );
  },
});
