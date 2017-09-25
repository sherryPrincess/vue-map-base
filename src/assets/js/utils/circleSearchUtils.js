/**
 * 处理后的结果
 * @type {Array}
 */
export const handledData = []
/**
 * 获取周边搜索查询参数
 * @param items
 * @param coordinates
 * @param radius
 * @param excludeIds
 * @param keyword
 * @returns {{layerNames: *, longtitude: *, latitude: *, radius: *}}
 */
export const getCircleSearchParams = (items, coordinates, radius, excludeIds, keyword) => {
  let latitude
  let longtitude
  if (Array.isArray(coordinates)) {
    longtitude = coordinates[0];
    latitude = coordinates[1];
  } else if (coordinates instanceof ol.geom.Geometry) {
    let coor = coordinates.getGeometry().getCoordinates()
    longtitude = coor[0]
    latitude = coor[1]
  }
  let layerNames = getLayers(items)
  let _params = {
    layerName: layerNames,
    longtitude: longtitude,
    latitude: latitude,
    radius: radius
  }
  if (!!excludeIds && excludeIds !== '') {
    _params['ids'] = excludeIds
  }
  if (!!keyword && keyword !== '') {
    _params['keyword'] = keyword
  }
  return _params
}
/**
 * 获取图层参数
 * @param items
 * @returns {*}
 */
export const getLayers = items => {
  if (!items || items.length < 1) {
    return false;
  }
  let layers = "";
  items.forEach(function (item) {
    layers += item.layerName + ','
  });
  layers = layers.substr(0, layers.length - 1)
  return layers
}
/**
 * 根据图层和页面限制获取结果
 * @param layerName
 * @param page
 * @param limit
 * @returns {{total: Number}}
 */
export const getResult = (layerName, page, limit) => {
  let features = []
  if (layerName === undefined || layerName === null) {
    features = handledData
  } else {
    features = handledData.filter((element, index, array) => {
      return element.layer.alias === layerName
    })['features']
  }
  let result = {total: features.length}
  result['features'] = []
  result = features.filter((element, index, array) => {
    let st = (page - 1) * limit
    let end = (page * limit > array.length) ? (page * limit) : array.length
    for (let i = st; i < end; i++) {
      return element
    }
  })
  return result
}
/**
 * 处理当前数据
 * @param result
 * @param point
 */
export const handle = (result, point) => {
  let geoData = []
  let wgs84Sphere = new ol.Sphere(6378137)
  result.filter((element, index, array) => {
    if (element.data && element.data.length > 0) {
      let object = {}
      object.allCount = element.data.length
      object.features = []
      object.layer = element.layer
      element.data.filter((element, index, array) => {

      })
    }
  })
}
/**
 * 对所有数据排序
 * @param result
 * @param point
 */
export const sortAllData = (result, point) => {
  let wgs84Sphere = new ol.Sphere(6378137)
  let sourceProj = config.Maps.map.getView().getProjection()
  let object = {}
  object.allCount = 0
  object.features = []
  let arr = result.filter((element, index, array) => {
    if (element.data && element.data.length > 0) {
      return element.data.filter((ele, _index, _array) => {
        let coord = [ele.longitude, ele.latitude];
        let c1 = ol.proj.transform(coord, sourceProj, 'EPSG:4326');
        let _point = ol.proj.transform(point, sourceProj, 'EPSG:4326');
        ele['distance'] = wgs84Sphere.haversineDistance(c1, _point);
        ele['zh'] = 'K' + parseInt(ele.zxzh) + '+' + (Number(ele.zxzh) - parseInt(ele.zxzh)).toFixed(3) * 1000
        ele['layerName'] = element['layer']['alias']
        ele['layerDesc'] = element['layer']['layerDesc']
        ele['isRightMenusSearch'] = true
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
 * 处理当前点数据
 * @param _array
 * @param layerShow
 * @param styles
 */
export const mangerPointData = (_array, layerShow, styles) => {
  let current = _array.map(ele => {
    let currentStyle = styles.filter(element => {
      return element['objectid'] === ele['attributes']['id']
    })
    if (layerShow[ele.attributes['id']] !== undefined && !layerShow[ele.attributes['id']]) {
      ele['attributes']['icon'] = {
        className: 'icon-dingwei1',
        fontSize: '32px',
        color: '',
        opacity: 0
      }
      ele['attributes']['isMaked'] = false
    } else if (currentStyle && currentStyle[0] && currentStyle[0]['icon'] !== '') {
      ele['attributes']['icon'] = {
        className: currentStyle[0]['icon'],
        fontSize: currentStyle[0]['size'] + 'px',
        color: currentStyle[0]['color'],
        opacity: currentStyle[0]['opacity'],
        element: {
          className: 'maked-point',
          fontSize: currentStyle[0]['code'],
          borderColor: currentStyle[0]['borderColor'],
          text: ele['attributes']['name'],
          top: -currentStyle[0]['size'] + 'px',
          left: currentStyle[0]['size'] - 3 + 'px',
          borderWidth: currentStyle[0]['borderWidth'] + 'px'
        }
      }
      ele['attributes']['isMaked'] = true
    } else {
      ele['attributes']['icon'] = {
        className: 'icon-dingwei1',
        fontSize: '32px',
        color: '',
        opacity: 1
      }
      ele['attributes']['isMaked'] = false
    }
    return ele
  })
  if (current && current.length > 0) {
    addPoints(current)
  }
}

/**
 * 添加点
 * @param current
 */
export const addPoints = (current) => {
  let _params = {
    layerName: 'nearby',
    orderBy: true,
    isRightTool: true,
    icon: {
      className: 'icon-dingwei1',
      fontSize: '32px',
      color: ''
    }
  }
  config.Maps.removeOverlayByLayerName('nearby')
  config.Maps.addTypePoints(current, 'overlay', _params)
}

/**
 * 获取保存的颜色值
 * @param params
 * @returns {{}}
 */
export const mangerStyleParams = params => {
  let _params = {
    code: '12px',
    icon: params['icon'],
    img: "string",
    block_id: params['block_id'],
    objectid: params['id'],
    opacity: 1,
    size: 32,
    width: 0,
    height: 0,
    borderColor: '#08eb18',
    borderRadius: 0,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    color: '#08eb18',
  }
  return _params
}
/**
 * 设置当前要素样式
 * @param curPoint
 * @param currentStyle
 * @returns {[*]}
 */
export const setCurrentElement = (curPoint, currentStyle, index) => {
  let _params = {
    layerName: 'nearby',
    orderByNum: true,
    isRightTool: true,
    icon: {
      className: 'icon-dingwei1',
      fontSize: '32px',
      color: ''
    }
  }
  curPoint.attributes['icon'] = {
    className: currentStyle['icon'],
    fontSize: currentStyle['size'] + 'px',
    color: currentStyle['color'],
    opacity: currentStyle['opacity'],
    element: {
      className: 'maked-point',
      fontSize: currentStyle['code'],
      borderColor: currentStyle['borderColor'],
      text: curPoint['attributes']['name'],
      top: -currentStyle['size'] + 'px',
      left: currentStyle['size'] - 3 + 'px',
      borderWidth: currentStyle['borderWidth'] + 'px'
    }
  }
  curPoint.attributes['number'] = index.toString()
  let point = [curPoint]
  config.Maps.addTypePoints(point, 'overlay', _params)
  return point
}
/**
 * 删除成功后返回默认样式
 * @param curPoint
 */
export const setDefaultStyle = (curPoint, index) => {
  let _params = {
    layerName: 'nearby',
    orderByNum: true,
    isRightTool: true,
    icon: {
      className: 'icon-dingwei1',
      fontSize: '32px',
      color: ''
    }
  }
  curPoint.attributes['icon'] = {
    className: 'icon-dingwei1',
    fontSize: '32px',
    color: '',
    opacity: 1
  }
  curPoint.attributes['number'] = index.toString()
  let point = [curPoint]
  config.Maps.addTypePoints(point, 'overlay', _params)
}

export const getOverLayNum = id => {
  let point = config.Maps.map.getOverlayById(id)
  if (point && point instanceof ol.Overlay) {
    let ele = point.getElement()
    let num = $(ele).children("span").text()
    console.log(num)
    return num
  }
}

