/**
 * Created by FDD on 2017/3/23.
 * @ desc: i查询相关（支持arcgis和mapServer）
 */

import * as api from '../../../store/api'

export const queryType = (type, event, queryType) => {
  switch (type) {
    case 'LINE':
      getLineDetail(event, queryType);
      break;
    case 'ROAD':
      getRoadDetail(event, queryType);
      break;
    case 'POINT':
      getFeatureDetail(event, queryType);
      break;
  }
}

export const getMapServerParams = () => {
  try {
    let mapZoom = config.Maps.map.getView().getZoom();
    let resolution = config.Maps.map.getView().getResolution();
    let coordinate = evt.coordinate;
    let point = new ol.geom.Point(coordinate);
    let extent = point.getExtent();
    let buf = ol.extent.buffer(extent, resolution * mapZoom);
    let minx = buf[0], miny = buf[1], maxx = buf[2], maxy = buf[3];
    let wkt = "POLYGON((" + minx + " " + miny + "," + minx + " " + maxy + "," + maxx + " " + maxy + "," + maxx + " " + miny + "," + minx + " " + miny + "))";
    let params = null;
    if (layerArr.length > 0) {
      params = {
        resolution: resolution,
        geometry: wkt,
        identityType: "all",
        layers: JSON.stringify(layerArr)
      };
    }
    return params;
  } catch (e) {
    console.log(e)
  }
}

export const getARcgisServerParams = (point) => {
  let where = '1=1'
  // let geometry = getBufferGeometry(point)
  let geometry = getParamsGeometry(point)
  let params = {
    where: where,
    geometry: JSON.stringify(geometry),
    returnCountOnly: false,
    geometryType: 'esriGeometryPolygon',
    returnGeometry: true,
    spatialRel: 'esriSpatialRelIntersects',
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
  let radius = transformRadius(point, 2000)
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

export const getBufferGeometry = point => {
  try {
    let mapZoom = config.Maps.map.getView().getZoom();
    let resolution = config.Maps.map.getView().getResolution();
    let coordinate = evt.coordinate;
    let point = new ol.geom.Point(coordinate);
    let extent = point.getExtent();
    let buf = ol.extent.buffer(extent, resolution * mapZoom);
    let geometry = {
      rings: buf,
      spatialReference: {
        wkid: getProjection()
      }
    }
    return geometry
  } catch (e) {
    console.log(e)
  }
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
 * i查询构造物
 * @param event
 * @param queryType
 */
export const getFeatureDetail = (event, queryType) => {
  if (queryType && queryType === 'arcgisRest') {
    console.info('查询ARCGIS服务');
  } else {
    console.info('查询GEOHASH服务');
    let coordinates = event.coordinate;
    if (coordinates && Array.isArray(coordinates)) {
      api.poiService(coordinates).then(res => {
        if (res['data'] && Array.isArray(res['data']) && res['data'].length > 0) {
          let data = sortAllData(res['data'], coordinates);
          if (data && data['features'] && data['features'].length > 0) {
            addPoint(data['features'][0]);
          }
        }
      })
    }
  }
}
/**
 * i查询路线
 * @param event
 * @param queryType
 */
export const getLineDetail = (event, queryType) => {
  try {
    let coordinates = event.coordinate;
    if (coordinates && Array.isArray(coordinates)) {
      let params = getARcgisServerParams(coordinates);
      api.arcgisServices(params, 'LX_Identify').then(res => {
        let lines = [];
        if (res && Array.isArray(res) && res.length > 0) {
          lines = res.map(ele => {
            if (ele['attributes'] && ele['attributes']['OBJECTID']) {
              ele['attributes']['id'] = ele['attributes']['OBJECTID']
            }
            return ele
          })
          if (lines && lines && lines.length > 0) {
            config.Maps.addPolylines([lines[0]], {
              layerName: 'GIS_LX',
              showStyle: true,
              selectable: true
            })
          }
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}
/**
 * i查询路段
 * @param event
 * @param queryType
 */
export const getRoadDetail = (event, queryType) => {
  try {
    let coordinates = event.coordinate;
    if (coordinates && Array.isArray(coordinates)) {
      let params = getARcgisServerParams(coordinates);
      api.arcgisServices(params, 'GL_NB_GS').then(res => {
        let lines = [];
        if (res && Array.isArray(res) && res.length > 0) {
          lines = res.map(ele => {
            if (ele['attributes'] && ele['attributes']['OBJECTID']) {
              ele['attributes']['id'] = ele['attributes']['OBJECTID']
            }
            return ele
          })
          if (lines && lines && lines.length > 0) {
            config.Maps.addPolylines([lines[0]], {
              layerName: 'GIS_LD',
              showStyle: true,
              selectable: true
            })
          }
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}
/**
 * 添加i查询点要素
 * @param point
 */
export const addPoint = (point) => {
  try {
    let layerName = point['attributes']['layerName'];
    if (layerName) {
      let _c = config.markConfig.getMarkConfigByEtype(layerName);
      point['attributes']['imgSrc'] = _c['imgURL'];
      point['attributes']['imgSrcHover'] = _c['hover']
      point['attributes']['isRightMenusSearch'] = true
    }
    config.Maps.addTypePoints([point], '', {
      layerName: layerName,
      disZoomToExtent: true
    })
    config.Maps.map.getView().setCenter(point['geometry'])
  } catch (e) {
    console.log(e)
  }
}

/**
 * 对所有数据排序
 * @param result
 * @param point
 * @returns {{}}
 */
export const sortAllData = (result, point) => {
  try {
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
  } catch (error) {
    console.log(error)
  }
}


