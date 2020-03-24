import Vue from "vue";
import VueRouter from "vue-router";
//admin
import OC from "./views/admin/oc/Index.vue";
import Role from "./views/admin/role/Index.vue";
import OCUser from "./views/admin/ocUser/Index.vue";
import User from "./views/admin/user/Index.vue";

//client
import Project from "./views/clients/project/Index.vue";
import ProjectDetail from "./views/clients/project/Detail.vue";
import ProjectUser from "./views/clients/projectUser/Index.vue";
import ToDoList from "./views/clients/todolist/Index.vue";
import History from "./views/clients/history/Index.vue";
import Follow from "./views/clients/follow/Index.vue";
import Chat from "./views/clients/chat/index.vue";
import Photo from "./views/clients/photo/Index.vue";
import RoutineJob from "./views/clients/routine-job/Index.vue";
import Abnormal from "./views/clients/abnormal/Index.vue";
import Tutorial from "./views/clients/tutorial/Index.vue";

import Notification from "./views/clients/notification/Index.vue";

import Profile from "./views/shares/dash/Profile.vue";
import PageNotFound from "./views/404/Index.vue";


// auth
import Auth from "./views/shares/auth/Auth.vue";
import Login from "./views/shares/auth/Login.vue";

//dash
import Dash from "./views/shares/dash/Dashboard.vue";
import Home from "./views/shares/dash/Home.vue";

Vue.use(VueRouter);
const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      //HOME
      path: "/",
      component: Dash,
      redirect: "/todolist",

      children: [
        {
          path: "/todolist",
          name: "To Do List",
          component: ToDoList,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      //HOME
      path: "/dashboard-admin",
      component: Dash,
      redirect: "/dashboard-admin",

      children: [
        {
          path: "/dashboard-admin",
          name: "Dashboard Admin",
          component: Home,
          meta: { requiresAuth: true }
        }
      ]
    },
    //adminoc
    {
      name: "profile",
      path: "/profile",
      component: Profile,
      children: [
        {
          path: "/profile",
          name: "profile",
          component: Profile,
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
        {
          path: "/admin-oc",
          name: "OC",
          component: OC,
          meta: { requiresAuth: true }
        }
      ]
    },
    //adminrole
    {
      path: "/admin-role",
      component: Dash,
      children: [
        {
          path: "/admin-role",
          name: "Role",
          component: Role,
          meta: { requiresAuth: true }
        }
      ]
    },
    //adminocuser
    {
      path: "/admin-oc-user",
      component: Dash,
      children: [
        {
          path: "/admin-oc-user",
          name: "OC User",
          component: OCUser,
          meta: { requiresAuth: true }
        }
      ]
    },

    //adminuser
    {
      path: "/admin-user",
      component: Dash,

      children: [
        {
          path: "/admin-user",
          name: "User",
          component: User,
          meta: { requiresAuth: true }
        }
      ]
    },
    //adminproject
    {
      path: "/project",
      component: Dash,
      children: [
        {
          path: "/project",
          name: "Project",
          component: Project,
          meta: { requiresAuth: true }
        },
        {
          path: "/project-detail/:id",
          name: "Project Detail",
          component: ProjectDetail,
          meta: { requiresAuth: true }
        }
      ]
    },
    //client-project-user
    {
      path: "/project-user",
      component: Dash,
      children: [
        {
          path: "/project-user",
          name: "Project User",
          component: ProjectUser,
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
      path: "/",
      component: Dash,
      children: [
        {
          path: "/todolist",
          name: "To Do List",
          component: ToDoList,
          meta: { requiresAuth: true }
        },
        {
          path: "/todolist/:jobname",
          name: "To Do List Search",
          component: ToDoList,
          meta: { requiresAuth: true }
        },
        {
          path: "/todolist-comment/:taskid/:jobname",
          name: "To Do List Comment",
          component: ToDoList,
          meta: { requiresAuth: true }
        }
      ]
    },
    //client-Follow
    {
      path: "/follow",
      component: Dash,
      children: [
        {
          path: "/follow",
          name: "Follow",
          component: Follow,
          meta: { requiresAuth: true }
        },
        {
          path: "/follow/:jobname",
          name: "Follow Search",
          component: Follow,
          meta: { requiresAuth: true }
        }
      ]
    },

    //client task
    {
      path: "/history",
      component: Dash,
      children: [
        {
          path: "/history",
          name: "History",
          component: History,
          meta: { requiresAuth: true }
        },
        {
          path: "/history/:jobname",
          name: "History Search",
          component: History,
          meta: { requiresAuth: true }
        }
      ]
    },
    //client notification
    {
      path: "/notification",
      component: Dash,
      children: [
        {
          path: "/notification",
          name: "Notification",
          component: Notification,
          meta: { requiresAuth: true }
        }
      ]
    },
    //client tutorial
    {
      path: "/tutorial",
      component: Dash,
      children: [
        {
          path: "/tutorial/:id",
          name: "Tutorial",
          component: Tutorial,
          meta: { requiresAuth: true }
        }
      ]
    },
    //client chat
    {
      path: "/client-chat",
      component: Dash,
      children: [
        {
          path: "/client-chat",
          name: "Chat Group",
          component: Chat,
          meta: { requiresAuth: true }
        }
      ]
    },
    //client RoutineJob
    {
      path: "/routine",
      component: Dash,
      children: [
        {
          path: "/routine",
          name: "Routine Job",
          component: RoutineJob,
          meta: { requiresAuth: true }
        }
      ]
    },
    //client Abnormal
    {
      path: "/abnormal",
      component: Dash,
      children: [
        {
          path: "/abnormal",
          name: "Abnormal",
          component: Abnormal,
          meta: { requiresAuth: true }
        }
      ]
    },
    //client phoyo
    {
      path: "/client-photo",
      component: Dash,
      children: [
        {
          path: "/client-photo",
          name: "Client-photo",
          component: Photo,
          meta: { requiresAuth: true }
        }
      ]
    },
    { path: "*", component: PageNotFound }
  ]
});

export default router;
