import { computed, defineComponent, onMounted, ref } from "vue";
import { Badge, Menu, MenuItem } from "ant-design-vue";

export default defineComponent({
  name: "Menu",
  props: {
    center: { type: Boolean, required: false, default: false },
    columns: { type: Object, required: true },
  },
  emits: ["change"],
  setup(props, { slots, emit }) {
    const menuActiveKey = ref(Array.of(props.columns[0].key));
    const menuCenterClasses = computed(() => {
      return {
        "dark:bg-transparent border-none": true,
        "flex flex-row justify-center": props.center,
      };
    });

    const handleClick = (options) => {
      if (options?.keyPath) {
        menuActiveKey.value = options?.keyPath;
      }
      emit("change", menuActiveKey.value);
    };

    onMounted(() => {
      handleClick();
    });
    return () => (
      <Menu
        class={menuCenterClasses.value}
        mode="horizontal"
        selectedKeys={menuActiveKey.value}
        onClick={handleClick}
      >
        {props.columns.map((item) => {
          return (
            <MenuItem class="mi" key={item.key}>
              <Badge class="w-96 text-16 text-center" count={item.count}>
                {item.label}
              </Badge>
            </MenuItem>
          );
        })}
      </Menu>
    );
  },
});
