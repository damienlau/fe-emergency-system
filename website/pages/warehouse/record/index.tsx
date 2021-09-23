// 借还记录
import { defineComponent, ref, watch, computed } from "vue";

import EventList from "./eventList";
import DailyList from "./dailyList";
import MaintainList from "./maintainList";
import { Modal } from "components";
import BoxDetailDialog from "../../warehouse/material/components/boxDetailDialog.vue";
import MeterialDetailDialog from "../../warehouse/material/components/meterialDetailDialog.vue";
export default defineComponent({
  components: {
    EventList,
    DailyList,
    MaintainList,
    Modal,
    BoxDetailDialog,
    MeterialDetailDialog,
  },
  emits: ["handDetail"],
  setup() {
    const menuActiveKey = ref("event");
    const boxDetailDialogTitle = ref("");
    const boxDetailDialogStatus = ref("");
    const boxId = ref("");
    const meterialId = ref("");
    const boxCode = ref("");
    const meterialDetailDialogStatus = ref("");
    const meterialDetailDialogTitle = ref("");
    const boxVisible = ref(false);
    const meterialDetailVisible = ref(false);

    const closeBoxDetailDialog = () => {
      boxVisible.value = false;
    };
    const closeMeterialDetailDialog = () => {
      meterialDetailVisible.value = false;
    };
    const handDetail = (val) => {
      console.log(val, "val");
      if (val.goodsName.resourceType === 2) {
        showBoxDetailDialog(val.goodsName.warehouseBoxInfo);
      } else {
        showMeterialDetailDialog(val.goodsName.materialInfo);
      }
    };
    const showBoxDetailDialog = (item) => {
      const num =
        "(" + item.materialRemainNumber + "/" + item.materialTotalNumber + ")";

      boxId.value = item.id;
      boxCode.value = item.boxCode;
      boxVisible.value = true;
      boxDetailDialogTitle.value = item.boxName + num;
      boxDetailDialogStatus.value = item.status;
    };

    const showMeterialDetailDialog = (item) => {
      meterialId.value = item.id;
      meterialDetailVisible.value = true;
      meterialDetailDialogTitle.value = item.boxName
        ? item.materialName + "(" + item.boxName + ")"
        : item.materialName;

      meterialDetailDialogStatus.value = item.status;
    };
    return () => (
      <>
        <a-tabs
          v-model={menuActiveKey.value}
          animated={false}
          class="dark:bg-navy-4 record"
        >
          <a-tab-pane key={"event"} tab="事件记录">
            <EventList onHandDetail={handDetail}></EventList>
          </a-tab-pane>
          <a-tab-pane key={"daily"} tab="日常记录">
            <DailyList></DailyList>
          </a-tab-pane>
          <a-tab-pane key={"2"} tab="维修记录">
            <MaintainList menuActiveKey={"2"}></MaintainList>
          </a-tab-pane>
          <a-tab-pane key={"1"} tab="保养记录">
            <MaintainList menuActiveKey={"1"}></MaintainList>
          </a-tab-pane>
        </a-tabs>
        <Modal
          v-model={[boxVisible.value, "visible"]}
          size="heavy"
          title={boxDetailDialogTitle.value}
          status={boxDetailDialogStatus.value}
          onCancel={closeBoxDetailDialog}
          key="box"
        >
          <BoxDetailDialog
            id={boxId.value}
            boxCode={boxCode.value}
            onClose={closeBoxDetailDialog}
          ></BoxDetailDialog>
        </Modal>
        <Modal
          v-model={[meterialDetailVisible.value, "visible"]}
          title={meterialDetailDialogTitle.value}
          status={meterialDetailDialogStatus.value}
          onCancel={closeMeterialDetailDialog}
          size="heavy"
          key="material"
        >
          <MeterialDetailDialog
            id={meterialId.value}
            onClose={closeMeterialDetailDialog}
          ></MeterialDetailDialog>
        </Modal>
      </>
    );
  },
});
