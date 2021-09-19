<template>
  <a-tabs v-model:activeKey="activeKey" :animated="false">
    <a-tab-pane :key="'base'" tab="基本信息" class="overflow-y-auto">
      <Form
        v-if="loading"
        v-model:dataSource="dataSource"
        :columns="baseForm"
        :disabled="isEditBase"
        @submit="handleSubmitBase"
      >
        <template #button>
          <div class="flex flex-row items-center justify-center">
            <a-popconfirm
              title="确认删除吗?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="handDelete(dataSource)"
            >
              <a-button
                type="primary"
                ghost
                class="flex flex-row items-center mr-3"
                danger
                v-if="
                  dataSource.status == 1 && dataSource.inBatchPendingStatus == 0
                "
              >
                <template #icon>
                  <Icon class="align-baseline" :type="'delete'" />
                </template>
                删除
              </a-button>
            </a-popconfirm>

            <a-button
              ghost
              class="mr-3"
              v-if="isEditBase && dataSource.status == 1"
              @click="isEditBase = false"
            >
              <template #icon>
                <Icon class="align-baseline" :type="'edit'" /> </template
              >编辑</a-button
            >
            <a-button
              ghost
              class="flex flex-row items-center mr-3"
              htmlType="submit"
              v-if="!isEditBase"
            >
              <template #icon>
                <Icon class="align-baseline" :type="'save'" /> </template
              >保存</a-button
            >
          </div>
        </template>
      </Form>
    </a-tab-pane>
    <a-tab-pane :key="'other'" tab="其他信息" class="overflow-y-auto">
      <Form
        v-if="loading"
        v-model:dataSource="dataSource"
        :columns="otherForm"
        :disabled="isEditOther"
        @submit="handleSubmitOther"
      >
        <template #button>
          <div class="flex flex-row items-center justify-center">
            <a-popconfirm
              title="确认删除吗?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="handDelete(dataSource)"
            >
              <a-button
                type="primary"
                ghost
                class="flex flex-row items-center mr-3"
                danger
                v-if="
                  dataSource.status == 1 && dataSource.inBatchPendingStatus == 0
                "
              >
                <template #icon>
                  <Icon class="align-baseline" :type="'delete'" />
                </template>
                删除
              </a-button>
            </a-popconfirm>
            <a-button
              ghost
              class="mr-3"
              v-if="isEditOther && dataSource.status == 1"
              @click="isEditOther = false"
            >
              <template #icon>
                <Icon class="align-baseline" :type="'edit'" /> </template
              >编辑</a-button
            >
            <a-button ghost class="mr-3" htmlType="submit" v-if="!isEditOther">
              <template #icon>
                <Icon class="align-baseline" :type="'save'" /> </template
              >保存</a-button
            >
          </div>
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
import { Icon } from "components";
import {
  findSpecifiedMeterialData,
  updateSpecifiedMeterialData,
  deleteMeterialInfoData,
} from "api/warehouse/meterial";

export default defineComponent({
  name: "meterialDetailDialog",
  components: { Form, Icon },
  props: {
    id: Number,
    meterialInfo: Object,
  },
  setup(props, slot) {
    const state = reactive({
      activeKey: "base",
      tabelData: [],
      isEditBase: true,
      isEditOther: true,
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
        span: 24,
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
        if (res.data) {
          state.isEditBase = true;
          // slot.emit("close");
        }
      });
    };
    const handleSubmitOther = (data) => {
      updateSpecifiedMeterialData(data).then((res) => {
        if (res.data) {
          state.isEditOther = true;
          // slot.emit("close");
        }
      });
    };
    const initData = () => {
      state.loading = false;
      findSpecifiedMeterialData({ id: props.id }).then((res) => {
        if (res.data.materialImages.length > 0) {
          res.data.materialImages.forEach((item) => {
            item.url = item.fileUrl;
          });
        }
        res.data.departmentType = String(res.data.departmentType);
        res.data.isExpiration = String(res.data.isExpiration);
        state.dataSource = res.data;
        state.loading = true;
      });
    };
    const handDelete = (data) => {
      const params = {
        id: data.id,
      };
      deleteMeterialInfoData(params).then((res) => {
        // if (res.data) {
        //   slot.emit("close");
        // }
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
<style lang="less" scoped>
:deep(.ant-form-item-label) {
  width: 100px;
}
</style>
