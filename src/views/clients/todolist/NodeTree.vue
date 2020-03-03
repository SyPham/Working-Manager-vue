<template>
  <div>
    <div class="comment-box-wrapper">
      <div class="comment-box">
        <img :src="imageBase64CurrentUser()" class="commenter-image" alt="commenter_image" />
        <div class="comment-content">
          <div class="commenter-head">
            <span class="commenter-name">
              <a href>{{node.Username | capitalize}}</a>
            </span>
            <span class="comment-date">
              <i class="far fa-clock"></i>
              {{$common.JSONDateWithTime(node.CreatedTime)}}
            </span>
          </div>
          <div class="comment-body">
            <span class="comment">{{node.Content}}</span>
          </div>
          <div class="comment-footer">
            <!-- <span class="comment-likes">
              55
              <a href class="comment-action active">
                <i class="far fa-heart"></i>
              </a>
            </span>-->
            <span class="comment-reply">
              <a v-show="node.HasChildren">{{ node.HasChildren ? node.children.length : 0 }}</a>
              <a
                href
                class="comment-action"
                style="cursor: pointer;"
                @click.prevent="clickReply"
              >{{ node.HasChildren ? "Replies" : "Reply" }}</a>
            </span>
          </div>
        </div>
      </div>
      <!-- v-if="index < node.children.length" -->
      <div class="nested-comments">
        <div class="comment-box-wrapper">
          <node
            v-for="(child, key, index) in node.children"
            :key="index"
            :taskID="taskID"
            :node="child"
            v-if="key < totalShow"
          ></node>
        </div>
        <template v-if="totalShow < node.children.length || node.children.length > totalShow">
          <small
            style="cursor: pointer;"
            @click="totalShow += 3"
            class="text-center text-primary d-block"
          >
            Load more
            <i class="fas fa-chevron-down text-small"></i>
          </small>
        </template>
      </div>
      <div class="comment-box" v-if="isShow">
        <img :src="imageBase64CurrentUser()" class="commenter-image" alt="commenter_image" />
        <input
          @keypress="addSubComment(node.ID,$event.target.value)"
          class="form-control ml-1 mt-1 form-control-sm"
          type="text"
          placeholder="Type a comment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "../../../EventBus";
export default {
  name: "node",
  data() {
    return {
      dataComment: [],
      isShow: false,
      totalShow: 3
    };
  },
  props: {
    node: Object,
    taskID: Number
  },
  methods: {
    clickReply(taskID) {
      this.isShow = !this.isShow;
    },
    getAllComment() {
      let self = this;

      let userid = Number(localStorage.getItem("UserID"));
      self.$api
        .get(`api/Comments/GetAll/${self.taskID}/${userid}`)
        .then(res => {
          if (res.data) {
            console.log("Comments");
            console.log(res.data);
            self.dataComment = [];
            self.dataComment = res.data;
          }
        });
    },
    addSubComment(parentid, content) {
      let self = this;
      let e = event;
      if (e.keyCode === 13) {
        console.log("addSubComment");
        console.log(event);

        let subComment = {
          content: content,
          taskid: self.taskID,
          parentid: parentid,
          userid: Number(localStorage.getItem("UserID"))
        };
        self.$api.post("api/Comments/AddSub", subComment).then(res => {
          if (res.data) {
            self.getAllComment();
            self.$alertify.success("successfully!");
            self.$emit("AddSub", true);
            EventBus.$emit("AddSub", self.taskID);
            e.target.value = "";
            debugger;
          } else self.$alertify.error("Failed!");
        });
      }
    },
    imageBase64CurrentUser() {
      if (localStorage.getItem("ImageProfile") == "null") {
        return "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEVsdX3////Hy86jqK1+ho2Ql521ur7a3N7s7e5YhiPTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==";
      } else {
        return "data:image/png;base64, " + localStorage.getItem("ImageProfile");
      }
    },
    imageBase64(img) {
      if (img == null) {
        return "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEVsdX3////Hy86jqK1+ho2Ql521ur7a3N7s7e5YhiPTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==";
      } else {
        return "data:image/png;base64, " + img;
      }
    }
  }
};
</script>