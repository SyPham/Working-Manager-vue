<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h5>Sort:</h5>
      </div>
      <div class="col-md-12 pb-4">
            <button type="button" @click="clearSearch" class="btn bg-gradient-secondary btn-sm">
          <i class="fas fa-sync-alt"></i> All
        </button>
        <button type="button" @click="sortProject" class="btn bg-gradient-secondary btn-sm">
          <i class="fas fa-tasks"></i> Project
        </button>
        <button type="button" @click="sortRoutine" class="btn bg-gradient-secondary btn-sm">
          <i class="fas fa-book-open"></i> Routine Job
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
    
      </div>
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
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">List Follow</h5>

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
              :dataSource="data"
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
              :contextMenuItems="contextMenuItems"
              :recordDoubleClick='recordDoubleClick'
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
                <!-- <e-column field="Level" headerText="Level" width="150" textAlign="Center"></e-column> -->
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
                  width="100"
                  textAlign="Center"
                ></e-column>
                <e-column field="DueDateDaily" headerText="Daily" width="160" textAlign="Center"></e-column>
                 <e-column
                  field="SpecificDate"
                  headerText="Due Date"
                  width="200"
                  textAlign="Center"
                ></e-column>
                <e-column field="DueDateWeekly" headerText="Weekly" width="160" textAlign="Center"></e-column>
                <e-column
                  field="DueDateMonthly"
                  headerText="Monthly"
                  width="160"
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
                    field="ModifyDateTime"
                    headerText="Modify DateTime"
                    width="200"
                    textAlign="Center"
                  ></e-column>
                <e-column
                  field="CreatedDateForEachTask"
                  headerText="CreatedDate"
                  width="200"
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

    
    <div
      class="modal fade"
      id="modal-comment"
      ref="modalComment"
      aria-hidden="true"
      style="display: none;"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content" style="height:750px">
          <div class="modal-header">
            <h4 class="modal-title">
              <i class="fas fa-edit"></i>
              {{taskName}}
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body" style="overflow-y: scroll;">
            <div class="container">
              <div class="row d-flex align-items-center">
                <div class="col-md-12 comments-section">
                  <!--====COMMENT AREA START====-->
                  <div class="row">
                    <div class="col-12">
                      <!-- <h2>Comments</h2> -->
                      <form class="comment-form" method="post" action>
                        <textarea
                          class="comment-area"
                          v-model="comment.content"
                          placeholder="Write your comment here"
                        ></textarea>
                        <button
                          type="submit"
                          @click.prevent="addComment"
                          class="btn comment-btn"
                        >Post</button>
                      </form>
                    </div>
                  </div>

                  <!-- =======COMMENTS START=======-->
                  <div class="row">
                    <div class="col-12">
                      <div
                        class="comment-box-wrapper"
                        v-for="(item, key, index) in dataComment"
                        :key="index"
                      >
                        <template v-if="key < totalShow">
                          <tree :tree-data="item" @AddSub="isLoadComment" :taskID="comment.taskid"></tree>
                        </template>
                      </div>
                      <template
                        v-if="totalShow < dataComment.length || dataComment.length > totalShow"
                      >
                        <small
                          style="cursor: pointer;"
                          @click="totalShow += 3"
                          class="text-center text-primary d-block"
                        >
                          Load more
                          <i class="fas fa-chevron-down text-small"></i>
                        </small>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
import EventBus from "../../../EventBus";

import {
  TreeGridPlugin,
  Sort,
  Filter,
  ContextMenu,
  ExcelExport,
  PdfExport,
  Toolbar,
  Page,
  RowDD,
  Resize,
  ColumnMenu
} from "@syncfusion/ej2-vue-treegrid";
Vue.use(TreeGridPlugin);
// register globally
Vue.component("multiselect", Multiselect);
import CommentMixin from "../../../mixin/comment";
import Tree from "../../shares/comment/Tree";
export default {
  name: "client-follow",
  mixins: [CommentMixin],
  components: {
    Multiselect,
    Datetime,
    Tree
  },
  data() {
    return {
      searchSettings: {
        hierarchyMode: "Parent"
      },
      contextMenuItems: [
        {
          text: "Add Remark",
          iconCss: " e-icons e-add",
          target: ".e-content",
          id: "Remark"
        }
      ],
      statusTemplate: function() {
        return {
          template: Vue.component("status", {
            template: `<span id="status" :class="data.state == 'Undone' ? 'badge bg-danger' : 'badge bg-success'"  style="padding:4px;color:white">{{data.state}}</span>`,
            data: function() {
              return {
                data: {}
              };
            }
          })
        };
      },
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
                        <button type="button" v-if="data.Level == 1" @click="unfollow(data)" class="btn btn-danger btn-xs"><i class="fas fa-bell-slash"></i> Unfollow</button>
                      </div>
                    </div>`,
            data: function() {
              return {
                data: {}
              };
            },
            methods: {
              addSubTask(data) {
                EventBus.$emit("taskItem", data);
                $("#modal-task").modal("show");
              },
              unfollow(data) {
                EventBus.$emit("follow", data);
              }
            }
          })
        };
      },
      templateDescripton: function() {
        return {
          template: Vue.component("optionTemplate", {
            template: `<div id="templateDescripton" data-toggle="tooltip" data-placement="top" :title="data.Description">
                      {{data.Description}}
                      </div>`,
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
      remarkTemplate: function() {
        return {
          template: Vue.component("remarkTemplate", {
            template: `<a id="remarkTemplate" data-toggle="tooltip" :title="data.Remark">
                      {{data.Remark}}
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
      pageSettings: { pageSizes: true, pageSize: 20 },
      PIC: [],
      expanded: {},
      selected: [],
      options: [],
      date: "",
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
    EventBus.$on("follow", this.unfollow);
  },
  destroyed() {
    // Stop listening the event hello with handler
    EventBus.$off("follow", this.unfollow);
  },
  created() {
    $('#overlay').fadeIn();
    this.searchTreeGrid();
    this.getTasks();
  },
  methods: {
        recordDoubleClick(args) {
      console.log("recordDoubleClick");
      console.log(args);
      let data = args.rowData;
      let self = this;
      self.clearFormComment();
      self.getAllComment(data.ID);
      self.taskName = data.JobName;
      self.comment.taskid = data.ID;
      $(self.$refs.modalComment).modal("show");
    },
    clearSearch() {
      let self = this;
      self.getTasks();
      self.searchSettings = {
        hierarchyMode: "None",
        fields: ["JobName"],
        operator: "contains",
        key: "",
        ignoreCase: true
      };
      this.$refs.treegrid.search('');
    },
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
    unfollow(data) {
      var self = this;
      self.$api.delete(`api/Follow/Unfollow/${data.ID}`).then(res => {
        console.log("unfollow");
        if (res) {
          self.$alertify.success("You have already unfollowd this one!");
          self.getTasks();
        } else {
          self.$swal("Warning !", "You can't unfollow!", "warning");
        }
      });
    },
    sortProject() {
      var self = this;
      self.$api.get(`api/Follow/LoadFollow/project`).then(res => {
        self.data = res.data;
        console.log("sortProject");
        console.log(self.data);
      });
    },
    sortRoutine() {
      var self = this;
      self.$api.get(`api/Follow/LoadFollow/routine`).then(res => {
        self.data = res.data;
        console.log(self.data);
      });
    },
    sortHigh() {
      var self = this;
      self.$api.get(`api/Follow/LoadFollow/H/%20`).then(res => {
        self.data = res.data;
        console.log("sortHigh");
        console.log(self.data);
      });
    },
    sortMedium() {
      var self = this;
      self.$api.get(`api/Follow/LoadFollow/M/%20`).then(res => {
        self.data = res.data;
        console.log("sortMedium");
        console.log(self.tasks);
      });
    },
    sortLow() {
      var self = this;
      self.$api.get(`api/Follow/LoadFollow/L/%20`).then(res => {
        self.data = res.data;
        console.log("sortLow");
        console.log(self.data);
      });
    },
    dataSourceChanged() {
      var self = this;
      self.getTasks();
    },
    getTasks() {
      var self = this;
      self.$api.get("api/Follow/LoadFollow").then(res => {
        self.tasks = res.data;
        self.data = res.data;
        console.log(self.data);
      }).then(() => {
        $('#overlay').fadeOut();
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
      ContextMenu,
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
<style scoped>

</style>