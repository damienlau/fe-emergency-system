import { Form, FormItem, Input, Select, SelectOption } from "ant-design-vue";
import { defineComponent, ref } from "vue";

interface selectOptionProps {
  label: string;
  key: string;
}

interface formItemGridProps {
  span?: number;
  offset?: number;
}

interface formItemProps extends selectOptionProps {
  layouts?: formItemGridProps[];
  type?: string;
  options?: selectOptionProps[];
}

export default defineComponent({
  props: {
    columns: {
      type: Array,
      required: true,
    },
  },
  emits: ["submit"],
  setup(props, { slots, emit }) {
    const formData = ref({});

    const handleInputChange = () => {
      console.log(formData.value);
    };

    const handleSubmit = () => {
      emit("submit", formData.value);
    };

    const formItemRenderNode = (render: formItemProps) => {
      switch (render.type) {
        case "select":
          return (
            <Select
              v-model={[formData.value[`${render.key}`], "value"]}
              allowClear
              placeholder={`请选择${render.label}`}
            >
              {render.options.map((selectOption) => {
                return (
                  <SelectOption value={selectOption.key}>
                    {selectOption.label}
                  </SelectOption>
                );
              })}
            </Select>
          );

        default:
          return (
            <Input
              v-model={[formData.value[render.key], "value"]}
              allowClear
              placeholder={`请输入${render.label}`}
            ></Input>
          );
      }
    };

    return () => (
      <Form
        model={formData.value}
        colon={false}
        hideRequiredMark
        onFinish={handleSubmit}
      >
        {props.columns.map((formItem: any) => {
          return (
            <FormItem
              name={formItem.key}
              labelAlign="right"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              rules={
                formItem.required && [
                  {
                    required: true,
                    message: `${formItem.label}为必填项`,
                    trigger: "blur",
                  },
                ]
              }
            >
              {{
                label: () => <span class="text-16">{formItem.label}</span>,
                default: () => formItemRenderNode(formItem),
              }}
            </FormItem>
          );
        })}
        <FormItem>
          <div class="flex items-center justify-center">{slots.button?.()}</div>
        </FormItem>
      </Form>
    );
  },
});
