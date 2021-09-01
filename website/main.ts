import { createApp } from "vue";
import App from "./App";
import Antd from "ant-design-vue";
import Router from "./router";
import Store from "./store";
import "./less/index.less";
import "./mock";

const app = createApp(App);

app.use(Antd);
app.use(Router);
app.use(Store);
app.mount("#dottmed");
