// 出/归仓扫描

import { defineComponent, onMounted, ref,watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Form, Icon, Modal } from "components";
import { message } from "ant-design-vue";
import exportimg from "assets/icon_scan_export.png";
import importimg from "assets/icon_scan_import.png";
import emergencyimg from "assets/icon_scan_emergency.png";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    // 扫描菜单配置项
    const menus = ref([
      {
        label: "出仓扫描",
        key: "Pending",
        icon: exportimg,
        badgeColor: "warning",
      },
      {
        label: "归仓扫描",
        key: "Belong",
        icon: importimg,
        badgeColor: "success",
      },
      {
        label: "紧急扫描",
        key: "Emergency",
        icon: emergencyimg,
        badgeColor: "danger",
      },
    ]);
    // 模态框表单配置项
    const formColumn = ref([
      {
        label: "事件",
        secondKey:"eventName",
        type: "select",
        name:"eventId",
        key: "EventId",
        options: [          
        ],
        labelSpan: 5,
        wrapperSpan: 16
      },
      {
        label: "借货人工号",
        name:"personnelJobNo",
        key: "PersonnelJobNo",
        labelSpan: 5,
        wrapperSpan:16
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
      var fdata = formdata
      if (!formdata.PersonnelJobNo || !formdata.EventId) {
        message.info('事件或工号不能为空')
        return
      }
      store
        .dispatch("warehouseModule/pendingModule/findSpecifiedShortcutList"
          , {
            eventId: formdata.EventId,
            personnelJobNo: formdata.PersonnelJobNo
          })
        .then((response) => {
          if (response.length != 0) {
            for (var resp = 0; resp < response.length; resp++){
              DetailSpecifiedShortcutList(response[resp].id,fdata)
            }              
          } else {
            message.info('无借货清单')
          }
      });             
    };

    //获取借货单明细
    const DetailSpecifiedShortcutList = (id, fdata) => {
      console.log(formData.value["key"])
      if (formData.value["key"] == "Pending") {
        store
          .dispatch("warehouseModule/pendingModule/findDetailSpecifiedShortcutList", { outFormId: id,status:1 })
          .then((res) => {
            if (res && res.length != 0) {
              sessionStorage.setItem("nameNo", JSON.stringify(fdata));
              visible.value = !visible.value;
              router.push({
                name: formData.value["key"]        
              });
            } else {
              message.info('无借货清单!')
            }
        })
      } else if (formData.value["key"] == "Belong") {
        store
          .dispatch("warehouseModule/pendingModule/findDetailSpecifiedShortcutList", { outFormId: id,status:2 })
          .then((res) => {
            if (res && res.length != 0) {
              sessionStorage.setItem("nameNo", JSON.stringify(fdata));
              visible.value = !visible.value;
              router.push({
                name: formData.value["key"]        
              });
            } else {
              message.info('无借货清单!')
            }
        })
      } else {
        message.info('紧急出仓入口')
      }
    }


    watch(visible, (lists) => {
      if (!lists) {        
        formData.value = '';
      }
    });

    onMounted(() => {
      // 获取表单选择框选项
      store.dispatch("warehouseModule/pendingModule/scannerInfoallData").then((response) => {
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
          <div class="w-3/5 h-2/5 grid grid-cols-3 gap-x-60">
            {menus.value.map((menuItem) => {
              return (
                // 扫描菜单-卡片
                <div
                  class="flex flex-col items-center justify-center bg-navy-2 hover:bg-navy-1 hover:cursor-pointer rounded text-16 text-center font-medium"
                  onClick={() => handleClickMenuItem(menuItem.key)}
                >
                  {/* 扫描菜单-卡片图标 */}
                  <img
                    src={menuItem.icon}
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
          <div class="flex-1 h-full overflow-hidden justify-center ">
          {/* pr-80 pl-80 */}
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

