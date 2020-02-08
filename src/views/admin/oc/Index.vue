<template>
  <div>
    <div class="row">
      <div class="col-md-12 pb-4">
        <button
          type="button"
          class="btn bg-gradient-secondary btn-sm"
          data-toggle="modal"
          data-target="#modal-oc"
        >
          <i class="fas fa-plus"></i> OC Add
        </button>
      </div>
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">List OC</h5>

            <div class="card-tools">
              <button type="button" class="btn btn-tool" data-card-widget="collapse">
                <i class="fas fa-minus"></i>
              </button>

              <button type="button" class="btn btn-tool" data-card-widget="remove">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <!-- <div class="card-tools pr-5">
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
            </div>-->
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <ejs-treegrid
              :dataSource="data"
              childMapping="children"
              :treeColumnIndex="1"
              :allowPaging="true"
              :pageSettings="pageSettings"
              :allowExcelExport="true"
              :allowPdfExport="true"
              :allowSorting="true"
              :contextMenuItems="contextMenuItems"
              :contextMenuClick="contextMenuClick"
              :editSettings="editing"
              :dataSourceChanged="dataSourceChanged"
            >
              <e-columns>
                <e-column
                  field="key"
                  width="80"
                  headerText="ID"
                  :disableHtmlEncode="false"
                  textAlign="Center"
                ></e-column>
                <e-column field="title" headerText="OC Name" :disableHtmlEncode="false"></e-column>
                <e-column field="levelnumber" headerText="Level" :disableHtmlEncode="false"></e-column>
              </e-columns>
            </ejs-treegrid>
            <!-- <table class="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>From</th>
                  <th>Job Name/ Project Name</th>
                  <th>Be Assigned</th>
                  <th>Description</th>
                  <th>Deadline</th>
                  <th>Remark</th>
                  <th>Status</th>
                  <th>Created Time</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody style="overflow-y:hidden">
                <tr v-for="(task,key,index) in tasks" :key="index">
                  <td>{{key + 1}}</td>
                  <td>{{task.From}}</td>
                  <td>{{task.ProjectName}}</td>
                  <td>
                    <span
                      v-for="(pic,key,index) in task.PIC"
                      :key="index"
                      class="badge bg-secondary"
                    >{{pic}}</span>
                  </td>
                  <td>{{task.Description}}</td>
                  <td>{{task.DueDate}}</td>
                  <td>{{task.Remark}}</td>
                  <td>
                    <span class="badge bg-danger">{{task.Status== true ? "done": "undone"}}</span>
                  </td>
                  <td>{{task.CreatedDate}}</td>
                  <td class="py-0 align-middle">
                    <button
                      type="button"
                      class="btn btn-block btn-info btn-xs"
                      data-toggle="modal"
                      data-target="#modal-sub-task"
                    >
                      <i class="fas fa-plus"></i> Sub
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>-->
          </div>
          <!-- ./card-body -->
          <div class="card-footer clearfix">
            <!-- <ul class="pagination pagination-sm m-0 float-right">
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
            </ul>-->
          </div>
          <!-- /.card-footer -->
        </div>
        <!-- /.card -->
      </div>
      <!-- /.col -->
    </div>
    <div class="modal fade" id="modal-oc" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              <i class="fas fa-plus"></i>
              {{modalTitle}}
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="Name">Name</label>
                  <input type="text" id="Name" v-model="oc.name" class="form-control Name" />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="Level">Level</label>
                  <input
                    type="text"
                    id="Description"
                    v-model="oc.level"
                    class="form-control Description"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="createTask">Save changes</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Multiselect from "vue-multiselect";
import { Datetime } from "vue-datetime";

import {
  TreeGridPlugin,
  ContextMenu,
  Sort,
  Edit,
  ExcelExport,
  PdfExport,
  Page,
  Resize
} from "@syncfusion/ej2-vue-treegrid";
Vue.use(TreeGridPlugin);
// register globally
Vue.component("multiselect", Multiselect);
export default {
  name: "client-task",
  components: {
    Multiselect,
    Datetime
  },
  data() {
    return {
      oc: { id: 0, name: "", level: 0, parentid: 0 },
      modalTitle: "Add OC",
      contextMenuItems: [
        { text: "Add Sub-OC", target: ".e-content", id: "Add-Sub-OC" },
        { text: "Edit OC", target: ".e-content", id: "EditOC" },
        { text: "Delete", target: ".e-content", id: "DeleteOC" }
      ],
      editing: { allowDeleting: true, allowEditing: true, mode: "Row" },
      pageSettings: { pageSize: 10 },
      editparams: { params: { format: "n" } },
      expanded: {},
      data: [],
      who: "",
      primaryKey: 0,
      remarkObj: {
        id: 0,
        remark: ""
      }
    };
  },
  created() {
    this.getOCs();
    this.who = localStorage.getItem("User");
  },
  mounted() {
    $("#modaloc").on("hidden.bs.modal", function() {
      this.modalTitle = "OC Add";
    });
  },
  methods: {
    remark() {
      var self = this;

      self.$api.post("api/Tasks/Remark", self.remarkObj).then(res => {
        if (res.data) {
          $("#modal-remark").modal("hide");

          self.dataSourceChanged();
        }
        this.$swal("Success !", "Remark", "success");
      });
    },
    done(id) {
      var self = this;

      self.$api.get("api/Tasks/Done/" + id).then(res => {
        if (res.data) {
          self.dataSourceChanged();
        }
        this.$swal("Success !", "Done", "success");
      });
    },
    delete(id) {
      var self = this;
      self.$api.delete("api/Ocs/Delete/" + id).then(res => {
        if (res.data) {
          self.dataSourceChanged();
        }
        this.$swal("Success !", "Delete", "success");
      });
    },
    dataSourceChanged() {
      var self = this;
      self.getOCs();
    },
    contextMenuClick: function(args) {
      var self = this;
      console.log(args);
      console.log(args.rowInfo.rowData);
      if (args.item.id === "EditOC") {
        self.modalTitle = "Edit OC";
        $("#modal-oc").modal("show");
        //self.delete(args.rowInfo.rowData.ID);
      } else if (args.item.id === "DeleteOC") {
        self.delete(args.rowInfo.rowData.key);
      } else {
        self.modalTitle = "Add Sub-OC";
        self.oc.parentid = args.rowInfo.rowData.key;
        $("#modal-oc").modal("show");
        console.log(self.primaryKey);
      }
    },
    customiseCell: function(args) {
      console.log("customiseCell");
      console.log(args);

      if (args.column.field === "State") {
        args.cell.setAttribute("style", "background-color:red;color:white;");
      }
    },
    getOCs() {
      var self = this;
      self.$api.get("api/Ocs/GetListTree").then(res => {
        self.tasks = res.data;
        self.data = res.data;
        console.log(self.data);
      });
    },
    clearFrom() {
      this.oc = { id: 0, name: "", level: 0 };
    },
    createTask() {
      var self = this;
      console.log("createOC");
      console.log(self.oc);
      if (self.oc.parentid > 0) {
        self.$api.post("api/Ocs/CreateSubOC", self.oc).then(res => {
          self.options = res.data;
          if (res.data) {
            self.clearFrom();
            $("#modal-oc").modal("hide");
            self.dataSourceChanged();
          }
          alert("add sub-OC");
          console.log(res);
        });
      } else {
        self.$api.post("api/Ocs/CreateOC", self.oc).then(res => {
          self.options = res.data;
          if (res.data) {
            self.clearFrom();
            $("#modal-oc").modal("hide");
            self.dataSourceChanged();
          }
          console.log(res);
        });
      }
      this.modalTitle = "OC Add";
    },
    dateFormat(date) {
      var d = new Date(date);
      var m, day, month;
      m = d.getMonth() + 1;
      if (m < 10) month = "0" + m;
      if (d.getDate() < 10) day = "0" + d.getDate();
      else day = d.getDate();

      var year = d.getFullYear();
      var formattedDate = day + "/" + month + "/" + year;
      return formattedDate;
    }
  },
  watch: {},
  provide: {
    treegrid: [ContextMenu, Sort, Edit, ExcelExport, PdfExport, Page, Resize]
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
</style>
