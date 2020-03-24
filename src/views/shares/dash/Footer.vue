<template>
  <footer class="main-footer">
    <img
      style="width:30px;height:30px;border-radius:50%"
      src="../../../assets/logo-1.png"
      alt="message user image"
    />
    <!-- To the right -->
    <div class="float-right d-none d-sm-inline"></div>
    <!-- Default to the left -->
    <strong>
      Copyright © 2020-2021
      <a href="http://10.4.4.92:93/">By Lab Team</a>.
    </strong>

    <div class="row">
      <div class="chat-main">
        <div class="col-md-12 chat-header rounded-top bg-primary text-white">
          <div class="row">
            <div class="col-md-6 username pl-2">
              <i class="fa fa-circle text-success" aria-hidden="true"></i>
              <h6 class="m-0">No Name</h6>
            </div>
            <div class="col-md-6 options text-right pr-2">
              <!-- <i class="fas fa-times mr-2" aria-hidden="true"></i> -->
              <!-- <i class="fas fa-minus" aria-hidden="true"></i> -->
              <!-- <i class="fa fa-circle text-success live-video mr-1" aria-hidden="true"></i>
              <i class="fa fa-phone mr-2" aria-hidden="true"></i>
              <i class="fa fa-cog mr-2" aria-hidden="true"></i>-->
              <i class="fas fa-times hide-chat-box"></i>
            </div>
          </div>
        </div>
        <div class="chat-content">
          <div class="col-md-12 chats border">
            <ul class="p-0">
              <li
                v-for="(item,key,index) in chatMessages"
                :key="index"
                class=""
              >
                <template v-if="item.UserID == user">{{item.Message}}</template>
                <div v-else class="receive-msg">
                  <img :src="imageBase64(item.ImageBase64)" />
                  <div class="receive-msg-desc text-center mt-1 ml-1 pl-2 pr-2">
                    <p class="pl-2 pr-2 rounded">{{item.Message}}</p>
                  </div>
                </div>
              </li>
              <!-- <li class="p-1 rounded mb-1"></li> -->
            </ul>
          </div>
          <div class="col-md-12 message-box border pl-2 pr-2 border-top-0">
            <input type="text" class="pl-0 pr-0 w-100" placeholder="Type a message..." />
            <div class="tools d-none">
              <i class="fa fa-picture-o" aria-hidden="true"></i>
              <i class="fa fa-telegram" aria-hidden="true"></i>
              <i class="fa fa-bell" aria-hidden="true"></i>
              <i class="fa fa-meh-o" aria-hidden="true"></i>
              <i class="fa fa-paperclip" aria-hidden="true"></i>
              <i class="fa fa-gamepad" aria-hidden="true"></i>
              <i class="fa fa-camera" aria-hidden="true"></i>
              <i class="fa fa-folder" aria-hidden="true"></i>
              <i class="fa fa-thumbs-o-up m-0" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div
      class="zalo-chat-widget"
      data-oaid="1017730148801262105"
      data-welcome-message="Glad to support you!"
      data-autopopup="0"
      data-width="350"
      data-height="420"
    ></div>-->
  </footer>
</template>

<script>
export default {
  name: "appFooter",
  data() {
    return {
      isActive: false,
      connection: [],
      keyword: "",
      ListProject: [],
      totalPage: 0,
      projectName: "No group",
      message: "",
      chatMessages: [],
      room: 0,
      user: localStorage.getItem("UserID"),
      typing: "",
      joinGroupMesasge: "",
      isHide: false
    };
  },
  methods: {
    displayMessage(userID) {
      if (Number(this.user) == Number(userID))
        return "pl-2 pr-2 bg-primary rounded text-white text-center send-msg mb-1";
      else return "p-1 rounded mb-1";
    },
    imageBase64(img) {
      if (img == null) {
        return "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEVsdX3////Hy86jqK1+ho2Ql521ur7a3N7s7e5YhiPTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==";
      } else {
        return "data:image/png;base64, " + img;
      }
    },
    sendMessage(event) {
      var self = this;
      console.log(event);
      console.log(self.$refs.inputChat);

      if (event.type === "keyup") {
        self.connection
          .invoke(
            "StopTyping",
            self.room.toString(),
            localStorage.getItem("UserID")
          )
          .catch(function(err) {
            return console.error(err.toString());
          });
      }
      self.connection
        .invoke("Typing", self.room.toString(), localStorage.getItem("UserID"))
        .catch(function(err) {
          return console.error(err.toString());
        });
      if (event.keyCode === 13) {
        self.sendToGroup();
        self.$refs.messageBox.scrollTop = self.$refs.messageBox.scrollHeight;
      }
    },
    joinGroup(item) {
      let self = this;
      self.isActive = true;
      let currentUser = Number(localStorage.getItem("UserID"));
      let managers = item.Manager || [];
      let members = item.Members || [];
      if (managers.concat(members).includes(currentUser)) {
        self.room = item.Room;
        self.projectName = item.Name;

        self.connection
          .invoke("JoinGroup", item.Room.toString(), self.user)
          .catch(function(err) {
            return console.error(err.toString());
          });
        self.getChatMessage(item.Room);
      } else {
        self.room = 0;
        self.$swal("Waring!", "You do not belong in this group!", "warning");
      }
    },
    sendToGroup() {
      let self = this;

      self.connection
        .invoke(
          "SendMessageToGroup",
          self.room.toString(),
          self.message,
          localStorage.getItem("UserID")
        )
        .catch(function(err) {
          return console.error(err.toString());
        });
      self.message = "";
      self.getChatMessage(self.room);
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
    getChatMessage(room) {
      let self = this;
      self.$api
        .get(`api/Chat/GetAllMessageByRoomAndProject/${room}`)
        .then(res => {
          console.log(res);
          self.chatMessages = [];
          self.chatMessages = res.data;
          console.log("GetAllMessageByRoomAndProject");
          console.log(self.chatMessages);
        });
    },
    reciveConnection(conn) {
      this.connection = conn;
    }
  },
  mounted() {
    console.log(this.$common.getMondaysInMonth(3));
    console.log(this.$common.getSaturdaysInMonth(3));
    $(".chat-content").hide();
    $(".hide-chat-box").click(function() {
      $(".chat-content").slideToggle();
    });
    var self = this;
    self.connection.on("ReceiveJoinGroup", function(user, username) {
      if (Number(localStorage.getItem("UserID")) !== Number(user)) {
        $(".chat-content").show();
        self.joinGroupMesasge = `${username} already joined this group!`;
        self.$alertify.info(self.joinGroupMesasge);
      }
    });

    self.connection.on("ReceiveStopTyping", function(user) {
      self.typing = "";
    });
    self.connection.on("ReceiveTyping", function(user, username) {
      if (Number(localStorage.getItem("UserID")) !== Number(user))
        self.typing = `${username} is typing`;
    });

    self.connection.on("ReceiveMessageGroup", function(message) {
      self.getChatMessage(self.room);
    });
    $("#inputChat").on("blur", function() {
      self.connection
        .invoke(
          "StopTyping",
          self.room.toString(),
          localStorage.getItem("UserID")
        )
        .catch(function(err) {
          return console.error(err.toString());
        });
    });
    $("#profile-img").click(function() {
      $("#status-options").toggleClass("active");
    });

    $(".expand-button").click(function() {
      $("#profile").toggleClass("expanded");
      $("#contacts").toggleClass("expanded");
    });

    $("#status-options ul li").click(function() {
      $("#profile-img").removeClass();
      $("#status-online").removeClass("active");
      $("#status-away").removeClass("active");
      $("#status-busy").removeClass("active");
      $("#status-offline").removeClass("active");
      $(this).addClass("active");

      if ($("#status-online").hasClass("active")) {
        $("#profile-img").addClass("online");
      } else if ($("#status-away").hasClass("active")) {
        $("#profile-img").addClass("away");
      } else if ($("#status-busy").hasClass("active")) {
        $("#profile-img").addClass("busy");
      } else if ($("#status-offline").hasClass("active")) {
        $("#profile-img").addClass("offline");
      } else {
        $("#profile-img").removeClass();
      }

      $("#status-options").removeClass("active");
    });
  },
  created() {
    var self = this;
    self.getProject();
    self.connection = self.$SIGNALR;
  }
};
</script>

<style scoped>
.chat-main {
  display: none;
  position: fixed;
  width: 270px;
  bottom: 5px;
  right: 15px;
}
.chat-header {
  background: #4267b2;
  padding-top: 1px;
  padding-bottom: 1px;
}
.username i {
  font-size: 9px;
}
.username h6 {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
}
.options i {
  font-size: 14px;
  font-weight: bold;
  opacity: 0.7;
}
.options .live-video {
  font-size: 6px;
}
.chats {
  height: 260px;
  overflow-x: scroll;
  overflow-x: hidden;
  background-color: white;
}
.chats ul li {
  list-style: none;
  clear: both;
  font-size: 13px;
}
.chats .send-msg {
  float: right;
}
.receive-msg img {
  border-radius: 100%;
  height: 30px;
  width: 12%;
}
.receive-msg-img {
  display: inline;
}
.receive-msg .receive-msg-desc {
  display: inline-block;
}
.receive-msg .receive-msg-desc p {
  background: #c1c1c1;
}
.message-box input {
  border: none;
  font-size: 13px;
  opacity: 0.7;
}
.message-box input:focus {
  outline: none;
}
.tools i {
  color: #a1a1a1;
  cursor: pointer;
  font-size: 20px;
  margin-right: 6px;
}
</style>
