import axios from "axios";
axios.defaults.baseURL = "http://10.4.0.76:96";

axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.interceptors.request.use(
  function (config) {
    config.headers = {
      Authorization: "Bearer " + localStorage.getItem("authToken")
    };
    config.headers.post = {
      "Content-Type": "application/json; charset=utf-8"
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

var APIPlugin = axios.create({
  baseURL: `http://10.4.0.76:96/`
});

export default function (Vue) {
  Vue.api = APIPlugin;

  Object.defineProperties(Vue.prototype, {
    $api: {
      get: function () {
        return Vue.api;
      }
    }
  });
}
