import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import User from "../views/User.vue";
import Tasks from "../views/Tasks.vue";
import Create from "../views/Create.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/user",
    name: "User",
    component: User,
    beforeEnter(to, from, next) {
      if (store.getters["auth/user"].token) {
        next();
      } else {
        next({
          name: "Home",
        });
      }
    },
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: Tasks,
    beforeEnter(to, from, next) {
      if (store.getters["auth/user"].token) {
        next();
      } else {
        next({
          name: "Home",
        });
      }
    },
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    beforeEnter(to, from, next) {
      if (store.getters["auth/user"].token) {
        next();
      } else {
        next({
          name: "Home",
        });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
