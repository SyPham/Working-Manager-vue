<template>
  <div class="message">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List Notification</h3>

            <div class="card-tools">
              <div class="input-group input-group-sm" style="width: 150px;">
                <input
                  type="text"
                  name="table_search"
                  class="form-control float-right"
                  placeholder="Search"
                />

                <div class="input-group-append">
                  <button type="submit" class="btn btn-default">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Message</th>
                  <th>Seen</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, key, index) in data" :key="index">
                  <td>{{item.ID}}</td>
                  <td @click="pushRouter(item)" style="cursor:poiter;">
                    <img
                      :src="imageBase64(item.ImageBase64)"
                      class="img-circle img-size-32 mr-2"
                      alt="User Image"
                    />
                    {{item.Sender}}
                  </td>
                  <td>{{item.Function}}</td>
                  <td>{{item.Message}}</td>
                  <td>
                    <span
                      :class="item.Seen===true?'badge bg-danger':'badge bg-secondary'"
                    >{{item.Seen===true?"Seen":"New"}}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "notification",
  data() {
    return {
      page: 1,
      pageSize: 10,
      data: []
    };
  },
  created() {
    this.getAllNotificationCurrentUser();
  },
  components: {},
  methods: {
    pushRouter(item) {
      let self = this;
      let path = "/";
      if (item.URL.includes("#")) {
        path = item.URL.split("#")[1];
      } else {
        path = item.URL;
      }
      if (this.$route.name !== "Follow Search") self.$router.push(path);
      else return;
    },
    imageBase64(img) {
      if (img == null) {
        return "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEVsdX3////Hy86jqK1+ho2Ql521ur7a3N7s7e5YhiPTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==";
      } else {
        return "data:image/png;base64, " + img;
      }
    },
    getAllNotificationCurrentUser() {
      let self = this;
      let url = `api/Home/GetNotificationByUser/${self.page}/${self.pageSize}`;
      self.$api.get(url).then(res => {
        //self.data = res.data.model;
        console.log("GetNotificationByUser");
        console.log(res);
        self.total = res.data.total;
        self.data = res.data.model;
        self.loadMore = true;
      });
    }
  }
};
</script>

<style>
</style>