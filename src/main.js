import Vue from "vue";
import App from "./App.vue";
import Router from "./routes";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
import { Datetime } from "vue-datetime";
// You need a specific loader for CSS files
import "vue-datetime/dist/vue-datetime.css";
import Paginate from "vuejs-paginate";
import Auth from "./assets/plugins/auth";
import Alertify from "./assets/plugins/alertify";
import CommonPlugin from "./assets/plugins/common";

// import VueSocketio from "vue-socket.io";

// Vue.use(
//   new VueSocketio({
//     debug: true,
//     connection: "http://localhost:5000"
//   })
// );
Vue.component("paginate", Paginate);
Vue.use(Datetime);
Vue.use(VueSweetalert2);

Vue.use(Auth);
Vue.use({
  install(Vue) {
    axios.defaults.baseURL = "http://10.4.4.224:93";
    axios.defaults.headers.post["Content-Type"] =
      "application/json; charset=utf-8";
    var instance = axios.create();
    instance.interceptors.request.use(
      function(config) {
        config.headers = {
          Authorization: "Bearer " + Vue.auth.getToken()
        };
        config.headers.post = {
          "Content-Type": "application/json; charset=utf-8"
        };
        return config;
      },
      function(error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    Vue.prototype.$api = instance;
  }
});

Vue.filter("capitalize", function(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
});

Vue.filter("toTitleCase", function (val) {
  let arrTemp = val.split(" ") || [];
  return arrTemp
    .map(element => element[0].toUpperCase() + element.substr(1).toLowerCase())
    .join(" ");
  
});

Vue.use(Alertify);
Vue.use(CommonPlugin);
//configure route guards
Router.beforeEach(function(to, from, next) {
  //prevent access to 'requiresGuest' routes;
  if (
    to.matched.some(function(record) {
      return record.meta.requiresGuest;
    }) &&
    Vue.auth.loggedIn()
  ) {
    next({
      path: "/home"
    });
  } else if (
    to.matched.some(function(record) {
      return record.meta.requiresAuth;
    }) &&
    !Vue.auth.loggedIn()
  ) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else {
    next(); // make sure to always call next()!
  }
});
new Vue({
  el: "#app",
  router: Router,
  render: h => h(App)
});
