import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
  },
  {
    path: "/home",
    component: () => import("@/views/home"),
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        component: () => import("@/views/welcome"),
      },
      {
        path: "/users",
        component: () => import("@/views/users"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});
// 全局守卫
router.beforeEach((to, from, next) => {
  // 如果用户访问'/login'直接放行
  if (to.path === "/login") return next();
  // 从vuex中获取token值
  const token = sessionStorage.getItem("token_dianshang");
  if (!token) return next("/login");
  next();
});

export default router;
