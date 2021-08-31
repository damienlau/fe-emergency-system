import moment from "moment";
import {
  findMaintenanceData,
  updateSpecifiedMaintenanceData,
  findEventData,
  findEventExpandData,
  findDailyData,
} from "website/api/warehouse/record";
const state = () => ({});
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
