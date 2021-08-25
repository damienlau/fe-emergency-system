// 组件-table

import { defineComponent, toRefs, h } from "vue";
import { Empty } from "website/components";
import {
  Table as AntTable,
  TableColumn as AntTableColumn,
} from "ant-design-vue";

export default defineComponent({
  name: "Table",
  props: {
    dataSource: {
      type: Array,
      default() {
        return [];
      },
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    pagination: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  setup(props, { slots }) {
    console.log(props, "props");
    return () =>
      h(
        AntTable, // tag name
        {
          class: "w-full h-full",
          rowKey: (row) => row.key || row.id,
          dataSource: props.dataSource,
          columns: props.columns,
        },
        this.$slots.name()
        // [
        //   this.$slots.default(), // array of children
        //   this.$slots.title(),
        // ] // array of children
      );
    // <>
    //   <a-table
    //     class="w-full h-full"
    //     rowKey={(row) => row.key || row.id}
    //     dataSource={props.dataSource}
    //     columns={props.columns}
    //   >
    //     <a-table-column key="name" title="name" data-index="name">
    //       {{
    //         default: () => slots.default && slots.default(),
    //       }}
    //     </a-table-column>
    //   </a-table>
    // </>
  },
});
