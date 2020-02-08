<template>
  <div>
    <div class="row">
      <div class="col-md-5">
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
              :rowSelected="rowSelected"
            >
              <e-columns>
                <e-column
                  field="levelnumber"
                  width="120"
                  headerText="Level"
                  :disableHtmlEncode="false"
                  textAlign="Center"
                ></e-column>
                <e-column field="title" headerText="OC Name" :disableHtmlEncode="false"></e-column>
              </e-columns>
            </ejs-treegrid>
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
      <div class="col-md-7">
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
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>RoleName</th>
                </tr>
              </thead>
              <tbody style="overflow-y:hidden">
                <tr v-for="(user,key,index) in users" :key="index">
                  <td>{{key + 1}}</td>
                  <td>
                    <div class="pretty p-switch">
                      <input
                        type="radio"
                        :checked="user.Status"
                        @click="AddOrUpdate(user.ID)"
                        name="switch1"
                      />
                      <div class="state p-success">
                        <label>{{user.Username}}</label>
                      </div>
                    </div>
                  </td>
                  <td>{{user.RoleName}}</td>
                </tr>
              </tbody>
            </table>
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
      </div>
      <!-- /.col -->
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
      ocid: 0,
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
      },
      users: []
    };
  },
  created() {
    this.getOCs();
    this.getListUser();
    this.who = localStorage.getItem("User");
  },
  mounted() {
    $("#modaloc").on("hidden.bs.modal", function() {
      this.modalTitle = "OC Add";
    });
  },
  methods: {
    rowSelected(args) {
      var self = this;
      self.ocid = args.data.key;
      self.getListUser();
      console.log(args);
    },
    AddOrUpdate(userid) {
      var self = this;

      self.$api
        .get(`api/OCUsers/AddOrUpdate/${userid}/${self.ocid}`)
        .then(res => {
          self.getListUser();
          self.$swal("Success !", "AddOrUpdate", "success");
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
    getListUser() {
      var self = this;
      self.$api.get(`api/OcUsers/getListUser/${self.ocid}`).then(res => {
        self.users = res.data;
        console.log("getListUser");
        console.log(self.users);
      });
    },
    getOCs() {
      var self = this;
      self.$api.get("api/Ocs/GetListTree").then(res => {
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
