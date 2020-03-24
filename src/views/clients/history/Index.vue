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
        <button type="button" @click="clearSearch" class="btn bg-gradient-secondary btn-sm">
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
              ref="treegrid"
              :dataSource="filterData"
              childMapping="children"
              :treeColumnIndex="3"
              :allowPaging="true"
              :pageSettings="pageSettings"
              :allowExcelExport="true"
              :allowPdfExport="true"
              :allowSorting="true"
              :toolbar="toolbar"
              :searchSettings="searchSettings"
              :dataSourceChanged="dataSourceChanged"
              :allowResizing="true"
              :showColumnMenu="true"
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
                <e-column
                  field="ProjectName"
                  headerText="Project name"
                  :disableHtmlEncode="false"
                  :template="projectTemplate"
                  width="240"
                  textAlign="Center"
                ></e-column>
                <e-column
                  field="JobName"
                  headerText="Task Name"
                  :disableHtmlEncode="false"
                  :template="jobNameTemplate"
                  textAlign="Center"
                  width="240"
                ></e-column>
                <e-column field="From" headerText="From" :disableHtmlEncode="false" width="120"></e-column>
                <e-column field="PIC" headerText="PIC" width="180" format="yMd" textAlign="Center"></e-column>
                <e-column
                  field="state"
                  :disableHtmlEncode="false"
                  headerText="Status"
                  width="120"
                  textAlign="Center"
                ></e-column>
                <e-column field="DueDateDaily" headerText="Daily" width="160" textAlign="Center"></e-column>
                <e-column field="SpecificDate" headerText="Due Date" width="160" textAlign="Center"></e-column>
                <e-column field="DueDateWeekly" headerText="Weekly" width="160" textAlign="Center"></e-column>
                <e-column
                  field="DueDateMonthly"
                  headerText="Monthly"
                  width="200"
                  textAlign="Center"
                ></e-column>
                <e-column
                  field="DueDateQuarterly"
                  headerText="Quarterly"
                  width="160"
                  textAlign="Center"
                ></e-column>
                <e-column field="DueDateYearly" headerText="Yearly" width="160" textAlign="Center"></e-column>

                <e-column
                  field="CreatedDateForEachTask"
                  headerText="Created Date"
                  width="200"
                  textAlign="Center"
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
  Filter,
  Page,
  RowDD,
  Resize,
  ColumnMenu
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
      jobNameTemplate: function() {
        return {
          template: Vue.component("jobNameTemplate", {
            template: `<a id="jobNameTemplate" data-toggle="tooltip" :title="data.JobName">
                      {{data.JobName}}
                      </a>`,
            data: function() {
              return {
                data: {}
              };
            },
            methods: {
              addSubscribe(data) {
                EventBus.$emit("follow", data);
              }
            }
          })
        };
      },
      projectTemplate: function() {
        return {
          template: Vue.component("projectTemplate", {
            template: `<a id="projectTemplate" data-toggle="tooltip" :title="data.ProjectName">
                      {{data.ProjectName}}
                      </a>`,
            data: function() {
              return {
                data: {}
              };
            },
            methods: {
              addSubscribe(data) {
                EventBus.$emit("follow", data);
              }
            }
          })
        };
      },
      searchSettings: {
        hierarchyMode: "Parent",
        fields: ["JobName"],
        operator: "contains",
        key: "task",
        ignoreCase: true
      },
      pageSettings: { pageSizes: true, pageSize: 10 },
      PIC: [],
      expanded: {},
      selected: [],
      options: [],
      search: "",
      date: "",
      jobTypeID: 0,
      data: [],
      toolbar: [
        "Search",
        "ExpandAll",
        "CollapseAll",
        "Print"
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
    this.searchTreeGrid();
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
    searchTreeGrid() {
      let self = this;
      let jobname = self.$route.params.jobname || "";
      jobname = jobname
        .split("-")
        .join(" ")
        .replace(/_/g, "-");
      self.searchSettings = {
        hierarchyMode: "None",
        fields: ["JobName"],
        operator: "contains",
        key: jobname,
        ignoreCase: true
      };
    },
    clearSearch() {
      let self = this;
      self.searchSettings = {
        hierarchyMode: "None",
        fields: ["JobName"],
        operator: "contains",
        key: "",
        ignoreCase: true
      };
      self.getTasks();
    },
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
  watch: {
    "$route.path": function(name) {
      this.searchTreeGrid();
    },
    "$route.name": function(name) {
      this.searchTreeGrid();
    }
  },
  provide: {
    treegrid: [
      Sort,
      ExcelExport,
      PdfExport,
      Filter,
      Page,
      Toolbar,
      RowDD,
      Resize,
      ColumnMenu
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
