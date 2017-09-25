<template lang="html">
  <div class="menus" id="menus">
    <ul>
      <li v-for="c in menusConfig" :class="{true: 'sub-wrap'}[c.sub != null]">
        <span class="menus-iconfont" :class="c.icon" @click="menusClick(c.alias)">{{c.name}}</span>
        <ul v-if="c.sub != null" class="sub-menus">
          <li v-for="s in c.sub">
            <span class="menus-iconfont" :class="s.icon" @click="menusClick(s.alias)">{{s.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
  .menus {
    z-index: 1;
    position: absolute;
    display: none;
    span {
      display: block!important;
    }
    /*transition: none;*/
    .menus-iconfont {
      font-family: "iconfont" !important;
      font-size: 13px;
      font-style: normal;
      color: #585858;
    }
    .menus-iconfont:before {
      margin-right: 15px;
      color: #1b9dc8;
    }
    ul {
      border: 1px solid #bcbcbc;
      background: #fff;
    }
    li {
      height: 40px;
      line-height: 40px;
      width: 160px;
      cursor: pointer;
      .groups {
        border-top: 1px solid #dbeef8;
      }
      > span {
        display: block;
        padding: 0 10px;
      }
      &:hover {
        > span {
          background: #dbeef8;
          color: #1b9dc8;
        }
      }
    }
    .sub-wrap {
      position: relative;
      background-repeat: no-repeat;
      background-position: 95% center;
      .sub-menus {
        display: none;
        position: absolute;
        left: 100%;
        top: 0;
      }
      &:hover {
        .sub-menus {
          display: block;
        }
      }
    }
  }
</style>
<script>
  import {mapState} from 'vuex'
  export default {
    mounted () {
      var menu = new ol.control.ContextMenu({
        itemWidth: 130,
        itemHeight: 30,
        items: [
          {
            name: '测距',
            alias: 'measureLength',
            iconType: 'iconfont',
            icon: 'icon-ceju',
            iconColor: '#398DF5',
            callback: callbackFunc
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
      config.Maps.addControl(menu)
      var callbackFunc = function (event, data) {
        console.log(event, data)
      }
      menu.on('item-click', function (event, data) {
        console.log(event, data)
      })
    },
    data () {
      return {
        currentFeat: null,
        currMarkerId: '',
        menusConfig: [
          {

          }
        ]
      }
    },
    computed: {
      ...mapState({
      })
    },
    methods: {
      menusClick (item) {
        if (typeof (item) !== 'undefined') {
          console.log(item)
          this.menus.hideMenus()
        }
      }
    }
  }
</script>
