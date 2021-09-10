import { defineComponent } from "@vue/runtime-core";
import { Layout, LayoutContent } from "ant-design-vue";
import { RouterView } from "vue-router";

export default defineComponent({
  setup() {
    return () => (
      <Layout class="w-screen h-screen bg-navy-5">
        <LayoutContent>
          <RouterView />
        </LayoutContent>
      </Layout>
    );
  },
});
