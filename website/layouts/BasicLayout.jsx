import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <>
        <header className="h-72 dark:bg-navy-3 px-32"></header>
        <main className="flex-auto p-16">
          <router-view />
        </main>
      </>
    );
  },
});
