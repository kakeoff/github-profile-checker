import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import { routes } from "./routes";
import "./index.css";
import { createPinia } from "pinia";
import "@mdi/font/css/materialdesignicons.css";

const pinia = createPinia();
const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

app.use(router);
app.use(pinia);

app.mount("#app");
