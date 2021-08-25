// 组件-table

// import { defineComponent, toRefs } from "vue";
// import { Empty } from "website/components";

// export default defineComponent({
//   name: "Table",
//   props: {
//     dataSource: {
//       type: Array,
//       default() {
//         return [];
//       },
//     },
//     columns: {
//       type: Array,
//       default() {
//         return [];
//       },
//     },
//   },

//   setup(props, { slots }) {
//     console.log(slots, "slots");
//     return () => (
//       <>
//         <a-table
//           class="w-full h-full"
//           rowKey={(row) => row.key || row.id}
//           dataSource={props.dataSource}
//           columns={props.columns}
//         >
//           <a-table-column key="name" title="name" data-index="name">
//             {{
//               default: () => slots.default && slots.default(),
//             }}
//           </a-table-column>
//         </a-table>
//       </>
//     );
//   },
// });
import { defineComponent, h } from "vue";

export default defineComponent({
  name: "Table",
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
  render() {
    return h(
      "h" + this.level, // tag name
      {
        style: "color:red",
      }, // props/attributes
      this.$slots.default() // array of children
    );
  },
  // setup(props, { slots }) {
  //   return () => {
  //     return h("h" + props.level, slots.default?.());
  //   };
  // },
});
