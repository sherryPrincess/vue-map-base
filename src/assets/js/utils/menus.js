export default class Menus {
  constructor (map) {
    this.menus = document.querySelector('#menus');
    this.mapDiv = document.getElementById('map');
    this.Maps = map;
    if (!map) {
      console.error("缺少地图对象！！")
    }
  }

  /**
   * 右键菜单显示
   * @param top
   * @param left
   */
  showMenus (top, left) {
    this.menus.onmousedown = function (e) {
      e.preventDefault()
    };
    this.menus.style.display = 'block';
    this.menus.style.top = top + 'px';
    this.menus.style.left = left + 'px';
    let aDoc = [this.mapDiv.offsetWidth, this.mapDiv.offsetHeight];
    let maxWidth = aDoc[0] - this.menus.offsetWidth;
    let maxHeight = aDoc[1] - this.menus.offsetHeight;
    (this.menus.offsetTop > maxHeight) && (this.menus.style.top = maxHeight + 'px');
    (this.menus.offsetLeft > maxWidth) && (this.menus.style.left = maxWidth + 'px');
  }

  /**
   * 右键菜单影藏
   */
  hideMenus () {
    this.menus.style.display = 'none';
  }

  /**
   * 鼠标事件
   */
  mouseEvent () {
    this.mapDiv.onmousedown = event => {
      if (this.Maps && this.Maps.map) {
        event.preventDefault();
        let menuPositon = null;
        if (event.button === 2) {
          let pixel = this.Maps.map.getEventPixel(event);
          let feature = this.Maps.map.forEachFeatureAtPixel(pixel, function (feature) {
            return feature;
          });
          // 当draw处于激活状态时候，取消右键显示
          if (this.Maps.draw && this.Maps.draw.getActive()) {
            return;
          }

          window.rightMenuClickPosition = this.Maps.map.getEventCoordinate(event);
          if ($(event.target).is("img")) {
            feature = {
              isOverLay: true
            }
          }
          window.ObservableObj.dispatchEvent({
            type: 'rightMenuFeature',
            originEvent: event,
            value: feature
          });
          menuPositon = this.Maps.map.getPixelFromCoordinate(window.rightMenuClickPosition);
          setTimeout(() => {
            this.showMenus(menuPositon[1], menuPositon[0]);
          },50)
        } else if (event.button === 0) {
          this.hideMenus();
        }
      }
    }
    this.getOverLayEvent();
  }

  /**
   * 添加overlay事件
   */
  getOverLayEvent () {
    window.ObservableObj.on('rightMenuEvt', event => {
      let feature = event.value;
      window.rightMenuClickPosition = feature.getGeometry().getCoordinates();
      window.ObservableObj.dispatchEvent({
        type: 'rightMenuFeature',
        value: feature
      });
      let menuPositons = this.Maps.map.getPixelFromCoordinate(window.rightMenuClickPosition);
      this.showMenus(menuPositons[1], menuPositons[0]);
    });
  }
}
