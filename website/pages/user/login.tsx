// 登录

import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { Form } from "components";

export default defineComponent({
  setup() {
    const store = useStore();
    // 登录表单配置项
    const formColumn = ref([
      {
        label: "账号",
        key: "loginAccount",
        required: true,
      },
      {
        label: "密码",
        key: "loginPassword",
        type: "password",
        required: true,
      },
    ]);

    // 监听登录表单提交事件
    const handleSubmitForm = (formData) => {
      store.dispatch("userModule/setUserOnline", formData);
    };

    return () => (
      <div class="h-full flex items-center justify-center">
        <Form
          class="w-1/3"
          columns={formColumn.value}
          onSubmit={handleSubmitForm}
        >
          {{
            button: () => (
              <a-button type="primary" html-type="submit">
                登录
              </a-button>
            ),
          }}
        </Form>
      </div>
    );
  },
});
