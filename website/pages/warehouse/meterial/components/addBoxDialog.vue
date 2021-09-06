<template>
  <a-tabs v-model:activeKey="activeKey" :animated="false">
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
  name: "addBoxDialog",
  components: { Form },
  setup() {
    const state = reactive({
      activeKey: "base",
    });
    const baseForm = ref([
      {
        label: "类型",
        key: "departmentType",
        type: "select",
        options: [
          {
            label: "急救/重症",
            key: 1,
          },
          {
            label: "门诊",
            key: 2,
          },
          {
            label: "后勤",
            key: 3,
          },

          {
            label: "指挥",
            key: 4,
          },
          {
            label: "重症",
            key: 5,
          },

          {
            label: "超声",
            key: 6,
          },
          {
            label: "清创",
            key: 7,
          },
          {
            label: "留观",
            key: 8,
          },
          {
            label: "药房",
            key: 9,
          },
          {
            label: "耗材",
            key: 10,
          },
          {
            label: "手术",
            key: 11,
          },
          {
            label: "防疫/隔离",
            key: 12,
          },
          {
            label: "消毒",
            key: 13,
          },
          {
            label: "住院",
            key: 14,
          },
          {
            label: "检验",
            key: 15,
          },
        ],
        required: false,
      },
      {
        label: "货架位置",
        key: "rackPosition",
        type: "select",
        options: [
          {
            label: "未知",
            key: 0,
          },
          {
            label: "一层(下)",
            key: 1,
          },
          {
            label: "二层(中)",
            key: 2,
          },
          {
            label: "三层(上)",
            key: 3,
          },
          {
            label: "四层(顶)",
            key: 4,
          },
        ],
        required: true,
      },
      {
        label: "尺寸",
        key: "size",
        type: "select",
        options: [
          {
            label: "一箱一桌(800 x 600 x 600)",
            key: 1,
          },
          {
            label: "一箱两柜(1200 x 800 x 800)",
            key: 2,
          },
          {
            label: "一箱一柜(1200 x 800 x 400)",
            key: 3,
          },
          {
            label: "其他箱子",
            key: 4,
          },
        ],
        required: false,
      },
      {
        label: "单位",
        key: "unit",
        required: false,
      },
      {
        label: "物资图片",
        key: "boxImages",
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
      handleSubmitBase,
      handleSubmitOther,
      handleSubmitInit,
    };
  },
});
</script>
<style lang="less" scoped></style>
