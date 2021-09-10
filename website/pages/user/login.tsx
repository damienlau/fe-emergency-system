import { defineComponent, ref } from "@vue/runtime-core";
import { Button } from "ant-design-vue";
import Form from "components/Form";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const formColumn = ref([
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
            store.dispatch("user/setUserOnline", userInfo).then((response) => {
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
