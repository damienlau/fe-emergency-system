import { defineComponent } from "vue";
import { Button } from "ant-design-vue";

export default defineComponent({
  setup() {
    return () => (
      <>
        <a-button type="primary">test</a-button>
        <Button type="primary">test</Button>
      </>
    );
  },
});
