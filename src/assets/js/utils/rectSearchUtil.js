/**
 * Created by 张永平 on 2017/3/23.
 */
/**
 * 构建空间查询参数
 * @returns {Array|number}
 */
export const getMapQueryFeature = () => {
  try {
    let geom = config.Maps.getLastDrawInteractionGemotry();
    let params = '';
    if (geom) {
      params = config.Maps.getRadiusSquared([geom]);
      if (params) console.dir(params);
      let feature = new ol.Feature({
        geometry: config.Maps.getLastDrawInteractionGemotry()
      });
      let style = new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'rgba(255, 0, 0, 1)',
          width: 2,
          lineDash: [10, 10]
        })
      });
      feature.setStyle(style);
      let layer = config.Maps.getTempVectorLayer('rectSearchFeat', {
        layerName: 'rectSearchFeat',
        create: true,
        selectable: false
      });
      if (layer) {
        layer.getSource().clear();
        layer.getSource().addFeature(feature);
        config.Maps.zoomToExtent(params.extent, true);
      }
    }
    return params;
  } catch (e) {
    console.log(e)
  }
}

/**
 * 对所有数据排序
 * @param result
 * @param point
 */
export const hashDataHandle = (result, point) => {
  let wgs84Sphere = new ol.Sphere(6378137)
  let sourceProj = config.Maps.map.getView().getProjection()
  let arr = result.filter((element, index, array) => {
    if (element.data && element.data.length > 0) {
      return element.data.filter((ele, _index, _array) => {
        let coord = [ele.longitude, ele.latitude];
        let c1 = ol.proj.transform(coord, sourceProj, 'EPSG:4326');
        let _point = ol.proj.transform(point, sourceProj, 'EPSG:4326');
        ele['distance'] = wgs84Sphere.haversineDistance(c1, _point);
        ele['zh'] = 'K' + parseInt(ele.zxzh) + '+' + (Number(ele.zxzh) - parseInt(ele.zxzh)).toFixed(3) * 1000
        ele['layerName'] = element['layer']['alias']
        ele['isRightMenusSearch'] = true
        return ele
      })
    }
  })
  let data = arr.map((_item, _index) => {
    let items = _item['data'].map((item, index) => {
      return {
        attributes: item,
        geometry: [item.longitude, item.latitude],
        geometryType: 'Point'
      }
    })
    items.sort(function (a, b) {
      return a['attributes']['distance'] > b['attributes']['distance'] ? 1 : -1
    })
    return items
  })
  return data
}
/**
 * 根据图层获取列表数据
 * @param result
 * @param layerName
 * @returns {Array}
 */
export const getList = (result, layerName) => {
  try {
    let data = []
    if (result && layerName && Array.isArray(result)) {
      for (let i = 0; i < result.length; i++) {
        if (result[i] && result[i][0] && result[i][0]['attributes'] && result[i][0]['attributes']['layerName'] === layerName) {
          data = result[i]
          break;
        }
      }
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

/**
 * 添加点
 * @param current
 */
export const addPoints = (current) => {
  let _params = {
    layerName: 'rect',
    orderBy: true,
    isRightTool: true,
    icon: {
      className: 'icon-dingwei1',
      fontSize: '32px',
      color: ''
    }
  }
  config.Maps.removeOverlayByLayerName('rect')
  config.Maps.addTypePoints(current, 'overlay', _params)
}
