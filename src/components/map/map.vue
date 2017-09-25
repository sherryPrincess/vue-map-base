<template>
  <div class="map-wrap">
    <div id="map"></div>
    <div class="map-tools">
      <ul>
        <li v-for="item in legends" @click="maptools(item.alias)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
  .map-wrap{
    #map{
      width: 100%;
      height: 100%;
    }
    .map-tools{
      position: absolute;
      right: 10px;
      bottom: 10px;
      ul li{
        width: 80px;
        height: 30px;
        background-color: #fff;
        padding-left: 10px;
        line-height: 30px;
        font-size: 14px;
        cursor: pointer;
        &:hover{
          color: #1b9de8;
        }
      }
    }
  }
</style>
<script>
  import * as api from '../../store/api'
  export default{
    props: {},
    data () {
      return {}
    },
    watch: {},
    mounted () {
      // 初始化地图
      this.initMap()
      // 单击事件
      this.clickEvent()
      // 右击事件
      this.rightClickEvent()
      // 添加交互
      this.addInteraction()
      // 地图切换
      this.changeBaseLayer()
    },
    methods: {
      initMap () {
        var Maps = new HMap.Map()
        Maps.initMap('map', config.mapConfig)
        config.Maps = Maps
      },
      clickEvent () {
        config.Maps.on('click', function (event) {
          console.log(event)
        })
      },
      rightClickEvent () {
        var menu = new ol.control.ContextMenu({
          itemWidth: 130,
          itemHeight: 30,
          items: [
            {
              name: '测距',
              alias: 'measureLength',
              iconType: 'iconfont',
              icon: 'icon-ceju',
              iconColor: '#398DF5'
            },
            {
              name: '测面',
              alias: 'measureArea',
              iconType: 'iconfont',
              icon: 'icon-cemian',
              iconColor: '#1AD3EF',
              showLine: true,
              items: [
                {
                  name: '测规则面',
                  alias: 'measureLength',
                  iconType: 'iconfont',
                  icon: 'icon-ceju',
                  iconColor: '#2994EF',
                  items: [
                    {
                      'name': '测规则面',
                      'alias': 'measureLength',
                      'iconType': 'iconfont',
                      'icon': 'icon-ceju',
                      'iconColor': '#2994EF'
                    },
                    {
                      'name': '测圆面',
                      'alias': 'measureLength',
                      'iconType': 'iconfont',
                      'icon': 'icon-ceju',
                      'iconColor': '#F05849'
                    },
                    {
                      'name': '测自由面',
                      'alias': 'measureLength',
                      'iconType': 'iconfont',
                      'icon': 'icon-ceju',
                      'iconColor': '#1AD3EF'
                    }
                  ]
                },
                {
                  name: '测圆面',
                  alias: 'measureLength',
                  iconType: 'iconfont',
                  icon: 'icon-ceju',
                  iconColor: '#F05849'
                },
                {
                  name: '测自由面',
                  alias: 'measureLength',
                  iconType: 'iconfont',
                  icon: 'icon-ceju',
                  iconColor: '#1AD3EF'
                }
              ]
            },
            {
              name: '清空地图',
              alias: 'clearMap',
              iconType: 'iconfont',
              icon: 'icon-map',
              iconColor: '#F05849'
            },
            {
              name: '搜周边',
              alias: 'circleSearch',
              iconType: 'iconfont',
              icon: 'icon-map1',
              iconColor: '#2994EF'
            }
          ]
        })
        config.Maps.map.addControl(menu)
        menu.on('item-click', function (event, data) {
          console.log(event.target.textContent, data)
        })
      },
      addInteraction () {
        this.measureTool = new ol.interaction.MeasureTool()
        config.Maps.map.addInteraction(this.measureTool)
      },
      maptools (alias) {
        switch (alias) {
          case 'fangda':
            config.Maps.map.getView().setZoom(config.Maps.map.getView().getZoom() + 1)
            break
          case 'suoxiao':
            config.Maps.map.getView().setZoom(config.Maps.map.getView().getZoom() - 1)
            break
          case 'manyou':
            break
          case 'allMap':
            config.Maps.map.getView().fit(config.mapConfig.baseLayers[0].tileGrid.fullExtent)
            break
          case 'fullScreen':
            if (!this.isFullScreen()) {
              this.fullScreen('map')
            } else {
              this.exitFullScreen()
            }
            break
          case 'measureDis':
            this.measureTool.setTool(true, 'measureLength', true)
            break
          case 'measurePloy':
            this.measureTool.setTool(true, 'measureArea', true)
            break
          case 'changeBaseLayer':
            if (this.baseLayer) {
              this.layerType = 'vector'
              this.baseLayer = false
            } else {
              this.layerType = 'openstreetmap'
              this.baseLayer = true
            }
            this.layerSwitcher.switcher('layerName', this.layerType)
            break
          case 'printMap':
            break
          case 'addPointOverlay':
            this.addPointOver()
            break
          case 'addPointFeature':
            this.addPointFeat()
            break
          case 'addLine':
            this.addLine()
            break
          case 'addPolygon':
            this.addPolygon()
            break
          case 'clearMap':
            config.Maps.removeAllLayer()
            break
        }
      },
      callback (result) {
        console.log('=------------------')
        console.log(result)
      },
      addPointOver () {
        api.getPoints().then(res => {
          let params = []
          let data = res
          for (let i = 0; i < data.length; i++) {
            data[i].attributes['selectStyle'] = {
              text: {
                text: i + 1 + '',
                textFont: '14px sans-serif',
                textOffsetX: -3,
                textOffsetY: 0,
                textStroke: {
                  strokeColor: '#FFFFFF',
                  strokeWidth: 1
                },
                textFill: {
                  fillColor: 'transparent'
                }
              },
              element: {
                className: 'icon-map2',
                fontSize: '32px',
                color: '#3385FF'
              }
            }
            data[i].attributes['style'] = {
              text: {
                text: i + 1 + '',
                textFont: '14px sans-serif',
                textOffsetX: -3,
                textOffsetY: 0,
                textStroke: {
                  strokeColor: '#FFFFFF',
                  strokeWidth: 1
                },
                textFill: {
                  fillColor: 'transparent'
                }
              },
              element: {
                className: 'icon-map2',
                fontSize: '32px',
                color: '#F00',
                selectColor: '#3385FF'
              }
            }
            data[i].attributes['number'] = i + ''
            params.push(data[i])
          }
          config.Maps.addOverlayPoints(params, {
            layerName: 'overlayList',
            zoomToExtent: true,
            selectable: true,
            orderByNum: true
          })
        })
      },
      addPointFeat () {
        api.getPoints().then(res => {
          let params = []
          let data = res
          for (let i = 0; i < data.length; i++) {
            data[i].attributes['selectStyle'] = {
              text: {
                text: i + 1 + '',
                textFont: '14px sans-serif',
                textOffsetX: -3,
                textOffsetY: 0,
                textStroke: {
                  strokeColor: '#FFFFFF',
                  strokeWidth: 1
                },
                textFill: {
                  fillColor: 'transparent'
                }
              },
              icon: {
                imageSrc: '/static/images/icon_position_hover.png',
                imageAnchor: [0.5, 0.5],
                imageOpacity: 1,
                imageAnchorXUnits: 'fraction',
                imageAnchorYUnits: 'fraction'
              },
              element: {
                className: 'icon-icon-map',
                fontSize: '32px',
                color: '#002F71'
              }
            }
            data[i].attributes['style'] = {
              text: {
                text: i + 1 + '',
                textFont: '14px sans-serif',
                textOffsetX: -3,
                textOffsetY: 0,
                textStroke: {
                  strokeColor: '#FFF',
                  strokeWidth: 1
                },
                textFill: {
                  fillColor: 'transparent'
                }
              },
              icon: {
                imageSrc: '/static/images/icon_position.png',
                imageAnchor: [0.5, 0.5],
                imageOpacity: 1,
                imageAnchorXUnits: 'fraction',
                imageAnchorYUnits: 'fraction'
              },
              element: {
                className: 'icon-map2',
                fontSize: '32px',
                color: '#FF0000',
                selectColor: '#3385FF'
              }
            }
            data[i].attributes['number'] = i + 1 + ''
            params.push(data[i])
          }
          config.Maps.addPoints(params, {
            layerName: 'questionsList',
            zoomToExtent: true,
            selectable: true
          })
        })
      },
      addLine () {
        api.getLines().then(res => {
          var data = res['data']['features']
          for (let i = 0; i < data.length; i++) {
            data[i]['attributes']['style'] = {
              stroke: {
                strokeWidth: 4,
                strokeColor: '#0000EE'
              }
            }
            data[i]['attributes']['selectStyle'] = {
              stroke: {
                strokeWidth: 6,
                strokeColor: '#E52929'
              }
            }
          }

          config.Maps.addPolylines(data, {
            layerName: 'test',
            selectable: true,
            zoomToExtent: true,
            view: {
              adjustExtent: true,
              adjust: 0.001,
              minWidth: 1,
              minHeight: 1
            }
          })
        })
      },
      addPolygon () {
        api.getPolygons().then(res => {
          var polygons = res['data']['features']
          config.Maps.addPolygons(polygons, {
            layerName: 'test',
            zoomToExtent: true
          })
        })
      },
      changeBaseLayer () {
        this.layerSwitcher = new ol.control.LayerSwitcher({
          itemWidth: 86,
          itemHeight: 60,
          layers: []
        })
        config.Maps.map.addControl(this.layerSwitcher)
        /* var config_ = [
         {
         layerName: 'GaoDe',
         name: '高德',
         icon: '../static/images/maptype_vector.png'
         },
         {
         layerName: 'OSM',
         name: 'OSM',
         icon: '../static/images/maptype_pano.png'
         },
         {
         layerName: 'Google',
         name: '谷歌',
         icon: '../static/images/maptype_yunran.png'
         }
         ]
         config.Maps.map.addControl(new ol.control.LayerSwitcher({
         itemWidth: 86,
         itemHeight: 60,
         layers: config_
         })) */
      },
      fullScreen (_id) {
        var docElm = document.getElementById(_id)
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {   // FireFox
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {   // Chrome
          docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {     // IE11
          docElm.msRequestFullscreen()
        }
      },
      exitFullScreen (state, type) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      },
      isFullScreen () {
        return document.webkitIsFullScreen || document.fullscreen || document.mozFullScreen || document.msFullscreenElement
      }
    },
    components: {}
  }
</script>
