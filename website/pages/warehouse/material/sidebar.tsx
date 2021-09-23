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
                          <Select>
                            {
                              <SelectOption key="" title="">
                                {}
                              </SelectOption>
                            }
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
                <div class="flex-1">
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
                          {/* <Image
                            width={162}
                            height={162}
                            src={lists.materialImages}
                            fallback={emptyImage}
                          ></Image> */}
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
