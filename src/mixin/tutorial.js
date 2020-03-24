export default {
    data() {
        return {
            srcTutorial: "",
            tutorial: {
                id: 0,
                name: "",
                url: "",
                path: "",
                level: 0,
                parentid: 0,
                taskid: 0
            },
            isAddTutorial: true,
            tutorials: [],
            titleTutorial: "",
            titleTutorialVideo: ""
        };
    },
    mounted() {
        let self = this;
        $("#myModal").on("hidden.bs.modal", function () {
            self.srcTutorial = "";
        });
        $("#modal-tutorial").on("hidden.bs.modal", function () {
            self.isAddTutorial = true;
        });
        $("#modal-watch-video").on("hidden.bs.modal", function () {
            self.srcTutorial = "";
        });
    },
    methods: {
        deleteTutorial(id) {
            let self = this;
            self.$alertify.confirm().then(result => {
                if (result.value) {
                    self.$api.delete("api/Tutorial/Delete/" + id).then(res => {
                        if (res.data) {
                            self.dataSourceChanged();
                        }
                        self.$swal("Success !", "Delete Successfully!", "success");
                    });
                } else {
                    self.$swal("Cancelled", "Your tutorial video is still intact", "info");
                }
            });

        },
        getTutorials() {
            let self = this;
            self.$api
                .get(`api/Tutorial/GetListTree/${self.$route.params.id}`)
                .then(res => {
                    // self.tasks = res.data;
                    console.log(res);
                    self.tutorials = res.data;
                    self.Name = res.data.Name;
                });
        },
        clearFormTutorial() {
            let self = this;
            self.tutorial = {
                id: 0,
                name: "",
                url: "",
                path: "",
                level: 0,
                parentid: 0,
                taskid: 0
            };
        },
        createTutorial() {
            let self = this;

            if (self.tutorial.parentid > 0) {
                let formData = new FormData();
                let fileUpload = document.querySelector("#modal-tutorial .Link");
                formData.append("UploadedFile", fileUpload.files[0]);
                formData.append("UploadedFileName", self.tutorial.name);
                formData.append("UploadedFileLevel", self.tutorial.level + 1);
                formData.append("UploadedFileParentID", self.tutorial.parentid);
                formData.append("UploadedFilePath", self.tutorial.path);
                formData.append("UploadedProjectID", self.$route.params.id);
                formData.append("UploadedTaskID", self.tutorial.taskid);

                self.$api
                    .post("api/Tutorial/Create", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then(res => {
                        if (res.data) {
                            $("#modal-tutorial").modal("hide");
                            self.dataSourceChanged();
                            self.clearFormTutorial();
                        }
                        self.$swal(
                            "Success !",
                            "New Function Project Add Success",
                            "success"
                        );
                    });
            } else {
                var formData = new FormData();
                var fileUpload = document.querySelector("#modal-tutorial .Link");
                formData.append("UploadedFile", fileUpload.files[0]);
                formData.append("UploadedFileName", self.tutorial.name);
                formData.append("UploadedFileParentID", self.tutorial.parentid);
                formData.append("UploadedFilePath", self.tutorial.path);
                formData.append("UploadedTaskID", self.tutorial.taskid);
                formData.append("UploadedProjectID", self.$route.params.id);
                self.$api
                    .post("api/Tutorial/Create", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then(res => {
                        // self.data = res.data;
                        if (res.data) {
                            $("#modal-tutorial").modal("hide");
                            self.$swal("Success !", "New Project Add Success", "success");
                            self.dataSourceChanged();
                        }
                        console.log(res);
                    });
            }
            this.modalTitle = "Add Tutorial";
        },
        updateTutorial() {
            let self = this;
            let formData = new FormData();
            let fileUpload = document.querySelector("#modal-edit .Link");
            formData.append("UploadedFile", fileUpload.files[0]);
            formData.append("UploadedFileName", self.tutorial.name);
            formData.append("UploadedFilePath", self.tutorial.path);
            formData.append("UploadedFileID", self.tutorial.id);
            formData.append("UploadedTaskID", self.tutorial.taskid);
            self.$api
                .post("api/Tutorial/Rename", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(res => {
                    if (res.data) {

                        $("#modal-edit").modal("hide");
                        self.dataSourceChanged();
                    }
                    self.$swal(
                        "Success !",
                        "New Function Project Update Success",
                        "success"
                    );
                });
        },
        addOrUpdateTutorial() {
            if (this.isAddTutorial)
                this.createTutorial();
            else
                this.updateTutorial();
            $("#modal-tutorial").modal("hide");

        }
    }
}