<template>
  <div class="content">
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
                v-if="
                  dataSource.status == 1 &&
                  dataSource.inBatchPendingStatus == 0 &&
                  !materialRemainNumber
                "
              >
                <a-button
                  type="primary"
                  ghost
                  class="flex flex-row items-center mr-3"
                  danger
                >
                  <template #icon>
                    <Icon class="align-baseline" :type="'delete'" />
                  </template>
                  删除
                </a-button>
              </a-popconfirm>
              <a-button
                type="primary"
                ghost
                v-if="
                  dataSource.status == 1 &&
                  dataSource.inBatchPendingStatus == 0 &&
                  materialRemainNumber
                "
                class="flex flex-row items-center mr-3"
                danger
                @click="deleteBoxVisible = true"
              >
                <template #icon>
                  <Icon class="align-baseline" :type="'delete'" />
                </template>
                删除
              </a-button>

              <a-button
                class="mr-3"
                v-if="isEditBase && dataSource.status == 1"
                @click="isEditBase = false"
              >
                <template #icon>
                  <Icon class="align-baseline" :type="'edit'" /> </template
                >编辑</a-button
              >
              <a-button
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
      <a-tab-pane :key="'other'" tab="其他信息">
        <Form
          v-if="loading"
          :columns="otherForm"
          v-model:dataSource="dataSource"
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
                v-if="
                  dataSource.status == 1 &&
                  dataSource.inBatchPendingStatus == 0 &&
                  !materialRemainNumber
                "
              >
                <a-button
                  type="primary"
                  ghost
                  class="flex flex-row items-center mr-3"
                  danger
                >
                  <template #icon>
                    <Icon class="align-baseline" :type="'delete'" />
                  </template>
                  删除
                </a-button>
              </a-popconfirm>
              <a-button
                type="primary"
                ghost
                v-if="
                  dataSource.status == 1 &&
                  dataSource.inBatchPendingStatus == 0 &&
                  materialRemainNumber
                "
                class="flex flex-row items-center mr-3"
                danger
                @click="deleteBoxVisible = true"
              >
                <template #icon>
                  <Icon class="align-baseline" :type="'delete'" />
                </template>
                删除
              </a-button>
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
              <a-button
                ghost
                class="mr-3"
                htmlType="submit"
                v-if="!isEditOther"
              >
                <template #icon>
                  <Icon class="align-baseline" :type="'save'" /> </template
                >保存</a-button
              >
            </div>
          </template>
        </Form>
      </a-tab-pane>
      <a-tab-pane
        :key="'init'"
        :tab="'箱内物资' + ' (' + materialRemainNumber + ')'"
      >
<<<<<<< HEAD
        <div class="box" :style="{ height: boxHeight + 'px' }">
=======
        <div class="box">
>>>>>>> dev
          <div class="addBox" @click="showAddBoxTransfer" v-if="!isEditInit">
            <PlusOutlined :style="{ fontSize: '30px' }" />
            <span class="mt-20"> 添加物资</span>
          </div>
          <SmallMeterial
            v-for="(item, index) in materialList"
            :key="index"
            :materialInfo="item"
            :showDelete="!isEditInit"
            @delete="handDeleteMeterial(item)"
          >
          </SmallMeterial>
        </div>
        <div class="footer">
          <a-popconfirm
            title="确认删除吗?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="handDelete(dataSource)"
            v-if="
              dataSource.status == 1 &&
              dataSource.inBatchPendingStatus == 0 &&
              !materialRemainNumber
            "
          >
            <a-button
              type="primary"
              ghost
              class="flex flex-row items-center mr-3"
              danger
            >
              <template #icon>
                <Icon class="align-baseline" :type="'delete'" /> </template
              >删除
            </a-button>
          </a-popconfirm>
          <a-button
            type="primary"
            ghost
            v-if="
              dataSource.status == 1 &&
              dataSource.inBatchPendingStatus == 0 &&
              materialRemainNumber
            "
            class="flex flex-row items-center mr-3"
            danger
            @click="deleteBoxVisible = true"
          >
            <template #icon>
              <Icon class="align-baseline" :type="'delete'" /> </template
            >删除
          </a-button>
          <a-button
            ghost
            class="mr-3"
            v-if="dataSource.status == 1 && isEditInit"
            @click="isEditInit = false"
          >
            <template #icon>
              <Icon class="align-baseline" :type="'edit'" /> </template
            >编辑</a-button
          >
          <a-button
            ghost
            class="mr-3"
            v-if="!isEditInit"
            @click="addBoxMaterial"
          >
            <template #icon>
              <Icon class="align-baseline" :type="'save'" /> </template
            >保存</a-button
          >
        </div>
      </a-tab-pane>
    </a-tabs>

    <div class="btn" v-if="activeKey === 'init' && !isEditInit">
      <a-button type="text" @click="handBack">撤销</a-button>
      <a-popconfirm
        title="确认全部移除吗?"
        ok-text="确认"
        cancel-text="取消"
        @confirm="handDeleteAll"
        v-if="materialList.length > 0"
      >
        <a-button type="text" danger>全部移除</a-button>
      </a-popconfirm>
    </div>
    <Modal
      v-model:visible="addBoxTransferVisible"
      @cancel="addBoxTransferVisible = false"
      title=""
      size="heavy"
      key="AddBoxTransfer"
      :zIndex="900"
    >
      <AddBoxTransfer @chooseMeterial="chooseMeterial"></AddBoxTransfer>
    </Modal>
    <Modal
      v-model:visible="deleteBoxVisible"
      @cancel="closeDeleteDialog"
      title=""
      size="ultralight"
      key="deleteBox"
      :zIndex="999"
    >
      <div class="text-34 flex flex-row items-center justify-start">
        <Icon
          style="font-size: 26px; color: #f25e68; cursor: pointer"
          class="flex items-center justify-center mr-4"
          type="tip"
        />
        <span>确定要删除这个箱子吗?</span>
        <InfoCircleOutlined />
      </div>
      <a-radio-group
        v-model:value="value"
        class="text-white text-opacity-70 mt-16 px-11"
      >
        <a-radio :style="radioStyle" :value="1">删除箱子及箱内所有物资</a-radio>
        <a-radio :style="radioStyle" :value="0">仅删除箱子</a-radio>
      </a-radio-group>
      <div class="mt-22 flex flex-row justify-end align-middle px-24">
        <a-button class="mr-16" @click="closeDeleteDialog">取消</a-button>
        <a-button
          type="primary"
          :disabled="!(value === 0 || value === 1)"
          @click="handConfirmDelete"
          >确定</a-button
        >
      </div>
    </Modal>
    <Modal
      v-model:visible="removeMaterialVisible"
      @cancel="removeMaterialVisible = false"
      title=""
      size="ultralight"
      key="removeMaterialVisible"
      :zIndex="900"
    >
      <div class="text-34 flex flex-row items-center justify-start">
        <Icon
          style="font-size: 26px; color: #f25e68; cursor: pointer"
          class="flex items-center justify-center mr-4"
          type="error"
        />
        <span>{{ tipsTitle }}</span>
        <InfoCircleOutlined />
      </div>
      <div class="text-white text-opacity-70 px-40 py-20">
        {{ tipsContent }}
      </div>
      <div class="mt-40 flex flex-row justify-end align-middle px-24">
        <a-button type="primary" @click="removeMaterialVisible = false"
          >确定</a-button
        >
      </div>
    </Modal>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
import {
  updateBoxData,
  findSpecifiedBoxData,
  deleteBoxInfoData,
  findMaterialInfoAllData,
  deleteMeterialInfoData,
} from "api/warehouse/meterial";
import SmallMeterial from "./smallMeterial.vue";
import { Form, Modal } from "components";
import { PlusOutlined } from "@ant-design/icons-vue";
import AddBoxTransfer from "./addBoxMeterialTransferDialog.vue";
import { Icon } from "components";
export default defineComponent({
  name: "boxDetailDialog",
  components: {
    Form,
    SmallMeterial,
    PlusOutlined,
    Modal,
    AddBoxTransfer,
    Icon,
  },
  props: {
    id: Number,
    boxCode: String,
    materialRemainNumber: Number,
    status: Number | undefined,
    boxHeight: {
      type: Number,
      default: 320
    }
  },
  setup(props, ctx) {
    const state = reactive({
      activeKey: "base",
      isEditBase: true,
      isEditOther: true,
      isEditInit: true,
      dataSource: {},
      loading: true,
      materialList: [],
      addBoxTransferVisible: false,
      deleteBoxVisible: false, // 删除箱子
      removeMaterialVisible: false, // 移除箱子
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px",
      },
      value: null,
      tipsTitle: "",
      tipsContent: "",
    });
    const baseForm = ref([
      {
        label: "箱子名称",
        key: "boxName",
        required: true,
        span: 12,
      },
      {
        label: "箱子编码",
        key: "boxCode",
        required: false,
        span: 12,
        disabled: true,
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
        label: "货架位置",
        key: "rackNumber",
        type: "select",
        span: 8,
        labelSpan: 9,
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
        span: 4,
        labelSpan: 3,
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
    onMounted(() => {
      initData();
      initMaterialList();
    });

    const handleSubmitBase = (data) => {
      updateBoxData(data).then((res) => {
        if (res.data) {
          state.isEditBase = true;
          initData();
        }
      });
    };
    const handleSubmitOther = (data) => {
      updateBoxData(data).then((res) => {
        if (res.data) {
          state.isEditOther = true;
          initData();
        }
      });
    };
    const initData = () => {
      state.loading = false;
      findSpecifiedBoxData({ id: props.id }).then((res) => {
        if (res.data.boxImages.length > 0) {
          res.data.boxImages.forEach((item) => {
            item.url = item.fileUrl;
          });
        }
        res.data.status = String(res.data.status);
        res.data.size = String(res.data.size);
        res.data.rackPosition = String(res.data.rackPosition);
        res.data.rackNumber = String(res.data.rackNumber);
        res.data.departmentType = String(res.data.departmentType);
        state.dataSource = res.data;
        state.loading = true;
      });
    };
    const initMaterialList = () => {
      state.materialList = [];
      findMaterialInfoAllData({
        boxCode: props.boxCode,
        status: props.status,
      }).then((res) => {
        state.materialList = res.data;
      });
    };
    const showAddBoxTransfer = () => {
      state.addBoxTransferVisible = true;
    };

    const chooseMeterial = (arr) => {
      state.materialList = state.materialList.concat(arr);
      state.addBoxTransferVisible = false;
    };
    const handBack = () => {
      initMaterialList();
    };
    const handDeleteAll = () => {
      let index = 0;
      state.materialList.map((item) => {
        if (item.status !== 1) {
          index++;
        }
      });
      if (index > 0) {
        state.removeMaterialVisible = true;
        state.tipsTitle = "无法批量移除";
        state.tipsContent = "箱内物资存在不在库状态物资, 无法批量移除";
      } else {
        state.materialList = [];
      }
    };
    const deleteChoose = (data) => {
      if (data.status === 1) {
        state.materialList.splice(
          state.materialList.findIndex((item) => {
            item.id === data.id;
          }),
          1
        );
      } else {
        state.removeMaterialVisible = true;
        state.tipsTitle = "该物资无法移除";
        state.tipsContent =
          "该物资" + returnStatus(data.status).text + "状态, 无法移除";
      }
    };
    const returnStatus = (status) => {
      let state = {};
      switch (status) {
        case 1:
          state = {
            color: "#26c159",
            text: "在库",
          };
          break;
        case 2:
          state = {
            color: "#fb5b69",
            text: "已出库",
          };
          break;
        case 3:
          state = {
            color: "#e98c40",
            text: "待出仓",
          };
          break;
        case 4:
          state = {
            color: "#ccc",
            text: "损耗",
          };
          break;
        case 5:
          state = {
            color: "#ccc",
            text: "报废",
          };
          break;
        case 6:
          state = {
            color: "#ccc",
            text: "维修",
          };
          break;
        case 7:
          state = {
            color: "#ccc",
            text: "保养",
          };
          break;
      }
      return state;
    };
    const addBoxMaterial = () => {
      const idArr = [];
      if (state.materialList.length > 0) {
        state.materialList.map((item) => {
          idArr.push(item.id);
        });
      }
      const params = {
        id: props.id,
        materialIds: idArr,
      };
      updateBoxData(params).then((res) => {
        // if (res.data) {
        //   ctx.emit("close");
        // }
      });
    };
    const closeDeleteDialog = () => {
      state.deleteBoxVisible = false;
      state.value = null;
    };
    const handDelete = (data) => {
      const params = {
        id: data.id,
        delMaterial: 0,
      };
      deleteBoxInfoData(params).then((res) => {
        if (res.data) {
          ctx.emit("close");
        }
      });
    };

    // 删除物资
    const handDeleteMeterial = ({ id }) => {
      deleteMeterialInfoData({ id }).then((res) => {
        if (res.data) {
          ctx.emit("close");
        }
      });
    };

    const handConfirmDelete = () => {
      const params = {
        id: state.dataSource.id,
        delMaterial: state.value,
      };
      deleteBoxInfoData(params).then((res) => {
        if (res.data) {
          closeDeleteDialog();
          ctx.emit("close");
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
      initData,
      handDelete,
      initMaterialList,
      showAddBoxTransfer,
      chooseMeterial,
      handBack,
      handDeleteAll,
      addBoxMaterial,
      deleteChoose,
      closeDeleteDialog,
      handConfirmDelete,
      returnStatus,
      handDeleteMeterial,
    };
  },
});
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
  align-content: flex-start;

  .addBox {
    // width: 335px;
    height: 137px;
    background: #57799a;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
.active {
  border: 2px solid #3290fc;
}
.unactive {
  border: none;
}
.content {
  width: 100%;
  position: relative;

  :deep(.ant-tabs-content) {
    padding: 16px 0;

    .ant-form-item-control-input-content {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ant-btn {
      width: 72px;
      justify-content: center;
    }

    .ant-tabs-tabpane {
      display: flex;
      flex-direction: column;
    }
  }

  .btn {
    position: absolute;
    right: 20px;
    top: 18px;
    z-index: 999;
  }
  .footer {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
</style>
