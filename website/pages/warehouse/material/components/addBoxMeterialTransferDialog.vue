<template>
  <div class="content">
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
              v-for="item in leftList"
              :materialInfo="item"
              :key="item.id"
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
              v-for="item in rightList"
              :materialInfo="item"
              :key="item.id"
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
      <a-button type="primary" @click="save" class="saveBtn">保存添加</a-button>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
import { Icon } from "components";
import TableSelect from "components/TableSelct/index.tsx";
import { findMaterialListData } from "api/warehouse/meterial";
import SmallMeterial from "./smallMeterial.vue";
import { message } from "ant-design-vue";

export default defineComponent({
  name: "addBoxTransfer",
  components: { Icon, TableSelect, SmallMeterial },
  setup(props, slot) {
    const img = ref("/website/assets/icon_empty_data.png");
    const leftList = ref([]);
    const rightList = ref([]);
    const tableSelctColum = ref([
      {
        key: "materialName",
        label: "名称查找",
        placeholder: "请输入物资名称",
      },
      {
        key: "materialCode",
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

      index: 0,
    });
    onMounted(() => {
      initLeftList();
    });
    const handSearch = () => {
      const search = state.tableSelectObj;
      initLeftList(search);
    };
    const onShowSizeChange = (current, pageSize) => {
      state.pagination.current = current;
      state.pagination.pageSize = pageSize;
      initLeftList();
    };
    const initLeftList = (search) => {
      const pageOrdersJSON = encodeURIComponent(
        `[{'direction':'desc','property':'id'}]`
      );
      const params = {
        currentPage: state.pagination.current,
        pageSize: state.pagination.pageSize,
        pageOrdersJSON: pageOrdersJSON,
        isBox: 0,
        status: 1,
        ...search,
      };
      leftList.value = [];
      findMaterialListData(params).then((res) => {
        state.pagination.total = res.data.totalNum;
        leftList.value = res.data.content;
      });
    };
    const handChoose = (item) => {
      leftList.value.splice(
        leftList.value.findIndex((val) => val.id === item.id),
        1
      );
      rightList.value.push(item);
    };
    const handDelete = (item) => {
      rightList.value.map((val, index) => {
        if (val.id === item.id) {
          rightList.value.splice(index, 1);
        }
      });
      leftList.value.push(item);
    };
    const save = () => {
      if (!rightList.value.length > 0) {
        message.warning("请添加", 1);
      }
      const idArr = [];
      rightList.value.map((item) => {
        idArr.push(item);
      });
      slot.emit("chooseMeterial", idArr);
    };
    return {
      ...toRefs(state),
      tableSelctColum,
      img,
      leftList,
      rightList,
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
.content {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .footer {
    width: 100%;
    height: 30px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
.addbox-layout {
  width: 360px;
  height: 350px;
  .addbox-lay-head {
    background: none !important;
    height: 35px;
    line-height: 35px;
    text-align: center;
  }
  .addbox-lay-cont {
    width: 360px;
    height: 315px;
    overflow-y: auto;
  }
}
</style>
