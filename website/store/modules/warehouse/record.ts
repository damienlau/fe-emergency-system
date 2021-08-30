import moment from "moment";
import {
  findMaintenanceData,
  updateSpecifiedMaintenanceData,
  findEventData,
  findEventExpandData,
  findDailyData,
} from "website/api/warehouse/record";
const state = () => ({});
const maintainColumns = [
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
];
const options = [
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
];
const eventColumns = [
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
];
const dailyColumns = [
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
];
const getters = {};
const getDepartmentName = (type) => {
  let getDepartmentName;
  options.map((item) => {
    if (item.key == type) {
      getDepartmentName = item.label;
    }
  });
  return getDepartmentName;
};
const actions = {
  // 获取维修/保养记录列表
  getMaintainList: (context, { activeKey, search }) => {
    return new Promise((reslove) => {
      findMaintenanceData({ operationType: activeKey, ...search }).then(
        (res) => {
          const maintainTableData = [];
          if (res && res.data && res.data.content.length > 0) {
            res.data.content.map((item) => {
              item.detailList.map((val) => {
                maintainTableData.push({
                  materialName: val.materialInfo.materialName,
                  boxName: val.materialInfo.boxName,
                  personnelCompany: item.personnelCompany,
                  personnelName: item.personnelName,
                  personnelPhone: item.personnelPhone,
                  status: val.status,
                  isOutWarehouseText: item.isOutWarehouse ? "出库" : "在库",
                  description: item.description,
                  startTime: val.startTime,
                  endTime: val.endTime,
                  id: val.id,
                  returnTime: val.returnTime || "--",
                  time: val.outTime || "--",
                });
              });
            });
          }
          reslove({
            tableData: maintainTableData,
            tableColumn: maintainColumns,
          });
        }
      );
    });
  },
  // 获取事件列表
  getEventList: ({ dispatch }, search) => {
    return new Promise((reslove) => {
      findEventData().then((res) => {
        const eventTableData = [];
        if (res && res.data.length > 0) {
          res.data.map((item) => {
            findEventExpandData({ eventId: item.id, ...search }).then((res) => {
              const eventExpandTableData = [];
              res.data.map((item) => {
                if (item.outDetailSet.length > 0) {
                  item.outDetailSet.map((val) => {
                    eventExpandTableData.push({
                      goodsName:
                        val.resourceType == 1
                          ? (val.materialInfo &&
                              val.materialInfo.materialName) ||
                            "--"
                          : (val.materialInfo && val.materialInfo.boxName) ||
                            "--",
                      boxName: val.materialInfo && val.materialInfo.boxName,
                      departmentName: getDepartmentName(item.departmentType),
                      personnelName: item.personnelName,
                      personnelPhone: item.personnelPhone,
                      status: item.status,
                      returnMan: val.returnMan || "--",
                      returnPhone: val.returnPhone || "--",
                      returnTime: val.returnTime || "--",
                      time: val.outTime || "--",
                    });
                  });
                }
              });
              eventTableData.push({
                eventName: item.eventName || "--",
                numDetail: item,
                eventTime: {
                  startTime: item.startTime,
                  endTime: item.endTime,
                },
                id: item.id,
                eventExpandTableData: eventExpandTableData,
              });
              reslove({
                tableData: eventTableData,
                tableColumn: eventColumns,
              });
            });
          });
        }
      });
    });
  },

  // 获取日常列表
  getDailyList: ({ dispatch }, search) => {
    return new Promise((reslove, reject) => {
      findDailyData({ ...search }).then((res) => {
        const dailyTableData = [];
        if (res && res.data.length > 0) {
          res.data.map((item) => {
            if (item.outDetailSet.length > 0) {
              item.outDetailSet.map((val) => {
                dailyTableData.push({
                  goodsName:
                    val.resourceType == 1
                      ? (val.materialInfo && val.materialInfo.materialName) ||
                        "--"
                      : (val.materialInfo && val.materialInfo.boxName) || "--",
                  boxName: val.materialInfo && val.materialInfo.boxName,
                  departmentName: getDepartmentName(item.departmentType),
                  personnelName: item.personnelName,
                  personnelPhone: item.personnelPhone,
                  status: item.status,
                  returnMan: val.returnMan || "--",
                  returnPhone: val.returnPhone || "--",
                  returnTime: val.outTime || "--",
                });
              });
            }
          });
        }
        reslove({
          tableData: dailyTableData,
          tableColumn: dailyColumns,
        });
      });
    });
  },
  // 保养记录-点击保养完成
  changeMaintainStatus: ({ dispatch }, data) => {
    return new Promise((reslove) => {
      const params = {
        operationType: data.key,
        id: data.id,
        status: 2,
        endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      updateSpecifiedMaintenanceData(params).then((res) => {
        reslove(res.data);
      });
    });
  },
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
