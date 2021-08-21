// 组件-表单

import { defineComponent, toRefs } from "vue";

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
        {/* 表单输入控件 */}
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
                  let customElement_;

                  switch (formItem.type) {
                    case "select":
                      customElement_ = (
                        <a-select
                          v-model={[model.value[`${formItem.key}`], "value"]}
                          allowClear
                          size="large"
                          placeholder={`请选择${formItem.label}`}
                        >
                          {formItem.options &&
                            formItem.options.map((option) => {
                              return (
                                <a-select-option value={option.key}>
                                  {option.label}
                                </a-select-option>
                              );
                            })}
                        </a-select>
                      );
                      break;

                    case "password":
                      customElement_ = (
                        <a-input-password
                          v-model={[model.value[`${formItem.key}`], "value"]}
                          allowClear
                          size="large"
                          placeholder={`请输入${formItem.label}`}
                        ></a-input-password>
                      );
                      break;

                    default:
                      customElement_ = (
                        <a-input
                          v-model={[model.value[`${formItem.key}`], "value"]}
                          allowClear
                          size="large"
                          placeholder={`请输入${formItem.label}`}
                        ></a-input>
                      );
                      break;
                  }

                  return customElement_;
                },
              }}
            </a-form-item>
          );
        })}
        {/* 表单提交按钮 */}
        <a-form-item wrapperCol={{ span: 24 }}>
          <div class="w-full flex flex-row items-center justify-center">
            {slots.button && slots.button()}
          </div>
        </a-form-item>
      </a-form>
    );
  },
});
