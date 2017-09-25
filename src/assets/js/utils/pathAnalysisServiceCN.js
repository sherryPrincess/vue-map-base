export default class PathAnalysisServiceCN {
  /**
   * 翻译配置
   * @returns {[]}
   */
  translationConfig () {
    var self = this;
    var config = [
      {
        reg: /Make U-turn and go back/i,//Make U-turn at 金都大道 and go back
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return "掉头";
          }
          return null;
        },
        getDir: function (str) {
          return "右后";
        }
      },
      {
        reg: /Make U-turn at (.+) and go back/i,//Make U-turn at 金都大道 and go back
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return "向右后转弯，进入" + arr[1] + "行驶";
          }
          return null;
        },
        getDir: function (str) {
          return "右后";
        }
      },
      {
        reg: /Make U-turn and go back on (.+)/i,//Make U-turn and go back on 德安大道
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return "向右后转弯，进入" + arr[1] + "行驶";
          }
          return null;
        },
        getDir: function (str) {
          return "右后";
        }
      },
      {
        reg: /Turn (.+) at(.+)to stay on(.+)/i,
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return self.getDirection(arr[1]) + "转，上" + arr[2] + "沿" + arr[3] + "行驶";
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return self.getDirection(arr[1]) + "转";
        }
      },
      {
        reg: /Turn (.+) to stay on (.+)/i,//Turn left to stay on 朱桥东路
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return self.getDirection(arr[1]) + "转，进入" + arr[2];
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return self.getDirection(arr[1]) + "转";
        }
      },
      {
        reg: /Turn (.+) on(.+)and immediately turn ([left|right]+)/i,//Turn right and immediately turn left
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return self.getDirection(arr[1]) + "转进入" + arr[2] + "立即" + self.getDirection(arr[3]) + "转";
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return self.getDirection(arr[1]) + "转";
        }
      },
      {
        reg: /Turn (.+) on(.+)and immediately make sharp (.+) on (.+)/i,//Turn left on 八一大道 and immediately make sharp right on 孺子东路
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return self.getDirection(arr[1]) + "转进入" + arr[2] + ",立即" + self.getDirection(arr[3]) + "转进入" + arr[3];
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return self.getDirection(arr[1]) + "转";
        }
      },
      {
        reg: /Turn (.+) and immediately turn ([left|right]+) on (.+)/i,//Turn right and immediately turn right on 新梅路
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return self.getDirection(arr[1]) + "转后立即" + self.getDirection(arr[2]) + "进入" + arr[3];
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return self.getDirection(arr[1]) + "转";
        }
      },
      {
        reg: /Turn (.+) and immediately turn ([left|right]+)/i,//Turn right and immediately turn left
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return self.getDirection(arr[1]) + "转后立即" + self.getDirection(arr[2]) + "转";
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return self.getDirection(arr[1]) + "转";
        }
      },
      {
        reg: /Turn (.+) at (.+)/i,//Turn right at 西津支线2
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return self.getDirection(arr[1]) + "转上" + arr[2];
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return self.getDirection(arr[1]) + "转";
        }
      },
      {
        reg: /Go (.+) on (.+) toward (.+)/i,//Go east on 角山—细屋蔡 toward 新塘—马回岭  进入角山—细屋蔡，向东行驶至新塘—马回岭
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return "进入" + arr[2] + "靠" + self.getDirection(arr[1]) + "行驶至" + arr[3];
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return "靠" + self.getDirection(arr[1]);
        }
      },
      {
        reg: /Go (.+) on (.+)/i,//Go northeast on 汉桥—陈家山
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return "向" + self.getDirection(arr[1]) + "行驶至" + arr[2];
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return "靠" + self.getDirection(arr[1]);
        }
      },
      {
        reg: /Go (.+) toward(.+)/i,
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return "靠" + self.getDirection(arr[1]) + "前行进入" + arr[2];
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return "靠" + self.getDirection(arr[1]);
        }
      },
      {
        reg: /Go (.+)/i,//Go south
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return "向" + self.getDirection(arr[1]) + "行驶";
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return "向" + self.getDirection(arr[1]);
        }
      },
      {
        reg: /Continue on(.+)/i,
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return "直行进入" + arr[1];
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return "直行";
        }
      },
      {
        reg: /Turn (.+) on(.+)/i,
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return self.getDirection(arr[1]) + "转进入" + arr[2];
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return self.getDirection(arr[1]) + "转";
        }
      },
      {
        reg: /Bear (.+) at (.+) to stay on (.+)/i,//Bear left at 仕江口-岭下 to stay on 高塘—三都
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return "靠" + self.getDirection(arr[1]) + "前行，上" + arr[2] + "沿" + arr[3] + "行驶";
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return "靠" + self.getDirection(arr[1]);
        }
      },
      {
        reg: /Bear (.+) to stay on (.+)/i,//Bear left to stay on 长征大道
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return "靠" + self.getDirection(arr[1]) + "前行,进入" + arr[2];
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return "靠" + self.getDirection(arr[1]);
        }
      },
      {
        reg: /Bear (.+) on(.+)/i,
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return "靠" + self.getDirection(arr[1]) + "前行进入" + arr[2];
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return "靠" + self.getDirection(arr[1]);
        }
      },
      {
        reg: /Bear (.+)/i,
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return "靠" + self.getDirection(arr[1]) + "前行";
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return "靠" + self.getDirection(arr[1]);
        }
      },
      {
        reg: /Make sharp (.+) to stay on (.+)/i,//Make sharp right to stay on 临江互通
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return self.getDirection(arr[1]) + "后转弯沿" + arr[2] + "行驶";
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return self.getDirection(arr[1]) + "后";
        }
      },
      {
        reg: /Make sharp (.+) and immediately make sharp (.+) on (.+)/i,//Make sharp right and immediately make sharp left on 石境-镇岗
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return self.getDirection(arr[1]) + "转，立即" + self.getDirection(arr[2]) + "转，进入" + arr[3];
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return self.getDirection(arr[1]);
        }
      },
      {
        reg: /Make sharp (.+) and immediately make sharp (.+)/i,//Make sharp right and immediately make sharp left
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return self.getDirection(arr[1]) + "转，立即" + self.getDirection(arr[2]) + "转";
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return self.getDirection(arr[1]);
        }
      },
      {
        reg: /Make sharp (.+) on(.+)/i,
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return self.getDirection(arr[1]) + "后转弯进入" + arr[2];
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return self.getDirection(arr[1]) + "后";
        }
      },
      {
        reg: /Make sharp (.+) at(.+)/i,
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return self.getDirection(arr[1]) + "后转弯进入" + arr[2];
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return self.getDirection(arr[1]) + "后";
        }
      },
      {
        reg: /Make sharp (.+)/i,//Make sharp left
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return self.getDirection(arr[1]) + "转";
          }
          return null;
        }, getDir: function (str) {
        var arr = this.reg.exec(str);
        return self.getDirection(arr[1]) + "转";
      }
      },
      {
        reg: /Turn (.+)/i,
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return self.getDirection(arr[1]) + "转";
          }
          return null;
        },
        getDir: function (str) {
          var arr = this.reg.exec(str);
          return self.getDirection(arr[1]) + "转";
        }
      },
      {
        reg: /Continue/i,
        format: function (str) {
          var arr = this.reg.exec(str);
          if (arr) {
            return "直行";
          }
          return null;
        },
        getDir: function (str) {
          return "直行";
        }
      }
    ];
    return config;
  }

  /**
   * 描述翻译
   * @param direction
   * @returns {{}}
   */
  directionTranslation (direction) {
    let o = {};
    o["english"] = direction;
    let config = this.translationConfig();
    for (let i = 0; i < config.length; i++) {
      let newStr = config[i].format(direction);
      if (newStr) {
        // console.info(direction+" 匹配到的正则是 "+config[i].reg);
        o["chinese"] = newStr;
        if (config[i].getDir) {
          let dir = config[i].getDir(direction);
          if (dir) {
            o["dir"] = dir;
          }
        }
        break;
      }
    }
    return o;
  }

  /**
   * 获取描述信息
   * @param dir
   * @returns {*}
   */
  getDirection (dir) {
    if (dir == 'left') {
      return "左";
    } else if (dir == 'right') {
      return "右";
    } else if (dir == 'east') {
      return "东";
    } else if (dir == 'south') {
      return "南";
    } else if (dir == 'west') {
      return "西";
    } else if (dir == 'north') {
      return "北";
    } else if (dir == 'southeast') {
      return "东南";
    } else if (dir == 'southwest') {
      return "西南";
    } else if (dir == 'northeast') {
      return "东北";
    } else if (dir == 'northwest') {
      return "西北";
    } else {
      return dir;
    }
  }
}
