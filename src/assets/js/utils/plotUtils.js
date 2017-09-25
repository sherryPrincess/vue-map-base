/**
 * 标绘
 * @param type
 */
export const addFeature = type => {
  if (type !== '') {
    let plotType = config.markConfig.getMarkConfigByType(type).plotType;
    let toolType = 'addPoint';
    switch (type) {
      case '标题':
        toolType = 'addTitle';
        break;
      case '气泡':
        toolType = 'addTextArea';
        break;
      case '目标':
        toolType = 'addPoint';
        break;
      case '三角旗帜':
        toolType = 'addPoint';
        break;
      case '线':
      case '矩形':
      case '多边形':
      case '圆形':
      case '集结地':
      case '直箭头':
      case '斜箭头':
      case '双箭头':
        toolType = 'drawPlot';
        break
    }
    if (toolType) {
      config.Maps.activeTool(toolType, {
        moveable: true,
        plotType: plotType,
        isPlot: true,
        featureType: type,
        layerName: config.tempLayer.plotDrawLayer
      })
    }
  }
};

/**
 * 获取回填样式
 * @param feat
 * @returns {{backgroundColor: string, opacity: *, borderColor: string, borderWidth: (number|undefined)}}
 */
export const getStyle = feat => {
  let style = feat.getStyle();
  if (!style) {
    style = config.Maps.getLayerByName(config.tempLayer.plotDrawLayer).getStyle()
  }
  if(style && style instanceof ol.style.Style){
    //面透明度
    let color = style.getFill();
    let rgba = color.getColor();
    let opacity = 1;
    if (Array.isArray(rgba)) {
      opacity = parseFloat(rgba[3])
    } else {
      opacity = parseFloat(rgba.split(',')[3])
    }
    //填充颜色
    let backgroundColor = handleBackgroundColor(style.getFill().getColor(), opacity);
    //边框线颜色
    let borderColor = getColor(style.getStroke().getColor());
    //边框线宽度
    let borderWidth = style.getStroke().getWidth();
    return {
      backgroundColor: backgroundColor,
      opacity: opacity * 10,
      borderColor: borderColor,
      borderWidth: borderWidth
    };
  }
};
/**
 * 格式化获取的样式
 * @param color
 * @returns {string}
 */
export const getColor = color => {
  let colorTarget = ol.color.asArray(color);
  colorTarget[3] = 1;
  return ol.color.asString(colorTarget);
};

/**
 * 处理背景颜色（背景颜色是和透明度组合得到的）
 * @param color
 * @param opacity
 * @returns {string}
 */
export const handleBackgroundColor = (color, opacity) => {
  if (!opacity) opacity = 1;
  let tempColor = ol.color.asArray(color);
  tempColor[3] = opacity;
  let currentColor = 'rgba(' + tempColor.join(',') + ')';
  return currentColor;
}

/**
 * 设置边框宽度
 * @param borderWidth
 */
export const setBorderWidth = borderWidth => {
  if (config.Maps.plotEdit.activePlot) {
    let style = config.Maps.plotEdit.activePlot.getStyle();
    if (!style) {
      style = config.Maps.getLayerByName(config.tempLayer.plotDrawLayer).getStyle()
    }
    let tempStyle = style.clone();
    let stroke = tempStyle.getStroke();
    stroke.setWidth(borderWidth);
    config.Maps.plotEdit.activePlot.setStyle(tempStyle)
  }
};
/**
 * 设置边框颜色
 * @param borderColor
 */
export const setBorderColor = borderColor => {
  if (config.Maps.plotEdit.activePlot) {
    let style = config.Maps.plotEdit.activePlot.getStyle();
    if (!style) {
      style = config.Maps.getLayerByName(config.tempLayer.plotDrawLayer).getStyle()
    }
    let tempStyle = style.clone();
    let stroke = tempStyle.getStroke();
    stroke.setColor(borderColor);
    config.Maps.plotEdit.activePlot.setStyle(tempStyle)
  }
};
/**
 * 设置透明度
 * @param opacity
 */
export const setOpacity = opacity => {
  if (config.Maps.plotEdit.activePlot) {
    let style = config.Maps.plotEdit.activePlot.getStyle();
    if (!style) {
      style = config.Maps.getLayerByName(config.tempLayer.plotDrawLayer).getStyle()
    }
    if (style) {
      let tempStyle = style.clone();
      let fill = tempStyle.getFill();
      let color = fill.getColor();
      if (color) {
        let tempColor = ol.color.asArray(color);
        tempColor[3] = opacity / 10;
        let currentColor = 'rgba(' + tempColor.join(',') + ')';
        fill.setColor(currentColor);
        config.Maps.plotEdit.activePlot.setStyle(tempStyle)
      }
    }
  }
};
/**
 * 设置背景颜色
 * @param backgroundColor
 */
export const setBackgroundColor = backgroundColor => {
  if (config.Maps.plotEdit.activePlot) {
    let style = config.Maps.plotEdit.activePlot.getStyle();
    if (!style) {
      style = config.Maps.getLayerByName(config.tempLayer.plotDrawLayer).getStyle()
    }
    let tempStyle = style.clone();
    let fill = tempStyle.getFill();
    let color = fill.getColor();
    if (color) {
      let tempColor = ol.color.asArray(color);
      let _color = ol.color.asArray(backgroundColor)
      let currentColor = handleBackgroundColor(_color, tempColor[3]);
      fill.setColor(currentColor);
      config.Maps.plotEdit.activePlot.setStyle(tempStyle)
    }
  }
};
