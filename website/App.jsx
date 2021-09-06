import { ConfigProvider, Empty } from "ant-design-vue";
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import emptyImage from "assets/icon_empty_data.png";

export default defineComponent({
  setup() {
    const emptyRender = {
      renderEmpty: () => (
        <>
          <Empty image={emptyImage} />
        </>
      ),
    };

    return () => (
      <ConfigProvider locale={zhCN} v-slots={emptyRender}>
        <RouterView />
      </ConfigProvider>
    );
  },
});
