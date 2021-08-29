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
    dataIndex: "dapartmentName",
    key: "dapartmentName",
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
const actions = {
  // 获取维修/保养记录列表
  getMaintainList: (context, key) => {
    return new Promise((reslove) => {
      const maintainTableData = [];
      findMaintenanceData({ operationType: key }).then((res) => {
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
            });
          });
        });
        reslove({ tableData: maintainTableData, tableColumn: maintainColumns });
      });
    });
  },
  // 获取事件列表
  getEventList: ({ dispatch }) => {
    return new Promise((reslove) => {
      const eventTableData = [];
      findEventData().then((res) => {
        res.data.map((item) => {
          findEventExpandData({ eventId: item.id }).then((res) => {
            const eventExpandTableData = [];
            res.data.map((item) => {
              if (item.outDetailSet.length > 0) {
                item.outDetailSet.map((val) => {
                  eventExpandTableData.push({
                    goodsName:
                      val.resourceType == 1
                        ? (val.materialInfo && val.materialInfo.materialName) ||
                          "--"
                        : (val.materialInfo && val.materialInfo.boxName) ||
                          "--",
                    boxName: val.materialInfo && val.materialInfo.boxName,
                    departmentName: "后台没提供",
                    personnelName: item.personnelName,
                    personnelPhone: item.personnelPhone,
                    status: item.status,
                    returnMan: val.returnMan || "--",
                    returnPhone: val.returnPhone || "--",
                    returnTime: val.returnTime || "--",
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
      });
    });
  },

  // 获取日常列表
  getDailyList: () => {
    return new Promise((reslove) => {
      findDailyData().then((res) => {
        const dailyTableData = [];
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
                departmentName: "后台没提供",
                personnelName: item.personnelName,
                personnelPhone: item.personnelPhone,
                status: item.status,
                returnMan: val.returnMan || "--",
                returnPhone: val.returnPhone || "--",
                returnTime: val.returnTime || "--",
              });
            });
          }
        });
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
