// 借还记录 -日常记录
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { TableSelct } from "website/components";
import config from "config/config";

export default defineComponent({
  setup() {
    const store = useStore();

    // 表格数据
    const tableData = ref([]);
    const tableColumn = ref([
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
        dataIndex: "outTime",
        key: "outTime",
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

    // table 搜索配置
    const tableSelectObj = ref({});
    const tableSelctColum = ref([
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
        options: config.departmentOptions,
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
    ]);
    const getDailyList = (search) => {
      store
        .dispatch("warehouseModule/recordModule/getDailyList", search)
        .then((response) => {
          tableData.value = response.tableData;
        });
    };
    const handleClickCancel = (record) => {
      if (record.status != 1) return;
      return (
        <a-button
          ghost
          danger
          size="small"
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
      store
        .dispatch("warehouseModule/recordModule/deleteOutDetailData", {
          id: id,
        })
        .then(() => {
          handSearch();
        });
    };
    const renderDailyStatus = (status) => {
      return (
        <p
          style={
            status == 1
              ? "color:orange"
              : status == 2
              ? "color:red"
              : "color:green"
          }
        >
          {status == 1
            ? "待出仓"
            : status == 2
            ? "已出仓"
            : status == 3
            ? "已归还"
            : "--"}
        </p>
      );
    };
    const rendDailyTime = (record) => {
      return (
        <div class="flex flex-row items-center justify-end">
          <span style={record.status == 1 ? "color:orange" : ""}>
            {record.outTime}
          </span>
        </div>
      );
    };
    const handSearch = () => {
      const search = tableSelectObj.value;
      getDailyList(search);
    };
    onMounted(() => {
      getDailyList({});
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
          scroll={{ y: 600 }}
          pagination={false}
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
            dailyStatus: ({ text }) => renderDailyStatus(text),
            dailyOperation: ({ record }) => handleClickCancel(record),
            dailyTime: ({ record }) => rendDailyTime(record),
          }}
        </a-table>
      </>
    );
  },
});
