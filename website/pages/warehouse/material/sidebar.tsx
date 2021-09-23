import { defineComponent, ref } from "@vue/runtime-core";
import {
  Button,
  Col,
  Form,
  FormItem,
  Image,
  InputSearch,
  LayoutSider,
  Row,
  Select,
  SelectOption,
  Space,
} from "ant-design-vue";
import { Icon } from "components";
import Tabs, { tabPaneClickEventProps, tabPaneProps } from "components/Tabs";
import emptyImage from "assets/icon_empty_search.png";
import { departments } from "config/enums";
import { findGoodsData, goodsRequestProps } from "api/warehouse/material/goods";
import { boxRequestProps } from "api/warehouse/material/box";
import { AxiosResponse } from "axios";
import { responseProps } from "api/utils";
import Images from "components/Images";

export default defineComponent({
  setup() {
    const collapsed = ref(true);
    const tabColumns = ref([
      {
        label: "物资",
        key: "1",
        alias: "物资入库",
      },
      {
        label: "箱子",
        key: "2",
        alias: "新增箱子",
      },
    ]);
    const selectOptions = ref([
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
    ]);
    const selectedTabPane = ref<tabPaneProps>({});
    const searchForm = ref({});
    const cardData = ref<goodsRequestProps[] | boxRequestProps[]>([]);

    // 点击标签分页
    const handleClickTabPane = ({
      activeKey,
      item,
    }: tabPaneClickEventProps) => {
      selectedTabPane.value = item;
      console.log(activeKey, item);

      findGoodsData().then((response) => {
        cardData.value = response.content;
      });
    };

    // 点击搜索
    const handleSearch = (val) => {
      console.log(val);
    };

    // 点击卡片
    const handleClickCard = (event) => {
      if (event.target !== event.currentTarget) return;

      console.log(123);
    };

    return () => (
      <LayoutSider
        collapsed={collapsed.value}
        collapsedWidth={484}
        width="100%"
      >
        <div class="w-full h-full flex flex-col bg-navy-4 rounded">
          {/* Collapsed Button Start */}
          <Button
            class="text-12 text-left bg-navy-3 hover:bg-navy-2 flex items-center"
            block
            type="text"
            onClick={() => (collapsed.value = !collapsed.value)}
          >
            <Icon
              class="text-12"
              type={
                collapsed.value ? "arrow-double-left" : "arrow-double-right"
              }
            />
            {collapsed.value ? "查看更多" : "收起"}
          </Button>
          {/* Collapsed Button End */}
          <div class="flex-1 overflow-hidden">
            <Tabs
              center
              columns={tabColumns.value}
              onClick={handleClickTabPane}
            >
              <div class="h-full flex flex-col">
                <Row type="flex" justify="space-between" gutter={16}>
                  <Col flex={1}>
                    <Form
                      model={searchForm.value}
                      layout={!collapsed.value ? "inline" : "horizontal"}
                      wrapperCol={{ span: 24 }}
                    >
                      <FormItem>
                        {/* Search Input */}
                        <InputSearch
                          placeholder={`${selectedTabPane.value.label}搜索`}
                          onSearch={handleSearch}
                        ></InputSearch>
                      </FormItem>
                      {!collapsed.value && (
                        <FormItem label="类型">
                          {/* Select */}
                          <Select placeholder="全部">
                            {selectOptions.value.map((option) => {
                              return (
                                <SelectOption
                                  key={option.key}
                                  title={option.label}
                                >
                                  {option.label}
                                </SelectOption>
                              );
                            })}
                          </Select>
                        </FormItem>
                      )}
                    </Form>
                  </Col>
                  <Col>
                    <Button type="primary">
                      {selectedTabPane.value.alias}
                    </Button>
                  </Col>
                </Row>
                <div
                  class={
                    collapsed.value
                      ? "flex-1 grid grid-cols-1 gap-16 mt-24 overflow-y-auto"
                      : "flex-1 grid grid-cols-4 gap-16 mt-24 overflow-y-auto"
                  }
                >
                  {cardData.value.map((lists: goodsRequestProps) => {
                    return (
                      // Card Start
                      <div
                        class="bg-navy-2 hover:bg-navy-3 p-16 rounded"
                        onClick={handleClickCard}
                      >
                        {/* Body */}
                        <div class="flex flex-row border-b border-navy-1 pb-8">
                          {/* thumbnail */}
                          <Images
                            columns={lists.materialImages}
                            size={162}
                          ></Images>
                          {/* descriptions */}
                          <div class="my-8">
                            <div class="flex flex-row items-center">
                              <p class="text-16 font-medium">
                                {lists.materialName}
                              </p>
                              <span class="text-12 bg-success inline-block px-12 ml-8 rounded-full">
                                在库
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Footer */}
                        <div class="flex flex-row justify-between pt-8">
                          <Button type="primary">借货</Button>
                          <Space>
                            <Button ghost>维修</Button>
                            <Button ghost>保养</Button>
                          </Space>
                        </div>
                      </div>
                      // Card End
                    );
                  })}
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </LayoutSider>
    );
  },
});
