<template>
  <div>
    <div v-if="display" class="row">
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
      <a class="col-12 col-sm-6 col-md-3" href="#/admin-project">
        <div class="info-box mb-3">
          <span class="info-box-icon bg-danger elevation-1">
            <i class="fas fa-thumbs-up"></i>
          </span>

          <div class="info-box-content">
            <span class="info-box-text">Project</span>
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
          <span class="info-box-icon bg-success elevation-1">
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
          <span class="info-box-icon bg-warning elevation-1">
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
    <div v-if="!display" class="row">
      <a class="col-12 col-sm-6 col-md-3" href="#/client-task">
        <div class="info-box">
          <span class="info-box-icon bg-info elevation-1">
            <i class="fas fa-cog"></i>
          </span>

          <div class="info-box-content">
            <span class="info-box-text">Task</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </a>
      <!-- /.col -->
      <a class="col-12 col-sm-6 col-md-3" href="#/client-history">
        <div class="info-box mb-3">
          <span class="info-box-icon bg-danger elevation-1">
            <i class="fas fa-thumbs-up"></i>
          </span>

          <div class="info-box-content">History</span>
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
      display: false
    };
  },
  created() {
    this.display = localStorage.getItem("Role") == 1 ? true : false;
    this.username = localStorage.getItem("User");
  }
};
</script>

<style scoped></style>
