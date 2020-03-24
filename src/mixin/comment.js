export default {
    data: function () {
        return {
            comment: {
                content: "",
                taskid: 0,
                userid: Number(localStorage.getItem("UserID"))
            },
            dataComment: [],
            totalShow: 3,
            taskName: "",
        }
    },
    methods: {
        AddSub(data) {
            this.getAllComment(data);
        },
        isLoadComment(data) {
            this.getAllComment(data);
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
        },
        clearFormComment() {
            var self = this;
            self.comment = {
                content: "",
                taskid: 0,
                userid: Number(localStorage.getItem("UserID"))
            };
        },
        addComment() {
            let self = this;
            self.$api.post("api/Comments/Add", self.comment).then(res => {
                if (res.data) {
                    self.dataComment = res.data;
                    self.getAllComment(self.comment.taskid);
                    self.$alertify.success("successfully!");
                    self.comment.content = "";
                } else self.$alertify.error("Failed!");
            });
        },
        addSubComment(parentid, content) {
            let self = this;
            if (event.keyCode === 13) {
                let subComment = {
                    content: content,
                    taskid: self.comment.taskid,
                    parentid: parentid,
                    userid: Number(localStorage.getItem("UserID"))
                };
                self.$api.post("api/Comments/AddSub", subComment).then(res => {
                    if (res.data) {
                        self.getAllComment(self.comment.taskid);
                        self.$alertify.success("successfully!");
                    } else self.$alertify.error("Failed!");
                });
            }
        },
        getAllComment(taskid) {
            let self = this;

            let userid = Number(localStorage.getItem("UserID"));
            self.$api.get(`api/Comments/GetAll/${taskid}/${userid}`).then(res => {
                if (res.data) {
                    console.log("Comments");
                    console.log(res.data);
                    self.dataComment = [];
                    self.dataComment = res.data;
                }
            });
        },
    }
}