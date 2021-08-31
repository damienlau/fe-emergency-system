// 借还记录
import { defineComponent, h, nextTick, onMounted, ref, watch } from "vue";
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
    // 表格数据
    const tableData = ref([]);
    const tableColumn = ref([]);
    const tableMaintainColumn = ref([
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
      {
        title: "保养人",
        dataIndex: "personnelName",
        key: "personnelName",
      },
      {
        title: "保养人联系方式",
        dataIndex: "personnelPhone",
        key: "personnelPhone",
      },
      {
        title: "状态",
        key: "status",
        dataIndex: "status",
        slots: { customRender: "status" },
      },
      {
        title: "是否出仓库",
        dataIndex: "isOutWarehouseText",
        key: "isOutWarehouseText",
      },
      {
        title: "问题描述",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "保养开始时间",
        dataIndex: "startTime",
        key: "startTime",
      },
      { title: "保养完成时间", dataIndex: "endTime", key: "endTime" },
      {
        title: "操作",
        key: "id",
        slots: {
          customRender: "operation",
        },
      },
    ]);
    const tableEventColumn = ref([
      {
        title: "事件名称",
        key: "eventName",
        width: "15%",
      },
      {
        title: "数量详情",
        key: "numDetail",
        slots: {
          customRender: "numDetail",
        },
      },
      {
        title: "时间",
        key: "eventTime",
        slots: {
          customRender: "eventTime",
        },
      },
    ]);
    const tableDailyColumn = ref([
      {
        title: "箱子/物资名称",
        dataIndex: "goodsName",
        key: "goodsName",
      },
      {
        title: "所属箱子",
        dataIndex: "boxName",
        key: "boxName",
      },
      {
        title: "借贷科室",
        dataIndex: "departmentName",
        key: "departmentName",
      },
      {
        title: "借贷人",
        dataIndex: "personnelName",
        key: "personnelName",
      },
      {
        title: "借贷人联系方式",
        dataIndex: "personnelPhone",
        key: "personnelPhone",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        slots: { customRender: "dailyStatus" },
      },

      {
        title: "归还人",
        dataIndex: "returnMan",
        key: "returnMan",
      },
      {
        title: "归还人联系方式",
        dataIndex: "returnPhone",
        key: "returnPhone",
      },
      {
        dataIndex: "time",
        key: "time",
        slots: { title: "customTitle", customRender: "dailyTime" },
      },
      {
        title: "归还时间",
        dataIndex: "returnTime",
        key: "returnTime",
      },
      {
        title: "操作",
        key: "operation",
        slots: { customRender: "dailyOperation" },
      },
    ]);
    // 展开表格数据
    const maintainExpandTableColumn = ref([
      {
        title: "箱子/物资名称",
        dataIndex: "goodsName",
        key: "goodsName",
      },
      {
        title: "所属箱子",
        dataIndex: "boxName",
        key: "boxName",
      },
      {
        title: "借贷科室",
        dataIndex: "departmentName",
        key: "departmentName",
      },
      {
        title: "借贷人",
        dataIndex: "personnelName",
        key: "personnelName",
      },
      {
        title: "借贷人联系方式",
        dataIndex: "personnelPhone",
        key: "personnelPhone",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        slots: { customRender: "status" },
      },

      {
        title: "归还人",
        dataIndex: "returnMan",
        key: "returnMan",
      },
      {
        title: "归还人联系方式",
        dataIndex: "returnPhone",
        key: "returnPhone",
      },
      {
        dataIndex: "time",
        key: "time",
        slots: { title: "customTitle", customRender: "time" },
      },
      {
        title: "归还时间",
        dataIndex: "returnTime",
        key: "returnTime",
      },
      {
        title: "操作",
        key: "operation",
        slots: { customRender: "operation" },
      },
    ]);
    // table 搜索配置
    const tableSelectObj = ref({});
    const tableSelctColum = ref([]);
    // 菜单列表空状态
    const menuEmpty = ref(false);
    // 菜单当前激活值
    const menuActiveKey = ref(menus.value[0].key); //监听点击标签页菜单事件
    // 监听点击标签页菜单事件
    const handleClickTabPane = (activeKey = menuActiveKey.value) => {
      menuActiveKey.value = activeKey;
      tableSelectObj.value = {}; // 清空搜索框
      setSearchColumn(activeKey);
      if (activeKey === "1" || activeKey === "2") {
        tableColumn.value = tableMaintainColumn.value;
        getMaintainList({});
      } else if (activeKey === "event") {
        tableColumn.value = tableEventColumn.value;
        getEventList({});
      } else if (activeKey === "daily") {
        tableColumn.value = tableDailyColumn.value;
        getDailyList({});
      }
    };
    const getMaintainList = (search) => {
      store
        .dispatch("warehouseModule/recordModule/getMaintainList", {
          activeKey: menuActiveKey.value,
          search,
        })
        .then((response) => {
          tableData.value = response.tableData;
        });
    };
    const getEventList = (search) => {
      store
        .dispatch("warehouseModule/recordModule/getEventList", search)
        .then((response) => {
          tableData.value = response.tableData;
        });
    };
    const getDailyList = (search) => {
      store
        .dispatch("warehouseModule/recordModule/getDailyList", search)
        .then((response) => {
          tableData.value = response.tableData;
        });
    };
    const setSearchColumn = (activeKey) => {
      if (activeKey === "1" || activeKey === "2") {
        tableSelctColum.value = [
          {
            key: "test",
            placeholder: "保养公司/保养人搜索",
          },
          {
            key: "test2",
            placeholder: "物资搜索",
          },
          {
            type: "select",
            key: "test3",
            label: "是否出仓库",
            placeholder: "全部",
            options: [
              {
                label: "是",
                key: true,
              },
              {
                label: "否",
                key: false,
              },
            ],
          },
        ];
      } else if (activeKey === "event") {
        tableSelctColum.value = [
          {
            key: "eventName",
            placeholder: "事件搜索",
          },
          {
            key: "materiaName",
            placeholder: "箱子搜索",
          },
        ];
      } else if (activeKey === "daily") {
        tableSelctColum.value = [
          {
            key: "personnelName",
            placeholder: "人员搜索",
          },
          {
            key: "materialName",
            placeholder: "物资搜索",
          },
          {
            type: "select",
            key: "departmentType",
            label: "借贷科室",
            placeholder: "全部",

            // 1 急救/重症， 2 门诊， 3 后勤， 4 指挥， 5 重症， 6 超声， 7 清创， 8 留观， 9 药房， 10 耗材， 11 手术， 12 防疫/隔离， 13 消毒， 14 住院， 15 检验",
            options: [
              {
                label: "急救/重症",
                key: "1",
              },
              {
                label: "门诊",
                key: "2",
              },
              {
                label: "后勤",
                key: "3",
              },

              {
                label: "指挥",
                key: "4",
              },
              {
                label: "重症",
                key: "5",
              },

              {
                label: "超声",
                key: "6",
              },
              {
                label: "清创",
                key: "7",
              },
              {
                label: "留观",
                key: "8",
              },
              {
                label: "药房",
                key: "9",
              },
              {
                label: "耗材",
                key: "10",
              },
              {
                label: "手术",
                key: "11",
              },
              {
                label: "防疫/隔离",
                key: "12",
              },
              {
                label: "消毒",
                key: "13",
              },
              {
                label: "住院",
                key: "14",
              },
              {
                label: "检验",
                key: "15",
              },
            ],
          },
          {
            type: "select",
            key: "status",
            label: "状态",
            placeholder: "全部",
            options: [
              {
                label: "待借出",
                key: "1",
              },
              {
                label: "已借出",
                key: "2",
              },
              {
                label: "已归还",
                key: "3",
              },
            ],
          },
        ];
      }
    };
    const handleClickFinish = (record) => {
      if (record.status == 2) return false;
      return (
        <a-button
          size="small"
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
    const handleClickCancel = (record) => {
      return (
        <a-button
          ghost
          danger
          onClick={() => {
            changeEventStatus(record);
          }}
        >
          取消出仓
        </a-button>
      );
    };
    const changeEventStatus = (record) => {
      const id = record.id;
      if (!id) return;
      store
        .dispatch("warehouseModule/recordModule/deleteOutDetailData", {
          id: id,
        })
        .then(() => {
          handleClickTabPane();
        });
    };
    const renderStatus = (status) => {
      return (
        <p style={status == 2 ? "color:green" : "color:red"}>
          {status == 2 ? "已完成" : "维修中"}
        </p>
      );
    };
    const rendEventNumDetail = (record) => {
      return (
        <div class="flex flex-row">
          <span class="text-white text-opacity-70 mr-4">总物资:</span>
          <span class="text-white  mr-40">
            {record.numDetail.totalNumber || "0"}
          </span>
          <span class="text-white text-opacity-70 mr-4">未出仓:</span>
          <span class="text-white  mr-40">
            {record.numDetail.notOutNumber || "0"}
          </span>
          <span class="text-white text-opacity-70 mr-4">已归还:</span>
          <span class="text-white  mr-40">
            {record.numDetail.returnNumber || "0"}
          </span>
          <span class="text-white text-opacity-70 mr-4">未归还:</span>
          <span class="text-white  mr-40">
            {record.numDetail.noReturnNumber || "0"}
          </span>
        </div>
      );
    };
    const rendEventTime = (record) => {
      return (
        <div class="flex flex-row items-center justify-end">
          <span class="text-white text-opacity-70 mr-4">开始时间:</span>
          <span class="text-white  mr-40">
            {record.eventTime.startTime || "--"}
          </span>
          <span class="text-white text-opacity-70 mr-4">结束时间:</span>
          <span class="text-white  mr-40">
            {record.eventTime.endTime || "--"}
          </span>
        </div>
      );
    };
    const rendEventExpandTable = (record) => {
      return (
        <a-table
          dataSource={record.eventExpandTableData}
          columns={maintainExpandTableColumn.value}
          pagination={false}
          align={"left"}
          class="text-white"
          rowKey={(record) => record.key}
        >
          {{
            customTitle: () => {
              return (
                <>
                  <span class="text-warning">生成清单时间</span>
                  <span>/出仓时间</span>
                </>
              );
            },
            status: ({ text }) => renderEventExpendStatus(text),
            operation: ({ record }) => handleClickCancel(record),
            time: ({ record }) => rendEventExpendTime(record),
          }}
        </a-table>
      );
    };
    const renderEventExpendStatus = (status) => {
      return (
        <p
          style={
            status == 1
              ? "color:red"
              : status == 2
              ? "color:green"
              : "color:orange"
          }
        >
          {status == 1 ? "已出仓" : status == 2 ? "已归还" : "待出仓"}
        </p>
      );
    };
    const rendEventExpendTime = (record) => {
      return (
        <div class="flex flex-row items-center justify-end">
          <span style={record.status == 3 ? "color:orange" : ""}>
            {record.time}
          </span>
        </div>
      );
    };
    const handSearch = () => {
      const activeKey = menuActiveKey.value;
      const search = tableSelectObj.value;
      if (activeKey === "1" || activeKey === "2") {
        getMaintainList(search);
      } else if (activeKey === "event") {
        getEventList(search);
      } else if (activeKey === "daily") {
        getDailyList(search);
      }
    };
    onMounted(() => {
      handleClickTabPane();
    });

    return () => (
      <>
        <Tabs
          class="dark:bg-navy-4"
          v-model={[menuActiveKey.value, "activeKey"]}
          block
          columns={menus.value}
          empty={menuEmpty.value}
          onClick={handleClickTabPane}
          rowKey={(index) => index}
          size="small"
        >
          <section class="overflow-y-auto">
            <TableSelct
              v-model={[tableSelectObj.value, "model"]}
              columns={tableSelctColum.value}
              onSearch={handSearch}
            ></TableSelct>
            <span>{tableSelectObj.value.test}</span>
            <a-table
              class="text-white"
              rowKey={(record, index) => record.key || record.id || index}
              dataSource={tableData.value}
              columns={tableColumn.value}
              pagination={
                menuActiveKey.value === "event" ||
                menuActiveKey.value === "daily"
                  ? false
                  : true
              }
              showHeader={menuActiveKey.value === "event" ? false : true}
              rowClassName={() => {
                if (menuActiveKey.value === "event")
                  return "dark:bg-navy-1 bg-opacity-70";
              }}
              expandedRowRender={
                menuActiveKey.value === "event"
                  ? ({ record }) => rendEventExpandTable(record)
                  : null
              }
            >
              {{
                status: ({ text }) => renderStatus(text),
                operation: ({ record }) => handleClickFinish(record),
                numDetail: ({ record }) => rendEventNumDetail(record),
                eventTime: ({ record }) => rendEventTime(record),
                customTitle: () => {
                  return (
                    <>
                      <span class="text-warning">生成清单时间</span>
                      <span>/出仓时间</span>
                    </>
                  );
                },
                dailyStatus: ({ text }) => renderEventExpendStatus(text),
                dailyOperation: ({ record }) => handleClickCancel(record),
                dailyTime: ({ record }) => rendEventExpendTime(record),
              }}
            </a-table>
          </section>
        </Tabs>
      </>
    );
  },
});
