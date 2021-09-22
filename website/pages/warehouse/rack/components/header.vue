<template>
  <div class="header">
    <a-page-header
      style="background-color: #042546; padding: 12px 17px"
      title="返回"
      sub-title=""
      @back="() => $router.go(-1)"
    >
      <template #tags>
        <div class="tags">
          <div class="left">
            <span style="font-size: 20px">{{ rackNumber }}号货架</span>
            <a-input-search
              v-model:value="keyword"
              placeholder="请输入物资或箱子名称"
              style="width: 364px; margin-left: 17px"
              @search="onSearch"
            />
          </div>
          <div class="center">
            <p>
              箱子在库量：<span>{{
                inStockNumFilter(rackCount.boxInStockNum)
              }}</span
              >/{{ totalStockNumFilter(rackCount.boxInStockNum) }}
            </p>
            <p>
              物资在库量：<span>{{
                inStockNumFilter(rackCount.materialInStockNum)
              }}</span
              >/{{ totalStockNumFilter(rackCount.materialInStockNum) }}
            </p>
          </div>
        </div>
      </template>
      <template #extra>
        <a-button key="1" type="primary"> 整架借出 </a-button>
      </template>
    </a-page-header>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RackHeader",
  props: {
    rackNumber: {
      type: String,
    },
    rackCount: {
      type: Object,
    },
  },
  data() {
    return {
      keyword: "",
    };
  },
  emits: ["on-search"],
  methods: {
    onSearch() {
      this.$emit("on-search", 1);
    },
    inStockNumFilter(stockNum) {
      return (stockNum && stockNum.split("/")[0]) || 0;
    },
    totalStockNumFilter(stockNum) {
      return (stockNum && stockNum.split("/")[1]) || 0;
    },
  },
});
</script>

<style scoped lang="less">
.header {
  :deep(.ant-page-header-heading-title) {
    font-size: 14px;
  }
  .tags {
    display: flex;
    align-items: center;
    .center {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 120px;
      p {
        margin: 0 32px;
        span {
          font-size: 24px;
        }
      }
    }
  }
}
</style>
