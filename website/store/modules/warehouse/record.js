import moment from "moment";
import {
  findMaintenanceData,
  updateSpecifiedMaintenanceData,
  findEventData,
  findEventExpandData,
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
const eventExpandColumns = [
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
    dataIndex: "dapartmentType",
    key: "dapartmentType",
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
          eventTableData.push({
            eventName: item.eventName,
            numDetail: item,
            eventTime: {
              startTime: item.startTime,
              endTime: item.endTime,
            },
            id: item.id,
          });
        });
        reslove({
          tableData: eventTableData,
          tableColumn: eventColumns,
        });
      });
    });
  },
  // 获取事件展开列表
  getEventExpandList: ({ dispatch }, id) => {
    return new Promise((reslove) => {
      const eventExpandTableData = [];
      findEventExpandData({ eventId: id }).then((res) => {
        // console.log(res, "reserserse");
        res.data.map((item) => {
          item.outDetailSet.map((val) => {
            // eventExpandTableData.push({
            //   boxName: "ccccccccc",
            //   // goodsName:
            //   //   val.resourceType == 1
            //   //     ? val.materialInfo.materialName
            //   //     : val.materialInfo.boxName,
            //   // boxName: val.materialInfo.boxName,
            // });
          });
        });
        reslove({
          tableData: eventExpandTableData,
          tableColumn: eventExpandColumns,
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
        // reslove(res.data);
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
