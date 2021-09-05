<template>
  <a-tabs v-model:activeKey="activeKey" @tabClick="tabClick" :animated="false">
    <a-tab-pane :key="'base'" tab="基本信息" class="overflow-y-auto">
      <Form :columns="baseForm" @submit="handleSubmitBase">
        <template #button>
          <a-button type="primary" ghost class="mr-3" htmlType="submit"
            >保存</a-button
          >
        </template>
      </Form>
    </a-tab-pane>
    <a-tab-pane :key="'other'" tab="其他信息">
      <Form :columns="otherForm" @submit="handleSubmitOther">
        <template #button>
          <a-button type="primary" ghost class="mr-3" htmlType="submit"
            >保存</a-button
          >
        </template>
      </Form>
    </a-tab-pane>
    <a-tab-pane :key="'init'" tab="箱内物资"> </a-tab-pane>
  </a-tabs>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
import { addBoxData } from "api/warehouse/meterial";
import { Form } from "components";
export default defineComponent({
  name: "SiderBar",
  components: { Form },
  setup() {
    const state = reactive({
      activeKey: "base",
    });
    const baseForm = ref([
      {
        label: "物资名称",
        key: "eventId",
        required: true,
      },
      {
        label: "品牌",
        key: "personnelName",
        required: false,
      },
      {
        label: "类型",
        key: "departmentType",
        type: "select",
        options: [],
        required: false,
      },
      {
        label: "厂家批号",
        key: "personnelJobNo",
        required: true,
      },
      {
        label: "厂家",
        key: "personnelPhone",
        required: true,
      },

      {
        label: "物资图片",
        key: "demo",
        type: "upload",
        required: true,
      },
    ]);
    const otherForm = ref([
      {
        label: "华西资产编码",
        key: "assetCode",
        required: true,
      },
      {
        label: "重量",
        key: "weight",
        required: false,
      },
      {
        label: "备注",
        key: "remark",
        type: "textArea",
        required: false,
      },
    ]);
    const initForm = ref([
      {
        label: "借货人",
        key: "personnelName",
        required: true,
      },
    ]);
    onMounted(() => {});

    const tabClick = (tabs) => {
      console.log(tabs, "dad");
    };
    const handleSubmitBase = () => {
      console.log("ddddd");
    };
    const handleSubmitOther = (data) => {
      addBoxData(data);
    };

    const handleSubmitInit = () => {
      console.log("ddddd");
    };
    return {
      ...toRefs(state),
      baseForm,
      otherForm,
      initForm,
      tabClick,
      handleSubmitBase,
      handleSubmitOther,
      handleSubmitInit,
    };
  },
});
</script>
<style lang="less" scoped></style>
