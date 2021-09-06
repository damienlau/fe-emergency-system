<template>
  <div>穿梭框</div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "addBoxTransfer",
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
<style lang="less" scoped></style>
