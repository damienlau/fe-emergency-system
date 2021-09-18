import defaultSettings from "config/defaultSettings";
import { computed, defineComponent, ref } from "@vue/runtime-core";
import { Layout, LayoutContent, LayoutHeader } from "ant-design-vue";
import { RouterView, useRouter } from "vue-router";
import Menu from "components/Menu";
import PageHeader from "components/PageHeader";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const { title } = defaultSettings;
    const menuColumns = ref([
      { label: "仓库", key: "Material" },
      { label: "借还记录", key: "Record" },
      {
        label: "一键操作",
        key: "Shortcut",
        count: computed(
          () => store.state.warehouseModule.shortcutModule.totalNum
        ),
      },
      { label: "出/归仓扫描", key: "Scanner" },
    ]);
    const router = useRouter();
    const store = useStore();

    return () => (
      <Layout class="w-screen h-screen bg-navy-5">
        <LayoutHeader class="px-32 bg-navy-3">
          <PageHeader back={false}>
            <Menu
              class="bg-transparent"
              columns={menuColumns.value}
              onChange={(key) => {
                router.push({ name: key });
              }}
            ></Menu>
          </PageHeader>
        </LayoutHeader>
        <LayoutContent class="p-16">
          <RouterView />
        </LayoutContent>
      </Layout>
    );
  },
});
