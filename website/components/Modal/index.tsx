// 组件-模态框

import { defineComponent, toRefs } from "vue";
import { Icon } from "components";

export default defineComponent({
  name: "Modal",
  props: {
    // 模态框可见状态
    visible: {
      type: Boolean,
      required: true,
    },
    // 模态框标题
    title: {
      type: String,
      required: false,
    },
    // 模态框尺寸
    size: {
      type: String,
      required: false,
      default: "light",
      validator(size) {
        return ["ultralight", "lighter", "light", "heavy", "bold"].includes(
          size
        );
      },
    },
  },
  emits: ["update:visible"],
  setup(props, { slots, emit }) {
    const { visible } = toRefs(props);

    // 监听模态框关闭事件回调
    const handleCloseModal = () => emit("update:visible", !visible.value);

    return () => (
      <a-modal
        visible={visible.value}
        class={`h-modal-${props.size} w-modal-${props.size} bg-modal-${props.size}`}
        class="bg-no-repeat pb-0"
        centered
        closable={false}
        footer={null}
        forceRender={true}
        destroyOnClose={true}
        onCancel={handleCloseModal}
      >
        <div class={`h-modal-${props.size} w-modal-${props.size}`} class="p-32">
          {/* 模态框头部 */}
          <div class="relative pb-24">
            <h3 class="flex-auto text-20 text-center font-medium">
              {props.title}
            </h3>
            <button
              class="absolute bg-navy-1 hover:bg-navy-2 w-24 h-24 flex items-center justify-center rounded top-0 right-0"
              onClick={handleCloseModal}
            >
              <Icon type="close" />
            </button>
          </div>
          {/* 模态框主体 */}
          <div>{slots.default && slots.default()}</div>
        </div>
      </a-modal>
    );
  },
});
