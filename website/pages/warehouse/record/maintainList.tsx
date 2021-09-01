// 借还记录 - 维修/保养记录
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { TableSelct } from "website/components";

export default defineComponent({
  props: {
    menuActiveKey: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    // 表格数据
    const tableData = ref([]);
    const tableColumn = ref([
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

    // table 搜索配置
    const tableSelectObj = ref({});
    const tableSelctColum = ref([
      {
        key: "personnelName",
        placeholder: "保养公司/保养人搜索",
      },
      {
        key: "materialName",
        placeholder: "物资搜索",
      },
      {
        type: "select",
        key: "isOutWarehouse",
        label: "是否出仓库",
        placeholder: "全部",
        options: [
          {
            label: "是",
            key: "1",
          },
          {
            label: "否",
            key: "0",
          },
        ],
      },
    ]);

    const getMaintainList = (search) => {
      store
        .dispatch("warehouseModule/recordModule/getMaintainList", {
          activeKey: props.menuActiveKey,
          search,
        })
        .then((response) => {
          tableData.value = response.tableData;
        });
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
          {props.menuActiveKey === "1" ? "维修完成" : "保养完成"}
        </a-button>
      );
    };
    const changeMaintainStatus = (record) => {
      const id = record.id;
      if (!id) return;
      store
        .dispatch("warehouseModule/recordModule/changeMaintainStatus", {
          id: id,
          key: props.menuActiveKey,
        })
        .then(() => {
          handSearch();
        });
    };
    const renderStatus = (status) => {
      return (
        <p style={status == 2 ? "color:green" : "color:red"}>
          {status == 2 ? "已完成" : "维修中"}
        </p>
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
      getMaintainList({});
    });

    return () => (
      <>
        <TableSelct
          v-model={[tableSelectObj.value, "model"]}
          columns={tableSelctColum.value}
          onSearch={handSearch}
        ></TableSelct>
        <a-table
          class="text-white"
          dataSource={tableData.value}
          columns={tableColumn.value}
          pagination={true}
        >
          {{
            status: ({ text }) => renderStatus(text),
            operation: ({ record }) => handleClickFinish(record),
          }}
        </a-table>
      </>
    );
  },
});
