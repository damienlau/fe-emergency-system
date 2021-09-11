import { defineComponent, ref } from "@vue/runtime-core";
import { Button, Space } from "ant-design-vue";
import { findEventData } from "api/task/event";
import Form from "components/Form";
import PageHeader from "components/PageHeader";
import { useRouter } from "vue-router";
import classes from "./style.module.less";

export default defineComponent({
  setup() {
    const formColumn = ref([
      {
        key: "boxName",
        placeholder: "物资或箱子名称",
        required: false,
        type: "search",
      },
    ]);
    const router = useRouter();

    const formData = ref({});

    const handleSearch = () => {
      console.log(formData.value);
    };

    findEventData().then((response) => {
      console.log(response);
    });

    return () => (
      <section class="h-full flex flex-col">
        <PageHeader class="bg-navy-4 p-16" back>
          {{
            title: () => (
              <>
                <h2 class="text-20 font-medium">1号货架</h2>
                <Form
                  v-model={[formData.value, "dataSource", ["trim"]]}
                  columns={formColumn.value}
                  layout="inline"
                  onSubmit={handleSearch}
                />
              </>
            ),
            default: () => (
              <Space size={32}>
                <p class="text-white text-opacity-70">
                  箱子在库量：<span class="text-24 text-white">18</span>/18
                </p>
                <p class="text-white text-opacity-70">
                  物资在库量：<span class="text-24 text-white">167</span>/245
                </p>
              </Space>
            ),
            extra: () => <Button type="primary">整架借出</Button>,
          }}
        </PageHeader>
        <div class="grid grid-cols-6 flex-1">
          <div class={classes.container}></div>
        </div>
      </section>
    );
  },
});
