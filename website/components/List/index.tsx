import { defineComponent, ref, toRefs, watch, PropType } from "vue";
import { Button, List, ListItem } from "ant-design-vue";
import { responseProps } from "api/utils";

export default defineComponent({
  name: "List",
  props: {
    dataSource: {
      type: Object as PropType<responseProps | undefined>,
      required: true,
    },
    grid: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  setup(props, { slots }) {
    const { dataSource } = toRefs(props);
    const cardListsData = ref();
    const cardListGrid = ref({
      gutter: 16,
      column: props.grid,
    });
    const cardListPagination = ref({});

    watch(dataSource, (lists) => {
      console.log(lists);

      cardListsData.value = lists?.content;
      cardListPagination.value = {
        current: lists?.currentPage,
        pageSize: lists?.totalNum,
        defaultPageSize: lists?.totalNum,
        total: lists?.totalNum,
      };
    });

    return () => (
      <List
        class="h-full flex flex-col overflow-x-hidden overflow-y-auto"
        dataSource={cardListsData.value}
        grid={cardListGrid.value}
        // pagination={cardListPagination.value}
      >
        {{
          renderItem: (render: any) => (
            <ListItem>{slots.card?.(render)}</ListItem>
          ),
          // loadMore: () => {
          //   return cardListsData.value && <Button>加载更多</Button>;
          // },
        }}
      </List>
    );
  },
});
