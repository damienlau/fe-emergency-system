// 借还记录
import { defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { Tabs, TableSelct } from "website/components";

export default defineComponent({
  setup() {
    const store = useStore();
    // 菜单配置项
    const menus = ref([
      {
        label: "事件记录",
        key: "event",
      },
      {
        label: "日常记录",
        key: "daily",
      },
      {
        label: "维修记录",
        key: "1",
      },
      {
        label: "保养记录",
        key: "2",
      },
    ]);
    const tableData = ref([]);
    const tableColumn = ref([]);
    // table 搜索配置
    const tableSelectObj = ref({});
    const tableSelctColum = ref([
      {
        type: "input",
        key: "test",
        label: "测试",
        placeholder: "侧是是是",
      },
      {
        type: "input",
        key: "test2",
        label: "测试2",
        placeholder: "侧是是是",
      },
      {
        type: "select",
        key: "test3",
        label: "测试3",
        placeholder: "全部",
        options: [
          {
            label: "dddddd",
            key: "1",
          },
          {
            label: "dddddd",
            key: "2",
          },
        ],
      },
    ]);
    // 菜单列表空状态
    const menuEmpty = ref(false);
    // 菜单当前激活值
    const menuActiveKey = ref(menus.value[0].key); //监听点击标签页菜单事件

    // 监听点击标签页菜单事件
    const handleClickTabPane = (activeKey = menuActiveKey.value) => {
      menuActiveKey.value = activeKey; // 请求接口
      if (activeKey === "1" || activeKey === "2") {
        store
          .dispatch("warehouseModule/recordModule/getMaintainList", activeKey)
          .then((response) => {
            tableData.value = response.tableData;
            tableColumn.value = response.tableColumn;
          });
      } else {
        tableData.value = [];
        tableColumn.value = [];
      }
    };
    const handleClickFinish = (record) => {
      if (record.status === 2) return false;
      return (
        <a-button
          ghost
          onClick={() => {
            changeMaintainStatus(record);
          }}
        >
          {menuActiveKey.value === "1" ? "维修完成" : "保养完成"}
        </a-button>
      );
    };
    const changeMaintainStatus = (record) => {
      const id = record.id;
      if (!id) return;
      store
        .dispatch("warehouseModule/recordModule/changeMaintainStatus", {
          id: id,
          key: menuActiveKey.value,
        })
        .then(() => {
          handleClickTabPane();
        });
    };

    watch(
      () => {
        return tableSelectObj.value;
      },
      ({ data }) => {
        console.log(data, "data");
      }
    );
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
            <TableSelct
              v-model={[tableSelectObj.value, "select"]}
              columns={tableSelctColum.value}
            ></TableSelct>
            <span>{tableSelectObj.value}</span>
            <a-table
              dataSource={tableData.value}
              columns={tableColumn.value}
              showHeader={menuActiveKey.value === "event" ? false : true}
              class="text-white"
            >
              {{
                status: ({ record }) => (
                  <span class="text-white">{record}</span>
                ),
                operation: ({ record }) => handleClickFinish(record),
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
