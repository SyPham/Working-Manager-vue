<template>
  <div>
    <div class="row no-gutters">
      <div class="col-md-4 border-right">
        <div class="settings-tray">
          <img class="profile-image" src="../../../assets/default-150x150.png" alt="Profile img" />
          <span class="settings-tray--right">List Project</span>
        </div>
        <div class="search-box">
          <div class="input-wrapper">
            <i class="fas fa-search"></i>
            <input placeholder="Search here" type="text" />
          </div>
        </div>
        <div v-for="(item, key,index) in ListProject" :key="index">
          <div class="friend-drawer friend-drawer--onhover" @click="joinGroup(item)">
            <img class="profile-image" src="../../../assets/default-150x150.png" alt />
            <div class="text">
              <h6>{{item.Name}}</h6>
              <!-- <p class="text-muted">Hey, you're arrested!</p> -->
            </div>
            <!-- <span class="time text-muted small">13:21</span> -->
          </div>
          <hr />
        </div>
      </div>
      <div class="col-md-8">
        <div class="settings-tray">
          <div class="friend-drawer no-gutters friend-drawer--grey">
            <img class="profile-image" src="../../../assets/user2-160x160.jpg" alt />
            <div class="text">
              <h6>{{projectName}}</h6>
              <!-- <p class="text-muted">Layin' down the law since like before Christ...</p> -->
            </div>
            <span class="settings-tray--right">
              <i class="fas fa-sync-alt"></i>
              <i class="fas fa-comment-dots"></i>
              <i class="fas fa-bars"></i>
            </span>
          </div>
        </div>
        <div class="chat-panel">
          <div id="chat-content">
            <!-- <div class="row no-gutters">
              <div class="col-md-3">
                <div class="chat-bubble chat-bubble--left">sdasdas</div>
              </div>
            </div>-->
          </div>
          <div class="row">
            <div class="col-12">
              <div class="chat-box-tray">
                <!-- <i class="far fa-grin-beam"></i> -->
                <input type="text" v-model="message" placeholder="Type your message here..." />
                <!-- <i class="fas fa-microphone"></i> -->
                <i class="fas fa-reply" @click="sendToGroup"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "../../../EventBus";

export default {
  name: "chat",
  data() {
    return {
      connection: [],
      keyword: "%20",
      ListProject: [],
      totalPage: 0,
      projectName: "Please select project to chat group!",
      message: "",

      room: 0
    };
  },
  methods: {
    joinGroup(item) {
      let self = this;
      let currentUser = Number(localStorage.getItem("UserID"));
      let managers = item.Manager || [];
      let members = item.Members || [];
      if (managers.concat(members).includes(currentUser)) {
        self.room = item.Room;
        self.projectName = item.Name;
        self.connection
          .invoke("JoinGroup", item.Room.toString())
          .catch(function(err) {
            return console.error(err.toString());
          });
      } else {
        self.room = 0;
        self.$swal("Waring!", "You do not belong in this group!", "warning");
      }
    },
    sendToGroup() {
      let self = this;
      self.connection
        .invoke("SendMessageToGroup", self.room.toString(), self.message)
        .catch(function(err) {
          return console.error(err.toString());
        });
      let sendMessage = `
       <div class="row no-gutters">
            <div class="col-md-3">
              <div class="chat-bubble chat-bubble--left">${this.message}</div>
            </div>
          </div>
      `;
      $("#chat-content").append(sendMessage);
      this.$forceUpdate();
      this.message = "";
    },
    getProject() {
      let self = this;
      this.$api
        .get(`api/Projects/GetAllPaging/1/1000/${self.keyword}`)
        .then(res => {
          console.log(res);
          self.ListProject = res.data.data;
          self.totalPage = res.data.total;
          console.log("self.ListProject");
          console.log(self.ListProject);
        });
    },
    reciveConnection(conn) {
      this.connection = conn;
    }
  },
  mounted() {
    this.connection.on("ReceiveMessageGroup", function(message) {
      this.message = message;
      let receiveMessage = `
      <div class="row no-gutters">
            <div class="col-md-3 offset-md-9">
              <div class="chat-bubble chat-bubble--right">${this.message}</div>
            </div>
          </div>
      `;
      $("#chat-content").append(receiveMessage);
    });
  },
  created() {
    this.getProject();
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://10.4.4.224:93/working-management-hub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection
      .start()
      .then(function() {
        console.log("Connected working-management-hub detail ");
        /// EventBus.$emit("reciveConnection", self.connection);
      })
      .catch(error => {
        console.log("working-management-hub error detail!! ");
        console.log(error);
      });
  },
  destroyed() {}
};
</script>

<style scoped>
body {
  background-color: #3498db;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.container {
  margin: 60px auto;
  background: #fff;
  padding: 0;
  border-radius: 7px;
}

.profile-image {
  width: 50px;
  height: 50px;
  border-radius: 40px;
}

.settings-tray {
  background: #eee;
  padding: 10px 15px;
  border-radius: 7px;
}
.settings-tray .no-gutters {
  padding: 0;
}
.settings-tray--right {
  float: right;
}
.settings-tray--right i {
  margin-top: 10px;
  font-size: 25px;
  color: grey;
  margin-left: 14px;
  transition: 0.3s;
}
.settings-tray--right i:hover {
  color: #74b9ff;
  cursor: pointer;
}

.search-box {
  background: #fafafa;
  padding: 10px 13px;
}
.search-box .input-wrapper {
  background: #fff;
  border-radius: 40px;
}
.search-box .input-wrapper i {
  color: grey;
  margin-left: 7px;
  vertical-align: middle;
}

input {
  border: none;
  border-radius: 30px;
  width: 80%;
}
input::placeholder {
  color: #e3e3e3;
  font-weight: 300;
  margin-left: 20px;
}
input:focus {
  outline: none;
}

.friend-drawer {
  padding: 10px 15px;
  display: flex;
  vertical-align: baseline;
  background: #fff;
  transition: 0.3s ease;
}
.friend-drawer--grey {
  background: #eee;
}
.friend-drawer .text {
  margin-left: 12px;
  width: 70%;
}
.friend-drawer .text h6 {
  margin-top: 6px;
  margin-bottom: 0;
}
.friend-drawer .text p {
  margin: 0;
}
.friend-drawer .time {
  color: grey;
}
.friend-drawer--onhover:hover {
  background: #74b9ff;
  cursor: pointer;
}
.friend-drawer--onhover:hover p,
.friend-drawer--onhover:hover h6,
.friend-drawer--onhover:hover .time {
  color: #fff !important;
}

hr {
  margin: 5px auto;
  width: 60%;
}

.chat-bubble {
  padding: 10px 14px;
  background: #eee;
  margin: 10px 30px;
  border-radius: 9px;
  position: relative;
  animation: fadeIn 1s ease-in;
}
.chat-bubble:after {
  content: "";
  position: absolute;
  top: 50%;
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-bottom: 0;
  margin-top: -10px;
}
.chat-bubble--left:after {
  left: 0;
  border-right-color: #eee;
  border-left: 0;
  margin-left: -20px;
}
.chat-bubble--right:after {
  right: 0;
  border-left-color: #74b9ff;
  border-right: 0;
  margin-right: -20px;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.offset-md-9 .chat-bubble {
  background: #74b9ff;
  color: #fff;
}

.chat-box-tray {
  background: #eee;
  display: flex;
  align-items: baseline;
  padding: 10px 15px;
  align-items: center;
  margin-top: 19px;
  bottom: 0;
}
.chat-box-tray input {
  margin: 0 10px;
  padding: 6px 2px;
}
.chat-box-tray i {
  color: grey;
  font-size: 30px;
  vertical-align: middle;
}
.chat-box-tray i:last-of-type {
  margin-left: 25px;
}
</style>
