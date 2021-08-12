import { createApp } from "vue";
import App from "./App";
import Router from "./router";
import "./global.less";

const app = createApp(App);

app.use(Router);
app.mount("#redstar");
