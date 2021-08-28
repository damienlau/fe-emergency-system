import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "PageHeader",
  props: {
    // 标题
    title: {
      type: String,
      required: false,
    },
  },
  setup(props, { slots }) {
    return () => (
      <div class="grid grid-flow-col grid-cols-3">
        <div>
          {props.title ? (
            <h1 class="text-22 leading-72 font-medium">{props.title}</h1>
          ) : (
            slots.title?.()
          )}
        </div>
        <div>{slots.default?.()}</div>
        <div>{slots.extra?.()}</div>
      </div>
    );
  },
});
