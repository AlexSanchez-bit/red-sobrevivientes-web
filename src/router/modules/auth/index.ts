export const authRoutes = [
  {
    path: "login",
    name: "auth.login",
    component: () => import("@/pages/Auth/Login.vue"),
  },
  {
    path: "register",
    name: "auth.register",
    component: () => import("@/pages/Auth/Register.vue"),
  },
];
