// 组件-空状态

import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => <a-empty image={`assets/icon_empty_data.png`}></a-empty>;
  },
});
