<template>
  <section class="w-full h-full">
    <Tabs :columns="tabsConfig">
      <Form :formData="formData" :columns="formConfig" @submit="handleSubmit">
        <template #button>
          <button>ddsfs</button>
        </template>
      </Form>
    </Tabs>
  </section>
</template>

<script>
import Tabs from "components/Tabs";
import Form from "components/Form/model";
import { ref } from "vue";
export default {
  components: { Form, Tabs },
  setup() {
    const formData = ref({});
    const tabsConfig = ref([
      { label: "第一", key: 1 },
      { label: "第二", key: 2 },
    ]);
    const formConfig = ref([
      { label: "第一", key: 1, required: true },
      { label: "第二", key: 2, required: true },
      {
        label: "第三",
        key: 3,
        type: "select",
        required: true,
        options: [
          { label: "第一", key: 1 },
          { label: "第二", key: 2 },
        ],
      },
    ]);

    const handleSubmit = () => {
      console.log(formData.value);
    };

    return { formData, formConfig, tabsConfig, handleSubmit };
  },
};
</script>
