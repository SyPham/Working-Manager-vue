<template>
  <div>
    <nav class="main-header navbar navbar-expand-md navbar-light navbar-white">
      <div class="container-fluid">
        <a :href="homePageUrl" class="navbar-brand">
          <img
            src="../../../assets/logo-1.png"
            alt="AdminLTE Logo"
            class="brand-image img-circle"
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
              :class="routerName !== 'Project'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission > 1"
            >
              <a href="#/project" class="nav-link">Project</a>
            </li>
            <li
              :class="routerName !== 'Routine Job'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission > 1 "
            >
              <a href="#/routine" class="nav-link">Routine</a>
            </li>
            <li
              :class="routerName !== 'Abnormal'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission > 1 "
            >
              <a href="#/abnormal" class="nav-link">Abnormal</a>
            </li>
            <li
              :class="routerName !== 'To Do List' && routerName !== 'To Do List Search' && routerName !== 'To Do List Comment'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission > 1"
            >
              <a href="#/todolist" class="nav-link">To Do List</a>
            </li>
            <li
              :class="routerName !== 'History'&& routerName !== 'History Search'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission > 1 "
            >
              <a href="#/history" class="nav-link">History</a>
            </li>
            <li
              :class="(routerName !== 'Follow' && routerName !== 'Follow Search') ? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission > 1"
            >
              <a href="#/follow" class="nav-link">Followed</a>
            </li>
            <!--End Router client -->
            <!-- Router admin -->
            <li
              :class="routerName !== 'Dashboard Admin'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission == 1"
            >
              <a href="#/dashboard-admin" class="nav-link">Home</a>
            </li>
            <li
              :class="routerName !== 'OC'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission == 1"
            >
              <a href="#/admin-oc" class="nav-link">OC</a>
            </li>
            <li
              :class="routerName !== 'User'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission == 1"
            >
              <a href="#/admin-user" class="nav-link">User</a>
            </li>
            <li
              :class="routerName !== 'OC User'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission == 1"
            >
              <a href="#/admin-oc-user" class="nav-link">OC User</a>
            </li>

            <li
              :class="routerName !== 'Role'? 'nav-item':'nav-item bg-info rounded-pill'"
              v-if="permission == 1"
            >
              <a href="#/admin-role" class="nav-link">Role</a>
            </li>

            <!--End Router admin -->
          </ul>
        </div>

        <!-- Right navbar links -->
        <ul class="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
          <li class="nav-item user-menu">
            <a class="nav-link" @click="toggleShow">
              <i class="fa fa-sign-out"></i>
              <!-- <img src="../../../assets/default-150x150.png" class="user-image img-circle elevation-2" alt="User Image"> -->
              <img :src="imageProfile" class="user-image img-circle elevation-2" alt="User Image" />
              <span class="font-weight-bold text-danger">{{ username | capitalize }}</span>
            </a>
            <my-upload
              field="UploadedFile"
              @crop-success="cropSuccess"
              @crop-upload-success="cropUploadSuccess"
              @crop-upload-fail="cropUploadFail"
              v-model="show"
              lang-type="en"
              :width="100"
              :height="100"
              url="http://10.4.4.224:93/api/Users/UploapProfile"
              :params="params"
              :noSquare="false"
              :headers="headers"
              img-format="png"
            ></my-upload>
          </li>
          <!-- Messages Dropdown Menu -->
          <li class="nav-item">
            <a class="nav-link" @click="callServer">
              <i class="fa fa-sign-out"></i>
              <span class="font-weight-bold text-info">{{currentTime}}</span>
            </a>
          </li>
          <!-- -------------------- -->
          <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#" aria-expanded="false">
              <i class="far fa-bell"></i>
              <span class="badge badge-danger navbar-badge" v-show="total>= 1">{{total}}</span>
            </a>
            <div
              id="infinite-list"
              class="dropdown-menu dropdown-menu-lg dropdown-menu-right fix-notify"
            >
              <span
                class="dropdown-item dropdown-header"
              >{{totalCount > 1? totalCount+" Notifications":totalCount+" Notification"}}</span>
              <div class="dropdown-divider"></div>
              <a v-for="(item,key,index) in data" :key="index" @click.prevent="pushRouter(item)">
                <a class="dropdown-item">
                  <!-- Message Start -->
                  <div class="media">
                    <img
                      :src="imageBase64(item.ImageBase64)"
                      alt="User Avatar"
                      class="img-size-50 mr-3 img-circle"
                    />
                    <div class="media-body">
                      <h3 class="dropdown-item-title">
                        {{ (item.Sender|| "System") | capitalize }}
                        <!-- <span class="right badge badge-danger">New</span> -->
                        <small class="float-right right badge badge-danger" v-show="!item.Seen">New</small>
                      </h3>
                      <p class="text-sm">{{item.Message}}</p>
                      <p class="text-sm text-muted">
                        <i class="far fa-clock mr-1"></i>
                        {{$common.JSONDateWithTime(item.CreatedTime)}}
                      </p>
                    </div>
                  </div>
                  <!-- Message End -->
                </a>

                <div class="dropdown-divider"></div>
              </a>
              <a href="#/notification" class="dropdown-item dropdown-footer">See All Messages</a>
            </div>

            <!-- <div>
               <div class="dropdown-divider"></div>
              <a href="/" class="dropdown-item dropdown-footer">See All Notifications</a>
            </div>-->
          </li>
          <!-- Notifications Dropdown Menu -->
          <li class="nav-item dropdown d-none">
            <a class="nav-link" data-toggle="dropdown" href="/">
              <i class="far fa-bell"></i>
              <span class="badge badge-warning navbar-badge">{{total}}</span>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right fix-width">
              <span class="dropdown-header">{{total}} Notifications</span>
              <div class="dropdown-divider"></div>
              <a v-for="(item,key,index) in data" :key="index" @click.prevent="pushRouter(item)">
                <a class="dropdown-item" v-if="item.CreatedBy != user">
                  <i class="fas fa-envelope mr-2"></i>
                  {{item.Message}}
                  <span
                    class="float-right text-muted text-sm"
                  >{{$common.JSONDateWithTime(item.CreatedTime)}}</span>
                </a>
                <div class="dropdown-divider"></div>
              </a>
            </div>
            <!-- <div>
               <div class="dropdown-divider"></div>
              <a href="/" class="dropdown-item dropdown-footer">See All Notifications</a>
            </div>-->
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
import Vue from "vue";
import myUpload from "vue-image-crop-upload";
export default {
  name: "navbar",
  components: {
    "my-upload": myUpload
  },
  data() {
    return {
      totalCount: 0,
      loadMore: true,
      page: 1,
      user: Number(localStorage.getItem("UserID")),
      pageSize: 10,
      imgNotifyBase64:
        "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEVsdX3////Hy86jqK1+ho2Ql521ur7a3N7s7e5YhiPTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==", // the datebase64 url of created image,
      imageProfile: "",
      en: {
        hint: "Click or drag the file here to upload",
        loading: "Uploading…",
        noSupported:
          "Browser is not supported, please use IE10+ or other browsers",
        success: "Upload success",
        fail: "Upload failed",
        preview: "Preview",
        btn: {
          off: "Cancel",
          close: "Close",
          back: "Back",
          save: "Save"
        },
        error: {
          onlyImg: "Image only",
          outOfSize: "Image exceeds size limit: ",
          lowestPx: "Image's size is too low. Expected at least: "
        }
      },
      show: false,
      params: {
        token: localStorage.getItem("authToken"),
        name: "UploadedFile"
      },
      headers: {
        smail: "*_~",
        Authorization: "Bearer " + localStorage.getItem("authToken")
      },
      imgDataUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEVsdX3////Hy86jqK1+ho2Ql521ur7a3N7s7e5YhiPTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==", // the datebase64 url of created image,
      currentTime: null,
      username: "No Name",
      display: 0,
      permission: 0,
      routerName: "",
      data: [],
      total: 0,
      homePageUrl: "",
      connection: [],
      state: ""
    };
  },

  mounted() {
    let self = this;

    // Detect when scrolled to bottom.
    var lastScrollTop = 0;
    const listElm = document.querySelector("#infinite-list");
    listElm.addEventListener("scroll", e => {
      var st = listElm.pageYOffset || listElm.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"

      if (st > lastScrollTop) {
        if (self.page <= self.pageSize) {
          self.page++;
          self.getAllNotificationCurrentUser();
        }
        // downscroll code
      } else {
        // upscroll code
        if (self.page >= 2) self.page--;
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      // if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
      //   self.page++;
      //   this.loadMore = true;
      // }
    });

    // Initially load some items.
    //self.getAllNotificationCurrentUser();

    let imgToken = localStorage.getItem("ImageProfile");
    if (imgToken === "null") {
      self.imageProfile =
        "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEVsdX3////Hy86jqK1+ho2Ql521ur7a3N7s7e5YhiPTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==";
    } else {
      self.imageProfile =
        "data:image/png;base64, " + localStorage.getItem("ImageProfile");
    }
    console.log("mounted");

    self.username = localStorage.getItem("User");

    self.permission = Number(localStorage.getItem("Role"));
    if (self.permission == 1) {
      self.homePageUrl = "#/dashboard-admin";
    } else {
      self.homePageUrl = "#/todolist";
    }
    // self.connection.on("ReceiveMessage", (user, message) => {
    //   console.log("ReceiveMessage");
    //   let users = user || "";
    //   let currentUser = localStorage.getItem("UserID").toString();
    //   if (users.length > 0 && users.includes(currentUser)) {
    //     self.page = 1;
    //     self.data = [];
    //     self.getAllNotificationCurrentUser();
    //     self.$alertify.info("There is the new alert!");
    //   }
    // });
  },
  computed: {},
  created() {

    let self = this;
    self.todo();
    self.getTaskListIsLate();
    self.permission = Number(localStorage.getItem("Role"));
    if (self.permission == 1) {
      self.homePageUrl = "#/dashboard-admin";
    } else {
      self.homePageUrl = "#/todolist";
    }
    let imgToken = localStorage.getItem("ImageProfile");
    if (imgToken === "null") {
      self.imageProfile =
        "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEVsdX3////Hy86jqK1+ho2Ql521ur7a3N7s7e5YhiPTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==";
    } else {
      self.imageProfile =
        "data:image/png;base64, " + localStorage.getItem("ImageProfile");
    }

    console.log("created");
    self.page = 1;
    self.data = [];
    self.getAllNotificationCurrentUser();
    self.routerName = self.$route.name;
    self.currentTime = moment().format("LTS");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
    self.connection = self.$SIGNALR;

    self.connection.on("ReceiveMessage", (user, message) => {
      console.log("ReceiveMessage");
      let users = user || "";
      let currentUser = localStorage.getItem("UserID").toString();
      if (users.length > 0 && users.includes(currentUser)) {
        self.page = 1;
        self.data = [];
        self.getAllNotificationCurrentUser();
        self.$alertify.info("There is the new alert!");
      }
    });
    
      console.log("SIGNALR VUEJS __________________", this.connection)

    self.connection.on("NotCheckAlert", (user, list) => {
      if (user === localStorage.getItem("UserID")) {
        console.log(user);
        console.log(list);
      }
    });
    self.connection.on("ReceiveCheckAlert", (user, list) => {
      let currentuSer = Number(localStorage.getItem("UserID"));
      let userId = Number(user);
      let listNotify = list || [];
      console.log("ReceiveCheckAlert: ", listNotify);
      if (currentuSer === userId && listNotify.length > 0) {
        self.page = 1;
        self.data = [];
        self.getAllNotificationCurrentUser();
        self.$alertify.info("There is the new alert!");
      }
    });
  },
  methods: {
    todo: function() {
      var self = this;
      this.intervalid1 = setInterval(() => {
        if (self.connection.connectionStarted) {
          console.log(
            localStorage.getItem("User") + "Vue yeu cau server check alert",
            new Date().toLocaleDateString()
          );
          self.connection
            .invoke("CheckAlert", localStorage.getItem("UserID"))
            .catch(function(err) {
              return console.error(err.toString());
            });
            // self.connection.invoke("Ping","").catch(err => 
            // {
            //   this.state = "Disconnected";
             
            // console.error(err)
            // });
        } else {
          setTimeout(() => {
            self.$router.push('/maintenance');
            clearInterval(this.intervalid1);
          }, 3000)
              }
      }, 10000);
    },
    imageBase64(img) {
      if (img == null) {
        return "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEVsdX3////Hy86jqK1+ho2Ql521ur7a3N7s7e5YhiPTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==";
      } else {
        return "data:image/png;base64, " + img;
      }
    },
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    },
    getTaskListIsLate() {
      let self = this;
      let url = `api/Home/TaskListIsLate`;
      self.$api.get(url).then(res => {});
    },
    pushRouter(item) {
      let self = this;
      self.$api.get(`api/Home/Seen/${item.ID}`).then(res => {
        self.page = 1;
        self.data = [];
        self.getAllNotificationCurrentUser();
      });
      let path = "/";
      item.URL = item.URL || "";
      if (item.URL.includes("#")) {
        path = item.URL.split("#")[1];
      } else {
        path = item.URL;
      }
      if (self.$route.path != item.URL && item.URL != "")
        self.$router.push(path);
    },
    callServer() {
      let self = this;
      self.connection
        .invoke("SendMessage", "henry", "Hello Hub")
        .catch(err => console.error(err.toString()));
    },
    getAllNotificationCurrentUser(data) {
      let self = this;
      let url = `api/Home/getAllNotificationCurrentUser/${self.page}/${self.pageSize}`;
      self.$api.get(url).then(res => {
        //self.data = res.data.model;
        console.log("getAllNotificationCurrentUser");
        console.log(res);
        self.total = res.data.total;
        self.data = [...self.data, ...res.data.model];
        self.totalCount = res.data.TotalCount;
        self.loadMore = true;
        // Stop scroll-loader
        //res.data.model.length < self.pageSize && (self.loadMore = false);
      });
    },
    checkRole(role, level) {
      if (role == 1) return 1;
      else if (role !== 1 && level >= 1 && level <= 2) return 2;
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
    },
    imgDataUrl: function(newVal) {
      localStorage.setItem("ImageProfile", newVal);
      this.imageProfile = "";
      this.imageProfile = localStorage.getItem("ImageProfile");
    },
    page(value) {
      this.loadMore = value > 10;
    }
  }
};
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.fix-width {
  max-width: 800px !important;
  width: 800px !important;
  height: 500px !important;
  overflow-y: scroll !important;
  text-overflow: ellipsis;
}
.fix-notify {
  min-width: 800px !important;
  max-height: 600px !important;
  text-overflow: ellipsis;
  overflow-y: scroll !important;
}
</style>