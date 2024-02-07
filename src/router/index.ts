import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "/",
    component: () =>
      import(
        "../views/3DEarch/EchartsEarth.vue"
      ),
  },
  {
    path: "/earth",
    name: "earth",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
       "../views/3DEarch/EchartsEarth.vue"
      ),
  },
  {
    path: "/china",
    name: "china",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        "../views/country/China.vue"
      ),
  },
  {
    path: "/province",
    name: "province",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        "../views/province/ChinaProvince.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
