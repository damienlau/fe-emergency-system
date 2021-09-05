import {
  Form,
  FormItem,
  Input,
  Select,
  SelectOption,
  Upload,
} from "ant-design-vue";
import { uploadData } from "api/utils";
import Icon from "components/Icon";
import { defineComponent, ref, toRefs } from "vue";

interface selectOptionProps {
  label: string;
  key: string;
}

interface formItemGridProps {
  span?: number;
  offset?: number;
}

export interface formItemProps extends selectOptionProps {
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
    dataSource: {
      type: Object,
      required: false,
    },
    edit: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: ["submit"],
  setup(props, { slots, emit }) {
    const { dataSource } = toRefs<any>(props);

    const formData = ref(dataSource.value || {});

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
              disabled={!props.edit}
              placeholder={`请选择${render.label}`}
            >
              {render.options?.map((selectOption) => {
                return (
                  <SelectOption value={selectOption.key}>
                    {selectOption.label}
                  </SelectOption>
                );
              })}
            </Select>
          );

        case "upload":
          return (
            <Upload
              customRequest={({ file }) => {
                uploadData(file).then((response: any) => {
                  if (typeof formData.value[render.key] === "undefined") {
                    formData.value[render.key] = [{ fileUrl: response.join() }];
                  } else {
                    formData.value[render.key].push({
                      fileUrl: response.join(),
                    });
                  }
                });
              }}
              multiple
              fileList={formData.value[render.key]}
              listType="picture-card"
            >
              <div class="flex flex-col items-center justify-center">
                <Icon class="text-24" type="add" />
                <span>上传图片</span>
              </div>
            </Upload>
          );

        default:
          return (
            <Input
              v-model={[formData.value[render.key], "value"]}
              allowClear
              disabled={!props.edit}
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
                    trigger: "change",
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
