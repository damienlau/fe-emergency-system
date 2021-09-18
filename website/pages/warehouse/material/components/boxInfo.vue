<template>
  <a-card
    hoverable
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
        @click.stop="unshowBoxDialog"
      />
      <div class="right ml-20">
        <div class="row">
          <span class="title mr-3 mb-3">{{ info.boxName }}</span>
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
          <span class="label">尺寸:</span>
          <span class="value">{{ info.size && sizeType[info.size] }}</span>
        </div>
        <div class="row">
          <span class="label">箱子编码:</span>
          <span class="value">{{ info.boxCode }}</span>
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
            <Icon class="align-baseline" :type="'lending'" /> </template
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
    </div>
  </a-card>
</template>
<script>
import { defineComponent, ref, onMounted, toRefs, reactive } from "vue";
import {
  addBatchPendingData,
  deleteByFindData,
  findSpecifiedBoxData,
} from "api/warehouse/meterial";
import { Icon } from "components";
export default defineComponent({
  name: "boxInfo",
  props: {
    boxInfo: Object,
  },
  components: { Icon },
  setup(props, slot) {
    const state = reactive({
      info: {},
      img: "",
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
        props.boxInfo &&
        props.boxInfo.boxImages &&
        props.boxInfo.boxImages.length > 0
          ? props.boxInfo.boxImages[0].fileUrl
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
    const changeDebit = () => {
      const params = {
        operationType: 1,
        resourceType: 2,
        boxId: props.boxInfo.id,
      };
      addBatchPendingData(params).then((res) => {
        if (res.data) {
          findDetail();
        }
      });
    };
    const handCansel = () => {
      const params = {
        operationType: 1,
        resourceType: 2,
        boxId: props.boxInfo.id,
      };
      deleteByFindData(params).then((res) => {
        if (res.data) {
          findDetail();
        }
      });
    };
    const findDetail = () => {
      findSpecifiedBoxData({ id: props.boxInfo.id }).then((res) => {
        state.info = JSON.parse(JSON.stringify(res.data));
      });
    };
    const unshowBoxDialog = () => {
      slot.emit("unshowBoxDialog");
    };
    return {
      ...toRefs(state),
      positionInfo,
      department,
      sizeType,
      returnStatus,
      changeDebit,
      handCansel,
      findDetail,
      unshowBoxDialog,
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
:deep(.ant-btn-background-ghost) {
  border: 1px solid #fff;
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
