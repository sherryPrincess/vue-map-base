import Math from 'mathjs'
/**
 * 时间戳转标准格式 2016-09-05 13:46:52
 * @returns {{_year: string, _month: string, _day: string, getYear: date.getYear, getMonth: date.getMonth, getDay: date.getDay}}
 */
function timestampFormat (str, bl, flag) {
  if (bl) {
    str = parseInt(str) - 8 * 60 * 60 * 1000
  }

  var date = new Date(str)
  var yy = date.getFullYear()
  var mmmm = date.getMonth() + 1
  var dd = date.getDate()
  var h = date.getHours()
  var m = date.getMinutes()
  var s = date.getSeconds()
  if (flag) {
    return yy + '-' + (mmmm < 10 ? ('0' + mmmm) : mmmm) + '-' + (dd < 10 ? ('0' + dd) : dd)
  } else {
    return yy + '-' + (mmmm < 10 ? ('0' + mmmm) : mmmm) + '-' + (dd < 10 ? ('0' + dd) : dd) + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s)
  }
}

/**
 * @description 格式化 时间
 * @param date 06/24/2016 12:14:25
 * @returns 2016-06-24 12:14:25
 */
function dateFormat (date) {
  var yy = date.getFullYear()
  var mmmm = date.getMonth() + 1
  var dd = date.getDate()
  var h = date.getHours()
  var m = date.getMinutes()
  var s = date.getSeconds()
  return yy + '-' + (mmmm < 10 ? ('0' + mmmm) : mmmm) + '-' + (dd < 10 ? ('0' + dd) : dd) + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s)
}

function normFormatTimeStamp (date) {
  var timestamp2 = Date.parse(new Date(date))
  return timestamp2 / 1000
}

/**
 * 获取当前系统日期
 * @returns {string}  2016-12-10
 */
function currentDate (hyphen) {
  let date = new Date()
  let yy = date.getFullYear()
  let mmmm = date.getMonth() + 1
  let dd = date.getDate()
  return yy + hyphen + (mmmm < 10 ? ('0' + mmmm) : mmmm) + hyphen + (dd < 10 ? ('0' + dd) : dd)
}

/**
 * 获取当前系统大写星期
 * @returns {string}    六
 */
function currentWeek (hyphen) {
  let date = new Date()
  let weeks = {
    '0': '日',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六'
  }
  return weeks[date.getDay()]
}

/**
 * 获取当前系统时间 （二十四小时制）
 * @returns {string}    13:58:16
 */
function currentTime (hyphen) {
  let date = new Date()
  var h = date.getHours()
  var m = date.getMinutes()
  var s = date.getSeconds()
  return (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s)
}

/**
 * 桩号格式化
 * @param 12.215  /  12.2
 * @returns {string} 12+215   /   12.200
 */
function formatStake (data) {
  let [temp, index] = ['', data.toString().indexOf('.')]
  if (index !== -1) {
    data = data.toString().replace('.', '+')
  } else {
    data += '+'
  }
  index = data.toString().indexOf('+')
  temp = data.substr(index + 1, data.length)
  return temp.length === 0 ? data + '000' : temp.length === 1 ? data + '00' : temp.length === 2 ? data + '0' : data
}

function time () {
  var date = new Date()
  let hh = date.getHours()
  let mm = date.getMinutes()
  let time = (hh < 10 ? ('0' + hh) : hh) + ':' + (mm < 10 ? ('0' + mm) : mm)
  return time
}

function arrayformatPoint (data) {
  try {
    let arrays = []
    if (data && Array.isArray(data) && data.length > 0) {
      arrays = data.map(item => {
        let _object = {
          attributes: item
        }
        if (item['ptx'] && item['pty'] && Number(item['ptx']) !== 0 && Number(item['pty']) !== 0) {
          _object['geometry'] = [item.ptx, item.pty]
        }
        return _object
      })
    }
    return arrays
  } catch (e) {
    console.log(e)
  }
}

function lonLat2Mercator (lontitude, latitude) {
  /* let x = lontitude * 20037508.34 / 180
  let y = Math.log(Math.tan((90 + latitude) * Math.PI / 360)) / (Math.PI / 180)
  y = y * 20037508.34 / 180
  return [x,y] */
  let temp = Math.chain(lontitude).multiply(20037508.34).done()
  let x = Math.eval(temp / 180)
  let temp1 = Math.chain(latitude).add(90).multiply(Math.PI).done()
  let temp2 = Math.eval(temp1 / 360)
  let temp3 = Math.eval(Math.PI / 180)
  let y = Math.log(Math.tan(temp2)) / temp3
  y = Math.eval(Math.chain(y).multiply(20037508.34) / 180)
  return [x, y]
}
function Mercator2lonLat (x, y) {
  let temp1 = Math.eval(x / 20037508.34)
  let longtitude = Math.chain(temp1).multiply(180).done()
  let temp2 = Math.eval(y / 20037508.34)
  let latitude = Math.chain(temp2).multiply(180).done()
  let temp3 = Math.eval(Math.chain(latitude).multiply(Math.PI).done() / 180)
  latitude = Math.chain(2).multiply(Math.atan(Math.exp(temp3))).subtract(Math.eval(Math.PI / 2)).done()
  latitude = Math.chain(Math.eval(180 / Math.PI)).multiply(latitude).done()
  // let longtitude = x / 20037508.34 * 180
  // let latitude = y / 20037508.34 * 180
  // latitude = 180 / Math.PI * (2 * Math.atan(Math.exp(latitude * Math.PI / 180)) - Math.PI / 2)
  return [longtitude, latitude]
}

/**
 * 百度坐标系转国测局J02（火星坐标系 (GCJ-02)）
 * @param bdLon
 * @param bdLat
 * @returns {[*,*]}
 */
const bdtogcj02 = (bdLon, bdLat) => {
  let x = Math.chain(bdLon).add(-0.0065).done()
  let y = Math.chain(bdLat).add(-0.006).done()
  let temp = Math.chain(Math.pow(x, 2)).add(Math.pow(y, 2)).done()
  let temp1 = Math.chain(0.00002).multiply(Math.sin(Math.chain(y).multiply(Math.PI).done())).done()
  let z = Math.chain(Math.sqrt(temp)).add(-temp1).done()
  let theta = Math.chain(Math.atan2(y, x)).add(-Math.chain(0.000003).multiply(Math.cos(x * Math.PI)).done()).done()
  let ggLng = Math.chain(z).multiply(Math.cos(theta)).done()
  let ggLat = Math.chain(z).multiply(Math.sin(theta)).done()
  return [ggLng, ggLat]
}
/**
 *  用逗号隔开的字符串
 */
const commaSplit = (_data, _attr) => {
  let _ids = ''
  if (_data && _data instanceof Array && _data.length > 0) {
    for (let i = 0; i < _data.length; i++) {
      if (_attr === null || _attr === undefined) {
        _attr = 'id'
      }
      _ids += _data[i][_attr] + ','
    }
    _ids = _ids.substr(0, _ids.length - 1)
  }
  return _ids
}

export {
  timestampFormat,
  dateFormat,
  normFormatTimeStamp,
  formatStake,
  currentDate,
  currentWeek,
  currentTime,
  time,
  arrayformatPoint,
  lonLat2Mercator,
  Mercator2lonLat,
  bdtogcj02,
  commaSplit
}
