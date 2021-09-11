<template>
  <a-card hoverable style="width: 100%">
    <div class="top flex flex-row w-fll pb-3">
      <a-image class="pt-3" :width="100" :height="100" :src="img" />
      <div class="right ml-20">
        <div class="row">
          <span class="title mr-3 mb-3">{{ info.materialName }}</span>
          <a-tag
            size="mini"
            :color="info.status && returnStatus(info.status).color"
            >{{ info.status && returnStatus(info.status).text }}</a-tag
          >
        </div>

        <div class="row">
          <span class="label">货架位置:</span>
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
          <span class="label">箱号:</span>
          <span class="value">{{ info.boxCode }}</span>
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
          v-if="info.inBatchPendingStatus === 0"
          @click.stop="changeDebit"
          :disabled="info.status !== 1"
          >借货</a-button
        >
        <a-button
          danger
          v-if="info.inBatchPendingStatus === 1"
          @click.stop="handCansel"
          :disabled="info.status !== 1"
          >取消借货</a-button
        >
      </div>
      <div class="right" v-if="info.status === 1">
        <a-button
          type="primary"
          ghost
          class="mr-3"
          :disabled="
            info.inBatchPendingStatus === 1 ||
            info.inBatchPendingStatus === 2 ||
            info.inBatchPendingStatus === 3
          "
          @click.stop="changeMaintain"
          >维修</a-button
        >
        <a-button
          type="primary"
          ghost
          :disabled="
            info.inBatchPendingStatus === 1 ||
            info.inBatchPendingStatus === 2 ||
            info.inBatchPendingStatus === 3
          "
          @click.stop="changeRepair"
          >保养</a-button
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
export default defineComponent({
  name: "meterialInfo",
  props: {
    meterialInfo: Object,
  },
  setup(props) {
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
      console.log(
        props.meterialInfo.materialImages,
        "props.meterialInfo.materialImages"
      );
      state.info = props.meterialInfo;
      state.img =
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
        findDetail();
      });
    };
    const changeRepair = () => {
      const params = {
        operationType: 3,
        resourceType: 1,
        materialId: props.meterialInfo.id,
      };
      addBatchPendingData(params).then((res) => {
        findDetail();
      });
    };
    const changeDebit = () => {
      const params = {
        operationType: 1,
        resourceType: 1,
        materialId: props.meterialInfo.id,
      };
      addBatchPendingData(params).then((res) => {
        findDetail();
      });
    };
    const handCansel = () => {
      const params = {
        operationType: 1,
        resourceType: 1,
        materialId: props.meterialInfo.id,
      };
      deleteByFindData(params).then((res) => {
        findDetail();
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
            text: "待出库",
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
        state.info = JSON.parse(JSON.stringify(res));
      });
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
    };
  },
});
</script>
<style lang="less" scoped>
.top {
  border-bottom: 1px solid #4280c4;
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
