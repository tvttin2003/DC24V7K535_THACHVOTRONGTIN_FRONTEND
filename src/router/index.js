import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
    meta: { requiresAuth: true } // Yêu cầu phải đăng nhập
  },
  {
    path: "/contacts/add",
    name: "contact.add",
    component: () => import("@/views/ContactAdd.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("@/views/ContactEdit.vue"),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Lớp màng bảo vệ: Chặn không cho vào các trang danh bạ nếu chưa có userId trong localStorage
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("userId");
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next({ name: "login" });
  } else if ((to.name === "login" || to.name === "register") && isLoggedIn) {
    next({ name: "contactbook" }); // Đã đăng nhập thì không cho quay lại trang login
  } else {
    next();
  }
});

export default router;