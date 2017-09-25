import qs from 'qs'
import MyVue from '../../../main'

/**
 * 返回浮点数
 * @param value
 * @returns {*}
 */
export const returnFloat = value => {
  let xsd = value.toString().split('.')
  if (xsd.length === 1) {
    value = value.toString() + '.000'
    return value
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 3) {
      value = value.toString() + '00'
    }
    if (xsd[1].length < 2) {
      value = value.toString() + '0'
    }
    return value
  }
}

/**
 * 获取查询参数
 * @returns {null}
 */
export const getSearch = () => {
  let [ search, searchObj ] = [ window.location.search, {} ]
  search = search.substr(1, search.length)
  searchObj = qs.parse(search)
  return searchObj
}

/**
 * 颜色值转换
 * @param color
 * @returns {string}
 */
export const colorToRgb = color => {
  if (!color) return;
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    let sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
    }
    sColorChange.push(1);
    return 'RGB(' + sColorChange.join(',') + ')';
  } else {
    return sColor;
  }
}
/**
 * 将颜色值转换到数组
 * @param color
 * @returns {*}
 */
export const colorToArray = color => {
  if (!color) return;
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    let sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
    }
    sColorChange.push(1);
    return sColorChange;
  } else {
    return sColor;
  }
}

/**
 * i查询结果处理
 * @param result
 * @param point
 * @returns {{}}
 */
export const sortIQueryData = (point, result) => {
  let wgs84Sphere = new ol.Sphere(6378137)
  let sourceProj = config.Maps.map.getView().getProjection()
  let object = {}
  object.allCount = 0
  object.features = []
  let arr = result.filter((element, index, array) => {
    if (element.data && element.data.length > 0) {
      return element.data.map((ele, _index, _array) => {
        let coord = [ele.longitude, ele.latitude];
        let c1 = ol.proj.transform(coord, sourceProj, 'EPSG:4326');
        let _point = ol.proj.transform(point, sourceProj, 'EPSG:4326');
        ele['distance'] = wgs84Sphere.haversineDistance(c1, _point);
        ele['zh'] = 'K' + parseInt(ele.zxzh) + '+' + (Number(ele.zxzh) - parseInt(ele.zxzh)).toFixed(3) * 1000
        ele['layerName'] = element['layer']['alias']
        return ele
      })
    }
  })
  arr.map((_item, _index) => {
    let items = _item['data'].map((item, index) => {
      return {
        attributes: item,
        geometry: [item.longitude, item.latitude],
        geometryType: 'Point'
      }
    })
    object.features = object.features.concat(items)
    return items
  })
  object.features.sort(function (a, b) {
    return a['attributes']['distance'] > b['attributes']['distance'] ? 1 : -1
  })
  object.allCount = object.features.length
  return object
}
/**
 * 经纬度转Mercator
 * @param lontitude
 * @param latitude
 * @returns {[*,*]}
 */
export const lonLatToMercator = (lontitude, latitude) => {
  let x = lontitude * 20037508.34 / 180;
  let y = Math.log(Math.tan((90 + latitude) * Math.PI / 360)) / (Math.PI / 180);
  y = y * 20037508.34 / 180;
  return [x, y];
}
/**
 * Mercator转经纬度
 * @param x
 * @param y
 * @returns {[*,*]}
 * @constructor
 */
export const MercatorTolonLat = (x, y) => {
  let longtitude = x / 20037508.34 * 180;
  let latitude = y / 20037508.34 * 180;
  latitude = 180 / Math.PI * (2 * Math.atan(Math.exp(latitude * Math.PI / 180)) - Math.PI / 2);
  return [longtitude, latitude];
}
/**
 * 转换坐标
 * @param geom
 * @returns {*}
 */
export const transGeometry = (geom) => {
  try {
    if (geom) {
      let [ geometry, coor ] = [ null, null ];
      if (geom instanceof ol.geom.Geometry) {
        geometry = geom;
      } else if (Array.isArray(geom)) {
        geometry = new ol.geom.Point(geom);
      } else {
        geometry = new ol.format.WKT().readGeometry(geom);
      }
      return geometry.getCoordinates();
    } else {
      return []
    }
  } catch (e) {
    console.log(e)
  }
}

export const getIdFromAttr = (attr, layerName) => {
  try {
    let id = ''
    if (attr && layerName) {
      let layerConfig = config.layerConfig.getLayerConfigByLayerName(layerName);
      id = attr[layerConfig['keyWord']]
    }
    return id
  } catch (e) {
    console.log(e)
  }
}
/**
 * 获取layerName
 * @param attr
 * @param tableName
 * @returns {string}
 */
export const getLayerNameFromAttr = (attr, tableName) => {
  try {
    let layerName = ''
    if (attr) {
      layerName = attr['layerName']
      if (!layerName) {
        let layerConfig = config.layerConfig.getLayerConfigBytableName(tableName)
        if (layerConfig && layerConfig['layerName']) {
          layerName = layerConfig['layerName']
        }
      }
    }
    return layerName
  } catch (e) {
    console.log(e)
  }
}
/**
 * 根据tableName获取layerName
 * @param tableName
 * @returns {string}
 */
export const getLayerNameByTableName = (tableName) => {
  try{
    let layerName = ''
    let layerConfig = config.layerConfig.getLayerConfigBytableName(tableName)
    if (layerConfig && layerConfig['layerName']) {
      layerName = layerConfig['layerName']
    }
    return layerName
  } catch (e) {
    console.log(e)
  }
}
/**
 * 通过要素获取layerName
 * @param feat
 */
export const getLayerNameByFeat = feat => {
  try {
    let layerName = '';
    // 属性和配置内容
    if (feat && feat instanceof ol.Feature) {
      layerName = (feat.get('layerName') ? feat.get('layerName') : ((feat.getProperties() && feat.getProperties().hasOwnProperty('layerName')) ? feat.getProperties()['layerName'] : ''));
      if (!layerName && feat.get('params') && feat.get('params').hasOwnProperty('layerName')) {
        layerName = feat.get('params')['layerName'];
      }
    }
    // 通过tableName查找
    if (!layerName && feat instanceof ol.Feature) {
      let tableName = ((feat.getProperties() && feat.getProperties().hasOwnProperty('tableName')) ? feat.getProperties()['tableName'] : '');
      if (tableName) {
        let layerConfig = config.layerConfig.getLayerConfigBytableName(tableName);
        if (layerConfig && layerConfig['layerName']) {
          layerName = layerConfig['layerName']
        }
      }
    }
    // 通过所在图层查找
    if (!layerName && config.Maps.getLayerByFeatuer(feat)) {
      layerName = config.Maps.getLayerByFeatuer(feat).get('layerName');
    }
    return layerName
  } catch (error) {
    console.log(error)
  }
}
/**
 * 获取标记气泡
 * @returns {string}
 */
export const getMarkPopupOverContextTemplate = () => {
  let bjedit = "<div' style='display: block;'>" +
    "<div style='width:100%;background:#fff;'>" +
    "<div class='hide'></div><div class='userSignIwBox'>" +
    "<div class='userSignIw'><div style='height:25px;'>" +
    "<input type='text' class='userSignIw-input' name='title' placeholder='标记名称' value=''>" +
    "<div class='userSignTip hide' ></div></div>" +
    "<div class='userTagCont'>" +
    "<textarea placeholder='备注信息' class='userTagCont-textarea'  name='content'  value=''></textarea>" +
    "<div class='userSignTip hide'></div></div>" +
    "<div style='overflow:hidden;clear:both;height:0;'></div>" +
    "<div class='biaoji-button'>" +
    "<input type='button' value='确定' class='iw_bt button-xz'>" +
    "<input type='button' value='取消'  class='iw_bt button-bxz'>" +
    "</div></div><div style='overflow:hidden;height:0;clear:both'></div></div></div></div>";
  return bjedit;
}
/**
 * 获取id
 * @returns {*|string|!Array.<T>}
 */
export const getuuid = () => {
  let [ s, hexDigits ] = [ [], '0123456789abcdef' ];
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  return (s.join(''));
}

export const appStore = () => {
  let vueInstance = null;
  if (MyVue && MyVue.$children && MyVue.$children[0]) {
    vueInstance = MyVue.$children[0].$store
  }
  return vueInstance
}

/**
 * 获取当前主机地址
 * @returns {string}
 */
export const getRootPath = () => {
  let curWwwPath = window.document.location.href;
  let pos = curWwwPath.indexOf('#');
  let localhostPaht = curWwwPath.substring(0, pos);
  return (localhostPaht);
}
