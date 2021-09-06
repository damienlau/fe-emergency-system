import { defineComponent, ref, toRefs, watch } from "vue";
import { List, ListItem } from "ant-design-vue";

export default defineComponent({
  name: "CardList",
  props: {
    dataSource: {
      type: Object,
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
    const cardListsData = ref([]);
    const cardListGrid = ref({
      gutter: 16,
      column: props.grid,
    });
    const cardListPagination = ref < PaginationProps > {};

    watch(dataSource, (lists) => {
      cardListsData.value = lists.data;
      cardListPagination.value = lists.pagination;
    });

    return () => (
      <List
        class="flex flex-col overflow-auto"
        dataSource={cardListsData.value}
        grid={cardListGrid.value}
        // pagination={cardListPagination.value}
      >
        {{
          renderItem: (render) => <ListItem>{slots.card?.(render)}</ListItem>,
          // loadMore: () => {
          //   return cardListsData.value && <Button>加载更多</Button>;
          // },
        }}
      </List>
    );
  },
});
