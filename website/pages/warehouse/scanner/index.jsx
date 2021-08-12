// 出/归仓扫描

import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    // 扫描菜单配置项
    const menus = ref([
      {
        label: "出仓扫描",
      },
      {
        label: "归仓扫描",
      },
      {
        label: "紧急扫描",
      },
    ]);

    return () => (
      <section className="h-full flex flex-row items-center justify-center">
        <div className="grid grid-cols-3 gap-x-62">
          {menus.value.map((menuItem) => {
            return (
              <div className="dark:bg-navy-2 rounded">{menuItem.label}</div>
            );
          })}
        </div>
      </section>
    );
  },
});
