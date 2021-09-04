<template>
  <a-tabs v-model:activeKey="activeKey" @tabClick="tabClick" :animated="false">
    <a-tab-pane :key="'base'" tab="基本信息">
      <Form></Form>
    </a-tab-pane>
    <a-tab-pane :key="'other'" tab="其他信息">
      <Form></Form>
    </a-tab-pane>
    <a-tab-pane :key="'init'" tab="箱内物资">
      <Form></Form>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";

import { Modal, Tabs, Form } from "components";

export default defineComponent({
  name: "SiderBar",
  components: { BoxInfo, MeterialInfo, Modal, Tabs },
  setup() {
    const state = reactive({});
    onMounted(() => {});

    const tabClick = (tabs) => {};
    return {};
  },
});
</script>
<style lang="less" scoped></style>
