import { defineComponent, ref, toRefs } from "@vue/runtime-core";
import {
  Col,
  DatePicker,
  Form,
  FormItem,
  Input,
  Row,
  Select,
  SelectOption,
  Textarea,
  Upload,
} from "ant-design-vue";

export default defineComponent({
  name: "Form",
  props: {
    columns: {
      type: Array,
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
  },
  emits: ["onUpdate:dataSource", "submit"],
  setup(props, { emit, slots }) {
    const { dataSource } = toRefs(props);
    const formData = ref(dataSource.value || {});

    const createFormComponentRender = ({
      key,
      label,
      options,
      placeholder,
      type,
    }) => {
      switch (type) {
        case "date":
          return <DatePicker />;

        case "select":
          return (
            <Select
              v-model={[formData.value[`${key}`], "value"]}
              allowClear
              disabled={props.disabled}
              placeholder={`请选择${label || placeholder}`}
            >
              {options.map((selectOption) => {
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
              v-model={[formData.value[`${key}`], "value"]}
              allowClear
              disabled={props.disabled}
              placeholder={`请输入${label || placeholder}`}
            ></Textarea>
          );

        case "upload":
          return (
            <Upload
              v-model={[formData.value[`${key}`], "fileList"]}
              listType="picture-card"
            >
              <span>上传图片</span>
            </Upload>
          );

        default:
          return (
            <Input
              v-model={[formData.value[`${key}`], "value"]}
              allowClear
              disabled={props.disabled}
              placeholder={`请输入${label || placeholder}`}
            ></Input>
          );
      }
    };

    const handleSubmit = () => {
      emit("onUpdate:dataSource", formData.value);
      emit("submit", formData.value);
    };

    return () => (
      <Form
        hideRequiredMark={true}
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
                  rules={[
                    {
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
                    default: () => createFormComponentRender(formItem),
                    label: () => (
                      <span class="text-16 text-white text-opacity-70">
                        {formItem.label}
                      </span>
                    ),
                  }}
                </FormItem>
              </Col>
            );
          })}
          <Col span={24}>
            <FormItem class="text-center">{slots.button()}</FormItem>
          </Col>
        </Row>
      </Form>
    );
  },
});
