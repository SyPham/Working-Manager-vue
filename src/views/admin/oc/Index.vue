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
              :rowSelected="rowSelected "
              :actionComplete="actionComplete"
              :toolbar="toolbar"
            >
              <e-columns>
                <e-column
                  field="levelnumber"
                  width="100"
                  isPrimaryKey="true"
                  headerText="Level"
                  :disableHtmlEncode="false"
                ></e-column>

                <e-column
                  field="title"
                  editType="stringedit"
                  headerText="OC Name"
                  :edit="editparams"
                  :disableHtmlEncode="false"
                ></e-column>
              </e-columns>
            </ejs-treegrid>
          </div>
          <!-- ./card-body -->
        </div>
        <!-- /.card -->
      </div>
      <!-- /.col -->
    </div>
    <div class="modal fade" id="modal-oc" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-lg">
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
              <div class="col-md">
                <div class="form-group">
                  <label for="Name">Name</label>
                  <input type="text" id="Name" v-model="oc.name" class="form-control Name" />
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
  Resize,
  Toolbar
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
      editparams: { params: { format: "n" } },
      contextMenuItems: [
        {
          text: "Add Sub-OC",
          iconCss: " e-icons e-add",
          target: ".e-content",
          id: "Add-Sub-OC"
        },
        {
          text: "Edit OC",
          iconCss: " e-icons e-edit",
          target: ".e-content",
          id: "EditOC"
        },
        {
          text: "Delete",
          iconCss: " e-icons e-delete",
          target: ".e-content",
          id: "DeleteOC"
        }
      ],
      toolbar: [
        // "Search",
        "ExpandAll",
        "CollapseAll"
        // "ExcelExport",
        // "PdfExport"
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
      edit: {
        key: 0,
        title: ""
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
    actionComplete(args) {
      console.log("actionComplete");
      console.log(args);
      var self = this;

      if (args.requestType == "save") {
        self.$api.post("api/Ocs/Rename", self.edit).then(res => {
          this.$swal("Success !", "Edit Successfully!", "success");
        });
      }
    },
    rowSelected(args) {
      console.log("rowSelected ");
      console.log(args);
      var self = this;
      self.edit = {
        key: args.data.key,
        title: args.data.title
      };
    },
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
    treegrid: [
      ContextMenu,
      Sort,
      Edit,
      ExcelExport,
      PdfExport,
      Page,
      Resize,
      Toolbar
    ]
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style >
.e-headertext {
  font-size: 14px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.74);
}
.e-treecell {
  font-size: 16px;
}
</style>
