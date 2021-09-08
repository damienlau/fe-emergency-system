<template>
  <section class="w-full h-full">
    <Tabs :columns="tabsConfig">
      <Form :columns="formConfig"></Form>
    </Tabs>
  </section>
</template>

<script>
import Tabs from "components/Tabs";
import Form from "components/Form";
import { ref } from "vue";
export default {
  components: { Form, Tabs },
  setup() {
    const formData = ref(null);
    const tabsConfig = ref([
      { label: "第一", key: 1 },
      { label: "第二", key: 2 },
    ]);
    const formConfig = ref([
      { label: "第一", key: 1 },
      { label: "第二", key: 2 },
      {
        label: "第三",
        key: 3,
        type: "select",
        options: [
          { label: "第一", value: 1 },
          { label: "第二", value: 2 },
        ],
      },
    ]);

    return { formData, formConfig, tabsConfig };
  },
};
</script>
