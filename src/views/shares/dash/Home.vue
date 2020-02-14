<template>
  <div>
    <div v-if="display==1" class="row">
      <a class="col-12 col-sm-6 col-md-3" href="#/admin-oc">
        <div class="info-box">
          <span class="info-box-icon bg-info elevation-1">
            <i class="fas fa-cog"></i>
          </span>

          <div class="info-box-content">
            <span class="info-box-text">OC</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </a>
      <!-- /.col -->
      <!-- fix for small devices only -->
      <div class="clearfix hidden-md-up"></div>

      <a class="col-12 col-sm-6 col-md-3" href="#/admin-role">
        <div class="info-box mb-3">
          <span class="info-box-icon bg-info elevation-1">
            <i class="fas fa-shopping-cart"></i>
          </span>

          <div class="info-box-content">
            <span class="info-box-text">Role</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </a>
      <!-- /.col -->

      <a class="col-12 col-sm-6 col-md-3" href="#/admin-oc-user">
        <div class="info-box mb-3">
          <span class="info-box-icon bg-info elevation-1">
            <i class="fas fa-users"></i>
          </span>

          <div class="info-box-content">
            <span class="info-box-text">OC User</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </a>

      <!-- /.col -->
      <!-- /.col -->

      <a class="col-12 col-sm-6 col-md-3" href="#/admin-user">
        <div class="info-box mb-3">
          <span class="info-box-icon bg-info elevation-1">
            <i class="fas fa-users"></i>
          </span>

          <div class="info-box-content">
            <span class="info-box-text">User</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </a>
      <!-- /.col -->
    </div>
    <div class="row">
      <a class="col-12 col-sm-6 col-md-3" href="#/client-project" v-if="display==4">
        <div class="info-box mb-3">
          <span class="info-box-icon bg-info elevation-1">
           <i class="fas fa-project-diagram"></i>
          </span>

          <div class="info-box-content">
            <span class="info-box-text">Project</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </a>

      <a class="col-12 col-sm-6 col-md-3" href="#/client-project-user" v-if="display==4">
        <div class="info-box mb-3">
          <span class="info-box-icon bg-info elevation-1">
           <i class="fab fa-r-project"></i>
          </span>

          <div class="info-box-content">
            <span class="info-box-text">Project User</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </a>
      <!-- /.col -->
       <a class="col-12 col-sm-6 col-md-3" href="#/client-task" v-if="display==4 || display==2">
        <div class="info-box">
          <span class="info-box-icon bg-info elevation-1">
            <i class="fas fa-tasks"></i>
          </span>

          <div class="info-box-content">
            <span class="info-box-text">Task</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </a>
      <a class="col-12 col-sm-6 col-md-3" href="#/client-history" v-if="display==4 || display==2">
        <div class="info-box mb-3">
          <span class="info-box-icon bg-info elevation-1">
            <i class="fas fa-thumbs-up"></i>
          </span>

          <div class="info-box-content">History</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </a>
       <a class="col-12 col-sm-6 col-md-3" href="#/client-subscribe" v-if="display==4 || display==2">
        <div class="info-box mb-3">
          <span class="info-box-icon bg-info elevation-1">
            <i class="fas fa-thumbs-up"></i>
          </span>

          <div class="info-box-content">Subscribe</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </a>
      <!-- /.col -->
      <!-- /.col -->
    </div>
  </div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {
      display: 0
    };
  },
  created() {
    this.display = localStorage.getItem("Role");
    this.username = localStorage.getItem("User");
  }
};
</script>

<style scoped></style>
