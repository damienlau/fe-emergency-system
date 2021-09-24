<template>
  <a-card
    class="card"
    style="width: 100%"
    :bodyStyle="{
      background: '#0B4070',
    }"
  >
    <div class="top flex flex-row w-fll pb-3">
      <a-image
        class="pt-3"
        :width="100"
        :height="100"
        :src="img"
        @click.stop="unshowMeterialDialog"
      />
      <div class="right ml-20">
        <div class="row">
          <span class="title mr-3 mb-3">{{ info.materialName || "--" }}</span>
          <a-tag
            size="mini"
            class="rounded-full"
            :color="info.status && returnStatus(info.status).color"
            >{{ info.status && returnStatus(info.status).text }}</a-tag
          >
        </div>
        <div class="row">
          <span class="label">货架位置:</span>
          <span class="value" v-if="info.rackNumber">{{
            info.rackNumber === "520" ? "物料架" : info.rackNumber + "号货架"
          }}</span>
          <span class="value">{{
            positionInfo[info.rackPosition] || "- -"
          }}</span>
        </div>
        <div class="row">
          <span class="label">类型:</span>
          <span class="value">{{
            info.departmentType && department[info.departmentType]
          }}</span>
        </div>
        <div class="row">
          <span class="label">箱子:</span>
          <span class="value">{{ info.boxName }}</span>
        </div>
        <div class="row">
          <span class="label">物资编码:</span>
          <span class="value">{{ info.materialCode }}</span>
        </div>
      </div>
    </div>
    <div class="bottom mt-10 flex flex-row justify-between align-middle">
      <div class="left">
        <a-button
          type="primary"
          class="mr-3"
          v-if="
            info.inBatchPendingStatus === 0 ||
            info.inBatchPendingStatus === 2 ||
            info.inBatchPendingStatus === 3
          "
          @click.stop="changeDebit"
          :disabled="
            info.status !== 1 ||
            info.inBatchPendingStatus === 2 ||
            info.inBatchPendingStatus === 3
          "
        >
          <template #icon>
            <Icon class="align-baseline" :type="'lending'" />
          </template>
          借货</a-button
        >
        <a-button
          danger
          v-if="info.inBatchPendingStatus === 1"
          @click.stop="handCansel(1)"
          :disabled="info.status !== 1"
          >取消借货</a-button
        >
      </div>
      <div class="right">
        <a-button
          ghost
          class="mr-3"
          v-if="info.inBatchPendingStatus !== 2"
          :disabled="
            info.status !== 1 ||
            info.inBatchPendingStatus === 1 ||
            info.inBatchPendingStatus === 2 ||
            info.inBatchPendingStatus === 3
          "
          @click.stop="changeMaintain"
        >
          <template #icon>
            <Icon class="align-baseline" :type="'repair'" />
          </template>
          维修</a-button
        >
        <a-button
          danger
          class="mr-3"
          v-if="info.inBatchPendingStatus === 2"
          @click.stop="handCansel(2)"
          :disabled="info.status !== 1"
          >取消维修</a-button
        >
        <a-button
          ghost
          v-if="info.inBatchPendingStatus !== 3"
          :disabled="
            info.status !== 1 ||
            info.inBatchPendingStatus === 1 ||
            info.inBatchPendingStatus === 2 ||
            info.inBatchPendingStatus === 3
          "
          @click.stop="changeRepair"
        >
          <template #icon>
            <Icon class="align-baseline" :type="'maintain'" /> </template
          >保养</a-button
        >
        <a-button
          danger
          class="mr-3"
          v-if="info.inBatchPendingStatus === 3"
          @click.stop="handCansel(3)"
          :disabled="info.status !== 1"
          >取消保养</a-button
        >
      </div>
    </div>
  </a-card>
</template>
<script>
import { defineComponent, ref, onMounted, toRefs, reactive } from "vue";
import {
  addBatchPendingData,
  deleteByFindData,
  findSpecifiedMeterialData,
} from "api/warehouse/meterial";
import { Icon } from "components";
export default defineComponent({
  name: "meterialInfo",
  props: {
    meterialInfo: Object,
  },
  components: { Icon },
  setup(props, slot) {
    const state = reactive({
      info: {},
      img: "",
    });
    const positionInfo = ref({
      0: "未知",
      1: "一层(下)",
      2: "二层(中)",
      3: "三层(上)",
      4: "四层(顶)",
    });
    const department = ref({
      1: "急救/重症",
      2: "门诊",
      3: "后勤",
      4: "指挥",
      5: "重症",
      6: "超声",
      7: "清创",
      8: "留观",
      9: "药房",
      10: "耗材",
      11: "手术",
      12: "防疫/隔离",
      13: "消毒",
      14: "住院",
      15: "检验",
    });
    onMounted(() => {
      state.info = props.meterialInfo;
      state.img =
        props.meterialInfo &&
        props.meterialInfo.materialImages &&
        props.meterialInfo.materialImages.length > 0
          ? props.meterialInfo.materialImages[0].fileUrl
          : "www.test";
    });
    const changeMaintain = () => {
      const params = {
        operationType: 2,
        resourceType: 1,
        materialId: props.meterialInfo.id,
      };
      addBatchPendingData(params).then((res) => {
        if (res.data) {
          findDetail();
          freshBoxList();
        }
      });
    };
    const changeRepair = () => {
      const params = {
        operationType: 3,
        resourceType: 1,
        materialId: props.meterialInfo.id,
      };
      addBatchPendingData(params).then((res) => {
        if (res.data) {
          findDetail();
          freshBoxList();
        }
      });
    };
    const changeDebit = () => {
      const params = {
        operationType: 1,
        resourceType: 1,
        materialId: props.meterialInfo.id,
      };
      addBatchPendingData(params).then((res) => {
        if (res.data) {
          findDetail();
          freshBoxList();
        }
      });
    };
    const handCansel = (operationType) => {
      const params = {
        operationType: operationType,
        resourceType: 1,
        materialId: props.meterialInfo.id,
      };
      deleteByFindData(params).then((res) => {
        if (res.data) {
          findDetail();
          freshBoxList();
        }
      });
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
    const findDetail = () => {
      findSpecifiedMeterialData({ id: props.meterialInfo.id }).then((res) => {
        state.info = JSON.parse(JSON.stringify(res.data));
      });
    };
    const freshBoxList = () => {
      slot.emit("freshBoxList");
    };
    const unshowMeterialDialog = () => {
      slot.emit("unshowMeterialDialog");
    };
    return {
      ...toRefs(state),
      positionInfo,
      department,
      returnStatus,
      changeMaintain,
      changeRepair,
      changeDebit,
      handCansel,
      findDetail,
      unshowMeterialDialog,
    };
  },
});
</script>
<style lang="less" scoped>
:deep(.ant-form-item-label) {
  width: 100px;
}
:deep(.ant-btn[disabled], .ant-btn[disabled]:hover, .ant-btn[disabled]:focus, .ant-btn[disabled]:active) {
  border: 1px solid rgba(255, 255, 255, 0.3);
}

:deep(.ant-card-body) {
  border: none;
  &:hover {
    border: 1px solid #3a9beb;
    box-shadow: 0px 0px 16px 0px rgba(0, 102, 245, 0.5),
      0px 0px 12px 0px rgba(51, 153, 255, 0.5);
  }
}

.top {
  border-bottom: 1px solid #0e518f;
}
.row {
  .title {
    font-size: 16px;
  }
  .label {
    margin-right: 14px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    line-height: 22px;
  }
}
</style>
