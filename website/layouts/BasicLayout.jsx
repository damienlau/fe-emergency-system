import { defineComponent } from "vue";
import "./style.less";

export default defineComponent({
  setup() {
    return () => (
      <>
        <header class="h-72 dark:bg-navy-3 px-32"></header>
        <main class="flex-auto overflow-hidden p-16">
          <a-spin spinning={false} wrapperClassName="rs-spin">
            <router-view />
          </a-spin>
        </main>
      </>
    );
  },
});
