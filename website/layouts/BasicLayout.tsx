import defaultSettings from "config/defaultSettings";
import { defineComponent, ref } from "@vue/runtime-core";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  Menu,
  MenuItem,
} from "ant-design-vue";
import { RouterView, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const { title } = defaultSettings;
    const menuColumns = ref([
      { label: "仓库", key: "Material" },
      { label: "借还记录", key: "Record" },
      { label: "一键操作", key: "shortcut" },
      { label: "出/归仓扫描", key: "scanner" },
    ]);
    const router = useRouter();

    return () => (
      <Layout class="w-screen h-screen bg-navy-5">
        <LayoutHeader class="h-72 grid grid-cols-3 px-32 bg-navy-3">
          <Menu
            class="bg-transparent border-b-0"
            mode="horizontal"
            selectedKeys={Array.of(menuColumns.value[0].key)}
            onClick={({ key }) => {
              router.push({ name: key });
            }}
          >
            {menuColumns.value.map((menuItem) => {
              return <MenuItem key={menuItem.key}>{menuItem.label}</MenuItem>;
            })}
          </Menu>
        </LayoutHeader>
        <LayoutContent class="p-16">
          <RouterView />
        </LayoutContent>
      </Layout>
    );
  },
});
