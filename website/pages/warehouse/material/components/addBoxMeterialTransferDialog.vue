<template>
  <div>
    <!-- <a-breadcrumb>
      <a-breadcrumb-item>新增箱子</a-breadcrumb-item>
      <a-breadcrumb-item>箱内物资</a-breadcrumb-item>
      <a-breadcrumb-item>添加物资</a-breadcrumb-item>
    </a-breadcrumb> -->
    <TableSelect
      v-model:model="tableSelectObj"
      :columns="tableSelctColum"
      @search="handSearch"
    ></TableSelect>
    <div class="w-full h-full flex">
      <div class="flex-1">
        <a-layout class="border border-navy-1 addbox-layout">
          <a-layout-header
            class="border-b border-navy-1 w-full addbox-lay-head"
          >
            未添加物资
          </a-layout-header>
          <a-layout-content class="h-full w-full addbox-lay-cont">
            <SmallMeterial
              class="mt-10"
              style="margin: 0 auto"
              v-for="(item, index) in leftList"
              :materialInfo="item"
              :key="index"
              :showAdd="true"
              @choose="handChoose(item)"
            ></SmallMeterial>
          </a-layout-content>
        </a-layout>
        <a-pagination
          class="mt-10"
          show-size-changer
          v-model:current="pagination.current"
          v-model:pageSize="pagination.pageSize"
          :total="pagination.total"
          @change="onShowSizeChange"
        />
      </div>
      <Icon
        style="font-size: 40px; color: #0e518f; width: 80px; cursor: pointer"
        class="flex items-center justify-center"
        type="arrow-right-filling"
      />
      <div class="flex-1">
        <a-layout class="border border-navy-1 addbox-layout">
          <a-layout-header
            class="border-b border-navy-1 w-full addbox-lay-head"
          >
            本次已添加物资
          </a-layout-header>
          <a-layout-content class="h-full w-full addbox-lay-cont">
            <SmallMeterial
              class="mt-10"
              style="margin: 0 auto"
              v-for="(item, index) in rightList"
              :materialInfo="item"
              :key="index"
              :showDelete="true"
              @delete="handDelete"
            ></SmallMeterial>

            <a-empty
              v-if="!rightList.length > 0"
              :description="'快去添加左侧的物资吧'"
              :image="img"
            ></a-empty>
          </a-layout-content>
        </a-layout>
      </div>
    </div>
    <div class="footer flex flex-row justify-center align-middle">
      <a-button type="primary" @click="save">保存添加</a-button>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
import { Icon } from "components";
import TableSelect from "components/TableSelct/index.jsx";
import { findMaterialListData } from "api/warehouse/meterial";
import SmallMeterial from "./smallMeterial.vue";
import { message } from "ant-design-vue";

export default defineComponent({
  name: "addBoxTransfer",
  components: { Icon, TableSelect, SmallMeterial },
  setup(props, slot) {
    const img = ref("/website/assets/icon_empty_data.png");
    const tableSelctColum = ref([
      {
        key: "personnelName",
        label: "名称查找",
        placeholder: "请输入物资名称",
      },
      {
        key: "materialName",
        label: "编码查找",
        placeholder: "请输入物资编码",
      },
    ]);
    const state = reactive({
      test: "",
      tableSelectObj: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      leftList: [],
      rightList: [],
      index: 0,
    });
    onMounted(() => {
      initLeftList();
    });
    const handSearch = () => {
      const search = state.tableSelectObj;
      // getDailyList(search);
      console.log(search);
    };
    const onShowSizeChange = (current, pageSize) => {
      state.pagination.current = current;
      state.pagination.pageSize = pageSize;
      initLeftList();
    };
    const initLeftList = (search) => {
      const params = {
        currentPage: state.pagination.current,
        pageSize: state.pagination.pageSize,
        isBox: 0,
        ...search,
      };
      state.leftList = [];
      findMaterialListData(params).then((res) => {
        state.pagination.total = res.data.totalNum;
        state.leftList = res.data.content;
      });
    };
    const handChoose = (item) => {
      state.index = 0;
      state.rightList.map((val) => {
        if (val.id === item.id) {
          state.index++;
        }
      });
      state.index === 0
        ? state.rightList.push(item)
        : message.warning("不能重复添加", 1);
    };
    const handDelete = (item) => {
      state.rightList.map((val, index) => {
        if (val.id === item.id) {
          state.rightList.splice(index, 1);
        }
      });
    };
    const save = () => {
      if (!state.rightList.length > 0) {
        message.warning("请添加", 1);
      }
      const idArr = [];
      state.rightList.map((item) => {
        idArr.push(item);
      });
      slot.emit("chooseMeterial", idArr);
    };
    return {
      ...toRefs(state),
      tableSelctColum,
      img,
      handSearch,
      onShowSizeChange,
      initLeftList,
      handChoose,
      handDelete,
      save,
    };
  },
});
</script>
<style lang="less" scoped>
.addbox-layout {
  width: 360px;
  height: 356px;
  .addbox-lay-head {
    background: none !important;
    height: 39px;
    line-height: 39px;
    text-align: center;
  }
  .addbox-lay-cont {
    width: 360px;
    height: 315px;
    overflow-y: auto;
  }
}
</style>
