// 「任务」事件

import request from "website/utils/request";

// 查询全部数据
export function findTaskEventData() {
  return request.get("/event/info/all");
}
