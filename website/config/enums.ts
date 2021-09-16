export enum materialType {
  goods = 1,
  box,
}

export enum boxSize {
  "一箱一桌(800*600*600)" = 1,
  "一箱两柜(1200*800*800)",
  "一箱一柜(1200*800*400)",
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
