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
          <i class="fas fa-plus"></i> User Add
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
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,key,index) in ListUser" :key="index">
                  <td>{{item.ID}}</td>
                  <td>{{item.Username}}</td>
                  <td>{{item.Email}}</td>
                  <td>{{item.RoleName}}</td>
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
            <ul class="pagination pagination-sm m-0 float-right">
              <li class="page-item">
                <a class="page-link" href="#">First</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">Next</a>
              </li>

              <li class="page-item">
                <a class="page-link" href="#">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">Previous</a>
              </li>

              <li class="page-item">
                <a class="page-link" href="#">Last</a>
              </li>
            </ul>
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
              <i class="fas fa-plus"></i> User Add
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
                  <label for="Password">Password</label>
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
                  <input v-model="user.email" type="text" id="Email" class="form-control Email" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="Role">Role</label>
                  <input v-model="user.roleid" type="text" id="Role" class="form-control Role" />
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
                  <label for="Password">Password</label>
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
                  <input v-model="user.email" type="text" id="Email" class="form-control Email" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="Role">Role</label>
                  <input v-model="user.roleid" type="text" id="Role" class="form-control Role" />
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
export default {
  name: "admin-user",
  data() {
    return {
      ListUser: [],
      name: null,
      nameEdit: null,
      ID: null,
      bugIndex: null,
      user: {
        id: 0,
        username: "",
        password: "",
        email: "",
        roleid: ""
      }
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      let self = this;
      this.$api.get("api/Users/GetListUser").then(res => {
        console.log(res);
        self.ListUser = res.data;
        console.log("self.ListUser");
        console.log(self.ListUser);
      });
    },
    save() {
      var self = this;
      this.$api.post("api/Users/create", self.user).then(res => {
        // this.$router.push()
        this.$swal("Success !", "New User Add Success", "success");
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
        roleid: 0
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
        roleid: item.RoleID
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
  }
};
</script>

<style scoped>
</style>
