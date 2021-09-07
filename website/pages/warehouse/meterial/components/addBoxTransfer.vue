<template>
  <div>
    <h1>穿梭框</h1>
    <div class="w-full h-full flex">
      <div class="flex-1">
        <a-layout class="border border-navy-1 addbox-layout">
          <a-layout-header class="border-b border-navy-1 w-full addbox-lay-head">
              未添加物资
          </a-layout-header>
          <a-layout-content class="h-full w-full addbox-lay-cont">
              <div class="bg-navy-1 addbox-con-part">
                单兵头盔
              </div>
              <div class="bg-navy-1 addbox-con-part">
                单兵头盔
              </div>
              <div class="bg-navy-1 addbox-con-part">
                单兵头盔
              </div>
              <div class="bg-navy-1 addbox-con-part">
                单兵头盔
              </div>
          </a-layout-content> 
        </a-layout>
      </div>
      <Icon
            style="font-size:40px;color:#0e518f;width:80px;"
            class="flex items-center justify-center"
            type="arrow-right-filling"
          />
      <div class="flex-1">
        <a-layout class="border border-navy-1 addbox-layout">
          <a-layout-header class="border-b border-navy-1 w-full addbox-lay-head">
              本次已添加物资
          </a-layout-header>
          <a-layout-content class="h-full w-full addbox-lay-cont">
              <div class="bg-navy-1 addbox-con-part">
                单兵头盔
              </div>
              <div class="bg-navy-1 addbox-con-part">
                单兵头盔
              </div>
              <div class="bg-navy-1 addbox-con-part">
                单兵头盔
              </div>
              <div class="bg-navy-1 addbox-con-part">
                单兵头盔
              </div>
          </a-layout-content> 
        </a-layout>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";
import {  Icon } from "components";
export default defineComponent({
  name: "addBoxTransfer",
  components: { Icon },
  setup() {
    const state = reactive({
      test: "",
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less" scoped>
.addbox-layout{
  width:360px; height:356px;
  .addbox-lay-head{
    background:none !important; 
    height:39px;
    line-height: 39px;
    text-align: center;
  }
  .addbox-lay-cont{
    width: 360px;
    height:315px;
    overflow-y:auto;        
  }
  .addbox-con-part{
    margin: 0 auto;
    width:272px;
    height:137px;
    margin-top:16px;
  }
}
</style>
