import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import { Button, Space, message } from "ant-design-vue";
import { findBoxCountData, findBoxData, findBoxAllData, addBatchPendingDataRack } from "api/warehouse/material/box";
import Box from "components/Box";
import Form from "components/Form";
import PageHeader from "components/PageHeader";
import BoxDetailDialog from "../material/components/boxDetailDialog.vue";
import MeterialList from "./components/meterial.vue";
import { Modal } from "components";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import classes from "./rackbox.module.less";

export default defineComponent({
  setup() {
    const formColumn = ref([
      {
        key: "boxName",
        placeholder: "物资或箱子名称",
        type: "search",
        required: false
      },
    ]);
    const boxColumn = ref([]);
    const route = useRoute();
    const store = useStore();

    const params = ref({
      boxName: "",
      rackNumber: "",
    });

    // 箱子详情弹窗标题
    const boxDetailDialogTitle = ref("");

    // 箱子id
    const boxId = ref("");

    // 箱编码
    const boxCode = ref("");

    // 物资编号
    const materialRemainNumber = ref("");

    // 显示箱子详情弹窗
    const boxDetailVisible = ref(false);

    // 箱子状态
    const boxStatus = ref(0)

    const formData = ref({});

    const rackCount = ref({
      boxInStockNum: 0,
      boxTotalNum: 0,
      materialInStockNum: 0,
      materialTotalNum: 0,
    });

    const handleSearch = (keyword: any) => {
      params.value.boxName = keyword.boxName;
      initBoxData();
    };

    const inStockNumFilter = (stockNum: string) => {
      return (stockNum && stockNum.split("/")[0]) || 0;
    };

    const totalStockNumFilter = (stockNum: string) => {
      return (stockNum && stockNum.split("/")[1]) || 0;
    };

    const getBoxDetail = (box: any) => {
      console.log("getBoxDetail", box);
      const num =
        "(" + box.materialRemainNumber + "/" + box.materialTotalNumber + ")";
      boxDetailVisible.value = true;
      boxId.value = box.id;
      boxCode.value = box.boxCode;
      materialRemainNumber.value = box.materialRemainNumber;
      boxDetailDialogTitle.value = box.boxName + num;
      boxStatus.value = box.status
    };

    const closeBoxDetailDialog = () => {
      boxDetailVisible.value = false;
      initBoxData();
      initBoxCountData();
    };

    // 初始化箱子数据
    const initBoxData = () => {
      findBoxAllData(params.value as any).then((response) => {
        boxColumn.value = response
      });
    };

    // 初始化箱子数量和物资数量
    const initBoxCountData = () => {
      const rackNumber = params.value.rackNumber;
      findBoxCountData(Number(rackNumber)).then((response) => {
        rackCount.value = response;
      });
    };

    const addOutFormRack = () => {
      const rackNumber = params.value.rackNumber;
      addBatchPendingDataRack(rackNumber).then(() => {
        initBoxData()
        message.success('借出成功')
      })
    }

    onMounted(() => {
      params.value.rackNumber = route.params.id as string;
      initBoxData();
      initBoxCountData();
    });

    return () => (
      <section class="h-full flex flex-col">
        <PageHeader class="bg-navy-4 p-16" back>
          {{
            title: () => (
              <>
                <h2 class="text-20 font-medium">
                  {route.params.id ? `${route.params.id}号货架` : "未知货架"}
                </h2>
                <Form
                  columns={formColumn.value}
                  layout="inline"
                  onSearch={handleSearch}
                />
              </>
            ),
            default: () => (
              <Space size={32}>
                <p class="text-white text-opacity-70">
                  箱子在库量：
                  <span class="text-24 text-white">
                    {rackCount.value.boxInStockNum}
                  </span>
                  /{rackCount.value.boxTotalNum}
                </p>
                <p class="text-white text-opacity-70">
                  物资在库量：
                  <span class="text-24 text-white">
                    {rackCount.value.materialInStockNum}
                  </span>
                  /{rackCount.value.materialTotalNum}
                </p>
              </Space>
            ),
            extra: () => <Button type="primary" onClick={addOutFormRack}>整架借出</Button>,
          }}
        </PageHeader>
        <div class={classes["box-content"]}>
          {boxColumn.value.map((columns) => {
            return <Box columns={columns} onClick={getBoxDetail} />;
          })}
        </div>
        <Modal
          v-model={[boxDetailVisible.value, "visible"]}
          title={boxDetailDialogTitle.value}
          status={boxStatus.value}
          size="bold"
          key="box"
          zIndex="1"
        >
          {{
            default: () => (
              <BoxDetailDialog
                id={boxId.value}
                boxCode={boxCode.value}
                materialRemainNumber={materialRemainNumber.value}
                status={1}
                onClose={closeBoxDetailDialog}
              ></BoxDetailDialog>
            ),
            extra: () => (
              <div>
                <MeterialList
                  racknumber={route.params.id}
                  boxcode={boxCode.value}
                ></MeterialList>
              </div>
            ),
          }}
        </Modal>
      </section>
    );
  },
});
