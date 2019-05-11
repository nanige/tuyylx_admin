
export default class Util {
  //设置URL   ken  2017-06-02 14:50:44

  setUrl ( num,str ) {

    switch (num) {
      case 1:
        return '/biz/' + str + '/add.do'
      case 2:
        return '/biz/' + str + '/edit.do'
      case 3:
        return '/biz/' + str + '/del.do'
      case 4:
        return '/biz/' + str + '/list.do'
    }
  }
  setUrlSYS ( num,str ) {

    switch (num) {
      case 1:
        return '/sys/' + str + '/add.do'
      case 2:
        return '/sys/' + str + '/edit.do'
      case 3:
        return '/sys/' + str + '/del.do'
      case 4:
        return '/sys/' + str + '/list.do'
      case 5:
        return '/sys/' + str + '/selectOcmpList.do'
    }
  }


  //格式化时间
  timeFormat () {
    Date.prototype.format = function(fmt) {
      var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
      };
      if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
      }
      for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
      }
      return fmt;
    }
  }

  //加年份
  getDateStr(date) {
    let arr = new Array()

    arr = date.split("-")

    return (parseInt(arr[0]) + 1) + '-' + arr[1] + '-' + parseInt(arr[2] - 1)
  }

  trBoolean ( str ) {
    switch ( str ) {
      case 'true':
        return true
      case 'false':
        return false
    }
  }

  dateInit (date, self) {
    self.specialDateObj.nullArrStart = new Date(date).getDay()
    self.specialDateObj.year =  date.split('-')[0]
    self.specialDateObj.month =  date.split('-')[1]
    if (self.specialDateObj.month.length < 2) {
      self.specialDateObj.month = '0' + self.specialDateObj.month
    }
    if(self.specialDateObj.month == 2){
      if((self.specialDateObj.year % 400 == 0) || (self.specialDateObj.year % 4 == 0) && (self.specialDateObj.year % 100 != 0)){
        self.specialDateObj.days = 29
      }else{
        self.specialDateObj.days = 28
      }
    }else if(self.specialDateObj.month == 1 || self.specialDateObj.month == 3 || self.specialDateObj.month == 5 || self.specialDateObj.month == 7 || self.specialDateObj.month == 8 || self.specialDateObj.month == 10 || self.specialDateObj.month ==12){
      self.specialDateObj.days = 31
    }else{
      self.specialDateObj.days = 30
    }
    self.specialDateObj.daysObj = []
    for (let i = 1; i <= self.specialDateObj.days; i++) {
      if (i < 10) {
        self.specialDateObj.daysObj.push({
          date: self.specialDateObj.year + '-' + self.specialDateObj.month + '-0' + i,
          year: self.specialDateObj.year,
          month: self.specialDateObj.month,
          day: i
        })
      } else {
        self.specialDateObj.daysObj.push({
          date: self.specialDateObj.year + '-' + self.specialDateObj.month + '-' + i,
          year: self.specialDateObj.year,
          month: self.specialDateObj.month,
          day: i
        })
      }
    }
  }
}
