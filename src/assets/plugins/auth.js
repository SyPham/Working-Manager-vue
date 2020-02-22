var AuthPlugin = {
  setToken: function(token, expiration, user, role) {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authTokenExpiration", expiration);
    localStorage.setItem("User", user);
    localStorage.setItem("Role", role);
  },

  destroyToken: function() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
    localStorage.removeItem("Role");
    localStorage.removeItem("UserID");
    localStorage.removeItem("User");
    localStorage.removeItem("Level");
    localStorage.removeItem("IsLeader");
    localStorage.removeItem("ListOCs");
  },

  getToken: function() {
    var token = localStorage.getItem("authToken");
    var expiration = localStorage.getItem("authTokenExpiration");

    var User = localStorage.getItem("User");

    if (!token || !expiration || !User) return null;

    if (Date.now() > parseInt(expiration)) {
      this.destroyToken();
      return null;
    } else {
      return token;
    }
  },
  getMenus: function() {
    var token = localStorage.getItem("authToken");
    var expiration = localStorage.getItem("authTokenExpiration");
    var User = localStorage.getItem("User");

    if (!token || !expiration || !User) return null;

    if (Date.now() > parseInt(expiration)) {
      this.destroyToken();
      return null;
    } else {
      return Menus;
    }
  },
  loggedIn: function() {
    if (this.getToken()) return true;
    else return false;
  }
};

export default function(Vue) {
  Vue.auth = AuthPlugin;

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get: function() {
        return Vue.auth;
      }
    }
  });
}
