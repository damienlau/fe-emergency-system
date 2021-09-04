// 出/归仓扫描

import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { Modal as AntModal,message } from "ant-design-vue";
import { Form, Icon, Modal, Tabs, Empty, Card } from "components";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    // 待出仓标题及数据展示
    const pengdingDelivery = ref({
      label: "待出仓物资",
      type: "string",
      key: "pengding",
      data: [
        {
          id:1,
          title: "测试数据标题",
          page: "（20/20）",
          url: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/d833c895d143ad4b28a09c6c86025aafa50f0694.jpg',
          content: [
            "物资名称1",
            "物资名称2",
            "物资名称3",
            "物资名称4",
            "物资名称5",
            "物资名称6",
            "物资名称7",
            "物资名称8"
          ],
        },
        {
          id:2,
          title: "测试数据标题单个物资",
          page: "",
          url: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/d833c895d143ad4b28a09c6c86025aafa50f0694.jpg',
          content: [
                 
          ],
        },
        {
          id:3,
          title: "测试数据标题移入右侧",
          page: "（20/20）",
          url: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/d833c895d143ad4b28a09c6c86025aafa50f0694.jpg',
          content: [
            "物资名称1",
            "物资名称2",
            "物资名称3",
            "物资名称4",
            "物资名称5",
            "物资名称6",
            "物资名称7",
            "物资名称8"
          ],
        } 
      ]
    });
    // 已出仓标题及数据展示
    const finishedDelivery = ref({
      label: "已出仓物资",
      type: "string",
      key: "finished",
      data: [
        {
          id:4,
          title: "测试数据标题",
          page: "（20/20）",
          status:0,
          url: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/d833c895d143ad4b28a09c6c86025aafa50f0694.jpg',
          content: [
            "物资名称1",
            "物资名称2",
            "物资名称3",
            "物资名称4",
            "物资名称5",
            "物资名称6",
            "物资名称7",
            "物资名称8"
          ],
        },
        {
          id:5,
          title: "测试数据标题单个物资",
          page: "",
          status:1,
          url: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/d833c895d143ad4b28a09c6c86025aafa50f0694.jpg',
          content: [
                 
          ],
        },
        {
          id:6,
          title: "测试数据标题",
          page: "（20/20）",
          status:1,
          url: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/d833c895d143ad4b28a09c6c86025aafa50f0694.jpg',
          content: [
            "物资名称1",
            "物资名称2",
            "物资名称3",
            "物资名称4",
            "物资名称5",
            "物资名称6",
            "物资名称7",
            "物资名称8"
          ],
        }
      ]
    });
    //扫描出仓模态框是否可见
    const visible = ref(false);
    //扫描出仓模态框控制
    const handleClickPendingItem = (activedItemkey) => {
      visible.value = !visible.value;
    };
    const menus = ref([
      {
        label: "符合清单物资",
        key: "1",
        count: 5,
        data: [                
        ]
      },
      {
        label: "未符合清单物资",
        key: "2",
        count: 10,
        data:[]
      },
      {
        label: "未扫描到的物资",
        key: "3",
        count: 20,
        data:[]
      },
    ]);
    // 菜单列表空状态
    const menuEmpty = ref(true);
    // 菜单列表当前激活值
    const menuActiveKey = ref(menus.value[0].key);
    //物资编码，用于查找需要移动的物资
    const rackNumber = ref(1);
    // 卡片列表
    const cardData = ref([]);
    // 监听模态框关闭
    const handleSubmit = () => {
      visible.value = !visible.value;
    };
    //监听模态框出仓事件
    const handlePendingSubmit = () => {
      AntModal.confirm({
        class: "bg-navy-3 rounded pb-0 border border-primary",
        title: `确定出仓？`,
        content: `出仓符合清单和未符合清单的全部物资`,
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
              visible.value = !visible.value;
              handleClickTabPane();
            });
        }
      })
    }
    //菜单列表切换数据展示
    const handleClickTabPane = (activeKey = menuActiveKey.value) => {
      menuActiveKey.value = activeKey;
      store
        .dispatch("warehouseModule/shortcutModule/findShortcutCards", activeKey)
        .then((response) => {
          cardData.value = response;
          menuEmpty.value = !response.length;
        });
    }
    //已出仓物资移除事件
    const handleClickDelete = (id) => {
      finishedDelivery.value.data.forEach((value,index,array) => {
        if (array[index].id == id) {
          finishedDelivery.value.data.splice(index,1)
        }
      })
    }
    //扫描移动事件测试
    const handleMovePending = () => {
      if (rackNumber.value > 3) {
        message.error('无物资待出仓')
        return;
      }
      pengdingDelivery.value.data.forEach((value, index, array) => {
        if (array[index].id == rackNumber.value) {
          let addDeliveryData;
          addDeliveryData = array[index];
          pengdingDelivery.value.data.splice(index, 1)
          finishedDelivery.value.data.unshift(addDeliveryData)
        }
      })
      rackNumber.value++;
    }
    // 监听点击卡片移除事件
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
    //监听模态框全部移除事件
    const handleClickTabExtra = () => {
      AntModal.confirm({
        class: "bg-navy-3 rounded pb-0 border border-primary",
        title: `确定要全部移除吗？`,
        content: `移除未符合清单的全部物资`,
        centered: true,
        onOk: () => {
          store
            .dispatch(
              "warehouseModule/shortcutModule/findSpecifiedShortcutList",
              cardData.value.map((cardItem) => {
                return {
                  id: cardItem.key,
                };
              })
            )
            .then(() => {
              handleClickTabPane();
            });
        }
      })
    }
    onMounted(() => {
      //获取待出仓物资
      //console.log(router.currentRoute.value.params)
      //  store
      //    .dispatch("warehouseModule/pendingModule/findSpecifiedShortcutList", router.currentRoute.value.params)
      //    .then((response) => {
      //      console.log(response)
      //      pengdingDelivery.value.data = response.content[0].warehouseBoxInfo.boxImages.map((item) => {
      //        return {
      //          title: item.newFileName,
      //          page: item.id,
      //          url: item.fileUrl,
      //          content: item.newFileName.split(""),               
      //        }
      //      });
      //      finishedDelivery.value.data = response.content[1].warehouseBoxInfo.boxImages.map((item) => {
      //       return {
      //         title: item.newFileName,
      //         page: item.id,
      //         url: item.fileUrl,
      //         content: item.newFileName.split(""),
      //         status:item.status
      //       }
      //      })
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

              <a-layout-content class="ml-16 mr-16 h-full">
                <div class="relative inline-block w-full h-full">
                  <div  class={pengdingDelivery.value.data.length == 0 ?'flex items-center':""} class="mt-16 w-full absolute top-0 bottom-0 overflow-y-auto">
                    
                    {pengdingDelivery.value.data.length == 0 ?
                      <div class="m-auto" >
                        <a-empty
                          description="当前待出仓扫描，无'申请清单'"
                          image={`/website/assets/icon_empty_scanner.png`}>                          
                        </a-empty>
                      </div>
                    : pengdingDelivery.value.data.map((listItem) => {
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
                            <div class={listItem.content.length == 0 ? 'flex items-center' : ""} class="bg-navy-4 ml-16 overflow-y-auto h-modal-lightermin flex-1  overflow-x-hidden">
                                {listItem.content.length == 0 ? (
                                  <div class="m-auto">
                                    <a-empty
                                      description="空空如也"
                                      image={`/website/assets/icon_empty_data.png`}>
                                    </a-empty>
                                  </div>
                                ) : listItem.content.map((item, index) => {
                                  return (
                                    <>
                                      <div class="h-54 ml-16 mr-16 border-b border-navy-1  flex items-center">
                                        <span class="text-14 w-full overflow-hidden h-22">
                                          {item}
                                        </span>
                                      </div>
                                    </>
                                  )
                                })}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    
                    </div>
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
          {/* 出仓归描-已归仓物资 */}
          <div class="flex-1">
            <a-layout class="h-full bg-navy-4">
              <a-layout-header class="h-64 bg-navy-4 flex items-center justify-center text-18 text-white border-b border-navy-1 relative">
                <div>{finishedDelivery.value.label}</div>
                <div class="absolute right-5">
                    <a-button
                      type="primary"
                      onClick={() => handleMovePending()}
                    >
                      扫描操作
                    </a-button>
                    <a-button
                      type="primary"
                      onClick={() => handleClickPendingItem()}
                    >
                      扫描完成
                    </a-button>
                    {/* 卡片容器 */}
                </div>
              </a-layout-header>
              <a-layout-content class="ml-16 mr-16 h-full">
                <div class="relative inline-block w-full h-full">
                  <div  class={finishedDelivery.value.data.length == 0 ?'flex items-center':""}  class="mt-16 w-full absolute top-0 bottom-0 overflow-y-auto">

                    {finishedDelivery.value.data.length == 0 ?
                      <div class="m-auto" >
                        <a-empty
                          description="当前已出仓扫描，无'申请清单'"
                          image={`/website/assets/icon_empty_scanner.png`}>
                        </a-empty>
                      </div>
                      :finishedDelivery.value.data.map((listItem) => {
                          return (
                            <>
                              <div class={listItem.status == 1 ? 'bg-red-400 border-danger border bg-opacity-10' : 'bg-navy-2'} class="mb-18 mr-8  h-modal-lightmin   ghost ">
                                <div class="h-64 flex items-center justify-center text-white border-b border-navy-1 relative">
                                  <div class="flex items-center justify-center">
                                    <span class="text-20">{listItem.title}</span>
                                    <span class="text-success">{listItem.page}</span>
                                    <a-space size={8} class={listItem.status == 1 ? '' : "hidden"} class="absolute right-5">
                                      <a-button ghost danger  onClick={()=> handleClickDelete(listItem.id)}>
                                        <Icon type="delete" />
                                        移除
                                      </a-button>
                                    </a-space>
                                  </div>
                                </div>
                                <div class="flex py-16 px-16">
                                  <div class="h-modal-lightermin w-modal-lightermin bg-white">
                                    <img class="h-modal-lightermin w-modal-lightermin" src={listItem.url} />
                                  </div>
                                  <div class={listItem.content.length == 0 ? 'flex items-center' : ""} class="bg-navy-4 ml-16 overflow-y-auto h-modal-lightermin flex-1  overflow-x-hidden">
                                    {listItem.content.length == 0 ? (
                                      <div class="m-auto">
                                        <a-empty
                                          description="空空如也"
                                          image={`/website/assets/icon_empty_data.png`}>
                                        </a-empty>
                                      </div>
                                    ) : listItem.content.map((item, index) => {
                                      return (
                                        <>
                                          <div class="h-54 ml-16 mr-16 border-b border-navy-1  flex items-center">
                                            <span class="text-14 w-full overflow-hidden h-22">
                                              {item}
                                            </span>
                                          </div>
                                        </>
                                      )
                                    })}
                                  </div>
                                </div>
                                <div class={listItem.status == 1 ? '' : "hidden"} class="text-danger text-12 mb-16">该物资/箱子不属于本次借贷清单</div>
                              </div>
                            </>
                          )
                        })                      
                    }                    
                  </div>
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
              columns={menus.value}
              empty={menuEmpty.value}
              onClick={handleClickTabPane}
              v-slots={{
                // 菜单附加操作区
                extra: () => (
                  <a-space size={8}>
                    <a-button ghost danger onClick={handleClickTabExtra}>
                      全部移除
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
          <div class="absolute bottom-5 w-full text-center" style="left:-22px;">
            <a-button class="mr-10" ghost html-type="submit" onClick={handleSubmit}>
              返回扫描
            </a-button>
            <a-button ghost html-type="submit" onClick={handlePendingSubmit}>
              确定出仓
            </a-button>
          </div>
        </Modal>
      </>
    );
  },
});
