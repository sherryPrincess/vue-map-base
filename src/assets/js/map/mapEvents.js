import * as popouWin from '../utils/showPopupWin'
import * as utils from '../utils/utils'
export default class MapEvents {
  constructor() {
    this.timer = null
  }

  initEvents() {
    if (config.Maps && config.Maps.map) {
      window.ObservableObj.on('overlayEvent', event => {
        this.onMouseOverlayClick(event)
      })
      window.ObservableObj.on('clickFeatEvent', event => {
        this.onMouseFeatClick(event)
      })
      window.ObservableObj.on('singleClickEvent', event => {
        this.showEditor(event)
      })
    } else {
      this.timer = null;
      this.timer = setInterval(() => {
        if (config.Maps && config.Maps.map) {
          clearInterval(this.timer)
          this.initEvents()
        }
      }, 500)
    }
  }

  onMouseFeatClick(event) {
    let [current, feat, coordinate, layerName] = [event.value, null, null, null];
    if (current) {
      feat = current;
    } else {
      return false;
    }
    if (feat) {
      if (feat.getGeometry() instanceof ol.geom.Point) {
        coordinate = feat.getGeometry().getCoordinates();
      }
      layerName = utils.getLayerNameByFeat(feat);
      config.variables.feature = null;
      config.variables.feature = feat;
      switch (layerName) {
        case 'GIS_QL':
        case 'GIS_SD':
        case 'GIS_CRK':
        case 'GIS_JDZ':
        case 'GIS_SXT':
        case 'GIS_JYZ':
        case 'GIS_SFZ':
        case 'GIS_FWQ':
        case 'GIS_DK':
        case 'GIS_ZCZ':
        case 'GIS_GT':
        case 'GIS_KYZ':
        case 'V_GL_BLOCK_TEMP':
          this.showPopup(coordinate, feat.getProperties(), layerName, [-34, -5])
          break;
        case 'GIS_LD':
        case 'GIS_LX':
          popouWin.showPopupWindow(event.originEvent.coordinate, {
            offset: [-162, -176],
            layerName: layerName,
            isCenter: true,
            id: 'line-popup',
            attr: feat.getProperties()
          })
          break;
      }
    }
  }

  onMouseOverlayClick(event) {
    let [currentFeat, coordinate, layerName] = [event.value, null, null];
    if (currentFeat) {
      if (currentFeat.getGeometry() instanceof ol.geom.Point) {
        coordinate = currentFeat.getGeometry().getCoordinates();
      }
      layerName = utils.getLayerNameByFeat(currentFeat);
      if (layerName && coordinate) {
        config.variables.feature = null;
        config.variables.feature = currentFeat;
        switch (layerName) {
          case 'GIS_QL':
          case 'V_GL_BLOCK_TEMP':
          case 'GIS_SD':
          case 'GIS_CRK':
          case 'GIS_JDZ':
          case 'GIS_SXT':
          case 'GIS_JYZ':
          case 'GIS_SFZ':
          case 'GIS_FWQ':
          case 'GIS_DK':
          case 'GIS_ZCZ':
          case 'GIS_GT':
          case 'GIS_KYZ':
            this.showPopup(coordinate, currentFeat.getProperties(), layerName)
            break
          case 'ydRank':
            this.showPopup(coordinate, currentFeat.getProperties(), layerName, [-5, -35])
            break;
        }
      }
    }
  }

  showPopup(coor, attr, layerName, offset) {
    let id = (attr['id'] ? attr['id'] : (attr['ID'] ? attr['ID'] : attr['params']['id']))
    popouWin.showPopupWindow(coor, {
      offset: (offset ? offset : [-34, -15]),
      layerName: layerName,
      id: id,
      isCenter: true,
      text: attr['title'] ? attr['title'] : '',
      attr: attr,
      showDetailTool: true,
      isRightMenusSearch: (attr.hasOwnProperty('isRightMenusSearch') ? attr['isRightMenusSearch'] : false), // 用于判断是否右键查询
      type: attr.pageType ? attr.pageType : null
    })
  }

  showEditor(event) {
    let coordinate = event.originEvent.coordinate;
    popouWin.showPopupWindow(coordinate, {
      offset: [-33, 10],
      layerName: 'editor',
      id: (utils.getuuid()),
      isCenter: false
    })
  }
}
