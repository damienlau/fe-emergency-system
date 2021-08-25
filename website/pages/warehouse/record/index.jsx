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
    let dataSource = [
      {
        key: 1,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        description:
          "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
      },
      {
        key: 2,
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        description:
          "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
      },
      {
        key: 3,
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        description:
          "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
      },
    ];
    let columns = [
      { title: "Name", dataIndex: "name", key: "name", width: 400 },
      {
        title: "",
        dataIndex: "",
        key: "num",
        slots: { customRender: "num" },
      },
      {
        title: "",
        dataIndex: "",
        key: "time",
        slots: { customRender: "time" },
      },
    ];

    const expandDataSource = [
      {
        key: 1,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        description:
          "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
      },
      {
        key: 2,
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        description:
          "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
      },
      {
        key: 3,
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        description:
          "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
      },
    ];

    const expandColumns = [
      { title: "Name", dataIndex: "name", key: "name", width: 400 },
      {
        title: "",
        dataIndex: "",
        key: "num",
        slots: { customRender: "num" },
      },
      {
        title: "",
        dataIndex: "",
        key: "time",
        slots: { customRender: "time" },
      },
    ];
    // 菜单列表空状态
    const menuEmpty = ref(false);
    // 是否显示表头
    const showHeader = false;
    // 菜单当前激活值
    const menuActiveKey = ref(menus.value[0].key); // 监听点击标签页菜单事件

    // 监听点击标签页菜单事件
    const handleClickTabPane = (activeKey = menuActiveKey.value) => {
      console.log(activeKey, "activeKey");
      menuActiveKey.value = activeKey; //请求接口
      switch (activeKey) {
        case "1":
          break;
        case "2":
          break;
        case "3":
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
    const initMaintainTable = (res) => {
      console.log(res);
      columns = [
        { title: "Name", dataIndex: "name", key: "name", width: 400 },
        {
          title: "",
          dataIndex: "",
          key: "num",
          slots: { customRender: "num" },
        },
        {
          title: "",
          dataIndex: "",
          key: "time",
          slots: { customRender: "time" },
        },
      ];
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
            {/* 内容 */}
            {/* <Table dataSource={dataSource} columns={columns}>
              {{
                name: () => (
                  <div class="flex flex-row">
                    <span class="text-white text-opacity-70">箱子编码</span>
                  </div>
                ),
              }}
            </Table> */}
            <a-table
              dataSource={dataSource}
              columns={columns}
              showHeader={showHeader}
              class="text-white"
            >
              {{
                num: () => (
                  <div class="flex flex-row">
                    <span class="text-white text-opacity-70">总物资:</span>
                    <span class="text-white text-opacity-70 mr-8">999</span>
                    <span class="text-white text-opacity-70">未出库:</span>
                    <span class="text-white text-opacity-70 mr-8">99999</span>
                    <span class="text-white text-opacity-70">已归还:</span>
                    <span class="text-white text-opacity-70 mr-8">9999</span>
                  </div>
                ),
                time: () => (
                  <div class="flex flex-row">
                    <span class="text-white text-opacity-70">开始时间:</span>
                    <span class="text-white text-opacity-70 mr-8">--</span>
                    <span class="text-white text-opacity-70">结束时间:</span>
                    <span class="text-white text-opacity-70 mr-8">--</span>
                  </div>
                ),
                expandedRowRender: () =>
                  expandDataSource.length && (
                    <a-table
                      dataSource={expandDataSource}
                      columns={expandColumns}
                      pagination={false}
                    ></a-table>
                  ),
              }}
            </a-table>
          </section>
        </Tabs>
      </>
    );
  },
});
