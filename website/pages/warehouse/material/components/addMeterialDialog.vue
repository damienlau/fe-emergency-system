<template>
  <a-tabs v-model:activeKey="activeKey" :animated="false">
    <a-tab-pane :key="'base'" tab="基本信息" class="overflow-y-auto">
      <Form
        v-model:dataSource="formDataBase"
        :columns="baseForm"
        @submit="handleSubmitBase"
      >
        <template #button>
          <a-button type="primary" ghost class="mr-3" htmlType="submit">
            <template #icon>
              <Icon class="align-baseline" :type="'save'" /> </template
            >保存</a-button
          >
        </template>
      </Form>
    </a-tab-pane>
    <a-tab-pane :key="'other'" tab="其他信息" class="overflow-y-auto">
      <Form
        v-model:dataSource="formDataOter"
        :columns="otherForm"
        @submit="handleSubmitOther"
      >
        <template #button>
          <a-button type="primary" ghost class="mr-3" htmlType="submit">
            <template #icon>
              <Icon class="align-baseline" :type="'save'" /> </template
            >保存</a-button
          >
        </template>
      </Form>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
import { addMeterialData } from "api/warehouse/meterial";
import Form from "components/Form";
import { Icon } from "components";
export default defineComponent({
  name: "addMeterialDialog",
  components: { Form, Icon },
  setup(props, slot) {
    const state = reactive({
      activeKey: "base",
      formDataBase: {},
      formDataOter: {},
    });
    const baseForm = ref([
      {
        label: "物资名称",
        key: "materialName",
        required: true,
        span: 12,
      },
      {
        label: "品牌",
        key: "brand",
        required: true,
        span: 12,
      },
      {
        label: "类型",
        key: "departmentType",
        type: "select",
        span: 12,
        options: [
          {
            label: "急救/重症",
            key: "1",
          },
          {
            label: "门诊",
            key: "2",
          },
          {
            label: "后勤",
            key: "3",
          },

          {
            label: "指挥",
            key: "4",
          },
          {
            label: "重症",
            key: "5",
          },

          {
            label: "超声",
            key: "6",
          },
          {
            label: "清创",
            key: "7",
          },
          {
            label: "留观",
            key: "8",
          },
          {
            label: "药房",
            key: "9",
          },
          {
            label: "耗材",
            key: "10",
          },
          {
            label: "手术",
            key: "11",
          },
          {
            label: "防疫/隔离",
            key: "12",
          },
          {
            label: "消毒",
            key: "13",
          },
          {
            label: "住院",
            key: "14",
          },
          {
            label: "检验",
            key: "15",
          },
        ],
        required: true,
      },
      {
        label: "厂家批号",
        key: "productionBatch",
        required: true,
        span: 12,
      },
      {
        label: "厂家",
        key: "productionEnterprise",
        required: true,
        span: 12,
      },
      {
        label: "物资图片",
        key: "materialImages",
        type: "upload",
        required: true,
        span: 24,
      },
    ]);
    const otherForm = ref([
      {
        label: "华西资产编码",
        key: "assetCode",
        required: false,
        span: 12,
      },
      {
        label: "型号规格",
        key: "specification",
        required: false,
        span: 12,
      },
      {
        label: "生产日期",
        key: "productionDate",
        required: false,
        type: "date",
        span: 12,
      },
      {
        label: "保质期限",
        key: "expirationDate",
        required: false,
        type: "date",
        span: 12,
      },
      {
        label: "有无质保",
        key: "isExpiration",
        type: "select",
        span: 12,
        options: [
          {
            label: "无保质期",
            key: "0",
          },
          {
            label: "有保质期",
            key: "1",
          },
        ],
        required: false,
      },
      {
        label: "单位",
        key: "unit",
        span: 12,
        required: false,
      },
      {
        label: "备注",
        key: "remark",
        type: "textArea",
        required: false,
      },
    ]);
    onMounted(() => {});
    const handleSubmitBase = () => {
      const data = { ...state.formDataBase, ...state.formDataOter };
      addMeterialData(data).then((res) => {
        // if (res.data) {
        //   slot.emit("close");
        // }
      });
    };
    const handleSubmitOther = () => {
      const data = { ...state.formDataBase, ...state.formDataOter };
      addMeterialData(data).then((res) => {
        // if (res.data) {
        //   slot.emit("close");
        // }
      });
    };
    return {
      ...toRefs(state),
      baseForm,
      otherForm,
      handleSubmitBase,
      handleSubmitOther,
    };
  },
});
</script>
<style lang="less" scoped>
:deep(.ant-form-item-label) {
  width: 100px;
}
</style>
