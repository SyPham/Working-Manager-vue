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
          <i class="fas fa-plus"></i> Project Add
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
                  <th>#</th>
                  <th>Project Name</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,key,index) in ListProject" :key="index">
                  <td>{{key + 1}}</td>
                  <td>{{item.Name}}</td>
                  <td class="py-0 align-middle">
                    <div v-if="item.CreatedBy == createdBy" class="btn-group btn-group-sm">
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
  name: "admin-project",
  data() {
    return {
      page: 1,
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
            .delete(`api/Projects/DeleteProject/${id}`)
            .then(r => {
              this.getProject();
              this.$swal(
                "Deleted",
                "You successfully deleted this project",
                "success"
              );
              // alertify.success("Success");
            })
            .catch(r => {
              console.log(r);
            });
        } else {
          this.$swal("Cancelled", "Your project is still intact", "info");
        }
      });
      // console.log(id);
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
</style>
