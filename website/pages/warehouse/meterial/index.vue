<template>
  <a-layout class="h-full bg-transparent">
    <a-layout class="bg-transparent">
      <a-layout-content></a-layout-content>
    </a-layout>
    <a-layout-sider
      v-model:collapsed="collapsed"
      class="bg-navy-4"
      width="100%"
      :collapsible="true"
      :collapsedWidth="484"
    >
      <div class="h-full flex flex-col">
        <button
          class="
            bg-navy-3
            hover:bg-navy-2
            w-full
            px-16
            py-8
            text-left
            rounded-t
          "
          @click="clickSider"
        >
          <Icon
            class="align-baseline mr-8"
            :type="collapsed ? 'arrow-double-left' : 'arrow-double-right'"
          />
          {{ collapsed ? "查看更多" : "收回" }}
        </button>
        <Sidebar />
      </div>
    </a-layout-sider>
  </a-layout>
</template>
<script>
import { defineComponent, toRefs, reactive } from "vue";
import { Icon } from "components";
import Sidebar from "../meterial/siderBar.vue";
export default defineComponent({
  name: "SiderBar",
  components: { Icon, Sidebar },

  setup() {
    const state = reactive({
      collapsed: true,
    });
    // 侧边栏是否展开
    const clickSider = () => {
      state.collapsed = !state.collapsed;
    };
    return {
      ...toRefs(state),
      clickSider,
    };
  },
});
</script>
<style lang="less" scoped></style>
