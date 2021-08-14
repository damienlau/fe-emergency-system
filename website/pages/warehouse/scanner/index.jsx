// 出/归仓扫描

import { defineComponent, ref } from "vue";
import { Modal } from "website/components";

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
    // 模态框是否可见
    const visible = ref(false);

    return () => (
      <>
        {/* 扫描菜单-容器 */}
        <section className="h-full flex flex-row items-center justify-center">
          <div className="w-3/5 h-2/5 grid grid-cols-3 gap-x-62">
            {menus.value.map((menuItem) => {
              return (
                // 扫描菜单-卡片
                <div
                  className="flex flex-col items-center justify-center bg-navy-2 hover:bg-navy-1 hover:cursor-pointer rounded text-16 text-center font-medium"
                  onClick={() => (visible.value = !visible.value)}
                >
                  {/* 扫描菜单-卡片图标 */}
                  <img
                    src={`assets/icon_scan_${menuItem.icon}.png`}
                    alt={menuItem.label}
                  />
                  {/* 扫描菜单-卡片标题 */}
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
        {/* 扫描菜单-模态框 */}
        <Modal
          v-model={[visible.value, "visible"]}
          size="ultralight"
          title="请填写信息"
        ></Modal>
      </>
    );
  },
});
