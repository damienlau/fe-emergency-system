<template>
  <div class="meterial">
    <a-form layout="inline">
      <a-form-item>
        <div class="flex flex-row">
          <a-button type="primary" class="mr-20" @click="outForm"
            >整箱借出</a-button
          >
          <a-input-search
            v-model:value="keyword"
            placeholder="物资搜索"
            allowClear
            @search="getFirstMaterialsData"
          ></a-input-search>
        </div>
      </a-form-item>
    </a-form>
    <div class="box">
      <MeterialInfo
        ref="MeterialInfo"
        v-for="(item, index) in materialsList"
        :key="index"
        :meterialInfo="item"
        class="BoxInfo"
      ></MeterialInfo>
      <div style="height: 120px; width: 450px; text-align: center" v-if="materialsList">
        <a-button
          type="link"
          v-if="pagination.total > materialsList.length"
          @click="handAddMoreMaterial"
        >
          点击加载更多~</a-button
        >
        <a-button
          type="link"
          v-if="!(pagination.total > materialsList.length)"
        >
          没有数据了~</a-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, toRefs, onMounted, reactive } from "vue";
import MeterialInfo from "pages/warehouse/material/components/meterialInfo.vue";
import { Tabs } from "components";
import { findCriteriaPageData } from "api/warehouse/meterial";
export default defineComponent({
  name: "MeterialList",
  components: {
    MeterialInfo,
    Tabs,
  },
  props: {
    racknumber: String,
    boxcode: String
  },

  setup(props) {
    const state = reactive({
      keyword: '',
      materialsList: [],
      boxId: "",
      boxCode: "",
      materialRemainNumber: "",
      meterialDetailDialogTitle: "",
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
    });
    onMounted(() => {
      getFirstMaterialsData();
    });
    const getMaterialsData = () => {
      const pageOrdersJSON = encodeURIComponent(
        `[{'direction':'desc','property':'id'}]`
      );
      const params = {
        rackNumber: props.racknumber,
        boxCode: props.boxcode,
        currentPage: state.pagination.current,
        pageSize: state.pagination.pageSize,
        pageOrdersJSON: pageOrdersJSON,
        materialName: state.keyword,
      };
      findCriteriaPageData(params).then((res) => {
        state.materialsList = state.materialsList.concat(res.data.content);
        state.pagination.total = res.data.totalNum;
      });
    };
    const tabClick = (tabs) => {
      
    };
    const getFirstMaterialsData = () => {
      // 初始化数据
      state.materialsList = [];
      state.pagination.current = 1;
      if (state.materialsList.length === 0) {
        getMaterialsData();
      }
    };

    // 借出
    const outForm = () => {}

    return {
      ...toRefs(state),
      getMaterialsData,
      tabClick,
      getFirstMaterialsData,
    };
  },
});
</script>
<style lang="less" scoped>
.meterial {
  display: flex;
  flex-direction: column;
  max-width: 484px;
  height: 652px;
  border: 1px solid #0E518F;
  border-radius: 4px;
  padding: 24px 16px 0;
  margin-left: 36px;
}
.ant-tabs-top-content {
  height: 76vh;
}
.box {
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: auto;
  padding-bottom: 20px;
  margin-top: 24px;
  .BoxInfo {
    max-width: 452px;
    max-height: 243px;
    margin-right: 5px;
    background-color: #0B4070;
  }
}
</style>
