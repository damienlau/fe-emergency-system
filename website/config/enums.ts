export enum materialType {
  goods = 1,
  box,
}

export enum boxSize {
  "一箱一桌" = 1,
  "一箱两柜",
  "一箱一柜",
  "其它箱子",
}

export enum boxStatus {
  in = 1,
  out = 2,
  pending = 3,
}

export enum shelfPosition {
  "未知",
  "一层（下）",
  "二层（中）",
  "三层（上）",
  "四层（顶）",
}

export enum departments {
  "急救/重症" = 1,
  "门诊",
  "后勤",
  "指挥",
  "重症",
  "超声",
  "清创",
  "留观",
  "药房",
  "耗材",
  "手术",
  "防疫/隔离",
  "消毒",
  "住院",
  "检验",
}

export enum DepartmentTypeEnum {
  firstAid = 1, // 急救/重症
  outpatient = 2, // 门诊
  logistics = 3, // 后勤
  command = 4, // 指挥
  severeCase = 5, // 重症
  ultrasonic = 6, // 超声
  debridement = 7, // 清创
  observation = 8,// 留观
  pharmacy = 9, // 药房
  consumables = 10, // 耗材
  operation =  11, // 手术
  isolation = 12, // 防疫/隔离
  disinfection = 13, // 消毒
  hospitalization = 14, // 住院
  inspection = 15 // 检验
}

export enum BoxStatusEnum {
  inStock = 1, // 在库
  outStock = 2, // 已出库
  waitingStock = 3 // 待出库
}

export enum InBatchPendingStatus {
  normal = 0,
  out = 1 // 借货
}