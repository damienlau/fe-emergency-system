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

export default defineComponent({
  props: {
    columns: {
      type: Array,
      required: true,
    },
    formData: {
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
    const { formData } = toRefs(props);

    const handleSubmit = () => {
      emit("submit", formData.value);
    };

    const formItemRenderNode = (render) => {
      switch (render.type) {
        case "select":
          return (
            <Select
              v-model={[formData.value[`${render.key}`], "value"]}
              allowClear
              disabled={!props.edit}
              placeholder={`请选择${render.label}`}
              options={render.options}
            ></Select>
          );

        case "upload":
          if (typeof formData.value[render.key] !== "undefined") {
            formData.value[render.key].map((images) => {
              return {
                uid: images.id,
                name: images.name,
                status: "done",
                url: images.fileUrl,
              };
            });
          }

          return (
            <Upload
              customRequest={({ file }) => {
                uploadData(file).then((response) => {
                  if (typeof formData.value[render.key] === "undefined") {
                    formData.value[render.key] = new Array({
                      uid: file.uid,
                      name: file.name,
                      status: "done",
                      url: response.join(),
                      id: file.uid,
                      oldFileName: file.name,
                      fileUrl: response.join(),
                    });
                  } else {
                    formData.value[render.key].push({
                      uid: file.uid,
                      name: file.name,
                      status: "done",
                      url: response.join(),
                      id: file.uid,
                      oldFileName: file.name,
                      fileUrl: response.join(),
                    });
                  }
                });
              }}
              multiple
              remove={(file) => {
                console.log(file);
              }}
              fileList={formData.value[render.key]}
              listType="picture-card"
              onChange={(file) => {
                console.log(formData.value);
              }}
            >
              <div class="flex flex-col items-center justify-center">
                <Icon class="text-24" type="add" />
                <span>上传图片</span>
              </div>
            </Upload>
          );
        case "textArea":
          return (
            <a-textarea
              v-model={[formData.value[render.key], "value"]}
              placeholder={`请输入${render.label}`}
              rows="4"
              disabled={!props.edit}
            />
          );
        case "date":
          return (
            <a-date-picker
              v-model={[formData.value[render.key], "value"]}
              format={"YYYY/MM/DD"}
              valueFormat={"YYYY-MM-DD 00:00:00"}
              disabled={!props.edit}
            />
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
        {props.columns.map((formItem) => {
          return (
            <FormItem
              name={formItem.key}
              labelAlign="right"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              rules={
                formItem.required
                  ? [
                      {
                        required: true,
                        message: `${formItem.label}为必填项`,
                        trigger: "change",
                      },
                    ]
                  : []
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
          <div class="flex items-center justify-center">
            {slots.button && slots.button()}
          </div>
        </FormItem>
      </Form>
    );
  },
});
