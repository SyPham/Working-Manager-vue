<template>
  <div>
    <nav class="main-header navbar navbar-expand-md navbar-light navbar-white">
      <div class="container-fluid">
        <a href="#/todolist" class="navbar-brand">
          <img
            src="../../../assets/AdminLTELogo.png"
            alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3"
            style="opacity: .8"
          />
          <span class="brand-text font-weight-light">Work Management</span>
        </a>

        <button
          class="navbar-toggler order-1"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse order-3" id="navbarCollapse">
          <!-- Left navbar links -->
          <ul class="navbar-nav">
            <!-- Router client -->

            <li
              :class="routerName != 'Project'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission > 1"
            >
              <a href="#/project" class="nav-link">Project</a>
            </li>
            <li
              :class="routerName != 'Routine Job'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission > 1 "
            >
              <a href="#/routine" class="nav-link">Routine</a>
            </li>
            <li
              :class="routerName != 'Abnormal'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission > 1 "
            >
              <a href="#/abnormal" class="nav-link">Abnormal</a>
            </li>
            <li
              :class="routerName != 'To Do List'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission > 1"
            >
              <a href="#/todolist" class="nav-link">To Do List</a>
            </li>
            <li
              :class="routerName != 'History'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission > 1 "
            >
              <a href="#/history" class="nav-link">History</a>
            </li>
            <li
              :class="routerName != 'Follow'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission > 1"
            >
              <a href="#/follow" class="nav-link">Followed</a>
            </li>
            <!--End Router client -->
            <!-- Router admin -->
            <li
              :class="routerName != 'Dashboard Admin'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission == 1"
            >
              <a href="#/dashboard-admin" class="nav-link">Home</a>
            </li>
            <li
              :class="routerName != 'OC'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission == 1"
            >
              <a href="#/admin-oc" class="nav-link">OC</a>
            </li>
            <li
              :class="routerName != 'User'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission == 1"
            >
              <a href="#/admin-user" class="nav-link">User</a>
            </li>
            <li
              :class="routerName != 'OC User'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission == 1"
            >
              <a href="#/admin-oc-user" class="nav-link">OC User</a>
            </li>

            <li
              :class="routerName != 'Role'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission == 1"
            >
              <a href="#/admin-role" class="nav-link">Role</a>
            </li>

            <!--End Router admin -->
          </ul>
        </div>

        <!-- Right navbar links -->
        <ul class="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
          <li class="nav-item">
            <a class="nav-link">
              <i class="fa fa-sign-out"></i>
              <span class="font-weight-bold text-danger">{{ $common.toTitleCase(username) }}</span>
            </a>
          </li>
          <!-- Messages Dropdown Menu -->
          <li class="nav-item">
            <a class="nav-link" @click="callServer">
              <i class="fa fa-sign-out"></i>
              <span class="font-weight-bold text-info">{{currentTime}}</span>
            </a>
          </li>
          <!-- Notifications Dropdown Menu -->
          <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
              <i class="far fa-bell"></i>
              <span class="badge badge-warning navbar-badge">{{total}}</span>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right fix-width">
              <span class="dropdown-header">{{total}} Notifications</span>
              <div class="dropdown-divider"></div>
              <div v-for="(item,key,index) in data" :key="index">
                <a href="#" class="dropdown-item">
                  <i class="fas fa-envelope mr-2"></i>
                  {{item.Message}}
                  <span
                    class="float-right text-muted text-sm"
                  >{{$common.JSONDateWithTime(item.CreatedTime)}}</span>
                </a>
                <div class="dropdown-divider"></div>
              </div>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click.prevent="logout">
              <i class="fas fa-sign-out-alt"></i> Sign-Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import moment from "moment-timezone";
import EventBus from "../../../EventBus";

export default {
  name: "navbar",
  data() {
    return {
      currentTime: null,
      username: "No Name",
      display: 0,
      permission: 0,
      routerName: "",
      data: [],
      total: 0,
      connection: []
    };
  },

  mounted() {
    let self = this;
    console.log("mounted");

    self.username = localStorage.getItem("User");

    self.permission = Number(localStorage.getItem("Level"));

    self.connection.on("ReceiveMessage", (user, message) => {
      console.log("ReceiveMessage");
      self.getAllNotificationCurrentUser();
      self.$alertify.info("There is the new alert!");
    });
  },
  computed: {},
  created() {
    let self = this;
    console.log("created");

    self.getAllNotificationCurrentUser();
    self.routerName = self.$route.name;
    self.permission = Number(localStorage.getItem("Level"));
    self.currentTime = moment().format("LTS");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
    self.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://10.4.4.224:93/working-management-hub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    self.connection
      .start()
      .then(function() {
        console.log("Connected working-management-hub");
        EventBus.$emit("reciveConnection", self.connection);
      })
      .catch(error => {
        console.log("working-management-hub error!! ");
        console.log(error);
      });

    self.connection.on("ReceiveMessage", (user, message) => {
      console.log("ReceiveMessage");
      self.getAllNotificationCurrentUser();
      self.$alertify.info("There is the new alert!");
    });
  },
  methods: {
    callServer() {
      var self = this;
      self.connection
        .invoke("SendMessage", "henry", "Hello Hub")
        .catch(err => console.error(err.toString()));
    },
    getAllNotificationCurrentUser(data) {
      var self = this;
      self.$api.get(`api/Home/getAllNotificationCurrentUser`).then(res => {
        console.log("getAllNotificationCurrentUser");
        console.log(res);

        self.data = res.data.model;
        self.total = res.data.total;
      });
    },
    checkRole(role, level) {
      if (role == 1) return 1;
      else if (role != 1 && level >= 1 && level <= 2) return 2;
      else return 3;
    },
    updateCurrentTime() {
      this.currentTime = moment().format("LTS");
    },
    logout: function() {
      this.$auth.destroyToken();
      // this.user = {};
      var uri = this.$route.path;
      console.log(uri);
      this.$router.push({ path: "/login", query: { redirect: uri } });
      // alert("success!");
      this.$alertify.success("Sign-out Successfully!");
    }
  },
  watch: {
    "$route.name": function(name) {
      this.routerName = this.$route.name;
    }
  }
};
</script>

<style scoped>
.fix-width {
  max-width: 800px !important;
  width: 800px !important;
}
</style>
