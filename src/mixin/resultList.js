import * as api from '../store/api'
import router from '../router'

export default {
  beforeMount () {
    this.title = this.$route.query.layer
    this.mainTitle = config.title[this.title]
    if (this.navigation.alias === undefined) {
      this.$confirm('缺少关键参数, 请返回首页?', '提示', {
        showCancelButton: false,
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.goSearchIndex()
      }).catch(() => {
        this.goSearchIndex()
      })
    }
  },
  mounted () {
    let panelHeight = document.querySelector('.panel-body-scroll').offsetHeight - 71
    this.limit = Math.floor(panelHeight / 80)
    this.getList(this.title, {page: this.currentPage, rows: this.limit})
  },
  data () {
    return {
      title: '',
      mainTitle: '',
      data: [],
      limit: 0,
      count: 0,
      pagesLength: 4,
      currentPage: 1,
      loading: true
    }
  },
  methods: {
    getList (layerName, pager) {
      let params = {
        layerName: layerName,
        pager: pager,
        isReturnGeometry: 'true',
        spatialRel: 'INTERSECTS'
      }
      this.loading = true
      api.queryDetail(params).then(res => {
        this.data = res.data.data
        this.count = this.data.allCount
        this.loading = false
      })
    },
    goDetail () {
      router.push({name: 'searchDetailRoute', query: {layer: this.title}})
    },
    goSearchIndex () {
      let layerConfig = config.layerConfig.getLayerConfigBytableName(this.title)
      if (layerConfig && layerConfig['layerName']) {
        config.Maps.removeOverlayByLayerName(layerConfig['layerName'])
      }
      router.push('/search/index')
    },
    pageChange (page) {
      console.log(page)
      this.getList(this.title, {page: page, rows: this.limit})
    },
    sortChange (s) {
      console.log(s.lable)
    }
  }
}
