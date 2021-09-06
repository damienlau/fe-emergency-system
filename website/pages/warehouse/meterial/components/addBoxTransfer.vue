<template>
  <div></div>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
export default defineComponent({
  name: "addBoxTransfer",
  components: { Form },
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
