'use strict';
define(['index','moment'], function (index,moment) {
  index
    .filter('to_html', ['$sce', function ($sce) {
      return function (text) {
        return $sce.trustAsHtml(text);
      }
    }])
    .filter('blockSubstr', [function () {
      return function (text) {
        if(text === undefined) return;
        return text.substr(text.lastIndexOf(";")+1,text.length);
      }
    }])
    .filter('zh', [function () {
      return function (text) {
        if(text === undefined) return;
        return text.toString().replace('.', '+')
      }
    }])
    .filter('subRoadName', [function () {
      return function (text) {
        try {
          if(text.indexOf('（') === -1) return text;
          return text.substr(0, text.indexOf('（'))
        }catch (e){

        }
      }
    }])
    .filter('zxzhChange',[function(){
      return function (text){
        try{
          var t = parseFloat(text);
          var tt = t.toString();
          var zxzhChange = tt.split('.');
          return 'K'+zxzhChange[0]+'+'+zxzhChange[1];
        }catch (e){

        }
      }
    }])

    .filter('DateFormat',[function(){
      return function (res) {
        try{
          if(res == null  || res == undefined) return
          if(res != '') {
           return moment(res).format("YYYY-MM-DD HH:mm:ss");
          }
        }catch (e){}

      }

    }])

});
