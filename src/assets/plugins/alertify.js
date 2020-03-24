import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/dist/sweetalert2.min.css";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  // timerProgressBar: true,
  timer: 3000,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
  customClass: {
    title: "title-class",
    icon: "icon-class"
  }
});



var AlertifyPlugin = {
  confirm: function (confirmText = "delete") {
    return Promise.resolve(Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${confirmText} it!`
    }))
  },
  success: function (message, showButtonOK = false, title = "Success!") {
    if (showButtonOK) Swal.fire(title, message, "success");
    else {
      Toast.fire({
        title: message,
        icon: "success"
      });
    }
  },
  error: function (message, showButtonOK = false, title = "Error!") {
    if (showButtonOK) Swal.fire(title, message, "error");
    else {
      Toast.fire({
        title: message,
        icon: "error"
      });
    }
  },
  warning: function (message, showButtonOK = false, title = "Warning!") {
    if (showButtonOK) Swal.fire(title, message, "warning");
    else {
      Toast.fire({
        title: message,
        icon: "warning"
      });
    }
  },
  info: function (message, showButtonOK = false, title = "Info!") {
    if (showButtonOK) Swal.fire(title, message, "info");
    else {
      Toast.fire({
        title: message,
        icon: "info"
      });
    }
  },
  question: function (message, showButtonOK = false, title = "Question!") {
    if (showButtonOK) Swal.fire(title, message, "question");
    else {
      Toast.fire({
        title: message,
        icon: "question"
      });
    }
  }
};

export default function (Vue) {
  Vue.alertify = AlertifyPlugin;

  Object.defineProperties(Vue.prototype, {
    $alertify: {
      get: function () {
        return Vue.alertify;
      }
    }
  });
}
