function monthComparator(date1, date2) {
  let d1 = new Date(date1),
    d2 = new Date(date2);
  if (d1.getMonth() == d2.getMonth())
    return 1;
  return -1;
};

var CommonPlugin = {

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
  getMondaysInMonth(month) {
    let mon = month - 1 || new Date().getMonth();
    if (month == 1)
      mon = 0;
    var d = new Date(new Date().getFullYear(), mon),
      month = d.getMonth(),
      mondays = [];
    d.setDate(1);

    // Get the first Monday in the month
    while (d.getDay() !== 1) {
      d.setDate(d.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
      mondays.push(new Date(d.getTime()));
      d.setDate(d.getDate() + 7);
    }
    return this.toFormatDatesArray(mondays);
  },
  getWednesdaysInMonth(month) {
    let wednesdays = [];
    this.getMondaysInMonth(month).map(item => {
      let wednesday = this.addDays(item, 1);
      if (monthComparator(item, wednesday) == 1) {
        wednesdays.push(wednesday)
      }
    });
    return this.toFormatDatesArray(wednesdays);
  },
  getTuesdaysInMonth(month) {
    let wednesdays = [];
    this.getMondaysInMonth(month).map(item => {
      let wednesday = this.addDays(item, 2);
      if (monthComparator(item, wednesday) == 1) {
        wednesdays.push(wednesday)
      }
    });
    return this.toFormatDatesArray(wednesdays);

  },
  getThursdaysInMonth(month) {
    let wednesdays = [];
    this.getMondaysInMonth(month).map(item => {
      let wednesday = this.addDays(item, 3);
      if (monthComparator(item, wednesday) == 1) {
        wednesdays.push(wednesday)
      }
    });
    return this.toFormatDatesArray(wednesdays);

  },
  getFridaysInMonth(month) {
    let wednesdays = [];
    this.getMondaysInMonth(month).map(item => {
      let wednesday = this.addDays(item, 4);
      if (monthComparator(item, wednesday) == 1) {
        wednesdays.push(wednesday)
      }
    });
    return this.toFormatDatesArray(wednesdays);

  },
  getSaturdaysInMonth(month) {
    let wednesdays = [];
    this.getMondaysInMonth(month).map(item => {
      let wednesday = this.addDays(item, 5);
      if (monthComparator(item, wednesday) == 1) {
        wednesdays.push(wednesday)
      }
    });
    return this.toFormatDatesArray(wednesdays);
  },
  // getSundaysInMonth(month) {
  //   let wednesdays = [];
  //   this.getMondaysInMonth(month).map(item => {
  //     let wednesday = this.addDays(item, 6);
  //     if (monthComparator(item, wednesday) == 1) {
  //       wednesdays.push(wednesday)
  //     }
  //   });
  //   return wednesdays;
  // },
  getDatesOfMonth(index = 0) {
    if (index === 0)
      return "#N/A";
    let _datesOfMonth = ["#N/A", "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Nighth",
      "Tenth", "Eleventh", "Twelfth", "Thirteenth", "Fourteenth",
      "Fifteenth", "Sixteenth", "Seventeenth", "Eighteenth", "NineTeenth",
      "Twentieth", "Twenty-first", "Twenty-second", "Twenty-third", "Twenty-fourth", "Twenty-fifth", "Twenty-sixth", "Twenty-seventh", "Twenty-eight", "Twenty-nineth", "Thirtieth", "Thirty-first"];
    let _datesOfMonthShort = _datesOfMonth.map(item => {
      return item.substring(item.length - 2, item.length);
    })
    return index + _datesOfMonthShort[index]
  },
  getFirstDateByMonth(month) {
    var date = new Date(new Date().getFullYear(), month);
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
  },
  getLastDateByMonth(month) {
    var date = new Date(new Date().getFullYear(), month);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay;
  },
  checkQuarterly(quarterly, date) {
    let qu = [
      "First quarter",
      "Second quarter",
      "Third quarter",
      "Fourth quarter"
    ];
    let quTemp = qu.map(item => {
      return item.substr(0, 3);
    })
    let quarterNumber = quTemp.indexOf(quarterly);

    let q1 = [1, 2, 3, 4], q2 = [4, 5, 6, 7], q3 = [7, 8, 9, 10], q4 = [10, 11, 12];
    if (date == "")
      return {
        status: false,
        quarter: qu[quarterNumber]
      };

    let dateTemp = new Date(date);
    let month = dateTemp.getMonth() + 1;
    let firstDate = dateTemp.getDate();

    if (q1.includes(month) && quarterNumber === 0) {
      if (month == 4 && firstDate === 1)
        return {
          status: true,
          quarter: qu[quarterNumber]
        };
      if (month >= 1 && month <= 3)
        return {
          status: true,
          quarter: qu[quarterNumber]
        };
    }

    if (q2.includes(month) && quarterNumber === 1) {

      if (month == 7 && firstDate === 1)
        return {
          status: true,
          quarter: qu[quarterNumber]
        };
      if (month >= 4 && month <= 6)
        return {
          status: true,
          quarter: qu[quarterNumber]
        };
    }
    if (q3.includes(month) && quarterNumber === 2) {

      if (month == 10 && firstDate === 1)
        return {
          status: true,
          quarter: qu[quarterNumber]
        };
      if (month >= 7 && month <= 9)
        return {
          status: true,
          quarter: qu[quarterNumber]
        };
    }
    if (q4.includes(month) && quarterNumber === 3) {

      return {
        status: true,
        quarter: qu[quarterNumber]
      };
    }
    return {
      status: false,
      quarter: qu[quarterNumber]
    };
  },
  getFirstDateLastDateQuarter(number) {
    switch (number) {
      case 1:
        return {
          firstDate: this.toFormatDate(this.getFirstDateByMonth(1)),
          lastDate: this.toFormatDate(this.getFirstDateByMonth(3)),
        }
      case 2: return {
        firstDate: this.toFormatDate(this.getFirstDateByMonth(4)),
        lastDate: this.toFormatDate(this.getFirstDateByMonth(6)),
      }
      case 3: return {
        firstDate: this.toFormatDate(this.getFirstDateByMonth(7)),
        lastDate: this.toFormatDate(this.getFirstDateByMonth(9)),
      }
      case 4: return {
        firstDate: this.toFormatDate(this.getFirstDateByMonth(10)),
        lastDate: this.toFormatDate(this.getFirstDateByMonth(12)),
      }
    }
  },
  toFormatDate(dateIso, showyear = true) {
    var date = new Date(dateIso)
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var day = date.getDate(), monthIndex = date.getMonth(), year = date.getFullYear();
    if (showyear)
      return `${day} ${monthNames[monthIndex]}, ${year}`;
    else
      return `${day} ${monthNames[monthIndex]}`;
  },
  toFormatDatesArray(dates) {
    return dates.map(date => {
      return this.toFormatDate(date, true);
    })
  },
  getQuarter(d) {
    d = d || new Date();
    var m = Math.floor(d.getMonth() / 3) + 2;
    return m > 4 ? m - 4 : m;
  },
  getDateInMonth(month) {

    let m = new Date(new Date().getFullYear(), month, 0).getDate();
    return m;
  },
  toDateTimeNowISO() {
    var date = new Date();
    date.toISOString(); //"2011-12-19T15:28:46.493Z"
    return date;
  },
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

export default function (Vue) {
  Vue.common = CommonPlugin;

  Object.defineProperties(Vue.prototype, {
    $common: {
      get: function () {
        return Vue.common;
      }
    }
  });
}
