// 出/归仓扫描

import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    // 扫描菜单配置项
    const menus = ref([
      {
        label: "出仓扫描",
        icon: "export",
        badgeColor: "warning",
      },
      {
        label: "归仓扫描",
        icon: "import",
        badgeColor: "success",
      },
      {
        label: "紧急扫描",
        icon: "emergency",
        badgeColor: "danger",
      },
    ]);

    return () => (
      <section className="h-full flex flex-row items-center justify-center">
        <div className="w-3/5 h-2/5 grid grid-cols-3 gap-x-62">
          {menus.value.map((menuItem) => {
            return (
              <div className="flex flex-col items-center justify-center bg-navy-2 hover:bg-navy-1 rounded text-16 text-center font-medium">
                <img
                  src={`assets/icon_scan_${menuItem.icon}.png`}
                  alt={menuItem.label}
                />
                <p className="flex flex-row items-center py-8 text-white text-opacity-90">
                  <i
                    className={`inline-block w-16 h-16 mr-8 rounded-full bg-${menuItem.badgeColor}`}
                  />
                  {menuItem.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    );
  },
});
