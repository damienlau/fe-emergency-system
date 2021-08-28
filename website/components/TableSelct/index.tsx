// 组件- table上面的搜索框

import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "TableSelct",
  props: {
    // 搜索数据配置
    columns: {
      type: Object,
      required: false,
    },
    // 搜索数据对象
    select: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ["update:model", "submit"],
  setup(props, { slots, emit }) {
    const { columns, select } = toRefs(props);
    console.log(select, "select");
    // 监听表单提交事件
    const handleSubmit = () =>
      emit("submit", emit("update:model", select.value));

    return () => (
      <a-form layout="inline">
        {/* 表单输入控件 */}
        {columns.value.map((formItem) => {
          return (
            <a-form-item colon={formItem.colon || false} name={formItem.key}>
              {{
                label: () =>
                  formItem.label && (
                    <span class="text-16">{formItem.label}</span>
                  ),
                default: () => {
                  let customElement_;
                  switch (formItem.type) {
                    case "input":
                      customElement_ = (
                        <a-input-search
                          v-model={[select.value[`${formItem.key}`], "value"]}
                          allowClear
                          size="default"
                          placeholder={formItem.placeholder || ""}
                          onSearch={handleSubmit}
                        ></a-input-search>
                      );
                      break;
                    case "select":
                      customElement_ = (
                        <a-select
                          v-model={[select.value[`${formItem.key}`], "value"]}
                          allowClear
                          size="default"
                          placeholder={formItem.placeholder || ""}
                          style="width: 100%"
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
                  }

                  return customElement_;
                },
              }}
            </a-form-item>
          );
        })}
        {/* 搜索右侧的按钮 */}
        <a-form-item wrapperCol={{ span: 24 }}>
          <div class="w-full flex flex-row items-center justify-center">
            {slots.button && slots.button()}
          </div>
        </a-form-item>
      </a-form>
    );
  },
});
