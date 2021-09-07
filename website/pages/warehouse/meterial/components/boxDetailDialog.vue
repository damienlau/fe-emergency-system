<template>
  <div class="content">
    <div class="btn" v-if="activeKey === 'init' && !isEditInit">
      <a-button type="text">撤销</a-button>
      <a-button type="text" danger>全部移除</a-button>
    </div>
    <a-tabs v-model:activeKey="activeKey" :animated="false">
      <a-tab-pane :key="'base'" tab="基本信息" class="overflow-y-auto">
        <Form
          v-if="loading"
          :columns="baseForm"
          :dataSource="dataSource"
          :edit="!isEditBase"
          @submit="handleSubmitBase"
        >
          <template #button>
            <a-popconfirm
              title="确认删除吗?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="handDelete(dataSource)"
            >
              <a-button
                type="primary"
                ghost
                class="flex flex-row items-center p-0 mr-3"
                danger
              >
                删除
              </a-button>
            </a-popconfirm>

            <a-button
              type="primary"
              ghost
              class="mr-3"
              v-if="isEditBase"
              @click="isEditBase = false"
              >编辑</a-button
            >
            <a-button
              type="primary"
              ghost
              class="flex flex-row items-center p-0 mr-3"
              htmlType="submit"
              v-if="!isEditBase"
              >保存</a-button
            >
          </template>
        </Form>
      </a-tab-pane>
      <a-tab-pane :key="'other'" tab="其他信息">
        <Form
          v-if="loading"
          :columns="otherForm"
          :dataSource="dataSource"
          :edit="!isEditOther"
          @submit="handleSubmitOther"
        >
          <template #button>
            <a-popconfirm
              title="确认删除吗?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="handDelete(dataSource)"
            >
              <a-button
                type="primary"
                ghost
                class="flex flex-row items-center p-0 mr-3"
                danger
              >
                删除
              </a-button>
            </a-popconfirm>
            <a-button
              type="primary"
              ghost
              class="mr-3"
              v-if="isEditOther"
              @click="isEditOther = false"
              >编辑</a-button
            >
            <a-button
              type="primary"
              ghost
              class="mr-3"
              htmlType="submit"
              v-if="!isEditOther"
              >保存</a-button
            >
          </template>
        </Form>
      </a-tab-pane>
      <a-tab-pane
        :key="'init'"
        :tab="'箱内物资' + ' (' + dataSource.materialTotalNumber + ')'"
      >
        <div class="box">
          <div class="addBox">
            <PlusOutlined :style="{ fontSize: '30px' }" />
            <span class="mt-20"> 添加物资</span>
          </div>
          <SmallBox
            v-for="(item, index) in boxList"
            :key="index"
            :boxInfo="item"
            :showDelete="!isEditInit"
            @click="chooseActive(item)"
            :class="item.active ? 'active' : 'unactive'"
          >
          </SmallBox>
        </div>
        <div class="footer">
          <a-popconfirm
            title="确认删除吗?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="handDelete(dataSource)"
          >
            <a-button
              type="primary"
              ghost
              v-if="isEditInit"
              class="flex flex-row items-center p-0 mr-3"
              danger
            >
              删除
            </a-button>
          </a-popconfirm>
          <a-button
            type="primary"
            ghost
            class="mr-3"
            v-if="isEditInit"
            @click="isEditInit = false"
            >编辑</a-button
          >
          <a-button type="primary" ghost class="mr-3" v-if="!isEditInit"
            >保存</a-button
          >
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
import {
  updateBoxData,
  findSpecifiedBoxData,
  deleteBoxInfoData,
  findBoxInfoAllData,
} from "api/warehouse/meterial";
import SmallBox from "./smallBox.vue";
import { Form } from "components";
import { PlusOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "boxDetailDialog",
  components: { Form, SmallBox, PlusOutlined },
  props: {
    id: Number,
    boxCode: String,
  },
  setup(props, ctx) {
    const state = reactive({
      activeKey: "base",
      isEditBase: true,
      isEditOther: true,
      isEditInit: true,
      dataSource: {},
      loading: true,
      boxList: [],
    });
    const baseForm = ref([
      {
        label: "箱子名称",
        key: "boxName",
        required: true,
      },
      {
        label: "箱子编码",
        key: "boxCode",
        required: false,
      },
      {
        label: "类型",
        key: "departmentType",
        type: "select",
        options: [
          {
            label: "急救/重症",
            key: 1,
          },
          {
            label: "门诊",
            key: 2,
          },
          {
            label: "后勤",
            key: 3,
          },

          {
            label: "指挥",
            key: 4,
          },
          {
            label: "重症",
            key: 5,
          },

          {
            label: "超声",
            key: 6,
          },
          {
            label: "清创",
            key: 7,
          },
          {
            label: "留观",
            key: 8,
          },
          {
            label: "药房",
            key: 9,
          },
          {
            label: "耗材",
            key: 10,
          },
          {
            label: "手术",
            key: 11,
          },
          {
            label: "防疫/隔离",
            key: 12,
          },
          {
            label: "消毒",
            key: 13,
          },
          {
            label: "住院",
            key: 14,
          },
          {
            label: "检验",
            key: 15,
          },
        ],
        required: false,
      },
      {
        label: "货架位置",
        key: "rackPosition",
        type: "select",
        options: [
          {
            label: "未知",
            key: 0,
          },
          {
            label: "一层(下)",
            key: 1,
          },
          {
            label: "二层(中)",
            key: 2,
          },
          {
            label: "三层(上)",
            key: 3,
          },
          {
            label: "四层(顶)",
            key: 4,
          },
        ],
        required: true,
      },
      {
        label: "尺寸",
        key: "size",
        type: "select",
        options: [
          {
            label: "一箱一桌(800 x 600 x 600)",
            key: 1,
          },
          {
            label: "一箱两柜(1200 x 800 x 800)",
            key: 2,
          },
          {
            label: "一箱一柜(1200 x 800 x 400)",
            key: 3,
          },
          {
            label: "其他箱子",
            key: 4,
          },
        ],
        required: false,
      },
      {
        label: "单位",
        key: "unit",
        required: false,
      },
      {
        label: "物资图片",
        key: "boxImages",
        type: "upload",
        required: true,
      },
    ]);
    const otherForm = ref([
      {
        label: "华西资产编码",
        key: "assetCode",
        required: true,
      },
      {
        label: "重量",
        key: "weight",
        required: false,
      },
      {
        label: "备注",
        key: "remark",
        type: "textArea",
        required: false,
      },
    ]);
    const initForm = ref([
      {
        label: "借货人",
        key: "personnelName",
        required: true,
      },
    ]);
    onMounted(() => {
      initData();
      initBoxList();
    });

    const handleSubmitBase = () => {
      updateBoxData(data).then((res) => {
        this.isEditBase = true;
        initData();
      });
    };
    const handleSubmitOther = (data) => {
      updateBoxData(data).then((res) => {
        this.isEditOther = true;
        initData();
      });
    };

    const handleSubmitInit = () => {
      console.log("ddddd");
    };
    const initData = () => {
      state.loading = false;
      findSpecifiedBoxData({ id: props.id }).then((res) => {
        state.dataSource = JSON.parse(JSON.stringify(res));
        state.loading = true;
      });
    };
    const initBoxList = () => {
      state.boxList = [];
      findBoxInfoAllData({ boxCode: props.boxCode }).then((res) => {
        state.boxList = res;
      });
    };
    const handDelete = (data) => {
      const id = data.id;
      deleteBoxInfoData(id).then((res) => {
        ctx.emit("close");
      });
    };
    const chooseActive = (item) => {
      if (state.isEditInit) return;
      state.boxList.map((box) => {
        if (box.boxCode === item.boxCode) {
          box.active = !box.active;
        }
      });
    };
    return {
      ...toRefs(state),
      baseForm,
      otherForm,
      initForm,
      handleSubmitBase,
      handleSubmitOther,
      handleSubmitInit,
      initData,
      handDelete,
      initBoxList,
      chooseActive,
    };
  },
});
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: 360px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  .addBox {
    width: 340px;
    height: 180px;
    background: #57799a;
    margin: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
.active {
  border: 2px solid #3290fc;
}
.unactive {
  border: none;
}
.content {
  width: 100%;
  height: 100%;
  position: relative;
  .btn {
    position: absolute;
    right: 20px;
    top: 18px;
    z-index: 999;
  }
  .footer {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
</style>
