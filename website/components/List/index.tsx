import { defineComponent, ref, toRefs, watch, PropType } from "vue";
import { List, ListItem } from "ant-design-vue";
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
      cardListsData.value = lists?.content;
      // cardListPagination.value = lists.pagination;
    });

    return () => (
      <List
        class="flex flex-col overflow-auto"
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
