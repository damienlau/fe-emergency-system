// 借还记录
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { Tabs } from "website/components";

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
    // 点击保养完成
    const handleClickFinish = (record) => {
      const id = record.id;
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
              dataSource={tableData.value}
              columns={tableColumn.value}
              showHeader={menuActiveKey.value === "event" ? false : true}
              class="text-white"
            >
              {{
                status: ({ status }) => (
                  <span class="text-white">{status}</span>
                ),
                operation: ({ record }) => (
                  <a-button
                    ghost
                    onClick={() => {
                      handleClickFinish(record);
                    }}
                  >
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
