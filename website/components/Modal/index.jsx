import { computed, defineComponent, toRefs } from "vue";
import { Modal } from "ant-design-vue";
import Icon from "components/Icon";

export default defineComponent({
  name: "Modal",
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
      validator(size) {
        return ["ultralight", "lighter", "light", "heavy", "bold"].includes(
          size
        );
      },
    },
  },
  emits: ["update:visible"],
  setup(props, { emit, slots }) {
    const { visible } = toRefs(props);
    const modalClasses = computed(() => {
      return `ant-modal-bg h-modal-${props.size} w-modal-${props.size} bg-modal-${props.size} bg-no-repeat pb-0`;
    });

    const handleCloseModal = () => {
      emit("update:visible", !visible.value);
    };

    return () => (
      <Modal
        visible={visible.value}
        class={modalClasses.value}
        centered
        closable={false}
        footer={null}
        forceRender={true}
        destroyOnClose={true}
        onCancel={handleCloseModal}
      >
        <div
          class={`flex flex-col h-modal-${props.size} w-modal-${props.size} p-32`}
        >
          {/* Modal Header Start */}
          <div class="relative pb-24">
            {/* title */}
            <h3 class="flex-auto text-20 text-center font-medium">
              {props.title}
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

          <div class="flex-1 overflow-y-auto">
            {slots.default && slots.default()}
          </div>
        </div>
      </Modal>
    );
  },
});