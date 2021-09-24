// 出/归仓紧急扫描

import { defineComponent, onMounted,onUnmounted, ref,watch } from "vue";
import { useStore } from "vuex";
import {
  Modal as AntModal,
  message,
  ImagePreviewGroup,
  Image,
} from "ant-design-vue";
import { Form, Icon, Modal, Tabs, Empty,Card } from "components";
import emptyscanner from "assets/icon_empty_scanner.png";
import emptydata from "assets/icon_empty_data.png";
import emptysearch from "assets/icon_empty_search.png";

export default defineComponent({
  setup() {
    const store = useStore();
    // 待出仓标题及数据展示
    const pengdingDelivery = ref({
      label: "待出仓物资",
      type: "string",
      key: "pengding",
      data: [       
      ],
    });
    // 已出仓标题及数据展示
    const finishedDelivery = ref({
      label: "已出仓物资",
      type: "string",
      key: "finished",
      data: [          
      ],
    });
    //紧急出仓包装数据生成借货单
    const emergencyData = ref({
      eventId: "",
      eventName: "",
      personnelJobNo: "",
      outDetails:[]
    })
    //扫描出仓模态框是否可见
    const visible = ref(false);
    //类型
    const departType = ref(
      {
        1: "急救、重症",
        2: "门诊",
        3: "后勤",
        4: "指挥",
        5: "重症",
        6: "超声",
        7: "清创",
        8: "留观",
        9: "药房",
        10: "耗材",
        11: "手术",
        12: "防疫/隔离",
        13: "消毒",
        14: "住院",
        15: "检验",
      })
    //货架位置
    const departRack = ref(
      { 0: "未知" ,
       1: "一层（下）" ,
       2: "二层（中）" ,
       3: "三层（上）" ,
       4: "四层（顶）" }
    )
    //尺寸
    const departSize = ref(
      { 1: "一箱一桌(800x600x600)" ,
       2: "一箱两柜(1200x800x800)" ,
       3: "一箱一柜(1200x800x400)" ,
       4: " 其它箱子" }
    )
    //出仓列表
    const menus = ref([
      {
        label: "紧急清单物资",
        key: "1",
        count: 0,
        data: [],
      },
    ]);
    //只允许提交一次状态
    const saveStatus = ref(true);
    //归仓信息
    const goBackData = ref({});
    //扫描出仓模态框数据初始化
    const initPendingData = () => {
      menus.value[0].data = []      
      finishedDelivery.value.data.forEach((index, item, arr) => {
        if (arr[item].statusright == 0) {
          menus.value[0].data.push(index);
        } else {
          message.error('初始化并无数据')
        }
      });
      menus.value[0].count = menus.value[0].data.length; 
    }
    //扫描出仓模态框控制
    const handleClickPendingItem = () => {
      initPendingData();
      saveStatus.value = true;
      visible.value = !visible.value;
    };
    // 菜单列表当前激活值
    const menuActiveKey = ref(menus.value[0].key);
    // 卡片列表
    const cardData = ref([]);
    // 监听模态框关闭
    const handleSubmit = () => {
      visible.value = !visible.value;
    };
    //获取借货单outFrom
    const getOutFrom = ref();
    //非法物资数据缓存
    const getmenusArr = ref([]);
    //监听模态框出仓事件
    const handlePendingSubmit = () => {
      var savependingall = menus.value[0].data;
      console.log(savependingall)
      if (!savependingall || savependingall.length == 0) {
        message.error("暂无出仓物资")
        return
      }
      var asavefilter = savependingall.filter((a) => {
        return (a.resourceType == 1)
      })
      console.log(asavefilter)
      var asavependingall = asavefilter.map((item) => {       
        return {
          resourceType: item.resourceType,
          materialInfo: {
            id:item.id
          },          
        }
      })
      var bsavefilter = savependingall.filter((a) => {
        return (a.resourceType == 2)
      })
      var bsavependingall = bsavefilter.map((item) => {       
        return {
          resourceType: item.resourceType,
          warehouseBoxInfo: {
            id:item.id
          }
        }
      })        
      var newdata = asavependingall.concat(bsavependingall)
      var emergency = JSON.parse(sessionStorage.getItem("nameNo"))
      emergencyData.value.outDetails = newdata;
      emergencyData.value.eventId = emergency.EventId;
      emergencyData.value.eventName = emergency.eventName;
      emergencyData.value.personnelJobNo = emergency.PersonnelJobNo;
      console.log(emergencyData.value)
      AntModal.confirm({
        class: "bg-navy-3 rounded pb-0 border border-primary",
        title: `确定出仓？`,
        content: `出仓紧急扫描清单的全部物资`,
        centered: true,
        onOk: () => {
          saveemergen()             
        }
      })
    }
    //紧急出仓提交
    const saveemergen = () => {
      if (!saveStatus.value) {
        return;
      }
      saveStatus.value = false;
      store
      .dispatch(
        "warehouseModule/pendingModule/savetheEmergencyList",
        emergencyData.value                 
      )
      .then(() => {
        finishedDelivery.value.data =[]
        visible.value = !visible.value;
        message.success("出仓成功")
        //handleClickTabPane();
      });
    }
    //菜单列表切换数据展示
    const handleClickTabPane = ({ activeKey }) => {
      menuActiveKey.value = activeKey;
      cardData.value = [];
      switch (activeKey) {
        case "1":
          cardData.value = menus.value[0].data;
          break;
        default:
          break;
      }
    };
    //已出仓物资移除事件
    const handleClickDelete = (id) => {
      finishedDelivery.value.data.forEach((value, index, array) => {
        if (array[index].id == id) {
          finishedDelivery.value.data.splice(index, 1);
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
      cardData.value = menus.value[0].data;
    };
    //监听模态框全部移除事件
    const handleClickTabExtra = () => {
      AntModal.confirm({
        icon: <Icon type="shanjian" />,
        class: "bg-navy-3 rounded pb-0 border border-primary",
        title: `确定要全部移除吗？`,
        content: `移除紧急扫描清单的全部物资`,
        centered: true,
        onOk: () => {
          finishedDelivery.value.data = []
          initPendingData();      
          cardData.value = menus.value[0].data;
        }
      })
    }
    //全部仓库物资
    const outDetailAll = (ready) => {
      store
        .dispatch("warehouseModule/pendingModule/allmaterialPendingData",{materialCode:ready})
        .then((res) => {
          if (res.length == 0 || typeof (res) == undefined || !res) {
            message.error("没有找到该编号对应的箱子或物资");
          } else {
            Object.assign(res[0],{statusright:0},{resourceType:1})
            finishedDelivery.value.data.unshift(res[0]);
            console.log('在全部物资查找到该物资')
          }  
      })
    }
    //轮询比对数据
    const finddataready = (ready) => {
      var findready = ready;      
      store
      .dispatch("warehouseModule/pendingModule/allBoxinfoPendingData", { boxCode: findready })
      .then((res) => {
        if (!res||typeof(res)==undefined||res.length == 0) {
          outDetailAll(findready);
        } else {
          Object.assign(res[0],{statusright:0},{resourceType:2})
          finishedDelivery.value.data.unshift(res[0]);
          console.log('在全部仓库查找到该箱子')
        }                            
      })
    }
    
    //轮询待出仓扫描事件
    const timeId = ref();
    const clearInter = () => {
      clearInterval(timeId.value)
    }
    //轮询接口,读取扫描门
    const readerSweepGate = () => {
      store
        .dispatch("warehouseModule/pendingModule/sweepGateReaderData")
        .then((response) => {
          var readerdata = response;
          var readerdataSession = sessionStorage.getItem("readeremer");
          if (readerdata) {
            if (readerdataSession) {
              var sessionArr = readerdataSession.split(',')
              let listreader = readerdata.filter(items => {
                if (!sessionArr?.includes(items)) return items;
              })
              if (listreader.length != 0) {
                sessionArr = sessionArr.concat(listreader)
                sessionStorage.setItem('readeremer', sessionArr)
                console.log(listreader);
                console.log(sessionStorage.getItem('readeremer'))
                for (let i = 0; i < listreader.length; i++){
                  finddataready(listreader[i])
                }
              } else {
                //message.success('没有新增数据')
              }
            } else {
              sessionStorage.setItem('readeremer', readerdata)
              for (let k = 0; k < readerdata.length; k++) {
                  finddataready(readerdata[k])
              }
            }
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

    //初始化借货清单
    const initdata = () => {      
      var nameNo = JSON.parse(sessionStorage.getItem("nameNo"))
      console.log(nameNo)
      pengdingDelivery.value.data = [];
      openSweepGate();
      timeId.value = setInterval(() => {
        readerSweepGate();
      }, 5000)
    }
    watch(visible, (lists) => {
      console.log(lists)
      if (lists == true) {        
        clearInter()
      } else if(lists == false){
        timeId.value = setInterval(() => {
          readerSweepGate();
        }, 5000)
      }
    });
    onMounted(() => {
      //获取待出仓物资 
      initdata();
    });
    onUnmounted(() => {
      closeSweepGate()
      clearInter();
    })

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
                          description="当前待出仓扫描，无'申请清单'"
                          image={emptyscanner}
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
                                  listItem.resourceType == 1 ? (listItem.materialInfo?listItem.materialInfo.materialName:''):(listItem.warehouseBoxInfo?listItem.warehouseBoxInfo.boxName:'')
                                }
                                </span>
                                {
                                  listItem.resourceType == 2 ?  (
                                    <span class="text-success">
                                      {listItem.warehouseBoxInfo?("("+listItem.warehouseBoxInfo.materialRemainNumber+"/"+listItem.warehouseBoxInfo.materialTotalNumber+")"):''}
                                    </span>
                                  ):''
                                }                               
                              </div>
                            </div>
                            <div class="flex py-16 px-16">
                              <div class="h-modal-lightermin w-modal-lightermin ">
                              {listItem.resourceType == 1 && listItem.materialInfo.materialImages ? <img class="h-modal-lightermin w-modal-lightermin" src={listItem.materialInfo.materialImages[0].fileUrl} />
                                  : (listItem.resourceType == 2 && listItem.warehouseBoxInfo.boxImages ? <img class="h-modal-lightermin w-modal-lightermin" src={listItem.warehouseBoxInfo.boxImages[0].fileUrl} />
                                    :(
                                      <div class="flex items-center justify-center h-full">
                                      <div class="m-auto">
                                      <a-empty
                                        description="空空如也"
                                        image={emptydata}
                                      ></a-empty>
                                      </div>
                                      </div>
                                      ))
                                }
                              </div>
                              <div
                                class={
                                  !listItem.warehouseBoxInfo
                                    ? "flex items-center"
                                    : ""
                                }
                                class="bg-navy-4 ml-16 overflow-y-auto h-modal-lightermin flex-1  overflow-x-hidden"
                              >
                                {!listItem.warehouseBoxInfo?(
                                  <div class="m-auto">
                                    <a-empty
                                      description="空空如也"
                                      image={emptydata}
                                    ></a-empty>
                                  </div>
                                ) : (
                                  listItem.outDetailList.map((item, index) => {
                                    return (
                                      <>
                                        <div class="h-56 ml-16 mr-16 border-b border-navy-1  flex items-center">
                                          <span class="text-14 w-full overflow-hidden h-22">
                                            {item.materialInfo?item.materialInfo.materialName:''}
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
                          description="当前已出仓扫描，无'申请清单'"
                          image={emptyscanner}
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
                              class="mb-16 mr-8  h-modal-lightmin  ghost "
                            >
                              <div class="h-64 flex items-center justify-center text-white border-b border-navy-1 relative">
                                <div class="flex items-center justify-center">
                                  <span class="text-20">
                                  {
                                      listItem.resourceType == 1 ?
                                        (listItem.materialInfo ? listItem.materialInfo.materialName : listItem.materialName) :
                                        (listItem.warehouseBoxInfo ? listItem.warehouseBoxInfo.boxName : listItem.boxName)
                                    }
                                  </span>
                                  {
                                    listItem.resourceType == 2 ?  (
                                      <span class="text-success">
                                        {listItem.warehouseBoxInfo ?
                                          ("("+listItem.warehouseBoxInfo.materialRemainNumber + "/" + listItem.warehouseBoxInfo.materialTotalNumber+")") :
                                          (listItem.materialRemainNumber ?
                                            "("+listItem.materialRemainNumber + "/" + listItem.materialTotalNumber+")":'')}
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
                                  {listItem.resourceType == 1  ? <img class="h-modal-lightermin w-modal-lightermin" src={listItem.materialInfo?listItem.materialInfo.materialImages[0].fileUrl:(listItem.materialImages?listItem.materialImages[0].fileUrl:'')} />
                                  : (listItem.resourceType == 2  ? <img class="h-modal-lightermin w-modal-lightermin" src={listItem.warehouseBoxInfo?listItem.warehouseBoxInfo.boxImages[0].fileUrl:(listItem.boxImages?listItem.boxImages[0].fileUrl:'')} />
                                    :(
                                      <div class="flex items-center justify-center h-full">
                                      <div class="m-auto">
                                      <a-empty
                                        description="空空如也"
                                        image={emptydata}
                                      ></a-empty>
                                      </div>
                                      </div>
                                      ))
                                    }
                                    
                                  </div>
                                </div>
                                <div
                                  class={
                                    listItem.resourceType == 1
                                      ? "flex items-center"
                                      : ""
                                  }
                                  class="bg-navy-4 ml-16 overflow-y-auto h-modal-lightermin flex-1  overflow-x-hidden"
                                >
                                  {listItem.resourceType == 2&& listItem.outDetailList ? (
                                    listItem.outDetailList.map((ite, index) => {
                                      return (
                                        <>
                                          <div class="h-56 ml-16 mr-16 border-b border-navy-1  flex items-center">
                                            <span class="text-14 w-full overflow-hidden h-22">
                                            {ite.materialInfo?ite.materialInfo.materialName:(ite.materialName?ite.materialName:'')}
                                            </span>
                                          </div>
                                        </>
                                      );
                                    })
                                  ) : (
                                    <div class="m-auto">
                                      <a-empty
                                        description="空空如也"
                                        image={emptydata}
                                      ></a-empty>
                                    </div>
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
              onClick={handleClickTabPane}
              v-slots={{
                // 菜单附加操作区
                extra: () => (
                  <a-space size={8} >
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
                    image={emptydata}>
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
                              listItem.resourceType == 1 ? (listItem.materialInfo ? listItem.materialInfo.materialName : listItem.materialName) : (listItem.warehouseBoxInfo ? listItem.warehouseBoxInfo.boxName : listItem.boxName)                              
                            }
                            </span>
                            {
                              listItem.resourceType == 2 ?  (
                                <span class="text-success">
                                  {listItem.warehouseBoxInfo?("("+listItem.warehouseBoxInfo.materialRemainNumber+"/"+listItem.warehouseBoxInfo.materialTotalNumber+")"):("("+listItem.materialRemainNumber+"/"+listItem.materialTotalNumber+")")}                                      
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
                                  src={listItem.resourceType == 1 ? (listItem.materialInfo ?
                                    listItem.materialInfo.materialImages[0].fileUrl :
                                    (listItem.materialImages?listItem.materialImages[0].fileUrl:'')) :
                                    (listItem.warehouseBoxInfo ? listItem.warehouseBoxInfo.boxImages[0].fileUrl :
                                      (listItem.boxImages?listItem.boxImages[0].fileUrl:''))}
                                  fallback={emptysearch}
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
                                    listItem.resourceType == 1 ?
                                      (listItem.materialInfo ? departRack.value[listItem.materialInfo.rackPosition] :
                                        (listItem.rackPosition ? departRack.value[listItem.rackPosition] : '')) :
                                      (listItem.warehouseBoxInfo ? departRack.value[listItem.warehouseBoxInfo.rackPosition] :
                                        (listItem.rackPosition ? departRack.value[listItem.rackPosition] : ''))
                                  }                                 
                                </div>
                              </p>
                              <p class="flex">
                              <div class={listItem.resourceType == 1?"":"hidden"}
                                  style="white-space: nowrap;overflow: hidden;"
                                  class="overflow-ellipsis flex-1"
                                >
                                  {
                                     (listItem.materialInfo
                                      ? departType.value[listItem.materialInfo.departmentType] :
                                      departType.value[listItem.departmentType])
                                   }
                                </div>
                                <div class={listItem.resourceType == 2?"":"hidden"}
                                  style="white-space: nowrap;overflow: hidden;"
                                  class="overflow-ellipsis flex-1"
                                >
                                  {
                                    (listItem.warehouseBoxInfo
                                      ? departType.value[listItem.warehouseBoxInfo.departmentType] :
                                      departType.value[listItem.departmentType])
                                  }
                                </div>
                              </p>
                              <p class="flex">
                              <span class="text-white text-opacity-70">
                                  {
                                    listItem.resourceType == 1 ?"箱号:":"尺寸:"
                                  }
                                </span>
                                <div
                                  style="white-space: nowrap;overflow: hidden;"
                                  class="overflow-ellipsis flex-1"
                                >
                                  {
                                    listItem.resourceType == 2 ?
                                      (listItem.warehouseBoxInfo ? departSize.value[listItem.warehouseBoxInfo.size] : (listItem.size?departSize.value[listItem.size]:'')) :
                                      (listItem.materialInfo ? listItem.materialInfo.boxName : listItem.boxName)
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
                                    listItem.resourceType == 1 ? (listItem.materialInfo?listItem.materialInfo.boxCode:listItem.boxCode):(listItem.warehouseBoxInfo?listItem.warehouseBoxInfo.boxCode:listItem.boxCode)
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
            <a-button ghost html-type="submit" onClick={handlePendingSubmit}>
              确定出仓
            </a-button>
          </div>
        </Modal>      
      </>
    );
  },
});
