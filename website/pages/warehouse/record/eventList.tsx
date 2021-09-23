// 借还记录 -事件记录
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { TableSelct } from "components";
import { Icon } from "components";
export default defineComponent({
  emits: ["handDetail"],
  setup(props, { emit, slots }) {
    const store = useStore();
    // 表格数据
    const tableData = ref([]);
    const tableColumn = ref([
      {
        title: "事件名称",
        key: "eventName",
        width: "15%",
        slots: {
          customRender: "eventName",
        },
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
    // 展开表格数据
    const maintainExpandTableColumn = ref([
      {
        title: "箱子/物资名称",
        dataIndex: "goodsName",
        key: "goodsName",
        width: 140,
        slots: { customRender: "renderDetail" },
      },
      {
        title: "所属箱子",
        dataIndex: "boxName",
        key: "boxName",
      },
      {
        title: "借货科室",
        dataIndex: "departmentName",
        key: "departmentName",
      },
      {
        title: "借货人",
        dataIndex: "personnelName",
        key: "personnelName",
      },
      {
        title: "借货人联系方式",
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
        dataIndex: "outTime",
        key: "outTime",
        width: "180px",
        slots: { title: "customTitle", customRender: "outTime" },
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
    const tableSelctColum = ref([
      {
        key: "eventName",
        placeholder: "事件搜索",
      },
      {
        key: "materiaName",
        placeholder: "箱子搜索",
      },
    ]);
    const getEventList = (search) => {
      store
        .dispatch("warehouseModule/recordModule/getEventList", search)
        .then((response) => {
          tableData.value = response.tableData;
        });
    };

    const handleClickCancel = (record) => {
      if (record.status != 1) return;
      return (
        <a-popconfirm
          title={"确认取消出仓？"}
          okText="确认"
          cancelText="取消"
          onConfirm={() => {
            deleteOutDetailData(record);
          }}
        >
          <a-button ghost danger size="small">
            取消出仓
          </a-button>
        </a-popconfirm>
      );
    };
    const deleteOutDetailData = (record) => {
      const id = record.id;
      store
        .dispatch("warehouseModule/recordModule/deleteOutDetailData", {
          id: id,
        })
        .then(() => {
          handSearch();
        });
    };
    const rendEventNumDetail = (record) => {
      return (
        <div class="flex flex-row">
          <span class="text-white text-opacity-70 mr-4">总物资:</span>
          <span class="text-white  mr-40">
            {(record.numDetail && record.numDetail.totalNumber) || "0"}
          </span>
          <span class="text-white text-opacity-70 mr-4">未出仓:</span>
          <span class="text-white  mr-40">
            {(record.numDetail && record.numDetail.notOutNumber) || "0"}
          </span>
          <span class="text-white text-opacity-70 mr-4">已归还:</span>
          <span class="text-white  mr-40">
            {(record.numDetail && record.numDetail.returnNumber) || "0"}
          </span>
          <span class="text-white text-opacity-70 mr-4">未归还:</span>
          <span class="text-white  mr-40">
            {(record.numDetail && record.numDetail.noReturnNumber) || "0"}
          </span>
        </div>
      );
    };
    const rendEventName = (record) => {
      return <div>{record.eventName}</div>;
    };
    const rendEventTime = (record) => {
      return (
        <div class="flex flex-row items-center justify-end">
          <span class="text-white text-opacity-70 mr-4">开始时间:</span>
          <span class="text-white  mr-40">
            {(record.eventTime && record.eventTime.startTime) || "--"}
          </span>
          <span class="text-white text-opacity-70 mr-4">结束时间:</span>
          <span class="text-white  mr-40">
            {(record.eventTime && record.eventTime.endTime) || "--"}
          </span>
        </div>
      );
    };
    const rendEventExpandTable = (record) => {
      return (
        <a-table
          class="eventRenderList"
          dataSource={record.eventExpandTableData}
          columns={maintainExpandTableColumn.value}
          pagination={false}
          align={"left"}
          size="small"
          scroll={{ y: 500 }}
          rowKey={(record) => record.key}
        >
          {{
            renderDetail: ({ record }) => rendOpenDetail(record),
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
            outTime: ({ record }) => rendEventExpendTime(record),
          }}
        </a-table>
      );
    };
    const renderEventExpendStatus = (status) => {
      return (
        <p
          style={
            status == 1
              ? "color:orange"
              : status == 2
              ? "color:red"
              : status == 4
              ? "color:grey"
              : "color:green"
          }
        >
          {status == 1
            ? "待出仓"
            : status == 2
            ? "已出仓"
            : status == 3
            ? "已归还"
            : status == 4
            ? "已撤销"
            : "--"}
        </p>
      );
    };
    const rendEventExpendTime = (record) => {
      return (
        <div class="flex flex-row items-center justify-end">
          <span style={record.status == 1 ? "color:orange" : ""}>
            {record.outTime}
          </span>
        </div>
      );
    };
    const rendOpenDetail = (record) => {
      console.log(record, "record");
      return (
        <div class="flex flex-row items-center justify-start">
          <a-button
            type="link"
            onClick={() => {
              emit("handDetail", record);
            }}
          >
            {record.goodsName.resourceType == 1
              ? (record.goodsName.materialInfo &&
                  record.goodsName.materialInfo.materialName) ||
                "--"
              : (record.goodsName.warehouseBoxInfo &&
                  record.goodsName.warehouseBoxInfo.boxName) ||
                "--"}
          </a-button>
        </div>
      );
    };
    const handSearch = () => {
      const search = tableSelectObj.value;
      getEventList(search);
    };
    const expandIcon = (props) => {
      if (props.expanded) {
        //有数据-展开时候图标
        return (
          <a
            style="color: 'black',margin-right:0px"
            onClick={(e) => {
              props.onExpand(props.record, e);
            }}
          >
            <Icon class="align-baseline" type={"arrow-down"} />{" "}
          </a>
        );
      } else {
        //有数据-未展开时候图标
        return (
          <a
            style="color: 'black' ,margin-right:0px"
            onClick={(e) => {
              props.onExpand(props.record, e);
            }}
          >
            <Icon class="align-baseline" type={"arrow-right-bold"} />
          </a>
        );
      }
    };
    onMounted(() => {
      getEventList({});
    });
    return () => (
      <>
        <TableSelct
          v-model={[tableSelectObj.value, "model"]}
          columns={tableSelctColum.value}
          onSearch={handSearch}
        ></TableSelct>
        <a-table
          class="eventList"
          dataSource={tableData.value}
          columns={tableColumn.value}
          pagination={false}
          expandIcon={expandIcon}
          showHeader={false}
          rowClassName={() => {
            return "dark:bg-navy-1 bg-opacity-70";
          }}
          expandedRowRender={({ record }) => rendEventExpandTable(record)}
        >
          {{
            eventName: ({ record }) => rendEventName(record),
            eventTime: ({ record }) => rendEventTime(record),
            numDetail: ({ record }) => rendEventNumDetail(record),
          }}
        </a-table>
      </>
    );
  },
});
