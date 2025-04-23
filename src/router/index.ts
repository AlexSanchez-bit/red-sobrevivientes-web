import { createRouter, createWebHistory } from "vue-router";
import { useSplashStore } from "@/stores/SplashScreen";
import DefaultLayout from "@/layouts/default.vue";

const router = createRouter({
  history: createWebHistory("#"),
  routes: [
    {
      path: "/",
      name: "home",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "home-view",
          component: () => import("@/pages/index.vue"),
        },
        {
          path: "/us",
          name: "about-us",
          component: () => import("@/components/AboutUs.vue"),
        },
        {
          path: "/map",
          name: "map",
          component: () => import("@/components/AgressionStadistics.vue"),
        },
        {
          path: "/blog/:id",
          name: "blog",
          component: () => import("@/pages/blog/[id].vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("@/pages/404.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { enable } = useSplashStore();
  enable();
  next();
});

router.afterEach((to, from) => {
  const { disable } = useSplashStore();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  disable();
});

export default router;
