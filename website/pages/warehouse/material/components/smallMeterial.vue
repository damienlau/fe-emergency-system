<template>
  <a-card
    hoverable
    class="meterial-card"
    :headStyle="headStyle"
    :bodyStyle="bodyStyle"
  >
    <template #title>
      <div class="title row">
        {{ info.materialName }}
        <a-tag
          size="mini"
          :color="info.status && returnStatus(info.status).color"
          style="height: 18px;line-height: 18px;border-radius: 9px;font-size: 12px"
          >{{ info.status && returnStatus(info.status).text }}</a-tag
        >
      </div>
    </template>
    <template #extra>
      <a-button v-if="showDelete" type="text" danger @click.stop="handDelete"
        >移除</a-button
      >
      <a-button
        v-if="showAdd"
        type="text"
        style="color: green"
        @click.stop="handAdd"
        >添加</a-button
      >
    </template>
    <div class="bottom flex flex-row w-fll">
      <a-image class="pt-3" :width="80" :height="80" :src="img" />
      <div class="right ml-20">

        <div class="row">
          <span class="label">货架位置</span>
          <span class="value">{{
            positionInfo[info.rackPosition] || "- -"
          }}</span>
        </div>
        <div class="row">
          <span class="label">类型</span>
          <span class="value">{{
            info.departmentType && department[info.departmentType]
          }}</span>
        </div>
        <div class="row">
          <span class="label">箱号</span>
          <span class="value">{{ info.boxCode || "--" }}</span>
        </div>
        <div class="row">
          <span class="label">物资编码</span>
          <span class="value">{{ info.materialCode || "--" }}</span>
        </div>
      </div>
    </div>
  </a-card>
</template>
<script>
import { defineComponent, ref, onMounted, toRefs, reactive } from "vue";
export default defineComponent({
  name: "smallMeterial",
  props: {
    materialInfo: Object,
    showDelete: {
      type: Boolean,
    },
    showAdd: {
      type: Boolean,
    },
  },
  setup(props, slot) {
    const state = reactive({
      info: {},
      img: "",
      headStyle: {
        padding: "4px 8px",
        height: "32px",
        minHeight: "32px",
        borderBottom: "1px solid #4280c4",
      },
      bodyStyle: {
        padding: "10px",
      },
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
      state.info = props.materialInfo;
      state.img =
        props.materialInfo.materialImages &&
        props.materialInfo.materialImages[0]?.fileUrl
          ? props.materialInfo.materialImages[0].fileUrl
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
    const handAdd = () => {
      slot.emit("choose", props.materialInfo);
    };
    const handDelete = () => {
      slot.emit("delete", props.materialInfo);
    };
    return {
      ...toRefs(state),
      positionInfo,
      department,
      returnStatus,
      handAdd,
      handDelete,
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
  display: flex;
  align-items: center;

  .title {
    font-size: 14px;
  }
  .label {
    position: relative;
    width: 55px;
    margin-right: 10px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    line-height: 20px;
    white-space: nowrap;
    text-align-last: justify;
    text-align: justify;

    &::after {
      position: absolute;
      right: 0;
      content: "：";
      width: 1px;
    }
  }
  .value {
    width: 85px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.meterial {
  &-card {
    height: 137px;
    background: #144071;

    /deep/ .ant-card-head-wrapper {

      .ant-card-head-title {
        padding: 0;
      }

      .ant-card-extra {
        padding: 0;
      }
    }
  }
}
.meterial {
  &-card {
    height: 137px;
    background: #144071;

    /deep/ .ant-card-head-wrapper {

      .ant-card-head-title {
        padding: 0;
      }

      .ant-card-extra {
        padding: 0;
      }
    }
  }
}
</style>
