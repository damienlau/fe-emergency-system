import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <>
        <header class="h-72 dark:bg-navy-3 px-32"></header>
        <main class="flex-auto p-16">
          <router-view />
        </main>
      </>
    );
  },
});
