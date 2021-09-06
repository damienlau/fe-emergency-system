import { computed, defineComponent, ref } from "vue";
import {
  Button,
  Image,
  ImagePreviewGroup,
  Modal as AModal,
  Popconfirm,
  Space,
} from "ant-design-vue";
import { useStore } from "vuex";
import defaultConfig from "config/defaultSettings";
import Form from "components/Form";
import Icon from "components/Icon";
import List from "components/List";
import Modal from "components/Modal";
import Tabs, { TabPaneProps } from "components/Tabs";


export default defineComponent({
  setup() {
    const { departments } = defaultConfig;
    const store = useStore();
    const tabColumns = ref([
      {
        label: "借货清单",
        key: "1",
        alias: "借出",
        count: computed(
          () => store.state.warehouseModule.shortcutModule.total.lend
        ),
        form: [
          {
            label: "事件",
            key: "eventId",
            type: "select",
            options: [],
            required: true,
          },
          {
            label: "借货人",
            key: "personnelName",
            required: true,
          },
          {
            label: "借货人工号",
            key: "personnelJobNo",
            required: true,
          },
          {
            label: "联系电话",
            key: "personnelPhone",
            required: true,
          },
          {
            label: "借货科室",
            key: "departmentType",
            type: "select",
            options: departments,
            required: true,
          },
        ],
      },
      {
        label: "维修清单",
        key: "2",
        alias: "维修",
        count: computed(
          () => store.state.warehouseModule.shortcutModule.total.repair
        ),
        form: [
          {
            label: "是否出仓",
            key: "operationType",
            type: "select",
            options: [
              { label: "在库", key: "0" },
              { label: "出库", key: "1" },
            ],
            required: true,
          },
          {
            label: "维修公司",
            key: "personnelCompany",
            required: true,
          },
          {
            label: "维修人",
            key: "personnelName",
            required: true,
          },
          {
            label: "联系电话",
            key: "personnelPhone",
            required: true,
          },
          {
            label: "维修事由",
            key: "description",
            required: true,
          },
        ],
      },
      {
        label: "保养清单",
        key: "3",
        alias: "保养",
        count: computed(
          () => store.state.warehouseModule.shortcutModule.total.maintain
        ),
        form: [
          {
            label: "是否出仓",
            key: "operationType",
            type: "select",
            options: [
              { label: "在库", key: "0" },
              { label: "出库", key: "1" },
            ],
            required: true,
          },
          {
            label: "保养公司",
            key: "personnelCompany",
            required: true,
          },
          {
            label: "保养人",
            key: "personnelName",
            required: true,
          },
          {
            label: "联系电话",
            key: "personnelPhone",
            required: true,
          },
          {
            label: "保养事由",
            key: "description",
            required: true,
          },
        ],
      },
    ]);
    const tabExtraOptions = ref<TabPaneProps>({});
    const cardListsData = ref<Data>({});
    const modalVisible = ref(false);

    const handleClickTabPane = ({ item }) => {
      tabExtraOptions.value = item;
      store
        .dispatch("warehouseModule/shortcutModule/getLists")
        .then((response) => {
          cardListsData.value = response;
        });
    };

    const handleConfirmOpertaion = () => {
      AModal.confirm({
        centered: true,
        icon: <Icon type="shanjian" />,
        title: `确定要清空${tabExtraOptions.value.label}吗？`,
        content: `点击清空${tabExtraOptions.value.label}后，该清单内的物资将全部移出`,
        cancelText: "取消",
        okText: `清空${tabExtraOptions.value.label}`,
        onOk: () => {
          handleDelete();
        },
      });
    };

    const handleVisibleDialog = () => {
      modalVisible.value = !modalVisible.value;
    };

    const handleDelete = (selected = cardListsData.value?.data) => {
      !Array.isArray(selected) && (selected = Array.of(selected));
      store.dispatch("warehouseModule/shortcutModule/removeLists", selected);
    };

    const handleSubmit = (formData) => {
      store
        .dispatch("warehouseModule/shortcutModule/setLists", formData)
        .then((response) => {
          handleVisibleDialog();
        });
    };

    return () => (
      <>
        <Tabs
          class="dark:bg-navy-4"
          columns={tabColumns.value}
          onClick={handleClickTabPane}
        >
          {{
            extra: () => {
              return (
                <Space>
                  <Button danger ghost onClick={handleConfirmOpertaion}>
                    清空{tabExtraOptions.value.label}
                  </Button>
                  <Button type="primary" onClick={handleVisibleDialog}>
                    全部{tabExtraOptions.value.alias}
                  </Button>
                </Space>
              );
            },
            default: () => (
              <List grid={5} class="h-full" dataSource={cardListsData.value}>
                {{
                  card: ({ item, index }) => (
                    <>
                      <section class="dark:bg-navy-2 dark:hover:bg-navy-3 rounded">
                        {/* Card Header Start */}
                        <div class="flex flex-row items-center justify-between py-8 border-b border-navy-1">
                          {/* title */}
                          <h3 class="flex flex-row text-16 pl-16 overflow-auto">
                            <span class="truncate">{item.label}</span>
                            {item.quantity && (
                              <span
                                class={
                                  item.quantity.total == item.quantity.remain
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                ({item.quantity.remain}/{item.quantity.total})
                              </span>
                            )}
                          </h3>
                          {/* extra */}
                          <Popconfirm
                            title={`移出${item.label}?`}
                            placement="bottomRight"
                            onConfirm={() => handleDelete(item)}
                          >
                            {{
                              icon: () => <Icon type="shanjian" />,
                              default: () => (
                                <Button danger type="text">
                                  <Icon class="align-baseline" type="delete" />
                                  移出
                                </Button>
                              ),
                            }}
                          </Popconfirm>
                        </div>
                        {/* Card Header End */}

                        {/* Card Body Start */}
                        <section class="flex flex-row p-16">
                          {/* thumbnail */}
                          <div>
                            <ImagePreviewGroup>
                              {item.thumbnail.map((image, key) => {
                                return (
                                  <div v-show={!key}>
                                    <Image
                                      class="w-full h-full object-cover rounded"
                                      src={image.fileUrl}
                                      fallback="/icon_empty_search.png"
                                      width={108}
                                      height={108}
                                    ></Image>
                                  </div>
                                );
                              })}
                            </ImagePreviewGroup>
                          </div>
                          {/* descriptions */}
                        </section>
                        {/* Card Body End */}
                      </section>
                    </>
                  ),
                }}
              </List>
            ),
          }}
        </Tabs>
        <Modal
          v-model={[modalVisible.value, "visible"]}
          title={`${tabExtraOptions.value.alias}信息`}
        >
          <Form columns={tabExtraOptions.value.form} onSubmit={handleSubmit}>
            {{
              button: () => (
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              ),
            }}
          </Form>
        </Modal>
      </>
    );
  },
});
