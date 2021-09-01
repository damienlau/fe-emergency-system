const configs = {
  title: "深圳多特医疗技术有限公司",
  iconUrl: "//at.alicdn.com/t/font_2563603_cxkwc7ixb18.js",
  // 科室配置
  department: {
    1: "急救/重症",
    2: "门诊",
    3: "后勤",
    4: "指挥",
    5: "重症",
    6: "超声",
    7: "清创",
    8: "留观",
    9: "药房",
    10: "耗材",
    11: "手术",
    12: "防疫/隔离",
    13: "消毒",
    14: "住院",
    15: "检验",
  },
  departmentOptions: [
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
  ],
  // 货架配置
  shelf: {
    position: {
      0: "未知",
      1: "一层(下)",
      2: "二层(中)",
      3: "三层(上)",
      4: "四层(顶)",
    },
    // type: this.department,
  },
};

export default configs;
