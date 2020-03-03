<template>
  <div>
    <div class="row">
      <!-- <div class="col-md-12 pb-4">
        <button
          type="button"
          class="btn bg-gradient-secondary btn-sm"
          data-toggle="modal"
          data-target="#modal-task"
        >
          <i class="fas fa-plus"></i> Task Add
        </button>
      </div>-->
      <div class="col-md-12">
        <h5>Sort:</h5>
      </div>
      <div class="col-md-12 pb-4">
        <button type="button" @click="sortProject" class="btn bg-gradient-secondary btn-sm">
          <i class="fas fa-tasks"></i> Project
        </button>
        <button type="button" @click="sortRoutine" class="btn bg-gradient-secondary btn-sm">
          <i class="fas fa-book-open"></i> Routine Job
        </button>
        <button type="button" @click="sortAbnormal" class="btn bg-gradient-secondary btn-sm">
          <i class="fas fa-book-open"></i> Abnormal Job
        </button>
        <button type="button" @click="sortHigh" class="btn bg-gradient-secondary btn-sm">
          <i class="fas fa-exclamation"></i> High
        </button>
        <button type="button" @click="sortMedium" class="btn bg-gradient-secondary btn-sm">
          <i class="fab fa-medium"></i> Medium
        </button>
        <button type="button" @click="sortLow" class="btn bg-gradient-secondary btn-sm">
          <i class="fas fa-low-vision"></i> Low
        </button>
        <button type="button" @click="getTasks" class="btn bg-gradient-secondary btn-sm">
          <i class="fas fa-sync-alt"></i> All
        </button>
      </div>
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">List History</h5>

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
              :dataSource="filterData"
              childMapping="children"
              :treeColumnIndex="3"
              :allowPaging="true"
              :pageSettings="pageSettings"
              :allowExcelExport="true"
              :allowPdfExport="true"
              :allowSorting="true"
              :toolbar="toolbar"
              :dataSourceChanged="dataSourceChanged"
            >
              <e-columns>
                <e-column
                  field="Option"
                  :template="optionTemplate"
                  headerText="Option"
                  width="120"
                  textAlign="Center"
                ></e-column>
                <e-column
                  field="Priority"
                  :template="priorityTemplate"
                  headerText="Priority"
                  width="110"
                  textAlign="Center"
                ></e-column>
                <!-- <e-column field="Level" headerText="Level" width="150" textAlign="Center"></e-column> -->
                <e-column
                  field="ProjectName"
                  headerText="Project name"
                  :disableHtmlEncode="false"
                  width="240"
                ></e-column>
                <e-column
                  field="JobName"
                  headerText="Task Name"
                  :disableHtmlEncode="false"
                  width="240"
                ></e-column>
                <e-column
                  field="From"
                  headerText="From Where? / From Who?"
                  :disableHtmlEncode="false"
                  width="230"
                ></e-column>
                <e-column
                  field="Description"
                  headerText="Description"
                  width="180"
                  textAlign="Center"
                ></e-column>
                <e-column field="PIC" headerText="PIC" width="180" format="yMd" textAlign="Right"></e-column>
                <e-column field="DueDate" headerText="DueDate" width="160" textAlign="Center"></e-column>
                <e-column field="Remark" headerText="Remark" width="180" textAlign="Center"></e-column>
                <e-column
                  field="state"
                  :disableHtmlEncode="false"
                  headerText="Status"
                  width="100"
                  textAlign="Center"
                ></e-column>
                <e-column
                  field="CreatedDate"
                  headerText="CreatedDate"
                  width="160"
                  textAlign="Center"
                ></e-column>
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
  </div>
</template>

<script>
import Vue from "vue";
import Multiselect from "vue-multiselect";
import { Datetime } from "vue-datetime";
import EventBus from "../../../EventBus";

import {
  TreeGridPlugin,
  Sort,
  ExcelExport,
  PdfExport,
  Toolbar,
  Page
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
      priorityTemplate: function() {
        return {
          template: Vue.component("priority", {
            template: `<span id="priority" :class="data.Priority == 'High' ? 'badge bg-danger' : data.Priority =='Medium' ? 'badge bg-warning' : 'badge bg-info'"  style="padding:4px;color:white">{{data.Priority}}</span>`,
            data: function() {
              return {
                data: {}
              };
            }
          })
        };
      },
      optionTemplate: function() {
        return {
          template: Vue.component("optionTemplate", {
            template: `<div id="optionTemplate">
                      <div class="btn-group">
                        <button type="button" @click="Undo(data.ID)" v-if="data.Level == 1" class="btn btn-success btn-xs"><i class="fas fa-undo"></i> Undo</button>
                      </div>
                    </div>`,
            data: function() {
              return {
                data: {}
              };
            },
            methods: {
              Undo(taskid) {
                EventBus.$emit("Undo", taskid);
              }
            }
          })
        };
      },
      pageSettings: { pageSize: 10 },
      PIC: [],
      expanded: {},
      selected: [],
      options: [],
      search: "",
      date: "",
      jobTypeID: 0,
      data: [],
      toolbar: [
        // "Search",
        "ExpandAll",
        "CollapseAll"
        // "ExcelExport",
        // "PdfExport"
      ]
    };
  },
  mounted() {
    EventBus.$on("Undo", this.undo);
  },
  destroyed() {
    // Stop listening the event hello with handler
    EventBus.$off("Undo", this.undo);
  },
  created() {
    this.getTasks();
  },
  computed: {
    filterData() {
      return this.data.filter(element => {
        if (this.search != "")
          return element.Priority.toLowerCase().match(
            this.search.toLowerCase()
          );
        else if (this.jobTypeID > 0) return element.JobTypeID == this.jobTypeID;
        else return this.data;
      });
    }
  },
  methods: {
    sortProject() {
      var self = this;
      self.search = "";
      self.jobTypeID = 1;
    },
    sortRoutine() {
      var self = this;
      self.search = "";
      self.jobTypeID = 2;
    },
    sortAbnormal() {
      var self = this;
      self.search = "";
      self.jobTypeID = 3;
    },
    sortHigh() {
      var self = this;
      self.search = "High";
    },
    sortMedium() {
      var self = this;
      self.search = "Medium";
    },
    sortLow() {
      var self = this;
      self.search = "Low";
    },
    undo(taskid) {
      var self = this;
      self.$api.get(`api/Tasks/Undo/${taskid}`).then(res => {
        console.log("Undo");
        console.log(res);
        if (res) {
          self.$alertify.success("You have already undoed this one!");
          self.getTasks();
        } else {
          self.$swal("Warning !", "You can't undo this one!", "warning");
        }
      });
    },
    dataSourceChanged() {
      var self = this;
      self.getTasks();
    },
    getTasks() {
      var self = this;
      self.$api.get(`api/Tasks/GetListTreeHistory`).then(res => {
        self.search = "";
        self.jobTypeID = 0;
        self.data = res.data;
        console.log(self.data);
      });
    }
  },
  watch: {},
  provide: {
    treegrid: [Sort, ExcelExport, PdfExport, Page, Toolbar]
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
.e-btn.e-flat {
  background-color: #6c757d !important;
  border-color: #6c757d !important;
  box-shadow: none !important;
  color: #fff !important;
}
.e-grid .e-unboundcelldiv .e-icons {
  color: #fff2f2 !important;
}
</style>
