import { defineComponent, ref } from "vue";
import { Icon } from "website/components";
import Sidebar from "./sidebar";

export default defineComponent({
  setup() {
    // 侧边栏是否展开
    const siderCollapsed = ref(true);

    return () => (
      <a-layout class="h-full bg-transparent">
        <a-layout class="bg-transparent">
          <a-layout-content></a-layout-content>
        </a-layout>
        <a-layout-sider
          v-model={[siderCollapsed.value, "collapsed"]}
          class="bg-navy-4"
          width="100%"
          collapsedWidth={484}
        >
          <div class="h-full flex flex-col">
            {/* 侧边栏头部-展开按钮 */}
            <button
              class="bg-navy-3 hover:bg-navy-2 w-full px-16 py-8 text-left rounded-t"
              onClick={() => (siderCollapsed.value = !siderCollapsed.value)}
            >
              <Icon
                class="align-baseline mr-8"
                type={
                  siderCollapsed.value
                    ? "arrow-double-left"
                    : "arrow-double-right"
                }
              />
              {siderCollapsed.value ? "查看更多" : "收回"}
            </button>
            {/* 侧边栏主体 */}
            <Sidebar />
          </div>
        </a-layout-sider>
      </a-layout>
    );
  },
  
});
