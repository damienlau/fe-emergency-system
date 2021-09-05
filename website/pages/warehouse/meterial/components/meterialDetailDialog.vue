<template>
  <a-tabs v-model:activeKey="activeKey" :animated="false">
    <a-tab-pane :key="'base'" tab="基本信息" class="overflow-y-auto">
      <Form
        v-if="loading"
        :columns="baseForm"
        :dataSource="dataSource"
        :edit="!isEditBase"
        @submit="handleSubmitBase"
      >
        <template #button>
          <a-popconfirm
            title="确认删除吗?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="handDelete(dataSource)"
          >
            <a-button
              type="primary"
              ghost
              class="flex flex-row items-center p-0 mr-3"
              danger
            >
              删除
            </a-button>
          </a-popconfirm>

          <a-button
            type="primary"
            ghost
            class="mr-3"
            v-show="isEditBase"
            @click="isEditBase = false"
            >编辑</a-button
          >
          <a-button
            type="primary"
            ghost
            class="flex flex-row items-center p-0 mr-3"
            htmlType="submit"
            v-show="!isEditBase"
            >保存</a-button
          >
        </template>
      </Form>
    </a-tab-pane>
    <a-tab-pane :key="'other'" tab="其他信息" class="overflow-y-auto">
      <Form
        v-if="loading"
        :columns="otherForm"
        :dataSource="dataSource"
        :edit="!isEditOther"
        @submit="handleSubmitOther"
      >
        <template #button>
          <a-popconfirm
            title="确认删除吗?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="handDelete(dataSource)"
          >
            <a-button
              type="primary"
              ghost
              class="flex flex-row items-center p-0 mr-3"
              danger
            >
              删除
            </a-button>
          </a-popconfirm>
          <a-button
            type="primary"
            ghost
            class="mr-3"
            v-show="isEditOther"
            @click="isEditOther = false"
            >编辑</a-button
          >
          <a-button
            type="primary"
            ghost
            class="mr-3"
            htmlType="submit"
            v-show="!isEditOther"
            >保存</a-button
          >
        </template>
      </Form>
    </a-tab-pane>
    <!-- <a-tab-pane :key="'history'" tab="历史记录" class="overflow-y-auto">
      <a-table :dataSource="tabelData" :columns="tableColumns" size="small" />
    </a-tab-pane> -->
  </a-tabs>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
import { Form } from "components";
import {
  findSpecifiedMeterialData,
  updateSpecifiedMeterialData,
  deleteMeterialInfoData,
} from "api/warehouse/meterial";

export default defineComponent({
  name: "SiderBar",
  components: { Form },
  props: {
    id: Number,
  },
  setup(props, ctx) {
    const state = reactive({
      activeKey: "base",
      isEditBase: true,
      isEditOther: true,
      tabelData: [],
      dataSource: {},
      loading: true,
    });
    const tableColumns = ref([
      {
        title: "操作时间",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作行为",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "借货人",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "联系方式",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "仓库负责人",
        dataIndex: "age",
        key: "age",
      },
    ]);
    const baseForm = ref([
      {
        label: "物资名称",
        key: "materialName",
        required: true,
      },
      {
        label: "品牌",
        key: "brand",
        required: false,
      },
      {
        label: "类型",
        key: "departmentType",
        type: "select",
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
        required: false,
      },
      {
        label: "厂家批号",
        key: "productionBatch",
        required: true,
      },
      {
        label: "厂家",
        key: "productionEnterprise",
        required: true,
      },
      {
        label: "物资图片",
        key: "materialImages",
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
        label: "型号规格",
        key: "specification",
        required: false,
      },
      {
        label: "生产日期",
        key: "productionDate",
        required: false,
        type: "date",
      },
      {
        label: "保质期限",
        key: "expirationDate",
        required: false,
        type: "date",
      },
      {
        label: "有无质保",
        key: "isExpiration",
        type: "select",
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
        required: false,
      },
      {
        label: "备注",
        key: "remark",
        type: "textArea",
        required: false,
      },
    ]);
    onMounted(() => {
      initData();
    });
    const handleSubmitBase = (data) => {
      updateSpecifiedMeterialData(data).then((res) => {
        this.isEditBase = true;
        initData();
      });
    };
    const handleSubmitOther = (data) => {
      updateSpecifiedMeterialData(data).then((res) => {
        this.isEditOther = true;
        initData();
      });
    };
    const initData = () => {
      state.loading = false;
      findSpecifiedMeterialData({ id: props.id }).then((res) => {
        state.dataSource = JSON.parse(JSON.stringify(res));
        state.loading = true;
      });
    };
    const handDelete = (data) => {
      const params = {
        id: data.id,
      };
      deleteMeterialInfoData(params).then((res) => {
        ctx.emit("close");
      });
    };
    return {
      ...toRefs(state),
      baseForm,
      otherForm,
      tableColumns,
      handleSubmitBase,
      handleSubmitOther,
      initData,
      handDelete,
    };
  },
});
</script>
<style lang="less" scoped></style>
