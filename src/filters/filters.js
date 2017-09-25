import moment from 'moment'
import * as utils from '../assets/js/utils/utils'
export default {
  dateFormat: function (value, format) {
    if (value === undefined) return
    return moment(value).format(format)
  },
  formatZh: function (value) {
    if (value !== null && value !== 'undefined') {
      value = parseFloat(value).toFixed(3)
      value = utils.returnFloat(value)
      value = value.toString().replace('.', ' + ')
      return 'K' + value
    }
    return 'K' + value
  },
  formatReason: function (value) {
    if (value !== null && value !== 'undefined') {
      let arr = value.split('nbsp;')
      return arr[arr.length - 1]
    }
    return ''
  },
  toFixed: function (value) {
    if (value !== null && value !== 'undefined') {
      let _value = parseFloat(value)
      return _value.toFixed(3)
    }
    return ''
  },
  // 桥梁详情  小数点去除后面的0
  clearZero: function (res) {
    if (res === undefined) return
    if (res !== null || res !== '' || res !== undefined) {
      return parseFloat(res)
    }
  },
  // 隧道详情 小数点后保留两位
  doubleFixed: function (value) {
    if (value !== null && value !== 'undefined') {
      let _value = parseFloat(value)
      return _value.toFixed(2)
    }
    return ''
  }
}
