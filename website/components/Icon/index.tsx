// 组件-图标

import { defineComponent } from "vue";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import defaultConfig from "../../../config/config";

export default defineComponent({
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { iconUrl } = defaultConfig;
    const Icon = createFromIconfontCN({
      scriptUrl: iconUrl,
    });

    return () => <Icon type={`rs-icon-${props.type}`} />;
  },
});
