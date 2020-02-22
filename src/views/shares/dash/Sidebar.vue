<template>
  <div id="sidebar">
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <a href="#/todolist" class="brand-link">
        <img
          src="../../../assets/AdminLTELogo.png"
          alt="AdminLTE Logo"
          class="brand-image img-circle elevation-3"
          style="opacity: .8"
        />
        <span class="brand-text font-weight-light">Work Management</span>
      </a>

      <div class="sidebar">
        <!-- Sidebar user (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img
              src="../../../assets/user2-160x160.jpg"
              class="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div class="info">
            <a href="#/todolist" class="d-block">{{username}}</a>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <!-- Add icons to the links using the .nav-icon class
            with font-awesome or any other icon font library-->
            <li v-if="display==1" class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Admin
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="#/admin-oc" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>OC</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#/admin-oc-user" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>OC User</p>
                  </a>
                </li>

                <li class="nav-item">
                  <a href="#/admin-user" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>User</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#/admin-role" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Role</p>
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item" v-if="display==4">
              <a href="#/project" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Project</p>
              </a>
            </li>
            <li class="nav-item" v-if="display==4 || display == 2">
              <a href="#/routine" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Routine Job</p>
              </a>
            </li>

            <li class="nav-item" v-if="display==4 || display == 2">
              <a href="#/todolist" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>To Do List</p>
              </a>
            </li>
            <li class="nav-item" v-if="1>2">
              <a href="#/project-user" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Project User</p>
              </a>
            </li>

            <li class="nav-item" v-if="display==4 || display == 2">
              <a href="#/history" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>History</p>
              </a>
            </li>
            <li class="nav-item" v-if="display==4 || display == 2">
              <a href="#/follow" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Followed</p>
              </a>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      username: "No Name",
      display: 0
    };
  },
  created() {
    this.display = localStorage.getItem("Role");
    this.username = localStorage.getItem("User");
  },
  mounted() {
    this.display = localStorage.getItem("Role");
    this.username = localStorage.getItem("User");
  }
};
</script>

<style scoped></style>
