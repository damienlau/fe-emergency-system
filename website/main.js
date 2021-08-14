import { createApp } from "vue";
import App from "./App";
import Antd from "ant-design-vue";
import Router from "./router";
import "../less/index.less";

const app = createApp(App);

app.use(Antd);
app.use(Router);
app.mount("#redstar");
