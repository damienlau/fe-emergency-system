import { defineComponent, PropType, onMounted, ref } from "@vue/runtime-core";
import { Popover, Tooltip } from "ant-design-vue";
import { boxRequestProps } from "api/warehouse/material/box";
import { findGoodsData, goodsRequestProps, findBoxDistinct } from "api/warehouse/material/goods";
import Images from "components/Images";
import { boxSize, boxStatus, departments, shelfPosition } from "config/enums";
import { useStore } from "vuex";
import classes from "./style.module.less";

export default defineComponent({
  name: "Box",
  props: {
    columns: {
      type: Object as PropType<boxRequestProps>,
      required: true,
    },
  },
  setup(props) {
    const popoverVisible = ref(false)
    const goodsList = ref<{inBoxMaterials: any, outBoxMaterials: any}>();
    const store = useStore();

    const handleGetGoodsLists = async (visible: boolean) => {
      popoverVisible.value = visible
      if (!visible) return

      const { data } = await findBoxDistinct({ boxCode: props.columns.boxCode })
      goodsList.value = data
    };

    const handleRemarkVisible = (val: boolean) => {
      popoverVisible.value = !val
    }

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
                <div class="grid grid-cols-3 gap-x-68 gap-y-8" style="color: #00C44A">
                  {
                    goodsList.value?.inBoxMaterials && Object.keys(goodsList.value?.inBoxMaterials).map((material) => {
                      return (
                        <p class="truncate text-16" style="display: flex;justify-content: space-between">
                          <span>{material}</span>
                          <span>x{goodsList.value?.inBoxMaterials[material]}</span>
                        </p>
                      )
                    })
                  }
                </div>
                <div class="grid grid-cols-3 gap-x-68 gap-y-8" style="color: #FF6061">
                  {
                    goodsList.value?.outBoxMaterials && Object.keys(goodsList.value?.outBoxMaterials).map((material) => {
                      return (
                        <p class="truncate text-16">
                          <span>{material}</span>
                          <span>{goodsList.value?.outBoxMaterials[material]}</span>
                        </p>
                      )
                    })
                  }
                </div>
              </div>
            </>
          ),
          default: () => (
            // Box Start
            <div class={classes.box}>
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

              <Tooltip placement="bottom" onVisibleChange={handleRemarkVisible}>
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
                <span class="bg-success px-8 py-4" style="white-space: nowrap;">
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
              </div>
            </div>
            // Box End
          ),
        }}
      </Popover>
    );
  },
});
