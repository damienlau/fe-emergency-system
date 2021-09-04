<template>
  <a-tabs v-model:activeKey="activeKey" @tabClick="tabClick" :animated="false">
    <a-tab-pane :key="'materials'" tab="物资">
      <a-form layout="inline">
        <a-form-item>
          <a-input-search
            v-model:value="meterialSearchValue"
            placeholder="物资搜索"
            allowClear
            @search="getMaterialsData"
          ></a-input-search>
        </a-form-item>
      </a-form>
      <div class="box">
        <MeterialInfo
          ref="MeterialInfo"
          v-for="(item, index) in materialsList"
          :key="index"
          :meterialInfo="item"
          class="BoxInfo mt-3"
        ></MeterialInfo>
        <a-button type="link"> 点击加载更多~</a-button>
      </div>
    </a-tab-pane>
    <a-tab-pane :key="'box'" tab="箱子">
      <a-form layout="inline">
        <a-form-item>
          <div class="flex flex-row">
            <a-input-search
              v-model:value="boxSearchValue"
              allowClear
              placeholder="箱子搜索"
              @search="getBoxData"
            ></a-input-search>
            <a-button type="primary" class="ml-20" @click="visible = true"
              >新增箱子</a-button
            >
          </div>
        </a-form-item>
      </a-form>
      <div class="box">
        <BoxInfo
          ref="BoxInfo"
          v-for="(item, index) in boxList"
          :key="index"
          :boxInfo="item"
          class="BoxInfo mt-3"
        ></BoxInfo>
        <a-button type="link"> 点击加载更多~</a-button>
      </div>
    </a-tab-pane>
  </a-tabs>
  <Modal v-model:visible="visible" title="新增箱子">
    
     </Modal>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
import BoxInfo from "../components/boxInfo.vue";
import MeterialInfo from "../components/meterialInfo.vue";
import { Modal, Tabs, Form } from "components";
import {
  findCriteriaPageData,
  findBoxPageData,
  addBoxData,
} from "api/warehouse/meterial";
export default defineComponent({
  name: "SiderBar",
  components: { BoxInfo, MeterialInfo, Modal, Tabs },

  setup() {
    const meterialSearchValue = ref("");
    const boxSearchValue = ref("");
    const state = reactive({
      activeKey: "materials",
      visible: false,
      boxInfo: {
        name: "测试",
      },
      boxList: [],
      materialsList: [],
    });
    onMounted(() => {
      getMaterialsData();
    });
    const getMaterialsData = () => {
      state.materialsList = [];
      const search = meterialSearchValue.value;
      findCriteriaPageData({ materialName: search }).then((res) => {
        state.materialsList = res.data.content;
      });
    };
    const getBoxData = () => {
      state.boxList = [];
      const search = boxSearchValue.value;
      findBoxPageData({ boxName: search }).then((res) => {
        state.boxList = res.data.content;
      });
    };
    const tabClick = (tabs) => {
      if (tabs === "box") {
        getBoxData();
      } else {
        getMaterialsData();
      }
    };
    return {
      ...toRefs(state),
      meterialSearchValue,
      boxSearchValue,
      getMaterialsData,
      getBoxData,
      tabClick,
    };
  },
});
</script>
<style lang="less" scoped>
.ant-tabs-top-content {
  height: 76vh;
}
.box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
  background: pink;
  overflow-y: auto;
  padding-bottom: 20px;
  .BoxInfo {
    max-width: 460px;
    max-height: 220px;
    margin-right: 5px;
  }
}
</style>
