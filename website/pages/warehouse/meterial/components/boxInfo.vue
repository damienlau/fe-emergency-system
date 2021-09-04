<template>
  <a-card hoverable style="width: 240px">
    <div class="top">
      <a-image
        :width="100"
        :height="100"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
      <div>
        
      </div>
    </div>
  </a-card>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "SiderBar",
  setup() {
    const activeKey = ref("1");
    const searchValue = ref("");
    const search = () => {
      console.log(searchValue, "search");
    };
    return {
      activeKey,
      searchValue,
      search,
    };
  },
});
</script>
<style lang="less" scoped></style>
