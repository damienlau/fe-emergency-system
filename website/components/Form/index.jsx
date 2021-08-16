// 组件-表单

import { defineComponent, toRefs } from "vue";
import { Icon } from "website/components";

export default defineComponent({
  name: "Form",
  props: {
    // 表单数据域的配置描述
    columns: {
      type: Object,
      required: true,
    },
    // 表单数据对象
    model: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:model", "submit"],
  setup(props, { slots, emit }) {
    const { columns, model } = toRefs(props);

    // 监听表单提交事件
    const handleSubmit = () =>
      emit("submit", emit("update:model", model.value));

    return () => (
      <a-form
        model={model.value}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 12 }}
        hideRequiredMark={true}
        onFinish={handleSubmit}
      >
        {columns.value.map((formItem) => {
          return (
            <a-form-item
              colon={formItem.colon || false}
              name={formItem.key}
              required={formItem.required}
              rules={[
                {
                  required: formItem.required,
                  message: `${formItem.label}为必填项`,
                  trigger: "blur",
                },
              ]}
            >
              {{
                label: () => <span class="text-16">{formItem.label}</span>,
                default: () => {
                  let element_;
                  switch (formItem.type) {
                    case "select":
                      element_ = (
                        <a-select
                          v-model={[model.value[`${formItem.key}`], "value"]}
                          size="large"
                          placeholder={`请选择${formItem.label}`}
                        ></a-select>
                      );
                      break;

                    default:
                      element_ = (
                        <a-input
                          v-model={[model.value[`${formItem.key}`], "value"]}
                          size="large"
                          placeholder={`请输入${formItem.label}`}
                        ></a-input>
                      );
                  }

                  return element_;
                },
              }}
            </a-form-item>
          );
        })}
        <a-form-item wrapperCol={{ span: 24 }}>
          <div class="w-full flex flex-row items-center justify-center">
            <a-button ghost html-type="submit">
              <Icon class="align-baseline" type="determine" />
              确定
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    );
  },
});
