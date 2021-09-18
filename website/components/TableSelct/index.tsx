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
    model: {
      type: Object,
      required: true,
    },
  },
  emits: ["search", "update:model"],
  setup(props, { slots, emit }) {
    const { columns, model } = toRefs(props);
    const handleSearch = () => {
      emit("update:model", model.value);
      emit("search");
    };

    return () => (
      <a-form model={model.value} layout="inline" class="m-3">
        {/* 表单输入控件 */}
        {columns.value.map((formItem) => {
          return (
            <a-form-item
              name={formItem.key}
              colon={formItem.label ? true : false}
            >
              {{
                label: () =>
                  formItem.label && (
                    <span class="text-16">{formItem.label}</span>
                  ),
                default: () => {
                  let customElement_;
                  switch (formItem.type) {
                    case "select":
                      customElement_ = (
                        <a-select
                          v-model={[model.value[`${formItem.key}`], "value"]}
                          allowClear
                          size="default"
                          placeholder={formItem.placeholder || ""}
                          onChange={handleSearch}
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
                    default:
                      customElement_ = (
                        <a-input-search
                          v-model={[model.value[`${formItem.key}`], "value"]}
                          allowClear
                          size="default"
                          placeholder={formItem.placeholder || ""}
                          onSearch={handleSearch}
                        ></a-input-search>
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
