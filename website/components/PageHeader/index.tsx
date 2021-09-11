import { defineComponent } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageHeader",
  props: {
    back: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: false,
    },
  },
  setup(props, { emit, slots }) {
    const router = useRouter();

    return () => (
      <section class="grid grid-cols-3">
        <div class="flex flex-row items-center">
          {/* Back Button */}
          <button
            v-show={props.back}
            class="border-r border-white border-opacity-50 pr-16 mr-24"
            onClick={() => router.back()}
          >
            返回
          </button>
          {/* Title */}
          {slots.title ? (
            slots.title?.()
          ) : (
            <h2 class="text-20 font-medium">{props.title}</h2>
          )}
        </div>
        <div class="flex flex-row justify-center">
          {/* Default */}
          {slots.default?.()}
        </div>
        <div class="flex flex-row justify-end">
          {/* Extra */}
          {slots.extra?.()}
        </div>
      </section>
    );
  },
});
