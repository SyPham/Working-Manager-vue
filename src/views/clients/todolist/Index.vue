<template>
  <div>
    <div class="row">
      <div class="col-md-12 pb-4" v-if="1 > 2">
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
    </div>
    <div class="row sticky-top">
      <div class="col-md-12 col-xs-12 col-12">
        <h5 class="text-primary">Sort By:</h5>
      </div>
      <div class="col-lg-6 col-xs-12 col-12 pb-4">
        <button type="button" @click="sortProject" class="btn bg-gradient-secondary btn-sm">
          <i class="fas fa-tasks"></i> Project
        </button>
        <button type="button" @click="sortRoutine" class="btn bg-gradient-secondary btn-sm">
          <i class="fas fa-book-open"></i> Routine
        </button>
        <button type="button" @click="sortAbnormal" class="btn bg-gradient-secondary btn-sm">
          <i class="fas fa-book-open"></i> Abnormal
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
          <i class="fas fa-sync-alt"></i> Reset Sort
        </button>
      </div>
      <div class="col-lg-2 col-xs-6 col-6 pb-4">
        <div class="form-group EveryDay">
          <select class="form-control" v-model="selectedEveryday">
            <option disabled value="reset">Sort by weekdays</option>
            <option v-for="(day,index) in everydays" :value="day.substring(0,3)">{{day}}</option>
          </select>
        </div>
      </div>
      <div class="col-lg-2 col-xs-6 col-6 pb-4">
        <div class="form-group EveryDay">
          <select class="form-control" v-model="selectedMonthly">
            <option disabled value="reset">Sort by monthly</option>
            <option v-for="(month,index) in monthly" :value="month.substring(0,3)">{{month}}</option>
          </select>
        </div>
      </div>
      <div class="col-lg-2 col-xs-6 col-6 pb-4">
        <div class="form-group EveryDay">
          <select class="form-control" v-model="selectedQuarterly">
            <option disabled value="reset">Sort by quarterly</option>
            <option v-for="(quarter,index) in quarterly" :value="quarter.substring(0,3)">{{quarter}}</option>
          </select>
        </div>
      </div>
      <div class="col-lg-3 col-xs-6 col-6 pb-4 d-none">
        <v-md-date-range-picker
          max-year="2050"
          min-year="2019"
          show-year-select
          :start-date="startDate"
          :end-date="endDate"
          :showCustomRangeLabel="true"
          @change="handleChange"
        ></v-md-date-range-picker>
      </div>
    </div>
    <div class="row">
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
              ref="treegrid"
              :dataSource="data"
              childMapping="children"
              :treeColumnIndex="3"
              :allowPaging="true"
              :height="'auto'"
              :pageSettings="pageSettings"
              :allowSorting="true"
              :contextMenuClick="contextMenuClick"
              :dataSourceChanged="dataSourceChanged"
              :sortSettings="sortSettings"
              :toolbar="toolbar"
              :searchSettings="searchSettings"
              :toolbarClick="toolbarClick"
              :allowExcelExport="true"
              :allowPdfExport="true"
              :contextMenuItems="contextMenuItems"
              :contextMenuOpen="contextMenuOpen"
              :recordDoubleClick="recordDoubleClick"
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
                  field="ProjectName"
                  headerText="Project name"
                  :disableHtmlEncode="false"
                  :template="projectTemplate"
                  width="240"
                ></e-column>
                <e-column
                  field="JobName"
                  headerText="Task Name"
                  :disableHtmlEncode="false"
                  :template="jobNameTemplate"
                  width="240"
                ></e-column>
                <e-column field="From" headerText="From" :disableHtmlEncode="false" width="230"></e-column>
                <!-- <e-column
                  field="Description"
                  :template="templateDescripton"
                  headerText="Description"
                  width="180"
                  textAlign="Center"
                ></e-column>-->
                <e-column field="PIC" headerText="PIC" width="180" format="yMd" textAlign="Right"></e-column>
                <e-column field="DeputyName" headerText="Deputies" width="180" textAlign="Center"></e-column>
                <!-- <e-column field="Remark" :template="remarkTemplate" headerText="Remark" width="180" textAlign="Center"></e-column>
                -->
                <e-column field="DueDate" headerText="DueDate" width="160" textAlign="Center"></e-column>
                <e-column
                  field="state"
                  :disableHtmlEncode="false"
                  headerText="Status"
                  width="100"
                  textAlign="Center"
                ></e-column>
                <e-column field="EveryDay" headerText="Every Day" width="160" textAlign="Center"></e-column>
                <e-column field="Monthly" headerText="Monthly" width="160" textAlign="Center"></e-column>
                <e-column field="Quarterly" headerText="Quarterly" width="160" textAlign="Center"></e-column>
                <!-- <e-column field="Remark" headerText="Remark" width="180" textAlign="Center"></e-column> -->
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
                <!-- <e-column
                  field="Add Sub-Task"
                  :template="optionSubTaskTemplate"
                  headerText="Add Sub-Task"
                  width="150"
                  textAlign="Center"
                ></e-column>-->
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
                          id="routine-tabs-three-home-tab"
                          data-toggle="pill"
                          href="#routine-tabs"
                          role="tab"
                          aria-controls="routine-tabs"
                          aria-selected="true"
                        >Routine</a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          id="project-tabs-tab"
                          data-toggle="pill"
                          href="#project-tabs"
                          role="tab"
                          aria-controls="project-tabs"
                          aria-selected="false"
                        >Project</a>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <div class="tab-content" id="custom-tabs-three-tabContent">
                      <div
                        class="tab-pane fade active show"
                        id="routine-tabs"
                        role="tabpanel"
                        aria-labelledby="routine-tabs-tab"
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
                        id="project-tabs"
                        role="tabpanel"
                        aria-labelledby="project-tabs-tab"
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
                    v-model="dateDateTime"
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
    <div class="modal fade" id="modal-comment" aria-hidden="true" style="display: none;">
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
import Tree from "./Tree";
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

import VMdDateRangePicker from "v-md-date-range-picker";
Vue.use(VMdDateRangePicker);
export default {
  name: "todolist",
  components: {
    Multiselect,
    Datetime,
    Tree
  },
  data() {
    return {
      totalShow: 3,
      taskName: "",
      //-----------------datetime range
      selectedEveryday: "reset",
      selectedMonthly: "reset",
      selectedQuarterly: "reset",

      startDate: this.$common.dateNow("-"),
      endDate: this.$common.dateNow("-"),

      valueRange: [],
      //-----------------end datetime range
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
                        <button type="button" :class="!data.Follow ? 'btn btn-success btn-xs':'btn btn-danger btn-xs'" @click="addFollow(data)" v-if="data.Level == 1" ><i :class="!data.Follow ? 'fas fa-bell':'fas fa-bell-slash'"></i> {{!data.Follow?'Follow':'Unfollow'}}</button>
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
      // templateDescripton: function() {
      //   return {
      //     template: Vue.component("optionTemplate", {
      //       template: `<div id="templateDescripton" data-toggle="tooltip" data-placement="top" :title="data.Description">
      //                 {{data.Description}}
      //                 </div>`,
      //       data: function() {
      //         return {
      //           data: {}
      //         };
      //       },
      //       methods: {
      //         addSubscribe(data) {
      //           EventBus.$emit("follow", data);
      //         }
      //       }
      //     })
      //   };
      // },
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
      //  remarkTemplate: function() {
      //   return {
      //     template: Vue.component("remarkTemplate", {
      //       template: `<a id="remarkTemplate" data-toggle="tooltip" :title="data.Remark">
      //                 {{data.Remark}}
      //                 </a>`,
      //       data: function() {
      //         return {
      //           data: {}
      //         };
      //       },
      //       methods: {
      //         addSubscribe(data) {
      //           EventBus.$emit("follow", data);
      //         }
      //       }
      //     })
      //   };
      // },
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
        // {
        //   text: "Add Sub-Task",
        //   iconCss: " e-icons e-add",
        //   target: ".e-content",
        //   id: "Add-Sub-Task"
        // },
        // {
        //   text: "Add Remark",
        //   iconCss: " e-icons e-add",
        //   target: ".e-content",
        //   id: "Remark"
        // },
        {
          text: "Finish Task",
          iconCss: " e-icons e-add",
          target: ".e-content",
          id: "Done"
        }
        // {
        //   text: "Edit",
        //   iconCss: " e-icons e-edit",
        //   target: ".e-content",
        //   id: "EditTask"
        // },
        // {
        //   text: "Delete",
        //   iconCss: " e-icons e-delete",
        //   target: ".e-content",
        //   id: "DeleteTask"
        // }
      ],
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
      pageSettings: { pageSize: 50 },
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
      dateDateTime: "",
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
      whoSelected: [],
      start: "",
      end: "",
      comment: {
        content: "",
        taskid: 0,
        userid: Number(localStorage.getItem("UserID"))
      },
      dataComment: [],
      contentReply: ""
    };
  },
  mounted() {
    console.log("this.$refs.treegrid");
    console.log(this.$refs.treegrid);
    EventBus.$on("follow", this.addFollow);
    EventBus.$on("AddSub", this.AddSub);
    EventBus.$on("taskItem", this.infoEdit);
  },
  destroyed() {
    // Stop listening the event hello with handler
    EventBus.$off("taskItem", this.infoEdit);
    EventBus.$off("follow", this.addFollow);
    EventBus.$off("AddSub", this.AddSub);
  },
  created() {
    this.getProjects();
    this.getFrom();
    this.getUserForWho();
    this.getTasks();
    this.searchTreeGrid();
    this.who = localStorage.getItem("User");
  },
  computed: {},

  methods: {
    AddSub(data) {
      this.getAllComment(data);
    },
    isLoadComment(data) {
      this.getAllComment(data);
    },
    imageBase64CurrentUser() {
      if (localStorage.getItem("ImageProfile") == "null") {
        return "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEVsdX3////Hy86jqK1+ho2Ql521ur7a3N7s7e5YhiPTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==";
      } else {
        return "data:image/png;base64, " + localStorage.getItem("ImageProfile");
      }
    },
    imageBase64(img) {
      if (img == null) {
        return "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEVsdX3////Hy86jqK1+ho2Ql521ur7a3N7s7e5YhiPTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==";
      } else {
        return "data:image/png;base64, " + img;
      }
    },
    clearFormComment() {
      var self = this;
      self.comment = {
        content: "",
        taskid: 0,
        userid: Number(localStorage.getItem("UserID"))
      };
    },
    addComment() {
      let self = this;
      self.$api.post("api/Comments/Add", self.comment).then(res => {
        if (res.data) {
          self.dataComment = res.data;
          self.getAllComment(self.comment.taskid);
          self.$alertify.success("successfully!");
          self.comment.content = "";
        } else self.$alertify.error("Failed!");
      });
    },
    addSubComment(parentid, content) {
      let self = this;
      if (event.keyCode === 13) {
        let subComment = {
          content: content,
          taskid: self.comment.taskid,
          parentid: parentid,
          userid: Number(localStorage.getItem("UserID"))
        };
        self.$api.post("api/Comments/AddSub", subComment).then(res => {
          if (res.data) {
            self.getAllComment(self.comment.taskid);
            self.$alertify.success("successfully!");
          } else self.$alertify.error("Failed!");
        });
      }
    },
    getAllComment(taskid) {
      let self = this;

      let userid = Number(localStorage.getItem("UserID"));
      self.$api.get(`api/Comments/GetAll/${taskid}/${userid}`).then(res => {
        if (res.data) {
          console.log("Comments");
          console.log(res.data);
          self.dataComment = [];
          self.dataComment = res.data;
        }
      });
    },
    recordDoubleClick(args) {
      console.log("recordDoubleClick");
      console.log(args);
      let data = args.rowData;
      let self = this;
      self.clearFormComment();
      self.getAllComment(data.ID);
      self.taskName = data.JobName;
      self.comment.taskid = data.ID;
      $("#modal-comment").modal("show");
    },
    clearSearch() {
      this.selectedEveryday = "reset";
      this.selectedMonthly = "reset";
      this.selectedQuarterly = "reset";
      this.searchSettings = {
        hierarchyMode: "None",
        fields: ["JobName"],
        operator: "contains",
        key: "",
        ignoreCase: true
      };
      this.getTasks();
    },
    handleChange(values) {
      console.log(values);
      var self = this;
      self.valueRange = values;
      self.start = self.$common.dateFormat(values[0]);
      self.end = self.$common.dateFormat(values[1]);
      self.$api
        .get(`api/Tasks/GetListTreeTask/%20/%20/${self.start}/${self.end}/%20`)
        .then(res => {
          self.tasks = res.data;
          self.data = res.data;
          console.log(self.tasks);
        });
    },
    infoEdit(taskItem) {
      var self = this;
      self.getUser(taskItem.ProjectID);
      console.log("handler");
      console.log(taskItem);
      self.editStatus = false;
      self.clearForm();
      self.dateDateTime = "";

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
    sortAbnormal() {
      var self = this;
      self.$api.get(`api/Tasks/GetListTreeTask/abnormal`).then(res => {
        self.tasks = res.data;
        self.data = res.data;
        console.log(self.tasks);
      });
    },
    sortMonthly(month) {
      var self = this;
      self.$api
        .get(`api/Tasks/GetListTreeTask/%20/%20/%20/%20/%20/${month}`)
        .then(res => {
          self.tasks = res.data;
          self.data = res.data;
          console.log(self.tasks);
        });
    },
    sortQuarterly(quarter) {
      var self = this;
      self.$api
        .get(`api/Tasks/GetListTreeTask/%20/%20/%20/%20/%20/%20/${quarter}`)
        .then(res => {
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
          self.$alertify.warning("Please finish all sub-tasks!", true);
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
    contextMenuOpen(arg) {
      // console.log("contextMenuOpen");
      // console.log(arg);
      // debugger;
      // let self = this;
      // let currentUser = Number(localStorage.getItem("UserID"));
      // let createdBy = arg.rowInfo.rowData.CreatedBy || 0;
      // let beAssignedsTemp = arg.rowInfo.rowData.BeAssigneds || [];
      // let beAssigneds = beAssignedsTemp.map(
      //   (assign, index, beAssignedsTemp) => {
      //     return assign.ID;
      //   }
      // );
      // let deputiesListTemp = arg.rowInfo.rowData.DeputiesList || [];
      // let deputiesList = deputiesListTemp.map(
      //   (deputy, index, deputiesListTemp) => {
      //     return deputy.ID;
      //   }
      // );
      // console.log(createdBy);
      // if (createdBy == currentUser) {
      //   document
      //     .querySelectorAll("li#Done")[0]
      //     .setAttribute("style", "display: block;");
      //   // document
      //   //   .querySelectorAll("li#EditTask")[0]
      //   //   .setAttribute("style", "display: block;");
      //   // document
      //   //   .querySelectorAll("li#DeleteTask")[0]
      //   //   .setAttribute("style", "display: block;");
      // } else if (
      //   beAssigneds.includes(currentUser) ||
      //   deputiesList.includes(currentUser)
      // ) {
      //   document
      //     .querySelectorAll("li#Done")[0]
      //     .setAttribute("style", "display: block;");
      //   document
      //     .querySelectorAll("li#EditTask")[0]
      //     .setAttribute("style", "display: none;");
      //   document
      //     .querySelectorAll("li#DeleteTask")[0]
      //     .setAttribute("style", "display: none;");
      // } else {
      //   document
      //     .querySelectorAll("li#Done")[0]
      //     .setAttribute("style", "display: none;");
      //   document
      //     .querySelectorAll("li#EditTask")[0]
      //     .setAttribute("style", "display: none;");
      //   document
      //     .querySelectorAll("li#DeleteTask")[0]
      //     .setAttribute("style", "display: none;");
      // }
      // let deputies = arg.rowInfo.rowData.Deputies || [];
      // let beAssignedsTemp = arg.rowInfo.rowData.BeAssigneds || [];
      // let beAssigneds = beAssignedsTemp.map(
      //   (assign, index, beAssignedsTemp) => {
      //     return assign.ID;
      //   }
      // );
      //Neu khong fai la leader va level >= 3 thi chi hien 2 menu la done va remark
      //Neu la an add va nguoi nay la deputy cua task nay thi van cho full quyen
      // if (!self.IsHideAdd) {
      //   if (deputies.includes(currentUser)) {
      //     document
      //       .querySelectorAll("li#Add-Sub-Task")[0]
      //       .setAttribute("style", "display: none;");
      //     document
      //       .querySelectorAll("li#EditTask")[0]
      //       .setAttribute("style", "display: none;");
      //     document
      //       .querySelectorAll("li#DeleteTask")[0]
      //       .setAttribute("style", "display: none;");
      //   } else if (beAssigneds.includes(currentUser)) {
      //     document
      //       .querySelectorAll("li#Add-Sub-Task")[0]
      //       .setAttribute("style", "display: none;");
      //     document
      //       .querySelectorAll("li#EditTask")[0]
      //       .setAttribute("style", "display: none;");
      //     document
      //       .querySelectorAll("li#DeleteTask")[0]
      //       .setAttribute("style", "display: none;");
      //   } else {
      //     document
      //       .querySelectorAll("li#Add-Sub-Task")[0]
      //       .setAttribute("style", "display: none;");
      //     document
      //       .querySelectorAll("li#Remark")[0]
      //       .setAttribute("style", "display: none;");
      //     document
      //       .querySelectorAll("li#Done")[0]
      //       .setAttribute("style", "display: none;");
      //     document
      //       .querySelectorAll("li#EditTask")[0]
      //       .setAttribute("style", "display: none;");
      //     document
      //       .querySelectorAll("li#DeleteTask")[0]
      //       .setAttribute("style", "display: none;");
      //     self.$swal("Warning!", "You are not assign this task!!!", "warning");
      //   }
      // }
    },
    contextMenuClick: function(args) {
      var self = this;

      console.log(args);
      switch (args.item.id) {
        case "Add-Sub-Task":
          self.editStatus = false;
          self.clearForm();
          self.dateDateTime = "";
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
            priority: args.rowInfo.rowData.PriorityID,
            id: args.rowInfo.rowData.ID,
            pic: args.rowInfo.rowData.PIC || []
          };
          self.selected = args.rowInfo.rowData.BeAssigneds;
          self.dateDateTime = args.rowInfo.rowData.Deadline;

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
      self.dateDateTime = "";
      self.projectSelected = {};
      self.task = [];
      self.selected = [];
    },
    getTasks() {
      var self = this;

      self.$api
        .get(`api/Tasks/GetListTreeTask/%20/%20/%20/%20/%20`)
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
        priority: "M",
        pic: []
      };
      this.projectSelected = [];
      this.selected = [];
      this.dateDateTime = "";
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
    dateNow(ch = "/") {
      function pad(s) {
        return s < 10 ? "0" + s : s;
      }
      var date = new Date();
      var day = date.getDate(); // yields date
      var month = date.getMonth() + 1; // yields month (add one as '.getMonth()' is zero indexed)
      var year = date.getFullYear(); // yields year
      // var hour = date.getHours(); // yields hours
      // var minute = date.getMinutes(); // yields minutes
      // var second = date.getSeconds(); // yields seconds

      // After this construct a string with the above results as below
      var time = pad(month) + ch + pad(day) + ch + year; //+ " " + hour + ":" + minute + ":" + second;
      return time;
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
    "$route.path": function(name) {
      this.searchTreeGrid();
    },
    "$route.name": function(name) {
      this.searchTreeGrid();
    },
    task: function(newVal, oldVal) {
      console.log(newVal);
    },
    date: function(newVal, oldVal) {
      this.task.deadline = this.dateFormat(newVal);
    },
    selectedEveryday: function(newVal) {
      var self = this;
      self.$api
        .get(`api/Tasks/GetListTreeTask/%20/%20/%20/%20/${newVal}`)
        .then(res => {
          self.tasks = res.data;
          self.data = res.data;
          console.log(self.tasks);
        });
    },
    selectedMonthly: function(newVal) {
      var self = this;
      self.sortMonthly(newVal);
    },
    selectedQuarterly: function(newVal) {
      var self = this;
      self.sortQuarterly(newVal);
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
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
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

.comments-section {
  background: #fff;
}
.comment-area {
  background: none repeat scroll 0 0 #fff;
  border: medium none;
  -webkit-border-radius: 4px 4px 0 0;
  -moz-border-radius: 4px 4px 0 0;
  -ms-border-radius: 4px 4px 0 0;
  -o-border-radius: 4px 4px 0 0;
  border-radius: 4px 4px 0 0;
  color: #777777;
  float: left;
  font-family: Lato;
  font-size: 14px;
  height: 85px;
  letter-spacing: 0.3px;
  padding: 10px 20px;
  width: 100%;
  resize: vertical;
  outline: none;
  border: 1px solid #f2f2f2;
}
.comment-btn {
  float: right;
  background: #4caf50;
  margin: 5px 0;
  padding: 6px 15px;
  color: #fff;
  letter-spacing: 1.5px;
  outline: none;
  border-radius: 4px;
  box-shadow: none;
}
.comment-btn:hover,
.comment-btn:focus {
  background: #2e7d32;
  outline: none;
  border-radius: 4px;
  box-shadow: none;
}
.comment-box-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 5px 0px;
}
.comment-box {
  display: flex;
  width: 100%;
}
.comment-box a {
  color: #242475;
}
.commenter-image {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.comment-content {
  display: flex;
  flex-direction: column;
  background: #f2f3f5;
  margin-left: 5px;
  padding: 4px 20px;
  border-radius: 10px;
}

.commenter-head {
  display: block;
}

.commenter-head .commenter-name {
  font-size: 0.9rem;
  font-weight: 600;
}

.comment-date {
  font-size: 0.7rem;
}
.comment-date i {
  margin: 0 5px 0 10px;
}
.comment-body {
  padding: 0 0 0 5px;
  display: flex;
  font-size: 1rem;
  font-size: 0.8rem;
  font-weight: 400;
}
.comment-footer {
  font-size: 0.8rem;
  font-weight: 600;
}

.comment-footer span {
  margin: 0 15px 0 0;
}
.comment-footer span a {
  margin: 0 0px 0 2px;
}

.comment-footer span.comment-likes .active .fa-heart {
  color: black;
  font-size: 1rem;
}
.comment-footer span.comment-likes .active .fa-heart {
  color: red;
}

.nested-comments {
  margin-left: 50px;
}
</style>
