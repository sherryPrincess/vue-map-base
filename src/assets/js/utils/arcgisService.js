import * as api from '../../../store/api'
const sphare = new ol.Sphere(6378137)
/**
 * 获取范围内的空间信息
 * @param point
 */
export const loadFeaturesByCircle = (point, type) => {
  let params = getParams(point);
  let layerConfig = config.layerConfig.getLayerConfigByLayerName(type)
  let layerName = null;
  if (layerConfig && layerConfig['tableName']) {
    layerName = layerConfig['tableName']
  } else {
    console.error('图层未配置')
    return false
  }
  api.arcgisServices(params, layerName).then(res => {
    let lines = res;
    if (lines) {
      lines = lines.map(ele => {
        if (ele['attributes'] && ele['attributes']['OBJECTID']) {
          ele['attributes']['id'] = ele['attributes']['OBJECTID']
        }
        return ele
      })
      if (lines && lines && lines.length > 0) {
        config.Maps.addPolylines([lines[0]], {
          layerName: type,
          showStyle: true,
          selectable: true
        })
      }
    }
  })
}
/**
 * 获取查询参数
 * @param point
 * @returns {object}
 */
export const getParams = point => {
  let where = '1=1'
  let geometry = getParamsGeometry(point)
  let params = {
    where: where,
    geometry: JSON.stringify(geometry),
    returnCountOnly: false,
    geometryType: 'esriGeometryPolygon',
    returnGeometry: true,
    spatialRel: 'esriSpatialRelCrosses',
    outFields: '*',
    returnZ: false,
    returnM: false,
    f: 'pjson'
  }
  return params
}
/**
 * 获取空间参数
 * @param point
 * @returns {{rings, spatialReference: {wkid}}}
 */
export const getParamsGeometry = point => {
  let radius = transformRadius(point, 1000)
  let circle = new ol.geom.Circle(point, radius)
  /* eslint-disable new-cap */
  let polygon = new ol.geom.Polygon.fromCircle(circle)
  let coors = polygon.getCoordinates()
  let geometry = {
    rings: coors,
    spatialReference: {
      wkid: getProjection()
    }
  }
  return geometry
}
/**
 * 半径转换
 * @param center
 * @param meterRadius
 * @returns {number}
 */
export const transformRadius = (center, meterRadius) => {
  let transformRadiu = 0
  let proj = getProjection()
  switch (proj) {
    case '4326':
      let lastcoord = sphare.offset(center, meterRadius, (270 / 360) * 2 * Math.PI)
      let dx = center[0] - lastcoord[0]
      let dy = center[1] - lastcoord[1]
      transformRadiu = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
      break
    case '3857':
    case '102100':
      transformRadiu = meterRadius
      break
  }
  return transformRadiu
}
/**
 * 获取当前投影
 */
export const getProjection = () => {
  let proj = config.Maps.map.getView().getProjection().getCode()
  return proj.split(':')[1]
}
/**
 * 获取SQL参数
 * @param params
 * @returns {string}
 */
export const getWhere = params => {
  let where = ''
  return where;
}
/**
 * 加载路线空间信息
 * @param params
 */
export const loadFeaturesByParams = params => {
  let where = this.getWhere(params);
  let _params = {
    where: where,
    // geometry: JSON.stringify(geometry),
    returnCountOnly: false,
    geometryType: 'esriGeometryPolygon',
    returnGeometry: true,
    spatialRel: 'esriSpatialRelCrosses',
    outFields: '*',
    returnZ: false,
    returnM: false,
    f: 'pjson'
  }
  api.arcgisServices(_params, params['layerName']).then(res => {
    console.log(res)
  })
}
/**
 * 国高网按照路线范围定位
 * @param lxbm
 */
export const getLinesExtent = lxbm => {
  try {
    let params = {
      where: ('LXBM = \'' + lxbm + '\''),
      returnCountOnly: false,
      returnGeometry: true,
      spatialRel: 'esriSpatialRelCrosses',
      outFields: '*',
      returnZ: false,
      returnM: false,
      f: 'pjson'
    }
    api.arcgisServices(params, 'RoadExtent').then(lines => {
      if (lines && lines && lines.length > 0) {
        config.Maps.zoomByLineFeatures(lines)
      }
    })
  } catch (e) {
    console.log(e)
  }
}
