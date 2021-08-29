// 出/归仓扫描

import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { Form, Icon, Modal, Tabs, Empty } from "website/components";

export default defineComponent({
  setup() {
    const store = useStore();
    // 待出仓标题及数据展示
    const pengdingDelivery = ref({
      label: "待出仓物资",
      type: "string",
      key: "pengding",
      data: [
        {
          title: "测试标题",
          page: "（5/20）",
          url: "http://inews.gtimg.com/newsapp_bt/0/13924356038/641",
          content: [
            '单兵头盔1','单兵头盔2','单兵头盔3','单兵头盔4','单兵头盔5',
          ],
        }, 
        {
          title: "测试2",
          page: "（8/20）",
          url: "http://inews.gtimg.com/newsapp_bt/0/13924356038/641",
          content: [
            '头盔5','头盔6','头盔7','头盔8','头盔9','头盔1','头盔2','头盔3',
          ],
        }
      ]
    });
    // 已出仓标题及数据展示
    const finishedDelivery = ref({
      label: "已出仓物资",
      type: "string",
      key: "finished",
    });
    //扫描出仓模态框是否可见
    const visible = ref(false);
    //扫描出仓模态框控制
    const handleClickPendingItem = (activedItemkey) => {
      visible.value = !visible.value;
    };
    const titileColumn = ref([
      {
        label: "符合清单物资",
        key: "1",
        count: 5,
      },
      {
        label: "未符合清单物资",
        key: "2",
        count: 10,
      },
      {
        label: "未扫描到的物资",
        key: "3",
        count: 20,
      },
    ]);
    // 菜单列表空状态
    const menuEmpty = ref(true);
    // 菜单列表当前激活值
    const menuActiveKey = ref(titileColumn.value[0].key);
    // 监听模态框提交事件
    const handleSubmit = () => {
      visible.value = !visible.value;
    };    
    //菜单列表切换数据展示
    const handleClickTabPane = (activeKey = menuActiveKey.value) => {
      menuActiveKey.value = activeKey;
      if ( activeKey == 1) {       
      } else if (activeKey == 2) {        
      } else if (activeKey == 3) {        
      } 
    }
    //已出仓物资移除事件
    const handleClickDelete = () => {
      
    }
    onMounted(() => {
      // 获取待出仓物资
      //  store
      //    .dispatch("")
      //    .then((response) => {
      //      pengdingDelivery.value[0].options = response.map((option) => {
      //        return {
      //          key: option.id,
      // title: option.title,
      // page: option.page,
      //          url: option.url,
      // content: option.content,
      //        };
      //      });
      //    });
    });

    return () => (
      <>
        {/* 出仓扫描 */}
        <div class="h-full flex">
          {/* 出仓扫描-待出仓物资 */}
          <div class="flex-1">
            <a-layout class="h-full bg-navy-4">
              <a-layout-header class="h-64 bg-navy-4 flex items-center justify-center text-18 text-white border-b border-navy-1">
                <div>{pengdingDelivery.value.label}</div>
              </a-layout-header>
              <a-layout-content class="ml-16 h-full overflow-y-auto">
                <div class="mt-16">
                  {pengdingDelivery.value.data.map((listItem) => {
                    return (
                      <div class="mb-16 mr-8 bg-navy-2 h-modal-lightmin">
                        <div class="h-64 flex items-center justify-center text-white border-b border-navy-1">
                          <div class="flex items-center justify-center">
                            <span class="text-20">{ listItem.title}</span>
                            <span class="text-success">{ listItem.page}</span>
                          </div>
                        </div>
                        <div class="flex py-16 px-16">
                          <div class="h-modal-lightermin w-modal-lightermin bg-white">
                            <img class="h-modal-lightermin w-modal-lightermin" src={listItem.url}/>
                          </div>
                          <div class="bg-navy-4 ml-16 overflow-y-auto h-modal-lightermin flex-1">
                          {listItem.content.map((item,index) => {
                            return (
                                <div class="h-54 ml-16 mr-16 border-b border-navy-1  flex items-center">
                                  <span class="text-14 w-full overflow-hidden h-22">
                                    {item}
                                  </span> 
                                </div>
                              )
                            })}
                            </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </a-layout-content>
            </a-layout>
          </div>
          {/* 出仓扫描-图标箭头 */}
          <Icon
            style="font-size:76px;color:#0e518f;width:140px;"
            class="flex items-center justify-center"
            type="arrow-right-filling"
          />
          {/* 出仓扫描-已出仓物资 */}
          <div class="flex-1">
            <a-layout class="h-full bg-navy-4">
              <a-layout-header class="h-64 bg-navy-4 flex items-center justify-center text-18 text-white border-b border-navy-1 relative">
                <div>{finishedDelivery.value.label}</div>
                <div class="absolute right-5">
                    <a-button
                      type="primary"
                      onClick={() => handleClickPendingItem()}
                    >
                      扫描完成
                    </a-button>
                    {/* 卡片容器 */}
                </div>
              </a-layout-header>
              <a-layout-content class="ml-16 h-full overflow-y-auto">
                <div class="mt-16">

                  <div class=" mr-8  h-modal-lightmin border border-danger ghost bg-red-400 bg-opacity-10">
                    <div class="h-64 flex items-center justify-center text-white border-b border-navy-1 relative">
                      <div class="flex items-center justify-center">
                        <span class="text-20">川-后勤-001</span>
                        <a-space size={8} class="absolute right-5">
                          <a-button ghost danger >
                            <Icon type="delete" onClick="handleClickDelete"/>
                            移除
                          </a-button>                          
                        </a-space>
                      </div>
                    </div>
                    <div class="flex py-16 px-16">
                      <div class=" h-modal-lightermin w-modal-lightermin bg-white">
                        <img />
                      </div>
                      <div class="bg-navy-4 ml-16 overflow-y-auto h-modal-lightermin flex-1 flex items-center">
                          <div style="margin:0 auto;">
                          <a-empty
                            description="空空如也"
                            image={`assets/icon_empty_data.png`}>                          
                          </a-empty>
                          </div>
                      </div>
                    </div>
                  </div>
                  <span class="text-danger text-12 mb-16">该物资/箱子不属于本次借贷清单</span>
                  
                </div>
              </a-layout-content>
            </a-layout>
          </div>
        </div>
        {/* 扫描出仓模态框 */}
        <Modal          
          v-model={[visible.value, "visible"]}
          size="heavy"
          title="出仓扫描清单"
        >
            <Tabs
               v-model={[menuActiveKey.value, "activeKey"]}
               block
               columns={titileColumn.value}
               empty={menuEmpty.value}
               onClick={handleClickTabPane}
          >
            <span>
              {menuActiveKey.value}
            </span>
            <div>
              
            </div>
            </Tabs>
          <a-button ghost html-type="submit" onClick={handleSubmit}>
            返回扫描
          </a-button>

          <a-button ghost html-type="submit" onClick={handleSubmit}>
            确定出仓
          </a-button>
        </Modal>
      </>
    );
  },
});
