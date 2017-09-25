export default class ExtractPoints {
  getPoints (compresedGeometry) {
    this.nIndex = 0;
    let result = [];
    let dMultBy = this.extractInt(compresedGeometry);
    let nLastDiffX = 0;
    let nLastDiffY = 0;
    let nLength = compresedGeometry.length;// reduce call stack
    while (this.nIndex !== nLength) {
      // extract number
      let nDiffX = this.extractInt(compresedGeometry); // exception
      let nDiffY = this.extractInt(compresedGeometry); // exception
      // decompress
      let nX = nDiffX + nLastDiffX;
      let nY = nDiffY + nLastDiffY;
      let dX = nX / dMultBy;
      let dY = nY / dMultBy;
      // add result item
      let point = [];
      point.push(dX);
      point.push(dY);
      result.push(point); // memory exception
      // prepare for next calculation
      nLastDiffX = nX;
      nLastDiffY = nY;
    }
    return result;
  }
  extractInt (src) {
    let bStop = false;
    let result = '';
    let nCurrentPos = this.nIndex;
    while (!bStop) {
      let cCurrent = src[nCurrentPos];
      if (cCurrent === '+' || cCurrent === '-') {
        if (nCurrentPos !== this.nIndex) {
          bStop = true;
          continue;
        }
      }
      result += cCurrent; // exception
      nCurrentPos++;
      if (nCurrentPos == src.length) // check overflow
        bStop = true;
    }
    let nResult = Number.MIN_VALUE;
    if (result.length > 0) {
      nResult = this.fromStringRadix32(result);
      this.nIndex = nCurrentPos;
    }
    return nResult;
  }
  fromStringRadix32 (s) {
    let result = 0;
    for (let i = 1; i < s.length; i++) {
      let cur = s[i];
      if (cur >= '0' && cur <= '9')
        result = (result << 5) + cur.charCodeAt() - ('0').charCodeAt();
      else if (cur >= 'a' && cur <= 'v')
        result = (result << 5) + cur.charCodeAt() - ('a').charCodeAt() + 10;
    }
    if (s[0] == '-')
      result = -result;
    return result;
  }
}
