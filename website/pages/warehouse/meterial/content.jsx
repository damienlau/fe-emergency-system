import { defineComponent, ref, onUpdated } from "vue";
import Form from "components/Form/model";

export default defineComponent({
  name: "Content",
  setup() {
    const fromData1 = ref({});
    const formConfig1 = ref([
      {
        label: "姓名",
        key: "name",
      },
    ]);

    onUpdated(() => {});
    setTimeout(() => {
      console.log(fromData1.value);
    }, 5000);

    return () => (
      <>
        <Form formData={fromData1.value} columns={formConfig1.value}></Form>
      </>
    );
  },
});
