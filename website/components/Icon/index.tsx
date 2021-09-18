import { defineComponent, h } from "vue";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import defaultSettings from "config/defaultSettings";

export default defineComponent({
  name: "Icon",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  render() {
    const { iconUrl } = defaultSettings;
    const Icon = createFromIconfontCN({
      scriptUrl: iconUrl,
    });

    return h(Icon, {
      type: `rs-icon-${this.type}`,
    });
  },
});
