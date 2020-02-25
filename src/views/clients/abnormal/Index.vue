<template>
  <div>
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              <i class="fas fa-project-diagram"></i> Organization Chart
            </h3>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <ejs-treegrid
              :dataSource="dataLeft"
              childMapping="children"
              :treeColumnIndex="1"
              :allowPaging="true"
              :pageSettings="pageSettingsLeft"
              :allowExcelExport="true"
              :allowPdfExport="true"
              :allowSorting="true"
              :editSettings="editingLeft"
              :rowSelected="rowSelectedLeft"
              :toolbar="toolbarLeft"
              :searchSettings="searchSettingsLeft"
              :allowTextWrap="true"
            >
              <e-columns @click="showModal">
                <e-column
                  field="levelnumber"
                  width="90"
                  isPrimaryKey="true"
                  headerText="Level"
                  :disableHtmlEncode="false"
                ></e-column>

                <e-column
                  field="title"
                  editType="stringedit"
                  headerText="OC Name"
                  :disableHtmlEncode="false"
                ></e-column>
              </e-columns>
            </ejs-treegrid>
          </div>
          <!-- /.card-body -->
        </div>
      </div>
      <div class="col-md-9">
        <div class="col-md-12 pb-4 d-none">
          <button
            type="button"
            class="btn bg-gradient-secondary btn-sm"
            data-toggle="modal"
            data-target="#modal-task"
            @click="newTaskInfo"
            v-if="IsHideAdd"
          >
            <i class="fas fa-plus"></i>Add New Abnormal Task
          </button>
        </div>
        <div class="col-md-12">
          <h5>Sort:</h5>
        </div>
        <div class="col-md-12 pb-4">
          <!-- <button type="button" @click="sortProject" class="btn bg-gradient-secondary btn-sm">
            <i class="fas fa-tasks"></i> Project
          </button>
          <button type="button" @click="sortRoutine" class="btn bg-gradient-secondary btn-sm">
            <i class="fas fa-book-open"></i> Routine Job
          </button>-->

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
              <h5 class="card-title">
                <i class="fas fa-list"></i>
                Abnormal Task {{title}}
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
              <div v-if="showListTask">
                <ejs-treegrid
                  ref="treegrid"
                  :dataSource="data"
                  childMapping="children"
                  :treeColumnIndex="3"
                  :allowPaging="true"
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
                  :allowTextWrap="true"
                  :contextMenuOpen="contextMenuOpen"
                  :editSettings="editSettings"
                >
                  <e-columns>
                    <e-column
                      field="Follow"
                      :template="optionFollowTemplate"
                      headerText="Follow"
                      width="130"
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
                      field="Add Sub-Task"
                      :template="optionSubTaskTemplate"
                      headerText="Add Sub-Task"
                      width="150"
                      v-if="IsHideAdd"
                      textAlign="Center"
                    ></e-column>
                    <!-- <e-column
                    field="ProjectName"
                    headerText="Project name"
                    :disableHtmlEncode="false"
                    width="240"
                    ></e-column>-->
                    <e-column
                      field="JobName"
                      headerText="Job Name"
                      :disableHtmlEncode="false"
                      width="240"
                    ></e-column>
                    <e-column
                      field="From"
                      headerText="From Who?"
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
                     <e-column
                      field="EveryDay"
                      headerText="Every Day"
                      width="160"
                      textAlign="Center"
                    ></e-column>
                    <e-column field="Monthly" headerText="Monthly" width="160" textAlign="Center"></e-column>
                    <e-column
                      field="Quarterly"
                      headerText="Quarterly"
                      width="160"
                      textAlign="Center"
                    ></e-column>
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
              </div>
              <div v-else>
                <p
                  class="text-danger text-center"
                >* Note: Please click on a department to display list abnormal task</p>
              </div>
            </div>
            <!-- ./card-body -->
          </div>
          <!-- /.card -->
        </div>
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
                <div class="form-group">
                  <label for="JobType">Abnormal</label>
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
                  <label for="JobType">From</label>
                  <small v-if="!editStatus" class="text-danger">(*) Default is yourself!</small>
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
              <div class="col-md-12">
                <div class="form-group">
                  <label for="Description">Description</label>
                  <textarea
                    type="text"
                    id="Description"
                    v-model="task.description"
                    class="form-control Description"
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="Assigned">Be Assigned</label>
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
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="SpecificDay">Specific Day</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label for="Deputy">Deputy</label>

                    <multiselect
                      v-model="selectedDeputies"
                      tag-placeholder="Add this as new tag"
                      placeholder="Search or add a tag"
                      label="Username"
                      track-by="ID"
                      :options="deputies"
                      :multiple="true"
                      :taggable="true"
                    ></multiselect>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group box SpecificDay">
                      <label for="Description">Specific Day</label>
                      <small v-if="!editStatus" class="text-danger">(*) Require</small>
                      <datetime
                        v-model="task.deadline"
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
                    <div class="col-md-12">
                    <div class="form-group box Monthly">
                      <label for="Description">Monthly</label>
                      <small v-if="!editStatus" class="text-danger">(*) Require</small>
                      <select class="form-control" v-model="task.monthly">
                        <option disabled value>Please select one</option>
                        <option
                          v-for="(month,index) in monthly"
                          :value="month.substring(0,3)"
                        >{{month}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group box Quarterly">
                      <label for="Description">Quarterly</label>
                      <small v-if="!editStatus" class="text-danger">(*) Require</small>
                      <select class="form-control" v-model="task.quarterly">
                        <option disabled value>Please select one</option>
                        <option
                          v-for="(quarter,index) in quarterly"
                          :value="quarter.substring(0,3)"
                        >{{quarter}}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <label>Priority</label>
                <small v-if="!editStatus" class="text-danger">(*) Default is medium</small>

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
// register globally
Vue.component("multiselect", Multiselect);
export default {
  name: "abnormal-job",
  components: {
    Multiselect,
    Datetime
  },
  data() {
    return {
      IsLeader: localStorage.getItem("IsLeader") === "true" ? true : false,
      title: "",
      dataLeft: [],
      editparamsLeft: { params: { format: "n" } },
      contextMenuItemsLeft: [
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
      toolbarLeft: [
        "Search",
        "ExpandAll",
        "CollapseAll"
        // "ExcelExport",
        // "PdfExport"
      ],
      editingLeft: { allowDeleting: true, allowEditing: true, mode: "Row" },
      editSettings: {
        allowAdding: true
      },
      pageSettingsLeft: { pageSize: 10 },
      searchSettingsLeft: { hierarchyMode: "Parent" },
      // --------------------------------------------------------------------
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
                        <button type="button" @click="addFollow(data)"class="btn btn-danger btn-xs" v-if="data.Level == 1" ><i :class="!data.Follow ? 'fas fa-bell':'fas fa-bell-slash'"></i> {{!data.Follow?'Follow':'Followed'}}</button>
                      </div>
                    </div>`,
            data: function() {
              return {
                data: {}
              };
            },
            methods: {
              addFollow(data) {
                EventBus.$emit("follow", data);
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
        "Add",
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
      everydays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
       monthly: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      quarterly: [
        "First quarter",
        "Second quarter",
        "Third quarter",
        "Fourth quarter"
      ],
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
      ocid: 0,
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
        everyday: "",
        monthly: "",
        quarterly: "",
        JobTypeID: 3,
        pic: []
      },
      projectOptions: [],
      projectSelected: [],
      whoOptions: [],
      whoSelected: [],
      selectedPeriod: "",
      selectedPeriodMain: "reset",
      deputies: [],
      selectedDeputies: [],
      showListTask: false,
      IsHideAdd: true
    };
  },
  mounted() {
    console.log("this.$refs.treegrid");
    console.log(this.$refs.treegrid);
    EventBus.$on("follow", this.addFollow);
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
    EventBus.$off("follow", this.addFollow);
  },
  created() {
    this.getProjects();
    this.getFrom();
    this.getUserForWho();
    this.getTasks();
    this.getOCs();
    this.who = localStorage.getItem("User");
    this.checkRole();
  },
  methods: {
    showModal(){
      alert(1)
      $("#modal-remark").modal("show");
    },
    checkRole() {
      let userLevel = Number(localStorage.getItem("Level"));
      //Neu user co level la 3 va khong fai la leader thi se
      if (userLevel >= 3 && !this.IsLeader) {
        this.IsHideAdd = false;
        this.editSettings.allowAdding = false;
      }
    },
    getDeputies() {
      var self = this;
      self.$api.get("api/Tasks/getDeputies").then(res => {
        console.log("getDeputies");
        self.deputies = res.data;
        console.log(self.deputies);
      });
    },
    getOCs() {
      var self = this;
      self.$api.get("api/Ocs/GetListTree").then(res => {
        self.dataLeft = res.data;
        console.log(self.dataLeft);
      });
    },
    contextMenuOpen(arg) {
      console.log("contextMenuOpen");
      console.log(arg);
      var self = this;

      var currentUser = Number(localStorage.getItem("UserID"));
      let deputies = arg.rowInfo.rowData.Deputies || [];
      let beAssignedsTemp = arg.rowInfo.rowData.BeAssigneds || [];
      let beAssigneds = beAssignedsTemp.map(
        (assign, index, beAssignedsTemp) => {
          return assign.ID;
        }
      );
      //Neu khong fai la leader va level >= 3 thi chi hien 2 menu la done va remark
      //Neu la an add va nguoi nay la deputy cua task nay thi van cho full quyen
      if (!self.IsHideAdd) {
        if (deputies.includes(currentUser)) {
          document
            .querySelectorAll("li#Add-Sub-Task")[0]
            .setAttribute("style", "display: block;");
          document
            .querySelectorAll("li#Remark")[0]
            .setAttribute("style", "display: block;");
          document
            .querySelectorAll("li#Done")[0]
            .setAttribute("style", "display: block;");
          document
            .querySelectorAll("li#EditTask")[0]
            .setAttribute("style", "display: block;");

          document
            .querySelectorAll("li#DeleteTask")[0]
            .setAttribute("style", "display: block;");
        } else if (beAssigneds.includes(currentUser)) {
          document
            .querySelectorAll("li#Add-Sub-Task")[0]
            .setAttribute("style", "display: none;");
          document
            .querySelectorAll("li#EditTask")[0]
            .setAttribute("style", "display: none;");

          document
            .querySelectorAll("li#DeleteTask")[0]
            .setAttribute("style", "display: none;");
        } else {
          $query
            .querySelectorAll("li#Add-Sub-Task")[0]
            .setAttribute("style", "display: none;");
          $query
            .querySelectorAll("li#Remark")[0]
            .setAttribute("style", "display: none;");
          $query
            .querySelectorAll("li#Done")[0]
            .setAttribute("style", "display: none;");
          $query
            .querySelectorAll("li#EditTask")[0]
            .setAttribute("style", "display: none;");

          $query
            .querySelectorAll("li#DeleteTask")[0]
            .setAttribute("style", "display: none;");
          self.$swal("Warning!", "You are not assign this task!!!", "warning");
        }
      }
    },
    rowSelectedLeft(args) {
      var self = this;
      var listocs = localStorage.getItem("ListOCs").split(",") || [];
      if (listocs.includes(args.data.key.toString())) {
        console.log("rowSelectedLeft ");
        console.log(args);
        self.showListTask = true;
        self.edit = {
          key: args.data.key,
          title: args.data.title
        };
        self.title = " - " + args.data.title;
        //self.getTasks(args.data.key);
        self.ocid = args.data.key;
        self.task.OCID = args.data.key;
      } else {
        self.showListTask = false;
        self.$swal("Waring!", "You don't belong to this department", "warning");
      }
    },
    //---------------------------------------
    infoEdit(taskItem) {
      var self = this;
      self.getDeputies();
      self.getUser(taskItem.ProjectID);
      console.log("handler");
      console.log(taskItem);
      self.editStatus = false;
      self.clearForm();
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
    addFollow(data) {
      var self = this;
      self.$api.get(`api/Tasks/Follow/${data.ID}`).then(res => {
        console.log("addFollow");
        console.log(res);
        if (res) {
          self.$alertify.success("You have already followd this one!");
          self.dataSourceChanged();
        }
      });
    },
    sortProject() {
      var self = this;
      self.$api
        .get(`api/Tasks/GetListTreeAbnormal/${self.ocid}/project`)
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
        .get(`api/Tasks/GetListTreeAbnormal/${self.ocid}/routine`)
        .then(res => {
          self.tasks = res.data;
          self.data = res.data;
          console.log(self.tasks);
        });
    },
    sortHigh() {
      var self = this;
      self.$api
        .get(`api/Tasks/GetListTreeAbnormal/${self.ocid}/H/%20`)
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
        .get(`api/Tasks/GetListTreeAbnormal/${self.ocid}/M/%20`)
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
        .get(`api/Tasks/GetListTreeAbnormal/${self.ocid}/L/%20`)
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
        case "Add":
          $("#modal-task").modal("show");
          self.newTaskInfo();
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
          self.getDeputies();

          self.clearForm();
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
          self.getDeputies();
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
            priority: args.rowInfo.rowData.PriorityID,
            id: args.rowInfo.rowData.ID,
            pic: args.rowInfo.rowData.PIC || [],
            deadline: args.rowInfo.rowData.Deadline
          };
          self.selected = args.rowInfo.rowData.BeAssigneds;
          if (args.rowInfo.rowData.EveryDay !== "#N/A") {
            self.selectedPeriodMain = "EveryDay";
            self.selectedPeriod = args.rowInfo.rowData.EveryDay.substring(0, 3);
          } else if (args.rowInfo.rowData.Monthly !== "#N/A") {
            self.selectedPeriodMain = "Monthly";
            self.task.monthly = args.rowInfo.rowData.Monthly.substring(0, 3);
          } else if (args.rowInfo.rowData.Quarterly !== "#N/A") {
            self.selectedPeriodMain = "Quarterly";
            self.task.quarterly = args.rowInfo.rowData.Quarterly.substring(
              0,
              3
            );
          } else if (args.rowInfo.rowData.DueDate !== "#N/A") {
            self.selectedPeriodMain = "SpecificDay";
            self.task.deadline = args.rowInfo.rowData.Deadline;
          }
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
        console.log("getUser");
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
      self.$api.get(`api/Tasks/GetListTreeAbnormal/${self.ocid}`).then(res => {
        console.log(res);
        self.data = [];
        if (res.data.length > 0) {
          self.data = res.data;
          console.log(self.data);
        } else {
          //self.$alertify.error("Not available!");
        }
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
      self.editStatus = false;
      self.getDeputies();
      self.modalTitle = "Add New Routine Task";
      self.whoSelected = {
        ID: Number(localStorage.getItem("UserID")),
        Username: localStorage.getItem("User")
      };
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
        projectID: 0,
        parentID: 0,
        remark: "",
        deadline: "",
        status: false,
        fromWhoID: 0,
        everyday: this.selectedPeriod,
        OCID: this.ocid,
        priority: "M",
        pic: [],
        deputies: [],
        JobTypeID: 3
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
    }
  },
  watch: {
    selected: function(newVal, oldVal) {
      var self = this;
      let pics = newVal;
      self.task.pic = pics.map((pic, index, pics) => {
        return pic.ID;
      });
    },
    selectedDeputies: function(newVal, oldVal) {
      var self = this;
      let deputies = newVal;
      self.task.deputies = deputies.map((deputy, index, deputies) => {
        return deputy.ID;
      });
    },
    selectedPeriod: function(newVal, oldVal) {
      console.log(newVal);
      this.task.everyday = newVal;
    },
    task: function(newVal, oldVal) {
      console.log(newVal);
    },
    ocid: function(newVal) {
      this.ocid = newVal;
      this.task.OCID = newVal;
      this.getTasks();
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
