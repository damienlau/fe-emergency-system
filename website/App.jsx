import { defineComponent } from "vue";
import { Button } from "ant-design-vue";

export default defineComponent({
  setup() {
    return () => <router-view />;
  },
});
