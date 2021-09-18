import { defineComponent, ref } from "@vue/runtime-core";
import { Button } from "ant-design-vue";
import Form, { formItemProps } from "components/Form";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const formColumn = ref<formItemProps[]>([
      {
        key: "loginAccount",
        placeholder: "账号",
      },
      {
        key: "loginPassword",
        placeholder: "密码",
        type: "password",
      },
    ]);
    const router = useRouter();
    const store = useStore();

    return () => (
      <section class="w-full h-full flex items-center justify-center">
        <Form
          columns={formColumn.value}
          onSubmit={(userInfo) => {
            store
              .dispatch("userModule/setUserOnline", userInfo)
              .then((response) => {
                router.back();
              });
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
      </section>
    );
  },
});
