<template>
  <div class="test-wrap">
    <ul>
      <li v-for="item in list">{{item.name}}</li>
    </ul>
  </div>
</template>
<style lang="scss">
  .test-wrap{
    width: 100%;
    height: 100%;
  }
</style>
<script>
  import { mapState } from 'vuex'
  export default{
    props: {},
    data () {
      return {
        list: null
      }
    },
    mounted () {
    },
    computed: {
      ...mapState({
        testObj: state => state.warn.warnList
      })
    },
    watch: {
      'testObj': function (val) {
        console.log(val + '-----------------')
      }
    },
    methods: {}
  }
</script>
