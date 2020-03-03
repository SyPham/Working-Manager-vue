var CommonPlugin = {
 toPaginator(items, page, per_page) {
 
  var page = page || 1,
  per_page = per_page || 10,
  offset = (page - 1) * per_page,
 
  paginatedItems = items.slice(offset).slice(0, per_page),
  total_pages = Math.ceil(items.length / per_page);
  return {
  page: page,
  per_page: per_page,
  pre_page: page - 1 ? page - 1 : null,
  next_page: (total_pages > page) ? page + 1 : null,
  total: items.length,
  total_pages: total_pages,
  data: paginatedItems
  };
},
  toTitleCase(str) {
    return str.replace(
      /\S+/g,
      str => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()
    );
  },
  activaTab(tab) {
    $('.nav-pills a[href="#' + tab + '"]').tab("show");
  },
  convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  },
  dateNow(ch = "/") {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var date = new Date();
    var day = date.getDate(); // yields date
    var month = date.getMonth() + 1; // yields month (add one as '.getMonth()' is zero indexed)
    var year = date.getFullYear(); // yields year
    // var hour = date.getHours(); // yields hours
    // var minute = date.getMinutes(); // yields minutes
    // var second = date.getSeconds(); // yields seconds

    // After this construct a string with the above results as below
    var time = pad(month) + ch + pad(day) + ch + year; //+ " " + hour + ":" + minute + ":" + second;
    return time;
  },
  dateFormat(date) {
    var d = new Date(date);
    var m, day, month;
    m = d.getMonth() + 1;
    if (m < 10) month = "0" + m;
    if (d.getDate() < 10) day = "0" + d.getDate();
    else day = d.getDate();

    var year = d.getFullYear();
    var formattedDate = month + "-" + day + "-" + year;
    return formattedDate;
  },
  JSONDateWithTime(dateStr) {
    var d = new Date(dateStr);
    var m, day;
    m = d.getMonth() + 1;
    if (m < 10) month = "0" + m;
    else month = m;
    if (d.getDate() < 10) day = "0" + d.getDate();
    else day = d.getDate();
    var year = d.getFullYear();
    var formattedDate = day + "/" + month + "/" + year;
    var hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    var minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    var seconds = d.getSeconds();
    var formattedTime = hours + ":" + minutes;
    formattedDate = formattedTime + " - " + formattedDate;
    //Ngày giờ hiện tại
    var dateObj = new Date();
    var dayNow = dateObj.getDate();
    var monthNow = dateObj.getMonth() + 1;
    var yearNow = dateObj.getFullYear();
    var hoursNow = dateObj.getHours();
    var minutesNow = dateObj.getMinutes();
    var secondsNow = dateObj.getSeconds();
    dateObj = formattedDate;
    if (
      hoursNow - hours === 0 &&
      minutesNow - minutes === 0 &&
      yearNow - year === 0 &&
      monthNow - month === 0 &&
      dayNow - day === 0
    ) {
      if (secondsNow - seconds === 0) dateObj = "just recently";
      else if (secondsNow - seconds === 1)
        dateObj = secondsNow - seconds + " second ago";
      else dateObj = secondsNow - seconds + " seconds ago";
    }
    if (
      hoursNow - hours === 0 &&
      minutesNow - minutes > 0 &&
      yearNow - year === 0 &&
      monthNow - month === 0 &&
      dayNow - day === 0
    ) {
      if (minutesNow - minutes === 1)
        dateObj = minutesNow - minutes + " minute ago";
      else dateObj = minutesNow - minutes + " minutes ago";
    }
    if (
      hoursNow - hours > 0 &&
      yearNow - year === 0 &&
      monthNow - month === 0 &&
      dayNow - day === 0
    ) {
      if (hoursNow - hours === 1) dateObj = hoursNow - hours + " hour ago";
      else dateObj = hoursNow - hours + " hours ago";
    }
    if (
      yearNow - year === 0 &&
      monthNow - month === 0 &&
      dayNow - day > 0 &&
      dayNow - day <= 7
    ) {
      if (dayNow - day === 1) dateObj = dayNow - day + " day ago";
      else dateObj = dayNow - day + " days ago";
    }
    if (yearNow - year === 0 && monthNow !== month) {
      day = dayNow - day;
      var month = monthNow - month;
      day = month * 30 + day;
      if (0 < day && day <= 7) {
        dateObj = day + " days ago";
      }
    }
    return dateObj;
  }
};

export default function(Vue) {
  Vue.common = CommonPlugin;

  Object.defineProperties(Vue.prototype, {
    $common: {
      get: function() {
        return Vue.common;
      }
    }
  });
}
