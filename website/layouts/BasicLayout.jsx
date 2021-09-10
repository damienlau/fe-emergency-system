import { computed, defineComponent } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Spin } from "ant-design-vue";
// import Menu from "components/Menu";
import defaultConfig from "config/defaultSettings";
import PageHeader from "components/PageHeader";

export default defineComponent({
  setup() {
    const { title } = defaultConfig;
    // const route = useRoute();
    // const router = useRouter();
    const store = useStore();
    // 初始化加载状态
    const spinning = computed(() => store.state.spinning);
    // 初始化导航菜单
    // const menuColumns = computed(() => store.state.navigation);

    // // 点击菜单跳转路由
    // const handleChange = (menuActiveKey) => {
    //   let routeName_ = menuActiveKey.find(
    //     (routeLink) => route.name !== routeLink
    //   );

    //   routeName_ && router.push({ name: menuActiveKey.join() });
    // };

    // // 根据当前路由设置导航菜单配置项值
    // store.dispatch("setGlobalNavigationMenu", route);

    return () => (
      <>
        <header class="h-72 px-32 dark:bg-navy-3">
          {/* <PageHeader title={title}></PageHeader> */}
          {/* <Menu
            center
            class="h-72 leading-72"
            columns={menuColumns.value}
            onChange={handleChange}
          ></Menu> */}
        </header>
        <Spin
          delay={233}
          wrapperClassName="flex-auto overflow-hidden"
          spinning={spinning.value}
        >
          <main class="h-full p-16">
            <RouterView />
          </main>
        </Spin>
      </>
    );
  },
});
