<template>
  <div>
    <div class="wrapper">
      <!-- Navbar -->
      <app-navbar></app-navbar>
      <!-- /.navbar -->

      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper" style="min-height: 100.359px;">
        <!-- Content Header (Page header) -->
        <app-breadcrumb />

        <!-- /.content-header -->

        <!-- Main content -->
        <div class="content">
          <div class="container-fluid">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
            <!-- /.row -->
          </div>
          <!-- /.container-fluid -->
        </div>
        <!-- /.content -->
      </div>
      <!-- /.content-wrapper -->

      <!-- Control Sidebar -->
      <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
        <div class="p-3">
          <h5>Title</h5>
          <p>Sidebar content</p>
        </div>
      </aside>
      <!-- /.control-sidebar -->

      <!-- Main Footer -->
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";

export default {
  name: "dashboard",
  components: {
    AppNavbar: Navbar,
    AppBreadcrumb: Breadcrumb,
    AppFooter: Footer
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.125s;
}
.fade-enter-active {
  transition-delay: 0.125s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

