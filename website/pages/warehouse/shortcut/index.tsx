import { computed, defineComponent, ref } from "@vue/runtime-core";
import { Button, Modal as AntModal, Popconfirm, Space } from "ant-design-vue";
import { responseProps } from "api/utils";
import {
  addLendOutData,
  lendOutRequestProps,
} from "api/warehouse/material/lendout";
import { addMaintainData } from "api/warehouse/material/maintain";
import { maintainRequestProps } from "api/warehouse/material/maintain";
import { shortcutRequestProps } from "api/warehouse/shortcut";
import Form, { formItemProps } from "components/Form";
import Icon from "components/Icon";
import Images from "components/Images";
import List from "components/List";
import Modal from "components/Modal";
import Tabs, { tabPaneClickEventProps, tabPaneProps } from "components/Tabs";
import {
  boxSize,
  departments,
  materialType,
  shelfPosition,
} from "config/enums";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const tabColumns = ref([
      {
        label: "借货清单",
        key: "1",
        alias: "借出",
        count: computed(
          () => store.state.warehouseModule.shortcutModule.outNum
        ),
        form: [
          {
            label: "事件",
            key: "eventId",
            labelSpan: 4,
            secondKey: "eventName",
            type: "select",
            options: computed(() => store.state.taskModule.events),
          },
          {
            label: "借货人",
            key: "personnelName",
            labelSpan: 4,
          },
          {
            label: "借货人工号",
            key: "personnelJobNo",
            labelSpan: 4,
          },
          {
            label: "联系电话",
            key: "personnelPhone",
            labelSpan: 4,
          },
          {
            label: "借货科室",
            key: "departmentType",
            labelSpan: 4,
            type: "select",
            options: [
              { key: 1, label: "急救/重症" },
              { key: 2, label: "门诊" },
              { key: 3, label: "后勤" },
              { key: 4, label: "指挥" },
              { key: 5, label: "重症" },
              { key: 6, label: "超声" },
              { key: 7, label: "清创" },
              { key: 8, label: "留观" },
              { key: 9, label: "药房" },
              { key: 10, label: "耗材" },
              { key: 11, label: "手术" },
              { key: 12, label: "防疫/隔离" },
              { key: 13, label: "消毒" },
              { key: 14, label: "住院" },
              { key: 15, label: "检验" },
            ],
          },
        ],
      },
      {
        label: "维修清单",
        key: "2",
        alias: "维修",
        count: computed(
          () => store.state.warehouseModule.shortcutModule.weiXiuNum
        ),
        form: [
          {
            label: "是否出仓",
            key: "isOutWarehouse",
            type: "select",
            options: [
              { label: "在库", key: 0 },
              { label: "出库", key: 1 },
            ],
          },
          {
            label: "维修公司",
            labelSpan: 4,
            key: "personnelCompany",
          },
          {
            label: "维修人",
            labelSpan: 4,
            key: "personnelName",
          },
          {
            label: "联系电话",
            labelSpan: 4,
            key: "personnelPhone",
          },
          {
            label: "问题描述",
            labelSpan: 4,
            key: "description",
          },
        ],
      },
      {
        label: "保养清单",
        key: "3",
        alias: "保养",
        count: computed(
          () => store.state.warehouseModule.shortcutModule.baoYangNum
        ),
        form: [
          {
            label: "是否出仓",
            key: "isOutWarehouse",
            labelSpan: 4,
            type: "select",
            options: [
              { label: "在库", key: 0 },
              { label: "出库", key: 1 },
            ],
          },
          {
            label: "保养公司",
            labelSpan: 4,
            key: "personnelCompany",
          },
          {
            label: "保养人",
            labelSpan: 4,
            key: "personnelName",
          },
          {
            label: "联系电话",
            labelSpan: 4,
            key: "personnelPhone",
          },
          {
            label: "问题描述",
            labelSpan: 4,
            key: "description",
          },
        ],
      },
    ]);
    const selectedTabPane = ref<tabPaneProps>({});
    const shortcutData = ref<responseProps>({});
    const visible = ref(false);
    const store = useStore();

    // 点击标签页头
    const handleClickTabPane = ({
      activeKey,
      item,
    }: tabPaneClickEventProps) => {
      selectedTabPane.value = item;

      store
        .dispatch("warehouseModule/shortcutModule/getLists", {
          pageSize: selectedTabPane.value.count || 50,
          operationType: activeKey,
        })
        .then((response) => {
          shortcutData.value = response;
        });
    };

    // 点击全部删除
    const handleDelete = () => {
      AntModal.confirm({
        centered: true,
        icon: <Icon type="shanjian" />,
        title: `确定要清空${selectedTabPane.value?.label}吗？`,
        content: `点击清空${selectedTabPane.value?.label}后，该清单内的物资将全部移出`,
        cancelText: "取消",
        okText: `清空${selectedTabPane.value?.label}`,
        onOk: () => {
          store
            .dispatch(
              "warehouseModule/shortcutModule/removeLists",
              shortcutData.value?.content
            )
            .then(() => {
              handleClickTabPane({
                activeKey: selectedTabPane.value?.key,
                item: selectedTabPane.value,
              });
            });
        },
      });
    };

    // 点击全部操作
    const handleEditForm = (
      formData: lendOutRequestProps | maintainRequestProps
    ) => {
      if (selectedTabPane.value?.key == 1) {
        let params: lendOutRequestProps = {
          ...formData,
          batchPendingList: shortcutData.value
            ?.content as shortcutRequestProps[],
        };

        addLendOutData(params).then((response) => {
          visible.value = false;
          handleClickTabPane({
            activeKey: selectedTabPane.value?.key,
            item: selectedTabPane.value,
          });
        });
      } else {
        let params: maintainRequestProps = {
          ...formData,
          operationType: selectedTabPane.value?.key == 2 ? 2 : 1,
          detailList: shortcutData.value?.content?.map(
            (params: shortcutRequestProps) => {
              return {
                materialInfo: params.warehouseMaterialInfo,
              };
            }
          ),
        };

        addMaintainData(params).then((response) => {
          visible.value = false;
          handleClickTabPane({
            activeKey: selectedTabPane.value?.key,
            item: selectedTabPane.value,
          });
        });
      }
    };

    // 获取事件类型
    store.dispatch("taskModule/getEvents");

    return () => (
      <>
        <Tabs columns={tabColumns.value} onClick={handleClickTabPane}>
          {{
            default: () => (
              <List dataSource={shortcutData.value} grid={5}>
                {{
                  card: ({
                    item,
                  }: {
                    item: shortcutRequestProps | undefined;
                  }) => (
                    <section class="bg-navy-2 hover:bg-navy-3 rounded">
                      {/* Card Header Start */}
                      <div class="flex flex-row items-center justify-between py-8 border-b border-navy-1">
                        {/* title */}
                        <h3 class="flex flex-row text-16 pl-16 overflow-auto">
                          <span class="truncate">
                            {item?.resourceType === materialType.box
                              ? item?.warehouseBoxInfo?.boxName
                              : item?.warehouseMaterialInfo?.materialName}
                          </span>
                          {item?.resourceType === materialType.box && (
                            <span
                              class={
                                (item?.warehouseBoxInfo?.materialTotalNumber ||
                                  0) <
                                (item?.warehouseBoxInfo?.materialRemainNumber ||
                                  0)
                                  ? "text-danger"
                                  : "text-success"
                              }
                            >
                              ({item?.warehouseBoxInfo?.materialRemainNumber}/
                              {item?.warehouseBoxInfo?.materialTotalNumber})
                            </span>
                          )}
                        </h3>
                        {/* extra */}
                        <Popconfirm
                          title={`移出${
                            item?.resourceType === materialType.box
                              ? item?.warehouseBoxInfo?.boxName
                              : item?.warehouseMaterialInfo?.materialName
                          }?`}
                          placement="bottomRight"
                          onConfirm={() =>
                            store
                              .dispatch(
                                "warehouseModule/shortcutModule/removeLists",
                                Array.of(item)
                              )
                              .then((response) => {
                                handleClickTabPane({
                                  activeKey: selectedTabPane.value?.key,
                                  item: selectedTabPane.value,
                                });
                              })
                          }
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
                        <Images
                          columns={
                            item?.resourceType === materialType.box
                              ? item?.warehouseBoxInfo?.boxImages || []
                              : item?.warehouseMaterialInfo?.materialImages ||
                                []
                          }
                          size={108}
                        ></Images>
                        {/* descriptions */}
                        <div class="pl-16 overflow-hidden">
                          <p class="truncate mb-4">
                            货架位置：
                            {item?.resourceType === materialType.box
                              ? `${item?.warehouseBoxInfo?.rackNumber}号货架${
                                  shelfPosition[
                                    item?.warehouseBoxInfo?.rackPosition || 0
                                  ]
                                }`
                              : `${
                                  item?.warehouseMaterialInfo?.rackNumber
                                }号货架${
                                  shelfPosition[
                                    item?.warehouseMaterialInfo?.rackPosition ||
                                      0
                                  ]
                                }`}
                          </p>
                          <p class="truncate mb-4">
                            类型：
                            {item?.resourceType === materialType.box
                              ? `${
                                  departments[
                                    item?.warehouseBoxInfo?.departmentType || 0
                                  ]
                                }`
                              : `${
                                  departments[
                                    item?.warehouseMaterialInfo
                                      ?.departmentType || 0
                                  ]
                                }`}
                          </p>
                          <p class="truncate mb-4">
                            {item?.resourceType === materialType.box
                              ? `尺寸：`
                              : `箱号：`}
                            {item?.resourceType === materialType.box
                              ? `${boxSize[item?.warehouseBoxInfo?.size || 0]}`
                              : `${item?.warehouseMaterialInfo?.boxName}`}
                          </p>
                          <p class="truncate">
                            {item?.resourceType === materialType.box
                              ? `箱子编码：`
                              : `物资编码：`}
                            {item?.resourceType === materialType.box
                              ? item?.warehouseBoxInfo?.boxCode
                              : item?.warehouseMaterialInfo?.materialCode}
                          </p>
                        </div>
                      </section>
                      {/* Card Body End */}
                    </section>
                  ),
                }}
              </List>
            ),
            extra: () => (
              <Space>
                <Button danger ghost onClick={handleDelete}>
                  清空{selectedTabPane.value?.label}
                </Button>
                <Button type="primary" onClick={() => (visible.value = true)}>
                  全部{selectedTabPane.value?.alias}
                </Button>
              </Space>
            ),
          }}
        </Tabs>
        <Modal
          v-model={[visible.value, "visible"]}
          title={`${selectedTabPane.value?.alias}信息`}
        >
          <Form
            columns={selectedTabPane?.value?.form}
            onSubmit={handleEditForm}
          >
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
