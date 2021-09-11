import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  toRefs,
} from "vue";
import { Badge, Menu, MenuItem } from "ant-design-vue";
import { MenuInfo } from "ant-design-vue/lib/menu/src/interface";

export interface menuItemProps {
  label: string;
  key: string | number;
  count?: number;
}

export default defineComponent({
  name: "Menu",
  props: {
    center: { type: Boolean, required: false, default: false },
    columns: { type: Object as PropType<menuItemProps[]>, required: true },
    dataSource: { type: String, required: false },
  },
  emits: ["change", "update:dataSource"],
  setup(props, { emit, slots }) {
    const { dataSource } = toRefs(props);
    const menuActiveKey = ref(
      dataSource.value
        ? Array.of(dataSource.value)
        : Array.of(props.columns[0].key)
    );
    const menuCenterClasses = computed(() => {
      return {
        "dark:bg-transparent border-none": true,
        "flex flex-row justify-center": props.center,
      };
    });

    const handleClick = ({ key, keyPath }: MenuInfo) => {
      emit("change", key);
      emit("update:dataSource", key);
    };

    onMounted(() => {
      emit("change", menuActiveKey.value.join());
      emit("update:dataSource", menuActiveKey.value.join());
    });

    return () => (
      <Menu
        class={menuCenterClasses.value}
        mode="horizontal"
        v-model={[menuActiveKey.value, "selectedKeys"]}
        onSelect={handleClick}
      >
        {props.columns.map((item) => {
          return (
            <MenuItem key={item.key}>
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
