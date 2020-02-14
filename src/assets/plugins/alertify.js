const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,

  timer: 3000,
  customClass: {
    title: "title-class",
    icon: "icon-class"
  }
});
var AlertifyPlugin = {
  success: function(message) {
    Toast.fire({
      title: message,
      type: "success"
    });
  },
  error: function(message) {
    Toast.fire({
      title: message,
      type: "error"
    });
  },
  warning: function(message) {
    Toast.fire({
      title: message,
      type: "warning"
    });
  },
  info: function(message) {
    Toast.fire({
      title: message,
      type: "info"
    });
  },
  question: function(message) {
    Toast.fire({
      title: message,
      type: "question"
    });
  }
};

export default function(Vue) {
  Vue.alertify = AlertifyPlugin;

  Object.defineProperties(Vue.prototype, {
    $alertify: {
      get: function() {
        return Vue.alertify;
      }
    }
  });
}
