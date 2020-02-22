<template>
  <section class="content-header" id="appBreadcrumb">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1>{{name}}</h1>
        </div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li class="breadcrumb-item active">{{name}}</li>
          </ol>
        </div>
      </div>
    </div>
    <!-- /.container-fluid -->
  </section>
</template>

<script>
export default {
  name: "appBreadcrumb",
  data() {
    return {
      name: ""
    };
  },
  mounted() {
    console.info("App this router:", this.$route);
    this.name = this.$route.name;
  },
  watch: {
    "$route.name": function(name) {
      this.name = this.$route.name;
    }
  }
};
</script>

<style scoped></style>
