<template>
  <div>
    <a-tabs
      v-model:activeKey="activeKey"
      @tabClick="tabClick"
      :animated="false"
    >
      <a-tab-pane :key="'materials'" tab="物资">
        <a-form layout="inline">
          <a-form-item>
            <div class="flex flex-row">
              <a-input-search
                v-model:value="meterialSearchValue"
                placeholder="物资搜索"
                allowClear
                @search="getMaterialsData"
              ></a-input-search>
              <a-button type="primary" class="ml-20" @click="showMetarialDilog"
                >物资入库</a-button
              >
            </div>
          </a-form-item>
        </a-form>
        <div class="box">
          <MeterialInfo
            ref="MeterialInfo"
            v-for="(item, index) in materialsList"
            :key="index"
            :meterialInfo="item"
            class="BoxInfo mt-3"
            @click="showMeterialDetailDialog(item)"
          ></MeterialInfo>
          <a-button type="link"> 点击加载更多~</a-button>
        </div>
        <Modal
          v-model:visible="meterialAddVisible"
          size="heavy"
          title="物资入库"
          key="materials"
        >
          <AddMeterialDialog></AddMeterialDialog>
        </Modal>
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
              <a-button
                type="primary"
                class="ml-20"
                @click="boxAddVisible = true"
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
            @click="showBoxDetailDialog(item)"
          ></BoxInfo>
          <a-button type="link"> 点击加载更多~</a-button>
        </div>
        <Modal
          v-model:visible="boxAddVisible"
          size="heavy"
          title="新增箱子"
          :zIndex="1"
          key="box"
        >
          <AddBoxDialog @close="closeAddBoxDialog"></AddBoxDialog>
        </Modal>
      </a-tab-pane>
    </a-tabs>
    <Modal
      v-model:visible="meterialDetailVisible"
      :title="meterialDetailDialogTitle"
      size="heavy"
      key="box"
    >
      <MeterialDetailDialog
        :id="meterialId"
        @close="closeMeterialDetailDialog"
      ></MeterialDetailDialog>
    </Modal>
    <Modal
      v-model:visible="boxDetailVisible"
      :title="boxDetailDialogTitle"
      size="heavy"
      key="box"
      :zIndex="1"
    >
      <BoxDetailDialog
        :id="boxId"
        :boxCode="boxCode"
        @close="closeBoxDetailDialog"
      ></BoxDetailDialog>
    </Modal>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
import BoxInfo from "../components/boxInfo.vue";
import AddBoxDialog from "../components/addBoxDialog.vue";
import AddMeterialDialog from "../components/addMeterialDialog.vue";
import AddBoxTransfer from "../components/addBoxMeterialTransferDialog.vue";
import MeterialDetailDialog from "../components/meterialDetailDialog.vue";
import BoxDetailDialog from "../components/boxDetailDialog.vue";
import MeterialInfo from "../components/meterialInfo.vue";
import { Modal, Tabs } from "components";
import { findCriteriaPageData, findBoxPageData } from "api/warehouse/meterial";
export default defineComponent({
  name: "SiderBar",
  components: {
    BoxInfo,
    MeterialInfo,
    Modal,
    Tabs,
    AddBoxDialog,
    AddMeterialDialog,
    MeterialDetailDialog,
    BoxDetailDialog,
    AddBoxTransfer,
  },

  setup() {
    const meterialSearchValue = ref("");
    const boxSearchValue = ref("");
    const state = reactive({
      activeKey: "materials",
      meterialAddVisible: false, //新增物资
      boxAddVisible: false, // 新增箱子
      meterialDetailVisible: false, // 物资详情
      boxDetailVisible: false, // 箱子详情
      boxList: [],
      materialsList: [],
      meterialId: "",
      boxId: "",
      boxCode: "",
      meterialDetailDialogTitle: "",
      boxDetailDialogTitle: "",
    });
    onMounted(() => {
      getMaterialsData();
    });
    const getMaterialsData = () => {
      state.materialsList = [];
      const search = meterialSearchValue.value;
      findCriteriaPageData({ materialName: search }).then((res) => {
        state.materialsList = res.content;
      });
    };
    const getBoxData = () => {
      state.boxList = [];
      const search = boxSearchValue.value;
      findBoxPageData({ boxName: search }).then((res) => {
        state.boxList = res.content;
      });
    };
    const tabClick = (tabs) => {
      if (tabs === "box") {
        getBoxData();
      } else {
        getMaterialsData();
      }
    };
    const showMetarialDilog = () => {
      state.meterialAddVisible = true;
    };
    const showMeterialDetailDialog = (item) => {
      state.meterialId = item.id;
      state.meterialDetailVisible = true;
      state.meterialDetailDialogTitle = item.materialName;
    };
    const showBoxDetailDialog = (item) => {
      const num =
        "(" + item.materialRemainNumber + "/" + item.materialTotalNumber + ")";

      state.boxId = item.id;
      state.boxCode = item.boxCode;
      state.boxDetailVisible = true;
      state.boxDetailDialogTitle = item.boxName + num;
    };
    const closeMeterialDetailDialog = () => {
      state.meterialDetailVisible = false;
      getMaterialsData();
    };
    const closeBoxDetailDialog = () => {
      state.boxDetailVisible = false;
      getBoxData();
    };
    const closeAddBoxDialog = () => {
      state.boxAddVisible = false;
      getBoxData();
    };
    return {
      ...toRefs(state),
      meterialSearchValue,
      boxSearchValue,
      getMaterialsData,
      getBoxData,
      tabClick,
      showMetarialDilog,
      showMeterialDetailDialog,
      showBoxDetailDialog,
      closeMeterialDetailDialog,
      closeBoxDetailDialog,
      closeAddBoxDialog,
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
  overflow-y: auto;
  padding-bottom: 20px;
  .BoxInfo {
    max-width: 460px;
    max-height: 220px;
    margin-right: 5px;
  }
}
</style>
