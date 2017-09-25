/**
 * Created by FDD on 2017/2/24.
 * @desc 原作者 Wandergis <https://github.com/wandergis/coordtransform>
 * 在此基础上添加优化和处理，并改写为es6
 */
import Math from 'mathjs'
export const x_PI = 3.14159265358979324 * 3000.0 / 180.0;
export const PI = 3.1415926535897932384626; // PI
export const a = 6378245.0; // 北京54坐标系长半轴a=6378245m
export const ee = 0.00669342162296594323;
class CoordsTransform {
  /**
   * 转换纬度
   * @param lng
   * @param lat
   * @returns {number}
   */
  transformlat (lng, lat) {
    let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret
  }

  /**
   * 转换经度
   * @param lng
   * @param lat
   * @returns {number}
   */
  transformlng (lng, lat) {
    let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
  }

  /**
   * 判断坐标是否在国内（国外坐标不需转换）
   * @param lng
   * @param lat
   * @returns {boolean}
   */
  outOfChina (lng, lat) {
    // 纬度3.86~53.55,经度73.66~135.05
    return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
  }

  /**
   * 国测局J02（火星坐标系 (GCJ-02)）坐标转WGS84
   * @param lng
   * @param lat
   * @returns {[*,*]}
   */
  gcj02towgs84 (x, y) {
    let temp1 = Math.eval(x / 20037508.34)
    let longtitude = Math.chain(temp1).multiply(180).done()
    let temp2 = Math.eval(y / 20037508.34)
    let latitude = Math.chain(temp2).multiply(180).done()
    let temp3 = Math.eval(Math.chain(latitude).multiply(Math.PI).done() / 180)
    latitude = Math.chain(2).multiply(Math.atan(Math.exp(temp3))).subtract(Math.eval(Math.PI / 2)).done()
    latitude = Math.chain(Math.eval(180 / Math.PI)).multiply(latitude).done()
    return [longtitude, latitude]
  }

  /**
   * WGS84转国测局J02（火星坐标系 (GCJ-02)）
   * @param lng
   * @param lat
   * @returns {[*,*]}
   */
  wgs84togcj02 (lng, lat) {
    if (this.outOfChina(lng, lat)) {
      return [lng, lat]
    } else {
      let temp = Math.chain(lng).multiply(20037508.34).done()
      let x = Math.eval(temp / 180)
      let temp1 = Math.chain(lat).add(90).multiply(Math.PI).done()
      let temp2 = Math.eval(temp1 / 360)
      let temp3 = Math.eval(Math.PI / 180)
      let y = Math.log(Math.tan(temp2)) / temp3
      y = Math.eval(Math.chain(y).multiply(20037508.34) / 180)
      return [x, y]
    }
  }

  /**
   * 国测局J02（火星坐标系 (GCJ-02)）转百度坐标系
   * @param lng
   * @param lat
   * @returns {[*,*]}
   */
  gcj02tobd (lng, lat) {
    let z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    let theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    let bd_lng = z * Math.cos(theta) + 0.0065;
    let bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat]
  }

  /**
   * 百度坐标系转国测局J02（火星坐标系 (GCJ-02)）
   * @param bd_lon
   * @param bd_lat
   * @returns {[*,*]}
   */
  bdtogcj02 (bd_lon, bd_lat) {
    let x = bd_lon - 0.0065;
    let y = bd_lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
    let gg_lng = z * Math.cos(theta);
    let gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat]
  }
}
export default CoordsTransform
