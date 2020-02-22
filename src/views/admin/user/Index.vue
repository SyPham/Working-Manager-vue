<template>
  <div>
    <div class="row">
      <div class="col-md-12 pb-4">
        <button
          type="button"
          class="btn bg-gradient-secondary btn-sm"
          data-toggle="modal"
          data-target="#modal-add"
        >
          <i class="fas fa-plus"></i> Add User
        </button>
      </div>
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">List User</h5>

            <div class="card-tools">
              <button type="button" class="btn btn-tool" data-card-widget="collapse">
                <i class="fas fa-minus"></i>
              </button>

              <button type="button" class="btn btn-tool" data-card-widget="remove">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="card-tools pr-5">
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
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Position</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,key,index) in ListUser" :key="index">
                  <td>{{item.ID}}</td>
                  <td>{{item.Username}}</td>
                  <td>{{item.Email}}</td>
                  <td>{{item.RoleName}}</td>
                  <td>{{item.isLeader == true ?"Leader" : "Staff"}}</td>
                  <td class="py-0 align-middle">
                    <div class="btn-group btn-group-sm">
                      <a @click="edit(item,index)" style="cursor: pointer;" class="btn btn-info">
                        <i style="color:white" class="fas fa-edit"></i>
                      </a>
                      <a style="cursor: pointer;" @click="remove(item.ID)" class="btn btn-danger">
                        <i style="color:white" class="fas fa-trash"></i>
                      </a>
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
    <!-- modal -->
    <div class="modal fade" id="modal-add" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              <i class="fas fa-plus"></i>Add User
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <!-- <div class="col-md-6">
                <div class="form-group">
                  <label for="ID">ID</label>
                  <input type="text" id="ID" class="form-control ID" />
                </div>
              </div>-->
              <div class="col-md-6">
                <div class="form-group">
                  <label for="Username">Username</label>
                  <small class="text-danger">*Require</small>
                  <input
                    v-model="user.username"
                    type="text"
                    id="Username"
                    class="form-control Username"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="Password">Password</label>
                  <small class="text-danger">*Require</small>
                  <input
                    v-model="user.password"
                    type="text"
                    id="Password"
                    class="form-control Password"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="Email">Email</label>
                  <small class="text-danger">*Require</small>
                  <input v-model="user.email" type="text" id="Email" class="form-control Email" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="typo__label">Role</label>
                  <small class="text-danger">*Require</small>
                  <multiselect
                    v-model="selectedRole"
                    deselect-label="Can't remove this value"
                    track-by="ID"
                    label="Name"
                    placeholder="Select one"
                    :options="dataRole"
                    :searchable="false"
                    :allow-empty="false"
                  ></multiselect>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="pretty p-switch">
                <input
                  type="checkbox"
                  :checked="user.isLeader"
                  v-model="user.isLeader"
                  name="switch1"
                />
                <div class="state p-success">
                  <label
                    class="font-weight-bold"
                  >{{user.isLeader ==true ? "Is Leader" : "Is Staff"}}</label>
                  <small class="text-danger">*Require</small>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click="save" type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>

    <div class="modal fade" id="modal-edit" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              <i class="fas fa-plus"></i> User Edit
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <!-- <div class="col-md-6">
                <div class="form-group">
                  <label for="ID">ID</label>
                  <input type="text" id="ID" class="form-control ID" />
                </div>
              </div>-->
              <div class="col-md-6">
                <div class="form-group">
                  <label for="Username">Username</label>
                  <input
                    v-model="user.username"
                    type="text"
                    id="Username"
                    class="form-control Username"
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="Email">Email</label>
                  <input v-model="user.email" type="text" id="Email" class="form-control Email" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="typo__label">Role</label>
                  <multiselect
                    v-model="selected"
                    deselect-label="Can't remove this value"
                    track-by="ID"
                    label="Name"
                    placeholder="Select one"
                    :options="dataRole"
                    :searchable="true"
                    :allow-empty="true"
                    @select="onSelect"
                  ></multiselect>
                </div>
              </div>
              <div class="col-md-6">
                <div class="pretty p-switch">
                  <input
                    type="checkbox"
                    :checked="user.isLeader"
                    v-model="user.isLeader"
                    name="switch1"
                  />
                  <div class="state p-success">
                    <label
                      class="font-weight-bold"
                    >{{user.isLeader ==true ? "Is Leader" : "Is Staff"}}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click="update" type="button" class="btn btn-primary">Save changes</button>
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
  name: "admin-user",
  components: {
    Multiselect
  },
  data() {
    return {
      page: 1,
      name: " ",
      pageSize: 20,
      totalPage: 0,
      ListUser: [],
      dataRole: [],
      name: null,
      nameEdit: null,
      ID: null,
      bugIndex: null,
      selected: {
        ID: 0,
        Name: ""
      },
      selectedRole: [],
      user: {
        id: 0,
        username: "",
        password: "",
        email: "",
        roleid: 0,
        isLeader: false
      }
    };
  },
  mounted() {},
  created() {
    this.getUser();
    this.getRole();
  },
  methods: {
    onSelect(option) {
      this.user.roleid = option.ID;
    },
    getRole() {
      let self = this;
      this.$api.get("api/Roles/GetAll").then(res => {
        self.dataRole = res.data;
      });
    },
    clickCallback(pageNum) {
      let self = this;

      self.page = pageNum;
      this.getUser();
    },
    getUser() {
      let self = this;
      this.$api
        .get(`api/Users/GetAllPaging/${self.page}/${self.pageSize}`)
        .then(res => {
          console.log(res.data.total);
          console.log(res);
          self.ListUser = res.data.data;
          self.totalPage = res.data.total;
        });
    },
    save() {
      var self = this;
      this.$api.post("api/Users/create", self.user).then(res => {
        // this.$router.push()
        this.$swal("Success !", " Add New User Success", "success");
        this.getUser();
        this.resetForm();
      });
      $("#modal-add").modal("hide");
      console.log("aaa");
    },
    resetForm() {
      this.user = {
        id: 0,
        username: "",
        password: "",
        email: "",
        roleid: 0,
        isLeader: false
      };
    },

    remove(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You can't revert your action",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes Delete it!",
        cancelButtonText: "No, Keep it!",
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(result => {
        if (result.value) {
          this.$api
            .delete(`api/Users/DeleteUser/${id}`)
            .then(r => {
              this.getUser();
              this.$swal(
                "Deleted",
                "You successfully deleted this User",
                "success"
              );
              // alertify.success("Success");
            })
            .catch(r => {
              console.log(r);
            });
        } else {
          this.$swal("Cancelled", "Your User is still intact", "info");
        }
      });
      // console.log(id);
    },
    edit: function(item, index) {
      this.user = {
        id: item.ID,
        username: item.Username,
        email: item.Email,
        roleid: item.RoleID,
        isLeader: item.isLeader
      };
      this.selected = {
        ID: item.RoleID,
        Name: item.RoleName
      };
      $("#modal-edit").modal("show");
    },
    update(item, index) {
      this.$api
        .post("api/Users/Update", this.user)
        .then(res => {
          this.$swal("Success !", "User Update Success", "success");
          // this.$swal("success!");
          $("#modal-edit").modal("hide");
          this.resetForm();
          this.getUser();
        })
        .catch(e => {
          this.$swal("error!");
        });
    }
  },
  watch: {
    selectedRole: function(newVal, oldVal) {
      console.log(newVal);
      let self = this;
      self.user.roleid = newVal.ID;
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
</style>
