import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { Menu, PageHeader } from "website/components";
import defaultConfig from "config/config";
import "./style.less";

export default defineComponent({
  setup() {
    const { title } = defaultConfig;
    const store = useStore();
    const route = useRoute();

    // 菜单配置项
    const menus = computed(() => {
      // 获取路由动态配置序号
      let index_ = route.matched.findIndex((item) => {
        if (item.meta.navigator) {
          return item;
        }
      });

      // 获取路由动态配置
      return route.matched[index_].children.map((routeItem) => {
        return {
          label: routeItem.meta.label,
          key: routeItem.name,
        };
      });
    });

    // 监听选中菜单项事件
    const handleSelectMenuItem = (item) => {
      console.log(item);
    };

    return () => (
      <>
        <header class="h-72 dark:bg-navy-3 px-32">
          <PageHeader title={title}>
            <Menu
              routerLink
              height={72}
              bordered={false}
              columns={menus.value}
              onSelect={handleSelectMenuItem}
            />
          </PageHeader>
        </header>
        <main class="flex-auto overflow-hidden p-16">
          <a-spin spinning={store.state.loading} wrapperClassName="rs-spin">
            <router-view />
          </a-spin>
        </main>
      </>
    );
  },
});
