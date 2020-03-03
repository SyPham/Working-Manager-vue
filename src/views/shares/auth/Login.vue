<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="#/home">
        <b>Work Management</b>
      </a>
    </div>
    <!-- /.login-logo -->
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">Sign in to start your session</p>

        <div>
          <div class="input-group mb-3">
            <input
              @keyup.enter="login"
              v-model="user.username"
              class="form-control"
              type="text"
              name="email"
              placeholder="Username"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              class="form-control"
              @keyup.enter="login"
              v-model="user.password"
              type="password"
              name="pass"
              placeholder="Password"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <div class="icheck-primary">
                <input type="checkbox" id="remember" />
                <label for="remember">Remember Me</label>
              </div>
            </div>
            <!-- /.col -->
            <div class="col-4">
              <button class="btn btn-primary btn-block" @click="login" @keyup.enter="login">Sign In</button>
            </div>
            <!-- /.col -->
          </div>
        </div>
      </div>
      <!-- /.login-card-body -->
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      loggedIn: this.$auth.loggedIn()
    };
  },

  methods: {
    login() {
      let self = this;
      console.log(self.user);
      self.$api
        .post("api/Auth/login", self.user)
        .then(function(res) {
          console.log(res);
          //self.menuSidebar = res.data.user.Menus
          self.$auth.setToken(
            res.data.token,
            Date.now() + 14400000,
            res.data.user.User.Username,
            res.data.user.User.Role
          ); // + 4 hours
          localStorage.setItem("Role", res.data.user.User.Role);
          localStorage.setItem("ImageProfile", res.data.user.User.image);
          localStorage.setItem("UserID", res.data.user.User.ID);
          localStorage.setItem("ListOCs", res.data.user.User.ListOCs);
          localStorage.setItem("Level", res.data.user.User.OCLevel);
          localStorage.setItem("IsLeader", res.data.user.User.IsLeader);
          //roleid = 2
          var routerArrUser = [
            "/todolist",
            "/history",
            "/project",
            "/history",
            "/project-detail",
            "/abnormal",
            "/routine",
            "/follow",
            "/client-chat"
          ];
          var routerArrAdmin = [
            "/admin-oc",
            "/admin-role",
            "/admin-user",
            "/admin-oc-user",
            "/dashboard-admin"
          ];
          var uri = self.$route.query.redirect || "";
          if (self.$route.query.redirect.length != 0) {
         
            var roleUser = routerArrUser.includes(uri);
            routerArrUser.forEach((item, index)=>{
               if(uri.includes(item)) roleUser = true;
            });
            var roleAdmin = routerArrAdmin.includes(uri);
            if (Number(localStorage.getItem("Role")) == 2 && roleUser) {
              if(uri.includes("project-detail")){
              self.$router.push("/");
              }else{
              self.$router.push(uri);
              }
            } else if (Number(localStorage.getItem("Role")) == 2 && roleAdmin) {
              if(uri.includes("project-detail")){
              self.$router.push("/");
              }else{
              self.$router.push(uri);
              }
            } else if (Number(localStorage.getItem("Role")) == 1 && roleAdmin) {
              self.$router.push(uri);
            } else if (Number(localStorage.getItem("Role")) == 1 && roleUser) {
              self.$router.push("/dashboard-admin");
            }
          } else {
            if (localStorage.getItem("Role") == 1) {
              self.$router.push("/dashboard-admin");
            } else {
              self.$router.push("/todolist");
            }
          }
        })
        .catch(res => {
          self.$alertify.error("Username and password are incorrect, please try again!",true);
        });
    }
  }
};
</script>

<style scoped>
</style>
