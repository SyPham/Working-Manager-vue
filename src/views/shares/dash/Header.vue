<template>
  <div id="appHeader">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#">
            <i class="fas fa-bars"></i>
          </a>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link">
            <i class="fa fa-sign-out"></i>
            <span class="font-weight-bold text-info">{{currentTime}}</span>
          </a>
        </li>
        <!-- Notifications Dropdown Menu -->
        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <i class="far fa-bell"></i>
            <span class="badge badge-warning navbar-badge">15</span>
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span class="dropdown-item dropdown-header">15 Notifications</span>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <i class="fas fa-envelope mr-2"></i> 4 new messages
              <span class="float-right text-muted text-sm">3 mins</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <i class="fas fa-users mr-2"></i> 8 friend requests
              <span class="float-right text-muted text-sm">12 hours</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <i class="fas fa-file mr-2"></i> 3 new reports
              <span class="float-right text-muted text-sm">2 days</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logout">
            <i class="fa fa-sign-out"></i> Sign-Out
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import moment from "moment-timezone";
export default {
  name: "appHeader",
  data() {
    return {
      currentTime: null
    };
  },

  created() {
    this.currentTime = moment().format("LTS");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  },
  methods: {
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
  }
};
</script>

<style scoped></style>
