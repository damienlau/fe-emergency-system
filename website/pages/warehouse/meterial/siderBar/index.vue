<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="materials" tab="物资">
      <a-form layout="inline">
        <a-form-item>
          <a-input-search
            v-model:value="value"
            placeholder="箱子搜索"
            @search="search"
          ></a-input-search>
        </a-form-item>
      </a-form>
    </a-tab-pane>
    <a-tab-pane key="box" tab="箱子" force-render> </a-tab-pane>
  </a-tabs>
</template>
<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
export default defineComponent({
  name: "SiderBar",
  setup() {
    const value = ref("");
    const state = reactive({
      activeKey: "materials",
    });
    const search = () => {};
    return {
      ...toRefs(state),
      value,
      search,
    };
  },
});
</script>
<style lang="less" scoped></style>
