import { defineComponent } from "@vue/runtime-core";
import { Modal } from "ant-design-vue";
import Icon from "components/Icon";

export default defineComponent({
  emits: ["update:visible"],
  props: {
    visible: Boolean,
    title: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
      default: "light",
    },
  },
  setup(props, { emit, slots }) {
    // 点击关闭
    const handleCloseModal = () => {
      emit("update:visible", !props.visible);
    };

    // 插槽extra渲染模版
    const renderExtra = (extra) => (
      <div class="overflow-y-hidden" class={props.flex}>
        { extra() }
      </div>
    )
    
    return () => (
      <Modal
        v-model={[props.visible, "visible"]}
        centered
        class={`ant-modal-bg h-modal-${props.size} w-modal-${props.size} bg-modal-${props.size} bg-no-repeat pb-0`}
        closable={false}
        destroyOnClose={true}
        footer={null}
        maskClosable={false}
      >
        <div
          class={`flex flex-col h-modal-${props.size} w-modal-${props.size} p-32`}
        >
          {/* Modal Header Start */}
          <div class="relative pb-24">
            {/* title */}
            <h3 class="flex-auto text-20 text-center font-medium">
              {props.title || slots.title?.()}
            </h3>
            {/* close button */}
            <button
              class="absolute bg-navy-1 hover:bg-navy-2 w-24 h-24 flex items-center justify-center rounded top-0 right-0"
              onClick={handleCloseModal}
            >
              <Icon type="close" />
            </button>
          </div>
          {/* Modal Header End */}
          <div style="width: 100%" class="flex flex-row">
            <div class="flex-1 overflow-y-auto">
              {slots.default && slots.default()}
            </div>
            { slots.extra && renderExtra(slots.extra) }
          </div>
        </div>
      </Modal>
    );
  },
});
