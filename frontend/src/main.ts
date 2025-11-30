import { createApp } from 'vue';
import './index.css';
import App from './App.vue';
import { router } from './routes';
import toastPlugin from "@/plugins/toast";

const app = createApp(App);

app.use(toastPlugin);
app.use(router);
app.mount("#app");

