import Vue from "vue";
import VueRouter from "vue-router";
//admin
import OC from "./views/admin/oc/Index.vue";
import Role from "./views/admin/role/Index.vue";
import OCUser from "./views/admin/ocUser/Index.vue";
import User from "./views/admin/user/Index.vue";

//client
import Project from "./views/admin/project/Index.vue";
import ProjectUser from "./views/admin/projectUser/Index.vue";
import Task from "./views/clients/Task.vue";
import History from "./views/clients/History.vue";
import Subscribe from "./views/clients/Subscribe.vue";

// auth
import Auth from "./views/shares/auth/Auth.vue";
import Login from "./views/shares/auth/Login.vue";

//dash
import Dash from "./views/shares/dash/Dash.vue";
import Home from "./views/shares/dash/Home.vue";

Vue.use(VueRouter);
const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      //HOME
      path: "/",
      component: Dash,
      redirect: "/home",

      children: [
        {
          path: "home",
          name: "Index",
          component: Home,
          meta: { requiresAuth: true }
        }
      ]
    },
    //adminoc
    {
      name: "OC",
      path: "/admin-oc",
      component: Dash,
      children: [
        { path: "/admin-oc", component: OC, meta: { requiresAuth: true } }
      ]
    },
    //adminrole
    {
      name: "Role",
      path: "/admin-role",
      component: Dash,
      children: [
        { path: "/admin-role", component: Role, meta: { requiresAuth: true } }
      ]
    },
    //adminocuser
    {
      path: "/admin-Oc-user",
      component: Dash,
      children: [
        {
          path: "/admin-Oc-user",
          name: "OC-User",
          component: OCUser,
          meta: { requiresAuth: true }
        }
      ]
    },
    //client-project-user
    {
      path: "/client-project-user",
      component: Dash,
      children: [
        {
          path: "/client-project-user",
          name: "Project-User",
          component: ProjectUser,
          meta: { requiresAuth: true }
        }
      ]
    },
    //adminuser
    {
      path: "/admin-user",
      component: Dash,
      name: "User",
      children: [
        { path: "/admin-user", component: User, meta: { requiresAuth: true } }
      ]
    },
    //adminproject
    {
      path: "/client-project",
      component: Dash,
      children: [
        {
          path: "/client-project",
          name: "Project",
          component: Project,
          meta: { requiresAuth: true }
        }
      ]
    },
    //Login
    {
      path: "/login",
      component: Auth,
      children: [{ path: "/login", component: Login }]
    },

    //client task
    {
      path: "/client-task",
      component: Dash,
      children: [
        {
          path: "/client-task",
          name: "Client-Task",
          component: Task,
          meta: { requiresAuth: true }
        }
      ]
    },
    //client-subscribe
    {
      path: "/client-subscribe",
      component: Dash,
      children: [
        {
          path: "/client-subscribe",
          name: "Client-Subscribe",
          component: Subscribe,
          meta: { requiresAuth: true }
        }
      ]
    },

    //client task
    {
      path: "/client-history",
      component: Dash,
      children: [
        {
          path: "/client-history",
          name: "Client-History",
          component: History,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
});

export default router;
