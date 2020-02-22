<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Projects Detail</h3>

        <div class="card-tools">
          <button
            type="button"
            class="btn btn-tool"
            data-card-widget="collapse"
            data-toggle="tooltip"
            title="Collapse"
          >
            <i class="fas fa-minus"></i>
          </button>
          <button
            type="button"
            class="btn btn-tool"
            data-card-widget="remove"
            data-toggle="tooltip"
            title="Remove"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-md-12 col-lg-12 order-2 order-md-1">
            <h3 class="text-primary pb-3">
              <i class="fas fa-paint-brush"></i>
              {{projectName}}
            </h3>
            <div class="row">
              <div class="col-12 col-sm-4">
                <div class="info-box bg-light" style="cursor: pointer;" @click="infoManager">
                  <div class="info-box-content">
                    <span class="info-box-text text-center text-muted">Project Manager</span>
                    <span
                      class="info-box-number text-center text-muted mb-0"
                    >{{ mamagersName.join(' , ')}}</span>
                  </div>
                </div>
              </div>

              <div class="col-12 col-sm-8">
                <div class="info-box bg-light" style="cursor: pointer;" @click="infoMember">
                  <div class="info-box-content">
                    <span class="info-box-text text-center text-muted">Team Members</span>
                    <span class="info-box-number text-center text-muted mb-0">
                      {{ membersName.join(' , ')}}
                      <span></span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 pb-2" v-if="isHideAdd">
                <small
                  class="text-danger"
                >* Note: Please click on project manager or team member to edit or add it.</small>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <h4>Project Task</h4>
                <div class="col-md-12 pb-4">
                  <button
                    type="button"
                    class="btn bg-gradient-secondary btn-sm"
                    data-toggle="modal"
                    data-target="#modal-task"
                    @click="newTaskInfo"
                    v-show="isHideAdd"
                  >
                    <i class="fas fa-plus"></i> New Project Task
                  </button>
                </div>
                <div class="col-md-12">
                  <h5>Sort:</h5>
                </div>
                <div class="col-md-12 pb-4">
                  <!-- <button
                    type="button"
                    @click="sortProject"
                    class="btn bg-gradient-secondary btn-sm"
                  >
                    <i class="fas fa-tasks"></i> Project
                  </button>
                  <button
                    type="button"
                    @click="sortRoutine"
                    class="btn bg-gradient-secondary btn-sm"
                  >
                    <i class="fas fa-book-open"></i> Routine Job
                  </button>-->

                  <button type="button" @click="sortHigh" class="btn bg-gradient-secondary btn-sm">
                    <i class="fas fa-exclamation"></i> High
                  </button>
                  <button
                    type="button"
                    @click="sortMedium"
                    class="btn bg-gradient-secondary btn-sm"
                  >
                    <i class="fab fa-medium"></i> Medium
                  </button>
                  <button type="button" @click="sortLow" class="btn bg-gradient-secondary btn-sm">
                    <i class="fas fa-low-vision"></i> Low
                  </button>
                  <button type="button" @click="getTasks" class="btn bg-gradient-secondary btn-sm">
                    <i class="fas fa-sync-alt"></i> All
                  </button>
                  <a @click="joinGroup" class="btn bg-gradient-secondary btn-sm">
                    <i class="fas fa-comment-dots"></i> Chat Room
                  </a>
                </div>
                <ejs-treegrid
                  ref="treegrid"
                  :dataSource="data"
                  childMapping="children"
                  :treeColumnIndex="1"
                  :allowPaging="true"
                  :height="'auto'"
                  :pageSettings="pageSettings"
                  :allowSorting="true"
                  :contextMenuItems="contextMenuItems"
                  :contextMenuClick="contextMenuClick"
                  :dataSourceChanged="dataSourceChanged"
                  :sortSettings="sortSettings"
                  :toolbar="toolbar"
                  :searchSettings="searchSettings"
                  :toolbarClick="toolbarClick"
                  :allowExcelExport="true"
                  :allowPdfExport="true"
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
                    <e-column
                      field="PIC"
                      headerText="PIC"
                      width="180"
                      format="yMd"
                      textAlign="Right"
                    ></e-column>
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
                      field="Add Sub-Task"
                      :template="optionSubTaskTemplate"
                      headerText="Add Sub-Task"
                      width="150"
                      v-if="isHideAdd"
                      textAlign="Center"
                    ></e-column>
                    <e-column
                      field="Follow"
                      :template="optionFollowTemplate"
                      headerText="Follow"
                      width="130"
                      textAlign="Center"
                    ></e-column>
                  </e-columns>
                </ejs-treegrid>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /.card-body -->
    </div>
    <div class="modal fade" id="modal-add-manager" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              <i class="fas fa-plus"></i> Add Manager
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="JobType">Manager</label>
              <multiselect
                v-model="selectedManager"
                deselect-label="Can't remove this value"
                track-by="ID"
                label="Username"
                placeholder="Select one"
                :options="options"
                :searchable="true"
                :multiple="true"
                :allow-empty="false"
                @select="onSelectManager"
              ></multiselect>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click="addManager" type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <div class="modal fade" id="modal-add-member" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              <i class="fas fa-plus"></i> Add Member
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="JobType">Member</label>
              <multiselect
                v-model="selectedMember"
                tag-placeholder="Add this as new tag"
                placeholder="Search or add a tag"
                label="Username"
                track-by="ID"
                :options="options"
                :multiple="true"
                :searchable="true"
                :taggable="true"
                @select="onSelectMember"
              ></multiselect>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click="addMember" type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
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
                <div class="form-group">
                  <label for="JobType">Job Name</label>
                  <small v-if="!editStatus" class="text-danger">(*) Require</small>
                  <input
                    type="text"
                    id="JobType"
                    v-model="task.jobName"
                    class="form-control JobType"
                  />
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
              <div class="col-md-12">
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
                            :searchable="true"
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
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="Period">Period</label>
                      <select id="Period" v-model="selectedPeriodMain" class="form-control">
                        <option value="reset">Choose period</option>
                        <option value="EveryDay">Every day</option>
                        <option value="SpecificDay">Specific Day</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group box SpecificDay">
                      <label for="Description">Specific Day</label>
                      <small v-if="!editStatus" class="text-danger">(*) Require</small>
                      <datetime
                        v-model="date"
                        input-class="form-control"
                        placeholder="Select date"
                        type="date"
                      ></datetime>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group box EveryDay">
                      <label for="Description">Every day</label>
                      <select class="form-control" v-model="selectedPeriod">
                        <option disabled value>Please select one</option>
                        <option v-for="(day,index) in everydays" :value="day.substring(0,3)">{{day}}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
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
              <i class="fas fa-plus"></i>Add Remark
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
import EventBus from "../../../EventBus";
import {
  TreeGridPlugin,
  ContextMenu,
  Sort,
  ExcelExport,
  PdfExport,
  Page,
  Filter,
  CommandColumn,
  TreeGridComponent,
  Toolbar
} from "@syncfusion/ej2-vue-treegrid";
Vue.use(TreeGridPlugin);

export default {
  name: "project-detail",
  components: {
    Multiselect,
    Datetime
  },
  data() {
    return {
      selectedPeriod: "",
      searchSettings: { hierarchyMode: "Parent" },
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
      optionSubTaskTemplate: function() {
        return {
          template: Vue.component("optionTemplate", {
            template: `<div id="optionTemplate">
                      <div class="btn-group">
                        <button type="button" @click="addSubTask(data)" class="btn btn-info btn-xs mr-2"><i class="fas fa-plus"></i> Sub-Task</button>
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
              }
            }
          })
        };
      },
      optionFollowTemplate: function() {
        return {
          template: Vue.component("optionTemplate", {
            template: `<div id="optionTemplate">
                      <div class="btn-group">
                        <button type="button" @click="addSubscribe(data)"class="btn btn-danger btn-xs" v-if="data.Level == 1" ><i :class="!data.Subscribe ? 'fas fa-bell':'fas fa-bell-slash'"></i> {{!data.Subscribe?'Follow':'Followed'}}</button>
                      </div>
                    </div>`,
            data: function() {
              return {
                data: {}
              };
            },
            methods: {
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
      modalTitle: "Add New Project Task",
      sort: "",
      contextMenuItems: [],
      pageSettings: { pageSize: 15 },
      toolbar: [
        "Search",
        "ExpandAll",
        "CollapseAll",
        "ExcelExport",
        "PdfExport"
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
      selectedManager: [],
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
        projectID: Number(this.$route.params.id),
        parentID: 0,
        remark: "",
        deadline: "",
        status: false,
        fromWhoID: 0,
        everyday: "",
        priority: "M",
        pic: [],
        JobTypeID: 1
      },
      projectName: "",
      projectOptions: [],
      projectSelected: [],
      whoOptions: [],
      whoSelected: [],
      everydays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      selectedPeriodMain: "reset",
      //----------------------------------------------------To Do List Params
      page: 1,
      projectName: " ",
      pageSize: 20,
      totalPage: 0,
      data: [],
      options: [],
      selected: [],
      selectedMember: [],
      membersName: [],
      mamagersName: [],
      manager: {
        users: [],
        ProjectID: Number(this.$route.params.id)
      },
      member: {
        users: [],
        ProjectID: Number(this.$route.params.id)
      },
      users: [],
      createdBy: localStorage.getItem("UserID"),
      listMangerID: [],
      listMemberID: [],
      createdBy: 0,
      isHideAdd: true,
      connection: {},
      room: ""
    };
  },
  created() {
    // EventBus.$on("reciveConnection", this.reciveConnection);
    this.getProjects();
    this.getFrom();
    this.getUserForWho();
    this.getTasks();
    this.who = localStorage.getItem("User");
    this.getListUser();
    this.GetUserByProjectID(this.$route.params.id);

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://10.4.4.224:93/working-management-hub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection
      .start()
      .then(function() {
        console.log("Connected working-management-hub detail ");
        /// EventBus.$emit("reciveConnection", self.connection);
      })
      .catch(error => {
        console.log("working-management-hub error detail!! ");
        console.log(error);
      });
  },
  methods: {
    joinGroup() {
      var self = this;
      self.connection.invoke("JoinGroup", "2").catch(function(err) {
        return console.error(err.toString());
      });
    },
    sendToGroup() {
      this.connection
        .invoke("SendMessageToGroup", "PrivateGroup", "message")
        .catch(function(err) {
          return console.error(err.toString());
        });
    },
    reciveConnection(conn) {
      this.connection = conn;
    },
    infoEdit(taskItem) {
      var self = this;
      self.getUser();
      console.log("handler");
      console.log(taskItem);
      self.editStatus = false;
      self.clearForm();
      self.date = "";

      self.modalTitle = "Add New Project Sub-Task";
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
      self.$api
        .get(
          `api/Projects/GetListTreeProjectDetail/${Number(
            self.$route.params.id
          )}/project`
        )
        .then(res => {
          self.tasks = res.data;
          self.data = res.data;
          console.log("sortProject");
          console.log(self.tasks);
        });
    },
    sortRoutine() {
      var self = this;
      self.$api
        .get(
          `api/Projects/GetListTreeProjectDetail/${Number(
            self.$route.params.id
          )}/routine`
        )
        .then(res => {
          self.tasks = res.data;
          self.data = res.data;
          console.log(self.tasks);
        });
    },
    sortHigh() {
      var self = this;
      self.$api
        .get(
          `api/Projects/GetListTreeProjectDetail/${Number(
            self.$route.params.id
          )}/H/%20`
        )
        .then(res => {
          self.tasks = res.data;
          self.data = res.data;
          console.log("sortHigh");
          console.log(self.tasks);
        });
    },
    sortMedium() {
      var self = this;
      self.$api
        .get(
          `api/Projects/GetListTreeProjectDetail/${Number(
            self.$route.params.id
          )}/M/%20`
        )
        .then(res => {
          self.tasks = res.data;
          self.data = res.data;
          console.log("sortMedium");
          console.log(self.tasks);
        });
    },
    sortLow() {
      var self = this;
      self.$api
        .get(
          `api/Projects/GetListTreeProjectDetail/${Number(
            self.$route.params.id
          )}/L/%20`
        )
        .then(res => {
          self.tasks = res.data;
          self.data = res.data;
          console.log("sortLow");
          console.log(self.tasks);
        });
    },
    toolbarClick(args) {
      var self = this;
      switch (args.item.text) {
        case "PDF Export":
          self.$refs.treegrid.pdfExport();
          break;
        case "Excel Export":
          self.$refs.treegrid.excelExport();
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
          self.$alertify.success("You have already finished this one!");
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
          self.getUser();

          self.modalTitle = "Add New Project Sub-Task";
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
          self.modalTitle = "Edit Project Task";
          $("#modal-task").modal("show");
          self.getUser();
          self.task.priority = args.rowInfo.rowData.PriorityID;
          self.whoSelected = args.rowInfo.rowData.FromWho;
          self.projectSelected = {
            ID: args.rowInfo.rowData.ProjectID,
            Name: args.rowInfo.rowData.ProjectName
          };
          self.task = {
            description: args.rowInfo.rowData.Description,
            jobName: args.rowInfo.rowData.JobName,
            everyday: args.rowInfo.rowData.EveryDay,

            remark: args.rowInfo.rowData.Remark,
            priority: args.rowInfo.rowData.PriorityID,
            id: args.rowInfo.rowData.ID,
            pic: args.rowInfo.rowData.PIC || []
          };
          if (args.rowInfo.rowData.EveryDay !== "") {
            self.selectedPeriodMain = "EveryDay";
            self.selectedPeriod = args.rowInfo.rowData.EveryDay;
          } else if (args.rowInfo.rowData.Deadline !== "0001-01-01T00:00:00") {
            self.selectedPeriodMain = "SpecificDay";
            self.date = args.rowInfo.rowData.Deadline;
          }
          self.selected = args.rowInfo.rowData.BeAssigneds;

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
    getUser(flag = false) {
      let self = this;
      let projectid;
      if (!flag) projectid = Number(self.$route.params.id);
      else projectid = 0;
      self.$api.get(`api/Tasks/GetListUser/${projectid}`).then(res => {
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
    // clearForm() {
    //   var self = this;
    //   self.date = "";
    //   self.projectSelected = {};
    //   self.task = [];
    //   self.selected = [];
    // },
    getTasks() {
      var self = this;
      self.$api
        .get(`api/Projects/GetListTreeProjectDetail/${self.$route.params.id}`)
        .then(res => {
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
      this.getUser();
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
      self.selectedPeriodMain = "reset";
      self.modalTitle = "Add New Project Task";
      self.whoSelected = {
        ID: Number(localStorage.getItem("UserID")),
        Username: localStorage.getItem("User")
      };
      // self.task = self.selectedPeriod;
      self.getUser();
      self.clearForm();
    },
    clearForm() {
      this.task = {
        id: 0,
        description: "",
        from: "",
        jobName: "",
        createdBy: Number(localStorage.getItem("UserID")),
        projectID: Number(this.$route.params.id),
        parentID: 0,
        remark: "",
        deadline: "",
        status: false,
        fromWhoID: 0,
        priority: "M",
        everyday: "",
        pic: [],
        JobTypeID: 1
      };
      this.selectedPeriod = "";
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
        self.task.fromWhoID = self.whoSelected.ID;
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
    },
    //------------------------Method To Do list

    getListUser() {
      var self = this;
      self.$api.get(`api/Projects/GetUsers`).then(res => {
        self.users = res.data;
        self.options = res.data;
        console.log("getListUser");
        console.log(self.users);
      });
    },
    addManager() {
      let self = this;
      self.$api.post("api/Projects/AddManager", self.manager).then(res => {
        if (res) {
          self.GetUserByProjectID(this.$route.params.id);
          self.$alertify.success("Add Manager Successfully!");
          $("#modal-add-manager").modal("hide");
        }
        console.log(res);
      });
    },
    addMember() {
      let self = this;
      this.$api.post("api/Projects/AddMember", self.member).then(res => {
        console.log(res);
        if (res) {
          self.GetUserByProjectID(this.$route.params.id);
          self.$alertify.success("Add Member Successfully!");
          $("#modal-add-member").modal("hide");
        }
      });
    },
    infoManager() {
      let self = this;
      if (self.isHideAdd) {
        self.getListUser();
        $("#modal-add-manager").modal("show");
      }
    },
    infoMember() {
      let self = this;
      if (self.isHideAdd) {
        self.getListUser();
        $("#modal-add-member").modal("show");
        self.member.ProjectID = this.$route.params.id;
      }
    },
    onSelectManager(option) {
      // this.manager.UserID = option.ID;
      // console.log(this.manager.UserID);
    },
    onSelectMember(option) {
      // this.member.users.push(option.ID);
      // console.log(this.member.users);
    },
    getListUser() {
      var self = this;
      self.$api.get(`api/Projects/GetUsers`).then(res => {
        self.users = res.data;
        self.options = res.data;
        console.log("getListUser");
        console.log(self.users);
      });
    },
    checkRole(createdBy = 0, managers = [], members = []) {
      let self = this;
      let user = Number(localStorage.getItem("UserID"));
      if (createdBy == user)
        self.contextMenuItems = [
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
        ];
      else if (managers.includes(user)) {
        self.contextMenuItems = [
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
        ];
      } else if (members.includes(user)) {
        self.isHideAdd = false;
        console.log("checkRole");

        console.log(self.$refs.treegrid);
        self.contextMenuItems = [
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
          }
        ];
      }
    },
    GetUserByProjectID(id) {
      var self = this;
      self.$api.get(`api/Projects/GetUserByProjectID/${id}`).then(res => {
        if (res.data.status) {
          console.log(res.data);
          self.selectedMember = res.data.selectedMember;
          self.selectedManager = res.data.selectedManager;
          self.projectName = res.data.title;
          self.room = res.data.room;
          let members = res.data.selectedMember;
          let managers = res.data.selectedManager;

          self.member.users = members.map((member, index, members) => {
            return member.ID;
          });
          self.membersName = members.map((member, index, members) => {
            return this.$common.toTitleCase(member.Username);
          });
          self.mamagersName = managers.map((manager, index, managers) => {
            return this.$common.toTitleCase(manager.Username);
          });

          self.listMemberID = members.map((member, index, members) => {
            return member.ID;
          });
          self.listMangerID = managers.map((manager, index, managers) => {
            return manager.ID;
          });

          self.createdBy = res.data.createdBy;
          self.checkRole(self.createdBy, self.listMangerID, self.listMemberID);
        }
      });
    }
  },
  mounted() {
    // EventBus.$on("reciveConnection", this.reciveConnection);
    EventBus.$on("subscribe", this.addSubscribe);
    EventBus.$on("taskItem", this.infoEdit);
    $(document).ready(function() {
      $("#Period")
        .change(function() {
          $(this)
            .find("option:selected")
            .each(function() {
              var optionValue = $(this).attr("value");
              if (optionValue) {
                $(".form-group.box")
                  .not("." + optionValue)
                  .hide();
                $("." + optionValue).show();
              } else {
                $(".form-group.box").hide();
              }
            });
        })
        .change();
    });
  },
  destroyed() {
    // Stop listening the event hello with handler
    EventBus.$off("taskItem", this.infoEdit);
    EventBus.$off("subscribe", this.addSubscribe);
    // EventBus.$off("reciveConnection", this.reciveConnection);
  },
  watch: {
    selectedMember: function(newVal, oldVal) {
      var self = this;
      let members = newVal;
      self.member.users = members.map((member, index, members) => {
        return member.ID;
      });
    },
    selectedManager: function(newVal, oldVal) {
      var self = this;
      let managers = newVal;
      self.manager.users = managers.map((manager, index, managers) => {
        return manager.ID;
      });
    },
    selectedPeriod: function(newVal, oldVal) {
      var self = this;
      self.task.everyday = newVal;
    },
    date: function(newVal, oldVal) {
      this.task.deadline = this.dateFormat(newVal);
    },
    selectedPeriodMain: function(newOld) {
      $(document).ready(function() {
        $("#Period")
          .change(function() {
            $(this)
              .find("option:selected")
              .each(function() {
                var optionValue = $(this).attr("value");
                if (optionValue) {
                  $(".form-group.box")
                    .not("." + optionValue)
                    .hide();
                  $("." + optionValue).show();
                } else {
                  $(".form-group.box").hide();
                }
              });
          })
          .change();
      });
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
      Filter,
      Toolbar
    ]
  }
};
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
