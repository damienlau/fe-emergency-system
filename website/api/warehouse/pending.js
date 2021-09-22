// 出仓列表

import request from "utils/request";

const shortcutRequestUrls = {
  find: "/outForm/all",
  finddetail:"/outDetail/all",
  save: "/outDetail/confirm/out",
  savereturn: "/outDetail/confirm/return",
  sweepopen: "/scan/open",
  sweepreader: "/scan/reader",
  sweepclose: "/scan/close",
  allBoxinfo: "/box/info/all",
  material: "/material/info/all",
  infoall: "/event/info/all",
  findoutform: "/outDetail/add",
  saveemergency: "/outDetail/confirm/emergency"
};

// 出仓待出仓列表
export const findSpecifiedShortcutData = (params) => {
  return request.get(shortcutRequestUrls.find, { params }).then((response) => {
    return response;
  });
};

// 出仓待出仓列表明细
export const findDetailSpecifiedShortcutData = (params) => {
  return request.get(shortcutRequestUrls.finddetail,{params} ).then((response) => {
    return response;
  });
};

// 出仓确认出仓
export const saveSpecifiedShortcutData = (params) => {
  return request.post(shortcutRequestUrls.save,params ).then((response) => {
    return response;
  });
};

// 归仓确认出仓
export const returnSpecifiedShortcutData = (params) => {
  return request.post(shortcutRequestUrls.savereturn,params ).then((response) => {
    return response;
  });
};

//紧急扫描出仓
export const savetheEmergency = (params) => {
  return request.post(shortcutRequestUrls.saveemergency,params ).then((response) => {
    return response;
  });
}

//扫描门开启
export const sweepGateOpen = (params) => {
  return request.get(shortcutRequestUrls.sweepopen, params).then((response) => {
    return response;
  })
}

//扫描门读取
export const sweepGateReader = (params) => {
  return request.get(shortcutRequestUrls.sweepreader, params).then((response) => {
    return response;
  })
}

//扫描门关闭
export const sweepGateClose = (params) => {
  return request.get(shortcutRequestUrls.sweepclose, params).then((response) => {
    return response;
  })
}

//全部仓库箱子
export const allBoxinfoPending = (params) => {
  return request.get(shortcutRequestUrls.allBoxinfo, {params}).then((response) => {
    return response;
  })
}


//全部仓库物资
export const allmaterialPending = (params) => {
  return request.get(shortcutRequestUrls.material, {params}).then((response) => {
    return response;
  })
}

//出归仓扫描工号信息
export const scannerInfoall = (params) => {
  return request.get(shortcutRequestUrls.infoall, params).then((response) => {
    return response;
  })
}

//待出仓仓库物资或箱子获取父级ID
export const findoutformId = (params) => {
  return request.post(shortcutRequestUrls.findoutform,params).then((response) => {
    return response;
  })
}