<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">List Project</h5>
            <div class="card-tools">
              <div class="input-group input-group-sm" style="width: 150px;">
                <input
                  type="text"
                  name="projectName"
                  v-model="projectName"
                  class="form-control float-right"
                  placeholder="Search "
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
                  <th>Project Name</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,key,index) in data" :key="index">
                  <td>{{item.ID}}</td>
                  <td>{{item.Name}}</td>
                  <td class="py-0 align-middle">
                    <div v-if="item.CreatedBy == createdBy" class="btn-group btn-group-sm">
                      <button
                        style="cursor: pointer;"
                        class="btn btn-info btn-sm"
                        @click="infoManager(item,index)"
                      >
                        <i class="fas fa-user"></i> Add Manager
                      </button>
                      <button
                        style="cursor: pointer;"
                        class="btn btn-danger btn-sm"
                        @click="infoMember(item,index)"
                      >
                        <i class="fas fa-users"></i> Add Member
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- ./card-body -->
          <div class="card-footer clearfix">
            <paginate
              v-model="page"
              :page-count="totalPage"
              :page-range="3"
              :margin-pages="2"
              :click-handler="clickCallback"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :container-class="'pagination pagination-sm m-0'"
              :page-class="'page-item'"
              :page-link-class="'page-link'"
              :prev-class="'page-item'"
              :prev-link-class="'page-link'"
              :next-class="'page-item'"
              :next-link-class="'page-link'"
              :first-last-button="true"
            ></paginate>
          </div>
          <!-- /.card-footer -->
        </div>
        <!-- /.card -->
      </div>

      <!-- /.col -->
    </div>

    <div class="modal fade" id="modal-add-manager" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              <i class="fas fa-plus"></i> Add Manager
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="JobType">Manager</label>
              <multiselect
                v-model="selected"
                deselect-label="Can't remove this value"
                track-by="ID"
                label="Username"
                placeholder="Select one"
                :options="options"
                :searchable="false"
                :allow-empty="false"
                @select="onSelectManager"
              ></multiselect>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click="addManager" type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <div class="modal fade" id="modal-add-member" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              <i class="fas fa-plus"></i> Add Member
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="JobType">Member</label>
              <multiselect
                v-model="selectedMember"
                tag-placeholder="Add this as new tag"
                placeholder="Search or add a tag"
                label="Username"
                track-by="ID"
                :options="options"
                :multiple="true"
                :taggable="true"
                @select="onSelectMember"
              ></multiselect>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click="addMember" type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  name: "project-user",
  components: {
    Multiselect
  },
  data() {
    return {
      page: 1,
      projectName: " ",
      pageSize: 20,
      totalPage: 0,
      data: [],
      options: [],
      selected: [],
      selectedMember: [],
      manager: {
        UserID: 0,
        ProjectID: 0
      },
      member: {
        users: [],
        ProjectID: 0
      },
      users: [],
      createdBy: localStorage.getItem("UserID")
    };
  },
  created() {
    var self = this;
    self.getProject();
    self.getListUser();
  },
  methods: {
    clickCallback(pageNum) {
      let self = this;
      self.page = pageNum;
      self.getProject();
    },
    onSelectManager(option) {
      this.manager.UserID = option.ID;
      console.log(this.manager.UserID);
    },
    onSelectMember(option) {
      this.member.users.push(option.ID);
      console.log(this.member.UserID);
    },
    infoManager(item, index) {
      let self = this;
      $("#modal-add-manager").modal("show");
      self.manager.ProjectID = item.ID;
      self.GetUserByProjectID(item.ID);
    },
    infoMember(item, index) {
      let self = this;
      $("#modal-add-member").modal("show");
      self.member.ProjectID = item.ID;
      self.GetUserByProjectID(item.ID);
    },
    addManager() {
      let self = this;
      self.$api.post("api/Projects/AddManager", self.manager).then(res => {
        if (res) {
          self.$alertify.success("Add Manager Successfully!");
          $("#modal-add-manager").modal("hide");
        }
        console.log(res);
      });
    },
    addMember() {
      let self = this;
      this.$api.post("api/Projects/AddMember", self.member).then(res => {
        console.log(res);
        if (res) {
          self.$alertify.success("Add Member Successfully!");
          $("#modal-add-member").modal("hide");
        }
      });
    },
    getProject() {
      let self = this;
      let uri = `api/Projects/GetProjects/${self.page}/${self.pageSize}/${self.projectName}`;
      this.$api.get(uri).then(res => {
        self.data = res.data.project;
        self.totalPage = res.data.totalPage;
        console.log(res);
      });
    },
    clearForm() {
      this.manager = {
        UserID: 0,
        ProjectID: 0
      };
      this.member = {
        users: [],
        ProjectID: 0
      };
    },

    getListUser() {
      var self = this;
      self.$api.get(`api/Projects/GetUsers`).then(res => {
        self.users = res.data;
        self.options = res.data;
        console.log("getListUser");
        console.log(self.users);
      });
    },
    GetUserByProjectID(id) {
      var self = this;
      self.$api.get(`api/Projects/GetUserByProjectID/${id}`).then(res => {
        if (res.data.status) {
          self.selected = res.data.selected;
          self.selectedMember = res.data.selectedMember;
        }
      });
    }
  },
  watch: {
    projectName: function(newVal, oldVal) {
      var self = this;
      self.projectName = newVal;
      self.getProject();
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
</style>
