<template>
  <div>
    <div class="row">
      <div class="col-md-12 pb-4">
        <button
          type="button"
          class="btn bg-info btn-sm"
          data-toggle="modal"
          data-target="#modal-task"
          @click="newTaskInfo"
        >
          <i class="fas fa-plus"></i> New Task
        </button>
      </div>
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

        <button type="button" @click="sortHigh" class="btn bg-danger btn-sm">
          <i class="fas fa-exclamation"></i> High
        </button>
        <button type="button" @click="sortMedium" class="btn bg-warning btn-sm">
          <i class="fab fa-medium"></i> Medium
        </button>
        <button type="button" @click="sortLow" class="btn bg-info btn-sm">
          <i class="fas fa-low-vision"></i> Low
        </button>
        <button type="button" @click="getTasks" class="btn bg-gradient-secondary btn-sm">
          <i class="fas fa-sync-alt"></i> All
        </button>
      </div>
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">
              <i class="fas fa-list"></i> To Do List
            </h5>

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
              :allowSorting="true"
              :contextMenuItems="contextMenuItems"
              :contextMenuClick="contextMenuClick"
              :dataSourceChanged="dataSourceChanged"
              :sortSettings="sortSettings"
              :toolbar="toolbar"
            >
              <e-columns>
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
                  headerText="Job Name"
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
                <e-column
                  field="Option"
                  :template="optionTemplate"
                  headerText="Option"
                  width="220"
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
    <div class="modal fade" id="modal-task" aria-hidden="true" style="display: none;">
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
                <div class="card card-primary card-outline card-outline-tabs">
                  <div class="card-header p-0 border-bottom-0">
                    <ul class="nav nav-tabs" id="custom-tabs-three-tab" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          id="custom-tabs-three-home-tab"
                          data-toggle="pill"
                          href="#custom-tabs-three-home"
                          role="tab"
                          aria-controls="custom-tabs-three-home"
                          aria-selected="true"
                        >Routine</a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          id="custom-tabs-three-profile-tab"
                          data-toggle="pill"
                          href="#custom-tabs-three-profile"
                          role="tab"
                          aria-controls="custom-tabs-three-profile"
                          aria-selected="false"
                        >Project</a>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <div class="tab-content" id="custom-tabs-three-tabContent">
                      <div
                        class="tab-pane fade active show"
                        id="custom-tabs-three-home"
                        role="tabpanel"
                        aria-labelledby="custom-tabs-three-home-tab"
                      >
                        <div class="form-group">
                          <label for="JobType">Routine</label>
                          <small v-if="!editStatus" class="text-danger">(*) Require</small>
                          <input
                            type="text"
                            id="JobType"
                            v-model="task.jobName"
                            class="form-control JobType"
                          />
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="custom-tabs-three-profile"
                        role="tabpanel"
                        aria-labelledby="custom-tabs-three-profile-tab"
                      >
                        <div class="form-group">
                          <label class="typo__label">Project</label>
                          <small v-if="!editStatus" class="text-danger">(*) Require</small>
                          <multiselect
                            v-model="projectSelected"
                            deselect-label="Can't remove this value"
                            track-by="ID"
                            label="Name"
                            placeholder="Select one"
                            :options="projectOptions"
                            :searchable="false"
                            :allow-empty="false"
                            @tag="addTagProject"
                            @select="onSelectProject"
                          ></multiselect>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /.card -->
                </div>
              </div>
              <div class="col-md-6">
                <div class="card card-primary card-outline card-outline-tabs">
                  <div class="card-header p-0 border-bottom-0">
                    <ul class="nav nav-tabs" id="custom-tabs-three-tab" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          id="tabs-who-tab"
                          data-toggle="pill"
                          href="#tabs-who"
                          role="tab"
                          aria-controls="tabs-who"
                          aria-selected="true"
                        >From Who?</a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          id="tabs-where-tab"
                          data-toggle="pill"
                          href="#tabs-where"
                          role="tab"
                          aria-controls="tabs-where"
                          aria-selected="false"
                        >From Where?</a>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <div class="tab-content" id="custom-tabs-three-tabContent">
                      <div
                        class="tab-pane fade active show"
                        id="tabs-who"
                        role="tabpanel"
                        aria-labelledby="tabs-who"
                      >
                        <div class="form-group">
                          <label for="JobType">Who?</label>
                          <small
                            v-if="!editStatus"
                            class="text-danger"
                          >(*) Require (Default is yourself!)</small>
                          <multiselect
                            v-model="whoSelected"
                            deselect-label="Can't remove this value"
                            track-by="ID"
                            label="Username"
                            placeholder="Select one"
                            :options="whoOptions"
                            :searchable="false"
                            :allow-empty="false"
                            @select="onSelectWho"
                          ></multiselect>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="tabs-where"
                        role="tabpanel"
                        aria-labelledby="tabs-where"
                      >
                        <div class="form-group">
                          <label class="typo__label">Where?</label>
                          <small v-if="!editStatus" class="text-danger">(*) Require</small>
                          <multiselect
                            v-model="ocSelected"
                            deselect-label="Can't remove this value"
                            track-by="ID"
                            label="Name"
                            placeholder="Select one"
                            :options="ocOptions"
                            :searchable="false"
                            :allow-empty="false"
                            @tag="addTagOC"
                            @select="onSelectOC"
                          ></multiselect>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /.card -->
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="Assigned">Be Assigned</label>
                  <small v-if="!editStatus" class="text-danger">(*) Require</small>
                  <multiselect
                    v-model="selected"
                    tag-placeholder="Add this as new tag"
                    placeholder="Search or add a tag"
                    label="Username"
                    track-by="ID"
                    :options="options"
                    :multiple="true"
                    :taggable="true"
                    @tag="addTag"
                    @select="onSelectTask"
                  ></multiselect>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="Description">Description</label>
                  <input
                    type="text"
                    id="Description"
                    v-model="task.description"
                    class="form-control Description"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="Description">Deadline</label>
                  <small v-if="!editStatus" class="text-danger">(*) Require</small>
                  <datetime
                    v-model="date"
                    input-class="form-control"
                    placeholder="Select date"
                    type="date"
                  ></datetime>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="Description">Remark</label>
                  <input
                    type="text"
                    id="Description"
                    v-model="task.remark"
                    class="form-control Description"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <label>Priority</label>
                <small v-if="!editStatus" class="text-danger">(*) Require (Default is medium)</small>

                <div class="form-group">
                  <div class="custom-control custom-radio">
                    <input
                      class="custom-control-input"
                      v-model="task.priority"
                      type="radio"
                      id="priorityHigh"
                      name="priority"
                      value="H"
                    />
                    <label for="priorityHigh" class="custom-control-label">High</label>
                  </div>

                  <div class="custom-control custom-radio">
                    <input
                      class="custom-control-input"
                      :checked="true"
                      v-model="task.priority"
                      type="radio"
                      value="M"
                      id="priorityMedium"
                      name="priority"
                    />
                    <label for="priorityMedium" class="custom-control-label">Medium</label>
                  </div>

                  <div class="custom-control custom-radio">
                    <input
                      class="custom-control-input"
                      v-model="task.priority"
                      type="radio"
                      id="priorityLow"
                      name="priority"
                      value="L"
                    />
                    <label for="priorityLow" class="custom-control-label">Low</label>
                  </div>
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

    <div class="modal fade" id="modal-remark" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              <i class="fas fa-plus"></i> Remark Add
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="remarkID">Remark Content</label>
                  <input
                    style="display:none"
                    type="text"
                    id="remarkID"
                    v-model="remarkObj.ID"
                    class="form-control remarkID"
                  />
                  <textarea
                    type="text"
                    id="remarkName"
                    v-model="remarkObj.remark"
                    class="form-control remarkName"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="remark">Save changes</button>
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
import EventBus from "../../EventBus";
import {
  TreeGridPlugin,
  ContextMenu,
  Sort,
  ExcelExport,
  PdfExport,
  Page,
  CommandColumn,
  Toolbar
} from "@syncfusion/ej2-vue-treegrid";
Vue.use(TreeGridPlugin);
// register globally
Vue.component("multiselect", Multiselect);
export default Vue.extend({
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
                        <button type="button" @click="addSubTask(data)" class="btn btn-info btn-xs mr-2"><i class="fas fa-plus"></i> Sub</button>
                        <button type="button" @click="addSubscribe(data)"class="btn btn-danger btn-xs" v-if="data.Level == 1" ><i :class="!data.Subscribe ? 'fas fa-bell':'fas fa-bell-slash'"></i> {{!data.Subscribe?'Subscribe':'Subscribed'}}</button>
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
              addSubscribe(data) {
                EventBus.$emit("subscribe", data);
              }
            }
          })
        };
      },
      editStatus: true,
      commands: [
        {
          type: "Edit",
          buttonOption: { iconCss: " e-icons e-add", cssClass: "e-flat" }
        }
      ],
      modalTitle: "Add New Task",
      sort: "",
      contextMenuItems: [
        {
          text: "Add Sub-Task",
          iconCss: " e-icons e-add",
          target: ".e-content",
          id: "Add-Sub-Task"
        },
        {
          text: "Add Remark",
          iconCss: " e-icons e-add",
          target: ".e-content",
          id: "Remark"
        },
        {
          text: "Finish Task",
          iconCss: " e-icons e-edit",
          target: ".e-content",
          id: "Done"
        },
        {
          text: "Edit",
          iconCss: " e-icons e-edit",
          target: ".e-content",
          id: "EditTask"
        },
        {
          text: "Delete",
          iconCss: " e-icons e-delete",
          target: ".e-content",
          id: "DeleteTask"
        }
      ],
      pageSettings: { pageSize: 15 },
      toolbar: [
        // "Search",
        "ExpandAll",
        "CollapseAll"
        // "ExcelExport",
        // "PdfExport"
      ],
      sortSettings: {
        columns: [
          { field: "DueDate", direction: "Ascending" },
          { field: "CreatedDate", direction: "Ascending" },
          { field: "JobName", direction: "Ascending" }
        ]
      },
      PIC: [],
      expanded: {},
      selected: [],
      options: [],
      date: "",
      data: [],
      ocSelected: [],
      ocOptions: [],
      userSelected: [],
      userOptions: [],
      who: "",
      tasks: [],
      primaryKey: 0,
      remarkObj: {
        id: 0,
        remark: ""
      },
      task: {
        id: 0,
        description: "",
        from: "",
        OCID: 0,
        jobName: "",
        createdBy: 0,
        projectID: 0,
        parentID: 0,
        remark: "",
        deadline: "",
        status: false,
        fromWhoID: 0,
        priority: "M",
        pic: []
      },
      projectOptions: [],
      projectSelected: [],
      whoOptions: [],
      whoSelected: []
    };
  },
  mounted() {
    EventBus.$on("subscribe", this.addSubscribe);
    EventBus.$on("taskItem", this.infoEdit);
  },
  destroyed() {
    // Stop listening the event hello with handler
    EventBus.$off("taskItem", this.infoEdit);
    EventBus.$off("subscribe", this.addSubscribe);
  },
  created() {
    this.getProjects();
    this.getFrom();
    this.getUserForWho();
    console.log(this.task);
    this.getTasks();
    this.who = localStorage.getItem("User");
  },
  methods: {
    infoEdit(taskItem) {
      var self = this;
      self.getUser(taskItem.ProjectID);
      console.log("handler");
      console.log(taskItem);
      self.editStatus = false;
      self.clearForm();
      self.date = "";

      self.modalTitle = "Add Sub-Task";
      self.task.parentID = taskItem.ID;
      self.task.projectID = taskItem.ProjectID;
      self.projectSelected = {
        ID: taskItem.ProjectID,
        Name: taskItem.ProjectName
      };
      // self.task.priority = taskItem.PriorityID;
      self.whoSelected = {
        Username: localStorage.getItem("User"),
        ID: localStorage.getItem("UserID")
      };
    },
    addSubscribe(data) {
      var self = this;
      self.$api.get(`api/Tasks/Subscribe/${data.ID}`).then(res => {
        console.log("addSubscribe");
        console.log(res);
        if (res) {
          self.$alertify.success("You have already subscribed this one!");
          self.dataSourceChanged();
        }
      });
    },
    sortProject() {
      var self = this;
      self.$api.get(`api/Tasks/GetListTreeTask/project`).then(res => {
        self.tasks = res.data;
        self.data = res.data;
        console.log("sortProject");
        console.log(self.tasks);
      });
    },
    sortRoutine() {
      var self = this;
      self.$api.get(`api/Tasks/GetListTreeTask/routine`).then(res => {
        self.tasks = res.data;
        self.data = res.data;
        console.log(self.tasks);
      });
    },
    sortHigh() {
      var self = this;
      self.$api.get(`api/Tasks/GetListTreeTask/H/%20`).then(res => {
        self.tasks = res.data;
        self.data = res.data;
        console.log("sortHigh");
        console.log(self.tasks);
      });
    },
    sortMedium() {
      var self = this;
      self.$api.get(`api/Tasks/GetListTreeTask/M/%20`).then(res => {
        self.tasks = res.data;
        self.data = res.data;
        console.log("sortMedium");
        console.log(self.tasks);
      });
    },
    sortLow() {
      var self = this;
      self.$api.get(`api/Tasks/GetListTreeTask/L/%20`).then(res => {
        self.tasks = res.data;
        self.data = res.data;
        console.log("sortLow");
        console.log(self.tasks);
      });
    },
    toolbarClick: function(args) {
      var self = this;
      console.log(self.$refs.treegrid);

      console.log(args);
      switch (args.item.text) {
        case "PDF Export":
          self.$refs.treegrid.pdfExport();
          break;
        case "Excel Export":
          self.$refs.treegrid.excelExport();
          break;
        case "CSV Export":
          self.$refs.treegrid.csvExport();
          break;
      }
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
        } else {
          this.$swal("Warning !", "Please finish all sub-tasks!", "warning");
        }
      });
    },
    delete(id) {
      var self = this;
      self.$api.delete("api/Tasks/Delete/" + id).then(res => {
        if (res.data) {
          self.dataSourceChanged();
        }
        this.$swal("Success !", "Delete", "success");
      });
    },
    dataSourceChanged() {
      var self = this;
      self.getTasks();
    },
    contextMenuClick: function(args) {
      var self = this;
      console.log(args);
      switch (args.item.id) {
        case "Add-Sub-Task":
          self.editStatus = false;
          self.clearForm();
          self.date = "";
          self.getUser(args.rowInfo.rowData.ProjectID);

          self.modalTitle = "Add Sub-Task";
          self.task.parentID = args.rowInfo.rowData.ID;
          self.task.projectID = args.rowInfo.rowData.ProjectID;
          self.projectSelected = {
            ID: args.rowInfo.rowData.ProjectID,
            Name: args.rowInfo.rowData.ProjectName
          };
          self.whoSelected = {
            Username: localStorage.getItem("User"),
            ID: localStorage.getItem("UserID")
          };

          $("#modal-task").modal("show");
          break;
        case "Done":
          self.done(args.rowInfo.rowData.ID);
          break;
        case "EditTask":
          self.clearForm();
          self.editStatus = true;
          self.modalTitle = "Edit Task";
          $("#modal-task").modal("show");
          self.getUser(args.rowInfo.rowData.ProjectID);
          self.task.priority = args.rowInfo.rowData.PriorityID;
          self.whoSelected = args.rowInfo.rowData.FromWho;
          self.projectSelected = {
            ID: args.rowInfo.rowData.ProjectID,
            Name: args.rowInfo.rowData.ProjectName
          };
          self.task = {
            description: args.rowInfo.rowData.Description,
            jobName: args.rowInfo.rowData.JobName,
            remark: args.rowInfo.rowData.Remark,
            priority: args.rowInfo.rowData.PriorityID
          };
          self.selected = args.rowInfo.rowData.BeAssigneds;
          self.date = args.rowInfo.rowData.Deadline;

          break;
        case "Remark":
          self.task.remark = "";
          self.editStatus = false;
          self.remarkObj.id = args.rowInfo.rowData.ID;
          self.remarkObj.remark = args.rowInfo.rowData.Remark;
          $("#modal-remark").modal("show");
          break;
        case "DeleteTask":
          self.delete(args.rowInfo.rowData.ID);
          break;
      }
    },
    addTagProject(newTag) {
      const tag = {
        ID: newTag,
        Name: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.projectOptions.push(tag);
      this.projectSelected.push(tag);
      this.selected.map(item => {
        this.task.projectID = item.ID;
      });
      console.log(this.task.projectID);
    },
    addTagOC(newTag) {
      const tag = {
        ID: newTag,
        Name: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.ocOptions.push(tag);
      this.ocSelected.push(tag);
      this.ocSelected.map(item => {
        this.task.OCID = item.ID;
      });
      console.log(this.task.OCID);
    },
    addTag(newTag) {
      const tag = {
        ID: newTag,
        Username: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.options.push(tag);
      this.selected.push(tag);
      this.selected.map(item => {
        this.task.pic.push(item.ID);
      });
    },
    getUser(projectID = 0) {
      var self = this;
      self.$api.get(`api/Tasks/GetListUser/${projectID}`).then(res => {
        self.options = res.data;
        console.log(res);
      });
    },
    getUserForWho() {
      var self = this;
      self.$api.get("api/Users/GetListUser").then(res => {
        self.whoOptions = res.data;
        console.log("getUserForWho");
        console.log(res);
      });
    },
    clearForm() {
      var self = this;
      self.date = "";
      self.projectSelected = {};
      self.task = [];
      self.selected = [];
    },
    getTasks() {
      var self = this;
      self.$api.get("api/Tasks/GetListTreeTask").then(res => {
        self.tasks = res.data;
        self.data = res.data;
        console.log(self.data);
      });
    },
    onSelectOC(option) {
      this.task.OCID = option.ID;
      console.log(this.task.OCID);
    },
    onSelectTask(option) {
      this.task.pic.push(option.ID);
      console.log(this.task.pic);
    },
    onSelectProject(option) {
      this.task.projectID = option.ID;
      console.log(this.task.projectID);
      console.log("projectSelected da thay doi load lai user");
      this.getUser(option.ID);
    },
    onSelectWho(option) {
      this.task.fromWhoID = option.ID;
      console.log(this.task.fromWhoID);
    },
    getProjects() {
      var self = this;
      self.$api.get("api/Tasks/GetListProject").then(res => {
        self.projectOptions = res.data;
        console.log(res);
      });
    },
    getFrom() {
      var self = this;
      self.$api.get("api/Tasks/From").then(res => {
        self.ocOptions = res.data.ocs;
        self.userOptions = res.data.users;

        console.log(res);
      });
    },
    newTaskInfo() {
      var self = this;
      self.modalTitle = "Add-Task";
      self.getUser();
      self.clearForm();
    },
    clearForm() {
      this.task = {
        id: 0,
        description: "",
        from: "",
        jobName: "",
        createdBy: 0,
        projectID: 0,
        parentID: 0,
        remark: "",
        deadline: "",
        status: false,
        priority: "M",
        pic: []
      };
      this.projectSelected = [];
      this.selected = [];
      this.date = "";
    },
    createTask() {
      var self = this;
      console.log("createTask");
      console.log(self.task);
      if (self.task.parentID > 0) {
        self.task.fromWhoID = self.whoSelected.ID;
        self.$api.post("api/Tasks/CreateSubTask", self.task).then(res => {
          if (res.data) {
            self.clearForm();
            $("#modal-task").modal("hide");
            self.dataSourceChanged();
          }
          self.$swal("Success!", "Add Sub-Tasks successfully!", "success");
          console.log(res);
        });
      } else {
        self.$api.post("api/Tasks/CreateTask", self.task).then(res => {
          if (res.data) {
            self.clearForm();
            $("#modal-task").modal("hide");
            self.dataSourceChanged();
          }
          self.$swal("Success!", "Add Tasks successfully!", "success");
          console.log(res);
        });
      }
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
  watch: {
    task: function(newVal, oldVal) {
      console.log(newVal);
    },
    date: function(newVal, oldVal) {
      this.task.deadline = this.dateFormat(newVal);
    }
  },
  provide: {
    treegrid: [
      ContextMenu,
      CommandColumn,
      Sort,
      ExcelExport,
      PdfExport,
      Page,
      Toolbar
    ]
  }
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
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
