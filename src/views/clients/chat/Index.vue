<template>
  <div>
    <div id="frame">
      <div id="sidepanel">
        <div id="profile">
          <div class="wrap">
            <img
              id="profile-img"
              src="../../../assets/default-150x150.png"
              :class="isActive == true?'online':'offline'"
              alt
            />
            <p>{{projectName}}</p>
            <!-- <i class="fa fa-chevron-down expand-button" aria-hidden="true"></i> -->
            <div id="status-options">
              <ul>
                <li id="status-online">
                  <span class="status-circle"></span>
                  <p>Online</p>
                </li>
                <!-- <li id="status-away">
                  <span class="status-circle"></span>
                  <p>Away</p>
                </li>
                <li id="status-busy">
                  <span class="status-circle"></span>
                  <p>Busy</p>
                </li>-->
                <li id="status-offline">
                  <span class="status-circle"></span>
                  <p>Offline</p>
                </li>
              </ul>
            </div>
            <div id="expanded">
              <!-- <label for="twitter"><i class="fa fa-facebook fa-fw" aria-hidden="true"></i></label>
					<input name="twitter" type="text" value="mikeross" />
					<label for="twitter"><i class="fa fa-twitter fa-fw" aria-hidden="true"></i></label>
					<input name="twitter" type="text" value="ross81" />
					<label for="twitter"><i class="fa fa-instagram fa-fw" aria-hidden="true"></i></label>
              <input name="twitter" type="text" value="mike.ross" />-->
            </div>
          </div>
        </div>
        <div id="search">
          <label for>
            <i class="fa fa-search" aria-hidden="true"></i>
          </label>
          <input type="text" v-model="keyword" placeholder="Search project..." />
        </div>
        <div id="contacts">
          <ul>
            <li
              class="contact"
              v-for="(item, key,index) in ListProject"
              :key="index"
              @click="joinGroup(item)"
            >
              <div class="wrap">
                <!-- <span class="contact-status online"></span> -->
                <img src="../../../assets/default-150x150.png" alt />
                <div class="meta">
                  <p class="name">{{item.Name}}</p>
                  <!-- <p class="preview">You just got LITT up, Mike.</p> -->
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div id="bottom-bar">
          <button id="addcontact" class="d-none">
            <i class="fa fa-user-plus fa-fw" aria-hidden="true"></i>
            <span>Add group</span>
          </button>
          <button id="settings" class="d-none">
            <i class="fa fa-cog fa-fw" aria-hidden="true"></i>
            <span>Settings</span>
          </button>
        </div>
      </div>
      <div class="content">
        <div class="contact-profile">
          <img src="../../../assets/default-150x150.png" alt />
          <p>{{projectName}}</p>
          <div class="social-media">
            <i class="fab fa-facebook-f"></i>
            <i class="fab fa-twitter-square"></i>
            <i class="fab fa-instagram-square"></i>
          </div>
        </div>

        <div class="messages" ref="messageBox">
          <ul>
            <li
              v-for="(item, key,index) in chatMessages"
              :key="index"
              :class="item.UserID == user?'sent':'replies'"
            >
              <div class="clearfix">
                <div
                  :class="item.UserID == user?'username-sent':'username-replies'"
                >{{item.Username}}, {{$common.JSONDateWithTime(item.CreatedTime)}}</div>
              </div>
              <div>
                <img :src="imageBase64(item.ImageBase64)" alt />
                <p>{{item.Message}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="message-input">
          <div class="pl-2">
            <small style="color:#808080" class="typing">{{typing}}</small>
          </div>
          <div class="wrap">
            <input
              type="text"
              v-model="message"
              ref="inputChat"
              id="inputChat"
              v-on:keyup.prevent="sendMessage"
              placeholder="Write your message..."
            />
            <i class="fa fa-paperclip attachment" aria-hidden="true"></i>
            <button class="submit" @click="sendToGroup">
              <i class="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
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
    var self = this;
    self.connection.on("ReceiveJoinGroup", function(user, username) {
      if (Number(localStorage.getItem("UserID")) !== Number(user)) {
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
  },
  destroyed() {},
  watch: {
    chatMessages: function(newVal, oldVal) {
      var self = this;
    },
    keyword: function(newVal, oldVal) {
      var self = this;
      self.keyword = newVal;
      self.getProject();
    }
  }
};
</script>

<style scoped>
body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #27ae60;
  font-family: "proxima-nova", "Source Sans Pro", sans-serif;
  font-size: 1em;
  letter-spacing: 0.1px;
  color: #32465a;
  text-rendering: optimizeLegibility;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
  -webkit-font-smoothing: antialiased;
}

#frame {
  width: 100%;
  min-width: 360px;
  max-width: 1232px;
  height: 92vh;
  min-height: 300px;
  max-height: 720px;
  background: #e6eaea;
}
@media screen and (max-width: 360px) {
  #frame {
    width: 100%;
    height: 100vh;
  }
}
#frame #sidepanel {
  float: left;
  min-width: 280px;
  max-width: 340px;
  width: 40%;
  height: 100%;
  background: #2c3e50;
  color: #f5f5f5;
  overflow: hidden;
  position: relative;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel {
    width: 58px;
    min-width: 58px;
  }
}
#frame #sidepanel #profile {
  width: 80%;
  margin: 25px auto;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile {
    width: 100%;
    margin: 0 auto;
    padding: 5px 0 0 0;
    background: #32465a;
  }
}
#frame #sidepanel #profile.expanded .wrap {
  height: 210px;
  line-height: initial;
}
#frame #sidepanel #profile.expanded .wrap p {
  margin-top: 20px;
}
#frame #sidepanel #profile.expanded .wrap i.expand-button {
  -moz-transform: scaleY(-1);
  -o-transform: scaleY(-1);
  -webkit-transform: scaleY(-1);
  transform: scaleY(-1);
  filter: FlipH;
  -ms-filter: "FlipH";
}
#frame #sidepanel #profile .wrap {
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  -moz-transition: 0.3s height ease;
  -o-transition: 0.3s height ease;
  -webkit-transition: 0.3s height ease;
  transition: 0.3s height ease;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile .wrap {
    height: 55px;
  }
}
#frame #sidepanel #profile .wrap img {
  width: 50px;
  border-radius: 50%;
  padding: 3px;
  border: 2px solid #e74c3c;
  height: auto;
  float: left;
  cursor: pointer;
  -moz-transition: 0.3s border ease;
  -o-transition: 0.3s border ease;
  -webkit-transition: 0.3s border ease;
  transition: 0.3s border ease;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile .wrap img {
    width: 40px;
    margin-left: 4px;
  }
}
#frame #sidepanel #profile .wrap img.online {
  border: 2px solid #2ecc71;
}
#frame #sidepanel #profile .wrap img.away {
  border: 2px solid #f1c40f;
}
#frame #sidepanel #profile .wrap img.busy {
  border: 2px solid #e74c3c;
}
#frame #sidepanel #profile .wrap img.offline {
  border: 2px solid #95a5a6;
}
#frame #sidepanel #profile .wrap p {
  float: left;
  margin-left: 15px;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile .wrap p {
    display: none;
  }
}
#frame #sidepanel #profile .wrap i.expand-button {
  float: right;
  margin-top: 23px;
  font-size: 0.8em;
  cursor: pointer;
  color: #435f7a;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile .wrap i.expand-button {
    display: none;
  }
}
#frame #sidepanel #profile .wrap #status-options {
  position: absolute;
  opacity: 0;
  visibility: hidden;
  width: 150px;
  margin: 70px 0 0 0;
  border-radius: 6px;
  z-index: 99;
  line-height: initial;
  background: #435f7a;
  -moz-transition: 0.3s all ease;
  -o-transition: 0.3s all ease;
  -webkit-transition: 0.3s all ease;
  transition: 0.3s all ease;
}
#frame #sidepanel #profile .wrap #status-options ul {
  padding: 0;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile .wrap #status-options {
    width: 58px;
    margin-top: 57px;
  }
}
#frame #sidepanel #profile .wrap #status-options.active {
  opacity: 1;
  visibility: visible;
  margin: 75px 0 0 0;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile .wrap #status-options.active {
    margin-top: 62px;
  }
}
#frame #sidepanel #profile .wrap #status-options:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 8px solid #435f7a;
  margin: -8px 0 0 24px;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile .wrap #status-options:before {
    margin-left: 23px;
  }
}
#frame #sidepanel #profile .wrap #status-options ul {
  overflow: hidden;
  border-radius: 6px;
}
#frame #sidepanel #profile .wrap #status-options ul li {
  padding: 15px 0 30px 18px;
  display: block;
  cursor: pointer;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile .wrap #status-options ul li {
    padding: 15px 0 35px 22px;
  }
}
#frame #sidepanel #profile .wrap #status-options ul li:hover {
  background: #496886;
}
#frame #sidepanel #profile .wrap #status-options ul li span.status-circle {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 5px 0 0 0;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile .wrap #status-options ul li span.status-circle {
    width: 14px;
    height: 14px;
  }
}
#frame
  #sidepanel
  #profile
  .wrap
  #status-options
  ul
  li
  span.status-circle:before {
  content: "";
  position: absolute;
  width: 14px;
  height: 14px;
  margin: -3px 0 0 -3px;
  background: transparent;
  border-radius: 50%;
  z-index: 0;
}
@media screen and (max-width: 735px) {
  #frame
    #sidepanel
    #profile
    .wrap
    #status-options
    ul
    li
    span.status-circle:before {
    height: 18px;
    width: 18px;
  }
}
#frame #sidepanel #profile .wrap #status-options ul li p {
  padding-left: 12px;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile .wrap #status-options ul li p {
    display: none;
  }
}
#frame
  #sidepanel
  #profile
  .wrap
  #status-options
  ul
  li#status-online
  span.status-circle {
  background: #2ecc71;
}
#frame
  #sidepanel
  #profile
  .wrap
  #status-options
  ul
  li#status-online.active
  span.status-circle:before {
  border: 1px solid #2ecc71;
}
#frame
  #sidepanel
  #profile
  .wrap
  #status-options
  ul
  li#status-away
  span.status-circle {
  background: #f1c40f;
}
#frame
  #sidepanel
  #profile
  .wrap
  #status-options
  ul
  li#status-away.active
  span.status-circle:before {
  border: 1px solid #f1c40f;
}
#frame
  #sidepanel
  #profile
  .wrap
  #status-options
  ul
  li#status-busy
  span.status-circle {
  background: #e74c3c;
}
#frame
  #sidepanel
  #profile
  .wrap
  #status-options
  ul
  li#status-busy.active
  span.status-circle:before {
  border: 1px solid #e74c3c;
}
#frame
  #sidepanel
  #profile
  .wrap
  #status-options
  ul
  li#status-offline
  span.status-circle {
  background: #95a5a6;
}
#frame
  #sidepanel
  #profile
  .wrap
  #status-options
  ul
  li#status-offline.active
  span.status-circle:before {
  border: 1px solid #95a5a6;
}
#frame #sidepanel #profile .wrap #expanded {
  padding: 100px 0 0 0;
  display: block;
  line-height: initial !important;
}
#frame #sidepanel #profile .wrap #expanded label {
  float: left;
  clear: both;
  margin: 0 8px 5px 0;
  padding: 5px 0;
}
#frame #sidepanel #profile .wrap #expanded input {
  border: none;
  margin-bottom: 6px;
  background: #32465a;
  border-radius: 3px;
  color: #f5f5f5;
  padding: 7px;
  width: calc(100% - 43px);
}
#frame #sidepanel #profile .wrap #expanded input:focus {
  outline: none;
  background: #435f7a;
}
#frame #sidepanel #search {
  border-top: 1px solid #32465a;
  border-bottom: 1px solid #32465a;
  font-weight: 300;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #search {
    display: none;
  }
}
#frame #sidepanel #search label {
  position: absolute;
  margin: 10px 0 0 20px;
}
#frame #sidepanel #search input {
  font-family: "proxima-nova", "Source Sans Pro", sans-serif;
  padding: 10px 0 10px 46px;
  width: calc(100% - 25px);
  border: none;
  background: #32465a;
  color: #f5f5f5;
}
#frame #sidepanel #search input:focus {
  outline: none;
  background: #435f7a;
}
#frame #sidepanel #search input::-webkit-input-placeholder {
  color: #f5f5f5;
}
#frame #sidepanel #search input::-moz-placeholder {
  color: #f5f5f5;
}
#frame #sidepanel #search input:-ms-input-placeholder {
  color: #f5f5f5;
}
#frame #sidepanel #search input:-moz-placeholder {
  color: #f5f5f5;
}
#frame #sidepanel #contacts {
  height: calc(100% - 177px);
  overflow-y: scroll;
  overflow-x: hidden;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #contacts {
    height: calc(100% - 149px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
  #frame #sidepanel #contacts::-webkit-scrollbar {
    display: none;
  }
}
#frame #sidepanel #contacts.expanded {
  height: calc(100% - 334px);
}
#frame #sidepanel #contacts::-webkit-scrollbar {
  width: 8px;
  background: #2c3e50;
}
#frame #sidepanel #contacts::-webkit-scrollbar-thumb {
  background-color: #243140;
}
#frame #sidepanel #contacts ul li.contact {
  position: relative;
  padding: 10px 0 15px 0;
  font-size: 0.9em;
  cursor: pointer;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #contacts ul li.contact {
    padding: 6px 0 46px 8px;
  }
}
#frame #sidepanel #contacts ul li.contact:hover {
  background: #32465a;
}
#frame #sidepanel #contacts ul li.contact.active {
  background: #32465a;
  border-right: 5px solid #435f7a;
}
#frame #sidepanel #contacts ul li.contact.active span.contact-status {
  border: 2px solid #32465a !important;
}
#frame #sidepanel #contacts ul li.contact .wrap {
  width: 88%;
  margin: 0 auto;
  position: relative;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #contacts ul li.contact .wrap {
    width: 100%;
  }
}
#frame #sidepanel #contacts ul li.contact .wrap span {
  position: absolute;
  left: 0;
  margin: -2px 0 0 -2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #2c3e50;
  background: #95a5a6;
}
#frame #sidepanel #contacts ul li.contact .wrap span.online {
  background: #2ecc71;
}
#frame #sidepanel #contacts ul li.contact .wrap span.away {
  background: #f1c40f;
}
#frame #sidepanel #contacts ul li.contact .wrap span.busy {
  background: #e74c3c;
}
#frame #sidepanel #contacts ul li.contact .wrap img {
  width: 40px;
  border-radius: 50%;
  float: left;
  margin-right: 10px;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #contacts ul li.contact .wrap img {
    margin-right: 0px;
  }
}
#frame #sidepanel #contacts ul li.contact .wrap .meta {
  padding: 5px 0 0 0;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #contacts ul li.contact .wrap .meta {
    display: none;
  }
}
#frame #sidepanel #contacts ul li.contact .wrap .meta .name {
  font-weight: 600;
}
#frame #sidepanel #contacts ul li.contact .wrap .meta .preview {
  margin: 5px 0 0 0;
  padding: 0 0 1px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -moz-transition: 1s all ease;
  -o-transition: 1s all ease;
  -webkit-transition: 1s all ease;
  transition: 1s all ease;
}
#frame #sidepanel #contacts ul li.contact .wrap .meta .preview span {
  position: initial;
  border-radius: initial;
  background: none;
  border: none;
  padding: 0 2px 0 0;
  margin: 0 0 0 1px;
  opacity: 0.5;
}
#frame #sidepanel #bottom-bar {
  position: absolute;
  width: 100%;
  bottom: 0;
}
#frame #sidepanel #bottom-bar button {
  float: left;
  border: none;
  width: 50%;
  padding: 10px 0;
  background: #32465a;
  color: #f5f5f5;
  cursor: pointer;
  font-size: 0.85em;
  font-family: "proxima-nova", "Source Sans Pro", sans-serif;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #bottom-bar button {
    float: none;
    width: 100%;
    padding: 15px 0;
  }
}
#frame #sidepanel #bottom-bar button:focus {
  outline: none;
}
#frame #sidepanel #bottom-bar button:nth-child(1) {
  border-right: 1px solid #2c3e50;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #bottom-bar button:nth-child(1) {
    border-right: none;
    border-bottom: 1px solid #2c3e50;
  }
}
#frame #sidepanel #bottom-bar button:hover {
  background: #435f7a;
}
#frame #sidepanel #bottom-bar button i {
  margin-right: 3px;
  font-size: 1em;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #bottom-bar button i {
    font-size: 1.3em;
  }
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #bottom-bar button span {
    display: none;
  }
}
#frame .content {
  float: right;
  width: 60%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
@media screen and (max-width: 735px) {
  #frame .content {
    width: calc(100% - 58px);
    min-width: 300px !important;
  }
}
@media screen and (min-width: 900px) {
  #frame .content {
    width: calc(100% - 340px);
  }
}
#frame .content .contact-profile {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #f5f5f5;
}
#frame .content .contact-profile img {
  width: 40px;
  border-radius: 50%;
  float: left;
  margin: 9px 12px 0 9px;
}
#frame .content .contact-profile p {
  float: left;
}
#frame .content .contact-profile .social-media {
  float: right;
}
#frame .content .contact-profile .social-media i {
  margin-left: 14px;
  cursor: pointer;
}
#frame .content .contact-profile .social-media i:nth-last-child(1) {
  margin-right: 20px;
}
#frame .content .contact-profile .social-media i:hover {
  color: #435f7a;
}
#frame .content .messages {
  width: 100%;
  height: auto;
  min-height: calc(100% - 93px);
  max-height: calc(100% - 93px);
  overflow-y: scroll;
  overflow-x: hidden;
}
#frame .content .messages ul {
  padding: 0;
}
@media screen and (max-width: 735px) {
  #frame .content .messages {
    max-height: calc(100% - 105px);
  }
}
#frame .content .messages::-webkit-scrollbar {
  width: 8px;
  background: transparent;
}
#frame .content .messages::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
}
#frame .content .messages ul li {
  display: inline-block;
  clear: both;
  float: left;
  margin: 15px 15px 5px 15px;
  width: calc(100% - 25px);
  font-size: 0.9em;
}
#frame .content .messages ul li:nth-last-child(1) {
  margin-bottom: 20px;
}
#frame .content .messages ul li.sent .username-sent {
  margin-left: 30px;
  color: #95a5a6;
}
#frame .content .messages ul li.sent img {
  margin: 6px 8px 0 0;
}
#frame .content .messages ul li.sent p {
  background: #435f7a;
  color: #f5f5f5;
}
#frame .content .messages ul li.replies .username-replies {
  float: right;
  margin-right: 30px;
  color: #95a5a6;
}
#frame .content .messages ul li.replies img {
  float: right;
  margin: 6px 0 0 8px;
}
#frame .content .messages ul li.replies p {
  background: #f5f5f5;
  float: right;
}
#frame .content .messages ul li img {
  width: 22px;
  border-radius: 50%;
  float: left;
}
#frame .content .messages ul li p {
  display: inline-block;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 205px;
  line-height: 130%;
}
@media screen and (min-width: 735px) {
  #frame .content .messages ul li p {
    max-width: 300px;
  }
}
#frame .content .message-input {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 99;
}
#frame .content .message-input .wrap {
  position: relative;
}
#frame .content .message-input .wrap input {
  font-family: "proxima-nova", "Source Sans Pro", sans-serif;
  float: left;
  border: none;
  width: calc(100% - 90px);
  padding: 11px 32px 10px 8px;
  font-size: 0.8em;
  color: #32465a;
}
@media screen and (max-width: 735px) {
  #frame .content .message-input .wrap input {
    padding: 15px 32px 16px 8px;
  }
}
#frame .content .message-input .wrap input:focus {
  outline: none;
}
#frame .content .message-input .wrap .attachment {
  position: absolute;
  right: 60px;
  z-index: 4;
  margin-top: 10px;
  font-size: 1.1em;
  color: #435f7a;
  opacity: 0.5;
  cursor: pointer;
}
@media screen and (max-width: 735px) {
  #frame .content .message-input .wrap .attachment {
    margin-top: 17px;
    right: 65px;
  }
}
#frame .content .message-input .wrap .attachment:hover {
  opacity: 1;
}
#frame .content .message-input .wrap button {
  float: right;
  border: none;
  width: 50px;
  padding: 12px 0;
  cursor: pointer;
  background: #32465a;
  color: #f5f5f5;
}
@media screen and (max-width: 735px) {
  #frame .content .message-input .wrap button {
    padding: 16px 0;
  }
}
#frame .content .message-input .wrap button:hover {
  background: #435f7a;
}
#frame .content .message-input .wrap button:focus {
  outline: none;
}

.typing {
  position: relative;
  display: inline-block;
}

.typing:after {
  position: absolute;
  margin-left: 0.1rem;
  content: " ...";
  display: inline-block;
  animation: loading steps(4) 2s infinite;
  clip: rect(auto, 0px, auto, auto);
}

@keyframes loading {
  to {
    clip: rect(auto, 20px, auto, auto);
  }
}
</style>