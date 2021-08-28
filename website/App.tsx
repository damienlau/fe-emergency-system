import { defineComponent } from "vue";
import moment from "moment";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import "moment/dist/locale/zh-cn";

export default defineComponent({
  setup() {
    return () => (
      <a-config-provider locale={zhCN}>
        <router-view />
      </a-config-provider>
    );
  },
});
