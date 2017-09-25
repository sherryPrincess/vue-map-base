/**
 * Created by 张永平 on 2017/3/20.
 */

export default {
  methods: {
    /**
     * 文本高亮显示
     * @param value 文本内容
     * @param _input 查询内容
     * @param color 高亮颜色
     */
    filterText (value, _input, color) {
      if (value === undefined) return
      if (color === undefined) {
        return value.replace(new RegExp(_input, 'gm'), '<span style="color: #1b9dc8">' + _input + '</span>')
      } else {
        return value.replace(new RegExp(_input, 'gm'), '<span style="color: ' + color + '">' + _input + '</span>')
      }
    }
  }
}

