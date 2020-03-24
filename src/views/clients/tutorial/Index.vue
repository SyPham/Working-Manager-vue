<template>
  <div>
    <div class="row">
      <div class="col-md-12 pb-4">
        <button
          type="button"
          class="btn bg-gradient-secondary btn-sm"
          data-toggle="modal"
          data-target="#modal-tutorial"
          @click="clearFormTutorial"
        >
          <i class="fas fa-plus"></i> Add Tutorial Video
        </button>
      </div>
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">List Tutorial Video</h5>

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
              ref="treegrid"
              :dataSource="tutorials"
              childMapping="children"
              :treeColumnIndex="1"
              :allowPaging="true"
              :pageSettings="pageSettings"
              :allowExcelExport="true"
              :allowPdfExport="true"
              :allowSorting="true"
              :contextMenuItems="contextMenuItems"
              :contextMenuClick="contextMenuClick"
              :dataSourceChanged="dataSourceChanged"
              :editSettings="editing"
              :rowSelected="rowSelected "
              :actionComplete="actionComplete"
              :searchSettings="searchSettings"
              :toolbar="toolbar"
            >
              <e-columns>
                <e-column
                  field="ID"
                  width="100"
                  isPrimaryKey="true"
                  headerText="#"
                  textAlign="Center"
                  :disableHtmlEncode="false"
                ></e-column>
                <e-column
                  field="Name"
                  editType="stringedit"
                  headerText="Name"
                  textAlign="Center"
                  width="250"
                  :template="ProjectnameTemplate"
                  :edit="editparams"
                  :disableHtmlEncode="false"
                ></e-column>

                <e-column
                  field="URL"
                  editType="stringedit"
                  headerText="Video Toturial"
                  isPrimaryKey="true"
                  width="150"
                  :edit="editparams"
                  textAlign="Center"
                  :template="optionLinkTemplate"
                  :disableHtmlEncode="false"
                ></e-column>
                <e-column
                  field="Path"
                  editType="stringedit"
                  headerText="Path"
                  :edit="editparams"
                  textAlign="Center"
                  :template="optionPathTemplate"
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

    <!-- modal-tutorial -->
    <div class="modal fade" id="modal-tutorial" aria-hidden="true" style="display: none;">
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
                  <input type="text" id="Name" v-model="tutorial.name" class="form-control Name" />
                </div>
              </div>

              <div class="col-md">
                <div class="form-group">
                  <label for="Link">Video Toturial</label>
                  <input type="file" id="Link" class="form-control Link" />
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label for="Link">Link Path</label>
                  <input type="text" id="Path" v-model="tutorial.path" class="form-control Path" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addOrUpdateTutorial">Save changes</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- end modal -->

    <!-- Modal watch video -->
    <div
      class="modal fade"
      id="myModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
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

    <!-- The Modal show link path -->
    <div
      class="modal fade"
      id="Linkpath"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Note!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
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
import Tutorial from "../../../mixin/tutorial";

import {
  TreeGridPlugin,
  ContextMenu,
  Sort,
  Filter,
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
  name: "tutorial",
  mixins: [Tutorial],
  components: {
    Multiselect,
    Datetime,
    Link: null
  },
  data() {
    return {
      path: "",
      showModal: false,
      optionLinkTemplate: function() {
        return {
          template: Vue.component("optionLinkTemplate", {
            template: `<div id="optionLinkTemplate">
                        <div class="btn-group">
                        <a v-if="data.URL" @click="watchvideo" class="btn btn-success btn-sm" style="cursor:pointer ; color: white"  >Watch Video</a>
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
                $("#myModal").modal("show");
                self.title = self.data.title;
                console.log(self.title);
              }
            }
          })
        };
      },
      optionPathTemplate: function() {
        return {
          template: Vue.component("optionPathTemplate", {
            template: `<div id="optionPathTemplate">
            <i v-if="data.Path" style="cursor: pointer;font-size: 14px;" v-clipboard:copy="data.Path" v-clipboard:success="onCopy" v-clipboard:error="onError" class="far fa-clone"></i>
                        <div class="btn-group">
                        <a  @click="open(data.Path)" style="cursor:pointer ; color: blue" >{{data.Path}}</a>
                        </div>
                      </div>`,
            data: function() {
              return {
                data: {}
              };
            },
            methods: {
              onCopy: function(e) {
                this.$swal(
                  "success !",
                  "copy successfully" + " " + e.text,
                  "success"
                );
              },
              onError: function(e) {
                alert("Failed to copy texts");
              },

              open(linkpath) {
                //  $("#Linkpath").modal("show");
                this.$swal(
                  "Note !",
                  `Browser is not allowed to access local resources , Please copy Link Path paste to the Windows Explorer`,
                  "error"
                );
              }
            }
          })
        };
      },
      ProjectnameTemplate: function() {
        return {
          template: Vue.component("ProjectnameTemplate", {
            template: `<a id="ProjectnameTemplate"  data-toggle="tooltip" :title="data.Name" >
                      {{data.Name}}
                      </a>`,
            data: function() {
              return {
                data: {}
              };
            },
            methods: {}
          })
        };
      },
      optionCopyTemplate: function() {
        return {
          template: Vue.component("optionLinkTemplate", {
            template: `<i v-if="data.Path" style="cursor: pointer;font-size: 14px;" v-clipboard:copy="data.Path" v-clipboard:success="onCopy" v-clipboard:error="onError" class="far fa-clone"></i>`,
            data: function() {
              return {
                data: {}
              };
            },
            methods: {
              onCopy: function(e) {
                this.$swal(
                  "success !",
                  "copy successfully" + " " + e.text,
                  "success"
                );
              },
              onError: function(e) {
                alert("Failed to copy texts");
              },
              watchvideo() {
                $("#myModal").modal("show");
              }
            }
          })
        };
      },
      searchSettings: { hierarchyMode: "Parent" },

      modalTitle: "Add Project Training",
      editparams: { params: { format: "n" } },
      contextMenuItems: [
        {
          text: "Add Tutorial Video",
          iconCss: " e-icons e-add",
          target: ".e-content",
          id: "Add-Sub-Tutorial"
        },
        {
          text: "Edit Tutorial Video",
          iconCss: " e-icons e-edit",
          target: ".e-content",
          id: "EditTutorial"
        },
        {
          text: "Delete",
          iconCss: " e-icons e-delete",
          target: ".e-content",
          id: "DeleteTutorial"
        }
      ],
      toolbar: ["Search", "ExpandAll", "CollapseAll"],
      editing: { allowDeleting: true, allowEditing: true, mode: "Row" },
      pageSettings: { pageSize: 100 },
      editparams: { params: { format: "n" } },
      expanded: {},
      title: null
    };
  },
  created() {
    this.getTutorials();
    this.who = localStorage.getItem("User");
  },
  mounted() {
    let self = this;
    $("#myModal").on("hidden.bs.modal", function() {
      self.srcTutorial = "";
    });
    
  },
  methods: {
    actionComplete(args) {
      var self = this;
      console.log("actionComplete");
      console.log(args);

      if (args.requestType == "save") {
        self.tutorial.id = args.data.ID;
        self.tutorial.name = args.data.Name;
        self.tutorial.url = args.data.URL;
        self.tutorial.path = args.data.Path;
        self.$api
          .post("api/Tutorial/Edit", {
            ID: self.tutorial.id,
            Name: self.tutorial.name,
            URL: self.tutorial.url,
            Path: self.tutorial.path
          })
          .then(res => {
            self.$swal("Success !", "Edit Successfully!", "success");
          });
      }
    },
    rowSelected(args) {
      console.log(args);
      var self = this;
      self.srcTutorial = args.data.URL;
      self.title = args.data.name;
      self.tutorial = {
        id: args.data.id,
        name: args.data.name,
        level: args.data.level,
        url: args.data.url,
        path: args.data.path,
        parentid: args.data.parentid
      };
    },
    dataSourceChanged() {
      var self = this;
      self.getTutorials();
    },
    contextMenuClick: function(args) {
      var self = this;
      if (args.item.id == "EditTutorial") {
        self.modalTitle = "Edit Tutorial Video";
        self.isAddTutorial = false;
        $("#modal-tutorial").modal("show");
        self.tutorial = {
          name: args.rowInfo.rowData.Name,
          url: args.rowInfo.rowData.URL,
          path: args.rowInfo.rowData.Path,
          id: args.rowInfo.rowData.ID
        };
      } else if (args.item.id === "DeleteTutorial") {
        self.deleteTutorial(args.rowInfo.rowData.ID);
      } else {
        self.modalTitle = "Add Tutorial Video";
        self.tutorial.parentid = args.rowInfo.rowData.ID;
        $("#modal-add-function").modal("show");
      }
    },
    customiseCell: function(args) {
      // console.log("customiseCell");
      // console.log(args);

      if (args.column.field === "State") {
        args.cell.setAttribute("style", "background-color:red;color:white;");
      }
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
      Filter,
      Resize,
      Toolbar
    ]
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style >
.e-treecell {
  font-size: 16px;
}
.e-treegrid .e-altrow {
  background-color: #1d0b0b26 !important;
}

.e-headertext {
  font-size: 14px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.74);
}
.e-treecell {
  font-size: 16px;
}
</style>
