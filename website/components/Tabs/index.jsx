// 组件-标签页

import { defineComponent, toRefs } from "vue";
import "./style.less";

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
  },
  setup(props, { slots }) {
    const { columns, block } = toRefs(props);

    return () => (
      <a-tabs
        class="rs-tabs dark:bg-navy-4 pt-18 rounded"
        class={block.value && "rs-tabs-full"}
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
                default: () => slots.default && slots.default(),
              }}
            </a-tab-pane>
          );
        })}
      </a-tabs>
    );
  },
});
