// 出/归仓扫描

import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { Form, Icon, Modal } from "website/components";

export default defineComponent({
  setup() {
    const store = useStore();
    store.dispatch("taskModule/eventModule/findTaskEvents").then((response) => {
      console.log(response);
    });
    // 扫描菜单配置项
    const menus = ref([
      {
        label: "出仓扫描",
        key: "export",
        icon: "export",
        badgeColor: "warning",
      },
      {
        label: "归仓扫描",
        key: "import",
        icon: "import",
        badgeColor: "success",
      },
      {
        label: "紧急扫描",
        key: "emergency",
        icon: "emergency",
        badgeColor: "danger",
      },
    ]);
    // 模态框表单配置项
    const formColumn = ref([
      {
        label: "事件",
        type: "select",
        key: "event",
        // option: store.dispatch(""),
      },
      {
        label: "借货人工号",
        key: "number",
        required: true,
      },
    ]);
    // 模态框表单数据
    const formData = ref({});
    // 模态框是否可见
    const visible = ref(false);

    // 选中扫描菜单卡片
    const handleClickMenuItem = (activedItemKey) => {
      visible.value = !visible.value;
      formData.value["key"] = activedItemKey;
    };

    // 监听模态框表单提交事件
    const handleSubmitForm = () => {
      console.log(formData.value);
      visible.value = !visible.value;
    };

    return () => (
      <>
        {/* 扫描菜单-容器 */}
        <section class="h-full flex flex-row items-center justify-center">
          <div class="w-3/5 h-2/5 grid grid-cols-3 gap-x-62">
            {menus.value.map((menuItem) => {
              return (
                // 扫描菜单-卡片
                <div
                  class="flex flex-col items-center justify-center bg-navy-2 hover:bg-navy-1 hover:cursor-pointer rounded text-16 text-center font-medium"
                  onClick={() => handleClickMenuItem(menuItem.key)}
                >
                  {/* 扫描菜单-卡片图标 */}
                  <img
                    src={`assets/icon_scan_${menuItem.icon}.png`}
                    alt={menuItem.label}
                  />
                  {/* 扫描菜单-卡片标题 */}
                  <p class="flex flex-row items-center py-8 text-white text-opacity-90">
                    <i
                      class={`inline-block w-16 h-16 mr-8 rounded-full bg-${menuItem.badgeColor}`}
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
        >
          {/* 扫描菜单-模态框表单 */}
          <Form
            v-model={[formData.value, "model"]}
            columns={formColumn.value}
            onSubmit={handleSubmitForm}
          >
            {{
              button: () => (
                <a-button ghost html-type="submit">
                  <Icon class="align-baseline" type="determine" />
                  确定
                </a-button>
              ),
            }}
          </Form>
        </Modal>
      </>
    );
  },
});
