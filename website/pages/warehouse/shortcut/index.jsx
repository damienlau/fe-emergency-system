// 一键操作

import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { Modal as AntModal } from "ant-design-vue";
import { Card, Form, Icon, Modal, Tabs } from "website/components";

export default defineComponent({
  setup() {
    const store = useStore();
    // 菜单配置项
    const menus = ref([
      {
        label: "借货清单",
        count: computed(
          () => store.state.warehouseModule.shortcutModule.totals.borrowCount
        ),
        key: "1",
      },
      {
        label: "维修清单",
        count: computed(
          () => store.state.warehouseModule.shortcutModule.totals.repairCount
        ),
        key: "2",
      },
      {
        label: "保养清单",
        count: computed(
          () => store.state.warehouseModule.shortcutModule.totals.maintainCount
        ),
        key: "3",
      },
    ]);
    // 菜单列表空状态
    const menuEmpty = ref(true);
    // 菜单当前激活值
    const menuActiveKey = ref(menus.value[0].key);
    // 卡片列表
    const cardData = ref([]);
    // 模态框表单配置项
    const formColumn = ref([
      {
        label: "事件",
        key: "event",
        type: "select",
        required: true,
      },
      {
        label: "借货人",
        key: "name",
        required: true,
      },
      {
        label: "借货人工号",
        key: "number",
        required: true,
      },
      {
        label: "联系电话",
        key: "phone",
        required: true,
      },
      {
        label: "借货科室",
        key: "department",
        type: "select",
        required: true,
      },
    ]);
    // 模态框表单数据
    const formData = ref({});
    // 模态框是否可见
    const visible = ref(false);

    // 监听点击标签页菜单按钮事件
    const handleClickTabExtra = () => {
      AntModal.confirm({
        class: "bg-navy-3 rounded pb-0 border border-primary",
        title: `确定要清空借货清单吗？`,
        content: `清空借货清单后，该清单内的物资将全部移出`,
        centered: true,
        onOk: () => {
          store
            .dispatch(
              "warehouseModule/shortcutModule/deleteSpecifiedShortcutCard",
              cardData.value.map((cardItem) => {
                return {
                  id: cardItem.key,
                };
              })
            )
            .then(() => {
              handleClickTabPane();
            });
        },
      });
    };

    // 监听点击标签页菜单事件
    const handleClickTabPane = (activeKey = menuActiveKey.value) => {
      menuActiveKey.value = activeKey;
      store
        .dispatch("warehouseModule/shortcutModule/findShortcutCards", activeKey)
        .then((response) => {
          cardData.value = response;
          menuEmpty.value = !response.length;
        });
    };

    // 监听点击卡片删除按钮事件
    const handleClickCardExtra = (activeKey) => {
      store
        .dispatch(
          "warehouseModule/shortcutModule/deleteSpecifiedShortcutCard",
          [{ id: activeKey }]
        )
        .then(() => {
          handleClickTabPane();
        });
    };

    // 监听模态框表单提交事件
    const handleSubmitForm = () => {
      console.log(formData.value);
      visible.value = !visible.value;
    };

    onMounted(() => {
      handleClickTabPane();
    });

    return () => (
      <>
        <Tabs
          v-model={[menuActiveKey.value, "activeKey"]}
          block
          columns={menus.value}
          empty={menuEmpty.value}
          onTabClick={handleClickTabPane}
          v-slots={{
            // 菜单附加操作区
            extra: () => (
              <a-space size={8}>
                <a-button ghost danger onClick={handleClickTabExtra}>
                  清空清单数据
                </a-button>
                <a-button
                  type="primary"
                  onClick={() => (visible.value = !visible.value)}
                >
                  一键操作
                </a-button>
              </a-space>
            ),
          }}
        >
          {/* 卡片容器 */}
          <section class="overflow-y-auto grid grid-cols-5 gap-16">
            {cardData.value.map((listItem) => {
              return (
                <Card title={listItem.label}>
                  {{
                    // 卡片自定义标题
                    title: () => (
                      <p class="text-16 font-medium">
                        <span>{listItem.label}</span>
                        {listItem.capacities && (
                          <span>
                            ({listItem.capacities[0]}/{listItem.capacities[1]})
                          </span>
                        )}
                      </p>
                    ),
                    // 卡片自定义附加操作区
                    extra: () => (
                      <a-popconfirm
                        title={`确认删除吗？`}
                        ok-text="删除"
                        cancel-text="取消"
                        placement="bottomRight"
                        onConfirm={() => handleClickCardExtra(listItem.key)}
                      >
                        <a-button
                          class="flex flex-row items-center p-0"
                          type="text"
                          danger
                          v-slots={{
                            icon: () => <Icon type="delete" />,
                          }}
                        >
                          移出
                        </a-button>
                      </a-popconfirm>
                    ),
                    default: () => (
                      <div class="flex flex-row">
                        <div class="flex-shrink-0 mr-16">
                          <a-image width={108} height={108}></a-image>
                        </div>
                        <div>
                          <p>
                            <span class="text-white text-opacity-70">
                              货架位置
                            </span>
                            <span class="text-16">{listItem.position}</span>
                          </p>
                          <p>
                            <span class="text-white text-opacity-70">类型</span>
                          </p>
                          <p>
                            <span class="text-white text-opacity-70">尺寸</span>
                          </p>
                          <p>
                            <span class="text-white text-opacity-70">
                              箱子编码
                            </span>
                          </p>
                        </div>
                      </div>
                    ),
                  }}
                </Card>
              );
            })}
          </section>
        </Tabs>
        {/* 模态框 */}
        <Modal
          v-model={[visible.value, "visible"]}
          size="heavy"
          title="请填写借货人信息"
        >
          {/* 模态框表单 */}
          <Form
            v-model={[formData.value, "model"]}
            columns={formColumn.value}
            onSubmit={handleSubmitForm}
          >
            {{
              button: () => (
                <a-button ghost html-type="submit">
                  <Icon class="align-baseline" type="save" />
                  保存
                </a-button>
              ),
            }}
          </Form>
        </Modal>
      </>
    );
  },
});
