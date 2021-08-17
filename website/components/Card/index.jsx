// 组件-卡片

import { defineComponent } from "vue";

export default defineComponent({
  name: "Card",
  props: {
    title: { type: String, required: false },
  },
  setup(props, { slots, emit }) {
    return () => (
      <div class="flex flex-col bg-navy-2 hover:bg-navy-1 rounded">
        {/* 卡片头部 */}
        <div class="flex flex-row items-center justify-between px-16 py-4 border-b border-navy-3">
          {/* 头部标题 */}
          {slots.title ? (
            slots.title()
          ) : (
            <span class="text-16 font-medium">{props.title}</span>
          )}
          {/* 头部操作区 */}
          {slots.extra && slots.extra()}
        </div>
        {/* 卡片主体 */}
        <div class="flex-1 p-16">{slots.default && slots.default()}</div>
      </div>
    );
  },
});
