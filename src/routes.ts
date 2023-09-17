import MainView from "./views/MainView.vue";
import NotFoundView from "./views/NotFoundView.vue";
import SearchView from "./views/SearchView.vue";

export const routes = [
  { path: "/", name: "mainView", component: MainView, meta: { title: "Main" } },

  {
    path: "/search",
    name: "searchView",
    component: SearchView,
    meta: { title: "Search Profile" },
  },

  {
    path: "/:pathMatch(.*)*",
    component: NotFoundView,
    meta: { title: "Page not found" },
  },
];
