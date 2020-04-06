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
              <e-columns>
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
            <i class="fas fa-plus"></i>Add New Routine Task
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
                Routine Task {{title}}
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
                  :treeColumnIndex="2"
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
                  :editSettings="editSettings"
                  :contextMenuOpen="contextMenuOpen"
                  :rowSelected="rowSelected"
                  :recordDoubleClick="recordDoubleClick"
                  :allowResizing="true"
                  :showColumnMenu="true"
                  :gridLines="'Both'"
                >
                  <e-columns>
                    <e-column
                      field="Follow"
                      :template="optionFollowTemplate"
                      headerText="Follow"
                      width="85"
                      textAlign="Center"
                    ></e-column>
                    <e-column
                      field="Priority"
                      :template="priorityTemplate"
                      headerText="Priority"
                      width="90"
                      textAlign="Center"
                    ></e-column>
                    <!-- <e-column field="Level" headerText="Level" width="150" textAlign="Center"></e-column> -->
                    <!-- <e-column
                      field="Add Sub-Task"
                      :template="optionSubTaskTemplate"
                      headerText="Add Sub-Task"
                      width="150"
                      v-if="IsHideAdd"
                      textAlign="Center"
                    ></e-column>-->
                    <e-column
                      field="JobName"
                      headerText="Task Name"
                      :disableHtmlEncode="false"
                      :template="jobNameTemplate"
                      textAlign="Left"
                      width="240"
                    ></e-column>
                    <e-column field="From" headerText="From" :disableHtmlEncode="false" width="120"></e-column>
                    <e-column
                      field="PIC"
                      headerText="PIC"
                      width="180"
                      format="yMd"
                      textAlign="Center"
                    ></e-column>
                    <e-column
                      field="state"
                      :disableHtmlEncode="false"
                      headerText="Status"
                      width="120"
                      textAlign="Center"
                    ></e-column>
                    <e-column
                      field="DueDateDaily"
                      headerText="Daily"
                      width="160"
                      textAlign="Center"
                    ></e-column>
                    <e-column
                      field="SpecificDate"
                      headerText="Due Date"
                      width="200"
                      textAlign="Center"
                    ></e-column>
                    <e-column
                      field="DueDateWeekly"
                      headerText="Weekly"
                      width="160"
                      textAlign="Center"
                    ></e-column>
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
                    <e-column
                      field="DueDateYearly"
                      headerText="Yearly"
                      width="160"
                      textAlign="Center"
                    ></e-column>

                    <e-column
                      field="CreatedDateForEachTask"
                      headerText="Created Date"
                      width="200"
                      textAlign="Center"
                    ></e-column>
                    <e-column
                      field="Watch Video"
                      :template="optionWatchVideoTemplate"
                      headerText="Watch Video"
                      width="150"
                      textAlign="Center"
                    ></e-column>
                  </e-columns>
                </ejs-treegrid>
              </div>
              <div v-else>
                <p
                  class="text-danger text-center"
                >* Note: Please click on a department to display list routine task</p>
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
              <div class="col-md-9">
                <div class="form-group">
                  <label for="JobType">Routine Name</label>
                  <small v-if="!editStatus" class="text-danger">(*) Require</small>
                  <input
                    type="text"
                    id="JobType"
                    v-model="task.jobName"
                    class="form-control JobType"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label for>From</label>
                  <small v-if="!editStatus" class="text-danger">(*) Default is yourself!</small>
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
              <div class="col-md-12 d-none">
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
                    :searchable="true"
                    :multiple="true"
                    :taggable="true"
                    @tag="addTag"
                    @select="onSelectTask"
                  ></multiselect>
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
                  :searchable="true"
                  :multiple="true"
                  :taggable="true"
                ></multiselect>
              </div>
              <div class="col-md-6 d-none">
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
                      <small v-if="!editStatus" class="text-danger">(*) Require</small>
                      <select id="Period" v-model="selectedPeriodMain" class="form-control">
                        <option value="reset">Choose period</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Yearly">Yearly</option>
                        <!-- <option value="SpecificDay">Specific Day</option> -->
                      </select>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group box SpecificDay">
                      <label for="Description">Specific Day</label>
                      <small v-if="!editStatus" class="text-danger">(*) Require</small>
                      <datetime
                        ref="deadline"
                        v-model="task.specificdate"
                        input-class="form-control"
                        placeholder="Select date"
                        type="date"
                      ></datetime>
                    </div>
                  </div>
                  <!-- Daily -->
                  <div class="col-md-12 d-none" style="cursor: not-allowed;">
                    <div class="form-group disabled box Daily">
                      <label for="Daily">Daily</label>
                      <small v-if="!editStatus" class="text-danger"></small>
                      <datetime
                        ref="daily"
                        v-model="task.duedatedaily"
                        input-class="form-control"
                        placeholder="Select date"
                        type="date"
                      ></datetime>
                    </div>
                  </div>
                  <!-- ----Daily -->
                  <!-- Weekly -->
                  <div class="col-md-2">
                    <div class="form-group box Weekly">
                      <label for="Weekly">Weekdays</label>
                      <small v-if="!editStatus" class="text-danger">(*) Require</small>
                      <select class="form-control" @change="getWeekly" v-model="weeklySelected">
                        <option disabled value>Please select one</option>
                        <option v-for="(day,index) in weekday" :value="day.substring(0,3)">{{day}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group box Weekly">
                      <label for="Weekly">Month</label>
                      <small v-if="!editStatus" class="text-danger">(*) Require</small>
                      <select class="form-control" v-model="monthOfWeeklySelected">
                        <option disabled value="0">Please select one</option>
                        <option v-for="n in 12" :value="n">{{n}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group box Weekly">
                      <label for="Weekly">Effective date</label>
                      <small v-if="!editStatus" class="text-danger">(*) Require</small>
                      <select class="form-control" v-model="task.dateofweekly">
                        <option disabled value>Please select one</option>
                        <option v-for="(day,index) in weekdaysOfMonth" :value="day">{{day}}</option>
                      </select>
                    </div>
                  </div>

                  <!-- ---Weekly -->
                  <!-- Monthly -->
                  <div class="col-md-12">
                    <div class="form-group box Monthly">
                      <label for="Day">Dates Of Month</label>
                      <small v-if="!editStatus" class="text-danger">(*) Require</small>
                      <select class="form-control" v-model="task.duedatemonthly">
                        <option disabled value>Please select one</option>
                        <option v-for="n in 31" :value="n">{{$common.getDatesOfMonth(n)}}</option>
                      </select>
                    </div>
                  </div>
                  <!-- --Monthly -->
                  <!-- Quarterly -->
                  <div class="col-md-6">
                    <div class="form-group box Quarterly">
                      <label for="Description">Quarterly</label>
                      <small v-if="!editStatus" class="text-danger">(*) Require</small>
                      <span
                        class="text-danger"
                      >*)Note: From {{quarterRange.firstDate}} to {{quarterRange.lastDate}}</span>
                      <select class="form-control" v-model="quarterlySelected">
                        <option disabled value>Please select one</option>
                        <option
                          v-for="(quarter,index) in quarterly"
                          :value="quarter.substring(0,3)"
                        >{{quarter}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group box Quarterly">
                      <label for="Description">Date</label>
                      <small v-if="!editStatus" class="text-danger">(*) Require</small>
                      <datetime
                        ref="deadline-quarterly"
                        v-model="quarterlySelectedDate"
                        input-class="form-control"
                        placeholder="Select date"
                        type="date"
                      ></datetime>
                    </div>
                  </div>
                  <!-- ---Quarterly -->
                  <!-- Yearly -->
                  <div class="col-md-12">
                    <div class="form-group disabled box Yearly">
                      <label for="Yearly">Date</label>
                      <small v-if="!editStatus" class="text-danger"></small>
                      <datetime
                        ref="daily"
                        v-model="task.duedateyearly"
                        input-class="form-control"
                        placeholder="Select date"
                        type="date"
                      ></datetime>
                    </div>
                  </div>
                  <!-- ---Yearly -->
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
    <!-- Modal Comment -->
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
    <!-- End Modal Comment -->
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

    <!-- modal-tutorial -->
    <div class="modal fade" id="modal-tutorial" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              <i class="fas fa-plus"></i>
              {{titleTutorial}}
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
                  <input type="text" v-model="tutorial.name" class="form-control Name" />
                </div>
              </div>

              <div class="col-md">
                <div class="form-group">
                  <label for="Link">Link Toturial</label>
                  <input type="file" id="Link" class="form-control Link" />
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label for="Link">Link Path</label>
                  <input type="text" v-model="tutorial.path" class="form-control Path" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addOrUpdateTutorial">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->
    <!-- Modal watch video -->
    <div
      class="modal fade"
      id="modal-watch-video"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{titleTutorialVideo}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="embed-responsive embed-responsive-16by9">
              <iframe
                class="embed-responsive-item"
                :src="srcTutorial"
                id="video"
                width="960"
                height="540"
                allowscriptaccess="always"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Multiselect from "vue-multiselect";
import { Datetime } from "vue-datetime";
import EventBus from "../../../EventBus";
import Tree from "../../shares/comment/Tree";
import CommentMixin from "../../../mixin/comment";
import Tutorial from "../../../mixin/tutorial";

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
  Toolbar,
  RowDD,
  Resize,
  ColumnMenu
} from "@syncfusion/ej2-vue-treegrid";
Vue.use(TreeGridPlugin);
// register globally
Vue.component("multiselect", Multiselect);
export default {
  name: "routine-job",
  mixins: [CommentMixin, Tutorial],
  components: {
    Multiselect,
    Datetime,
    Tree,
    Link: null
  },
  data() {
    return {
      monthOfWeeklySelected: 0,
      weekdaysOfMonth: [],
      quarterRange: [],
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
      pageSettingsLeft: { pageSize: 20 },
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
      optionWatchVideoTemplate: function() {
        return {
          template: Vue.component("optionWatchTemplate", {
            template: `<div id="optionWatchTemplate">
                    <div class="btn-group">
                        <a v-if="data.VideoStatus" @click="watchvideo" class="btn btn-success btn-sm" style="cursor:pointer ; color: white"  >Watch Video</a>
                        </div>
                    </div>`,
            data: function() {
              return {
                data: {}
              };
            },
            methods: {
              watchvideo() {
                let self = this;
                $("#modal-watch-video").modal("show");
                //self.title = self.data.title;
                //console.log(self.title);
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
                        <button type="button" :class="data.Follow =='No' ? 'btn btn-success btn-xs':'btn btn-danger btn-xs'" @click="addFollow(data)" v-if="data.Level == 1" ><i :class="data.Follow == 'No'  ? 'fas fa-bell':'fas fa-bell-slash'"></i> {{data.Follow == 'No' ?'Follow':'Unfollow'}}</button>
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
          text: "Add Tutorial Video",
          iconCss: " e-icons e-add",
          target: ".e-content",
          id: "Tutorial"
        },
        {
          text: "Watch Video",
          iconCss: " e-icons e-add",
          target: ".e-content",
          id: "WatchVideo"
        },
        {
          text: "Edit Tutorial",
          iconCss: " e-icons e-edit",
          target: ".e-content",
          id: "EditTutorial"
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
      pageSettings: { pageSizes: true, pageSize: 20 },
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
          // { field: "CreatedDate", direction: "Ascending" },
          // { field: "CreatedDate", direction: "Ascending" },
          // { field: "JobName", direction: "Ascending" }
        ]
      },
      PERIODTYPE: [
        "Daily",
        "Weekly",
        "Monthly",
        "Quarterly",
        "Yearly",
        "SpecificDay"
      ],
      weekday: [
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
      dateOfMonthly: 0,
      weeklySelected: "",
      monthlySelected: "",
      quarterlySelected: "",
      quarterlySelectedDate: "",
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
        duedatedaily: "",
        duedateweekly: "",
        duedatemonthly: "",
        duedatequarterly: "",
        duedateyearly: "",
        specificdate: "",
        dateofweekly: "",
        status: false,
        fromWhoID: 0,
        priority: "M",
        weekly: "",
        monthly: "",
        quarterly: "",
        pic: [],
        JobTypeID: 2
      },
      PICs: [],
      projectOptions: [],
      projectSelected: [],
      whoOptions: [],
      whoSelected: [],
      selectedPeriod: "",
      selectedPeriodMain: "Daily",
      deputies: [],
      selectedDeputies: [],
      showListTask: false,
      IsHideAdd: true
    };
  },
  mounted() {
    let self = this;
    console.log(this.$refs.treegrid);
    EventBus.$on("follow", this.addFollow);
    EventBus.$on("taskItem", this.infoEdit);
    $(this.$refs.modalComment).on("hidden.bs.modal", () => {
      this.clearForm();
    });
    $(document).ready(function() {
      $("#Period")
        .change(function() {
          $(this)
            .find("option:selected")
            .each(function() {
              var optionValue = $(this).attr("value");
              switch (optionValue) {
                case self.PERIODTYPE[0]: //daily
                  self.task.periodType = 1;
                  self.task.duedatedaily = new Date().toISOString();
                  break;
                case self.PERIODTYPE[1]: //weekly
                  self.task.periodType = 2;
                  break;
                case self.PERIODTYPE[2]: //monthly
                  self.task.periodType = 3;
                  break;
                case self.PERIODTYPE[3]: //quarterly
                  self.task.periodType = 4;
                  break;
                case self.PERIODTYPE[4]: //yearly
                  self.task.periodType = 5;
                  break;
                case self.PERIODTYPE[5]: //specific day
                  self.task.periodType = 6;
                  break;
              }
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
    getWeekdaysOfMonth(newVal) {
      let indexof = this.weekday
        .map(item => {
          return item.substring(0, 3);
        })
        .indexOf(this.weeklySelected);
      switch (indexof) {
        case 0:
          this.weekdaysOfMonth = this.$common.getMondaysInMonth(newVal);
          break;
        case 1:
          this.weekdaysOfMonth = this.$common.getWednesdaysInMonth(newVal);
          break;
        case 2:
          this.weekdaysOfMonth = this.$common.getTuesdaysInMonth(newVal);
          break;
        case 3:
          this.weekdaysOfMonth = this.$common.getThursdaysInMonth(newVal);
          break;
        case 4:
          this.weekdaysOfMonth = this.$common.getFridaysInMonth(newVal);
          break;
        case 5:
          this.weekdaysOfMonth = this.$common.getSaturdaysInMonth(newVal);
          break;
      }
    },
    //-------------------Begin Comment
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
    //-------------------End Comment
    checkRole() {
      let userLevel = Number(localStorage.getItem("Level"));
      //Neu user co level la 3 va khong fai la leader thi se
      if (userLevel >= 3 && !this.IsLeader) {
        this.editSettings.allowAdding = false;
        this.IsHideAdd = false;
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
        console.log("getOCs: ", self.dataLeft);
      });
    },
    contextMenuOpen(arg) {
      console.log("contextMenuOpen");
      console.log(arg);
      console.log(document.querySelectorAll("li#Add-Sub-Task"));

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
      if (arg.rowInfo.rowData.VideoStatus) {
        document
          .querySelectorAll("li#WatchVideo")[0]
          .setAttribute("style", "display: block;");
        document
          .querySelectorAll("li#EditTutorial")[0]
          .setAttribute("style", "display: block;");
      } else {
        document
          .querySelectorAll("li#WatchVideo")[0]
          .setAttribute("style", "display: none;");
        document
          .querySelectorAll("li#EditTutorial")[0]
          .setAttribute("style", "display: none;");
      }
      if (!self.IsHideAdd) {
        if (deputies.includes(currentUser)) {
          document
            .querySelectorAll("li#Add-Sub-Task")[0]
            .setAttribute("style", "display: none;");
          document
            .querySelectorAll("li#EditTask")[0]
            .setAttribute("style", "display: none;");

          document
            .querySelectorAll("li#DeleteTask")[0]
            .setAttribute("style", "display: none;");
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
          document
            .querySelectorAll("li#Add-Sub-Task")[0]
            .setAttribute("style", "display: none;");
          document
            .querySelectorAll("li#Done")[0]
            .setAttribute("style", "display: none;");
          document
            .querySelectorAll("li#EditTask")[0]
            .setAttribute("style", "display: none;");
          document
            .querySelectorAll("li#DeleteTask")[0]
            .setAttribute("style", "display: none;");
          self.$swal("Warning!", "You are not assign this task!!!", "warning");
        }
      }
    },
    rowSelected(args) {
      console.log(args);
      var self = this;
      if (args.data.VideoStatus) {
        self.srcTutorial = args.data.Tutorial.URL;
        self.titleTutorialVideo = args.data.Tutorial.Name;
        self.tutorial = {
          id: args.data.Tutorial.ID,
          name: args.data.Tutorial.Name,
          url: args.data.Tutorial.URL,
          path: args.data.Tutorial.Path,
          taskid: args.data.ID
        };
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
        .get(`api/Tasks/GetListTreeRoutine/${self.ocid}/project`)
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
        .get(`api/Tasks/GetListTreeRoutine/${self.ocid}/routine`)
        .then(res => {
          self.tasks = res.data;
          self.data = res.data;
          console.log(self.tasks);
        });
    },
    sortHigh() {
      var self = this;
      self.$api
        .get(`api/Tasks/GetListTreeRoutine/${self.ocid}/H/%20`)
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
        .get(`api/Tasks/GetListTreeRoutine/${self.ocid}/M/%20`)
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
        .get(`api/Tasks/GetListTreeRoutine/${self.ocid}/L/%20`)
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
    valid() {
      let self = this;
      if (self.task.jobName === "") {
        self.$swal("Warning!", "Please enter the job name!", "warning");
        return false;
      }
      if (self.selectedPeriodMain === "reset") {
        self.$swal("Warning!", "Please select on preiod!", "warning");
        return false;
      } else {
        switch (self.selectedPeriodMain) {
          case self.PERIODTYPE[0]: //daily
            self.task.periodType = 1;
            self.task.duedatedaily = new Date().toISOString();
            if (self.task.duedatedaily === "") {
              self.$swal("Warning!", "Please select on daily!", "warning");
              return false;
            }
            break;
          case self.PERIODTYPE[1]: //weekly
            if (self.task.duedateweekly === "") {
              self.$swal("Warning!", "Please select on weekly!", "warning");
              return false;
            } else if (self.monthOfWeeklySelected === 0) {
              self.$swal(
                "Warning!",
                "Please select on month of weekly!",
                "warning"
              );
              return false;
            } else if (self.task.dateofweekly === "") {
              self.$swal(
                "Warning!",
                "Please select on effective date!",
                "warning"
              );
              return false;
            }
            break;
          case self.PERIODTYPE[2]: //monthly
            if (self.task.duedatemonthly === "") {
              self.$swal("Warning!", "Please select on monthly!", "warning");
              return false;
            }
            break;
          case self.PERIODTYPE[3]: //quarterly
            if (self.task.duedatequarterly === "") {
              self.$swal("Warning!", "Please select on quarterly!", "warning");
              return false;
            } else {
              let bo = self.$common.checkQuarterly(
                self.quarterlySelected,
                self.quarterlySelectedDate
              );
              if (!bo.status) {
                let alert = `<br> (The ${bo.quarter}: From ${self.quarterRange.firstDate} to ${self.quarterRange.lastDate} )`;
                self.$swal(
                  "Warning!",
                  `There is no this date in the ${bo.quarter}. Please try it again! ${alert}`,
                  "warning"
                );
                return false;
              }
            }
            break;
          case self.PERIODTYPE[4]: //yearly
            if (self.task.duedateyearly === "") {
              self.$swal("Warning!", "Please select on yearly!", "warning");
              return false;
            }
            break;
          case self.PERIODTYPE[5]: //specific day
            if (self.task.specificdate === "") {
              self.$swal(
                "Warning!",
                "Please select on specific date!",
                "warning"
              );
              return false;
            }
            break;
        }
      }
      return true;
    },
    delete(id) {
      var self = this;
      self.$api.delete("api/Tasks/Delete/" + id).then(res => {
        if (res.data) {
          self.dataSourceChanged();
          self.$swal("Success !", "Delete", "success");
        } else {
          self.$swal("Warning !", "You don't create this task!", "warning");
        }
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

          self.whoSelected = args.rowInfo.rowData.FromWho;
          self.PICs = args.rowInfo.rowData.PICs || [];
          self.selected = args.rowInfo.rowData.BeAssigneds;
          self.projectSelected = {
            ID: args.rowInfo.rowData.ProjectID,
            Name: args.rowInfo.rowData.ProjectName
          };

          self.task = {
            description: args.rowInfo.rowData.Description,
            jobName: args.rowInfo.rowData.JobName,
            duedatedaily: args.rowInfo.rowData.DueDateDaily,
            duedateweekly: args.rowInfo.rowData.DueDateWeekly,
            duedatemonthly: args.rowInfo.rowData.DueDateMonthly,
            duedatequarterly: args.rowInfo.rowData.DueDateQuarterly,
            duedateyearly: args.rowInfo.rowData.DueDateYearly,
            specificdate: args.rowInfo.rowData.SpecificDate,
            priority: args.rowInfo.rowData.PriorityID,
            id: args.rowInfo.rowData.ID,
            dateofweekly: args.rowInfo.rowData.DateOfWeekly,
            level: args.rowInfo.rowData.Level,
            periodType: args.rowInfo.rowData.periodType,
            pic: args.rowInfo.rowData.PIC || []
          };

          let daily = args.rowInfo.rowData.DueDateDaily;
          let weekly = args.rowInfo.rowData.DueDateWeekly;
          let monthly = args.rowInfo.rowData.DueDateMonthly;
          let quarterly = args.rowInfo.rowData.DueDateQuarterly;
          let yearly = args.rowInfo.rowData.DueDateYearly;
          let specific = args.rowInfo.rowData.SpecificDate;

          let periodType = args.rowInfo.rowData.periodType;
          switch (periodType) {
            case 1:
              self.selectedPeriodMain = "Daily";
              self.task.duedatedaily = daily;
              break;
            case 2:
              self.selectedPeriodMain = "Weekly";
              self.weeklySelected = weekly.substring(0, 3);
              self.monthOfWeeklySelected =
                new Date(args.rowInfo.rowData.DateOfWeekly).getMonth() + 1;
              self.task.dateofweekly = args.rowInfo.rowData.DateOfWeekly;
              break;
            case 3:
              self.selectedPeriodMain = "Monthly";
              self.task.duedatemonthly = monthly.substring(0, 1);
              break;
            case 4:
              self.selectedPeriodMain = "Quarterly";
              let quater = quarterly.split(",");
              self.quarterlySelected = quater[0].substring(0, 3);
              let year = new Date().getFullYear();
              let stringDate = quater[1] + ", " + year;
              self.quarterlySelectedDate = new Date(stringDate).toISOString();
              self.task.duedatequarterly = quarterly;
              break;
            case 5:
              self.selectedPeriodMain = "Yearly";
              self.task.duedateyearly = new Date(
                yearly + " 00:00 PM"
              ).toISOString();
              break;
            case 6:
              self.selectedPeriodMain = "SpecificDay";
              self.task.specificdate = new Date(
                specific + " 00:00 PM"
              ).toISOString();
              break;
          }

          // if (weekly != "#N/A" && weekly != "") {
          //   self.selectedPeriodMain = "Weekly";
          //   self.selectedPeriod = weekly.substring(0, 3);
          // } else if (monthly !== "#N/A" && monthly !== "") {
          //   self.selectedPeriodMain = "Monthly";
          //   self.task.monthly = monthly.substring(0, 3);
          // } else if (quarterly !== "#N/A" && quarterly !== "") {
          //   self.selectedPeriodMain = "Quarterly";
          //   self.task.quarterly = quarterly.substring(0, 3);
          // } else if (deadline !== "#N/A" && deadline !== "") {
          //   self.selectedPeriodMain = "SpecificDay";
          //   self.task.deadline = args.rowInfo.rowData.Deadline;
          // }
          break;
        case "Tutorial":
          self.titleTutorial =
            args.rowInfo.rowData.JobName + " - Add Tutorial Video";
          self.tutorial = {
            id: 0,
            name: args.rowInfo.rowData.JobName,
            url: "",
            path: "",
            level: 0,
            parentid: 0,
            taskid: args.rowInfo.rowData.ID
          };
          $("#modal-tutorial").modal("show");
          break;
        case "EditTutorial":
          self.titleTutorial =
            args.rowInfo.rowData.JobName + " - Edit Tutorial Video";
          self.isAddTutorial = false;
          self.tutorial = {
            id: 0,
            name: args.rowInfo.rowData.JobName,
            url: "",
            path: "",
            level: 0,
            parentid: 0,
            taskid: args.rowInfo.rowData.ID
          };
          $("#modal-tutorial").modal("show");
          break;
        case "WatchVideo":
          $("#modal-watch-video").modal("show");
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

    getTasks() {
      var self = this;
      self.$api.get(`api/Tasks/GetListTreeRoutine/${self.ocid}`).then(res => {
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
    getWeekly(event) {
      let indexof = this.weekday
        .map(item => {
          return item.substring(0, 3);
        })
        .indexOf(event.target.value);
      this.task.duedateweekly = `${this.weekday[indexof]}`;
    },
    //binding task.monthly
    getDateInMonth(event) {
      let arr = [];
      for (const item of this.monthly) {
        arr.push(item.substring(0, 3));
      }
      let indexOfMonthly = arr.indexOf(event.target.value);
      if (indexOfMonthly > -1) {
        this.dateInMonth = new Date(
          new Date().getFullYear(),
          indexOfMonthly + 1,
          0
        ).getDate();
      }
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
        duedatedaily: "",
        duedateweekly: "",
        duedatemonthly: "",
        duedatequarterly: "",
        duedateyearly: "",
        specificdate: "",
        dateofweekly: "",
        status: false,
        level: 0,
        fromWhoID: 0,
        weekly: "",
        monthly: "",
        quarterly: "",
        OCID: this.ocid,
        priority: "M",
        pic: [],
        JobTypeID: 2,
        deputies: []
      };
      this.weeklySelected = "";
      this.monthOfWeeklySelected = 0;
      this.dateOfMonthly = 0;
      this.PICs = [];
      this.selectedPeriodMain = "Daily";
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
        var check = self.valid();
        if (check) {
          self.task.fromWhoID = self.whoSelected.ID;
          self.$api.post("api/Tasks/CreateSubTask", self.task).then(res => {
            if (res.data) {
              self.clearForm();
              $("#modal-task").modal("hide");
              self.dataSourceChanged();
              self.$alertify.success("Add Sub-Tasks successfully!");
            } else {
              self.$swal("Error!", "Add Sub-Tasks failed!", "error");
            }
            console.log(res);
          });
        }
      } else {
        var check = self.valid();
        if (check) {
          if (self.task.id > 0) {
            if (self.task.pic.length > 0 && self.task.level > 1) {
              let flag = false;
              for (let i of self.task.pic) {
                if (self.PICs.includes(i)) {
                  flag = true;
                  break;
                }
              }
              if (!flag) {
                self.$alertify.warning(
                  "You should add the pic for main task!",
                  true
                );
                return;
              }
            }
          }
          self.task.fromWhoID = self.whoSelected.ID;
          self.$api.post("api/Tasks/CreateTask", self.task).then(res => {
            if (res.data) {
              self.clearForm();
              $("#modal-task").modal("hide");
              self.dataSourceChanged();
              self.$alertify.success("Add Tasks successfully!");
            } else {
              self.$swal("Error!", "Add Tasks failed!", "error");
            }

            console.log(res);
          });
        }
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
    quarterlySelected: function(newVal) {
      let arr = this.quarterly.map(item => {
        return item.substring(0, 3);
      });
      let indexof = arr.indexOf(newVal);
      this.quarterRange = this.$common.getFirstDateLastDateQuarter(indexof + 1);
    },
    whoSelected: function(newVal, oldVal) {
      var self = this;
      let who = newVal;
      self.task.fromWhoID = who.ID;
    },
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
      this.task.weekly = newVal;
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
    },
    quarterlySelectedDate: function(newVal) {
      let arr = this.quarterly.map(item => {
        return item.substring(0, 3);
      });
      let indexof = arr.indexOf(this.quarterlySelected);
      this.task.duedatequarterly = `${
        this.quarterly[indexof]
      }, ${this.$common.toFormatDate(this.quarterlySelectedDate, false)}`;
    },
    weeklySelected(newVal) {
      let self = this;
      let indexof = self.weekday
        .map(item => {
          return item.substring(0, 3);
        })
        .indexOf(newVal);
      if (self.monthOfWeeklySelected > 0) {
        self.getWeekdaysOfMonth(self.monthOfWeeklySelected);
      }
      self.task.duedateweekly = `${self.weekday[indexof]}`;
    },
    monthOfWeeklySelected(newVal) {
      this.getWeekdaysOfMonth(newVal);
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
      Toolbar,
      RowDD,
      Resize,
      ColumnMenu
    ]
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.e-headertext {
  font-size: 12px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.74);
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
<style>
.e-headertext {
  font-size: 12px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.74);
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
