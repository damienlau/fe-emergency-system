<template>
  <a-card
    hoverable
    style="width: 340px; background: #144071"
    :bodyStyle="bodyStyle"
  >
    <div class="top">
      <span class="title">{{ info.boxName }}</span>
    </div>
    <div class="bottom flex flex-row w-fll pb-3">
      <a-image class="pt-3" :width="80" :height="80" :src="img" />
      <div class="right ml-20">
        <div class="row">
          <span class="number mr-3">{{
            "(" +
            info.materialRemainNumber +
            "/" +
            info.materialTotalNumber +
            ")"
          }}</span>
          <a-tag
            size="mini"
            :color="info.status && returnStatus(info.status).color"
            >{{ info.status && returnStatus(info.status).text }}</a-tag
          >
        </div>

        <div class="row">
          <span class="label">货架位置:</span>
          <span class="value">{{
            info.rackPosition && positionInfo[info.rackPosition]
          }}</span>
        </div>
        <div class="row">
          <span class="label">类型:</span>
          <span class="value">{{
            info.departmentType && department[info.departmentType]
          }}</span>
        </div>
        <div class="row">
          <span class="label">尺寸:</span>
          <span class="value">{{ info.size && sizeType[info.size] }}</span>
        </div>
        <div class="row">
          <span class="label">物资编码:</span>
          <span class="value">{{ info.boxCode }}</span>
        </div>
      </div>
    </div>
  </a-card>
</template>
<script>
import { defineComponent, ref, onMounted, toRefs, reactive } from "vue";
export default defineComponent({
  name: "BoxInfo",
  props: {
    boxInfo: Object,
  },
  setup(props) {
    const state = reactive({
      info: {},
      img: "",
      isDebit: true,
      bodyStyle: {
        padding: "10px",
      },
    });
    const sizeType = ref({
      1: "一箱一桌(800 x 600 x 600)",
      2: "一箱两柜(1200 x 800 x 800)",
      3: "一箱一柜(1200 x 800 x 400)",
      4: "其他箱子",
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
      state.info = props.boxInfo;
      state.img =
        props.boxInfo.boxImages && props.boxInfo.boxImages[0].url
          ? props.boxInfo.boxImages[0].url
          : "www.test";
    });
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
    return {
      ...toRefs(state),
      positionInfo,
      department,
      sizeType,
      returnStatus,
    };
  },
});
</script>
<style lang="less" scoped>
.top {
  border-bottom: 1px solid #4280c4;
  margin-bottom: 8px;
  font-size: 16px;
  margin: 5px;
}
.row {
  .title {
    font-size: 14px;
  }
  .label {
    margin-right: 10px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    line-height: 20px;
  }
}
</style>
