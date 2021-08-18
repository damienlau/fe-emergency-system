import { defineComponent } from "vue";
import { useStore } from "vuex";
import "./style.less";

export default defineComponent({
  setup() {
    const store = useStore();

    return () => (
      <>
        <header class="h-72 dark:bg-navy-3 px-32"></header>
        <main class="flex-auto overflow-hidden p-16">
          <a-spin spinning={store.state.loading} wrapperClassName="rs-spin">
            <router-view />
          </a-spin>
        </main>
      </>
    );
  },
});
