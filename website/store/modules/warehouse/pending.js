import {
  findSpecifiedShortcutData,
  saveSpecifiedShortcutData,
  findDetailSpecifiedShortcutData,
  returnSpecifiedShortcutData,
  sweepGateOpen,
  sweepGateReader,
  sweepGateClose,
  allBoxinfoPending,
  allmaterialPending,
  scannerInfoall
} from "api/warehouse/pending";

const state = () => ({});
const getters = {};
const actions = {
  // 待出仓物资数据
  findSpecifiedShortcutList: ({ dispatch },params) => {
    return new Promise((reslove) => {
      findSpecifiedShortcutData(params).then((res) => {
        reslove(res.data);
      });
    });
  },

  // 待出仓物资数据明细
  findDetailSpecifiedShortcutList: ({ dispatch },params) => {
    return new Promise((reslove) => {
      findDetailSpecifiedShortcutData(params).then((res) => {
        reslove(res.data);
      });
    });
  },
  //待出仓物资确认
  saveSpecifiedShortcutSure: ({ dispatch }, params) => {
    return new Promise((reslove) => {
      saveSpecifiedShortcutData(params).then((res) => {
        reslove(res.data);
      })
    })
  },

  
  //归仓物资确认
  returnSpecifiedShortcutList: ({ dispatch }, params) => {
    return new Promise((reslove) => {
      returnSpecifiedShortcutData(params).then((res) => {
        reslove(res.data);
      })
    })
  },

  //扫描门开启
  sweepGateOpenData: ({ dispatch }, params) => {
    return new Promise((reslove) => {
      sweepGateOpen(params).then((res) => {
        reslove(res.data);
      })
    })
  },
  
  //扫描门读取
  sweepGateReaderData: ({ dispatch }, params) => {
    return new Promise((reslove) => {
      sweepGateReader(params).then((res) => {
        reslove(res.data);
      })
    })
  },

  //扫描门关闭
  sweepGateCloseData: ({ dispatch }, params) => {
    return new Promise((reslove) => {
      sweepGateClose(params).then((res) => {
        reslove(res.data);
      })
    })
  },

  //全部仓库箱子
  allBoxinfoPendingData: ({ dispatch }, params) => {
    return new Promise((reslove) => {
      allBoxinfoPending(params).then((res) => {
        reslove(res.data);
      })
    })
  },

  //全部仓库物资
  allmaterialPendingData: ({ dispatch }, params) => {
    return new Promise((reslove) => {
      allmaterialPending(params).then((res) => {
        reslove(res.data);
      })
    })
  },

  //全部仓库物资
  scannerInfoallData: ({ dispatch }, params) => {
    return new Promise((reslove) => {
      scannerInfoall(params).then((res) => {
        reslove(res.data);
      })
    })
  }
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
