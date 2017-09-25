<template>
  <div class="layout-wrap">
    <router-view></router-view>
  </div>
</template>

<script type="text/babel">

  export default {
    data () {
      return {
        legends: [
          {
            id: '1',
            name: '放大',
            alias: 'fangda'
          },
          {
            id: '2',
            name: '缩小',
            alias: 'suoxiao'
          },
          {
            id: '3',
            name: '漫游',
            alias: 'manyou'
          },
          {
            id: '4',
            name: '全图',
            alias: 'allMap'
          },
          {
            id: '5',
            name: '测距',
            alias: 'measureDis'
          },
          {
            id: '6',
            name: '测面',
            alias: 'measurePloy'
          },
          {
            id: '7',
            name: '全屏',
            alias: 'fullScreen'
          },
          {
            id: '8',
            name: '切换底图',
            alias: 'changeBaseLayer'
          },
          {
            id: '9',
            name: '打印',
            alias: 'printMap'
          },
          {
            id: '10',
            name: '标点overlay',
            alias: 'addPointOverlay'
          },
          {
            id: '11',
            name: '标点feature',
            alias: 'addPointFeature'
          },
          {
            id: '12',
            name: '标线',
            alias: 'addLine'
          },
          {
            id: '13',
            name: '标面',
            alias: 'addPolygon'
          },
          {
            id: '14',
            name: '清图',
            alias: 'clearMap'
          }
        ],
        baseLayer: true,
        layerType: 'vector',
        measureTool: '',
        layerSwitcher: ''
        // earth,panorama
      }
    },
    name: 'app',
    mounted () {
    },
    methods: {},
    components: {
    }
  }
</script>

<style lang="scss">
  body,div,span,ul,li{
    margin: 0;
    padding: 0;
    list-style-type:none;
  }
  .layout-wrap {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;

  }
</style>
