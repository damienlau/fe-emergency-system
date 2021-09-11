// 出/归仓扫描

import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Form, Icon, Modal } from "components";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    // 扫描菜单配置项
    const menus = ref([
      {
        label: "出仓扫描",
        key: "Pending",
        icon: "export",
        badgeColor: "warning",
      },
      {
        label: "归仓扫描",
        key: "Belong",
        icon: "import",
        badgeColor: "success",
      },
      {
        label: "紧急扫描",
        key: "Emergency",
        icon: "emergency",
        badgeColor: "danger",
      },
    ]);
    // 模态框表单配置项
    const formColumn = ref([
      {
        label: "事件",
        type: "select",
        key: "eventId",
        options: [          
        ]
      },
      {
        label: "借货人工号",
        key: "personnelJobNo",
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
    const handleSubmitForm = (formdata) => {
      sessionStorage.setItem("nameNo", JSON.stringify(formdata));
      router.push({
        name: formData.value["key"],
        params: 
          { eventId: formdata.eventId ,personnelJobNo:formdata.personnelJobNo},        
      });
      visible.value = !visible.value;
    };

    //模态框右上角按钮
    const handleCancel = () => {
      visible.value = !visible.value;
    }

    onMounted(() => {
      // 获取表单选择框选项
      
      store
        .dispatch("taskModule/eventModule/findTaskEvents")
        .then((response) => {
          formColumn.value[0].options = response?.map((option) => {
            return {
              key: option.id,
              label: option.eventName,
            };            
          });
        });
    });

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
                    src={`website/assets/icon_scan_${menuItem.icon}.png`}
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
          onCancel={handleCancel}
        >
          {/* 扫描菜单-模态框表单 */}
          <div class="flex-1 h-full overflow-hidden justify-center">
          <Form
            v-model={[formData.value, "dataSource"]}
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
          </div>
        </Modal>
        <RouterView></RouterView>
      </>
    );
  },
});




