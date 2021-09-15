import { createApp } from "vue";
import App from "./App";
import Antd from "ant-design-vue";
import VueKonva from "vue3-konva";
import Router from "./router";
import Store from "./store";
import "./less/index.less";
import "./mock";

const app = createApp(App);

app.use(VueKonva);
app.use(Antd);
app.use(Router);
app.use(Store);
app.mount("#dottmed");
