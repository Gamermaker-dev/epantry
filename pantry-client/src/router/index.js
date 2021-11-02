import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  // {
  //   path: "/contact",
  //   name: "Contact",
  //   component: () => 
  //     import(/* webpackChunkName: "contact" */ "../views/Contact.vue"),
  // },
  // {
  //   path: "/profile",
  //   name: "Profile",
  //   component: () =>
  //     import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
  // },
  // {
  //   path: "/pantry-admin/:group",
  //   name: "Admin",
  //   component: () =>
  //     import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
  // },
  // {
  //   path: "/category/:id",
  //   name: "Category",
  //   component: () =>
  //     import(/* webpackChunkName: "category" */ "../views/Category.vue"),
  // },
  // {
  //   path: "/color/:id",
  //   name: "Color",
  //   component: () =>
  //     import(/* webpackChunkName: "color" */ "../views/Color.vue"),
  // },
  // {
  //   path: "/condition/:id",
  //   name: "Condition",
  //   component: () =>
  //     import(/* webpackChunkName: "condition" */ "../views/Condition.vue"),
  // },
  // {
  //   path: "/gender/:id",
  //   name: "Gender",
  //   component: () =>
  //     import(/* webpackChunkName: "gender" */ "../views/Gender.vue"),
  // },
  // {
  //   path: "/group/:id",
  //   name: "Group",
  //   component: () =>
  //     import(/* webpackChunkName: "group" */ "../views/Group.vue"),
  // },
  // {
  //   path: "/permission/:id",
  //   name: "Permission",
  //   component: () =>
  //     import(/* webpackChunkName: "permission" */ "../views/Permission.vue"),
  // },
  // {
  //   path: "/school/:id",
  //   name: "School",
  //   component: () =>
  //     import(/* webpackChunkName: "school" */ "../views/School.vue"),
  // },
  // {
  //   path: "/size/:id",
  //   name: "Size",
  //   component: () =>
  //     import(/* webpackChunkName: "size" */ "../views/Size.vue"),
  // },
  // {
  //   path: "/user/:id",
  //   name: "User",
  //   component: () =>
  //     import(/* webpackChunkName: "user" */ "../views/User.vue"),
  // },
  // {
  //   path: "/verse/:id",
  //   name: "Verse",
  //   component: () =>
  //     import(/* webpackChunkName: "verse" */ "../views/Verse.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
