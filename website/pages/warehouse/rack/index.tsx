import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import { Button, Space } from "ant-design-vue";
import { findBoxCountData, findBoxData } from "api/warehouse/material/box";
import Box from "components/Box";
import Form from "components/Form";
import PageHeader from "components/PageHeader";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import classes from "./rackbox.module.less"

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

    const rackCount = ref({
      boxInStockNum: 0,
      boxInTotalNum: 0,
      materialInStockNum: 0,
      materialTotalNum: 0
    })


    const handleSearch = () => {
      console.log(formData.value);
    };

    const inStockNumFilter = (stockNum: string) => {
      return stockNum && stockNum.split('/')[0] || 0
    };

    const totalStockNumFilter = (stockNum: string) => {
      return stockNum && stockNum.split('/')[1] || 0
    }

    onMounted(() => {
      const rackNumber = route.params.id
      findBoxData({ rackNumber: rackNumber } as any).then((response) => {
        boxColumn.value = response.content;
      });

      findBoxCountData(Number(rackNumber)).then((response) => {
        rackCount.value = response
      });
    });

    return () => (
      <section class="h-full flex flex-col">
        <PageHeader class="bg-navy-4 p-16" back>
          {{
            title: () => (
              <>
                <h2 class="text-20 font-medium">
                  {route.params.id ? `${route.params.id}号货架` : "未知货架"}
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
                  箱子在库量：<span class="text-24 text-white">{ rackCount.value.boxInStockNum }</span>/{ rackCount.value.boxInTotalNum }
                </p>
                <p class="text-white text-opacity-70">
                  物资在库量：<span class="text-24 text-white">{ rackCount.value.materialInStockNum }</span>/{ rackCount.value.materialTotalNum }
                </p>
              </Space>
            ),
            extra: () => <Button type="primary">整架借出</Button>,
          }}
        </PageHeader>
        <div class={classes['box-content']}>
          {boxColumn.value.map((columns) => {
            return <Box columns={columns} />;
          })}
        </div>
      </section>
    );
  },
});
