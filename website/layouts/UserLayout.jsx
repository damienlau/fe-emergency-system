import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  setup() {
    return () => (
      <>
        <main class="h-full p-16">
          <RouterView />
        </main>
      </>
    );
  },
});
