import MainView from "./views/MainView.vue";
import NotFoundView from "./views/NotFoundView.vue";

export const routes = [
  { path: "/", component: MainView, meta: { title: "Main" } },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundView,
    meta: { title: "Page not found" },
  },
];
