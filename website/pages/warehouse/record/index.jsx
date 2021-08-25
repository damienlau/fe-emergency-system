// 借还记录
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { Tabs } from "website/components";

export default defineComponent({
  setup() {
    const store = useStore();
    // 菜单配置项
    const menus = ref([
      {
        label: "事件记录",
        count: computed(
          () => store.state.warehouseModule.recordModule.totals.eventCount
        ),
        key: "1",
      },
      {
        label: "日常记录",
        count: computed(
          () => store.state.warehouseModule.recordModule.totals.dailyCount
        ),
        key: "2",
      },
      {
        label: "维修记录",
        count: computed(
          () => store.state.warehouseModule.recordModule.totals.repairCount
        ),
        key: "3",
      },
      {
        label: "保养记录",
        count: computed(
          () => store.state.warehouseModule.recordModule.totals.maintainCount
        ),
        key: "4",
      },
    ]);
    let dataSource = [];
    let columns = [];

    const expandDataSource = [];

    const expandColumns = [];
    // 菜单列表空状态
    const menuEmpty = ref(false);
    // 是否显示表头
    let showHeader = true;
    // 菜单当前激活值
    const menuActiveKey = ref(menus.value[0].key); // 监听点击标签页菜单事件

    // 监听点击标签页菜单事件
    const handleClickTabPane = (activeKey = menuActiveKey.value) => {
      console.log(activeKey, "activeKey");
      menuActiveKey.value = activeKey; //请求接口
      switch (activeKey) {
        case "1":
          // initEventTable();
          break;
        case "2":
          // initDailyTable();
          break;
        case "3":
          // initRepairTable();
          break;
        case "4":
          store
            .dispatch("warehouseModule/recordModule/getMaintainList", activeKey)
            .then((res) => {
              console.log(res, "res");
              initMaintainTable(res);
            });
          break;
      }
    };
    // 渲染事件列表
    const initEventTable = () => {
      showHeader = false;
      columns = [];
      dataSource = [];
    };
    // 渲染日常列表
    const initDailyTable = () => {
      showHeader = true;
      columns = [];
      dataSource = [];
    };
    // 渲染维修列表
    const initRepairTable = () => {
      showHeader = true;
      columns = [];
      dataSource = [];
    };
    // 渲染保养列表
    const initMaintainTable = (res) => {
      showHeader = true;
      columns = [
        {
          title: "物资名称",
          dataIndex: "materialName",
          key: "materialName",
        },
        { title: "所属箱子", dataIndex: "boxName", key: "boxName" },
        {
          title: "保养公司",
          dataIndex: "personnelCompany",
          key: "personnelCompany",
        },
        { title: "保养人", dataIndex: "personnelName", key: "personnelName" },
        {
          title: "保养人联系方式",
          dataIndex: "personnelPhone",
          key: "personnelPhone",
        },
        { title: "状态", dataIndex: "status", key: "status" },
        { title: "是否出仓库", dataIndex: "test", key: "test" },
        { title: "问题描述", dataIndex: "description", key: "description" },
        { title: "保养开始时间", dataIndex: "startTime", key: "startTime" },
        { title: "保养完成时间", dataIndex: "endTime", key: "endTime" },
        {
          title: "操作",
          key: "operation",
          slots: {
            customRender: "operation",
          },
        },
      ];
      console.log(res, "reser");
      dataSource = [];
      res.content.map((item) => {
        console.log(item, "item");
        item.detailList.map((val) => {
          dataSource.push({
            materialName: val.materialInfo.materialName,
            boxName: val.materialInfo.boxName,
            personnelCompany: item.personnelCompany,
            personnelName: item.personnelName,
            personnelPhone: item.personnelPhone,
            description: item.description,
            startTime: val.startTime,
            endTime: val.endTime,
          });
        });
      });

      console.log(dataSource, "dataSource");
    };

    // 点击保养完成
    const handleClickFinish = (id) => {
      console.log(id, "id");
      if (!id) return;
      store
        .dispatch("warehouseModule/recordModule/changeMaintainStatus", id)
        .then(() => {
          handleClickTabPane();
        });
    };
    onMounted(() => {
      handleClickTabPane();
    });

    return () => (
      <>
        <Tabs
          v-model={[menuActiveKey.value, "activeKey"]}
          block
          columns={menus.value}
          empty={menuEmpty.value}
          onTabClick={handleClickTabPane}
        >
          <section class="overflow-y-auto">
            <a-table
              dataSource={dataSource}
              columns={columns}
              showHeader={showHeader}
              class="text-white"
            >
              {{
                operation: ({ record }) => (
                  <a-button ghost onClick={handleClickFinish(record.id)}>
                    保养完成
                  </a-button>
                ),
                // time: () => (
                //   <div class="flex flex-row">
                //     <span class="text-white text-opacity-70">开始时间:</span>
                //     <span class="text-white text-opacity-70 mr-8">--</span>
                //     <span class="text-white text-opacity-70">结束时间:</span>
                //     <span class="text-white text-opacity-70 mr-8">--</span>
                //   </div>
                // ),
                // expandedRowRender: () =>
                //   expandDataSource.length && (
                //     <a-table
                //       dataSource={expandDataSource}
                //       columns={expandColumns}
                //       pagination={false}
                //     ></a-table>
                //   ),
              }}
            </a-table>
          </section>
        </Tabs>
      </>
    );
  },
});
