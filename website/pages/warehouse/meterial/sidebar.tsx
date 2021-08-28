import { defineComponent, onMounted, ref } from "vue";
import { Card, Tabs } from "website/components";

export default defineComponent({
  name: "Sidebar",
  setup() {
    // 侧边栏菜单配置
    const siderMenus = ref([
      {
        label: "物资",
        key: "material",
      },
      {
        label: "箱子",
        key: "container",
      },
    ]);

    // 侧边栏搜索框默认值
    const siderSearchInput = ref("");

    // 监听搜索事件
    const handleSearchCard = (searchValue) => {
      console.log(searchValue);
    };

    // 监听点击侧边栏菜单事件
    const handleClickTabPane = (a, b, c) => {
      console.log(a, b, c);
    };

    return () => (
      <Tabs
        block
        columns={siderMenus.value}
        empty={false}
        onSelect={handleClickTabPane}
      >
        <div class="flex flex-row justify-between">
          <a-form layout="inline">
            <a-form-item>
              <a-input-search
                // v-model={siderSearchInput.value}
                placeholder="箱子搜索"
                onSearch={handleSearchCard}
              ></a-input-search>
            </a-form-item>
          </a-form>
          <a-button class="ml-8" type="primary">
            新增箱子
          </a-button>
        </div>
      </Tabs>
    );
  },
});
