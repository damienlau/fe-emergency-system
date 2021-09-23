import { defineComponent, PropType, onMounted, ref, nextTick } from "@vue/runtime-core";
import { Popover, Tooltip } from "ant-design-vue";
import { boxRequestProps } from "api/warehouse/material/box";
import { findGoodsData, goodsRequestProps, findBoxDistinct } from "api/warehouse/material/goods";
import { addShortcutData, deleteByFindData } from "api/warehouse/shortcut"
import Images from "components/Images";
import { boxSize, boxStatus, departments, shelfPosition, DepartmentTypeEnum, BoxStatusEnum, InBatchPendingStatus } from "config/enums";
import { emit } from "node:process";
import { useStore } from "vuex";
import classes from "./style.module.less";

export default defineComponent({
  name: "Box",
  props: {
    columns: {
      type: Object as PropType<boxRequestProps>,
      required: true,
    },
    layer: {
      type: String
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click', 'freshBoxList'],
  setup(props, { emit }) {
    const popoverVisible = ref(false)
    const goodsList = ref<{inBoxMaterials: any, outBoxMaterials: any}>();
    const goodsListLoaded = ref(false) // 记录物资内容是否已经加载过，加载过则不重新请求
    const store = useStore();

    // 科室类型选项
    const departmentChoices = ref([]) as any

    const handleGetGoodsLists = (visible: boolean) => {
      popoverVisible.value = visible
      if (!visible) return

      if (goodsListLoaded.value) return
      nextTick(async () => {
        const { data } = await findBoxDistinct({ boxCode: props.columns.boxCode })
        goodsList.value = data
        goodsListLoaded.value = true
      })
    };

    const handleRemarkVisible = (val: boolean) => {
      popoverVisible.value = !val
    }
    
    // 打开箱子详情弹窗
    const showRackBoxDetailDialog = () => {
      emit('click', props.columns)
    };

    const getBoxName = (departmentType: DepartmentTypeEnum) => {
      const choices = departmentChoices.value
      return choices.find((type: any) => type.value === departmentType).key
    }

    const StringIsNumber = (value: any) => isNaN(Number(value)) === false;

    const departmentEnumToArray = (enumme: any) => {
      return Object.keys(enumme)
          .filter(StringIsNumber)
          .map(key => {
            return {
              key: enumme[key],
              value: Number(key)
            }
          });
    }

    const boxClass = () => {
      if (!props.hover) return ''
      return classes['box-hover']
    }

    // 借出
    const outForm = () => {
      const params = {
        boxId: props.columns.id,
        operationType: 1,
        resourceType: 2
      }
      addShortcutData(params).then(() => {
        emit('freshBoxList')
      })
    }

    // 取消借出
    const cancelOut = () => {
      const params = {
        operationType: 1,
        resourceType: 2,
        boxId: props.columns.id,
      }
      deleteByFindData(params).then((res) => {
        if (res) { 
          emit('freshBoxList')
        }
      })
    }

    // 是否禁用借出按钮
    const outDisabled = () => {
      return props.columns.status !== BoxStatusEnum.inStock
    }

    onMounted(() => {
      departmentChoices.value = departmentEnumToArray(DepartmentTypeEnum)
    })

    return () => (
      <Popover
        overlayClassName="box-popover"
        arrowPointAtCenter
        placement="bottomRight"
        // trigger="click"
        onVisibleChange={handleGetGoodsLists}
        visible={popoverVisible.value}
      >
        {{
          content: () => (
            <>
              <div class="flex flex-row border-b border-navy-1 pb-16">
                <Images columns={props.columns.boxImages} />
                <div class="text-16 ml-12">
                  <p class="mb-8">
                    <span class="font-medium mr-8">
                      {props.columns.boxName}
                    </span>
                    <span
                      class={
                        props.columns.materialRemainNumber ===
                        props.columns.materialTotalNumber
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      （{props.columns.materialRemainNumber}/
                      {props.columns.materialTotalNumber}）
                    </span>
                    {props.columns.status === boxStatus.in && (
                      <div class="bg-success inline-block rounded-full text-12 px-12 ml-8">
                        在库
                      </div>
                    )}
                    {props.columns.status === boxStatus.out && (
                      <div class="bg-danger inline-block rounded-full text-12 px-12 ml-8">
                        已出仓
                      </div>
                    )}
                    {props.columns.status === boxStatus.pending && (
                      <div class="bg-warning inline-block rounded-full text-12 px-12 ml-8">
                        待出仓
                      </div>
                    )}
                  </p>
                  <p class="mb-8">
                    <span class="text-14 text-white text-opacity-70">
                      物资总量：
                    </span>
                    {props.columns.materialTotalNumber}
                  </p>
                  <p>
                    <span class="text-14 text-white text-opacity-70">
                      现有数量：
                    </span>
                    {props.columns.materialRemainNumber}
                  </p>
                </div>
              </div>
              <div class="border-b border-navy-1 py-16">
                <p class="text-white text-opacity-70 mb-8 flex flex-row justify-between">
                  货架位置：
                  <span class="text-16 text-white text-opacity-90">
                    {props.columns.rackNumber}号货架(
                    {shelfPosition[props.columns.rackPosition]})
                  </span>
                </p>
                <p class="text-white text-opacity-70 mb-8 flex flex-row justify-between">
                  科室：
                  <span class="text-16 text-white text-opacity-90">
                    {departments[props.columns.departmentType]}
                  </span>
                </p>
                <p class="text-white text-opacity-70 mb-8 flex flex-row justify-between">
                  尺寸：
                  <span class="text-16 text-white text-opacity-90">
                    {boxSize[props.columns.size]}
                  </span>
                </p>
                <p class="text-white text-opacity-70 flex flex-row justify-between">
                  箱子编码：
                  <span class="text-16 text-white text-opacity-90">
                    {props.columns.boxCode}
                  </span>
                </p>
              </div>
              <div class="py-16">
                <p class="text-16 text-white mb-16">箱内物资</p>
                <div class="grid grid-cols-3 gap-x-20 gap-y-8" style="color: #00C44A">
                  {
                    goodsList.value?.inBoxMaterials && Object.keys(goodsList.value?.inBoxMaterials).map((material) => {
                      return (
                        <p class="text-16" style="display: flex;justify-content: space-between">
                          {
                            material && <Tooltip overlayClassName="box-tooltip" placement="bottom">
                              {{
                                title: () => (
                                  <span>{material}</span>
                                ),
                                default: () => (
                                  <span class="truncate">
                                    {material}
                                  </span>
                                )
                              }}
                            </Tooltip>
                          }
                          <span>x{goodsList.value?.inBoxMaterials[material]}</span>
                        </p>
                      )
                    })
                  }
                </div>
                <div class="grid grid-cols-3 gap-x-20 gap-y-8" style="color: #FF6061">
                  {
                    goodsList.value?.outBoxMaterials && Object.keys(goodsList.value?.outBoxMaterials).map((material) => {
                      return (
                        <p class="text-16">
                          <span class="truncate">{material}</span>
                          <span>{goodsList.value?.outBoxMaterials[material]}</span>
                        </p>
                      )
                    })
                  }
                </div>
              </div>
              <div class="py-3 text-center">
                {
                  props.columns.inBatchPendingStatus === InBatchPendingStatus.normal && (
                    <a-button type="primary" disabled={outDisabled()} class="mr-20" onClick={outForm}>整箱借出</a-button>
                  )
                }
                {
                  props.columns.inBatchPendingStatus === InBatchPendingStatus.out && (
                    <a-button danger ghost class="mr-20" onClick={cancelOut}>取消借出</a-button>
                  )
                }
              </div>
            </>
          ),
          default: () => (
            // Box Start
            <div class={classes.box + ' ' + boxClass()} onClick={showRackBoxDetailDialog} data-layer={props.layer}>
              {/* Badge */}
              {props.columns.status === boxStatus.out && (
                <div class={classes['rack-out']}>
                  出
                </div>
              )}
              {props.columns.status === boxStatus.pending && (
                <div class={classes['rack-waiting']}>
                  待
                </div>
              )}

              <Tooltip overlayClassName="box-tooltip" placement="bottom" onVisibleChange={handleRemarkVisible}>
                {{
                  title: () => (
                    <span>{props.columns.remark}</span>
                  ),
                  default: () => (
                    <div class={classes['rack-remark']}>
                      {props.columns.remark && (
                        <div class={classes['rack-text']}>
                          注
                        </div>
                      )}
                    </div>
                  )
                }}
              </Tooltip>
              {/* Meta */}
              <div class="w-full h-full flex flex-col items-center justify-center">
                {
                  departmentChoices.value.length && <span class={classes[getBoxName(props.columns.departmentType as DepartmentTypeEnum)]} style="white-space: nowrap;padding: 4px 8px">
                    {props.columns.boxName}
                  </span>
                }
                <span
                  class={
                    props.columns.materialRemainNumber ===
                    props.columns.materialTotalNumber
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  （{props.columns.materialRemainNumber}/
                  {props.columns.materialTotalNumber}）
                </span>
              </div>
            </div>
            // Box End
          ),
        }}
      </Popover>
    );
  },
});
