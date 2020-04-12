const CONNECTION = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/working-management-hub")
    .configureLogging(signalR.LogLevel.Information)
    .build();
CONNECTION
    .start()
    .then(function () {
        console.log("Connected working-management-hub detail global");
      
    })
    .catch(error => {
        console.log("working-management-hub error detail global!! ");
        console.log(error);
    });

export default function (Vue) {
    Vue.SIGNALR = CONNECTION;

    Object.defineProperties(Vue.prototype, {
        $SIGNALR: {
            get: function () {
                return Vue.SIGNALR;
            }
        }
    });
}
