export default class Global {

  static getCity () {
    return {
      'region': [
        {
          'code': 'A',
          'name': '华北地区',
          'parent': '0',
          'ptx': 0,
          'pty': 0,
          'type': 1
        },
        {
          'code': 'B',
          'name': '华东地区',
          'parent': '0',
          'ptx': 0,
          'pty': 0,
          'type': 1
        },
        {
          'code': 'C',
          'name': '东北地区',
          'parent': '0',
          'ptx': 0,
          'pty': 0,
          'type': 1
        },
        {
          'code': 'D',
          'name': '华中地区',
          'parent': '0',
          'ptx': 0,
          'pty': 0,
          'type': 1
        }
      ],
      'province': [
        {
          'code': '500000',
          'name': '重庆市',
          'parent': 'F',
          'pinyin': 'zhongqingshi',
          'ptx': 107.874385,
          'pty': 30.057077,
          'spel': 'Z',
          'type': 2
        },
        {
          'code': '510000',
          'name': '四川省',
          'parent': 'F',
          'pinyin': 'sichuansheng',
          'ptx': 102.69281,
          'pty': 30.629146,
          'spel': 'S',
          'type': 2
        },
        {
          'code': '520000',
          'name': '贵州省',
          'parent': 'F',
          'pinyin': 'guizhousheng',
          'ptx': 106.87492,
          'pty': 26.815238,
          'spel': 'G',
          'type': 2
        }
      ],
      'city': [
        {
          'code': '520300',
          'name': '遵义市',
          'parent': '520000',
          'pinyin': 'zunyishi',
          'ptx': 107.0851,
          'pty': 28.168358,
          'spel': 'Z',
          'type': 3
        },
        {
          'code': '520200',
          'name': '六盘水市',
          'parent': '520000',
          'pinyin': 'liupanshuishi',
          'ptx': 104.659962,
          'pty': 25.870343,
          'spel': 'L',
          'type': 3
        },
        {
          'code': '520100',
          'name': '贵阳市',
          'parent': '520000',
          'pinyin': 'guiyangshi',
          'ptx': 106.706683,
          'pty': 26.840858,
          'spel': 'G',
          'type': 3
        },
        {
          'code': '522400',
          'name': '毕节地区',
          'parent': '520000',
          'pinyin': 'bijiediqu',
          'ptx': 105.213297,
          'pty': 27.066285,
          'spel': 'B',
          'type': 3
        }
      ],
      'county': [
        {
          'code': '522623',
          'name': '施秉县',
          'parent': '522600',
          'pinyin': 'shibingxian',
          'ptx': 108.142396,
          'pty': 27.068912,
          'spel': 'S',
          'type': 4
        },
        {
          'code': '522628',
          'name': '锦屏县',
          'parent': '522600',
          'pinyin': 'jinpingxian',
          'ptx': 109.122852,
          'pty': 26.563022,
          'spel': 'J',
          'type': 4
        },
        {
          'code': '522633',
          'name': '从江县',
          'parent': '522600',
          'pinyin': 'congjiangxian',
          'ptx': 108.712787,
          'pty': 25.820668,
          'spel': 'C',
          'type': 4
        },
        {
          'code': '522634',
          'name': '雷山县',
          'parent': '522600',
          'pinyin': 'leishanxian',
          'ptx': 108.144404,
          'pty': 26.340233,
          'spel': 'L',
          'type': 4
        }
      ]
    }
  }

  static trim (str) {
    if (str === '') {
      return ''
    }
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }

  static roadSearch () {
    return [
      {
        code: 'G',
        name: '国道',
        checked: false,
        child: [
          {
            code: 'H',
            name: '高速公路',
            checked: false
          },
          {
            code: '1',
            name: '一级公路',
            checked: false
          },
          {
            code: '2',
            name: '二级公路',
            checked: false
          },
          {
            code: '3',
            name: '三级公路',
            checked: false
          },
          {
            code: '4',
            name: '四级公路',
            checked: false
          },
          {
            code: '0',
            name: '等外公路',
            checked: false
          }
        ]
      },
      {
        code: 'S',
        name: '省道',
        checked: false,
        child: [
          {
            code: 'H',
            name: '高速公路',
            checked: false
          },
          {
            code: '1',
            name: '一级公路',
            checked: false
          },
          {
            code: '2',
            name: '二级公路',
            checked: false
          },
          {
            code: '3',
            name: '三级公路',
            checked: false
          },
          {
            code: '4',
            name: '四级公路',
            checked: false
          },
          {
            code: '0',
            name: '等外公路',
            checked: false
          }
        ]
      },
      {
        code: 'X',
        name: '县道',
        checked: false,
        child: [
          {
            code: 'H',
            name: '高速公路',
            checked: false
          },
          {
            code: '1',
            name: '一级公路',
            checked: false
          },
          {
            code: '2',
            name: '二级公路',
            checked: false
          },
          {
            code: '3',
            name: '三级公路',
            checked: false
          },
          {
            code: '4',
            name: '四级公路',
            checked: false
          },
          {
            code: '0',
            name: '等外公路',
            checked: false
          }
        ]
      },
      {
        code: 'Y',
        name: '乡道',
        checked: false,
        child: []
      },
      {
        code: 'C',
        name: '村道',
        checked: false,
        child: []
      },
      {
        code: 'Z',
        name: '专道',
        checked: false,
        child: [
          {
            code: 'H',
            name: '高速公路',
            checked: false
          }
        ]
      }
    ]
  }
}
