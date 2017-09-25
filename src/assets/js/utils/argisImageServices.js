import * as utils from '../../../assets/js/utils/utils'
export default class ArcgisImagesServices {
  constructor() {
    this.layerName = ''
  }

  /**
   * 获取图层配置
   * @param layerConfig
   * @returns {{}}
   */
  getParams(layerConfig) {
    try {
      let [params, thematicConfig] = [{}, {}];
      if (layerConfig['value'] && layerConfig['value'] != '') {
        params[layerConfig['fields']] = layerConfig['value']
      }
      if (layerConfig['layerName']) {
        thematicConfig = config.mapConfig.thematicLayers.getLayerConfigByLayerName(layerConfig['layerName']);
        if (layerConfig['where'] && thematicConfig) {
          params['layers'] = 'show:' + thematicConfig['layerId'];
          params['layerName'] = thematicConfig['layerName'];
          if (typeof thematicConfig['layerId'] === 'string') {
            const layerIds = thematicConfig['layerId'].split(',');
            let layersDefs = '';
            for (var i = 0; i < layerIds.length; i++) {
              layersDefs += layerIds[i] + ":" + layerConfig['where'] + ";";
            }
            params['layerDefs'] = layersDefs;
          } else {
            params['layerDefs'] = thematicConfig['layerId'] + ':' + layerConfig['where'];
          }
          params['layerUrl'] = config.service.ARCGIS_SERVICE + thematicConfig['serviceUrl'] + '/MapServer'
          // TODO FIX dynamicLayers
          if (layerConfig['dynamicInfo']) {
            params['dynamicLayers'] = this.getDynamicLayerConfig(layerConfig['dynamicInfo'], layerConfig['where'])
          }
        }
      }
      return params
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 获取样式字段
   * @param field
   * @returns {{field: *, uniqueValueInfos: Array}}
   */
  getColor(field) {
    let colors = {
      "CDSL_KEY": {
        "0": "#FFFFFF",
        "1": "#686868",
        "2": "#A900E6",
        "3": "#3DA675",
        "4": "#005CE6",
        "5": "#32608F",
        "6": "#9C9721",
        "7": "#A33E88",
        "8": "#30A32A",
        "9": "#E60000",
        "10": "#618038",
        "12": "#2428AB"
      },
      "JSDJ_KEY": {
        "10": "#FF0000", // 高速公路
        "11": "#0000FF", // 一级公路
        "12": "#FF00FF", // 二级公路
        "13": "#000000", // 三级公路
        "14": "#728944", // 四级公路
        "30": "#898FAB" // 等外公路
      },
      "MCLX_KEY": {
        "12": "#A80084",
        "11": "#002673", // 沥青混凝土
        "21": "#0084A8",
        "22": "#894444",
        "23": "#737300",
        "31": "#3AAB80",
        "32": "#AEB02E",
        "33": "#823872",
        "34": "#267300",
        "35": "#8400A8",
        "36": "#73004C"
      }
    };
    let [_color, _colorObj] = [[], colors[field]]
    for (let attr in _colorObj) {
      let item = utils.colorToArray(_colorObj[attr]);
      let obj = {
        value: Number(attr),
        color: item
      };
      _color.push(obj);
    }
    let dynamicInfo = {
      field: field,
      uniqueValueInfos: _color
    };
    return dynamicInfo;
  }

  /**
   * 获取动态图层参数
   * @param dynamicInfo
   * @param where
   * @returns {null}
   */
  getDynamicLayerConfig(dynamicInfo, where) {
    try {
      let [dynamicLayersParams, uniqueValueInfos] = [[], []];
      if (dynamicInfo && dynamicInfo['field'] && dynamicInfo['uniqueValueInfos']) {
        if (dynamicInfo['uniqueValueInfos'] && Array.isArray(dynamicInfo['uniqueValueInfos'])) {
          uniqueValueInfos = dynamicInfo['uniqueValueInfos'].map(item => {
            let object = {
              value: ((item['value'] ? item['value'] : "1") + ''),
              symbol: {
                type: "esriSLS",
                style: "esriSLSSolid",
                width: 4,
                color: [0, 255, 0, 255],
                outline: {
                  type: "esriSLS",
                  style: "esriSLSSolid",
                  width: (item['width'] ? item['width'] : 4),
                  color: [0, 255, 0, 255]
                }
              }
            };
            if (item['color'] && Array.isArray(item['color'])) {
              if (item['color'][3] <= 1) item['color'][3] = item['color'][3] * 255;
              object['symbol']['color'] = item['color']
            }
            return object;
          })
        }
        let dynamicLayersJson = [
          {
            id: 1,
            source: {
              type: "dataLayer",
              dataSource: {
                type: "table",
                dataSourceName: "GL_NB_GS", // TODO 注意dataSource和workspaceId
                workspaceId: "NBWorkspaceID"
              }
            },
            definitionExpression: where,
            drawingInfo: {
              renderer: {
                type: 'uniqueValue',
                field1: dynamicInfo.field,
                defaultSymbol: {
                  type: "esriSFS",
                  style: "esriSLSSolid",
                  color: [255, 0, 0, 255],
                  width: 5,
                  outline: {
                    type: "esriSLS",
                    style: "esriSLSSolid",
                    width: 5,
                    color: [255, 0, 0, 255]
                  }
                },
                uniqueValueInfos: uniqueValueInfos
              }
            }
          }
        ];
        dynamicLayersParams = JSON.stringify(dynamicLayersJson);
      }
      return dynamicLayersParams
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 加载arcgis专题图
   * @param layerConfig
   * @returns {boolean}
   */
  loadArcMapService(layerConfig) {
    if (!layerConfig || !layerConfig['layerName'] || layerConfig['layerName'] === '' || layerConfig['layerUrl'] === '') {
      console.info('传入的配置不对！')
      return false
    }
    if (this.layerName === layerConfig['layerName']) {
      this.removeArcMapTitle()
    } else {
      this.layerName = layerConfig['layerName']
    }
    let params = this.getParams(layerConfig);
    let url = params['layerUrl']
    let layer = new ol.layer.Tile({
      layerName: params['layerName'],
      isImage: true,
      source: new ol.source.TileArcGISRest({
        url: url,
        crossOrigin: '*',
        params: (function () {
          let params_ = JSON.parse(JSON.stringify(params))
          if (params_ && params_.hasOwnProperty('layerUrl')) {
            delete params_.layerUrl
          }
          if (params_ && params_.hasOwnProperty('layerName')) {
            delete params_.layerName
          }
          return params_
        })(),
        imageLoadFunction:function(imageTile, src) {
          imageTile.getImage().src = src;
        },
        wrapX: false
      })
    })
    if (layer) {
      config.Maps.map.addLayer(layer)
      config.Maps.OrderLayerZindex()
    }
  }

  /**
   * 移除专题图层
   */
  removeArcMapTitle(layerName) {
    config.Maps.removeTileLayerByLayerName((this.layerName || layerName))
    this.layerName = ''
  }
}
