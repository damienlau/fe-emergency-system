// 出/归仓扫描

import { defineComponent, onMounted,onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import {
  Modal as AntModal,
  message,
  ImagePreviewGroup,
  Image,
} from "ant-design-vue";
import { Form, Icon, Modal, Tabs, Empty, Card } from "components";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    // 待归仓标题及数据展示
    const pengdingDelivery = ref({
      label: "待归仓物资",
      type: "string",
      key: "pengding",
      data: [       
      ],
    });
    // 已归仓标题及数据展示
    const finishedDelivery = ref({
      label: "已归仓物资",
      type: "string",
      key: "finished",
      data: [          
      ],
    });
    //扫描归仓模态框是否可见
    const visible = ref(false);
    //轮询待归仓扫描事件按钮
    const sweepGateVisiable = ref(false);
    //类型
    const departType = ref([
      { "1": "急救、重症" },
      { "2": "门诊" },
      { "3": "后勤" },
      { "4": "指挥" },
      { "5": "重症" },
      { "6": "超声" },
      { "7": "清创" },
      { "8": "留观" },
      { "9": "药房" },
      { "10": "耗材" },
      { "11": "手术" },
      { "12": "防疫/隔离" },
      { "13": "消毒" },
      { "14": "住院" },
      { "15": "检验" },
    ])
    //归仓列表
    const menus = ref([
      {
        label: "符合清单物资",
        key: "1",
        count: 0,
        data: [],
      },
      {
        label: "未符合清单物资",
        key: "2",
        count: 0,
        data: [],
      },
      {
        label: "未扫描到的物资",
        key: "3",
        count: 0,
        data: [],
      },
    ]);
    //扫描归仓模态框数据初始化
    const initPendingData = () => {
      menus.value[0].data = []
      menus.value[1].data = []
      menus.value[2].data = []      
      finishedDelivery.value.data.forEach((index, item, arr) => {
        if (arr[item].statusright == 0) {
          menus.value[0].data.push(index);
        } else if (arr[item].statusright == 1) {
          menus.value[1].data.push(index);
        }
      });
      pengdingDelivery.value.data.forEach((index, item, arr) => {
        menus.value[2].data.push(index);
      });
      menus.value[0].count = menus.value[0].data.length;
      menus.value[1].count = menus.value[1].data.length;
      menus.value[2].count = menus.value[2].data.length; 
    }
    //扫描归仓模态框控制
    const handleClickPendingItem = () => {
      sweepGateVisiable.value = true;
      closeSweepGate()
      initPendingData();
      visible.value = !visible.value;
    };
    // 菜单列表空状态
    const menuEmpty = ref(true);
    // 菜单列表当前激活值
    const menuActiveKey = ref(menus.value[0].key);
    // 卡片列表
    const cardData = ref([]);
    // 监听模态框关闭
    const handleSubmit = () => {
      visible.value = !visible.value;
      openSweepGate()
      sweepGateVisiable.value = false;
    };
    const handleCancel = () => {
      visible.value = !visible.value;
      closeSweepGate()
      sweepGateVisiable.value = true;
    }
    //监听模态框归仓事件
    const handlePendingSubmit = () => {
      var savependingall = menus.value[0].data.concat(menus.value[1].data);
      var asavefilter = savependingall.filter((a) => {
        return (a.warehouseBoxInfo == null||''||undefined)
      })
      console.log(asavefilter)
      var asavependingall = asavefilter.map((item) => {       
        return {
          id: item.id,
          outFormId:item.outFormId,
          resourceType: item.resourceType,
          status:item.status,
          materialInfo:item.materialInfo,          
        }
      })
      var bsavefilter = savependingall.filter((a) => {
        return (a.materialInfo == null||''||undefined)
      })
      var bsavependingall = bsavefilter.map((item) => {       
        return {
          id: item.id,
          outFormId:item.outFormId,
          resourceType: item.resourceType,
          status:item.status,
          warehouseBoxInfo: item.warehouseBoxInfo,
          outDetailList:item.outDetailList
        }
      })
      var newdata = asavependingall.concat(bsavependingall)
      AntModal.confirm({
        class: "bg-navy-3 rounded pb-0 border border-primary",
        title: `确定归仓？`,
        content: `归仓符合清单和未符合清单的全部物资`,
        centered: true,
        onOk: () => {
          store
            .dispatch(
              "warehouseModule/pendingModule/returnSpecifiedShortcutList",
              newdata                 
            )
            .then(() => {
              finishedDelivery.value.data =[]
              visible.value = !visible.value;
              //handleClickTabPane();
            });                
        }
      })
    }
    //菜单列表切换数据展示
    const handleClickTabPane = ({ activeKey }) => {
      menuActiveKey.value = activeKey;
      cardData.value = [];
      switch (activeKey) {
        case "1":
          cardData.value = menus.value[0].data;
          menuEmpty.value = !cardData.value.length;
          break;
        case "2":
          cardData.value = menus.value[1].data;
          menuEmpty.value = !cardData.value.length;
          break;
        case "3":
          cardData.value = menus.value[2].data;
          menuEmpty.value = !cardData.value.length;
          break;
        default:
          break;
      }
    };
    //已归仓物资移除事件
    const handleClickDelete = (id) => {
      finishedDelivery.value.data.forEach((value, index, array) => {
        if (array[index].id == id) {
          finishedDelivery.value.data.splice(index, 1);
        }
      });
    };
    //扫描移动事件测试
    const handleMovePending = () => {
      pengdingDelivery.value.data.forEach((value, index, array) => {
        if (array[index].id == '25') {
          let addDeliveryData;
          addDeliveryData = array[index];
          pengdingDelivery.value.data.splice(index, 1);
          finishedDelivery.value.data.unshift(addDeliveryData);
        }
      });
    };
    // 监听点击卡片移除事件
    const handleClickCardExtra = (activeKey) => {
      finishedDelivery.value.data.forEach((value, index, array) => {
        if (array[index].id == activeKey) {
          finishedDelivery.value.data.splice(index,1)
        }
      })
      initPendingData();      
      cardData.value = menus.value[1].data;
    };
    //监听模态框全部移除事件
    const handleClickTabExtra = () => {
      AntModal.confirm({
        icon: <Icon type="shanjian" />,
        class: "bg-navy-3 rounded pb-0 border border-primary",
        title: `确定要全部移除吗？`,
        content: `移除未符合清单的全部物资`,
        centered: true,
        onOk: () => {
          finishedDelivery.value.data = finishedDelivery.value.data.filter((item) => {                        
            return item.statusright == 0;
          })
          initPendingData();      
          cardData.value = menus.value[1].data;
        }
      })
    }
    //获取借货单明细
    const DetailSpecifiedShortcutList = (id) => {
      store
        .dispatch("warehouseModule/pendingModule/findDetailSpecifiedShortcutList", { outFormId: id,status:1 })
        .then((res) => {
          pengdingDelivery.value.data = res.map((item) => {
            return Object.assign(item,{statusright:0})
          })
      })
    }
    //全部仓库物资
    const outDetailAll = (ready) => {
      store
        .dispatch("warehouseModule/pendingModule/allmaterialPendingData",{materialCode:ready})
        .then((res) => {
          if (res.length == 0 || typeof (res) == undefined) {
            message.error("没有找到该编号对应的箱子或物资");
          } else {
            res.statusright = 1;
            finishedDelivery.value.data.unshift(res);
            console.log('在全部物资查找到该物资')
          }  
      })
    }
    //轮询比对数据
    const finddataready = (ready) => {
      var findready = ready;
      pengdingDelivery.value.data.forEach((value, index, array) => {
        let addDeliveryData = array[index];
        if (array[index].warehouseBoxInfo &&
          array[index].warehouseBoxInfo.boxCode == findready) {
          pengdingDelivery.value.data.splice(index, 1);
          finishedDelivery.value.data.unshift(addDeliveryData);
          console.log('待归仓箱子对比成功')
        } else if (array[index].materialInfo &&
          array[index].materialInfo.materialCode == findready) {
          pengdingDelivery.value.data.splice(index, 1);
          finishedDelivery.value.data.unshift(addDeliveryData);
          console.log('待归仓物资对比成功')
        } else {
          console.log('左侧待归仓没有找到对应的编号物资或箱子')
        }
      });
      store
      .dispatch("warehouseModule/pendingModule/allBoxinfoPendingData", { boxCode: findready })
      .then((res) => {
        if (res.length==0||typeof(res)==undefined) {
          outDetailAll(findready);
        } else {
          res.statusright = 1;
          //Object.assign(res,{statusright:1})
          finishedDelivery.value.data.unshift(res);
          console.log('在全部仓库查找到该箱子')
        }                            
      })
    }
    
    //轮询待归仓扫描事件
    const timeId = ref();
    timeId.value = setInterval(() => {
      if (sweepGateVisiable.value == true) {
        clearInterval(timeId.value)
      } else {
        readerSweepGate();
      }      
    }, 30000)
    //轮询接口,读取扫描门
    const readerSweepGate = () => {
      store
        .dispatch("warehouseModule/pendingModule/sweepGateReaderData")
        .then((response) => {
          console.log(response)
          for (let i = 0; i < response.length; i++) {
            console.log(response[i])
             finddataready(response[i]) 
          }
        })
    }
    //开启扫描门
    const openSweepGate = () => {
      store
        .dispatch("warehouseModule/pendingModule/sweepGateOpenData")
        
    }
    //关闭扫描门
    const closeSweepGate = () => {
      store
        .dispatch('warehouseModule/pendingModule/sweepGateCloseData')
        
    }

    // 确定归仓模态框
    const visiblesecond = ref(false);
    // 确定归仓配置项
    const formColumn = ref([
      {
        label: "归还人",
        key: "personnelName",
      },
      {
        label: "归还人工号",
        key: "description",
      },
      {
        label: "联系电话",
        key: "personnelPhone",
      },
    ]);

    // 确定归仓表单卡片
    const handleClickMenuItem = () => {
      visiblesecond.value = !visiblesecond.value;
    };
    // 监听模态框表单提交事件
    const handleSubmitForm = (formData) => {
      handlePendingSubmit(formData);
    };
    onMounted(() => {
      //获取待归仓物资 
       store
         .dispatch("warehouseModule/pendingModule/findSpecifiedShortcutList",JSON.parse(sessionStorage.getItem("nameNo")) )
         .then((response) => {
          DetailSpecifiedShortcutList(response[0].id)
         });
      openSweepGate();
    });
    onUnmounted(() => {
      sweepGateVisiable.value = true;
      closeSweepGate();
    })

    return () => (
      <>
        {/* 归仓扫描 */}
        <div class="h-full flex">
          {/* 归仓扫描-待归仓物资 */}
          <div class="flex-1">
            <a-layout class="h-full bg-navy-4">
              <a-layout-header class="h-64 bg-navy-4 flex items-center justify-center text-18 text-white border-b border-navy-1">
                <div>{pengdingDelivery.value.label}</div>
              </a-layout-header>

              <a-layout-content class="ml-16 mr-16 h-full">
                <div class="relative inline-block w-full h-full">
                  <div
                    class={
                      pengdingDelivery.value.data.length == 0
                        ? "flex items-center"
                        : ""
                    }
                    class="mt-16 w-full absolute top-0 bottom-0 overflow-y-auto"
                  >
                    {pengdingDelivery.value.data.length == 0 ? (
                      <div class="m-auto">
                        <a-empty
                          description="当前待归仓扫描，无'申请清单'"
                          image={`/website/assets/icon_empty_scanner.png`}
                        ></a-empty>
                      </div>
                    ) : (
                      pengdingDelivery.value.data.map((listItem) => {
                        return (
                          <div class="mb-16 mr-8 bg-navy-2 h-modal-lightmin">
                            <div class="h-64 flex items-center justify-center text-white border-b border-navy-1">
                              <div class="flex items-center justify-center">
                                <span class="text-20">
                                {
                                  listItem.resourceType == 1 ? listItem.materialInfo.materialName:listItem.warehouseBoxInfo.materialName
                                }
                                </span>
                                {
                                  listItem.resourceType == 2 ?  (
                                    <span class="text-success">
                                      {listItem.warehouseBoxInfo.materialRemainNumber/listItem.warehouseBoxInfo.materialTotalNumber}                                      
                                    </span>
                                  ):''
                                }                                
                              </div>
                            </div>
                            <div class="flex py-16 px-16">
                              <div class="h-modal-lightermin w-modal-lightermin ">
                                {!listItem.url || typeof (listItem.url) ? (
                                  <div class="flex items-center justify-center h-full">
                                  <div class="m-auto">
                                    
                                  <a-empty
                                    description="空空如也"
                                    image={`/website/assets/icon_empty_data.png`}
                                  ></a-empty>
                                  </div>
                                  </div>
                                ) :<img class="h-modal-lightermin w-modal-lightermin" src={listItem.url}/>}
                                
                              </div>
                              <div
                                class={
                                  !listItem.warehouseBoxInfo||typeof(listItem.warehouseBoxInfo)==undefined
                                    ? "flex items-center"
                                    : ""
                                }
                                class="bg-navy-4 ml-16 overflow-y-auto h-modal-lightermin flex-1  overflow-x-hidden"
                              >
                                {!listItem.warehouseBoxInfo||typeof(listItem.warehouseBoxInfo)==undefined ? (
                                  <div class="m-auto">
                                    <a-empty
                                      description="空空如也"
                                      image={`/website/assets/icon_empty_data.png`}
                                    ></a-empty>
                                  </div>
                                ) : (
                                  listItem.outDetailList.map((item, index) => {
                                    return (
                                      <>
                                        <div class="h-54 ml-16 mr-16 border-b border-navy-1  flex items-center">
                                          <span class="text-14 w-full overflow-hidden h-22">
                                            {item.materialInfo.materialName}
                                          </span>
                                        </div>
                                      </>
                                    );
                                  })
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </a-layout-content>
            </a-layout>
          </div>
          {/* 归仓扫描-图标箭头 */}
          <Icon
            style="font-size:76px;color:#0e518f;width:140px;"
            class="flex items-center justify-center"
            type="arrow-right-filling"
          />
          {/* 归仓归描-已归仓物资 */}
          <div class="flex-1">
            <a-layout class="h-full bg-navy-4">
              <a-layout-header class="h-64 bg-navy-4 flex items-center justify-center text-18 text-white border-b border-navy-1 relative">
                <div>{finishedDelivery.value.label}</div>
                <div class="absolute right-5">
                  <a-button type="primary" onClick={() => handleMovePending()}>
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
                  <div
                    class={
                      finishedDelivery.value.data.length == 0
                        ? "flex items-center"
                        : ""
                    }
                    class="mt-16 w-full absolute top-0 bottom-0 overflow-y-auto"
                  >
                    {finishedDelivery.value.data.length == 0 ? (
                      <div class="m-auto">
                        <a-empty
                          description="当前已归仓扫描，无'申请清单'"
                          image={`/website/assets/icon_empty_scanner.png`}
                        ></a-empty>
                      </div>
                    ) : (
                      finishedDelivery.value.data.map((listItem) => {
                        return (
                          <>
                            <div
                              class={
                                listItem.statusright == 1
                                  ? "bg-red-400 border-danger border bg-opacity-10"
                                  : "bg-navy-2"
                              }
                              class="mb-18 mr-8  h-modal-lightmin   ghost "
                            >
                              <div class="h-64 flex items-center justify-center text-white border-b border-navy-1 relative">
                                <div class="flex items-center justify-center">
                                  <span class="text-20">
                                  {
                                    listItem.resourceType == 1 ? listItem.materialInfo.materialName:listItem.warehouseBoxInfo.materialName
                                  }
                                  </span>
                                  {
                                    listItem.resourceType == 2 ?  (
                                      <span class="text-success">
                                        {listItem.warehouseBoxInfo.materialRemainNumber/listItem.warehouseBoxInfo.materialTotalNumber}                                      
                                      </span>
                                    ):''
                                  }
                                  <a-space
                                    size={8}
                                    class={listItem.statusright == 1 ? "" : "hidden"}
                                    class="absolute right-5"
                                  >
                                    <a-button
                                      ghost
                                      danger
                                      onClick={() =>
                                        handleClickDelete(listItem.id)
                                      }
                                    >
                                      <Icon type="delete" />
                                      移除
                                    </a-button>
                                  </a-space>
                                </div>
                              </div>

                              <div class="flex py-16 px-16">
                                <div class="h-modal-lightermin w-modal-lightermin ">
                                  <div class="h-modal-lightermin w-modal-lightermin ">
                                    {!listItem.url || typeof (listItem.url) ? (
                                      <div class="flex items-center justify-center h-full">
                                      <div class="m-auto">
                                      <a-empty
                                        description="空空如也"
                                        image={`/website/assets/icon_empty_data.png`}
                                      ></a-empty>
                                      </div>
                                      </div>
                                    ) :<img class="h-modal-lightermin w-modal-lightermin" src={listItem.url}/>}
                                    
                                  </div>
                                </div>
                                <div
                                  class={
                                    !listItem.warehouseBoxInfo||typeof(listItem.warehouseBoxInfo)==undefined
                                      ? "flex items-center"
                                      : ""
                                  }
                                  class="bg-navy-4 ml-16 overflow-y-auto h-modal-lightermin flex-1  overflow-x-hidden"
                                >
                                  {!listItem.warehouseBoxInfo||typeof(listItem.warehouseBoxInfo)==undefined ? (
                                    <div class="m-auto">
                                      <a-empty
                                        description="空空如也"
                                        image={`/website/assets/icon_empty_data.png`}
                                      ></a-empty>
                                    </div>
                                  ) : (
                                    listItem.outDetailList.map((item, index) => {
                                      return (
                                        <>
                                          <div class="h-54 ml-16 mr-16 border-b border-navy-1  flex items-center">
                                            <span class="text-14 w-full overflow-hidden h-22">
                                              {item.materialInfo.materialName}
                                            </span>
                                          </div>
                                        </>
                                      );
                                    })
                                  )}
                                </div>
                              </div>
                              <div
                                class={listItem.statusright == 1 ? "" : "hidden"}
                                class="text-danger text-12 mb-16"
                              >
                                该物资/箱子不属于本次借货清单
                              </div>
                            </div>
                          </>
                        );
                      })
                    )}
                  </div>
                </div>
              </a-layout-content>
            </a-layout>
          </div>
        </div>
        {/* 扫描归仓模态框 */}
        <Modal
          v-model={[visible.value, "visible"]}
          size="heavy"
          title="归仓扫描清单"
          onCancel={handleCancel}
        >
            <Tabs
              v-model={[menuActiveKey.value, "activeKey"]}
              block
              columns={menus.value}
              onClick={handleClickTabPane}
              v-slots={{
                // 菜单附加操作区
                extra: () => (
                  <a-space size={8} class={menuActiveKey.value == '2'?'':'hidden'}>
                    <a-button ghost danger onClick={handleClickTabExtra}>
                      全部移除
                    </a-button>
                  </a-space>
                ),
              }}
            >
            {/* 卡片容器 */}
            <div class="flex flex-col overflow-auto h-full relative">
            <section class="overflow-y-auto grid grid-cols-3 gap-16 pr-10">
              <div class={cardData.value.length == 0?'':'hidden'} style="top:50%;left:50%;margin-left:-85px;margin-top:-50px;" class="absolute">
                  <a-empty                   
                    description="空空如也"
                    image={`/website/assets/icon_empty_data.png`}>
                  </a-empty>
                </div>
              {cardData.value.map((listItem) => {
                return (
                  <Card>
                    {{
                      // 卡片自定义标题
                      title: () => (
                        <p class="text-16 font-medium">
                          <span>
                            {
                              listItem.resourceType == 1 ? listItem.materialInfo.materialName:listItem.warehouseBoxInfo.materialName
                            }
                            </span>
                            {
                              listItem.resourceType == 2 ?  (
                                <span class="text-success">
                                  {listItem.warehouseBoxInfo.materialRemainNumber/listItem.warehouseBoxInfo.materialTotalNumber}                                      
                                </span>
                              ):''
                            }                          
                        </p>
                      ),
                      // 卡片自定义附加操作区
                      extra: () => (
                        <a-popconfirm
                          title={`确认删除吗？`}
                          ok-text="删除"
                          cancel-text="取消"
                          placement="bottomRight"
                          onConfirm={() => handleClickCardExtra(listItem.id)}
                        >
                            <a-button
                              class="flex flex-row items-center p-0"
                              type="text"
                              danger
                              class={listItem.statusright == 1 ? "" : "hidden"}
                            >
                              移除
                            </a-button>
                          </a-popconfirm>
                        ),
                        default: () => (
                          <div class="flex flex-row">
                            <div>
                              <ImagePreviewGroup>
                                <Image
                                  class="w-full h-full object-cover rounded"
                                  src={listItem.url}
                                  fallback="assets/icon_empty_search.png"
                                  width={88}
                                  height={88}
                                ></Image>
                              </ImagePreviewGroup>
                            </div>                   
                            <div class="flex-auto ml-6 size-12 overflow-hidden">
                              <p class="flex">
                                <div class="text-white text-opacity-70 ">
                                  货架位置:
                                </div>
                                <div
                                  style="white-space: nowrap;overflow: hidden;"
                                  class="overflow-ellipsis flex-1"
                                >
                                  {
                                    listItem.resourceType == 1 ? listItem.materialInfo.rackPosition:listItem.warehouseBoxInfo.rackPosition
                                  }                                 
                                </div>
                              </p>
                              <p class="flex">
                                <span class="text-white text-opacity-70">
                                  类型:
                                </span>
                                <div
                                  style="white-space: nowrap;overflow: hidden;"
                                  class="overflow-ellipsis flex-1"
                                >
                                  {
                                    listItem.resourceType == 1 ?
                                    departType[listItem.materialInfo.departmentType] :
                                    departType[listItem.warehouseBoxInfo.departmentType]
                                  }
                                </div>
                              </p>
                              <p class="flex">
                                <span class="text-white text-opacity-70">
                                  {
                                    listItem.resourceType == 1 ?"箱号:":"尺寸"
                                  }
                                </span>
                                <div
                                  style="white-space: nowrap;overflow: hidden;"
                                  class="overflow-ellipsis flex-1"
                                >
                                  {
                                    listItem.resourceType == 1 ? listItem.materialInfo.boxName:listItem.warehouseBoxInfo.size
                                  }
                                </div>
                              </p>
                              <p class="flex">
                                <span class="text-white text-opacity-70">
                                  箱子编码:
                                </span>
                                <div
                                  style="white-space: nowrap;overflow: hidden;"
                                  class="overflow-ellipsis flex-1"
                                >
                                  {
                                    listItem.resourceType == 1 ? listItem.materialInfo.boxCode:listItem.warehouseBoxInfo.boxCode
                                  }
                                </div>
                              </p>
                            </div>
                          </div>
                        ),
                      }}
                    </Card>
                  );
                })}
              </section>
            </div>
          </Tabs>
          <div class="absolute bottom-3 w-full text-center" style="left:0px;">
            <a-button class="mr-10" ghost html-type="submit" onClick={handleSubmit}>
              返回扫描
            </a-button>
            <a-button ghost html-type="submit" onClick={handleClickMenuItem}>
              确定归仓
            </a-button>
          </div>
        </Modal>
        <Modal
          v-model={[visiblesecond.value, "visible"]}
          size="lighter"
          title="归还人信息"          
        >
          <div class="flex-1 h-full overflow-hidden">
          {/* 扫描菜单-模态框表单 */}
          <Form columns={formColumn.value} onSubmit={handleSubmitForm}>
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
      </>
    );
  },
});