export default {
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
                        <button type="button" :class="data.Follow =='No' ? 'btn btn-success btn-xs':'btn btn-danger btn-xs'" @click="addFollow(data)" v-if="data.Level == 1" ><i :class="!data.Follow ? 'fas fa-bell':'fas fa-bell-slash'"></i> {{!data.Follow?'Follow':'Unfollow'}}</button>
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
            pageSettings: {
                pageSizes: true,
                pageSize: 20
            },
            editStatus: true,
            PERIODTYPE: [
                "Daily",
                "Weekly",
                "Monthly",
                "Quarterly",
                "Yearly",
                "SpecificDay"
            ],
            weeklys: [
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
            toolbar: [
                "Search",
                "ExpandAll",
                "CollapseAll",
                "ExcelExport",
                "PdfExport",
                "Print"
            ],
        };
    }
}