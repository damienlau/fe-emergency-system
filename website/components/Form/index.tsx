import { defineComponent, PropType, ref, toRefs } from "@vue/runtime-core";
import {
  Col,
  DatePicker,
  Form,
  FormItem,
  Input,
  InputPassword,
  InputSearch,
  Row,
  Select,
  SelectOption,
  Textarea,
  Upload,
} from "ant-design-vue";
import { uploadData } from "api/utils/tools";

export interface selectOptionProps {
  key?: string | number;
  secondKey?: string | number;
  label?: string;
}

export interface formItemProps extends selectOptionProps {
  colon?: boolean;
  disabled?: boolean;
  options?: selectOptionProps[];
  placeholder?: string;
  required?: boolean;
  span?: number;
  labelSpan?: number;
  hasLabel?: boolean;
  type?: string;
}

export default defineComponent({
  name: "Form",
  props: {
    columns: {
      type: Object as PropType<formItemProps[]>,
      required: true,
    },
    dataSource: {
      type: Object,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    layout: {
      type: String,
      required: false,
      default: "horizontal",
      validator(layout: string) {
        return ["horizontal", "vertical", "inline"].includes(layout);
      },
    },
  },
  emits: ["update:dataSource", "search", "submit"],
  setup(props, { emit, slots }) {
    const { dataSource } = toRefs(props);
    const formData = ref<{ [prototypeName: string]: any }>(
      dataSource.value || {}
    );

    const formComponentNode = ({
      disabled,
      key,
      secondKey,
      label,
      options,
      placeholder,
      type,
    }: formItemProps) => {
      switch (type) {
        case "date":
          return (
            <DatePicker
              v-model={[formData.value[`${key}`], "value"]}
              allowClear
              disabled={disabled || props.disabled}
              placeholder={`请输入${label || placeholder}`}
            />
          );

        case "password":
          return (
            <InputPassword
              v-model={[formData.value[`${key}`], "value", ["trim"]]}
              allowClear
              disabled={disabled || props.disabled}
              placeholder={`请输入${label || placeholder}`}
            ></InputPassword>
          );

        case "search":
          return (
            <InputSearch
              v-model={[formData.value[`${key}`], "value", ["trim"]]}
              allowClear
              disabled={disabled || props.disabled}
              placeholder={`请输入${label || placeholder}`}
              onSearch={handleSubmit}
            />
          );

        case "select":
          return (
            <Select
              v-model={[formData.value[`${key}`], "value"]}
              disabled={disabled || props.disabled}
              placeholder={`请选择${label || placeholder}`}
              onSelect={(val, opt) => {
                if (secondKey) {
                  formData.value[`${secondKey}`] = opt.title;
                }
              }}
            >
              {options?.map((selectOption) => {
                return (
                  <SelectOption
                    key={selectOption.key}
                    title={selectOption.label}
                  >
                    {selectOption.label}
                  </SelectOption>
                );
              })}
            </Select>
          );

        case "textArea":
          return (
            <Textarea
              v-model={[formData.value[`${key}`], "value", ["trim"]]}
              allowClear
              disabled={disabled || props.disabled}
              placeholder={`请输入${label || placeholder}`}
            ></Textarea>
          );

        case "upload":
          return (
            <Upload
              v-model={[formData.value[`${key}`], "fileList"]}
              disabled={disabled || props.disabled}
              customRequest={({ file }) => {
                uploadData(file).then((response) => {
                  formData.value[`${key}`].map((image: any, index: number) => {
                    if (image.uid) {
                      formData.value[`${key}`].splice(index, 1);
                    }
                  });
                  formData.value[`${key}`].push(response);
                });
              }}
              listType="picture-card"
              accept="image/*"
              multiple={true}
            >
              <span>上传图片</span>
            </Upload>
          );

        default:
          return (
            <Input
              v-model={[formData.value[`${key}`], "value", ["trim"]]}
              allowClear
              disabled={disabled || props.disabled}
              placeholder={`请输入${label || placeholder}`}
            ></Input>
          );
      }
    };

    const handleSubmit = (parameter: { [prototypeName: string]: any }) => {
      emit("update:dataSource", formData.value);
      emit("search", formData.value);
      emit("submit", formData.value);
    };

    return () => (
      <Form
        hideRequiredMark={true}
        layout={props.layout}
        model={formData.value}
        onFinish={handleSubmit}
      >
        <Row>
          {props.columns.map((formItem) => {
            return (
              <Col span={formItem.span || 24}>
                <FormItem
                  colon={!!formItem.colon}
                  name={formItem.key}
                  labelCol={{ span: formItem.labelSpan }}
                  wrapperCol={{ span: formItem.wrapperSpan }}
                  rules={[
                    {
                      whitespace: true,
                      message: `${
                        formItem.label || formItem.placeholder
                      }为必填项`,
                      required:
                        (typeof formItem.required === "undefined"
                          ? !formItem.required
                          : formItem.required) && !formItem.disabled,
                      trigger: ["blur", "change"],
                      type: "any",
                    },
                  ]}
                >
                  {{
                    default: () => formComponentNode(formItem),
                    label: () => {
                      if (formItem.label) {
                        return (
                          <span class="text-16 text-white text-opacity-70">
                            {formItem.label}
                          </span>
                        );
                      }
                    },
                  }}
                </FormItem>
              </Col>
            );
          })}
          {slots.button && (
            <Col span={24}>
              <FormItem class="text-center">{slots.button?.()}</FormItem>
            </Col>
          )}
        </Row>
      </Form>
    );
  },
});
