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
          <i class="fas fa-plus"></i>Add Project
        </button>
      </div>
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">List Project</h5>
            <div class="card-tools">
              <div class="input-group input-group-sm" style="width: 150px;">
                <input
                  type="text"
                  name="table_search"
                  v-model="keyword"
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
                  <th class="text-center" width="20">#</th>
                  <th class="text-center">Project Name</th>
                  <th class="text-center">Created By</th>
                  <th class="text-center">Created Date</th>
                  <th class="text-center">ON/OFF</th>
                  <th class="text-center">Option</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,key,index) in ListProject" :key="index">
                  <td class="text-center">{{key + 1}}</td>
                  <td class="text-center">{{item.Name}}</td>
                  <td class="text-center">{{$common.toTitleCase(item.CreatedByName)}}</td>
                   <td class="text-center">{{item.CreatedDate}}</td>
                  <td class="text-center">
                    <div class="pretty p-switch" v-if="item.CreatedBy == createdBy">
                      <input
                        type="checkbox"
                        :checked="item.Status"
                        @click="open(item.ID)"
                        name="switch1"
                      />
                      <div :class="item.Status?'state p-success':'state p-danger'">
                        <label :class="item.Status?'':'dot'">{{item.Status?"ON":"OFF"}}</label>
                      </div>
                    </div>
                    <div v-else>{{item.Status?"ON":"OFF"}}</div>
                  </td>
                  <td class="py-0 align-middle text-center">
                    <div class="btn-group btn-group-sm">
                      <a
                        v-if="item.CreatedBy == createdBy"
                        @click="edit(item,index)"
                        style="cursor: pointer;"
                        class="btn btn-primary"
                      >
                        <i style="color:white" class="fas fa-edit"></i>
                      </a>
                      <a
                        v-if="item.CreatedBy == createdBy"
                        style="cursor: pointer;"
                        @click="remove(item.ID)"
                        class="btn btn-danger"
                      >
                        <i style="color:white" class="fas fa-trash"></i>
                      </a>
                      <a
                        style="cursor: pointer;"
                        class="btn btn-info"
                        @click="$router.push(`/project-detail/${item.ID}`)"
                        v-if="item.Status ?(item.CreatedBy == createdBy || item.Manager.includes(Number(createdBy)) || item.Members.includes(Number(createdBy))):false"
                      >
                        <i style="color:white" class="fas fa-info-circle"></i>
                      </a>
                      <a
                        v-if="item.CreatedBy == createdBy"
                        style="cursor: pointer;"
                        @click="clone(item.ID)"
                        class="btn btn-warning"
                      >
                        <i style="color:white" class="fas fa-clone"></i>
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
              <i class="fas fa-plus"></i> Project Add
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
              <div class="col-md-12">
                <div class="form-group">
                  <label for="Name">Name</label>
                  <input v-model="name" type="text" id="Name" class="form-control Name" />
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
              <i class="fas fa-plus"></i> Project Edit
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
              <div class="col-md-12">
                <div class="form-group">
                  <label for="Name">Name</label>
                  <input v-model="nameEdit" type="text" id="Name" class="form-control Name" />
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
  name: "project",
  data() {
    return {
      page: 1,
      onOff: true,
      keyword: " ",
      pageSize: 20,
      temp: 1,
      totalPage: 0,
      ListProject: [],
      name: null,
      nameEdit: null,
      ID: null,
      bugIndex: null,
      createdBy: localStorage.getItem("UserID")
    };
  },
  created() {
    this.getProject();
  },
  methods: {
    clickCallback(pageNum) {
      let self = this;

      self.page = pageNum;
      self.getProject();
      self.temp = self.page * self.pageSize - 1;
    },
    getProject() {
      let self = this;
      this.$api
        .get(
          `api/Projects/GetAllPaging/${self.page}/${self.pageSize}/${self.keyword}`
        )
        .then(res => {
          console.log(res);
          self.ListProject = res.data.data;
          self.totalPage = res.data.total;
          console.log("self.ListProject");
          console.log(self.ListProject);
        });
    },
    open(projectId) {
      let self = this;
      this.$api.get(`api/Projects/open/${Number(projectId)}`).then(res => {
        console.log(res);
        if (res.data.status) {
          if (res.data.result) {
            self.onOff = res.data.result;
            self.$alertify.success("ON!");
          } else {
            self.onOff = res.data.result;
            self.$alertify.success("OFF!");
          }
          self.getProject();
        } else {
          self.$alertify.error("Failed!");
        }
      });
    },
    save() {
      this.$api
        .post("api/projects/create", {
          Name: this.name
        })
        .then(res => {
          // this.$router.push()
          this.$swal("Success !", "New Project Add Success", "success");
          this.getProject();
          this.resetForm();
        });
      $("#modal-add").modal("hide");
      console.log("aaa");
    },
    resetForm() {
      $("#modal-add .Name").val("");
    },
    clone(id) {
      let self = this;
      let promise = self.$alertify.confirm("clone").then(result => {
        if (result.value) {
          self.$api
            .get(`api/Projects/Clone/${id}`)
            .then(r => {
              self.getProject();
              self.$swal(
                "Cloned",
                "You successfully clone this project",
                "success"
              );
            })
            .catch(r => {
              console.log(r);
            });
        } else {
          self.$swal("Cancelled", "Your project is still intact", "info");
        }
      });
    },
    remove(id) {
      let self = this;
      let promise = self.$alertify.confirm().then(result => {
        if (result.value) {
          self.$api
            .delete(`api/Projects/DeleteProject/${id}`)
            .then(r => {
              self.getProject();
              self.$swal(
                "Deleted",
                "You successfully deleted this project",
                "success"
              );
            })
            .catch(r => {
              console.log(r);
            });
        } else {
          self.$swal("Cancelled", "Your project is still intact", "info");
        }
      });
    },
    edit: function(item, index) {
      $("#modal-edit").modal("show");
      this.ID = item.ID;
      this.nameEdit = item.Name;
      // this.$api.get(`api/Projects/GetByID/${id}`).then(res=>{
      //   this.nameEdit = res.data.Name
      // })
    },
    update(item, index) {
      console.log(this.ID);
      this.$api
        .post("api/Projects/Update", {
          ID: this.ID,
          Name: this.nameEdit
        })
        .then(res => {
          this.$swal("Success !", "Project Update Success", "success");
          // this.$swal("success!");
          $("#modal-edit").modal("hide");
          this.getProject();
        })
        .catch(e => {
          this.$swal("error!");
        });
    }
  },
  mounted() {
    // $("body").tooltip({ selector: "[data-toggle=tooltip]", placement: "left" });
  },
  watch: {
    keyword: function(newVal, oldVal) {
      var self = this;
      self.keyword = newVal;
      self.getProject();
    }
  }
};
</script>

<style scoped>
.dot:after {
  background-color: #dc3545 !important;
}
</style>
