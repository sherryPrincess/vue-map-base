import * as PopupUtil from '../../../components/common/popups/index'
import * as modulePop from '../../../components/common/popups/popups'
export const showPopupWindow = (coords, params) => {
  let obj = {}, offset = null;
  obj['content'] = getElement(params);
  params['positioning'] = 'bottom-center';
  obj['coordinate'] = coords;
  if (params['offset']) {
    offset = params.offset;
  }
  obj = $.extend(obj, params);
  if (!offset) {
    obj['opacity'] = 0;
  }
  if (params['layerName'] == 'editor') {
    config.Maps.showMarkPopup({
      offset: params['offset'],
      showMarkFea: true,
      id: params['id'],
      content: obj['content'],
      coordinate: obj['coordinate']
    });
  } else {
    if (coords && coords.length > 0 && Number(coords[0]) !== 0 && Number(coords[1]) !== 0) {
      $('#alert-content').remove()
      config.Maps.showPopup(obj, offset);
    } else {
      aleat(obj)
      if (config.Maps.popupOverlay) {
        config.Maps.map.removeOverlay(config.Maps.popupOverlay)
      }
      params['isCenter'] = false
    }
  }
  if (params['isCenter']) {
    let pixel = config.Maps.map.getPixelFromCoordinate(coords);
    pixel[1] = pixel[1] - 50;
    let coor_a = config.Maps.map.getCoordinateFromPixel(pixel);
    config.Maps.map.getView().setCenter(coor_a);
  }
}
export const getElement = (params) => {
  let element = '';
  switch (params['layerName']) {
    case 'GIS_QL':
    case 'V_GL_BLOCK_TEMP':
      PopupUtil.getPops('nomalPopup')
      params['showDetailTool'] = true // 是否显示详情工具
      element = PopupUtil.getPopupElement(params);
      break;
    case 'GIS_SXT':
      PopupUtil.getPops('videoPopup')
      element = PopupUtil.getPopupElement(params);
      break;
    case 'GIS_SD':
    case 'GIS_JDZ':
      PopupUtil.getPops('noImagesPopup')
      params['showDetailTool'] = true
      element = PopupUtil.getPopupElement(params);
      break;
    case 'GIS_CRK':
    case 'GIS_JYZ':
    case 'GIS_SFZ':
    case 'GIS_FWQ':
    case 'GIS_DK':
    case 'GIS_ZCZ':
    case 'GIS_GT':
    case 'GIS_KYZ':
      PopupUtil.getPops('noImagesPopup')
      params['showDetailTool'] = false
      element = PopupUtil.getPopupElement(params);
      break
    case 'editor':
      modulePop.getPops('editor')
      element = modulePop.getPopupElement(params)
      break;
    case 'GIS_LD':
    case 'GIS_LX':
      PopupUtil.getPops('linePopup')
      element = PopupUtil.getPopupElement(params);
      break;
    case 'GL_LCJC':
      PopupUtil.getPops('imagesPlayer')
      element = PopupUtil.getPopupElement(params);
      break
    case 'ydRank':
      PopupUtil.getPops('congestion')
      element = PopupUtil.getPopupElement(params);
      break;
  }
  return element;
}

export const aleat = obj => {
  $('#alert-content').remove()
  let element = obj['content']
  $(element).find('.popup-bottom').remove()
  let content = document.createElement('div')
  content.id = 'alert-content'
  content.appendChild(element)
  let mapContent = config.Maps.map.getTargetElement()
  $(mapContent).append(content)
}
