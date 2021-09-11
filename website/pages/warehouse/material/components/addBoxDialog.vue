<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" :animated="false">
      <a-tab-pane :key="'base'" tab="基本信息" class="overflow-y-auto">
        <Form
          v-model:dataSource="formDataBase"
          :columns="baseForm"
          @submit="handleSubmitBase"
        >
          <template #button>
            <a-button type="primary" ghost class="mr-3" htmlType="submit"
              >保存</a-button
            >
          </template>
        </Form>
      </a-tab-pane>
      <a-tab-pane :key="'other'" tab="其他信息">
        <Form
          v-model:dataSource="formDataOter"
          :columns="otherForm"
          @submit="handleSubmitOther"
        >
          <template #button>
            <a-button type="primary" ghost class="mr-3" htmlType="submit"
              >保存</a-button
            >
          </template>
        </Form>
      </a-tab-pane>
      <a-tab-pane
        :key="'init'"
        tab="箱内物资"
        class="flex flex-row flex-wrap justify-start"
        style="backgroud: pink"
      >
        <div class="addBox mt-8" @click="showAddBoxTransfer">
          <PlusOutlined :style="{ fontSize: '30px' }" />
          <span class="mt-20"> 添加物资</span>
        </div>
        <SmallMeterial
          class="mt-8"
          v-for="(item, index) in materialList"
          :materialInfo="item"
          :key="index"
        ></SmallMeterial>
      </a-tab-pane>
      <div
        class="flex flex-row justify-center align-middle"
        v-if="activeKey === 'init'"
      >
        <a-button type="primary" ghost class="mr-3" @click="addBoxMaterial"
          >保存</a-button
        >
      </div>
    </a-tabs>
  </div>
  <Modal
    v-model:visible="addBoxTransferVisible"
    @cancel="addBoxTransferVisible = false"
    title=""
    size="heavy"
    key="AddBoxTransfer"
    :zIndex="999"
  >
    <AddBoxTransfer @chooseMeterial="chooseMeterial"></AddBoxTransfer>
  </Modal>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
import { addBoxData } from "api/warehouse/meterial";
import { Modal } from "components";
import Form from "components/Form";
import { PlusOutlined } from "@ant-design/icons-vue";
import AddBoxTransfer from "./addBoxMeterialTransferDialog.vue";
import SmallMeterial from "./smallMeterial.vue";
export default defineComponent({
  name: "addBoxDialog",
  components: { Form, PlusOutlined, AddBoxTransfer, SmallMeterial, Modal },
  emits: ["close"],
  setup(props, slot) {
    const state = reactive({
      activeKey: "base",
      boxInfo: {},
      addBoxTransferVisible: false, // 穿梭框
      materialList: [],
      formDataBase: {},
      formDataOter: {},
    });
    const baseForm = ref([
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
        label: "货架位置",
        key: "rackNumber",
        type: "select",
        span: 6,
        options: [
          {
            label: "1号货架",
            key: "1",
          },
          {
            label: "2号货架",
            key: "2",
          },
          {
            label: "3号货架",
            key: "3",
          },
          {
            label: "4号货架",
            key: "4",
          },
          {
            label: "5号货架",
            key: "5",
          },
        ],
        required: true,
      },
      {
        label: "",
        key: "rackPosition",
        type: "select",
        span: 6,
        options: [
          {
            label: "未知",
            key: "0",
          },
          {
            label: "一层(下)",
            key: "1",
          },
          {
            label: "二层(中)",
            key: "2",
          },
          {
            label: "三层(上)",
            key: "3",
          },
          {
            label: "四层(顶)",
            key: "4",
          },
        ],
        placeholder: "位置",
        required: true,
      },
      {
        label: "尺寸",
        key: "size",
        type: "select",
        span: 12,
        options: [
          {
            label: "一箱一桌(800 x 600 x 600)",
            key: "1",
          },
          {
            label: "一箱两柜(1200 x 800 x 800)",
            key: "2",
          },
          {
            label: "一箱一柜(1200 x 800 x 400)",
            key: "3",
          },
          {
            label: "其他箱子",
            key: "4",
          },
        ],
        required: true,
      },
      {
        label: "单位",
        key: "unit",
        required: true,
        span: 12,
      },
      {
        label: "物资图片",
        key: "boxImages",
        type: "upload",
        required: false,
        span: 24,
      },
    ]);
    const otherForm = ref([
      {
        label: "华西资产编码",
        key: "assetCode",
        required: true,
        span: 12,
      },
      {
        label: "重量",
        key: "weight",
        required: false,
        span: 12,
      },
      {
        label: "备注",
        key: "remark",
        type: "textArea",
        required: false,
        span: 24,
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
      state.boxInfo = { ...state.formDataBase, ...state.formDataOter };
      addBoxData(state.boxInfo).then((res) => {
        if (res.data) {
          slot.emit("close");
        }
      });
    };
    const handleSubmitOther = () => {
      state.boxInfo = { ...state.formDataBase, ...state.formDataOter };
      addBoxData(state.boxInfo).then((res) => {
        if (res.data) {
          slot.emit("close");
        }
      });
    };

    const handleSubmitInit = () => {
      addBoxData(state.boxInfo).then((res) => {
        if (res.data) {
          slot.emit("close");
        }
      });
    };
    const showAddBoxTransfer = () => {
      state.addBoxTransferVisible = true;
    };
    const chooseMeterial = (arr) => {
      state.materialList = state.materialList.concat(arr);
      state.addBoxTransferVisible = false;
    };
    const addBoxMaterial = () => {
      const idArr = [];
      if (state.materialList.length > 0) {
        state.materialList.map((item) => {
          idArr.push(item.id);
        });
      }
      const params = {
        materialIds: idArr,
        ...state.formDataBase,
        ...state.formDataOter,
      };
      addBoxData(params).then((res) => {
        if (res.data) {
          slot.emit("close");
        }
      });
    };
    return {
      ...toRefs(state),
      baseForm,
      otherForm,
      initForm,
      handleSubmitBase,
      handleSubmitOther,
      handleSubmitInit,
      showAddBoxTransfer,
      chooseMeterial,
      addBoxMaterial,
    };
  },
});
</script>
<style lang="less" scoped>
.addBox {
  width: 335px;
  height: 180px;
  background: #57799a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
