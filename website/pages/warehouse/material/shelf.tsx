import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import { Button, Space } from "ant-design-vue";
import { findBoxCountData, findBoxData } from "api/warehouse/material/box";
import Box from "components/Box";
import Form from "components/Form";
import PageHeader from "components/PageHeader";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const formColumn = ref([
      {
        key: "boxName",
        placeholder: "物资或箱子名称",
        type: "search",
      },
    ]);
    const boxColumn = ref([]);
    const route = useRoute();
    const store = useStore();

    const formData = ref({});

    const handleSearch = () => {
      console.log(formData.value);
    };

    onMounted(() => {
      findBoxData({ rackNumber: route.query.id }).then((response) => {
        boxColumn.value = response.content;
      });

      findBoxCountData(route.query.id).then((response) => {
        console.log(response);
      });
    });

    return () => (
      <section class="h-full flex flex-col">
        <PageHeader class="bg-navy-4 p-16" back>
          {{
            title: () => (
              <>
                <h2 class="text-20 font-medium">
                  {route.query.id ? `${route.query.id}号货架` : "未知货架"}
                </h2>
                <Form
                  columns={formColumn.value}
                  layout="inline"
                  onSearch={handleSearch}
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
        <div class="flex-1 grid grid-cols-6 grid-rows-3 gap-x-28 items-end">
          {boxColumn.value.map((columns) => {
            return <Box columns={columns} />;
          })}
        </div>
      </section>
    );
  },
});
