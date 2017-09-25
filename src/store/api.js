import axios from 'axios'
import jsonp from 'jsonp'

const baseURL = 'static/json/'

const defaults = {
  baseURL: baseURL,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}

Object.assign(axios.defaults, defaults)

export const getPoints = _params => {
  return axios.get(`addPoint.json`, {
    params: _params,
    baseURL: baseURL
  }).then(res => {
    return res.data
  })
}
export const getLines = _params => {
  return axios.get(`lines.json`, {
    params: _params,
    baseURL: baseURL
  }).then(res => {
    return res.data
  })
}
export const getPolygons = _params => {
  return axios.get(`polygons.json`, {
    params: _params,
    baseURL: baseURL
  }).then(res => {
    return res.data
  })
}

export const test = _params => {
 /* jsonp(`aaa.json`, function (json) {
    console.log('==================')
    console.log(json)
  }) */
 /* $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'callback',
    url: './static/json/aaa.json',
    success: function (rooms) {
      console.log(rooms)
    }
  })
*/

  jsonp('./static/json/aaa.json', function (json) {
    console.log('==================')
    console.log(json)
  })
}
export const aaa = _params => {
  jsonp('aaa.json', function (json) {
    console.log('==================')
    console.log(json)
  })
}
