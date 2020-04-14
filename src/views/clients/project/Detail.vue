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
                >(*) Note: Please click on project manager or team member to edit or add it.</small>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <h4>Project Task</h4>
                <!-- <div class="col-md-12 pb-4">
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
                </div>-->
                <!-- <div class="col-md-12">
                  <h5>Sort:</h5>
                </div>-->
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
                  <button type="button" @click="all" class="btn bg-gradient-secondary btn-sm">
                    <i class="fas fa-sync-alt"></i> All
                  </button>
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
                
                  <a href="#/client-chat" class="btn bg-gradient-secondary btn-sm">
                    <i class="fas fa-comment-dots"></i> Chat Room
                  </a>
                  <a @click="urlTutorial()" class="btn bg-gradient-secondary btn-sm text-white">
                    <i class="fas fa-video"></i> Tutorial
                  </a>
                </div>
                <ejs-treegrid
                  ref="treegrid"
                  :dataSource="data"
                  childMapping="children"
                  :treeColumnIndex="2"
                  :allowPaging="true"
                  :showColumnMenu="true"
                  :allowRowDragAndDrop="true"
                  :height="'auto'"
                  :pageSettings="pageSettings"
                  :allowSorting="true"
                  :contextMenuItems="contextMenuItems"
                  :contextMenuClick="contextMenuClick"
                  :dataSourceChanged="dataSourceChanged"
                  :toolbar="toolbar"
                  :searchSettings="searchSettings"
                  :toolbarClick="toolbarClick"
                  :allowExcelExport="true"
                  :allowPdfExport="true"
                  :allowResizing="true"
                  :rowDrop="rowDrop"
                  :recordDoubleClick="recordDoubleClick"
                  :editSettings="editSettings"
                  :gridLines="'Both'"
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
                    <!-- <e-column
                      field="Add Sub-Task"
                      :template="optionSubTaskTemplate"
                      headerText="Add Sub-Task"
                      width="140"
                      v-if="isHideAdd"
                      textAlign="Center"
                    ></e-column>-->
                    <e-column
                      field="JobName"
                      headerText="Task Name"
                      :disableHtmlEncode="false"
                      :template="jobNameTemplate"
                      textAlign="Center"
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
                      :disableHtmlEncode="true"
                      headerText="Status"
                      :template="statusTemplate"
                      width="120"
                      textAlign="Center"
                    >
                    </e-column>
                    <e-column
                      field="SpecificDate"
                      headerText="Due Date"
                      width="200"
                      textAlign="Center"
                    ></e-column>
                      <e-column
                    field="ModifyDateTime"
                    headerText="Modify DateTime"
                    width="200"
                    textAlign="Center"
                  ></e-column>
                    <e-column
                      field="CreatedDateForEachTask"
                      headerText="Created Date"
                      width="200"
                      textAlign="Center"
                    ></e-column>
                    <e-column
                      field="DueDateDaily"
                      headerText="Daily"
                      width="160"
                      textAlign="Center"
                    ></e-column>
                    <e-column
                      field="DueDateWeekly"
                      headerText="Weekly"
                      width="160"
                      textAlign="Center"
                    ></e-column>
                    <!-- <e-column
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
                    ></e-column>-->
                    <e-column
                      field="DueDateYearly"
                      headerText="Yearly"
                      width="160"
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
    <div class="modal fade" id="modal-all-comment" aria-hidden="true" style="display: none;">
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
              <div class="col-md-8">
                <div class="form-group">
                  <label for="JobType">Task Name</label>
                  <small v-if="!editStatus" class="text-danger">(*) Require</small>
                  <input
                    type="text"
                    id="JobType"
                    v-model="task.jobName"
                    class="form-control JobType"
                  />
                </div>
              </div>
              <div class="col-md-4">
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
                  ></multiselect>
                </div>
              </div>
              <div class="col-md-12 d-none">
                <div class="form-group">
                  <label for="Description">Description</label>
                  <textarea type="text" id="Description" class="form-control Description" />
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
                          ></multiselect>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /.card -->
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
                        <!-- <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>-->
                        <option value="Yearly">Yearly</option>
                        <option value="SpecificDate">Due Date</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group box SpecificDate">
                      <label for="Description">Date</label>
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
                  <div class="col-md-3">
                    <div class="form-group box SpecificDate">
                      <label for="Description">Time</label>
                      <small v-if="!editStatus" class="text-danger">(*) Require</small>
                      <datetime
                        ref="time"
                        v-model="time"
                        input-class="form-control"
                        placeholder="Select time"
                        type="time"
                        value-zone="local"
                        use12-hour
                        zone="local"
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
                      <span
                        class="text-danger"
                      >*)Note: From {{quarterRange.firstDate}} to {{quarterRange.lastDate}}</span>
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

              <div class="col-md-6">
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
import { Settings, DateTime } from "luxon";

import {
  TreeGridPlugin,
  ContextMenu,
  Sort,
  ExcelExport,
  PdfExport,
  Page,
  RowDD,
  ColumnMenu,
  Resize,
  Filter,
  CommandColumn,
  TreeGridComponent,
  Toolbar
} from "@syncfusion/ej2-vue-treegrid";
import CommentMixin from "../../../mixin/comment";
import Tree from "../../shares/comment/Tree";

Vue.use(TreeGridPlugin);
export default {
  name: "project-detail",
  mixins: [CommentMixin],
  components: {
    Multiselect,
    Datetime,
    Tree
  },
  data() {
    return {
      // local:DateTime.local().locale,
      selectedPeriod: "",
      quarterRange: [],
      searchSettings: { hierarchyMode: "Parent" },
      statusTemplate: function() {
        return {
          template: Vue.component("status", {
            template: `<span :class="data.state !== 'Undone' ? 'badge bg-success' : 'badge bg-danger'">{{data.state}}</span>`,
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
                        <button type="button" :class="data.Follow == 'No' ? 'btn btn-success btn-xs':'btn btn-danger btn-xs'" @click="addFollow(data)" v-if="data.Level == 1" ><i :class="data.Follow == 'No'  ? 'fas fa-bell':'fas fa-bell-slash'"></i> {{data.Follow == 'No' ?'Follow':'Unfollow'}}</button>
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
      modalTitle: "Add New Project Task",
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
      pageSettings: { pageSize: 20 },
      editSettings: {
        allowAdding: true
      },
      toolbar: [
        "Add",
        "Search",
        "ExpandAll",
        "CollapseAll",
        "ExcelExport",
        "PdfExport",
        "Print"
      ],
      PERIODTYPE: [
        "Daily",
        "Weekly",
        "Monthly",
        "Quarterly",
        "Yearly",
        "SpecificDate"
      ],
      sortSettings: {
        columns: [
          // { field: "DueDateDaily", direction: "Ascending" },
          // { field: "CreatedDate", direction: "Ascending" },
          // { field: "JobName", direction: "Ascending" }
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
      PICs: [],
      who: "",
      tasks: [],
      primaryKey: 0,
      remarkObj: {
        id: 0,
        remark: ""
      },
      reset: "",
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
        projectID: Number(this.$route.params.id),
        parentID: 0,
        remark: "",
        deadline: new Date().toISOString(),
        duedatequarterly: "",
        duedateyearly: "",
        status: false,
        fromWhoID: 0,
        duedatedaily: "",
        duedateweekly: "",
        dateofweekly: "",
        duedatemonthly: "",
        duedatequarterly: "",
        duedateyearly: "",
        specificdate: "",
        priority: "M",
        pic: [],
        JobTypeID: 1,
        periodType: 0
      },
      projectName: "",
      projectOptions: [],
      projectSelected: [],
      whoOptions: [],
      whoSelected: [],
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
      dateInMonth: 0,
      quarterly: [
        "First quarter",
        "Second quarter",
        "Third quarter",
        "Fourth quarter"
      ],
      selectedPeriodMain: "SpecificDate",
      time: "",
      //----------------------------------------------------To Do List Params
      monthOfWeeklySelected: 0,
      weekdaysOfMonth: [],
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
    let self = this;
    //self.getWeekdaysOfMonth(new Date().getMonth());
    //Kiem tra xem neu tren router co search thi seach
    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
      self.getTasks();
    });

    // EventBus.$on("reciveConnection", this.reciveConnection);
    self.getProjects();
    self.getFrom();
    self.getUserForWho();
    // self.getTasks();
    self.who = localStorage.getItem("User");
    self.getListUser();
    self.GetUserByProjectID(self.$route.params.id);

    self.connection = self.$SIGNALR;
  },
  methods: {
    //-------------------Begin Comment
    all() {
      this.getTasks();
      this.$refs.treegrid.search('');   
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
      $(self.$refs.modalComment).modal("show");
    },
    //-------------------End Comment
    urlTutorial() {
      this.$router.push(`/tutorial/${this.$route.params.id}`);
    },
    rowDrop(arg) {
      console.log("rowDrop");
      console.log(arg);
      let self = this;
      let from = arg.fromIndex;
      let end = arg.dropIndex;
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
      self.$api.get(`api/Tasks/Follow/${data.ID}`).then(res => {
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
          self.$swal("Success !", "Remark", "success");
        }
      });
    },
    done(id) {
      var self = this;
      self.$api.get(`api/Tasks/Done/${id}`).then(res => {
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
          this.$swal("Success !", "Delete Successfully!", "success");
        } else {
          this.$swal("Warning !", "You did not create this task!", "warning");
        }
      });
    },
    dataSourceChanged() {
      var self = this;
      self.getTasks();
    },

    contextMenuClick: function(args) {
      var self = this;
      console.log("contextMenuClick");
      console.log(args);
      let data = args.rowInfo.rowData;
      switch (args.item.id) {
        case "Add-Sub-Task":
          self.editStatus = false;
          self.clearForm();
          self.getUser();
          self.modalTitle = "Add New Project Sub-Task";
          self.task.parentID = data.ID;
          self.task.projectID = data.ProjectID;
          self.projectSelected = {
            ID: data.ProjectID,
            Name: data.ProjectName
          };
          self.whoSelected = {
            Username: localStorage.getItem("User"),
            ID: localStorage.getItem("UserID")
          };

          $("#modal-task").modal("show");
          break;
        case "Done":
          self.done(data.ID);
          break;
        case "EditTask":
          self.clearForm();
          self.editStatus = true;
          self.modalTitle = "Edit Project Task";
          $("#modal-task").modal("show");
          self.getUser();
          self.task.priority = data.PriorityID;
          self.whoSelected = data.FromWho;
          self.PICs = data.PICs || [];

          self.projectSelected = {
            ID: data.ProjectID,
            Name: data.ProjectName
          };
          self.task = {
            jobName: data.JobName,
            duedatedaily: data.DueDateDaily,
            duedateweekly: data.DueDateWeekly,
            duedatemonthly: data.DueDateMonthly,
            duedatequarterly: data.DueDateQuarterly,
            duedateyearly: data.DueDateYearly,
            specificdate: data.SpecificDate,
            dateofweekly: data.DateOfWeekly,
            priority: data.PriorityID,
            id: data.ID,
            level: data.Level,
            periodType: data.periodType,
            pic: data.PIC || []
          };

          let daily = data.DueDateDaily;
          let weekly = data.DueDateWeekly;
          let monthly = data.DueDateMonthly;
          let quarterly = data.DueDateQuarterly;
          let yearly = data.DueDateYearly;
          let specific = data.SpecificDate;
          let periodType = data.periodType;
          switch (periodType) {
            case 1:
              self.selectedPeriodMain = "Daily";
              self.task.duedatedaily = daily;
              break;
            case 2:
              self.selectedPeriodMain = "Weekly";

              self.weeklySelected = weekly.substring(0, 3);
              self.monthOfWeeklySelected =
                new Date(data.DateOfWeekly).getMonth() + 1;
              self.task.dateofweekly = data.DateOfWeekly;

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
              self.selectedPeriodMain = "SpecificDate";
              self.time =new Date(
                data.SpecificDate
              ).toISOString();
              self.task.specificdate = new Date(
                data.SpecificDate
              ).toISOString();
              break;
          }

          self.selected = data.BeAssigneds;
          break;
        case "DeleteTask":
          self.delete(data.ID);
          break;
      }
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
    getTasks() {
      var self = this;
      self.$api
        .get(`api/Projects/GetListTreeProjectDetail/${self.$route.params.id}`)
        .then(res => {
          // self.tasks = res.data;
          self.data = res.data;
          console.log(self.data);
        });
    },
    getProjects() {
      var self = this;
      self.$api.get("api/Tasks/GetListProject").then(res => {
        self.projectOptions = res.data;
        if (res.data) {
          console.log(res);
        } else {
          self.$alertify.warning("This project deleted!!!", true);
        }
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
      self.clearForm();
      self.selectedPeriodMain = "SpecificDate";
      self.modalTitle = "Add New Project Task";
      self.whoSelected = {
        ID: Number(localStorage.getItem("UserID")),
        Username: localStorage.getItem("User")
      };

      //Chi duoc add nhung user la teammember
      self.getUser();
    },
    clearForm() {
      this.task = {
        id: 0,
        from: "",
        jobName: "",
        createdBy: Number(localStorage.getItem("UserID")),
        projectID: Number(this.$route.params.id),
        parentID: 0,
        departmentid: 0,
        status: false,
        fromWhoID: 0,
        priority: "M",
        duedatedaily: "",
        duedateweekly: "",
        dateofweekly: "",
        duedatemonthly: "",
        duedatequarterly: "",
        duedateyearly: "",
        specificdate: "",
        level: 0,
        pic: [],
        JobTypeID: 1,
        periodType: 0
      };
      this.weeklySelected = "";
      this.monthOfWeeklySelected = 0;
      this.dateOfMonthly = 0;
      this.PICs = [];
      this.selectedPeriodMain = "SpecificDate";
      this.selectedPeriod = "";
      this.projectSelected = [];
      this.ocSelected = [];
      this.selected = [];
      this.date = "";
      this.time = "";
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
            }
            self.$swal("Success!", "Add Sub-Tasks successfully!", "success");
            console.log(res);
          });
        }
      } else {
        var check = self.valid();
        if (check) {
          
          self.task.fromWhoID = self.whoSelected.ID;
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
        // self.contextMenuItems = [
        //   {
        //     text: "Add Sub-Task",
        //     iconCss: " e-icons e-add",
        //     target: ".e-content",
        //     id: "Add-Sub-Task"
        //   },
        //   {
        //     text: "Add Remark",
        //     iconCss: " e-icons e-add",
        //     target: ".e-content",
        //     id: "Remark"
        //   },
        //   {
        //     text: "Finish Task",
        //     iconCss: " e-icons e-edit",
        //     target: ".e-content",
        //     id: "Done"
        //   },
        //   {
        //     text: "Edit",
        //     iconCss: " e-icons e-edit",
        //     target: ".e-content",
        //     id: "EditTask"
        //   },
        //   {
        //     text: "Delete",
        //     iconCss: " e-icons e-delete",
        //     target: ".e-content",
        //     id: "DeleteTask"
        //   }
        // ];
        self.isHideAdd = true;
      else if (managers.includes(user)) {
        // self.contextMenuItems = [
        //   {
        //     text: "Add Sub-Task",
        //     iconCss: " e-icons e-add",
        //     target: ".e-content",
        //     id: "Add-Sub-Task"
        //   },
        //   {
        //     text: "Add Remark",
        //     iconCss: " e-icons e-add",
        //     target: ".e-content",
        //     id: "Remark"
        //   },
        //   {
        //     text: "Finish Task",
        //     iconCss: " e-icons e-edit",
        //     target: ".e-content",
        //     id: "Done"
        //   },
        //   {
        //     text: "Edit",
        //     iconCss: " e-icons e-edit",
        //     target: ".e-content",
        //     id: "EditTask"
        //   },
        //   {
        //     text: "Delete",
        //     iconCss: " e-icons e-delete",
        //     target: ".e-content",
        //     id: "DeleteTask"
        //   }
        // ];
        self.isHideAdd = true;
      } else if (members.includes(user)) {
        self.isHideAdd = false;
        // console.log("checkRole");

        // console.log(self.$refs.treegrid);
        // self.contextMenuItems = [
        //   {
        //     text: "Add Remark",
        //     iconCss: " e-icons e-add",
        //     target: ".e-content",
        //     id: "Remark"
        //   },
        //   {
        //     text: "Finish Task",
        //     iconCss: " e-icons e-edit",
        //     target: ".e-content",
        //     id: "Done"
        //   }
        // ];
      }
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
    GetUserByProjectID(id) {
    $('#overlay').fadeIn();
      var self = this;
      let projectid = id || 0;
      let api = self.$api
        .get(`api/Projects/GetUserByProjectID/${projectid}`)
        .then(res => {
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
            let currentUser = Number(localStorage.getItem("UserID"));
            if (
              !self.listMangerID.includes(currentUser) &&
              !self.listMemberID.includes(currentUser)
            ) {
              self.$router.push("/todolist");
              return;
            }
            self.checkRole(
              self.createdBy,
              self.listMangerID,
              self.listMemberID
            );
          } else {
            // self.$router.push("/todolist");
            // return;
          }
        }).then( () => $('#overlay').fadeOut());
    },
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
    }
  },
  mounted() {
    let self = this;

    setTimeout(() => {
      self.getTasks();
    }, 500);

    EventBus.$on("follow", this.addSubscribe);
    EventBus.$on("taskItem", this.infoEdit);
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
    EventBus.$off("follow", this.addSubscribe);
    // EventBus.$off("reciveConnection", this.reciveConnection);
  },
  watch: {
    "$route.path": function(name) {
      
    },
    whoSelected: function(newVal, oldVal) {
      var self = this;
      let who = newVal;
      this.task.fromWhoID = who.ID;
    },
    ocSelected: function(newVal, oldVal) {
      var self = this;
      let dept = newVal;
      this.task.departmentid = dept.ID;
    },
    selected: function(newVal, oldVal) {
      var self = this;
      let pics = newVal;
      self.task.pic = pics.map((pic, index, pics) => {
        return pic.ID;
      });
    },
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
      self.task.duedateweekly = newVal;
    },
    selectedPeriodMain: function(newVal) {
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
    quarterlySelected: function(newVal) {
      let arr = this.quarterly.map(item => {
        return item.substring(0, 3);
      });
      let indexof = arr.indexOf(newVal);
      this.quarterRange = this.$common.getFirstDateLastDateQuarter(indexof + 1);
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
    },
    time(newVal) {
      if (newVal.indexOf("+07:00") > -1)
        this.task.specificdate = newVal.replace("+07:00","");
      else this.task.specificdate = newVal;
    }
  },
  provide: {
    treegrid: [
      ContextMenu,
      CommandColumn,
      Sort,
      Resize,
      ExcelExport,
      PdfExport,
      Page,
      Filter,
      Toolbar,
      RowDD,
      ColumnMenu
    ]
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #ff9800;
}

.theme-orange .vdatetime-year-picker__item--selected,
.theme-orange .vdatetime-time-picker__item--selected,
.theme-orange .vdatetime-popup__actions__button {
  color: #ff9800;
}
.e-headertext {
  font-size: 12px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.74);
}
.e-treegrid .e-altrow {
  background-color: rgba(0, 0, 0, 0.08);
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
