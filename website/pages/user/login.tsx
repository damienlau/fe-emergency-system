import { defineComponent, ref } from "@vue/runtime-core";
import { Button } from "ant-design-vue";
import Form from "components/Form";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const formColumn = ref([
      {
        label: "账号",
        key: "loginAccount",
      },
      {
        label: "密码",
        key: "loginPassword",
        type: "password",
      },
      {
        label: "图片",
        key: "image",
        type: "upload",
        required: false,
      },
    ]);
    const store = useStore();

    return () => (
      <>
        <Form
          columns={formColumn.value}
          onSubmit={(userInfo) => {
            store.dispatch("user/setUserOnline", userInfo);
          }}
        >
          {{
            button: () => (
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            ),
          }}
        </Form>
      </>
    );
  },
});
