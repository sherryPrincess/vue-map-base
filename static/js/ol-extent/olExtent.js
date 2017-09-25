(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("olExtent", [], factory);
	else if(typeof exports === 'object')
		exports["olExtent"] = factory();
	else
		root["olExtent"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 220);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(46)('wks');
var uid = __webpack_require__(23);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeListener = exports.addListener = exports.getDomEventKey = exports.unlistenAll = exports.clear = exports.unListenByKey = exports.unListen = exports.listenOnce = exports.listen = exports.removeListeners = exports.getListenerMap = exports.getListeners = exports.findListener = exports.bindListener = undefined;

var _utils = __webpack_require__(4);

var bindListener = exports.bindListener = function bindListener(listenerObj) {
  var boundListener = function boundListener(evt) {
    var listener = listenerObj.listener;
    var bindTo = listenerObj.bindTo || listenerObj.target;
    if (listenerObj.callOnce) {
      unListenByKey(listenerObj);
    }
    return listener.call(bindTo, evt);
  };
  listenerObj.boundListener = boundListener;
  return boundListener;
};

var findListener = exports.findListener = function findListener(listeners, listener, optThis, optSetDeleteIndex) {
  var listenerObj = null;
  for (var i = 0, ii = listeners.length; i < ii; ++i) {
    listenerObj = listeners[i];
    if (listenerObj.listener === listener && listenerObj.bindTo === optThis) {
      if (optSetDeleteIndex) {
        listenerObj.deleteIndex = i;
      }
      return listenerObj;
    }
  }
  return undefined;
};

var getListeners = exports.getListeners = function getListeners(target, type) {
  var listenerMap = target.vlm;
  return listenerMap ? listenerMap[type] : undefined;
};

var getListenerMap = exports.getListenerMap = function getListenerMap(target) {
  var listenerMap = target.vlm;
  if (!listenerMap) {
    listenerMap = target.vlm = {};
  }
  return listenerMap;
};

var removeListeners = exports.removeListeners = function removeListeners(target, type) {
  var listeners = getListeners(target, type);
  if (listeners) {
    for (var i = 0, ii = listeners.length; i < ii; ++i) {
      target.removeEventListener(type, listeners[i].boundListener);
      clear(listeners[i]);
    }
    listeners.length = 0;
    var listenerMap = target.vlm;
    if (listenerMap) {
      delete listenerMap[type];
      if (Object.keys(listenerMap).length === 0) {
        delete target.vlm;
      }
    }
  }
};

var listen = exports.listen = function listen(target, type, listener, optThis, optOnce) {
  var listenerMap = getListenerMap(target);
  var listeners = listenerMap[type];
  if (!listeners) {
    listeners = listenerMap[type] = [];
  }
  var listenerObj = findListener(listeners, listener, optThis, false);
  if (listenerObj) {
    if (!optOnce) {
      listenerObj.callOnce = false;
    }
  } else {
    listenerObj = {
      bindTo: optThis,
      callOnce: !!optOnce,
      listener: listener,
      target: target,
      type: type
    };
    target.addEventListener(type, bindListener(listenerObj));
    listeners.push(listenerObj);
  }
  return listenerObj;
};

var listenOnce = exports.listenOnce = function listenOnce(target, type, listener, optThis) {
  return listen(target, type, listener, optThis, true);
};

var unListen = exports.unListen = function unListen(target, type, listener, optThis) {
  var listeners = getListeners(target, type);
  if (listeners) {
    var listenerObj = findListener(listeners, listener, optThis, true);
    if (listenerObj) {
      unListenByKey(listenerObj);
    }
  }
};

var unListenByKey = exports.unListenByKey = function unListenByKey(key) {
  if (key && key.target) {
    key.target.removeEventListener(key.type, key.boundListener);
    var listeners = getListeners(key.target, key.type);
    if (listeners) {
      var i = 'deleteIndex' in key ? key.deleteIndex : listeners.indexOf(key);
      if (i !== -1) {
        listeners.splice(i, 1);
      }
      if (listeners.length === 0) {
        removeListeners(key.target, key.type);
      }
    }
    clear(key);
  }
};

var clear = exports.clear = function clear(object) {
  for (var property in object) {
    delete object[property];
  }
};

var unlistenAll = exports.unlistenAll = function unlistenAll(target) {
  var listenerMap = getListenerMap(target);
  for (var type in listenerMap) {
    removeListeners(target, type);
  }
};

var getDomEventKey = exports.getDomEventKey = function getDomEventKey(type, fn, context) {
  return '_dom_event_' + type + '_' + (0, _utils.stamp)(fn) + (context ? '_' + (0, _utils.stamp)(context) : '');
};

var addListener = exports.addListener = function addListener(element, type, fn, context) {
  var eventKey = getDomEventKey(type, fn, context);
  var handler = element[eventKey];
  if (handler) {
    return this;
  }
  handler = function handler(e) {
    return fn.call(context || element, e);
  };
  if ('addEventListener' in element) {
    element.addEventListener(type, handler, false);
  } else if ('attachEvent' in element) {
    element.attachEvent('on' + type, handler);
  }
  element[eventKey] = handler;
  return this;
};

var removeListener = exports.removeListener = function removeListener(element, type, fn, context) {
  var eventKey = getDomEventKey(type, fn, context);
  var handler = element[eventKey];
  if (!handler) {
    return this;
  }
  if ('removeEventListener' in element) {
    element.removeEventListener(type, handler, false);
  } else if ('detachEvent' in element) {
    element.detachEvent('on' + type, handler);
  }
  element[eventKey] = null;
  return this;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHidden = exports.setClass = exports.removeClass = exports.addClass = exports.hasClass = exports.toBack = exports.toFront = exports.empty = exports.remove = exports.create = exports.getStyle = exports.getClass = exports.getElementsByClassName = exports.getChildByTagName = exports.get = undefined;

var _utils = __webpack_require__(4);

var get = exports.get = function get(id) {
  return typeof id === 'string' ? document.getElementById(id) : id;
};

var getChildByTagName = exports.getChildByTagName = function getChildByTagName(str, container) {
  return container.getElementsByTagName(str);
};

var getElementsByClassName = exports.getElementsByClassName = function getElementsByClassName(str, container, root) {
  var _root = root || window;
  var $ = _root.document.querySelector.bind(_root.document);

  var target = $(str);
  return target;
};

var getClass = exports.getClass = function getClass(elem) {
  return elem.getAttribute && elem.getAttribute('class') || '';
};

var getStyle = exports.getStyle = function getStyle(el, style) {
  var value = el.style[style] || el.currentStyle && el.currentStyle[style];
  if ((!value || value === 'auto') && document.defaultView) {
    var css = document.defaultView.getComputedStyle(el, null);
    value = css ? css[style] : null;
  }
  return value === 'auto' ? null : value;
};

var create = exports.create = function create(tagName, className, container, id) {
  var el = document.createElement(tagName);
  el.className = className || '';
  if (id) {
    el.id = id;
  }
  if (container) {
    container.appendChild(el);
  }
  return el;
};

var remove = exports.remove = function remove(el) {
  var parent = el.parentNode;
  if (parent) {
    parent.removeChild(el);
  }
};

var empty = exports.empty = function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

var toFront = exports.toFront = function toFront(el) {
  el.parentNode.appendChild(el);
};

var toBack = exports.toBack = function toBack(el) {
  var parent = el.parentNode;
  parent.insertBefore(el, parent.firstChild);
};

var hasClass = exports.hasClass = function hasClass(el, name) {
  if (el.classList !== undefined) {
    return el.classList.contains(name);
  }
  var className = getClass(el);
  return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
};

var addClass = exports.addClass = function addClass(el, name) {
  if (el.classList !== undefined) {
    var classes = (0, _utils.splitWords)(name);
    for (var i = 0, len = classes.length; i < len; i++) {
      el.classList.add(classes[i]);
    }
  } else if (!hasClass(el, name)) {
    var className = getClass(el);
    setClass(el, (className ? className + ' ' : '') + name);
  }
};

var removeClass = exports.removeClass = function removeClass(el, name) {
  if (el.classList !== undefined) {
    el.classList.remove(name);
  } else {
    setClass(el, String.trim((' ' + getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
  }
};

var setClass = exports.setClass = function setClass(el, name) {
  if (el.className.baseVal === undefined) {
    el.className = name;
  } else {
    el.className.baseVal = name;
  }
};

var createHidden = exports.createHidden = function createHidden(tagName, parent, id) {
  var element = document.createElement(tagName);
  element.style.display = 'none';
  if (id) {
    element.id = id;
  }
  if (parent) {
    parent.appendChild(element);
  }
  return element;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getrandom = exports.getrandom = function getrandom(t1, t2, t3) {
  if (!t1 || isNaN(t1)) {
    t1 = 0;
  }
  if (!t2 || isNaN(t2)) {
    t2 = 1;
  }
  if (!t3 || isNaN(t3)) {
    t3 = 0;
  }
  t3 = t3 > 15 ? 15 : t3;
  var _ref = [Math.random() * (t2 - t1) + t1, Math.pow(10, t3)],
      ra = _ref[0],
      du = _ref[1];

  ra = Math.round(ra * du) / du;
  return ra;
};

var getuuid = exports.getuuid = function getuuid() {
  var s = [],
      hexDigits = '0123456789abcdef';

  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
};

var stamp = exports.stamp = function stamp(obj) {
  var key = '_event_id_';
  obj[key] = obj[key] || getuuid();
  return obj[key];
};

var trim = exports.trim = function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
};

var splitWords = exports.splitWords = function splitWords(str) {
  return trim(str).split(/\s+/);
};

var firstUpperToCase = exports.firstUpperToCase = function firstUpperToCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, function (L) {
    return L.toUpperCase();
  });
};
var upperFirstChart = exports.upperFirstChart = function upperFirstChart(str) {
  return str.replace(/( |^)[a-z]/g, function (L) {
    return L.toUpperCase();
  });
};

var arrayRemove = exports.arrayRemove = function arrayRemove(arr, obj) {
  var i = arr.indexOf(obj);
  var found = i > -1;
  if (found) {
    arr.splice(i, 1);
  }
  return found;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(95);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(16);
var createDesc = __webpack_require__(36);
module.exports = __webpack_require__(10) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var BASE_CLASS_NAME = {
  CLASS_HIDDEN: 'ol-hidden',
  CLASS_SELECTABLE: 'ol-selectable',
  CLASS_UNSELECTABLE: 'ol-unselectable',
  CLASS_CONTROL: 'ol-control'
};

exports.BASE_CLASS_NAME = BASE_CLASS_NAME;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(34)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var has = function has(object_, key_) {
  return (typeof object_ === 'undefined' ? 'undefined' : _typeof(object_)) === 'object' && object_.hasOwnProperty(key_);
};

var checkBrowser = function checkBrowser() {
  var userAgent = navigator.userAgent;
  if (userAgent.indexOf('OPR') > -1) {
    return 'Opera';
  } else if (userAgent.indexOf('Firefox') > -1) {
    return 'FF';
  } else if (userAgent.indexOf('Trident') > -1) {
    return 'IE';
  } else if (userAgent.indexOf('Edge') > -1) {
    return 'Edge';
  } else if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
  } else if (userAgent.indexOf('Safari') > -1) {
    return 'Safari';
  }
};

var getuuid = function getuuid() {
  var s = [],
      hexDigits = '0123456789abcdef';

  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
};

exports.has = has;
exports.checkBrowser = checkBrowser;
exports.getuuid = getuuid;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var hide = __webpack_require__(7);
var has = __webpack_require__(11);
var SRC = __webpack_require__(23)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(15).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(62);
var toPrimitive = __webpack_require__(66);
var dP = Object.defineProperty;

exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
ol.layer.LayerUtils = function (map) {
  if (map && map instanceof ol.Map) {
    this.map = map;
  } else {
    throw new Error('传入的不是地图对象！');
  }
};

ol.layer.LayerUtils.prototype.getLayerByLayerName = function (layerName) {
  try {
    var targetLayer = null;
    if (this.map) {
      var layers = this.map.getLayers().getArray();
      targetLayer = this.getLayerInternal(layers, 'layerName', layerName);
    }
    return targetLayer;
  } catch (e) {
    console.log(e);
  }
};

ol.layer.LayerUtils.prototype.getLayerInternal = function (layers, key, value) {
  var _this = this;

  var _target = null;
  if (layers.length > 0) {
    layers.every(function (layer) {
      if (layer instanceof ol.layer.Group) {
        var _layers = layer.getLayers().getArray();
        _target = _this.getLayerInternal(_layers, key, value);
        if (_target) {
          return false;
        } else {
          return true;
        }
      } else if (layer.get(key) === value) {
        _target = layer;
        return false;
      } else {
        return true;
      }
    });
  }
  return _target;
};

ol.layer.LayerUtils.prototype.getLayersArrayInternal = function (layers, key, value) {
  var _this2 = this;

  var _target = [];
  if (layers.length > 0) {
    layers.forEach(function (layer) {
      if (layer instanceof ol.layer.Group) {
        var _layers2 = layer.getLayers().getArray();
        _target = _this2.getLayerInternal(_layers2, key, value);
        if (_target) {
          _target.push(layer);
        }
      } else if (layer.get(key) === value) {
        _target.push(layer);
      }
    });
  }
  return _target;
};

ol.layer.LayerUtils.prototype.getLayerByKeyValue = function (key, value) {
  try {
    var targetLayer = null;
    if (this.map) {
      var layers = this.map.getLayers().getArray();
      targetLayer = this.getLayerInternal(layers, key, value);
    }
    return targetLayer;
  } catch (e) {
    console.log(e);
  }
};

ol.layer.LayerUtils.prototype.getLayersArrayByKeyValue = function (key, value) {
  try {
    var targetLayers = [];
    if (this.map) {
      var layers = this.map.getLayers().getArray();
      targetLayers = this.getLayersArrayInternal(layers, key, value);
    }
    return targetLayers;
  } catch (e) {
    console.log(e);
  }
};

ol.layer.LayerUtils.prototype.createVectorLayer = function (layerName, params) {
  try {
    if (this.map) {
      var vectorLayer = this.getLayerByLayerName(layerName);
      if (!(vectorLayer instanceof ol.layer.Vector)) {
        vectorLayer = null;
      }
      if (!vectorLayer) {
        if (params && params.create) {
          vectorLayer = new ol.layer.Vector({
            layerName: layerName,
            params: params,
            layerType: 'vector',
            source: new ol.source.Vector({
              wrapX: false
            }),
            style: new ol.style.Style({
              fill: new ol.style.Fill({
                color: 'rgba(67, 110, 238, 0.4)'
              }),
              stroke: new ol.style.Stroke({
                color: '#4781d9',
                width: 2
              }),
              image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                  color: '#ffcc33'
                })
              })
            })
          });
        }
      }
      if (this.map && vectorLayer) {
        if (params && params.hasOwnProperty('selectable')) {
          vectorLayer.set('selectable', params.selectable);
        }

        var _vectorLayer = this.getLayerByLayerName(layerName);
        if (!_vectorLayer || !(_vectorLayer instanceof ol.layer.Vector)) {
          this.map.addLayer(vectorLayer);
        }
      }
      return vectorLayer;
    }
  } catch (e) {
    console.log(e);
  }
};

var olLayerLayerUtils = ol.layer.LayerUtils;
exports.default = olLayerLayerUtils;
module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(159),
    getValue = __webpack_require__(181);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var copyProperties = function copyProperties(target, source) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.getOwnPropertyNames(source)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (!key.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) {
        var desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

var mixin = function mixin(childCtor) {
  for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    mixins[_key - 1] = arguments[_key];
  }

  for (var key in mixins) {
    var _mixin = mixins[key];
    copyProperties(childCtor, _mixin);
    copyProperties(childCtor.prototype, _mixin.prototype);
  }
};

exports.default = mixin;
module.exports = exports["default"];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(25);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(70);
var defined = __webpack_require__(26);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

ol.style.Factory = function (options) {
  var option = options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? options : {};
  var style = new ol.style.Style({});
  if (option['geometry'] && option['geometry'] instanceof ol.geom.Geometry) {
    style.setGeometry(option['geometry']);
  }
  if (option['zIndex'] && typeof option['zIndex'] === 'number') {
    style.setZIndex(option['zIndex']);
  }
  if (option['fill'] && _typeof(option['fill']) === 'object') {
    style.setFill(this._getFill(option['fill']));
  }
  if (option['image'] && _typeof(option['image']) === 'object') {
    style.setImage(this._getImage(option['image']));
  }
  if (option['stroke'] && _typeof(option['stroke']) === 'object') {
    style.setStroke(this._getStroke(option['stroke']));
  }
  if (option['text'] && _typeof(option['text']) === 'object') {
    style.setText(this._getText(option['text']));
  }
  return style;
};

ol.style.Factory.prototype._getRegularShape = function (options) {
  try {
    var regularShape = new ol.style.RegularShape({
      fill: this._getFill(options['fill']) || undefined,
      points: typeof options['points'] === 'number' ? options['points'] : 1,
      radius: typeof options['radius'] === 'number' ? options['radius'] : undefined,
      radius1: typeof options['radius1'] === 'number' ? options['radius1'] : undefined,
      radius2: typeof options['radius2'] === 'number' ? options['radius2'] : undefined,
      angle: typeof options['angle'] === 'number' ? options['angle'] : 0,
      snapToPixel: typeof options['snapToPixel'] === 'boolean' ? options['snapToPixel'] : true,
      stroke: this._getStroke(options['stroke']) || undefined,
      rotation: typeof options['rotation'] === 'number' ? options['rotation'] : 0,
      rotateWithView: typeof options['rotateWithView'] === 'boolean' ? options['rotateWithView'] : false,
      atlasManager: options['atlasManager'] ? options['atlasManager'] : undefined
    });
    return regularShape;
  } catch (e) {
    console.log(e);
  }
};

ol.style.Factory.prototype._getImage = function (options) {
  try {
    var image = void 0;
    options = options || {};
    if (options['type'] === 'icon') {
      image = this._getIcon(options['image']);
    } else {
      image = this._getRegularShape(options['image']);
    }
    return image;
  } catch (e) {
    console.log(e);
  }
};

ol.style.Factory.prototype._getIcon = function (options) {
  try {
    options = options || {};
    var icon = new ol.style.Icon({
      anchor: options['imageAnchor'] ? options['imageAnchor'] : [0.5, 0.5],
      anchorXUnits: options['imageAnchorXUnits'] ? options['imageAnchorXUnits'] : 'fraction',
      anchorYUnits: options['imageAnchorYUnits'] ? options['imageAnchorYUnits'] : 'fraction',
      anchorOrigin: options['imageAnchorOrigin'] ? options['imageAnchorYUnits'] : 'top-left',
      color: options['imageColor'] ? options['imageColor'] : undefined,
      crossOrigin: options['crossOrigin'] ? options['crossOrigin'] : undefined,
      img: options['img'] ? options['img'] : undefined,
      offset: options['offset'] && Array.isArray(options['offset']) && options['offset'].length === 2 ? options['offset'] : [0, 0],
      offsetOrigin: options['offsetOrigin'] ? options['offsetOrigin'] : 'top-left',
      scale: typeof options['scale'] === 'number' ? options['scale'] : 1,
      snapToPixel: typeof options['snapToPixel'] === 'boolean' ? options['snapToPixel'] : true,
      rotateWithView: typeof options['rotateWithView'] === 'boolean' ? options['rotateWithView'] : false,
      opacity: typeof options['imageOpacity'] === 'number' ? options['imageOpacity'] : 1,
      rotation: typeof options['imageRotation'] === 'number' ? options['imageRotation'] : 0,
      size: options['size'] && Array.isArray(options['size']) && options['size'].length === 2 ? options['size'] : undefined,
      imgSize: options['imgSize'] && Array.isArray(options['imgSize']) && options['imgSize'].length === 2 ? options['imgSize'] : undefined,
      src: options['imageSrc'] ? options['imageSrc'] : undefined
    });
    return icon;
  } catch (error) {
    console.log(error);
  }
};

ol.style.Factory.prototype._getStroke = function (options) {
  try {
    options = options || {};
    var stroke = new ol.style.Stroke({
      color: options['strokeColor'] ? options['strokeColor'] : undefined,
      lineCap: options['strokeLineCap'] && typeof options['strokeLineCap'] === 'string' ? options['strokeLineCap'] : 'round',
      lineJoin: options['strokeLineJoin'] && typeof options['strokeLineJoin'] === 'string' ? options['strokeLineJoin'] : 'round',
      lineDash: options['strokeLineDash'] ? options['strokeLineDash'] : undefined,
      lineDashOffset: typeof options['strokeLineDashOffset'] === 'number' ? options['strokeLineDashOffset'] : '0',
      miterLimit: typeof options['strokeMiterLimit'] === 'number' ? options['strokeMiterLimit'] : 10,
      width: typeof options['strokeWidth'] === 'number' ? options['strokeWidth'] : undefined
    });
    return stroke;
  } catch (error) {
    console.log(error);
  }
};

ol.style.Factory.prototype._getText = function (options) {
  try {
    var text = new ol.style.Text({
      font: options['textFont'] && typeof options['textFont'] === 'string' ? options['textFont'] : '10px sans-serif',
      offsetX: typeof options['textOffsetX'] === 'number' ? options['textOffsetX'] : 0,
      offsetY: typeof options['textOffsetY'] === 'number' ? options['textOffsetY'] : 0,
      scale: typeof options['textScale'] === 'number' ? options['textScale'] : undefined,
      rotation: typeof options['textRotation'] === 'number' ? options['textRotation'] : 0,
      text: options['text'] && typeof options['text'] === 'string' ? options['text'] : undefined,
      textAlign: options['textAlign'] && typeof options['textAlign'] === 'string' ? options['textAlign'] : 'start',
      textBaseline: options['textBaseline'] && typeof options['textBaseline'] === 'string' ? options['textBaseline'] : 'alphabetic',
      rotateWithView: typeof options['rotateWithView'] === 'boolean' ? options['rotateWithView'] : false,
      fill: this._getFill(options['textFill']),
      stroke: this._getStroke(options['textStroke'])
    });
    return text;
  } catch (error) {
    console.log(error);
  }
};

ol.style.Factory.prototype._getFill = function (options) {
  try {
    options = options || {};
    var fill = new ol.style.Fill({
      color: options['fillColor'] ? options['fillColor'] : undefined
    });
    return fill;
  } catch (error) {
    console.log(error);
  }
};

var olStyleFactory = ol.style.Factory;
exports.default = olStyleFactory;
module.exports = exports['default'];

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(16).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(0)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(46)('keys');
var uid = __webpack_require__(23);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const Observable = function () {
  this.Events = {}
  this.__cnt = 0
}

Observable.hasOwnKey = Function.call.bind(Object.hasOwnProperty)

Observable.slice = Function.call.bind(Array.prototype.slice)

/**
 * 事件分发
 * @param eventName
 * @param callback
 * @param context
 * @returns {(*|*)[]}
 */
Observable.prototype.on = function (eventName, callback, context) {
  return (this.bindEvent(eventName, callback, 0, context))
}

/**
 * 取消监听
 * @param event
 * @returns {boolean}
 */
Observable.prototype.un = function (event) {
  var eventName = ''
  var key = ''
  var r = false
  var type = typeof event
  var that = this
  if (type === 'string') {
    if (Observable.hasOwnKey(this.Events, event)) {
      delete this.Events[event]
      return true
    }
    return false
  } else if (type === 'object') {
    eventName = event[0]
    key = event[1]
    if (Observable.hasOwnKey(this.Events, eventName) && Observable.hasOwnKey(this.Events[eventName], key)) {
      delete this.Events[eventName][key]
      return true
    }
    return false
  } else if (type === 'function') {
    that.eachEvent(that.Events, function (keyA, itemA) {
      that.eachEvent(itemA, function (keyB, itemB) {
        if (itemB[0] === event) {
          delete that.Events[keyA][keyB]
          r = true
        }
      })
    })
    return r
  }
  return true
}

/**
 * 事件监听（只触发一次）
 * @param eventName
 * @param callback
 * @param context
 * @returns {(*|*)[]}
 */
Observable.prototype.once = function (eventName, callback, context) {
  return (this.bindEvent(eventName, callback, 1, context))
}

/**
 * 响应事件
 * @param eventName
 * @param args
 */
Observable.prototype.action = function (eventName, args) {
  if (Observable.hasOwnKey(this.Events, eventName)) {
    this.eachEvent(this.Events[eventName], function (key, item) {
      item[0].apply(item[2], args)
      if (item[1]) {
        delete this.Events[eventName][key]
      }
    })
  }
}

/**
 * 实时触发响应
 * @param eventName
 */
Observable.prototype.dispatch = function (eventName) {
  var that = this
  var args = Observable.slice(arguments, 1)
  setTimeout(function () {
    that.action(eventName, args)
  })
}

/**
 * 延后触发响应
 * @param eventName
 */
Observable.prototype.dispatchSync = function (eventName) {
  this.action(eventName, Observable.slice(arguments, 1))
}

/**
 * 清空发布中心
 */
Observable.prototype.clear = function () {
  this.Events = {}
}

/**
 * 绑定事件
 * @param eventName
 * @param callback
 * @param isOne
 * @param context
 * @returns {[*,*]}
 */
Observable.prototype.bindEvent = function (eventName, callback, isOne, context) {
  if (typeof eventName !== 'string' || typeof callback !== 'function') {
    throw new Error('传入的事件名称和回调函数有误！')
  }
  if (!Observable.hasOwnKey(this.Events, eventName)) {
    this.Events[eventName] = {}
  }
  this.Events[eventName][++this.__cnt] = [callback, isOne, context]
  return [eventName, this.__cnt]
}

/**
 * 循环触发事件
 * @param obj
 * @param callback
 */
Observable.prototype.eachEvent = function (obj, callback) {
  for (var key in obj) {
    if (Observable.hasOwnKey(obj, key)) {
      callback(key, obj[key])
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Observable);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21);
var TAG = __webpack_require__(0)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(50);
var $export = __webpack_require__(44);
var redefine = __webpack_require__(13);
var hide = __webpack_require__(7);
var has = __webpack_require__(11);
var Iterators = __webpack_require__(14);
var $iterCreate = __webpack_require__(73);
var setToStringTag = __webpack_require__(27);
var getPrototypeOf = __webpack_require__(77);
var ITERATOR = __webpack_require__(0)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(193),
    listCacheDelete = __webpack_require__(194),
    listCacheGet = __webpack_require__(195),
    listCacheHas = __webpack_require__(196),
    listCacheSet = __webpack_require__(197);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(100);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(52),
    getRawTag = __webpack_require__(179),
    objectToString = __webpack_require__(207);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(92),
    baseAssignValue = __webpack_require__(93);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(191);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(18);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(15);
var hide = __webpack_require__(7);
var redefine = __webpack_require__(13);
var ctx = __webpack_require__(20);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(78);
var enumBugKeys = __webpack_require__(43);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(29);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * PEP v0.4.3 | https://github.com/jquery/PEP
 * Copyright jQuery Foundation and other contributors | http://jquery.org/license
 */

(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.PointerEventsPolyfill = factory());
}(this, function () { 'use strict';

  /**
   * This is the constructor for new PointerEvents.
   *
   * New Pointer Events must be given a type, and an optional dictionary of
   * initialization properties.
   *
   * Due to certain platform requirements, events returned from the constructor
   * identify as MouseEvents.
   *
   * @constructor
   * @param {String} inType The type of the event to create.
   * @param {Object} [inDict] An optional dictionary of initial event properties.
   * @return {Event} A new PointerEvent of type `inType`, initialized with properties from `inDict`.
   */
  var MOUSE_PROPS = [
    'bubbles',
    'cancelable',
    'view',
    'detail',
    'screenX',
    'screenY',
    'clientX',
    'clientY',
    'ctrlKey',
    'altKey',
    'shiftKey',
    'metaKey',
    'button',
    'relatedTarget',
    'pageX',
    'pageY'
  ];

  var MOUSE_DEFAULTS = [
    false,
    false,
    null,
    null,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null,
    0,
    0
  ];

  function PointerEvent(inType, inDict) {
    inDict = inDict || Object.create(null);

    var e = document.createEvent('Event');
    e.initEvent(inType, inDict.bubbles || false, inDict.cancelable || false);

    // define inherited MouseEvent properties
    // skip bubbles and cancelable since they're set above in initEvent()
    for (var i = 2, p; i < MOUSE_PROPS.length; i++) {
      p = MOUSE_PROPS[i];
      e[p] = inDict[p] || MOUSE_DEFAULTS[i];
    }
    e.buttons = inDict.buttons || 0;

    // Spec requires that pointers without pressure specified use 0.5 for down
    // state and 0 for up state.
    var pressure = 0;

    if (inDict.pressure && e.buttons) {
      pressure = inDict.pressure;
    } else {
      pressure = e.buttons ? 0.5 : 0;
    }

    // add x/y properties aliased to clientX/Y
    e.x = e.clientX;
    e.y = e.clientY;

    // define the properties of the PointerEvent interface
    e.pointerId = inDict.pointerId || 0;
    e.width = inDict.width || 0;
    e.height = inDict.height || 0;
    e.pressure = pressure;
    e.tiltX = inDict.tiltX || 0;
    e.tiltY = inDict.tiltY || 0;
    e.twist = inDict.twist || 0;
    e.tangentialPressure = inDict.tangentialPressure || 0;
    e.pointerType = inDict.pointerType || '';
    e.hwTimestamp = inDict.hwTimestamp || 0;
    e.isPrimary = inDict.isPrimary || false;
    return e;
  }

  /**
   * This module implements a map of pointer states
   */
  var USE_MAP = window.Map && window.Map.prototype.forEach;
  var PointerMap = USE_MAP ? Map : SparseArrayMap;

  function SparseArrayMap() {
    this.array = [];
    this.size = 0;
  }

  SparseArrayMap.prototype = {
    set: function(k, v) {
      if (v === undefined) {
        return this.delete(k);
      }
      if (!this.has(k)) {
        this.size++;
      }
      this.array[k] = v;
    },
    has: function(k) {
      return this.array[k] !== undefined;
    },
    delete: function(k) {
      if (this.has(k)) {
        delete this.array[k];
        this.size--;
      }
    },
    get: function(k) {
      return this.array[k];
    },
    clear: function() {
      this.array.length = 0;
      this.size = 0;
    },

    // return value, key, map
    forEach: function(callback, thisArg) {
      return this.array.forEach(function(v, k) {
        callback.call(thisArg, v, k, this);
      }, this);
    }
  };

  var CLONE_PROPS = [

    // MouseEvent
    'bubbles',
    'cancelable',
    'view',
    'detail',
    'screenX',
    'screenY',
    'clientX',
    'clientY',
    'ctrlKey',
    'altKey',
    'shiftKey',
    'metaKey',
    'button',
    'relatedTarget',

    // DOM Level 3
    'buttons',

    // PointerEvent
    'pointerId',
    'width',
    'height',
    'pressure',
    'tiltX',
    'tiltY',
    'pointerType',
    'hwTimestamp',
    'isPrimary',

    // event instance
    'type',
    'target',
    'currentTarget',
    'which',
    'pageX',
    'pageY',
    'timeStamp'
  ];

  var CLONE_DEFAULTS = [

    // MouseEvent
    false,
    false,
    null,
    null,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null,

    // DOM Level 3
    0,

    // PointerEvent
    0,
    0,
    0,
    0,
    0,
    0,
    '',
    0,
    false,

    // event instance
    '',
    null,
    null,
    0,
    0,
    0,
    0
  ];

  var BOUNDARY_EVENTS = {
    'pointerover': 1,
    'pointerout': 1,
    'pointerenter': 1,
    'pointerleave': 1
  };

  var HAS_SVG_INSTANCE = (typeof SVGElementInstance !== 'undefined');

  /**
   * This module is for normalizing events. Mouse and Touch events will be
   * collected here, and fire PointerEvents that have the same semantics, no
   * matter the source.
   * Events fired:
   *   - pointerdown: a pointing is added
   *   - pointerup: a pointer is removed
   *   - pointermove: a pointer is moved
   *   - pointerover: a pointer crosses into an element
   *   - pointerout: a pointer leaves an element
   *   - pointercancel: a pointer will no longer generate events
   */
  var dispatcher = {
    pointermap: new PointerMap(),
    eventMap: Object.create(null),
    captureInfo: Object.create(null),

    // Scope objects for native events.
    // This exists for ease of testing.
    eventSources: Object.create(null),
    eventSourceList: [],
    /**
     * Add a new event source that will generate pointer events.
     *
     * `inSource` must contain an array of event names named `events`, and
     * functions with the names specified in the `events` array.
     * @param {string} name A name for the event source
     * @param {Object} source A new source of platform events.
     */
    registerSource: function(name, source) {
      var s = source;
      var newEvents = s.events;
      if (newEvents) {
        newEvents.forEach(function(e) {
          if (s[e]) {
            this.eventMap[e] = s[e].bind(s);
          }
        }, this);
        this.eventSources[name] = s;
        this.eventSourceList.push(s);
      }
    },
    register: function(element) {
      var l = this.eventSourceList.length;
      for (var i = 0, es; (i < l) && (es = this.eventSourceList[i]); i++) {

        // call eventsource register
        es.register.call(es, element);
      }
    },
    unregister: function(element) {
      var l = this.eventSourceList.length;
      for (var i = 0, es; (i < l) && (es = this.eventSourceList[i]); i++) {

        // call eventsource register
        es.unregister.call(es, element);
      }
    },
    contains: /*scope.external.contains || */function(container, contained) {
      try {
        return container.contains(contained);
      } catch (ex) {

        // most likely: https://bugzilla.mozilla.org/show_bug.cgi?id=208427
        return false;
      }
    },

    // EVENTS
    down: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointerdown', inEvent);
    },
    move: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointermove', inEvent);
    },
    up: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointerup', inEvent);
    },
    enter: function(inEvent) {
      inEvent.bubbles = false;
      this.fireEvent('pointerenter', inEvent);
    },
    leave: function(inEvent) {
      inEvent.bubbles = false;
      this.fireEvent('pointerleave', inEvent);
    },
    over: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointerover', inEvent);
    },
    out: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointerout', inEvent);
    },
    cancel: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointercancel', inEvent);
    },
    leaveOut: function(event) {
      this.out(event);
      this.propagate(event, this.leave, false);
    },
    enterOver: function(event) {
      this.over(event);
      this.propagate(event, this.enter, true);
    },

    // LISTENER LOGIC
    eventHandler: function(inEvent) {

      // This is used to prevent multiple dispatch of pointerevents from
      // platform events. This can happen when two elements in different scopes
      // are set up to create pointer events, which is relevant to Shadow DOM.
      if (inEvent._handledByPE) {
        return;
      }
      var type = inEvent.type;
      var fn = this.eventMap && this.eventMap[type];
      if (fn) {
        fn(inEvent);
      }
      inEvent._handledByPE = true;
    },

    // set up event listeners
    listen: function(target, events) {
      events.forEach(function(e) {
        this.addEvent(target, e);
      }, this);
    },

    // remove event listeners
    unlisten: function(target, events) {
      events.forEach(function(e) {
        this.removeEvent(target, e);
      }, this);
    },
    addEvent: /*scope.external.addEvent || */function(target, eventName) {
      target.addEventListener(eventName, this.boundHandler);
    },
    removeEvent: /*scope.external.removeEvent || */function(target, eventName) {
      target.removeEventListener(eventName, this.boundHandler);
    },

    // EVENT CREATION AND TRACKING
    /**
     * Creates a new Event of type `inType`, based on the information in
     * `inEvent`.
     *
     * @param {string} inType A string representing the type of event to create
     * @param {Event} inEvent A platform event with a target
     * @return {Event} A PointerEvent of type `inType`
     */
    makeEvent: function(inType, inEvent) {

      // relatedTarget must be null if pointer is captured
      if (this.captureInfo[inEvent.pointerId]) {
        inEvent.relatedTarget = null;
      }
      var e = new PointerEvent(inType, inEvent);
      if (inEvent.preventDefault) {
        e.preventDefault = inEvent.preventDefault;
      }
      e._target = e._target || inEvent.target;
      return e;
    },

    // make and dispatch an event in one call
    fireEvent: function(inType, inEvent) {
      var e = this.makeEvent(inType, inEvent);
      return this.dispatchEvent(e);
    },
    /**
     * Returns a snapshot of inEvent, with writable properties.
     *
     * @param {Event} inEvent An event that contains properties to copy.
     * @return {Object} An object containing shallow copies of `inEvent`'s
     *    properties.
     */
    cloneEvent: function(inEvent) {
      var eventCopy = Object.create(null);
      var p;
      for (var i = 0; i < CLONE_PROPS.length; i++) {
        p = CLONE_PROPS[i];
        eventCopy[p] = inEvent[p] || CLONE_DEFAULTS[i];

        // Work around SVGInstanceElement shadow tree
        // Return the <use> element that is represented by the instance for Safari, Chrome, IE.
        // This is the behavior implemented by Firefox.
        if (HAS_SVG_INSTANCE && (p === 'target' || p === 'relatedTarget')) {
          if (eventCopy[p] instanceof SVGElementInstance) {
            eventCopy[p] = eventCopy[p].correspondingUseElement;
          }
        }
      }

      // keep the semantics of preventDefault
      if (inEvent.preventDefault) {
        eventCopy.preventDefault = function() {
          inEvent.preventDefault();
        };
      }
      return eventCopy;
    },
    getTarget: function(inEvent) {
      var capture = this.captureInfo[inEvent.pointerId];
      if (!capture) {
        return inEvent._target;
      }
      if (inEvent._target === capture || !(inEvent.type in BOUNDARY_EVENTS)) {
        return capture;
      }
    },
    propagate: function(event, fn, propagateDown) {
      var target = event.target;
      var targets = [];

      // Order of conditions due to document.contains() missing in IE.
      while (target !== document && !target.contains(event.relatedTarget)) {
        targets.push(target);
        target = target.parentNode;

        // Touch: Do not propagate if node is detached.
        if (!target) {
          return;
        }
      }
      if (propagateDown) {
        targets.reverse();
      }
      targets.forEach(function(target) {
        event.target = target;
        fn.call(this, event);
      }, this);
    },
    setCapture: function(inPointerId, inTarget, skipDispatch) {
      if (this.captureInfo[inPointerId]) {
        this.releaseCapture(inPointerId, skipDispatch);
      }

      this.captureInfo[inPointerId] = inTarget;
      this.implicitRelease = this.releaseCapture.bind(this, inPointerId, skipDispatch);
      document.addEventListener('pointerup', this.implicitRelease);
      document.addEventListener('pointercancel', this.implicitRelease);

      var e = new PointerEvent('gotpointercapture');
      e.pointerId = inPointerId;
      e._target = inTarget;

      if (!skipDispatch) {
        this.asyncDispatchEvent(e);
      }
    },
    releaseCapture: function(inPointerId, skipDispatch) {
      var t = this.captureInfo[inPointerId];
      if (!t) {
        return;
      }

      this.captureInfo[inPointerId] = undefined;
      document.removeEventListener('pointerup', this.implicitRelease);
      document.removeEventListener('pointercancel', this.implicitRelease);

      var e = new PointerEvent('lostpointercapture');
      e.pointerId = inPointerId;
      e._target = t;

      if (!skipDispatch) {
        this.asyncDispatchEvent(e);
      }
    },
    /**
     * Dispatches the event to its target.
     *
     * @param {Event} inEvent The event to be dispatched.
     * @return {Boolean} True if an event handler returns true, false otherwise.
     */
    dispatchEvent: /*scope.external.dispatchEvent || */function(inEvent) {
      var t = this.getTarget(inEvent);
      if (t) {
        return t.dispatchEvent(inEvent);
      }
    },
    asyncDispatchEvent: function(inEvent) {
      requestAnimationFrame(this.dispatchEvent.bind(this, inEvent));
    }
  };
  dispatcher.boundHandler = dispatcher.eventHandler.bind(dispatcher);

  var targeting = {
    shadow: function(inEl) {
      if (inEl) {
        return inEl.shadowRoot || inEl.webkitShadowRoot;
      }
    },
    canTarget: function(shadow) {
      return shadow && Boolean(shadow.elementFromPoint);
    },
    targetingShadow: function(inEl) {
      var s = this.shadow(inEl);
      if (this.canTarget(s)) {
        return s;
      }
    },
    olderShadow: function(shadow) {
      var os = shadow.olderShadowRoot;
      if (!os) {
        var se = shadow.querySelector('shadow');
        if (se) {
          os = se.olderShadowRoot;
        }
      }
      return os;
    },
    allShadows: function(element) {
      var shadows = [];
      var s = this.shadow(element);
      while (s) {
        shadows.push(s);
        s = this.olderShadow(s);
      }
      return shadows;
    },
    searchRoot: function(inRoot, x, y) {
      if (inRoot) {
        var t = inRoot.elementFromPoint(x, y);
        var st, sr;

        // is element a shadow host?
        sr = this.targetingShadow(t);
        while (sr) {

          // find the the element inside the shadow root
          st = sr.elementFromPoint(x, y);
          if (!st) {

            // check for older shadows
            sr = this.olderShadow(sr);
          } else {

            // shadowed element may contain a shadow root
            var ssr = this.targetingShadow(st);
            return this.searchRoot(ssr, x, y) || st;
          }
        }

        // light dom element is the target
        return t;
      }
    },
    owner: function(element) {
      var s = element;

      // walk up until you hit the shadow root or document
      while (s.parentNode) {
        s = s.parentNode;
      }

      // the owner element is expected to be a Document or ShadowRoot
      if (s.nodeType !== Node.DOCUMENT_NODE && s.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
        s = document;
      }
      return s;
    },
    findTarget: function(inEvent) {
      var x = inEvent.clientX;
      var y = inEvent.clientY;

      // if the listener is in the shadow root, it is much faster to start there
      var s = this.owner(inEvent.target);

      // if x, y is not in this root, fall back to document search
      if (!s.elementFromPoint(x, y)) {
        s = document;
      }
      return this.searchRoot(s, x, y);
    }
  };

  var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);
  var map = Array.prototype.map.call.bind(Array.prototype.map);
  var toArray = Array.prototype.slice.call.bind(Array.prototype.slice);
  var filter = Array.prototype.filter.call.bind(Array.prototype.filter);
  var MO = window.MutationObserver || window.WebKitMutationObserver;
  var SELECTOR = '[touch-action]';
  var OBSERVER_INIT = {
    subtree: true,
    childList: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['touch-action']
  };

  function Installer(add, remove, changed, binder) {
    this.addCallback = add.bind(binder);
    this.removeCallback = remove.bind(binder);
    this.changedCallback = changed.bind(binder);
    if (MO) {
      this.observer = new MO(this.mutationWatcher.bind(this));
    }
  }

  Installer.prototype = {
    watchSubtree: function(target) {

      // Only watch scopes that can target find, as these are top-level.
      // Otherwise we can see duplicate additions and removals that add noise.
      //
      // TODO(dfreedman): For some instances with ShadowDOMPolyfill, we can see
      // a removal without an insertion when a node is redistributed among
      // shadows. Since it all ends up correct in the document, watching only
      // the document will yield the correct mutations to watch.
      if (this.observer && targeting.canTarget(target)) {
        this.observer.observe(target, OBSERVER_INIT);
      }
    },
    enableOnSubtree: function(target) {
      this.watchSubtree(target);
      if (target === document && document.readyState !== 'complete') {
        this.installOnLoad();
      } else {
        this.installNewSubtree(target);
      }
    },
    installNewSubtree: function(target) {
      forEach(this.findElements(target), this.addElement, this);
    },
    findElements: function(target) {
      if (target.querySelectorAll) {
        return target.querySelectorAll(SELECTOR);
      }
      return [];
    },
    removeElement: function(el) {
      this.removeCallback(el);
    },
    addElement: function(el) {
      this.addCallback(el);
    },
    elementChanged: function(el, oldValue) {
      this.changedCallback(el, oldValue);
    },
    concatLists: function(accum, list) {
      return accum.concat(toArray(list));
    },

    // register all touch-action = none nodes on document load
    installOnLoad: function() {
      document.addEventListener('readystatechange', function() {
        if (document.readyState === 'complete') {
          this.installNewSubtree(document);
        }
      }.bind(this));
    },
    isElement: function(n) {
      return n.nodeType === Node.ELEMENT_NODE;
    },
    flattenMutationTree: function(inNodes) {

      // find children with touch-action
      var tree = map(inNodes, this.findElements, this);

      // make sure the added nodes are accounted for
      tree.push(filter(inNodes, this.isElement));

      // flatten the list
      return tree.reduce(this.concatLists, []);
    },
    mutationWatcher: function(mutations) {
      mutations.forEach(this.mutationHandler, this);
    },
    mutationHandler: function(m) {
      if (m.type === 'childList') {
        var added = this.flattenMutationTree(m.addedNodes);
        added.forEach(this.addElement, this);
        var removed = this.flattenMutationTree(m.removedNodes);
        removed.forEach(this.removeElement, this);
      } else if (m.type === 'attributes') {
        this.elementChanged(m.target, m.oldValue);
      }
    }
  };

  function shadowSelector(v) {
    return 'body /shadow-deep/ ' + selector(v);
  }
  function selector(v) {
    return '[touch-action="' + v + '"]';
  }
  function rule(v) {
    return '{ -ms-touch-action: ' + v + '; touch-action: ' + v + '; }';
  }
  var attrib2css = [
    'none',
    'auto',
    'pan-x',
    'pan-y',
    {
      rule: 'pan-x pan-y',
      selectors: [
        'pan-x pan-y',
        'pan-y pan-x'
      ]
    }
  ];
  var styles = '';

  // only install stylesheet if the browser has touch action support
  var hasNativePE = window.PointerEvent || window.MSPointerEvent;

  // only add shadow selectors if shadowdom is supported
  var hasShadowRoot = !window.ShadowDOMPolyfill && document.head.createShadowRoot;

  function applyAttributeStyles() {
    if (hasNativePE) {
      attrib2css.forEach(function(r) {
        if (String(r) === r) {
          styles += selector(r) + rule(r) + '\n';
          if (hasShadowRoot) {
            styles += shadowSelector(r) + rule(r) + '\n';
          }
        } else {
          styles += r.selectors.map(selector) + rule(r.rule) + '\n';
          if (hasShadowRoot) {
            styles += r.selectors.map(shadowSelector) + rule(r.rule) + '\n';
          }
        }
      });

      var el = document.createElement('style');
      el.textContent = styles;
      document.head.appendChild(el);
    }
  }

  var pointermap = dispatcher.pointermap;

  // radius around touchend that swallows mouse events
  var DEDUP_DIST = 25;

  // left, middle, right, back, forward
  var BUTTON_TO_BUTTONS = [1, 4, 2, 8, 16];

  var HAS_BUTTONS = false;
  try {
    HAS_BUTTONS = new MouseEvent('test', { buttons: 1 }).buttons === 1;
  } catch (e) {}

  // handler block for native mouse events
  var mouseEvents = {
    POINTER_ID: 1,
    POINTER_TYPE: 'mouse',
    events: [
      'mousedown',
      'mousemove',
      'mouseup',
      'mouseover',
      'mouseout'
    ],
    register: function(target) {
      dispatcher.listen(target, this.events);
    },
    unregister: function(target) {
      dispatcher.unlisten(target, this.events);
    },
    lastTouches: [],

    // collide with the global mouse listener
    isEventSimulatedFromTouch: function(inEvent) {
      var lts = this.lastTouches;
      var x = inEvent.clientX;
      var y = inEvent.clientY;
      for (var i = 0, l = lts.length, t; i < l && (t = lts[i]); i++) {

        // simulated mouse events will be swallowed near a primary touchend
        var dx = Math.abs(x - t.x);
        var dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DIST && dy <= DEDUP_DIST) {
          return true;
        }
      }
    },
    prepareEvent: function(inEvent) {
      var e = dispatcher.cloneEvent(inEvent);

      // forward mouse preventDefault
      var pd = e.preventDefault;
      e.preventDefault = function() {
        inEvent.preventDefault();
        pd();
      };
      e.pointerId = this.POINTER_ID;
      e.isPrimary = true;
      e.pointerType = this.POINTER_TYPE;
      return e;
    },
    prepareButtonsForMove: function(e, inEvent) {
      var p = pointermap.get(this.POINTER_ID);

      // Update buttons state after possible out-of-document mouseup.
      if (inEvent.which === 0 || !p) {
        e.buttons = 0;
      } else {
        e.buttons = p.buttons;
      }
      inEvent.buttons = e.buttons;
    },
    mousedown: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var p = pointermap.get(this.POINTER_ID);
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) {
          e.buttons = BUTTON_TO_BUTTONS[e.button];
          if (p) { e.buttons |= p.buttons; }
          inEvent.buttons = e.buttons;
        }
        pointermap.set(this.POINTER_ID, inEvent);
        if (!p || p.buttons === 0) {
          dispatcher.down(e);
        } else {
          dispatcher.move(e);
        }
      }
    },
    mousemove: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) { this.prepareButtonsForMove(e, inEvent); }
        e.button = -1;
        pointermap.set(this.POINTER_ID, inEvent);
        dispatcher.move(e);
      }
    },
    mouseup: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var p = pointermap.get(this.POINTER_ID);
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) {
          var up = BUTTON_TO_BUTTONS[e.button];

          // Produces wrong state of buttons in Browsers without `buttons` support
          // when a mouse button that was pressed outside the document is released
          // inside and other buttons are still pressed down.
          e.buttons = p ? p.buttons & ~up : 0;
          inEvent.buttons = e.buttons;
        }
        pointermap.set(this.POINTER_ID, inEvent);

        // Support: Firefox <=44 only
        // FF Ubuntu includes the lifted button in the `buttons` property on
        // mouseup.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1223366
        e.buttons &= ~BUTTON_TO_BUTTONS[e.button];
        if (e.buttons === 0) {
          dispatcher.up(e);
        } else {
          dispatcher.move(e);
        }
      }
    },
    mouseover: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) { this.prepareButtonsForMove(e, inEvent); }
        e.button = -1;
        pointermap.set(this.POINTER_ID, inEvent);
        dispatcher.enterOver(e);
      }
    },
    mouseout: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) { this.prepareButtonsForMove(e, inEvent); }
        e.button = -1;
        dispatcher.leaveOut(e);
      }
    },
    cancel: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.cancel(e);
      this.deactivateMouse();
    },
    deactivateMouse: function() {
      pointermap.delete(this.POINTER_ID);
    }
  };

  var captureInfo = dispatcher.captureInfo;
  var findTarget = targeting.findTarget.bind(targeting);
  var allShadows = targeting.allShadows.bind(targeting);
  var pointermap$1 = dispatcher.pointermap;

  // This should be long enough to ignore compat mouse events made by touch
  var DEDUP_TIMEOUT = 2500;
  var CLICK_COUNT_TIMEOUT = 200;
  var ATTRIB = 'touch-action';
  var INSTALLER;

  // handler block for native touch events
  var touchEvents = {
    events: [
      'touchstart',
      'touchmove',
      'touchend',
      'touchcancel'
    ],
    register: function(target) {
      INSTALLER.enableOnSubtree(target);
    },
    unregister: function() {

      // TODO(dfreedman): is it worth it to disconnect the MO?
    },
    elementAdded: function(el) {
      var a = el.getAttribute(ATTRIB);
      var st = this.touchActionToScrollType(a);
      if (st) {
        el._scrollType = st;
        dispatcher.listen(el, this.events);

        // set touch-action on shadows as well
        allShadows(el).forEach(function(s) {
          s._scrollType = st;
          dispatcher.listen(s, this.events);
        }, this);
      }
    },
    elementRemoved: function(el) {
      el._scrollType = undefined;
      dispatcher.unlisten(el, this.events);

      // remove touch-action from shadow
      allShadows(el).forEach(function(s) {
        s._scrollType = undefined;
        dispatcher.unlisten(s, this.events);
      }, this);
    },
    elementChanged: function(el, oldValue) {
      var a = el.getAttribute(ATTRIB);
      var st = this.touchActionToScrollType(a);
      var oldSt = this.touchActionToScrollType(oldValue);

      // simply update scrollType if listeners are already established
      if (st && oldSt) {
        el._scrollType = st;
        allShadows(el).forEach(function(s) {
          s._scrollType = st;
        }, this);
      } else if (oldSt) {
        this.elementRemoved(el);
      } else if (st) {
        this.elementAdded(el);
      }
    },
    scrollTypes: {
      EMITTER: 'none',
      XSCROLLER: 'pan-x',
      YSCROLLER: 'pan-y',
      SCROLLER: /^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/
    },
    touchActionToScrollType: function(touchAction) {
      var t = touchAction;
      var st = this.scrollTypes;
      if (t === 'none') {
        return 'none';
      } else if (t === st.XSCROLLER) {
        return 'X';
      } else if (t === st.YSCROLLER) {
        return 'Y';
      } else if (st.SCROLLER.exec(t)) {
        return 'XY';
      }
    },
    POINTER_TYPE: 'touch',
    firstTouch: null,
    isPrimaryTouch: function(inTouch) {
      return this.firstTouch === inTouch.identifier;
    },
    setPrimaryTouch: function(inTouch) {

      // set primary touch if there no pointers, or the only pointer is the mouse
      if (pointermap$1.size === 0 || (pointermap$1.size === 1 && pointermap$1.has(1))) {
        this.firstTouch = inTouch.identifier;
        this.firstXY = { X: inTouch.clientX, Y: inTouch.clientY };
        this.scrolling = false;
        this.cancelResetClickCount();
      }
    },
    removePrimaryPointer: function(inPointer) {
      if (inPointer.isPrimary) {
        this.firstTouch = null;
        this.firstXY = null;
        this.resetClickCount();
      }
    },
    clickCount: 0,
    resetId: null,
    resetClickCount: function() {
      var fn = function() {
        this.clickCount = 0;
        this.resetId = null;
      }.bind(this);
      this.resetId = setTimeout(fn, CLICK_COUNT_TIMEOUT);
    },
    cancelResetClickCount: function() {
      if (this.resetId) {
        clearTimeout(this.resetId);
      }
    },
    typeToButtons: function(type) {
      var ret = 0;
      if (type === 'touchstart' || type === 'touchmove') {
        ret = 1;
      }
      return ret;
    },
    touchToPointer: function(inTouch) {
      var cte = this.currentTouchEvent;
      var e = dispatcher.cloneEvent(inTouch);

      // We reserve pointerId 1 for Mouse.
      // Touch identifiers can start at 0.
      // Add 2 to the touch identifier for compatibility.
      var id = e.pointerId = inTouch.identifier + 2;
      e.target = captureInfo[id] || findTarget(e);
      e.bubbles = true;
      e.cancelable = true;
      e.detail = this.clickCount;
      e.button = 0;
      e.buttons = this.typeToButtons(cte.type);
      e.width = (inTouch.radiusX || inTouch.webkitRadiusX || 0) * 2;
      e.height = (inTouch.radiusY || inTouch.webkitRadiusY || 0) * 2;
      e.pressure = inTouch.force || inTouch.webkitForce || 0.5;
      e.isPrimary = this.isPrimaryTouch(inTouch);
      e.pointerType = this.POINTER_TYPE;

      // forward modifier keys
      e.altKey = cte.altKey;
      e.ctrlKey = cte.ctrlKey;
      e.metaKey = cte.metaKey;
      e.shiftKey = cte.shiftKey;

      // forward touch preventDefaults
      var self = this;
      e.preventDefault = function() {
        self.scrolling = false;
        self.firstXY = null;
        cte.preventDefault();
      };
      return e;
    },
    processTouches: function(inEvent, inFunction) {
      var tl = inEvent.changedTouches;
      this.currentTouchEvent = inEvent;
      for (var i = 0, t; i < tl.length; i++) {
        t = tl[i];
        inFunction.call(this, this.touchToPointer(t));
      }
    },

    // For single axis scrollers, determines whether the element should emit
    // pointer events or behave as a scroller
    shouldScroll: function(inEvent) {
      if (this.firstXY) {
        var ret;
        var scrollAxis = inEvent.currentTarget._scrollType;
        if (scrollAxis === 'none') {

          // this element is a touch-action: none, should never scroll
          ret = false;
        } else if (scrollAxis === 'XY') {

          // this element should always scroll
          ret = true;
        } else {
          var t = inEvent.changedTouches[0];

          // check the intended scroll axis, and other axis
          var a = scrollAxis;
          var oa = scrollAxis === 'Y' ? 'X' : 'Y';
          var da = Math.abs(t['client' + a] - this.firstXY[a]);
          var doa = Math.abs(t['client' + oa] - this.firstXY[oa]);

          // if delta in the scroll axis > delta other axis, scroll instead of
          // making events
          ret = da >= doa;
        }
        this.firstXY = null;
        return ret;
      }
    },
    findTouch: function(inTL, inId) {
      for (var i = 0, l = inTL.length, t; i < l && (t = inTL[i]); i++) {
        if (t.identifier === inId) {
          return true;
        }
      }
    },

    // In some instances, a touchstart can happen without a touchend. This
    // leaves the pointermap in a broken state.
    // Therefore, on every touchstart, we remove the touches that did not fire a
    // touchend event.
    // To keep state globally consistent, we fire a
    // pointercancel for this "abandoned" touch
    vacuumTouches: function(inEvent) {
      var tl = inEvent.touches;

      // pointermap.size should be < tl.length here, as the touchstart has not
      // been processed yet.
      if (pointermap$1.size >= tl.length) {
        var d = [];
        pointermap$1.forEach(function(value, key) {

          // Never remove pointerId == 1, which is mouse.
          // Touch identifiers are 2 smaller than their pointerId, which is the
          // index in pointermap.
          if (key !== 1 && !this.findTouch(tl, key - 2)) {
            var p = value.out;
            d.push(p);
          }
        }, this);
        d.forEach(this.cancelOut, this);
      }
    },
    touchstart: function(inEvent) {
      this.vacuumTouches(inEvent);
      this.setPrimaryTouch(inEvent.changedTouches[0]);
      this.dedupSynthMouse(inEvent);
      if (!this.scrolling) {
        this.clickCount++;
        this.processTouches(inEvent, this.overDown);
      }
    },
    overDown: function(inPointer) {
      pointermap$1.set(inPointer.pointerId, {
        target: inPointer.target,
        out: inPointer,
        outTarget: inPointer.target
      });
      dispatcher.enterOver(inPointer);
      dispatcher.down(inPointer);
    },
    touchmove: function(inEvent) {
      if (!this.scrolling) {
        if (this.shouldScroll(inEvent)) {
          this.scrolling = true;
          this.touchcancel(inEvent);
        } else {
          inEvent.preventDefault();
          this.processTouches(inEvent, this.moveOverOut);
        }
      }
    },
    moveOverOut: function(inPointer) {
      var event = inPointer;
      var pointer = pointermap$1.get(event.pointerId);

      // a finger drifted off the screen, ignore it
      if (!pointer) {
        return;
      }
      var outEvent = pointer.out;
      var outTarget = pointer.outTarget;
      dispatcher.move(event);
      if (outEvent && outTarget !== event.target) {
        outEvent.relatedTarget = event.target;
        event.relatedTarget = outTarget;

        // recover from retargeting by shadow
        outEvent.target = outTarget;
        if (event.target) {
          dispatcher.leaveOut(outEvent);
          dispatcher.enterOver(event);
        } else {

          // clean up case when finger leaves the screen
          event.target = outTarget;
          event.relatedTarget = null;
          this.cancelOut(event);
        }
      }
      pointer.out = event;
      pointer.outTarget = event.target;
    },
    touchend: function(inEvent) {
      this.dedupSynthMouse(inEvent);
      this.processTouches(inEvent, this.upOut);
    },
    upOut: function(inPointer) {
      if (!this.scrolling) {
        dispatcher.up(inPointer);
        dispatcher.leaveOut(inPointer);
      }
      this.cleanUpPointer(inPointer);
    },
    touchcancel: function(inEvent) {
      this.processTouches(inEvent, this.cancelOut);
    },
    cancelOut: function(inPointer) {
      dispatcher.cancel(inPointer);
      dispatcher.leaveOut(inPointer);
      this.cleanUpPointer(inPointer);
    },
    cleanUpPointer: function(inPointer) {
      pointermap$1.delete(inPointer.pointerId);
      this.removePrimaryPointer(inPointer);
    },

    // prevent synth mouse events from creating pointer events
    dedupSynthMouse: function(inEvent) {
      var lts = mouseEvents.lastTouches;
      var t = inEvent.changedTouches[0];

      // only the primary finger will synth mouse events
      if (this.isPrimaryTouch(t)) {

        // remember x/y of last touch
        var lt = { x: t.clientX, y: t.clientY };
        lts.push(lt);
        var fn = (function(lts, lt) {
          var i = lts.indexOf(lt);
          if (i > -1) {
            lts.splice(i, 1);
          }
        }).bind(null, lts, lt);
        setTimeout(fn, DEDUP_TIMEOUT);
      }
    }
  };

  INSTALLER = new Installer(touchEvents.elementAdded, touchEvents.elementRemoved,
    touchEvents.elementChanged, touchEvents);

  var pointermap$2 = dispatcher.pointermap;
  var HAS_BITMAP_TYPE = window.MSPointerEvent &&
    typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE === 'number';
  var msEvents = {
    events: [
      'MSPointerDown',
      'MSPointerMove',
      'MSPointerUp',
      'MSPointerOut',
      'MSPointerOver',
      'MSPointerCancel',
      'MSGotPointerCapture',
      'MSLostPointerCapture'
    ],
    register: function(target) {
      dispatcher.listen(target, this.events);
    },
    unregister: function(target) {
      dispatcher.unlisten(target, this.events);
    },
    POINTER_TYPES: [
      '',
      'unavailable',
      'touch',
      'pen',
      'mouse'
    ],
    prepareEvent: function(inEvent) {
      var e = inEvent;
      if (HAS_BITMAP_TYPE) {
        e = dispatcher.cloneEvent(inEvent);
        e.pointerType = this.POINTER_TYPES[inEvent.pointerType];
      }
      return e;
    },
    cleanup: function(id) {
      pointermap$2.delete(id);
    },
    MSPointerDown: function(inEvent) {
      pointermap$2.set(inEvent.pointerId, inEvent);
      var e = this.prepareEvent(inEvent);
      dispatcher.down(e);
    },
    MSPointerMove: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.move(e);
    },
    MSPointerUp: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.up(e);
      this.cleanup(inEvent.pointerId);
    },
    MSPointerOut: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.leaveOut(e);
    },
    MSPointerOver: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.enterOver(e);
    },
    MSPointerCancel: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.cancel(e);
      this.cleanup(inEvent.pointerId);
    },
    MSLostPointerCapture: function(inEvent) {
      var e = dispatcher.makeEvent('lostpointercapture', inEvent);
      dispatcher.dispatchEvent(e);
    },
    MSGotPointerCapture: function(inEvent) {
      var e = dispatcher.makeEvent('gotpointercapture', inEvent);
      dispatcher.dispatchEvent(e);
    }
  };

  function applyPolyfill() {

    // only activate if this platform does not have pointer events
    if (!window.PointerEvent) {
      window.PointerEvent = PointerEvent;

      if (window.navigator.msPointerEnabled) {
        var tp = window.navigator.msMaxTouchPoints;
        Object.defineProperty(window.navigator, 'maxTouchPoints', {
          value: tp,
          enumerable: true
        });
        dispatcher.registerSource('ms', msEvents);
      } else {
        Object.defineProperty(window.navigator, 'maxTouchPoints', {
          value: 0,
          enumerable: true
        });
        dispatcher.registerSource('mouse', mouseEvents);
        if (window.ontouchstart !== undefined) {
          dispatcher.registerSource('touch', touchEvents);
        }
      }

      dispatcher.register(document);
    }
  }

  var n = window.navigator;
  var s;
  var r;
  var h;
  function assertActive(id) {
    if (!dispatcher.pointermap.has(id)) {
      var error = new Error('InvalidPointerId');
      error.name = 'InvalidPointerId';
      throw error;
    }
  }
  function assertConnected(elem) {
    var parent = elem.parentNode;
    while (parent && parent !== elem.ownerDocument) {
      parent = parent.parentNode;
    }
    if (!parent) {
      var error = new Error('InvalidStateError');
      error.name = 'InvalidStateError';
      throw error;
    }
  }
  function inActiveButtonState(id) {
    var p = dispatcher.pointermap.get(id);
    return p.buttons !== 0;
  }
  if (n.msPointerEnabled) {
    s = function(pointerId) {
      assertActive(pointerId);
      assertConnected(this);
      if (inActiveButtonState(pointerId)) {
        dispatcher.setCapture(pointerId, this, true);
        this.msSetPointerCapture(pointerId);
      }
    };
    r = function(pointerId) {
      assertActive(pointerId);
      dispatcher.releaseCapture(pointerId, true);
      this.msReleasePointerCapture(pointerId);
    };
  } else {
    s = function setPointerCapture(pointerId) {
      assertActive(pointerId);
      assertConnected(this);
      if (inActiveButtonState(pointerId)) {
        dispatcher.setCapture(pointerId, this);
      }
    };
    r = function releasePointerCapture(pointerId) {
      assertActive(pointerId);
      dispatcher.releaseCapture(pointerId);
    };
  }
  h = function hasPointerCapture(pointerId) {
    return !!dispatcher.captureInfo[pointerId];
  };

  function applyPolyfill$1() {
    if (window.Element && !Element.prototype.setPointerCapture) {
      Object.defineProperties(Element.prototype, {
        'setPointerCapture': {
          value: s
        },
        'releasePointerCapture': {
          value: r
        },
        'hasPointerCapture': {
          value: h
        }
      });
    }
  }

  applyAttributeStyles();
  applyPolyfill();
  applyPolyfill$1();

  var pointerevents = {
    dispatcher: dispatcher,
    Installer: Installer,
    PointerEvent: PointerEvent,
    PointerMap: PointerMap,
    targetFinding: targeting
  };

  return pointerevents;

}));

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(18),
    root = __webpack_require__(6);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(6);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(148);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(153),
    stubArray = __webpack_require__(106);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 57 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(89),
    baseKeys = __webpack_require__(161),
    isArrayLike = __webpack_require__(101);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(20);
var call = __webpack_require__(72);
var isArrayIter = __webpack_require__(71);
var anObject = __webpack_require__(5);
var toLength = __webpack_require__(47);
var getIterFn = __webpack_require__(84);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(10) && !__webpack_require__(34)(function () {
  return Object.defineProperty(__webpack_require__(33)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(5);
var dPs = __webpack_require__(76);
var enumBugKeys = __webpack_require__(43);
var IE_PROTO = __webpack_require__(28)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(33)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(49).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(13);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 67 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(0)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(7)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(22);
var toLength = __webpack_require__(47);
var toAbsoluteIndex = __webpack_require__(82);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(14);
var ITERATOR = __webpack_require__(0)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(5);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(64);
var descriptor = __webpack_require__(36);
var setToStringTag = __webpack_require__(27);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(0)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(0)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(25);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(16);
var anObject = __webpack_require__(5);
var getKeys = __webpack_require__(45);

module.exports = __webpack_require__(10) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(83);
var IE_PROTO = __webpack_require__(28)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(22);
var arrayIndexOf = __webpack_require__(69)(false);
var IE_PROTO = __webpack_require__(28)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(1);
var dP = __webpack_require__(16);
var DESCRIPTORS = __webpack_require__(10);
var SPECIES = __webpack_require__(0)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var defined = __webpack_require__(26);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(20);
var invoke = __webpack_require__(136);
var html = __webpack_require__(49);
var cel = __webpack_require__(33);
var global = __webpack_require__(1);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(21)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(26);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(32);
var ITERATOR = __webpack_require__(0)('iterator');
var Iterators = __webpack_require__(14);
module.exports = __webpack_require__(15).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(68);
var step = __webpack_require__(63);
var Iterators = __webpack_require__(14);
var toIObject = __webpack_require__(22);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(35)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(32);
var test = {};
test[__webpack_require__(0)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(13)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(80)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(35)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(85);
var getKeys = __webpack_require__(45);
var redefine = __webpack_require__(13);
var global = __webpack_require__(1);
var hide = __webpack_require__(7);
var Iterators = __webpack_require__(14);
var wks = __webpack_require__(0);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(163),
    isArguments = __webpack_require__(214),
    isArray = __webpack_require__(56),
    isBuffer = __webpack_require__(102),
    isIndex = __webpack_require__(190),
    isTypedArray = __webpack_require__(215);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 90 */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),
/* 91 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(93),
    eq = __webpack_require__(100);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(176);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(90),
    isArray = __webpack_require__(56);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)))

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(98);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(90),
    getPrototype = __webpack_require__(96),
    getSymbols = __webpack_require__(54),
    stubArray = __webpack_require__(106);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ }),
/* 98 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 99 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 100 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(103),
    isLength = __webpack_require__(104);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(6),
    stubFalse = __webpack_require__(216);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59)(module)))

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(39),
    isObject = __webpack_require__(30);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 104 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(89),
    baseKeysIn = __webpack_require__(162),
    isArrayLike = __webpack_require__(101);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),
/* 106 */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 108 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(132);

var _constants = __webpack_require__(9);

var _domUtils = __webpack_require__(3);

var htmlUtils = _interopRequireWildcard(_domUtils);

var _Events = __webpack_require__(2);

var Events = _interopRequireWildcard(_Events);

var _EventType = __webpack_require__(123);

__webpack_require__(48);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

ol.control.BZoomSlider = function (params) {
  this.options = params || {};

  this.currentResolution_ = undefined;

  this.direction_ = ol.control.BZoomSlider.Direction_.VERTICAL;

  this.dragging_ = false;

  this.heightLimit_ = 0;

  this.widthLimit_ = 0;

  this.previousX_ = null;

  this.previousY_ = null;

  this.thumbSize_ = null;

  this.sliderInitialized_ = false;

  this.duration_ = this.options['duration'] !== undefined ? this.options['duration'] : 200;

  this.viewHint = {
    ANIMATING: 0,
    INTERACTING: 1
  };

  this.pixelDelta_ = this.options['pixelDelta'] !== undefined ? this.options['pixelDelta'] : 128;

  var className = this.options.className !== undefined ? this.options.className : 'hmap-zoom-slider';

  this.element = htmlUtils.create('div', className + ' ' + _constants.BASE_CLASS_NAME.CLASS_UNSELECTABLE);

  var translateContent = htmlUtils.create('div', 'hmap-zoom-slider-translate-content' + ' ' + _constants.BASE_CLASS_NAME.CLASS_SELECTABLE, this.element);

  var silderContent = htmlUtils.create('div', 'hmap-zoom-slider-content' + ' ' + _constants.BASE_CLASS_NAME.CLASS_SELECTABLE, this.element);

  var translateN = htmlUtils.create('div', 'hmap-zoom-slider-button hmap-zoom-slider-translate-n' + ' ' + _constants.BASE_CLASS_NAME.CLASS_SELECTABLE, translateContent);
  translateN.setAttribute('title', '向上平移');
  Events.listen(translateN, _EventType.EventType.CLICK, ol.control.BZoomSlider.prototype.handletranslateClick_.bind(this, 'translateN'));
  var translateS = htmlUtils.create('div', 'hmap-zoom-slider-button hmap-zoom-slider-translate-s' + ' ' + _constants.BASE_CLASS_NAME.CLASS_SELECTABLE, translateContent);
  translateS.setAttribute('title', '向下平移');
  Events.listen(translateS, _EventType.EventType.CLICK, ol.control.BZoomSlider.prototype.handletranslateClick_.bind(this, 'translateS'));
  var translateW = htmlUtils.create('div', 'hmap-zoom-slider-button hmap-zoom-slider-translate-w' + ' ' + _constants.BASE_CLASS_NAME.CLASS_SELECTABLE, translateContent);
  translateW.setAttribute('title', '向左平移');
  Events.listen(translateW, _EventType.EventType.CLICK, ol.control.BZoomSlider.prototype.handletranslateClick_.bind(this, 'translateW'));
  var translateE = htmlUtils.create('div', 'hmap-zoom-slider-button hmap-zoom-slider-translate-e' + ' ' + _constants.BASE_CLASS_NAME.CLASS_SELECTABLE, translateContent);
  translateE.setAttribute('title', '向右平移');
  Events.listen(translateE, _EventType.EventType.CLICK, ol.control.BZoomSlider.prototype.handletranslateClick_.bind(this, 'translateE'));
  var zoomIn = htmlUtils.create('div', 'hmap-zoom-slider-zoom-in' + ' ' + _constants.BASE_CLASS_NAME.CLASS_SELECTABLE, silderContent);
  zoomIn.setAttribute('title', '放大');
  Events.listen(zoomIn, _EventType.EventType.CLICK, ol.control.BZoomSlider.prototype.handleZoomClick_.bind(this, 1));

  var zoomOut = htmlUtils.create('div', 'hmap-zoom-slider-zoom-out' + ' ' + _constants.BASE_CLASS_NAME.CLASS_SELECTABLE, silderContent);
  zoomOut.setAttribute('title', '缩小');
  Events.listen(zoomOut, _EventType.EventType.CLICK, ol.control.BZoomSlider.prototype.handleZoomClick_.bind(this, -1));

  var slider = htmlUtils.create('div', 'hmap-zoom-slider-zoom-slider' + ' ' + _constants.BASE_CLASS_NAME.CLASS_SELECTABLE, silderContent);
  this.sliderBackgroundTop = htmlUtils.create('div', 'slider-background-top' + ' ' + _constants.BASE_CLASS_NAME.CLASS_SELECTABLE, slider);
  this.sliderBackgroundBottom = htmlUtils.create('div', 'slider-background-bottom' + ' ' + _constants.BASE_CLASS_NAME.CLASS_SELECTABLE, slider);
  var sliderBackgroundMask = htmlUtils.create('div', 'slider-background-mask' + ' ' + _constants.BASE_CLASS_NAME.CLASS_SELECTABLE, slider);
  sliderBackgroundMask.setAttribute('title', '缩放到此级别');
  this.sliderBar = htmlUtils.create('div', 'slider-bar' + ' ' + _constants.BASE_CLASS_NAME.CLASS_SELECTABLE, slider);
  this.sliderBar.setAttribute('title', '滑动缩放地图');

  this.silderContent = silderContent;

  Events.listen(this.silderContent, 'pointerdown', this.handleDraggerStart_, this);
  Events.listen(this.silderContent, 'pointermove', this.handleDraggerDrag_, this);
  Events.listen(this.silderContent, 'pointerup', this.handleDraggerEnd_, this);
  Events.listen(this.silderContent, _EventType.EventType.CLICK, this.handleContainerClick_, this);
  Events.listen(this.sliderBar, _EventType.EventType.CLICK, function (event) {
    event.stopPropagation();
  });
  var render = this.options['render'] ? this.options['render'] : ol.control.BZoomSlider.render;
  ol.control.Control.call(this, {
    element: this.element,
    render: render,
    target: this.options['target']
  });
};

ol.inherits(ol.control.BZoomSlider, ol.control.Control);

ol.control.BZoomSlider.prototype.handleZoomClick_ = function (delta, event) {
  event.preventDefault();
  this.zoomByDelta_(delta);
};

ol.control.BZoomSlider.prototype.handletranslateClick_ = function (type, event) {
  event.preventDefault();
  var view = this.getMap().getView();
  var mapUnitsDelta = view.getResolution() * this.pixelDelta_;
  var deltaX = 0,
      deltaY = 0;

  switch (type) {
    case 'translateN':
      deltaY = mapUnitsDelta;
      break;
    case 'translateS':
      deltaY = -mapUnitsDelta;
      break;
    case 'translateW':
      deltaX = mapUnitsDelta;
      break;
    case 'translateE':
      deltaX = -mapUnitsDelta;
      break;
  }
  var delta = [deltaX, deltaY];
  ol.coordinate.rotate(delta, view.getRotation());
  this.pan(view, delta, this.duration_);
};

ol.control.BZoomSlider.prototype.pan = function (view, delta, optDuration) {
  var currentCenter = view.getCenter();
  if (currentCenter) {
    var center = view.constrainCenter([currentCenter[0] + delta[0], currentCenter[1] + delta[1]]);
    if (optDuration) {
      view.animate({
        duration: optDuration,
        easing: ol.easing.linear,
        center: center
      });
    } else {
      view.setCenter(center);
    }
  }
};

ol.control.BZoomSlider.prototype.zoomByDelta_ = function (delta) {
  var view = this.getMap().getView();
  if (view && view instanceof ol.View) {
    var currentResolution = view.getResolution();
    if (currentResolution) {
      var newResolution = view.constrainResolution(currentResolution, delta);
      if (this.duration_ > 0) {
        if (view.getAnimating()) {
          view.cancelAnimations();
        }
        view.animate({
          resolution: newResolution,
          duration: this.duration_,
          easing: ol.easing.easeOut
        });
      } else {
        view.setResolution(newResolution);
      }
    }
  }
};

ol.control.BZoomSlider.render = function (mapEvent) {
  if (!mapEvent.frameState) {
    return;
  }
  if (!this.sliderInitialized_) {
    this.initSlider_();
  }
  var res = mapEvent.frameState.viewState.resolution;
  if (res !== this.currentResolution_) {
    this.currentResolution_ = res;
    this.setThumbPosition_(res);
  }
};

ol.control.BZoomSlider.Direction_ = {
  VERTICAL: 0,
  HORIZONTAL: 1
};

ol.control.BZoomSlider.prototype.setMap = function (map) {
  if (map && map instanceof ol.Map) {
    ol.control.Control.prototype.setMap.call(this, map);
    if (map) {
      map.render();
    }
  } else {
    throw Error('传入的不是地图对象！');
  }
};

ol.control.BZoomSlider.prototype.disposeInternal = function () {
  Events.listen(this.silderContent, 'pointercancel', function (event) {}, this);
  ol.control.Control.prototype.disposeInternal.call(this);
};

ol.control.BZoomSlider.prototype.initSlider_ = function () {
  var container = this.silderContent;
  var containerSize = {
    width: container.offsetWidth, height: container.offsetHeight
  };
  var thumb = htmlUtils.getElementsByClassName('.slider-bar', container);
  var computedStyle = getComputedStyle(thumb);
  var thumbWidth = thumb.offsetWidth + parseFloat(computedStyle['marginRight']) + parseFloat(computedStyle['marginLeft']);
  var thumbHeight = thumb.offsetHeight + parseFloat(computedStyle['marginTop']) + parseFloat(computedStyle['marginBottom']);
  this.thumbSize_ = [thumbWidth, thumbHeight];
  if (containerSize.width > containerSize.height) {
    this.direction_ = ol.control.BZoomSlider.Direction_.HORIZONTAL;
    this.widthLimit_ = containerSize.width - thumbWidth;
  } else {
    this.direction_ = ol.control.BZoomSlider.Direction_.VERTICAL;
    this.heightLimit_ = containerSize.height - thumbHeight;
  }
  this.sliderInitialized_ = true;
};

ol.control.BZoomSlider.prototype.handleContainerClick_ = function (event) {
  var view = this.getMap().getView();
  var relativePosition = this.getRelativePosition_(event.offsetX - this.thumbSize_[0] / 2, event.offsetY - this.thumbSize_[1] / 2);
  var resolution = this.getResolutionForPosition_(relativePosition);
  view.animate({
    resolution: view.constrainResolution(resolution),
    duration: this.duration_,
    easing: ol.easing.easeOut
  });
};

ol.control.BZoomSlider.prototype.handleDraggerStart_ = function (event) {
  if (!this.dragging_ && event.target === htmlUtils.getElementsByClassName('.slider-bar', this.silderContent)) {
    this.previousX_ = event.clientX;
    this.previousY_ = event.clientY;
    this.dragging_ = true;
  }
};

ol.control.BZoomSlider.prototype.handleDraggerDrag_ = function (event) {
  if (this.dragging_) {
    var element = htmlUtils.getElementsByClassName('.slider-bar', this.silderContent);
    var deltaX = event.clientX - this.previousX_ + parseInt(element.style.left, 10);
    var deltaY = event.clientY - this.previousY_ + parseInt(element.style.top, 10);
    var relativePosition = this.getRelativePosition_(deltaX, deltaY);
    this.currentResolution_ = this.getResolutionForPosition_(relativePosition);
    this.getMap().getView().setResolution(this.currentResolution_);
    this.setThumbPosition_(this.currentResolution_);
    this.previousX_ = event.clientX;
    this.previousY_ = event.clientY;
  }
};

ol.control.BZoomSlider.prototype.handleDraggerEnd_ = function (event) {
  if (this.dragging_) {
    var view = this.getMap().getView();

    view.animate({
      resolution: view.constrainResolution(this.currentResolution_),
      duration: this.duration_,
      easing: ol.easing.easeOut
    });
    this.dragging_ = false;
    this.previousX_ = undefined;
    this.previousY_ = undefined;
  }
};

ol.control.BZoomSlider.prototype.setThumbPosition_ = function (res) {
  var position = this.getPositionForResolution_(res);
  var thumb = htmlUtils.getElementsByClassName('.slider-bar', this.silderContent);
  if (this.direction_ === ol.control.BZoomSlider.Direction_.HORIZONTAL) {
    thumb.style.left = this.widthLimit_ * position + 'px';
    this.sliderBackgroundBottom.style.width = this.widthLimit_ - (this.widthLimit_ * position - 5) + 'px';
  } else {
    thumb.style.top = this.heightLimit_ * position + 'px';
    this.sliderBackgroundBottom.style.height = this.heightLimit_ - (this.heightLimit_ * position - 5) + 'px';
  }
};

ol.control.BZoomSlider.prototype.getRelativePosition_ = function (x, y) {
  var amount = void 0;
  if (this.direction_ === ol.control.BZoomSlider.Direction_.HORIZONTAL) {
    amount = x / this.widthLimit_;
  } else {
    amount = y / this.heightLimit_;
  }
  return Math.min(Math.max(amount, 0), 1);
};

ol.control.BZoomSlider.prototype.getResolutionForPosition_ = function (position) {
  var view = this.getMap().getView();
  if (view && view instanceof ol.View) {
    return this.getResolutionForValueFunction(1 - position);
  }
};

ol.control.BZoomSlider.prototype.getValueForResolutionFunction = function (resolution, optPower) {
  var power = optPower || 2;
  var view = this.getMap().getView();
  var maxResolution = view.getMaxResolution();
  var minResolution = view.getMinResolution();
  var max = Math.log(maxResolution / minResolution) / Math.log(power);
  return Math.log(maxResolution / resolution) / Math.log(power) / max;
};

ol.control.BZoomSlider.prototype.getResolutionForValueFunction = function (value, optPower) {
  var power = optPower || 2;
  var view = this.getMap().getView();
  var maxResolution = view.getMaxResolution();
  var minResolution = view.getMinResolution();
  var max = Math.log(maxResolution / minResolution) / Math.log(power);
  return maxResolution / Math.pow(power, value * max);
};

ol.control.BZoomSlider.prototype.getPositionForResolution_ = function (res) {
  var view = this.getMap().getView();
  if (view && view instanceof ol.View) {
    return 1 - this.getValueForResolutionFunction(res);
  }
};

var olControlBZoomSlider = ol.control.BZoomSlider;

exports.default = olControlBZoomSlider;
module.exports = exports['default'];

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(128);

var _constants = __webpack_require__(9);

var _domUtils = __webpack_require__(3);

var htmlUtils = _interopRequireWildcard(_domUtils);

var _Events = __webpack_require__(2);

var Events = _interopRequireWildcard(_Events);

var _layerUtils = __webpack_require__(17);

var _layerUtils2 = _interopRequireDefault(_layerUtils);

var _mixin = __webpack_require__(19);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

ol.control.LayerSwitcher = function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  this.options = params;

  this.className_ = this.options.className !== undefined ? this.options.className : 'hmap-layer-switcher';

  this.options['itemWidth'] = this.options['itemWidth'] === 'number' ? this.options['itemWidth'] : 86;

  this.baseLayers_ = [];

  this.labelLayers_ = [];

  this.baseLayerKey = this.options['baseLayerKey'] ? this.options['baseLayerKey'] : 'isBaseLayer';

  this.isDefaultKey = this.options['isDefaultKey'] ? this.options['isDefaultKey'] : 'isDefault';

  this.labelAliasKey = this.options['labelAlias'] ? this.options['labelAlias'] : 'layerName';

  this.labelLayerKey = this.options['labelLayerKey'] ? this.options['labelLayerKey'] : 'isLabelLayerKey';

  this.isActionSelected_ = false;

  this.options['itemHeight'] = typeof this.options['itemHeight'] === 'number' ? this.options['itemHeight'] : 60;

  this.options['key'] = this.options['key'] ? this.options['key'] : 'layerName';
  if (this.labelLayerKey === this.baseLayerKey) {
    throw new Error('标注图层关键字不能和底图相同！');
  }

  this.element_ = htmlUtils.create('div', this.className_ + ' ' + _constants.BASE_CLASS_NAME.CLASS_UNSELECTABLE);
  Events.listen(this.element_, 'mouseover', this.contentMouseOver_, this);
  Events.listen(this.element_, 'mouseout', this.contentMouseOut_, this);

  this.innerElement_ = htmlUtils.create('ul', this.className_ + '-ul-inner', this.element_, this.className_ + '-ul-inner');

  if (this.options['layers'] && Array.isArray(this.options['layers']) && this.options['layers'].length > 0) {
    this.initDomInternal(this.options['layers'], this.className_, this.options['key']);
  }

  ol.control.Control.call(this, {
    element: this.element_,
    target: this.options['target']
  });
};

ol.inherits(ol.control.LayerSwitcher, ol.control.Control);
(0, _mixin2.default)(ol.control.LayerSwitcher, _layerUtils2.default);

ol.control.LayerSwitcher.prototype.initDomInternal = function (layers, className, key) {
  var _this = this;

  var width = this.options['itemWidth'];
  var height = this.options['itemHeight'];
  var length = layers.length;
  this.innerElement_.style.width = width + (length - 1) * 10 + 'px';
  this.innerElement_.style.height = height + 'px';
  layers.forEach(function (item, index) {
    if (item && item[key]) {
      var li_ = htmlUtils.create('li', className + '-li-inner', _this.innerElement_, className + '-li' + index + '-inner');
      li_.style.background = 'url(' + item['icon'] + ') 0px 0px no-repeat';
      li_.style.width = width + 'px';
      li_.style.height = height + 'px';
      li_.style.zIndex = index + 1;
      li_.style.right = '0px';
      li_.style.marginRight = (length - 1 - index) * 10 + 'px';
      li_.setAttribute('data-name', item[key]);
      Events.listen(li_, 'click', _this.handleClick_, _this);
      if (item['name']) {
        var name_ = htmlUtils.create('span', 'layer-name', li_);
        name_.setAttribute('data-name', item[key]);
        name_.innerHTML = item['name'];
      }
      if (!_this.isActionSelected_ && (item[_this.isDefaultKey] || index === length - 1)) {
        htmlUtils.addClass(li_, 'selected-item');
        _this.isActionSelected_ = true;
      }
    }
  });
};

ol.control.LayerSwitcher.prototype.contentMouseOver_ = function (event) {
  var length = this.options['layers'].length;
  if (length > 0) {
    for (var i = 0; i < length - 1; i++) {
      var item = htmlUtils.get(this.className_ + '-li' + i + '-inner');
      if (item) {
        item.style.marginRight = '0px';
        item.style.zIndex = '';
        item.style.right = (length - 1 - i) * (10 + this.options['itemWidth']) + 'px';
      }
    }
    this.innerElement_.style.width = this.options['itemWidth'] * length + 10 * (length - 1) + 'px';
  }
};

ol.control.LayerSwitcher.prototype.contentMouseOut_ = function (event) {
  var length = this.options['layers'].length;
  if (length > 0) {
    for (var i = 0; i < length - 1; i++) {
      var item = htmlUtils.get(this.className_ + '-li' + i + '-inner');
      if (item) {
        item.style.zIndex = i + 1;
        item.style.right = '0px';
        item.style.marginRight = (length - 1 - i) * 10 + 'px';
      }
    }
    this.innerElement_.style.width = this.options['itemWidth'] + (length - 1) * 10 + 'px';
  }
};

ol.control.LayerSwitcher.prototype.handleClick_ = function (event) {
  var value = event.target.getAttribute('data-name');
  this.switcher(this.options['key'], value);
};

ol.control.LayerSwitcher.prototype.switcher = function (key, value) {
  var _this2 = this;

  if (!this.map) return;
  if (this.baseLayers_.length <= 0) {
    this.baseLayers_ = this.getLayersArrayByKeyValue(this.baseLayerKey, true);
  }
  if (this.labelLayers_.length <= 0) {
    this.labelLayers_ = this.getLayersArrayByKeyValue(this.labelLayerKey, true);
  }
  if (this.baseLayers_.length > 0 && this.baseLayers_.length === this.options['layers'].length) {
    if (this.labelLayers_ && this.labelLayers_.length > 0) {
      this.labelLayers_.forEach(function (labelLayer) {
        if (labelLayer && labelLayer.get(_this2.labelAliasKey) === value) {
          labelLayer.setVisible(true);
        } else {
          labelLayer.setVisible(false);
        }
      });
    }
    this.baseLayers_.forEach(function (layer) {
      if (layer && layer.get(key) === value) {
        layer.setVisible(true);
        layer.set(_this2.isDefaultKey, true);
      } else {
        layer.setVisible(false);
        layer.set(_this2.isDefaultKey, false);
      }
    });
    var length = this.options['layers'].length;
    if (length > 0) {
      for (var i = 0; i < length; i++) {
        var item = htmlUtils.get(this.className_ + '-li' + i + '-inner');
        if (item && item.getAttribute('data-name') === value) {
          htmlUtils.addClass(item, 'selected-item');
        } else {
          htmlUtils.removeClass(item, 'selected-item');
        }
      }
    }
  } else {
    throw new Error('请检查是否存在底图获取底图数量是否和配置相同！');
  }
};

ol.control.LayerSwitcher.prototype.setMap = function (map) {
  ol.control.Control.prototype.setMap.call(this, map);
  this.map = map;
  if (map && map instanceof ol.Map) {
    debugger
    this.baseLayers_ = this.getLayersArrayByKeyValue(this.baseLayerKey, true);
    this.labelLayers_ = this.getLayersArrayByKeyValue(this.labelLayerKey, true);
  }
};

var olControlLayerSwitcher = ol.control.LayerSwitcher;
exports.default = olControlLayerSwitcher;
module.exports = exports['default'];

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(9);

var _domUtils = __webpack_require__(3);

var htmlUtils = _interopRequireWildcard(_domUtils);

__webpack_require__(129);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

ol.control.Loading = function (params) {
  this.options = params || {};

  this.mapListeners = [];

  this.tileListeners = [];

  this.loadStatus_ = false;

  this.isFirstRander = true;

  this.loadProgress_ = [0, 1];

  if (this.options['widget']) {
    if (['animatedGif', 'progressBar'].indexOf(this.options['widget']) === -1) {
      throw Error('不支持的挂件类型');
    } else {
      this.widget = this.options['widget'] ? this.options['widget'] : 'animatedGif';
    }
  }

  if (this.options['progressMode']) {
    if (['tile', 'layer'].indexOf(this.options['progressMode']) === -1) {
      throw Error('不支持的进度条模式');
    }
    this.loadProgressByTile_ = this.options['progressMode'] === 'layer' ? !(this.options['progressMode'] === 'layer') : true;
  }

  this.showPanel = typeof this.options['showPanel'] === 'boolean' ? this.options['showPanel'] : true;
  var className = this.options.className !== undefined ? this.options.className : 'hmap-loading-panel';

  var elementDom = this.widget === 'animatedGif' ? 'span' : 'progress';
  var element = htmlUtils.create(elementDom, className + ' ' + _constants.BASE_CLASS_NAME.CLASS_UNSELECTABLE);
  if (this.widget === 'progressBar') {
    var div = htmlUtils.create('div', 'hmap-progress-bar');
    htmlUtils.create('span', '', div);
  }
  this.onCustomStart = this.options['onStart'] ? this.options['onStart'] : false;
  this.onCustomProgress = this.options['onProgress'] ? this.options['onProgress'] : false;
  this.onCustomEnd = this.options['onEnd'] ? this.options['onEnd'] : false;
  ol.control.Control.call(this, {
    element: element,
    target: this.options['target']
  });
};

ol.inherits(ol.control.Loading, ol.control.Control);

ol.control.Loading.prototype.setup = function () {
  var _this = this;

  this.setDomPosition();
  this.resize();
  var pointerDown = this.getMap().on('pointerdown', function () {
    _this.hide();
  });
  var beforeRander = this.getMap().on('precompose', function () {
    if (_this.isFirstRander) {
      _this.isFirstRander = false;
      _this.registerLayersLoadEvents_();
      _this.show();
      if (_this.onCustomStart) {
        var args = [];
        _this.onCustomStart.apply(_this, args);
      }
    }
  });
  var afterRander = this.getMap().on('postrender', function () {
    _this.updateLoadStatus_();
    if (_this.loadStatus_) {
      if (_this.onCustomEnd) {
        var args = [];
        _this.onCustomEnd.apply(_this, args);
      }
      _this.hide();
    }
  });
  this.mapListeners.push(pointerDown);
  this.mapListeners.push(beforeRander);
  this.mapListeners.push(afterRander);
};

ol.control.Loading.prototype.setDomPosition = function () {
  var size = this.getMap().getSize();
  var domSize = [this.element.clientWidth, this.element.clientHeight];
  this.element.style.left = String(Math.round((size[0] - domSize[0]) / 2)) + 'px';
  this.element.style.bottom = String(Math.round((size[1] - domSize[1]) / 2)) + 'px';
};

ol.control.Loading.prototype.resize = function () {
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var doc = window.document;
  var that = this;
  window.addEventListener(resizeEvt, function () {
    setTimeout(function () {
      that.setDomPosition();
    }, 50);
  }, false);
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setTimeout(function () {
        that.setDomPosition();
      }, 50);
    }
  }, false);
  if (doc.readyState === 'complete') {
    setTimeout(function () {
      that.setDomPosition();
    }, 50);
  } else {
    doc.addEventListener('DOMContentLoaded', function (e) {
      setTimeout(function () {
        that.setDomPosition();
      }, 50);
    }, false);
  }
};

ol.control.Loading.prototype.updateSourceLoadStatus_ = function (source) {
  return Math.round(source.loaded / source.loading * 100) === 100;
};

ol.control.Loading.prototype.registerLayerLoadEvents_ = function (layer) {
  var that = this;
  layer.getSource().on('tileloadstart', function (event) {
    if (that.loadStatus_) {
      that.loadStatus_ = false;
      that.loadProgress_ = [0, 1];
      if (that.widget === 'progressBar') {
        that.element.value = that.loadProgress_[0];
        that.element.max = that.loadProgress_[1];
      }
      that.show();
      if (that.onCustomStart) {
        var args = [];
        that.onCustomStart.apply(that, args);
      }
    }
    this.loading = this.loading ? this.loading + 1 : 1;
    this.isLoaded = that.updateSourceLoadStatus_(this);
    if (that.loadProgressByTile_) {
      this.loadProgress_[1] += 1;
      if (this.widget === 'progressBar') {
        that.element.max = that.loadProgress_[1];
        var progressBarDiv = that.element.getElementsByClassName('hmap-progress-bar');
        if (progressBarDiv.length > 0) progressBarDiv[0].children()[0].width = String(parseInt(100 * that.progress(), 0)) + '%';
      }
    }
  });
  layer.getSource().on(['tileloadend', 'tileloaderror'], function (e) {
    if (e.tile.getState() === 3) {
      console.warn('Loading tile failed for resource \'' + e.tile.src_ + '\'');
    }
    this.loaded = this.loaded ? this.loaded + 1 : 1;
    this.isLoaded = that.updateSourceLoadStatus_(this);
    if (that.loadProgressByTile_) {
      that.loadProgress_[0] += 1;
      if (that.widget === 'progressBar') {
        that.element.value = that.loadProgress_[0];
        var progressBarDiv = this.element.getElementsByClassName('hmap-progress-bar');
        if (progressBarDiv.length > 0) {
          progressBarDiv[0].children()[0].width = String(parseInt(100 * that.progress(), 0)) + '%';
        }
      }
      if (that.onCustomProgress) {
        that.onCustomProgress.apply(that, that.loadProgress_);
      }
    }
  });
};

ol.control.Loading.prototype.registerLayersLoadEvents_ = function () {
  var groups = this.getMap().getLayers().getArray();
  for (var i = 0; i < groups.length; i++) {
    var layer = groups[i];
    if (layer instanceof ol.layer.Group) {
      var layers = layer.getLayers().getArray();
      for (var j = 0; j < layers.length; j++) {
        var l = layers[j];
        if (!(l instanceof ol.layer.Vector)) {
          this.tileListeners.push(this.registerLayerLoadEvents_(l));
        }
      }
    } else if (layer instanceof ol.layer.Layer) {
      if (!(layer instanceof ol.layer.Vector)) {
        this.tileListeners.push(this.registerLayerLoadEvents_(layer));
      }
    }
  }
};

ol.control.Loading.prototype.updateLoadStatus_ = function () {
  var loadStatusArray = [];
  var groups = this.getMap().getLayers().getArray();
  for (var i = 0; i < groups.length; i++) {
    var layer = groups[i];
    if (layer instanceof ol.layer.Group) {
      var layers = layer.getLayers().getArray();
      for (var j = 0; j < layers.length; j++) {
        var l = layers[j];
        if (!(l instanceof ol.layer.Vector)) {
          loadStatusArray.push(l.getSource().isLoaded);
        }
      }
    } else {
      loadStatusArray.push(layer.getSource().isLoaded);
    }
  }
  this.loadStatus_ = loadStatusArray.indexOf(false) === -1 && loadStatusArray.indexOf(true) !== -1;
  if (!this.loadProgressByTile_) {
    var count = {};
    loadStatusArray.forEach(function (i) {
      count[i] = (count[i] || 0) + 1;
    });
    var loaded = count[true] ? count[true] : 0;

    if (loaded > this.loadProgress_[0]) {
      this.loadProgress_ = [loaded, loadStatusArray.length];
      if (this.widget === 'progressBar') {
        this.element.max = this.loadProgress_[1];
        this.element.value = this.loadProgress_[0];
      }
      if (this.onCustomProgress) this.onCustomProgress.apply(this, this.loadProgress_);
    }
  }
};

ol.control.Loading.prototype.show = function () {
  if (this.showPanel) {
    this.element.style.display = 'block';
  }
};

ol.control.Loading.prototype.hide = function () {
  if (this.showPanel) {
    this.element.style.display = 'none';
  }
};

ol.control.Loading.prototype.progressDetails = function () {
  return this.loadProgress_;
};

ol.control.Loading.prototype.progress = function () {
  return this.loadProgress_[0] / this.loadProgress_[1];
};

ol.control.Loading.prototype.setMap = function (map) {
  var _this2 = this;

  if (this.mapListeners && this.mapListeners.length > 0) {
    this.mapListeners.forEach(function (listener) {
      _this2.getMap().unByKey(listener);
    });
  }
  this.mapListeners.length = 0;
  ol.control.Control.prototype.setMap.call(this, map);
  if (map) {
    this.setup();
  }
};

var olControlLoading = ol.control.Loading;
exports.default = olControlLoading;
module.exports = exports['default'];

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(125);

var _constants = __webpack_require__(9);

var _domUtils = __webpack_require__(3);

var htmlUtils = _interopRequireWildcard(_domUtils);

var _Events = __webpack_require__(2);

var Events = _interopRequireWildcard(_Events);

__webpack_require__(48);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

ol.control.CompareLayer = function (beforeMap, afterMap, params) {
  this.options = params || {};
  if (beforeMap && afterMap) {
    this.beforeMap = beforeMap;
    this.afterMap = afterMap;
  } else {
    throw new Error('图层必须传入！');
  }

  this.orderLayerZindex();

  this.className = this.options.className !== undefined ? this.options.className : 'hmap-compare';

  this.initPosition = this.options['initPosition'] !== undefined ? this.options['initPosition'] : 0.5;

  this.dragging_ = false;

  this.previousX_ = null;

  this.previousY_ = null;

  this.element_ = htmlUtils.create('div', this.className + ' ' + _constants.BASE_CLASS_NAME.CLASS_UNSELECTABLE);

  var innerElement_ = htmlUtils.create('div', this.className + '-inner', this.element_);

  Events.listen(innerElement_, 'pointerdown', this.handleDraggerStart_, this);
  Events.listen(innerElement_, 'pointermove', this.handleDraggerDrag_, this);
  Events.listen(innerElement_, 'pointerup', this.handleDraggerEnd_, this);
  Events.listen(window, 'pointerup', this.handleDraggerEnd_, this);

  ol.control.Control.call(this, {
    element: this.element_,
    target: this.options['target']
  });
};

ol.inherits(ol.control.CompareLayer, ol.control.Control);

ol.control.CompareLayer.prototype.initControl = function () {
  this._bounds = this.getMap().getTargetElement().getBoundingClientRect();
  this.percent = 0.5;
  this._setPosition(this._bounds.width, this._bounds.width / 2);
  this.resize();
  this.clipLayer();
};

ol.control.CompareLayer.prototype.handleDraggerStart_ = function (event) {
  if (!this.dragging_ && event.target === htmlUtils.getElementsByClassName('.' + this.className + '-inner', this.element_)) {
    this.previousX_ = event.clientX;
    this.previousY_ = event.clientY;
    this.dragging_ = true;
  }
};

ol.control.CompareLayer.prototype.handleDraggerDrag_ = function (event) {
  if (this.dragging_) {
    this._bounds = this.getMap().getTargetElement().getBoundingClientRect();
    this._setPosition(this._bounds.width, this._getX(event));
    this.previousX_ = event.clientX;
    this.previousY_ = event.clientY;
  }
};

ol.control.CompareLayer.prototype.handleDraggerEnd_ = function (event) {
  if (this.dragging_) {
    this.dragging_ = false;
    this.previousX_ = undefined;
    this.previousY_ = undefined;
  }
};

ol.control.CompareLayer.prototype.clipLayer = function () {
  var that = this;
  this.getMap().un('precompose', this.precompose);
  this.getMap().un('postcompose', this.postcompose);
  this.precompose = this.beforeMap.on('precompose', function (event) {
    var ctx = event.context;
    var width = ctx.canvas.width * that.initPosition;
    ctx.save();
    ctx.beginPath();
    ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height);
    ctx.clip();
  });
  this.postcompose = this.beforeMap.on('postcompose', function (event) {
    var ctx = event.context;
    ctx.restore();
  });
};

ol.control.CompareLayer.prototype._setPosition = function (sourceWidth, value) {
  var pos = 'translate(' + value + 'px, 0)';
  this.element_.style.transform = pos;
  this.element_.style.WebkitTransform = pos;
  this._x = value;
  this.percent = value / sourceWidth;
  this.initPosition = value / sourceWidth;
  this.getMap().render();
};

ol.control.CompareLayer.prototype.resize = function () {
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var doc = window.document;
  var that = this;
  window.addEventListener(resizeEvt, function () {
    setTimeout(function () {
      that._bounds = that.getMap().getTargetElement().getBoundingClientRect();
      that._setPosition(that._bounds.width, that._bounds.width * that.percent);
    }, 50);
  }, false);
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setTimeout(function () {
        that._bounds = that.getMap().getTargetElement().getBoundingClientRect();
        that._setPosition(that._bounds.width, that._bounds.width * that.percent);
      }, 50);
    }
  }, false);
  if (doc.readyState === 'complete') {
    setTimeout(function () {
      that._bounds = that.getMap().getTargetElement().getBoundingClientRect();
      that._setPosition(that._bounds.width, that._bounds.width * that.percent);
    }, 50);
  } else {
    doc.addEventListener('DOMContentLoaded', function (e) {
      setTimeout(function () {
        that._bounds = that.getMap().getTargetElement().getBoundingClientRect();
        that._setPosition(that._bounds.width, that._bounds.width * that.percent);
      }, 50);
    }, false);
  }
};

ol.control.CompareLayer.prototype._getX = function (e) {
  e = e.touches ? e.touches[0] : e;
  var x = e.clientX - this._bounds.left;
  if (x < 0) x = 0;
  if (x > this._bounds.width) x = this._bounds.width;
  return x;
};

ol.control.CompareLayer.prototype.setMap = function (map) {
  if (map && map instanceof ol.Map) {
    ol.control.Control.prototype.setMap.call(this, map);
    if (map) {
      map.render();
      this.initControl();
    }
  } else {
    throw Error('传入的不是地图对象！');
  }
};

ol.control.CompareLayer.prototype.setBeforeLayet = function (beforeMap) {
  if (beforeMap) {
    this.beforeMap = beforeMap;
    this.orderLayerZindex();
  } else {
    throw Error('设置图层错误！');
  }
};

ol.control.CompareLayer.prototype.setAfterLayer = function (afterMap) {
  if (afterMap) {
    this.afterMap = afterMap;
    this.orderLayerZindex();
  } else {
    throw Error('设置图层错误！');
  }
};

ol.control.CompareLayer.prototype.orderLayerZindex = function () {
  if (this.afterMap && this.beforeMap) {
    var afterMapIndex = this.afterMap.getZIndex();
    var beforeMapIndex = this.beforeMap.getZIndex();
    var max = Math.max(afterMapIndex, beforeMapIndex);
    var min = Math.min(afterMapIndex, beforeMapIndex);
    if (max === min) {
      max = max + 1;
    }
    this.beforeMap.setZIndex(max);
    this.afterMap.setZIndex(min);
  }
};

var olControlCompareLayer = ol.control.CompareLayer;
exports.default = olControlCompareLayer;
module.exports = exports['default'];

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(126);

var _constants = __webpack_require__(9);

var _domUtils = __webpack_require__(3);

var htmlUtils = _interopRequireWildcard(_domUtils);

var _Events = __webpack_require__(2);

var Events = _interopRequireWildcard(_Events);

var _observableEmit = __webpack_require__(31);

var _observableEmit2 = _interopRequireDefault(_observableEmit);

var _mixin = __webpack_require__(19);

var _mixin2 = _interopRequireDefault(_mixin);

var _cloneDeep = __webpack_require__(135);

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

ol.control.ContextMenu = function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  this.options = params;

  this.mapContent = null;

  this.pixel = [];

  this.itemWidth = typeof this.options['itemWidth'] === 'number' ? this.options['itemWidth'] : 160;

  this.itemHeight = typeof this.options['itemHeight'] === 'number' ? this.options['itemHeight'] : 30;

  this.className_ = this.options.className !== undefined ? this.options.className : 'hmap-context-menu-content';

  this.element_ = htmlUtils.create('div', this.className_ + ' ' + _constants.BASE_CLASS_NAME.CLASS_UNSELECTABLE);
  this.element_.style.display = 'none';
  ol.control.Control.call(this, {
    element: this.element_,
    target: this.options['target']
  });
  _observableEmit2.default.call(this);
};

ol.inherits(ol.control.ContextMenu, ol.control.Control);
(0, _mixin2.default)(ol.control.ContextMenu, _observableEmit2.default);

ol.control.ContextMenu.prototype.initDomInternal = function (items) {
  this.htmlUtils(items, '', this.element_);
  if (this.getMap()) {
    this.mapContent = this.getMap().getViewport();
    Events.listen(this.mapContent, 'contextmenu', this.mouseDownHandle_, this);
  }
};

ol.control.ContextMenu.prototype.mouseDownHandle_ = function (event) {
  var that = this;
  event.stopPropagation();
  event.preventDefault();
  if (event.button === 2) {
    that.pixel = this.getMap().getEventPixel(event);
    this.dispatch('before-show', event);
    window.setTimeout(function () {
      that.show(that.pixel);
      that.dispatch('show', event);
    }, 50);
  }
  Events.listen(event.target, 'mousedown', function () {
    that.hide();
    that.dispatch('hide', event);
  }, this, true);
};

ol.control.ContextMenu.prototype.show = function (position) {
  this.element_.style.display = 'block';
  this.element_.style.top = position[1] + 'px';
  this.element_.style.left = position[0] + 'px';
  var aDoc = this.getMap().getSize();
  var maxWidth = aDoc[0] - this.element_.offsetWidth;
  var maxHeight = aDoc[1] - this.element_.offsetHeight;
  if (this.element_.offsetTop > maxHeight) {
    this.element_.style.top = maxHeight + 'px';
  }
  if (this.element_.offsetLeft > maxWidth) {
    this.element_.style.left = maxWidth + 'px';
  }
};

ol.control.ContextMenu.prototype.hide = function () {
  this.element_.style.display = 'none';
  this.pixel = [];
};

ol.control.ContextMenu.prototype.htmlUtils = function (items, index, content, isOffset) {
  var _this = this;

  var that = this;
  var ulList = null;
  if (items && Array.isArray(items) && items.length > 0) {
    ulList = htmlUtils.create('ul', this.className_ + '-ul' + index + '-inner', content, this.className_ + '-ul' + index + '-inner');
    if (isOffset) {
      ulList.style.position = 'absolute';
      ulList.style.top = '0px';
      ulList.style.left = this.itemWidth + 20 + 'px';
    }
    items.forEach(function (item, index_) {
      if (item && item['name'] && item['alias']) {
        var numList = index + '-' + index_;
        var li_ = htmlUtils.create('li', _this.className_ + '-li-' + numList + '-inner', ulList, _this.className_ + '-li-' + numList + '-inner');
        li_.style.width = _this.itemWidth + 'px';
        li_.style.height = _this.itemHeight + 'px';
        li_.style.lineHeight = _this.itemHeight + 'px';
        li_.setAttribute('data-name', item['alias']);
        Events.listen(li_, 'click', function (event) {
          that.handleItemClick_(event, item);
        }, _this);
        if (item['icon']) {
          var span_ = htmlUtils.create('span', 'li-icon-content', li_);
          if (item['iconType'] === 'iconfont') {
            var fontName = item['fontName'] ? item['fontName'] : 'iconfont';
            htmlUtils.addClass(span_, fontName + ' ' + item['icon']);
            if (item['iconColor']) {
              span_.style.color = item['iconColor'];
            }
          } else {
            span_.style.background = 'url(' + item['icon'] + ') 0px 0px no-repeat';
          }
        }
        var name_ = htmlUtils.create('span', 'li-name-content', li_);
        name_.innerHTML = item['name'];
        if (item['showLine']) {
          li_.style.borderBottom = '1px solid #CCCCCC';
        }
        if (item['items']) {
          _this.htmlUtils(item['items'], numList, li_, true);
          Events.listen(li_, 'mouseenter', _this.handleItemMouseOver_, _this);
          Events.listen(li_, 'mouseleave', _this.handleItemMouseOut_, _this);
        }
      }
    });
  }
  return ulList;
};

ol.control.ContextMenu.prototype.updateElement_ = function (type, item, items) {
  var child_ = htmlUtils.get(this.className_ + '-ul' + '-inner');
  var cloneItems = (0, _cloneDeep2.default)(this.options['items']);
  var afterItems = null;
  switch (type) {
    case 'pop':
      this.element_.removeChild(child_);
      afterItems = cloneItems.pop();
      this.htmlUtils(cloneItems, '', this.element_);
      break;
    case 'push':
      this.element_.removeChild(child_);
      afterItems = cloneItems = cloneItems.push(item);
      this.htmlUtils(cloneItems, '', this.element_);
      break;
    case 'shift':
      this.element_.removeChild(child_);
      afterItems = cloneItems.shift();
      this.htmlUtils(cloneItems, '', this.element_);
      break;
    case 'unshift':
      this.element_.removeChild(child_);
      afterItems = cloneItems = cloneItems.unshift(item);
      this.htmlUtils(cloneItems, '', this.element_);
      break;
    case 'reverse':
      this.element_.removeChild(child_);
      afterItems = cloneItems.reverse();
      this.htmlUtils(cloneItems, '', this.element_);
      break;
    default:
      this.element_.removeChild(child_);
      afterItems = items;
      this.htmlUtils(items, '', this.element_);
  }
  return afterItems;
};

ol.control.ContextMenu.prototype.getCurrentPixel = function () {
  return this.pixel;
};

ol.control.ContextMenu.prototype.getCurrentCoordinates = function () {
  return this.getMap().getCoordinateFromPixel(this.getCurrentPixel());
};

ol.control.ContextMenu.prototype.handleItemClick_ = function (event, item) {
  var _this2 = this;

  if (item && item['callback'] && typeof item['callback'] === 'function') {
    item['callback'](event, {
      source: item,
      pixel: this.getCurrentPixel(),
      coordinates: this.getCurrentCoordinates()
    });
  }
  this.dispatch('item-click', event, {
    source: item,
    pixel: this.getCurrentPixel(),
    coordinates: this.getCurrentCoordinates()
  });
  window.setTimeout(function () {
    _this2.hide();
  }, 50);
};

ol.control.ContextMenu.prototype.handleItemMouseOver_ = function (event) {
  if (event.target && event.target.childNodes) {
    var elements = Array.prototype.slice.call(event.target.childNodes, 0);
    if (elements && elements.length > 0) {
      elements.every(function (ele) {
        if (ele && ele.nodeName.toLowerCase() === 'ul') {
          ele.style.display = 'block';
          return false;
        } else {
          return true;
        }
      });
    }
  }
};

ol.control.ContextMenu.prototype.handleItemMouseOut_ = function (event) {
  if (event.target && event.target.childNodes) {
    var elements = Array.prototype.slice.call(event.target.childNodes, 0);
    if (elements && elements.length > 0) {
      elements.every(function (ele) {
        if (ele && ele.nodeName.toLowerCase() === 'ul') {
          ele.style.display = 'none';
          return false;
        } else {
          return true;
        }
      });
    }
  }
};

ol.control.ContextMenu.prototype.setMap = function (map) {
  ol.control.Control.prototype.setMap.call(this, map);
  if (map && map instanceof ol.Map) {
    this.initDomInternal(this.options['items']);
  }
};

ol.control.ContextMenu.prototype.pop = function () {
  return this.updateElement_('pop');
};

ol.control.ContextMenu.prototype.push = function (item) {
  if (item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
    return this.updateElement_('push', item);
  } else {
    throw new Error('传入的不是对象');
  }
};

ol.control.ContextMenu.prototype.shift = function () {
  return this.updateElement_('shift');
};

ol.control.ContextMenu.prototype.reverse = function () {
  return this.updateElement_('reverse');
};

ol.control.ContextMenu.prototype.unshift = function (item) {
  if (item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
    return this.updateElement_('unshift', item);
  } else {
    throw new Error('传入的不是对象');
  }
};

ol.control.ContextMenu.prototype.update = function (items) {
  if (items && Array.isArray(items) && items.length > 0) {
    this.updateElement_('', '', items);
  } else {
    throw new Error('传入的数组有误！');
  }
};

ol.control.ContextMenu.prototype.updateOption = function (items) {
  if (items && Array.isArray(items) && items.length > 0) {
    this.options['items'] = items;
    this.updateElement_('', '', items);
  } else {
    throw new Error('传入的数组有误！');
  }
};

var olControlContextMenu = ol.control.ContextMenu;
exports.default = olControlContextMenu;
module.exports = exports['default'];

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(127);

var _factory = __webpack_require__(24);

var _factory2 = _interopRequireDefault(_factory);

var _layerUtils = __webpack_require__(17);

var _layerUtils2 = _interopRequireDefault(_layerUtils);

var _observableEmit = __webpack_require__(31);

var _observableEmit2 = _interopRequireDefault(_observableEmit);

var _utils = __webpack_require__(12);

var _mixin = __webpack_require__(19);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ol.interaction.FreeHandCircle = function (params) {
  this.options = params || {};

  this.wgs84Sphere = new ol.Sphere(typeof this.options['sphere'] === 'number' ? this.options['sphere'] : 6378137);

  this.layerName = this.options['layerName'] || 'FREE_HAND_CIRCLE';

  this.centerStyle = this.options['centerStyle'] || null;

  this.layer = null;

  this.radius = '';

  this.center_ = [];

  this.isMouseDown = false;

  this.isDraging = false;

  this.cursor_ = 'pointer';

  this.drawStart_ = false;

  this.previousCursor_ = undefined;

  this.coordinate_ = null;

  this.feature_ = null;

  this.textOverlay = null;

  this.circleFeature = null;

  this.centerFeature = null;

  this.labelFeature = null;

  this.style_ = {
    fill: {
      fillColor: 'rgba(67, 110, 238, 0)'
    },
    stroke: {
      strokeColor: 'rgba(249, 185, 154, 1)',
      strokeWidth: 2.5
    },
    image: {
      type: '',
      image: {
        fill: {
          fillColor: 'rgba(255, 255, 255, 0.8)'
        },
        points: Infinity,
        radius: 4,
        stroke: {
          strokeColor: 'rgba(255, 0, 0, 1)',
          strokeWidth: 1.5
        }
      }
    }
  };
  if (this.options['style'] && _typeof(this.options['style']) === 'object') {
    this.style_ = this.options['style'];
  }

  ol.interaction.Pointer.call(this, {
    handleMoveEvent: ol.interaction.FreeHandCircle.handleMoveEvent_,
    handleDownEvent: ol.interaction.FreeHandCircle.handleDownEvent_,
    handleUpEvent: ol.interaction.FreeHandCircle.handleUpEvent_,
    handleDragEvent: ol.interaction.FreeHandCircle.handleDragEvent_
  });

  _observableEmit2.default.call(this);
};

ol.inherits(ol.interaction.FreeHandCircle, ol.interaction.Pointer);
(0, _mixin2.default)(ol.interaction.FreeHandCircle, _observableEmit2.default);

ol.interaction.FreeHandCircle.handleMoveEvent_ = function (mapBrowserEvent) {
  if (this.cursor_) {
    var map = mapBrowserEvent.map;
    var feature = map.forEachFeatureAtPixel(mapBrowserEvent.pixel, function (feature) {
      return feature;
    });
    var element = map.getTargetElement();
    if (feature && feature.get('free-hand-circle-lable')) {
      if (element.style.cursor !== this.cursor_) {
        this.previousCursor_ = element.style.cursor;
        element.style.cursor = this.cursor_;
      }
    } else if (this.previousCursor_ !== undefined) {
      element.style.cursor = this.previousCursor_;
      this.previousCursor_ = undefined;
    }
  }
};

ol.interaction.FreeHandCircle.handleDownEvent_ = function (mapBrowserEvent) {
  this.isMouseDown = true;
  if (!this.drawStart_ && mapBrowserEvent.originalEvent.button === 0) {
    var map = mapBrowserEvent.map;
    var feature = map.forEachFeatureAtPixel(mapBrowserEvent.pixel, function (feature) {
      return feature;
    });
    if (feature && feature.get('free-hand-circle-lable')) {
      this.coordinate_ = mapBrowserEvent.coordinate;
      this.feature_ = feature;
    }
    return !!this.feature_;
  }
};

ol.interaction.FreeHandCircle.handleUpEvent_ = function (mapBrowserEvent) {
  if (this.feature_ && this.coordinate_ && this.isDraging) {
    this.dispatch('changeend', this.circleFeature.getGeometry());
  }
  this.coordinate_ = null;
  this.feature_ = null;
  this.isMouseDown = false;
  this.isDraging = false;
  return false;
};

ol.interaction.FreeHandCircle.handleDragEvent_ = function (mapBrowserEvent) {
  if (!this.coordinate_ || !this.feature_) {
    return;
  }
  this.isDraging = true;
  var deltaX = mapBrowserEvent.coordinate[0] - this.coordinate_[0];
  var deltaY = 0;
  var geometry = this.feature_.getGeometry();
  geometry.translate(deltaX, deltaY);
  this.coordinate_[0] = mapBrowserEvent.coordinate[0];
  this.coordinate_[1] = mapBrowserEvent.coordinate[1];
  this.createCircle(this.center_, this.mathRadius(this.center_, geometry.getCoordinates()));
};

ol.interaction.FreeHandCircle.prototype.initDrawInteraction = function () {
  if (!this.getMap()) return;
  var style_ = new _factory2.default(this.style_);
  this.draw = new ol.interaction.Draw({
    type: 'Circle',
    style: style_
  });
  this.draw.set('uuid', (0, _utils.getuuid)());
  this.getMap().addInteraction(this.draw);
  this.draw.on('drawstart', this.drawStartHandle_, this);
  this.draw.on('drawend', this.drawEndHandle_, this);
};

ol.interaction.FreeHandCircle.prototype.removeLastInteraction_ = function () {
  if (!this.getMap()) return;
  this.draw.un('drawstart', this.drawStartHandle_, this);
  this.draw.un('drawend', this.drawEndHandle_, this);
  this.getMap().removeInteraction(this.draw);
};

ol.interaction.FreeHandCircle.prototype.drawStartHandle_ = function (event) {
  this.drawStart_ = true;
};

ol.interaction.FreeHandCircle.prototype.drawEndHandle_ = function (event) {
  if (event && event.feature) {
    var geom_ = event.feature.getGeometry();
    this.center_ = geom_.getCenter();
    var coordinates = geom_.getLastCoordinate();
    this.radius = this.mathRadius(this.center_, coordinates);
    this.createCircle(this.center_, this.radius);
  }
  this.removeLastInteraction_();
  this.drawStart_ = false;
};

ol.interaction.FreeHandCircle.prototype.createCircle = function (center, radius) {
  var _this = this;

  if (!this.getMap()) return;
  var style_ = new _factory2.default(this.style_);
  if (!this.layer) {
    this.layer = new _layerUtils2.default(this.getMap()).createVectorLayer(this.layerName, {
      create: true
    });
    this.layer.setStyle(style_);
  }
  var params = this.transformCenterAndRadius_(center, radius);
  if (!this.circleFeature) {
    this.circleFeature = new ol.Feature({
      geometry: new ol.geom.Circle(params['center'], params['radius'])
    });
    var uuid = this.draw && this.draw.get('uuid') ? this.draw.get('uuid') : (0, _utils.getuuid)();
    this.circleFeature.set('uuid', uuid);
    this.layer.getSource().addFeature(this.circleFeature);
    this.circleFeature.getGeometry().on('change', function (evt) {
      var geom = evt.target;
      var coordinates = geom.getLastCoordinate();
      _this.center_ = geom.getCenter();
      _this.radius = _this.mathRadius(_this.center_, coordinates);
      _this.addLabelFeature_(_this.center_, 'center');
      _this.addLabelFeature_(coordinates, 'endLabel');
      _this.drawTextLabel_(_this.radius + ' m', coordinates);
      if (_this.drawStart_ || !(_this.isMouseDown && _this.isDraging)) {
        _this.dispatch('changeend', geom);
      }
    });
    this.circleFeature.getGeometry().dispatchEvent('change');
  } else {
    this.circleFeature.getGeometry().setCenterAndRadius(params['center'], params['radius']);
  }
};

ol.interaction.FreeHandCircle.prototype.transformCenterAndRadius_ = function (center, radius) {
  var center_ = ol.proj.transform(center, this._getProjectionCode(), 'EPSG:4326');
  var sourceGeom = new ol.geom.Circle(center_, this.transformRadius(center_, radius));
  var trans_ = sourceGeom.transform('EPSG:4326', this._getProjectionCode());
  return {
    center: trans_.getCenter(),
    radius: trans_.getRadius()
  };
};

ol.interaction.FreeHandCircle.prototype.addLabelFeature_ = function (coordinates, type) {
  if (type === 'center') {
    if (!this.centerFeature) {
      this.centerFeature = new ol.Feature({
        uuid: this.circleFeature.get('uuid'),
        geometry: new ol.geom.Point(coordinates)
      });
      if (this.centerStyle) {
        var _style = new _factory2.default(this.centerStyle);
        this.centerFeature.setStyle(_style);
      }
      this.layer.getSource().addFeature(this.centerFeature);
    } else {
      this.centerFeature.setGeometry(new ol.geom.Point(coordinates));
    }
  } else {
    if (!this.labelFeature) {
      this.labelFeature = new ol.Feature({
        uuid: this.circleFeature.get('uuid'),
        geometry: new ol.geom.Point(coordinates)
      });
      var _style2 = new _factory2.default({
        image: {
          type: 'icon',
          image: {
            imageSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAATCAYAAAGCZu9cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTAyQjQ0OTk5MUZGMTFFN0JCMzdENDYyNTY0RDI4MzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTAyQjQ0OUE5MUZGMTFFN0JCMzdENDYyNTY0RDI4MzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMDJCNDQ5NzkxRkYxMUU3QkIzN0Q0NjI1NjREMjgzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMDJCNDQ5ODkxRkYxMUU3QkIzN0Q0NjI1NjREMjgzMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Poms414AAAUoSURBVHjaYmxqamJg+PTJn+H//0gGBoYVtT09G1iADMm86uoNDBAQDsSMTEDi+bPHj9/9//eP4dWzZx9AMgABxAjW/vHjCrA6fv4Ixo8fPvwHAgYYYObi4rpnZmoaCLSAYfKUKSIAAcQA0nJkz54nP3/8+I+OTx858hykG2SZiJ6JifS7N28YXEqvMCDTqlpaEiCjAQIIYjkDAwvQAd0gJ0OtfAl0SD5EgoFBubys7A4DJsjr7OoC+unjxyXfv38HGw2ikdmcv36dZ2Lg4Dj5/etXhlXlEgwgGoX948cMJgZ29obZEybs5+TmZuDg5ARjEHt2f/8+Bj6+mQABBHMkI8PPn8YO9vbrbZydZZADCB0wMjIynDx06NnuLVscgR65VVtbCw4ODoYvX+aU1tScNraykgG578ePHwwOhRfANAzD+CB5PVNTqdLm5psMHz70gQwGGSLG8O+fyvcvX+B+8ai8AbYVxgdhEACJw/jfgOqBwAoW5sxA2gdoalVmebnZD6BNhAA7BwfDjK6uMwwCApZA7/wBxctfIN4IFNg9feZMTSBbCYi5cej/BsQPgPgaUP0XmCBAAMECFhK437+LMvz6lQtkq2JoB4U2IyPIn1OBAfoGJgwKWBYomxOYEFaVtbR4srKxMTPgih1gzABBfWtp6XagS7xhwqCAZWP4/HlGZUeHDzD6mP/8/s3w588f7Bgk9/s3I1CtFzAM5yEbouYTHOz+6+dPuGJQUgRhXPxfv34xRKWmBiIbog7MHiK/gbaAMCx6NzcpM8DEQGxYFMPEpBUUBIBBwAszhPPHt29//gBNB+H1NbJgDTA+DIMASA7G//v7939gAH+FGfLm6L59T0DOhNkCyjiBLY/hfBAbJAbjg9SePnr0CVDvP5ghVy5dv77q65cvH/8Cix2Yv5cVi2Bl//37F4S/Hd6/vxAWJqAofsbAyrp26ZIlDDrq6mFmtrZS3Dw8nNhiGJiaf549fvzZuXPnmhl4eDYgGwJy0nmgQS+v3Lt3EIjFQKUbFjNA6l4D8VUGTk64V0AAIMCQUywk1YIM/vVLDJhlE4EZ09vAzExMUU2ND5hfmAUEBdkZiASfP3369e3r1z9PHz78curwYZDlG4CJdQYwMt4hqwOleJhvYA7gBAacBsPXrx2egYG6RhYWEv/+/WMgFwgKC3OBaA0dHRFnb28FRiYm02sXLhRsWLbsEtBBsUAHPUdWzwKNZBFgKHjKiImVx9bWav6FJmxswK38Gpje1alFkhwIqGpriwJznfPmVasOXzl/PgXomAPIDuEHYh1gVMT5hIUp/gQWa9hKaa+a23D2thZVcHZGByBxkDqYg0B8dPAXWJa4BwQoXgElNAYGW+QczAuuy/794+Hm5maD5Q1kjOyIjfUKDNjUwDBIHtnx6PKgkAaWWUx8AgJ8wHaAKHKIgMroXwwsLM8e3b//QUxKSgjdt2uqpMF0SNtTBv/GByhiyAAkj67nN5pZzMzMDO/fvv326ePHG8jFNMgh74H4HjA/7li9aBF/YESErpS8vAiwvYARRStKxeBsbFGDTx5U8QKLf4aP799/XDpr1hlg1Z8Hqj2QHQKqia6DQ4WP79v69etNgBWPRUBUlJKMggLYQaASCJSD8NXw2OoVJiBmZmEBtibYGd69fv1h+Zw5d4BlzWJgSMwHqviCnmtg1SIohT0G6roAxPs2bNsmAWxmqAPDVhHoCn4g5iM5DzMyfmZgYnoLjPZLQDN3ACu6u0DRD9DkgAIAomQEZFjvy7gAAAAASUVORK5CYII='
          }
        }
      });
      this.labelFeature.set('free-hand-circle-lable', true);
      this.labelFeature.setStyle(_style2);
      this.layer.getSource().addFeature(this.labelFeature);
    } else {
      this.labelFeature.setGeometry(new ol.geom.Point(coordinates));
    }
  }
};

ol.interaction.FreeHandCircle.prototype.drawTextLabel_ = function (text, coordinates) {
  if (!this.textOverlay) {
    var editor = document.createElement('span');
    editor.className = 'free-hand-circle-label';
    editor.innerHTML = text;
    this.textOverlay = new ol.Overlay({
      element: editor,
      position: coordinates,
      positioning: 'center-left',
      offset: [20, 0]
    });
    this.getMap().addOverlay(this.textOverlay);
  } else {
    var element = this.textOverlay.getElement();
    element.innerHTML = text;
    this.textOverlay.setPosition(coordinates);
    this.getMap().render();
  }
};

ol.interaction.FreeHandCircle.prototype.getImageSrc_ = function (text) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  ctx.font = '30px Arial';
  ctx.textAlign = 'center';
  var width = ctx.measureText(text).width;
  var height = 20;
  canvas.width = width + 8;
  canvas.height = height + 4;
  ctx.fillText(text, 2, 10);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);
  var image = canvas.toDataURL('image/.png', 1);
  return image;
};

ol.interaction.FreeHandCircle.prototype.transformRadius = function (center, meterRadius) {
  try {
    var lastCoords = this.wgs84Sphere.offset(center, meterRadius, 270 / 360 * 2 * Math.PI);var ptx = center[0] - lastCoords[0],
        pty = center[1] - lastCoords[1];

    var transformRadiu = Math.sqrt(Math.pow(ptx, 2) + Math.pow(pty, 2));
    return transformRadiu;
  } catch (e) {
    console.log(e);
  }
};

ol.interaction.FreeHandCircle.prototype.mathRadius = function (center, coords) {
  var radius_ = '';
  if (center && coords) {
    var c1 = ol.proj.transform(this.center_, this._getProjectionCode(), 'EPSG:4326');
    var c2 = ol.proj.transform(coords, this._getProjectionCode(), 'EPSG:4326');
    var radius = this.wgs84Sphere.haversineDistance(c1, c2);
    if (this.options['maxRadius'] && radius > this.options['maxRadius']) {
      radius_ = this.options['maxRadius'] - 1;
    } else if (this.options['minRadius'] && radius < this.options['minRadius']) {
      radius_ = this.options['minRadius'] - 1;
    } else {
      radius_ = radius;
    }
    radius_ = Math.floor(radius_) + 1;
  }
  return radius_;
};

ol.interaction.FreeHandCircle.prototype._getProjectionCode = function () {
  var code = '';
  if (this.getMap()) {
    code = this.getMap().getView().getProjection().getCode();
  } else {
    code = 'EPSG:3857';
  }
  return code;
};

ol.interaction.FreeHandCircle.prototype.setActive = function (active) {
  ol.interaction.Pointer.prototype.setActive.call(this, active);
};

ol.interaction.FreeHandCircle.prototype.destroy = function () {
  if (this.draw) {
    this.removeLastInteraction_();
  }
  if (this.textOverlay && this.textOverlay instanceof ol.Overlay) {
    this.getMap().removeOverlay(this.textOverlay);
    this.textOverlay = null;
  }
  if (this.layer) {
    this.layer.getSource().clear();
    this.circleFeature = null;
    this.centerFeature = null;
    this.labelFeature = null;
  }
  this.coordinate_ = null;
  this.feature_ = null;
  this.drawStart_ = false;
  this.center_ = [];
  this.radius = '';
  this.isDraging = false;
  this.isMouseDown = false;
};

var olInteractionFreeHandCircle = ol.interaction.FreeHandCircle;
exports.default = olInteractionFreeHandCircle;
module.exports = exports['default'];

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Events = __webpack_require__(2);

var Events = _interopRequireWildcard(_Events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

ol.interaction.LayerMagnify = function (params) {
  this.options = params || {};
  if (this.options['magnifyLayer']) {
    this.magnifyLayer = this.options['magnifyLayer'];
  } else {
    throw new Error('图层必须传入！');
  }

  this._currentLayerIndex = null;

  this.radius = typeof this.options['radius'] === 'number' ? this.options['radius'] : 75;

  this.minRadius = typeof this.options['minRadius'] === 'number' ? this.options['minRadius'] : 150;

  this.maxRadius = typeof this.options['maxRadius'] === 'number' ? this.options['maxRadius'] : 25;

  this.lineWidth = typeof this.options['lineWidth'] === 'number' ? this.options['lineWidth'] : 2;

  this.strokeStyle = this.options['strokeStyle'] ? this.options['strokeStyle'] : 'rgba(0, 0, 0, 0.5)';

  this.zoomInKeyCode = this.options['zoomInKeyCode'] !== undefined ? this.options['zoomInKeyCode'] : 38;

  this.zoomOutKeyCode = this.options['zoomOutKeyCode'] !== undefined ? this.options['zoomOutKeyCode'] : 40;

  this.mousePosition = null;
  ol.interaction.Pointer.call(this, {
    handleEvent: ol.interaction.LayerMagnify.handleEvent_,
    handleMoveEvent: ol.interaction.LayerMagnify.handleMoveEvent_
  });
};

ol.inherits(ol.interaction.LayerMagnify, ol.interaction.Pointer);

ol.interaction.LayerMagnify.handleMoveEvent_ = function (mapBrowserEvent) {
  this.mousePosition = mapBrowserEvent['pixel'];
  this.getMap().render();
};

ol.interaction.LayerMagnify.handleEvent_ = function (evt) {
  return ol.interaction.Pointer.handleEvent.call(this, evt);
};

ol.interaction.LayerMagnify.prototype.initEvents_ = function () {
  if (this.getMap()) {
    Events.listen(this.getMap().getTargetElement(), 'mouseout', this.handleMouseOut_, this);
    Events.listen(document, 'keydown', this.handleKeyDown_, this);

    this.magnifyLayer.on('postcompose', this.handlePostcompose_, this);
  }
};

ol.interaction.LayerMagnify.prototype.handleMouseOut_ = function (event) {
  this.mousePosition = null;
  this.getMap().render();
};

ol.interaction.LayerMagnify.prototype.handleKeyDown_ = function (event) {
  if (event.which === this.zoomInKeyCode) {
    this.radius = Math.min(this.radius + 5, 150);
    this.getMap().render();
    event.preventDefault();
  } else if (event.which === this.zoomOutKeyCode) {
    this.radius = Math.max(this.radius - 5, 25);
    this.getMap().render();
    event.preventDefault();
  }
};

ol.interaction.LayerMagnify.prototype.handlePostcompose_ = function (event) {
  if (this.mousePosition) {
    var _ref = [event.context, event.frameState.pixelRatio],
        context = _ref[0],
        pixelRatio = _ref[1];

    var half = this.radius * pixelRatio;
    var centerX = this.mousePosition[0] * pixelRatio,
        centerY = this.mousePosition[1] * pixelRatio;
    var originX = centerX - half,
        originY = centerY - half,
        size = 2 * half + 1;

    var sourceData = context.getImageData(originX, originY, size, size).data;
    var dest = context.createImageData(size, size);
    var destData = dest.data;
    for (var j = 0; j < size; ++j) {
      for (var i = 0; i < size; ++i) {
        var dI = i - half;
        var dJ = j - half;
        var dist = Math.sqrt(dI * dI + dJ * dJ);
        var sourceI = i;
        var sourceJ = j;
        if (dist < half) {
          sourceI = Math.round(half + dI / 2);
          sourceJ = Math.round(half + dJ / 2);
        }
        var destOffset = (j * size + i) * 4;
        var sourceOffset = (sourceJ * size + sourceI) * 4;
        destData[destOffset] = sourceData[sourceOffset];
        destData[destOffset + 1] = sourceData[sourceOffset + 1];
        destData[destOffset + 2] = sourceData[sourceOffset + 2];
        destData[destOffset + 3] = sourceData[sourceOffset + 3];
      }
    }
    context.beginPath();
    context.arc(centerX, centerY, half, 0, 2 * Math.PI, false);
    context.lineWidth = this.lineWidth * pixelRatio;
    context.strokeStyle = this.strokeStyle;
    context.putImageData(dest, originX, originY);
    context.stroke();
    context.restore();
  }
};

ol.interaction.LayerMagnify.prototype.setMap = function (map) {
  if (map && map instanceof ol.Map) {
    ol.interaction.Interaction.prototype.setMap.call(this, map);
    this.initEvents_();
  } else {
    Events.unListen(this.getMap().getTargetElement(), 'mouseout', this.handleMouseOut_, this);
    Events.unListen(document, 'keydown', this.handleKeyDown_, this);

    this.magnifyLayer.un('postcompose', this.handlePostcompose_, this);
    ol.interaction.Interaction.prototype.setMap.call(this, map);
  }
};

var olInteractionLayerMagnify = ol.interaction.LayerMagnify;

exports.default = olInteractionLayerMagnify;
module.exports = exports['default'];

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Events = __webpack_require__(2);

var Events = _interopRequireWildcard(_Events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

ol.interaction.LayerSpyglass = function (params) {
  this.options = params || {};
  if (this.options['spyLayer']) {
    this.spyLayer = this.options['spyLayer'];
  } else {
    throw new Error('图层必须传入！');
  }

  this._currentLayerIndex = null;

  this.radius = typeof this.options['radius'] === 'number' ? this.options['radius'] : 75;

  this.minRadius = typeof this.options['minRadius'] === 'number' ? this.options['minRadius'] : 150;

  this.maxRadius = typeof this.options['maxRadius'] === 'number' ? this.options['maxRadius'] : 25;

  this.lineWidth = typeof this.options['lineWidth'] === 'number' ? this.options['lineWidth'] : 5;

  this.strokeStyle = this.options['strokeStyle'] ? this.options['strokeStyle'] : 'rgba(0, 0, 0, 0.5)';

  this.zoomInKeyCode = this.options['zoomInKeyCode'] !== undefined ? this.options['zoomInKeyCode'] : 38;

  this.zoomOutKeyCode = this.options['zoomOutKeyCode'] !== undefined ? this.options['zoomOutKeyCode'] : 40;

  this.mousePosition = null;
  ol.interaction.Pointer.call(this, {
    handleEvent: ol.interaction.LayerSpyglass.handleEvent_,
    handleMoveEvent: ol.interaction.LayerSpyglass.handleMoveEvent_
  });
};

ol.inherits(ol.interaction.LayerSpyglass, ol.interaction.Pointer);

ol.interaction.LayerSpyglass.handleMoveEvent_ = function (mapBrowserEvent) {
  this.mousePosition = mapBrowserEvent['pixel'];
  this.getMap().render();
};

ol.interaction.LayerSpyglass.handleEvent_ = function (evt) {
  return ol.interaction.Pointer.handleEvent.call(this, evt);
};

ol.interaction.LayerSpyglass.prototype.initEvents_ = function () {
  if (this.getMap()) {
    Events.listen(this.getMap().getTargetElement(), 'mouseout', this.handleMouseOut_, this);
    Events.listen(document, 'keydown', this.handleKeyDown_, this);
    var layers = this.getMap().getLayers().getArray();
    var layerIndexs = [];
    this._currentLayerIndex = this.spyLayer.getZIndex();
    layers.every(function (layer) {
      layerIndexs.push(layer.getZIndex());
    });
    var maxIndex = Math.max.apply(Math, layerIndexs);

    this.spyLayer.setZIndex(maxIndex + 10);
    this.spyLayer.setVisible(true);

    this.spyLayer.on('precompose', this.handlePrecompose_, this);

    this.spyLayer.on('postcompose', this.handlePostcompose_, this);
  }
};

ol.interaction.LayerSpyglass.prototype.handleMouseOut_ = function (event) {
  this.mousePosition = null;
  this.getMap().render();
};

ol.interaction.LayerSpyglass.prototype.handleKeyDown_ = function (event) {
  if (event.which === this.zoomInKeyCode) {
    this.radius = Math.min(this.radius + 5, 150);
    this.getMap().render();
    event.preventDefault();
  } else if (event.which === this.zoomOutKeyCode) {
    this.radius = Math.max(this.radius - 5, 25);
    this.getMap().render();
    event.preventDefault();
  }
};

ol.interaction.LayerSpyglass.prototype.handlePrecompose_ = function (event) {
  var ctx = event.context;
  var pixelRatio = event.frameState.pixelRatio;
  ctx.save();
  ctx.beginPath();
  if (this.mousePosition) {
    ctx.arc(this.mousePosition[0] * pixelRatio, this.mousePosition[1] * pixelRatio, this.radius * pixelRatio, 0, 2 * Math.PI);
    ctx.lineWidth = this.lineWidth * pixelRatio;
    ctx.strokeStyle = this.strokeStyle;
    ctx.stroke();
  }
  ctx.clip();
};

ol.interaction.LayerSpyglass.prototype.handlePostcompose_ = function (event) {
  var ctx = event.context;
  ctx.restore();
};

ol.interaction.LayerSpyglass.prototype.setMap = function (map) {
  if (map && map instanceof ol.Map) {
    ol.interaction.Interaction.prototype.setMap.call(this, map);
    this.initEvents_();
  } else {
    Events.unListen(this.getMap().getTargetElement(), 'mouseout', this.handleMouseOut_, this);
    Events.unListen(document, 'keydown', this.handleKeyDown_, this);

    this.spyLayer.un('precompose', this.handlePrecompose_, this);

    this.spyLayer.un('postcompose', this.handlePostcompose_, this);
    this.spyLayer.setVisible(false);
    this.spyLayer.setZIndex(this._currentLayerIndex);
    this._currentLayerIndex = null;
    ol.interaction.Interaction.prototype.setMap.call(this, map);
  }
};

var olInteractionLayerSpyglass = ol.interaction.LayerSpyglass;

exports.default = olInteractionLayerSpyglass;
module.exports = exports['default'];

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _factory = __webpack_require__(24);

var _factory2 = _interopRequireDefault(_factory);

var _layerUtils = __webpack_require__(17);

var _layerUtils2 = _interopRequireDefault(_layerUtils);

var _utils = __webpack_require__(12);

__webpack_require__(130);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ol.interaction.MeasureTool = function (params) {
  this.options = params || {};

  this.wgs84Sphere = new ol.Sphere(typeof this.options['sphere'] === 'number' ? this.options['sphere'] : 6378137);

  this.measureTypes = {
    measureLength: {
      name: 'measureLength',
      type: 'LineString'
    },
    measureArea: {
      name: 'measureArea',
      type: 'Polygon'
    },
    measureCircle: {
      name: 'measureCircle',
      type: 'Circle'
    }
  };

  this.measureType = '';

  this.freehand = false;

  this.isGeodesic = this.options['isGeodesic'] === false ? this.options['isGeodesic'] : true;

  this.layerName = this.options['layerName'] || 'measureTool';

  this.layer = null;

  this.draw = null;

  this.isActive_ = false;

  this.clickCount = '';

  this.drawStyle = {
    fill: {
      fillColor: 'rgba(67, 110, 238, 0.4)'
    },
    stroke: {
      strokeColor: 'rgba(249, 185, 154, 1)',
      strokeWidth: 2.5
    },
    image: {
      type: '',
      image: {
        fill: {
          fillColor: 'rgba(255, 255, 255, 0.8)'
        },
        points: Infinity,
        radius: 4,
        stroke: {
          strokeColor: 'rgba(255, 0, 0, 1)',
          strokeWidth: 1.5
        }
      }
    }
  };
  if (this.options['drawStyle'] && _typeof(this.options['drawStyle']) === 'object') {
    this.drawStyle = this.options['drawStyle'];
  }

  this.finshStyle = {
    fill: {
      fillColor: 'rgba(67, 110, 238, 0.4)'
    },
    stroke: {
      strokeColor: 'rgba(253, 128, 68, 1)',
      strokeWidth: 3
    },
    image: {
      type: '',
      image: {
        fill: {
          fillColor: 'rgba(255, 255, 255, 0.8)'
        },
        points: Infinity,
        radius: 4,
        stroke: {
          strokeColor: 'rgba(255, 0, 0, 1)',
          strokeWidth: 1.5
        }
      }
    }
  };
  if (this.options['finshStyle'] && _typeof(this.options['finshStyle']) === 'object') {
    this.finshStyle = this.options['finshStyle'];
  }

  this.cursor_ = 'default';

  this.previousCursor_ = undefined;
  ol.interaction.Pointer.call(this, {
    handleMoveEvent: ol.interaction.MeasureTool.handleMoveEvent_,
    handleDownEvent: ol.interaction.MeasureTool.handleDownEvent_,
    handleDragEvent: ol.interaction.MeasureTool.handleDragEvent_
  });

  this.doubleClickZoom = null;
};

ol.inherits(ol.interaction.MeasureTool, ol.interaction.Pointer);

ol.interaction.MeasureTool.handleMoveEvent_ = function (mapBrowserEvent) {
  if (this.getTool()) {
    if (this.drawStart_ && !mapBrowserEvent.dragging && this.measureType === this.measureTypes.measureCircle['name']) {
      this.afterDrawPointClickHandler(mapBrowserEvent);
    } else if (!this.drawStart_ && !mapBrowserEvent.dragging) {
      this.beforeDrawPointClickHandler(mapBrowserEvent);
    } else if (this.drawStart_ && !mapBrowserEvent.dragging) {
      this.afterDrawPointClickHandler(mapBrowserEvent);
    } else if (this.freehand && this.drawStart_ && mapBrowserEvent.dragging) {
      this.afterDragHandler_(mapBrowserEvent);
    }
  }
};

ol.interaction.MeasureTool.handleDownEvent_ = function (mapBrowserEvent) {
  if (this.freehand) {
    console.log(mapBrowserEvent);
  }
};

ol.interaction.MeasureTool.handleDragEvent_ = function (mapBrowserEvent) {
  if (this.freehand) {
    console.log(mapBrowserEvent);
  }
};

ol.interaction.MeasureTool.prototype.addDrawInteractions_ = function (type) {
  var style_ = new _factory2.default(this.drawStyle);
  this.draw = new ol.interaction.Draw({
    type: type,
    style: style_,
    freehand: this.freehand
  });
  this.draw.set('uuid', (0, _utils.getuuid)());
  this.getMap().addInteraction(this.draw);
  this.draw.on('drawstart', this.drawStartHandle_, this);
  this.draw.on('drawend', this.drawEndHandle_, this);
  if (type === 'LineString' && !this.freehand) {
    this.getMap().on('singleclick', this.drawClickHandle_, this);
  }
};

ol.interaction.MeasureTool.prototype.drawClickHandle_ = function (event) {
  if (this.drawStart_ && !event.dragging) {
    if (!this.clickCount) {
      this.clickCount = (0, _utils.getuuid)();
      this.draw.set('measureResult', '起点');
    }
    this.addMeasurecircle(event.coordinate);
    this.addMeasureOverlay(event.coordinate, this.draw.get('measureResult'));
  }
};

ol.interaction.MeasureTool.prototype.addMeasurecircle = function (coordinate) {
  var feature = new ol.Feature({
    uuid: this.draw.get('uuid'),
    geometry: new ol.geom.Point(coordinate)
  });
  this.layer.getSource().addFeature(feature);
};

ol.interaction.MeasureTool.prototype.drawStartHandle_ = function (event) {
  var _this = this;

  var that = this;
  this.drawStart_ = true;
  event.feature.getGeometry().on('change', function (evt) {
    var geom = evt.target;
    if (geom instanceof ol.geom.LineString) {
      var output = that.formatData(geom);
      that.draw.set('measureResult', output);
    } else if (geom instanceof ol.geom.Polygon) {
      var area = _this.formatData(geom);
      that.draw.set('measureResult', area);
    } else if (geom instanceof ol.geom.Circle) {
      var _area = _this.formatData(geom);
      that.draw.set('measureResult', _area);
    }
  });
};

ol.interaction.MeasureTool.prototype.drawEndHandle_ = function (event) {
  this.drawEnd_ = true;
  var feature = event.feature;
  feature.set('uuid', this.draw.get('uuid'));
  this.layer.getSource().addFeature(feature);
  var coordinates = feature.getGeometry().getLastCoordinate();
  if (this.measureTypes.measureLength['name'] === this.measureType) {
    this.addMeasurecircle(coordinates);
    this.addMeasureOverlay(coordinates, this.draw.get('measureResult'), 'length');
  } else if (this.measureTypes.measureArea['name'] === this.measureType) {
    var center = ol.extent.getCenter(feature.getGeometry().getExtent());
    this.addMeasureOverlay(center, this.draw.get('measureResult'), 'area');
  } else if (this.measureTypes.measureCircle['name'] === this.measureType) {
    var _center = ol.extent.getCenter(feature.getGeometry().getExtent());
    this.addMeasureOverlay(_center, this.draw.get('measureResult'), 'circle');
  }
  this.addMeasureRemoveButton(coordinates);
  this.setTool(false);
  this.dispatchEvent('measureEnd');
};

ol.interaction.MeasureTool.prototype.beforeDrawPointClickHandler = function (event) {
  if (!this.measureHelpTooltip && this.getTool()) {
    var helpTooltipElement = document.createElement('span');
    if (this.measureTypes.measureLength['name'] === this.measureType) {
      helpTooltipElement.className = 'hamp-js-measure hamp-js-measure-length';
      if (this.freehand) {
        helpTooltipElement.innerHTML = '按下鼠标拖拽开始测量';
      } else {
        helpTooltipElement.innerHTML = '单击开始测距';
      }
    } else if (this.measureTypes.measureArea['name'] === this.measureType) {
      helpTooltipElement.className = 'hamp-js-measure hamp-js-measure-area';
      if (this.freehand) {
        helpTooltipElement.innerHTML = '按下鼠标拖拽开始测量';
      } else {
        helpTooltipElement.innerHTML = '单击开始测面';
      }
    } else if (this.measureTypes.measureCircle['name'] === this.measureType) {
      helpTooltipElement.className = 'hamp-js-measure hamp-js-measure-area';
      if (this.freehand) {
        helpTooltipElement.innerHTML = '按下鼠标拖拽开始测量';
      } else {
        helpTooltipElement.innerHTML = '单击开始测方圆面积';
      }
    }
    this.measureHelpTooltip = new ol.Overlay({
      element: helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left'
    });
    this.measureHelpTooltip.set('layerName', this.layerName);
    this.getMap().addOverlay(this.measureHelpTooltip);
  } else if (this.measureHelpTooltip && this.measureHelpTooltip instanceof ol.Overlay) {
    this.measureHelpTooltip.setPosition(event.coordinate);
  }
};

ol.interaction.MeasureTool.prototype.afterDrawPointClickHandler = function (event) {
  var helpTooltipElement = this.measureHelpTooltip.getElement();
  if (this.measureTypes.measureLength['name'] === this.measureType) {
    helpTooltipElement.className = 'hamp-js-measure-move hamp-js-measure-length';
    var length = this.draw.get('measureResult');
    helpTooltipElement.innerHTML = '<span>总长：' + '<span class="measure-result">' + length + '</span>' + '</span><br>' + '<span class="tool-tip">单击确定地点，双击结束</span>';
  } else if (this.measureTypes.measureArea['name'] === this.measureType) {
    helpTooltipElement.className = 'hamp-js-measure-move hamp-js-measure-area';
    var area = this.draw.get('measureResult');
    helpTooltipElement.innerHTML = '<span>总面积：' + '<span class="measure-result">' + area + '</span>' + '</span><br>' + '<span class="tool-tip">单击确定地点，双击结束</span>';
  } else if (this.measureTypes.measureCircle['name'] === this.measureType) {
    helpTooltipElement.className = 'hamp-js-measure-move hamp-js-measure-area';
    var _area2 = this.draw.get('measureResult');
    helpTooltipElement.innerHTML = '<span>总面积：' + '<span class="measure-result">' + _area2 + '</span>' + '</span><br>' + '<span class="tool-tip">单击确定地点，双击结束</span>';
  }
  this.measureHelpTooltip.setPosition(event.coordinate);
  this.getMap().render();
};

ol.interaction.MeasureTool.prototype.afterDragHandler_ = function (event) {
  var helpTooltipElement = this.measureHelpTooltip.getElement();
  if (this.measureTypes.measureLength['name'] === this.measureType) {
    helpTooltipElement.className = 'hamp-js-measure-move hamp-js-measure-length';
    var length = this.draw.get('measureResult');
    helpTooltipElement.innerHTML = '<span>总长：' + '<span class="measure-result">' + length + '</span>' + '</span><br>' + '<span class="tool-tip">松开鼠标按键结束测量</span>';
  } else if (this.measureTypes.measureArea['name'] === this.measureType) {
    helpTooltipElement.className = 'hamp-js-measure-move hamp-js-measure-area';
    var area = this.draw.get('measureResult');
    helpTooltipElement.innerHTML = '<span>总面积：' + '<span class="measure-result">' + area + '</span>' + '</span><br>' + '<span class="tool-tip">松开鼠标按键结束测量</span>';
  } else if (this.measureTypes.measureCircle['name'] === this.measureType) {
    helpTooltipElement.className = 'hamp-js-measure-move hamp-js-measure-area';
    var _area3 = this.draw.get('measureResult');
    helpTooltipElement.innerHTML = '<span>总面积：' + '<span class="measure-result">' + _area3 + '</span>' + '</span><br>' + '<span class="tool-tip">松开鼠标按键结束测量</span>';
  }
  this.measureHelpTooltip.setPosition(event.coordinate);
  this.getMap().render();
};

ol.interaction.MeasureTool.prototype.addMeasureOverlay = function (coordinate, length, type) {
  var measureResult = document.createElement('span');
  var measureOverlay = null;
  if (type === 'length') {
    measureResult.className = 'hmap-measure-end-overlay-label';
    measureResult.innerHTML = "总长：<span class='measure-end-label'>" + length + '</span>';
    measureOverlay = new ol.Overlay({
      element: measureResult,
      position: coordinate,
      offset: [10, 10],
      positioning: 'top-left'
    });
  } else if (type === 'area') {
    measureResult.className = 'hmap-measure-area-overlay-label';
    measureResult.innerHTML = '<span class="measure-label">' + length + '</span>';
    measureOverlay = new ol.Overlay({
      element: measureResult,
      position: coordinate,
      positioning: 'center-center'
    });
  } else if (type === 'circle') {
    measureResult.className = 'hmap-measure-area-overlay-label';
    measureResult.innerHTML = '<span class="measure-label">' + length + '</span>';
    measureOverlay = new ol.Overlay({
      element: measureResult,
      position: coordinate,
      positioning: 'center-center'
    });
  } else {
    measureResult.className = 'hmap-measure-overlay-label';
    measureResult.innerHTML = length;
    measureOverlay = new ol.Overlay({
      element: measureResult,
      position: coordinate,
      offset: [10, 0],
      positioning: 'center-left'
    });
  }
  measureOverlay.set('layerName', this.layerName);
  measureOverlay.set('uuid', this.draw.get('uuid'));
  this.getMap().addOverlay(measureOverlay);
  this.getMap().render();
};

ol.interaction.MeasureTool.prototype.addMeasureRemoveButton = function (coordinate) {
  var that = this;
  var imageButton = document.createElement('img');
  imageButton.src = this.options['removeButtonSrc'] ? this.options['removeButtonSrc'] : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEYzMzc1RDY3RDU1MTFFNUFDNDJFNjQ4NUUwMzRDRDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEYzMzc1RDc3RDU1MTFFNUFDNDJFNjQ4NUUwMzRDRDYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RjMzNzVENDdENTUxMUU1QUM0MkU2NDg1RTAzNENENiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RjMzNzVENTdENTUxMUU1QUM0MkU2NDg1RTAzNENENiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsDx84AAAAC3SURBVHjavJIxDoMwDEV/ok5wDCbu0DvAdUBIwMLFSs/AxDXY6tZ2SCGVUikd+ifn20+2k5hHVd0AXJGmGQw+UyWMxY8KQGpbUNcB23aYHIsnuSgIy8dlAQ2DgwWSmD0YE5ReAq5pQOMIrKsDRByjKGC/dsxz2L7XQgU8JB7n4qDoY6SYF4J+p72T7/zeOXqr03SMx8XnsTUX7UgElKVCyDK3s8Tsae6sv/8ceceZ6jr1k99fAgwAsZy0Sa2HgDcAAAAASUVORK5CYII=';
  imageButton.style.cursor = 'pointer';
  imageButton.title = '清除测量结果';
  imageButton.uuid_ = this.draw.get('uuid');
  imageButton.onclick = function (event) {
    that.removeMeasure_(this.uuid_);
  };
  var closeBtn = new ol.Overlay({
    element: imageButton,
    offset: [8, 0],
    position: coordinate,
    positioning: 'center-left'
  });
  closeBtn.set('uuid', this.draw.get('uuid'));
  closeBtn.set('layerName', this.layerName);
  this.getMap().addOverlay(closeBtn);
  this.getMap().render();
};

ol.interaction.MeasureTool.prototype.removeMeasure_ = function (uuid) {
  var overlays = this.getMap().getOverlays().getArray();
  if (overlays && Array.isArray(overlays)) {
    var length = overlays.length;

    for (var j = 0, i = 0; j < length; j++) {
      i++;
      if (overlays[length - i] && overlays[length - i] instanceof ol.Overlay && overlays[length - i].get('uuid') === uuid) {
        this.getMap().removeOverlay(overlays[length - i]);
      }
    }
  }
  if (this.layer && this.layer.getSource()) {
    var source = this.layer.getSource();
    var features = source.getFeatures();
    features.forEach(function (feat) {
      if (feat.get('uuid') === uuid) {
        source.removeFeature(feat);
      }
    }, this);
  }
};

ol.interaction.MeasureTool.prototype.setTool = function (active, key, freehand) {
  this.removeLastInteraction_();
  if (active && key && this.measureTypes.hasOwnProperty(key)) {
    this.isActive_ = active;
    this.freehand = freehand;
    this.measureType = key;
    if (!this.layer) {
      var _style = new _factory2.default(this.finshStyle);
      this.layer = new _layerUtils2.default(this.getMap()).createVectorLayer(this.layerName, {
        create: true
      });
      this.layer.setStyle(_style);
    }
    this.addDrawInteractions_(this.measureTypes[key]['type']);
  }
};

ol.interaction.MeasureTool.prototype.removeLastInteraction_ = function () {
  this.isActive_ = false;
  this.freehand = false;
  this.drawStart_ = false;
  if (this.draw) {
    this.draw.un('drawstart', this.drawStartHandle_, this);
    this.draw.un('drawend', this.drawEndHandle_, this);
    this.getMap().un('singleclick', this.drawClickHandle_, this);
    if (this.measureHelpTooltip && this.measureHelpTooltip instanceof ol.Overlay) {
      this.getMap().removeOverlay(this.measureHelpTooltip);
      this.measureHelpTooltip = null;
    }
    this.clickCount = '';
    this.disActionInteraction();
    this.getMap().removeInteraction(this.draw);
    this.measureType = '';
  }
};

ol.interaction.MeasureTool.prototype.getTool = function () {
  return this.isActive_;
};

ol.interaction.MeasureTool.prototype.setActive = function (active) {
  ol.interaction.Pointer.prototype.setActive.call(this, active);
};

ol.interaction.MeasureTool.prototype.disActionInteraction = function () {
  var _this2 = this;

  this.doubleClickZoom = this.getDoubleClickZoomInteraction();
  var active = this.doubleClickZoom.getActive();
  this.doubleClickZoom.setActive(false);
  window.setTimeout(function () {
    _this2.doubleClickZoom.setActive(active);
  }, 200);
};

ol.interaction.MeasureTool.prototype.getDoubleClickZoomInteraction = function () {
  var _this3 = this;

  if (!this.doubleClickZoom) {
    var items = this.getMap().getInteractions().getArray();
    items.every(function (item) {
      if (item && item instanceof ol.interaction.DoubleClickZoom) {
        _this3.doubleClickZoom = item;
        return false;
      } else {
        return true;
      }
    });
  }
  return this.doubleClickZoom;
};

ol.interaction.MeasureTool.prototype.formatData = function (geom) {
  var output = 0;
  if (geom) {
    if (this.measureTypes.measureLength['name'] === this.measureType) {
      if (this.isGeodesic) {
        var _ref = [geom.getCoordinates(), 0],
            coordinates = _ref[0],
            length = _ref[1];

        var sourceProj = this.getMap().getView().getProjection();
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
          var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
          var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
          length += this.wgs84Sphere.haversineDistance(c1, c2);
        }
        if (length > 100) {
          output = Math.round(length / 1000 * 100) / 100 + ' ' + '公里';
        } else {
          output = Math.round(length * 100) / 100 + ' ' + '米';
        }
      } else {
        output = Math.round(geom.getLength() * 100) / 100;
      }
    } else if (this.measureType === 'measureArea') {
      if (this.isGeodesic) {
        var _sourceProj = this.getMap().getView().getProjection();
        var geometry = geom.clone().transform(_sourceProj, 'EPSG:4326');
        var _coordinates = geometry.getLinearRing(0).getCoordinates();
        var area = Math.abs(this.wgs84Sphere.geodesicArea(_coordinates));
        if (area > 10000000000) {
          output = Math.round(area / (1000 * 1000 * 10000) * 100) / 100 + ' ' + '万平方公里';
        } else if (area > 1000000 && area < 10000000000) {
          output = Math.round(area / (1000 * 1000) * 100) / 100 + ' ' + '平方公里';
        } else {
          output = Math.round(area * 100) / 100 + ' ' + '平方米';
        }
      } else {
        output = geom.getArea();
      }
    } else if (this.measureType === 'measureCircle') {
      var _sourceProj2 = this.getMap().getView().getProjection();
      var circle = geom.clone().transform(_sourceProj2, 'EPSG:4326');
      var polygon = ol.geom.Polygon.fromCircle(circle, 64, 0);
      if (this.isGeodesic) {
        var _coordinates2 = polygon.getLinearRing(0).getCoordinates();
        var _area4 = Math.abs(this.wgs84Sphere.geodesicArea(_coordinates2));
        if (_area4 > 10000000000) {
          output = Math.round(_area4 / (1000 * 1000 * 10000) * 100) / 100 + ' ' + '万平方公里';
        } else if (_area4 > 1000000 && _area4 < 10000000000) {
          output = Math.round(_area4 / (1000 * 1000) * 100) / 100 + ' ' + '平方公里';
        } else {
          output = Math.round(_area4 * 100) / 100 + ' ' + '平方米';
        }
      } else {
        output = polygon.getArea();
      }
    }
  }
  return output;
};

var olInteractionMeasureTool = ol.interaction.MeasureTool;
exports.default = olInteractionMeasureTool;
module.exports = exports['default'];

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(131);

var _domUtils = __webpack_require__(3);

var DomUtils = _interopRequireWildcard(_domUtils);

var _utils = __webpack_require__(12);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

ol.Popover = function (map, params) {
  var _this = this;

  if (map && map instanceof ol.Map) {
    this.map = map;
  } else {
    throw new Error('传入的不是地图对象或者地图对象为空！');
  }

  this.options = params || {};

  if (this.options['autoPan'] === undefined) {
    this.options['autoPan'] = true;
  }

  if (!this.options['offset']) {
    this.options.offset = [0, 0];
  }

  if (this.options['autoPanAnimation'] === undefined) {
    this.options['autoPanAnimation'] = {
      duration: 250
    };
  }

  if (!this.options['className']) {
    this.options['className'] = 'hmap-js-popup';
  }

  if (this.options['opacity'] === undefined) {
    this.options['opacity'] = 1;
  }

  if (this.options['id'] === undefined || this.options['id'] === null) {
    this.options['id'] = (0, _utils.getuuid)();
  }

  if (!this.options['markIcon']) {
    this.options['markIcon'] = 'data:image;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAcCAYAAAC6YTVCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAA7BWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTYtMDQtMDdUMTE6MDM6MzkrMDg6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNi0wNC0wN1QyMDozMDoxNSswODowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDQtMDdUMjA6MzA6MTUrMDg6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDxwaG90b3Nob3A6SUNDUHJvZmlsZT5zUkdCIElFQzYxOTY2LTIuMTwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6MDk1Y2NlYjctNjUzMC00YjlhLTkzMWMtZjFlNGVkMDFkMjNkPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD54bXAuZGlkOjU5MmJmNDUyLTlhOWEtNDBiYS04YWUzLWQxZTVlZDg4MDVmZjwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjU5MmJmNDUyLTlhOWEtNDBiYS04YWUzLWQxZTVlZDg4MDVmZjwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo1OTJiZjQ1Mi05YTlhLTQwYmEtOGFlMy1kMWU1ZWQ4ODA1ZmY8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTYtMDQtMDdUMTE6MDM6MzkrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNvbnZlcnRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6cGFyYW1ldGVycz5mcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDowOTVjY2ViNy02NTMwLTRiOWEtOTMxYy1mMWU0ZWQwMWQyM2Q8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTYtMDQtMDdUMjA6MzA6MTUrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4xMzwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yODwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+u0hEhgAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAB/klEQVR42pSSP08UYRDGf89lAWNi4h/kOkxItCFqYSkQSipqPwAWgIXkEv0Wl1gctn4Tw3ImlBAqaA4t9DaSnMZEip13x+Levds7ciCTzCab93memXlm9Ht1FSRwB7SE2MZ9GfQQ8RN8H6eFaOMCOeqtrAAkDh+ALWLIwUU1doG3QJ5YMHB9BDY0M83M2hrh21fs8Ah3B0H8bOFMI3+dmIWXgg2A6acvmFlfxy8u6G1u4hHuw2obgk+JmW2XD8XxMVNHR+QnJ+RmA2SVKHijs+fPukAdNFCmBHn0aGQ0vid5bvVSQiVawqNEVSqSZxMLlgH1qpxiP16a4EOai/PEcvsMvOqrll6PzFDyUH9PqQ7nHy0h9hmZiMu/7kgCWK5ZYW2z0ApWEMwIIYymGRYCRREIZq0QrJ0UVoDYoW/f1rCnSyV3gR1wdFCfG6Lcl5C2gRVgFuccPEVqAe2BUQdz9cqh9W368u79jyzrdjuds/lGmj6o+o0cuY+urtlsAniWZZx1OnSzTHt7eyOYGhPCuXTl15N0BWsiaXhTNyH5mPP/RZpY50ojJpe6ZqabGoEm9leTRDWHFB9MNY6pVZq5Dyw0Go3F/hkKIdI0XQQW4rsAkkh6DNwZHynu9lbMe8AscFr282ScNCH+VEmKSneB28BUNKkAcuAv8AvoAf5vALfw5dErL2VFAAAAAElFTkSuQmCC';
  }

  if (!this.options['layerName']) {
    this.options['layerName'] = 'PopoverFeatureLayer';
  }

  var size = this.map.getSize();
  this.container = DomUtils.create('div', this.options['className']);
  this.content = DomUtils.create('div', 'hmap-js-popup-content', this.container);
  this.content.style.maxHeight = size[1] - 20 + 'px';
  if (this.options['showCloser'] !== false) {
    this.closer = DomUtils.create('div', 'hmap-js-popup-closer', this.container);
    this.closer.innerHTML = '+';
    this.closer.addEventListener('click', function (event) {
      var e = !event ? window.event : event;
      e.stopPropagation();
      if (_this && _this.options['id']) {
        _this.map.removeOverlay(_this);
        var layer = _this.getLayerByLayerName(_this.options['layerName']);
        layer.getSource().removeFeature(_this.markFeature);
        _this.markFeature = null;
      }
    });
  }
  if (this.options['showMinimize'] !== false) {
    this.minimize = DomUtils.create('div', 'hmap-js-popup-minimize', this.container);
    this.minimize.innerHTML = '_';
    this.minimize.addEventListener('click', function (event) {
      var e = !event ? window.event : event;
      e.stopPropagation();
      if (_this) {
        _this.showMinimize();
      }
    });
  }
  this.enableTouchScroll_(this.content);
  this.options.element = this.container;

  this.miniOverLay = null;
  ol.Overlay.call(this, {
    element: this.container,
    stopEvent: true,
    offset: this.options['offset'],
    id: this.options['id'],
    layerName: this.options['layerName'],
    insertFirst: this.options.hasOwnProperty('insertFirst') ? this.options.insertFirst : true
  });
};
ol.inherits(ol.Popover, ol.Overlay);

ol.Popover.prototype.show = function (coord, html, options) {
  options = options || {};
  if (options['dataProjection'] && options['featureProjection']) {
    var geom = new ol.geom.Point(coord);
    this.coords = geom.transform(options['dataProjection'], options['featureProjection']).getCoordinates();
  } else {
    this.coords = coord;
  }
  if (html instanceof HTMLElement) {
    this.content.innerHTML = '';
    this.content.appendChild(html);
  } else {
    this.content.innerHTML = html;
  }
  this.container.style.display = 'block';
  this.content.scrollTop = 0;
  if (this.options['showMarkFeature']) {
    this.showMarkFeature(this.coords);
  }
  if (this.markFeature) {
    var size = this.markFeature.getStyle().getImage().getSize();
    if (size && this.options['offset']) {
      this.options['offset'] = [this.options['offset'][0], this.options['offset'][1] - size[1]];
    }
  }
  if (this.options['properties']) {
    this.setProperties(this.options['properties']);
  }
  this.setOffset(this.options['offset']);
  this.setPosition(this.coords);
  this.updateSize();
  return this;
};

ol.Popover.prototype.showMarkFeature = function (coord) {
  var _this2 = this;

  this.markFeature = new ol.Feature({
    params: {
      moveable: true
    },
    geometry: new ol.geom.Point(coord)
  });
  this.set('markFeature', this.markFeature);
  var style = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      opacity: 1,
      src: this.options['markIcon']
    })
  });
  this.markFeature.setId(this.options['id']);
  this.markFeature.setStyle(style);
  this.markFeature.on('featureMove', function (event) {
    var coords = _this2.markFeature.getGeometry().getCoordinates();
    _this2.coords = coords;
    _this2.setPosition(coords);
    if (_this2.miniOverLay) {
      _this2.miniOverLay.setPosition(_this2.coords);
    }
  });
  var layer = this.createVectorLayer(this.options['layerName'], {
    create: true
  });
  if (layer && layer instanceof ol.layer.Vector) {
    layer.getSource().addFeature(this.markFeature);
  }
};

ol.Popover.prototype.createVectorLayer = function (layerName, params) {
  try {
    if (this.map) {
      var vectorLayer = this.getLayerByLayerName(layerName);
      if (!(vectorLayer instanceof ol.layer.Vector)) {
        vectorLayer = null;
      }
      if (!vectorLayer) {
        if (params && params.create) {
          vectorLayer = new ol.layer.Vector({
            layerName: layerName,
            params: params,
            layerType: 'vector',
            source: new ol.source.Vector({
              wrapX: false
            }),
            style: new ol.style.Style({
              fill: new ol.style.Fill({
                color: 'rgba(67, 110, 238, 0.4)'
              }),
              stroke: new ol.style.Stroke({
                color: '#4781d9',
                width: 2
              }),
              image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                  color: '#ffcc33'
                })
              })
            })
          });
        }
      }
      if (this.map && vectorLayer) {
        if (params && params.hasOwnProperty('selectable')) {
          vectorLayer.set('selectable', params.selectable);
        }

        var _vectorLayer = this.getLayerByLayerName(layerName);
        if (!_vectorLayer || !(_vectorLayer instanceof ol.layer.Vector)) {
          this.map.addLayer(vectorLayer);
        }
      }
      return vectorLayer;
    }
  } catch (e) {
    console.log(e);
  }
};

ol.Popover.prototype.getLayerByLayerName = function (layerName) {
  try {
    var targetLayer = null;
    if (this.map) {
      var layers = this.map.getLayers().getArray();
      layers.every(function (layer) {
        if (layer.get('layerName') === layerName) {
          targetLayer = layer;
          return false;
        } else {
          return true;
        }
      });
    }
    return targetLayer;
  } catch (e) {
    console.log(e);
  }
};

ol.Popover.prototype.showMinimize = function () {
  var _this3 = this;

  var that = this;
  if (this.options['showMarkFeature']) {
    if (!this.miniOverLay) {
      var element = DomUtils.create('span', 'hmap-marker-minimize-panel');
      element.setAttribute('data-state', 'block');
      that.container.style.display = 'none';
      var eventListener = function eventListener(event) {
        var e = !event ? window.event : event;
        e.stopPropagation();
        that.container.style.display = 'block';
        that.miniOverLay.getElement().style.display = 'none';
        _this3.miniOverLay.getElement().setAttribute('data-state', 'none');
      };
      element.removeEventListener('click', eventListener);
      element.addEventListener('click', eventListener);
      var label = DomUtils.create('label', 'hmap-marker-minimize-label', element);
      if (this.options['minimizeText']) {
        label.innerText = this.options['minimizeText'];
        label.setAttribute('title', this.options['minimizeText']);
      } else {
        label.innerText = '我的标记';
        label.setAttribute('title', '我的标记');
      }
      this.miniOverLay = new ol.Overlay({
        element: element,
        stopEvent: true,
        offset: [0, 0],
        id: this.options['id'] + '_minimize',
        position: this.coords
      });
      this.map.addOverlay(this.miniOverLay);
    } else {
      this.miniOverLay.getElement().style.display = 'block';
      that.container.style.display = 'none';
      this.miniOverLay.getElement().setAttribute('data-state', 'block');
      this.miniOverLay.setPosition(this.coords);
    }
  }
};

ol.Popover.prototype.hide = function () {
  this.container.style.display = 'none';
  if (this && this.options['id']) {
    this.map.removeOverlay(this);
  }
  return this;
};

ol.Popover.prototype.updateSize = function () {
  this.container.style.marginLeft = -this.container.clientWidth / 2 - 1 + 'px';
  this.container.style.display = 'block';
  this.container.style.opacity = 1;
  this.content.scrollTop = 0;
  this.map.render();
  return this;
};

ol.Popover.prototype.isOpened = function () {
  return this.container.style.display === 'block';
};

ol.Popover.prototype.isTouchDevice_ = function () {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
};

ol.Popover.prototype.enableTouchScroll_ = function (elm) {
  var _this4 = this;

  if (this.isTouchDevice_()) {
    var scrollStartPos = 0;
    elm.addEventListener('touchstart', function (event) {
      scrollStartPos = _this4.scrollTop + event.touches[0].pageY;
    }, false);
    elm.addEventListener('touchmove', function (event) {
      _this4.scrollTop = scrollStartPos - event.touches[0].pageY;
    }, false);
  }
};

var olPopover = ol.Popover;
exports.default = olPopover;
module.exports = exports['default'];

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

ol.source.BAIDU = function (optOptions) {
  var options = optOptions || {};
  var attributions = '';
  if (options.attributions !== undefined) {
    attributions = options.attributions;
  } else {
    attributions = [ol.source.BAIDU.ATTRIBUTION];
  }
  options.projection = options['projection'] ? options.projection : 'EPSG:3857';
  var crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';
  var url = options.url !== undefined ? options.url : 'http://online{0-3}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20170607&scaler=1&p=1';
  var tileUrlFunction = options.tileUrlFunction ? options.tileUrlFunction : undefined;
  if (!tileUrlFunction) {
    tileUrlFunction = function tileUrlFunction(tileCoord) {
      var z = tileCoord[0];
      var x = tileCoord[1];
      var y = tileCoord[2];
      if (x < 0) {
        x = 'M' + -x;
      }
      if (y < 0) {
        y = 'M' + -y;
      }
      return url.replace('{0-3}', ol.source.BAIDU.getRandom(0, 3)).replace('{x}', x.toString()).replace('{y}', y.toString()).replace('{z}', z.toString());
    };
  }
  var levels = options['levels'] ? options['levels'] : 19;
  var resolutions = [];
  for (var z = 0; z < levels; z++) {
    resolutions[z] = Math.pow(2, levels - 1 - z);
  }
  var tileGrid = new ol.tilegrid.TileGrid({
    tileSize: options['tileSize'] ? options['tileSize'] : 256,
    origin: options['origin'] ? options['origin'] : [0, 0],
    extent: options['extent'] ? options['extent'] : undefined,
    resolutions: resolutions,
    minZoom: options['minZoom'] && typeof options['minZoom'] === 'number' ? options['minZoom'] : 0
  });
  ol.source.TileImage.call(this, {
    tileGrid: tileGrid,
    attributions: attributions,
    cacheSize: options.cacheSize,
    projection: options.projection,
    crossOrigin: crossOrigin,
    opaque: options.opaque !== undefined ? options.opaque : true,
    maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
    reprojectionErrorThreshold: options.reprojectionErrorThreshold,
    tileUrlFunction: tileUrlFunction,
    url: url,
    wrapX: options.wrapX
  });
};
ol.inherits(ol.source.BAIDU, ol.source.TileImage);

ol.source.BAIDU.getRandom = function (min, max) {
  var r = Math.random() * (max - min);
  var re = Math.round(r + min);
  re = Math.max(Math.min(re, max), min);
  return re;
};

ol.source.BAIDU.ATTRIBUTION = new ol.Attribution({
  html: '&copy; ' + '<a href="http://map.baidu.com/">百度地图</a> ' + 'contributors.'
});

var olSourceBaidu = ol.source.BAIDU;
exports.default = olSourceBaidu;
module.exports = exports['default'];

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

ol.source.GAODE = function (optOptions) {
  var options = optOptions || {};
  var attributions = '';
  if (options.attributions !== undefined) {
    attributions = options.attributions;
  } else {
    attributions = [ol.source.GAODE.ATTRIBUTION];
  }
  var crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : undefined;
  var url = options.url !== undefined ? options.url : 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}';
  var tileUrlFunction = options.tileUrlFunction ? options.tileUrlFunction : undefined;
  ol.source.XYZ.call(this, {
    attributions: attributions,
    cacheSize: options.cacheSize,
    crossOrigin: crossOrigin,
    opaque: options.opaque !== undefined ? options.opaque : true,
    maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
    reprojectionErrorThreshold: options.reprojectionErrorThreshold,
    tileLoadFunction: options.tileLoadFunction,
    tileUrlFunction: tileUrlFunction,
    url: url,
    wrapX: options.wrapX
  });
};
ol.inherits(ol.source.GAODE, ol.source.XYZ);

ol.source.GAODE.ATTRIBUTION = new ol.Attribution({
  html: '&copy; ' + '<a href="http://ditu.amap.com/">高德地图</a> ' + 'contributors.'
});

var olSourceGaode = ol.source.GAODE;
exports.default = olSourceGaode;
module.exports = exports['default'];

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

ol.source.GOOGLE = function (optOptions) {
  var options = optOptions || {};
  var attributions = '';
  if (options.attributions !== undefined) {
    attributions = options.attributions;
  } else {
    attributions = [ol.source.GOOGLE.ATTRIBUTION];
  }
  var crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';
  var url = options.url !== undefined ? options.url : 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}';

  ol.source.XYZ.call(this, {
    attributions: attributions,
    cacheSize: options.cacheSize,
    crossOrigin: crossOrigin,
    opaque: options.opaque !== undefined ? options.opaque : true,
    maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
    reprojectionErrorThreshold: options.reprojectionErrorThreshold,
    tileLoadFunction: options.tileLoadFunction,
    url: url,
    wrapX: options.wrapX
  });
};
ol.inherits(ol.source.GOOGLE, ol.source.XYZ);

ol.source.GOOGLE.ATTRIBUTION = new ol.Attribution({
  html: '&copy; ' + '<a href="http://www.google.cn/maps">谷歌地图</a> ' + 'contributors.'
});

var olSourceGoogle = ol.source.GOOGLE;
exports.default = olSourceGoogle;
module.exports = exports['default'];

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(124);

var _utils = __webpack_require__(12);

var _fileSaver = __webpack_require__(133);

var _fileSaver2 = _interopRequireDefault(_fileSaver);

var _jspdf = __webpack_require__(134);

var _jspdf2 = _interopRequireDefault(_jspdf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!(0, _utils.has)(ol, 'tools')) {
  ol.tools = {};
}

ol.tools.PrintfMap = function (map, params) {
  this.options = params || {};
  if (map && map instanceof ol.Map) {
    this.map = map;
  } else {
    throw new Error('未获取到地图对象！');
  }

  this.dims = {
    a0: [1189, 841],
    a1: [841, 594],
    a2: [594, 420],
    a3: [420, 297],
    a4: [297, 210],
    a5: [210, 148]
  };

  this.format = {
    A0: 'a0',
    A1: 'a1',
    A2: 'a2',
    A3: 'a3',
    A4: 'a4',
    A5: 'a5'
  };
};

ol.tools.PrintfMap.prototype.saveCanvas = function (event, params) {
  var canvas = event.context.canvas;
  if (params['dpi'] && typeof params['dpi'] === 'number') {
    var scaleFactor = params['dpi'] / 96;
    canvas.width = Math.ceil(canvas.width * scaleFactor);
    canvas.height = Math.ceil(canvas.height * scaleFactor);
    event.context.scale(scaleFactor, scaleFactor);
  }
  if (params['printfType'] !== 'png') {
    this.map.once('precompose', function (e) {
      e.context.fillStyle = 'white';
      e.context.fillRect(0, 0, e.context.canvas.width, e.context.canvas.height);
    });
  }
  return canvas;
};

ol.tools.PrintfMap.prototype.getImageUrl = function (params) {
  var _this = this;

  this.map.renderSync();
  if (params['printfType'] === 'jpg') {
    params['printfType'] = 'jpeg';
  }
  return new Promise(function (resolve) {
    _this.map.once('postcompose', function (event) {
      var canvas = _this.saveCanvas(event, params);
      var image = canvas.toDataURL('image/.' + (params['printfType'] ? params['printfType'] : 'png'), params['quality'] ? params['quality'] : 1);
      resolve(image);
    });
  });
};

ol.tools.PrintfMap.prototype.DownLoadImage = function (params) {
  var _this2 = this;

  var button = document.createElement('a');
  button.style.visibility = 'hidden';
  button.style.width = '0px';
  button.style.height = '0px';
  document.body.appendChild(button);
  button.addEventListener('click', function () {
    _this2.map.once('postcompose', function (event) {
      var canvas = event.context.canvas;
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(canvas.msToBlob(), (params['fileName'] ? params['fileName'] : 'map') + '.png');
      } else {
        canvas.toBlob(function (blob) {
          _fileSaver2.default.saveAs(blob, (params['fileName'] ? params['fileName'] : 'map') + '.png');
        });
      }
    });
    _this2.map.renderSync();
  });
  button.click();
};

ol.tools.PrintfMap.prototype.DownLoadPDF = function (params) {
  var _this3 = this;

  var button = document.createElement('a');
  button.style.visibility = 'hidden';
  button.style.width = '0px';
  button.style.height = '0px';
  document.body.appendChild(button);
  button.addEventListener('click', function () {
    _this3.getImageUrl(params).then(function (res) {
      var format = _this3.format[params['format']] ? _this3.format[params['format']] : 'a4';
      var dim = _this3.dims[format];
      var pdf = new _jspdf2.default(params['orient'] ? params['orient'] : 'landscape', undefined, format);
      pdf.addImage(res, 'JPEG', 0, 0, dim[0], dim[1]);
      pdf.save((params['fileName'] ? params['fileName'] : 'map') + '.pdf');
    }).catch(function (error) {
      console.log(error);
    });
    _this3.map.renderSync();
  });
  button.click();
};

ol.tools.PrintfMap.prototype.print = function () {};

var olToolsPrintfMap = ol.tools.PrintfMap;
exports.default = olToolsPrintfMap;
module.exports = exports['default'];

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var EventType = exports.EventType = {
  CHANGE: 'change',
  CLICK: 'click',
  DBLCLICK: 'dblclick',
  DRAGENTER: 'dragenter',
  DRAGOVER: 'dragover',
  DROP: 'drop',
  ERROR: 'error',
  KEYDOWN: 'keydown',
  KEYPRESS: 'keypress',
  LOAD: 'load',
  MOUSEDOWN: 'mousedown',
  MOUSEMOVE: 'mousemove',
  MOUSEOUT: 'mouseout',
  MOUSEUP: 'mouseup',
  MOUSEWHEEL: 'mousewheel',
  MSPOINTERDOWN: 'MSPointerDown',
  RESIZE: 'resize',
  TOUCHSTART: 'touchstart',
  TOUCHMOVE: 'touchmove',
  TOUCHEND: 'touchend',
  WHEEL: 'wheel',
  POINTERMOVE: 'pointermove',
  POINTERDOWN: 'pointerdown',
  POINTERUP: 'pointerup',
  POINTEROVER: 'pointerover',
  POINTEROUT: 'pointerout',
  POINTERENTER: 'pointerenter',
  POINTERLEAVE: 'pointerleave',
  POINTERCANCEL: 'pointercancel'
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86);
__webpack_require__(87);
__webpack_require__(88);
__webpack_require__(141);
module.exports = __webpack_require__(15).Promise;


/***/ }),
/* 125 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 126 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 127 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 128 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 129 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 130 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 131 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 132 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /constructor/i.test(view.HTMLElement) || view.safari
		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		, arbitrary_revoke_timeout = 1000 * 40 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, force = type === force_saveable_type
				, object_url
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function() {
							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
							var popup = view.open(url, '_blank');
							if(!popup) view.location.href = url;
							url=undefined; // release reference before dispatching
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (!object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (force) {
						view.location.href = object_url;
					} else {
						var opened = view.open(object_url, "_blank");
						if (!opened) {
							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
							view.location.href = object_url;
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
			;
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function() {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		}
	;
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function(blob, name, no_auto_bom) {
			name = name || blob.name || "download";

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function(){};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if (("function" !== "undefined" && __webpack_require__(107) !== null) && (__webpack_require__(108) !== null)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
    return saveAs;
  }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define(e):t.jspdf=e()}(this,function(){"use strict";var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e=(function(){function t(t){this.value=t}function e(e){function n(i,o){try{var a=e[i](o),s=a.value;s instanceof t?Promise.resolve(s.value).then(function(t){n("next",t)},function(t){n("throw",t)}):r(a.done?"return":"normal",a.value)}catch(t){r("throw",t)}}function r(t,e){switch(t){case"return":i.resolve({value:e,done:!0});break;case"throw":i.reject(e);break;default:i.resolve({value:e,done:!1})}(i=i.next)?n(i.key,i.arg):o=null}var i,o;this._invoke=function(t,e){return new Promise(function(r,a){var s={key:t,arg:e,resolve:r,reject:a,next:null};o?o=o.next=s:(i=o=s,n(t,e))})},"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),function(e){function n(t){var n={};this.subscribe=function(t,e,r){if("function"!=typeof e)return!1;n.hasOwnProperty(t)||(n[t]={});var i=Math.random().toString(35);return n[t][i]=[e,!!r],i},this.unsubscribe=function(t){for(var e in n)if(n[e][t])return delete n[e][t],!0;return!1},this.publish=function(r){if(n.hasOwnProperty(r)){var i=Array.prototype.slice.call(arguments,1),o=[];for(var a in n[r]){var s=n[r][a];try{s[0].apply(t,i)}catch(t){e.console&&console.error("jsPDF PubSub Error",t.message,t)}s[1]&&o.push(a)}o.length&&o.forEach(this.unsubscribe)}}}function i(c,l,u,h){var f={};"object"===(void 0===c?"undefined":t(c))&&(c=(f=c).orientation,l=f.unit||l,u=f.format||u,h=f.compress||f.compressPdf||h),l=l||"mm",u=u||"a4",c=(""+(c||"P")).toLowerCase();(""+u).toLowerCase();var d,p,m,g,w,y,v,b,x,k=!!h&&"function"==typeof Uint8Array,_=f.textColor||"0 g",C=f.drawColor||"0 G",A=f.fontSize||16,S=f.lineHeight||1.15,q=f.lineWidth||.200025,T=2,P=!1,I=[],E={},O={},F=0,B=[],R=[],D=[],j=[],z=[],N=0,L=0,M=0,U={title:"",subject:"",author:"",keywords:"",creator:""},H={},W=new n(H),X=f.hotfixes||[],V=function(t){return t.toFixed(2)},G=function(t){return t.toFixed(3)},Y=function(t){return("0"+parseInt(t)).slice(-2)},J=function(t){P?B[g].push(t):(M+=t.length+1,j.push(t))},Q=function(){return T++,I[T]=M,J(T+" 0 obj"),T},K=function(t){J("stream"),J(t),J("endstream")},$=function(){var t,n,r,a,s,c,l,u,h,f=[];for(l=e.adler32cs||i.adler32cs,k&&void 0===l&&(k=!1),t=1;t<=F;t++){if(f.push(Q()),u=(w=D[t].width)*p,h=(y=D[t].height)*p,J("<</Type /Page"),J("/Parent 1 0 R"),J("/Resources 2 0 R"),J("/MediaBox [0 0 "+V(u)+" "+V(h)+"]"),W.publish("putPage",{pageNumber:t,page:B[t]}),J("/Contents "+(T+1)+" 0 R"),J(">>"),J("endobj"),n=B[t].join("\n"),Q(),k){for(r=[],a=n.length;a--;)r[a]=n.charCodeAt(a);c=l.from(n),(s=new o(6)).append(new Uint8Array(r)),n=s.flush(),(r=new Uint8Array(n.length+6)).set(new Uint8Array([120,156])),r.set(n,2),r.set(new Uint8Array([255&c,c>>8&255,c>>16&255,c>>24&255]),n.length+2),n=String.fromCharCode.apply(null,r),J("<</Length "+n.length+" /Filter [/FlateDecode]>>")}else J("<</Length "+n.length+">>");K(n),J("endobj")}I[1]=M,J("1 0 obj"),J("<</Type /Pages");var d="/Kids [";for(a=0;a<F;a++)d+=f[a]+" 0 R ";J(d+"]"),J("/Count "+F),J(">>"),J("endobj"),W.publish("postPutPages")},Z=function(t){t.objectNumber=Q(),J("<</BaseFont/"+t.PostScriptName+"/Type/Font"),"string"==typeof t.encoding&&J("/Encoding/"+t.encoding),J("/Subtype/Type1>>"),J("endobj")},tt=function(){for(var t in E)E.hasOwnProperty(t)&&Z(E[t])},et=function(){W.publish("putXobjectDict")},nt=function(){J("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"),J("/Font <<");for(var t in E)E.hasOwnProperty(t)&&J("/"+t+" "+E[t].objectNumber+" 0 R");J(">>"),J("/XObject <<"),et(),J(">>")},rt=function(){tt(),W.publish("putResources"),I[2]=M,J("2 0 obj"),J("<<"),nt(),J(">>"),J("endobj"),W.publish("postPutResources")},it=function(){W.publish("putAdditionalObjects");for(var t=0;t<z.length;t++){var e=z[t];I[e.objId]=M,J(e.objId+" 0 obj"),J(e.content),J("endobj")}T+=z.length,W.publish("postPutAdditionalObjects")},ot=function(t,e,n){O.hasOwnProperty(e)||(O[e]={}),O[e][n]=t},at=function(t,e,n,r){var i="F"+(Object.keys(E).length+1).toString(10),o=E[i]={id:i,PostScriptName:t,fontName:e,fontStyle:n,encoding:r,metadata:{}};return ot(i,e,n),W.publish("addFont",o),i},st=function(t,e){var n,r,i,o,a,s,c,l,u;if(e=e||{},i=e.sourceEncoding||"Unicode",a=e.outputEncoding,(e.autoencode||a)&&E[d].metadata&&E[d].metadata[i]&&E[d].metadata[i].encoding&&(o=E[d].metadata[i].encoding,!a&&E[d].encoding&&(a=E[d].encoding),!a&&o.codePages&&(a=o.codePages[0]),"string"==typeof a&&(a=o[a]),a)){for(c=!1,s=[],n=0,r=t.length;n<r;n++)(l=a[t.charCodeAt(n)])?s.push(String.fromCharCode(l)):s.push(t[n]),s[n].charCodeAt(0)>>8&&(c=!0);t=s.join("")}for(n=t.length;void 0===c&&0!==n;)t.charCodeAt(n-1)>>8&&(c=!0),n--;if(!c)return t;for(s=e.noBOM?[]:[254,255],n=0,r=t.length;n<r;n++){if(l=t.charCodeAt(n),(u=l>>8)>>8)throw new Error("Character at position "+n+" of string '"+t+"' exceeds 16bits. Cannot be encoded into UCS-2 BE");s.push(u),s.push(l-(u<<8))}return String.fromCharCode.apply(void 0,s)},ct=function(t,e){return st(t,e).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")},lt=function(){J("/Producer (jsPDF "+i.version+")");for(var t in U)U.hasOwnProperty(t)&&U[t]&&J("/"+t.substr(0,1).toUpperCase()+t.substr(1)+" ("+ct(U[t])+")");var e=new Date,n=e.getTimezoneOffset(),r=n<0?"+":"-",o=Math.floor(Math.abs(n/60)),a=Math.abs(n%60),s=[r,Y(o),"'",Y(a),"'"].join("");J(["/CreationDate (D:",e.getFullYear(),Y(e.getMonth()+1),Y(e.getDate()),Y(e.getHours()),Y(e.getMinutes()),Y(e.getSeconds()),s,")"].join(""))},ut=function(){switch(J("/Type /Catalog"),J("/Pages 1 0 R"),b||(b="fullwidth"),b){case"fullwidth":J("/OpenAction [3 0 R /FitH null]");break;case"fullheight":J("/OpenAction [3 0 R /FitV null]");break;case"fullpage":J("/OpenAction [3 0 R /Fit]");break;case"original":J("/OpenAction [3 0 R /XYZ null null 1]");break;default:var t=""+b;"%"===t.substr(t.length-1)&&(b=parseInt(b)/100),"number"==typeof b&&J("/OpenAction [3 0 R /XYZ null null "+V(b)+"]")}switch(x||(x="continuous"),x){case"continuous":J("/PageLayout /OneColumn");break;case"single":J("/PageLayout /SinglePage");break;case"two":case"twoleft":J("/PageLayout /TwoColumnLeft");break;case"tworight":J("/PageLayout /TwoColumnRight")}v&&J("/PageMode /"+v),W.publish("putCatalog")},ht=function(){J("/Size "+(T+1)),J("/Root "+T+" 0 R"),J("/Info "+(T-1)+" 0 R")},ft=function(t,e){var n="string"==typeof e&&e.toLowerCase();if("string"==typeof t){var r=t.toLowerCase();s.hasOwnProperty(r)&&(t=s[r][0]/p,e=s[r][1]/p)}if(Array.isArray(t)&&(e=t[1],t=t[0]),n){switch(n.substr(0,1)){case"l":e>t&&(n="s");break;case"p":t>e&&(n="s")}"s"===n&&(m=t,t=e,e=m)}P=!0,B[++F]=[],D[F]={width:Number(t)||w,height:Number(e)||y},R[F]={},mt(F)},dt=function(){ft.apply(this,arguments),J(V(q*p)+" w"),J(C),0!==N&&J(N+" J"),0!==L&&J(L+" j"),W.publish("addPage",{pageNumber:F})},pt=function(t){t>0&&t<=F&&(B.splice(t,1),D.splice(t,1),g>--F&&(g=F),this.setPage(g))},mt=function(t){t>0&&t<=F&&(g=t,w=D[t].width,y=D[t].height)},gt=function(t,e){var n;switch(t=void 0!==t?t:E[d].fontName,e=void 0!==e?e:E[d].fontStyle,void 0!==t&&(t=t.toLowerCase()),t){case"sans-serif":case"verdana":case"arial":case"helvetica":t="helvetica";break;case"fixed":case"monospace":case"terminal":case"courier":t="courier";break;case"serif":case"cursive":case"fantasy":default:t="times"}try{n=O[t][e]}catch(t){}return n||null==(n=O.times[e])&&(n=O.times.normal),n},wt=function(){P=!1,T=2,M=0,j=[],I=[],z=[],W.publish("buildDocument"),J("%PDF-"+a),$(),it(),rt(),Q(),J("<<"),lt(),J(">>"),J("endobj"),Q(),J("<<"),ut(),J(">>"),J("endobj");var t,e=M,n="0000000000";for(J("xref"),J("0 "+(T+1)),J(n+" 65535 f "),t=1;t<=T;t++){var r=I[t];J("function"==typeof r?(n+I[t]()).slice(-10)+" 00000 n ":(n+I[t]).slice(-10)+" 00000 n ")}return J("trailer"),J("<<"),ht(),J(">>"),J("startxref"),J(""+e),J("%%EOF"),P=!0,j.join("\n")},yt=function(t){var e="S";return"F"===t?e="f":"FD"===t||"DF"===t?e="B":"f"!==t&&"f*"!==t&&"B"!==t&&"B*"!==t||(e=t),e},vt=function(){for(var t=wt(),e=t.length,n=new ArrayBuffer(e),r=new Uint8Array(n);e--;)r[e]=t.charCodeAt(e);return n},bt=function(){return new Blob([vt()],{type:"application/pdf"})},xt=function(t){return t.foo=function(){try{return t.apply(this,arguments)}catch(t){var n=t.stack||"";~n.indexOf(" at ")&&(n=n.split(" at ")[1]);var r="Error in function "+n.split("\n")[0].split("<")[0]+": "+t.message;if(!e.console)throw new Error(r);e.console.error(r,t),e.alert&&alert(r)}},t.foo.bar=t,t.foo}(function(t,n){var i="dataur"===(""+t).substr(0,6)?"data:application/pdf;base64,"+btoa(wt()):0;switch(t){case void 0:return wt();case"save":if(navigator.getUserMedia&&(void 0===e.URL||void 0===e.URL.createObjectURL))return H.output("dataurlnewwindow");r(bt(),n),"function"==typeof r.unload&&e.setTimeout&&setTimeout(r.unload,911);break;case"arraybuffer":return vt();case"blob":return bt();case"bloburi":case"bloburl":return e.URL&&e.URL.createObjectURL(bt())||void 0;case"datauristring":case"dataurlstring":return i;case"dataurlnewwindow":var o=e.open(i);if(o||"undefined"==typeof safari)return o;case"datauri":case"dataurl":return e.document.location.href=i;default:throw new Error('Output type "'+t+'" is not supported.')}}),kt=function(t){return!0===Array.isArray(X)&&X.indexOf(t)>-1};switch(l){case"pt":p=1;break;case"mm":p=72/25.4000508;break;case"cm":p=72/2.54000508;break;case"in":p=72;break;case"px":p=1==kt("px_scaling")?.75:96/72;break;case"pc":case"em":p=12;break;case"ex":p=6;break;default:throw"Invalid unit: "+l}H.internal={pdfEscape:ct,getStyle:yt,getFont:function(){return E[gt.apply(H,arguments)]},getFontSize:function(){return A},getLineHeight:function(){return A*S},write:function(t){J(1===arguments.length?t:Array.prototype.join.call(arguments," "))},getCoordinateString:function(t){return V(t*p)},getVerticalCoordinateString:function(t){return V((y-t)*p)},collections:{},newObject:Q,newAdditionalObject:function(){var t=2*B.length+1,e={objId:t+=z.length,content:""};return z.push(e),e},newObjectDeferred:function(){return T++,I[T]=function(){return M},T},newObjectDeferredBegin:function(t){I[t]=M},putStream:K,events:W,scaleFactor:p,pageSize:{get width(){return w},get height(){return y}},output:function(t,e){return xt(t,e)},getNumberOfPages:function(){return B.length-1},pages:B,out:J,f2:V,getPageInfo:function(t){return{objId:2*(t-1)+3,pageNumber:t,pageContext:R[t]}},getCurrentPageInfo:function(){return{objId:2*(g-1)+3,pageNumber:g,pageContext:R[g]}},getPDFVersion:function(){return a},hasHotfix:kt},H.addPage=function(){return dt.apply(this,arguments),this},H.setPage=function(){return mt.apply(this,arguments),this},H.insertPage=function(t){return this.addPage(),this.movePage(g,t),this},H.movePage=function(t,e){if(t>e){for(var n=B[t],r=D[t],i=R[t],o=t;o>e;o--)B[o]=B[o-1],D[o]=D[o-1],R[o]=R[o-1];B[e]=n,D[e]=r,R[e]=i,this.setPage(e)}else if(t<e){for(var n=B[t],r=D[t],i=R[t],o=t;o<e;o++)B[o]=B[o+1],D[o]=D[o+1],R[o]=R[o+1];B[e]=n,D[e]=r,R[e]=i,this.setPage(e)}return this},H.deletePage=function(){return pt.apply(this,arguments),this},H.setDisplayMode=function(t,e,n){if(b=t,x=e,v=n,-1==[void 0,null,"UseNone","UseOutlines","UseThumbs","FullScreen"].indexOf(n))throw new Error('Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "'+n+'" is not recognized.');return this},H.text=function(t,e,n,r,i,o){function a(t){return t=t.split("\t").join(Array(f.TabLen||9).join(" ")),ct(t,r)}"number"==typeof t&&(m=n,n=e,e=t,t=m),"string"==typeof t&&(t=t.match(/[\n\r]/)?t.split(/\r\n|\r|\n/g):[t]),"string"==typeof i&&(o=i,i=null),"string"==typeof r&&(o=r,r=null),"number"==typeof r&&(i=r,r=null);var s="",c="Td";if(i){i*=Math.PI/180;var l=Math.cos(i),u=Math.sin(i);s=[V(l),V(u),V(-1*u),V(l),""].join(" "),c="Tm"}"noBOM"in(r=r||{})||(r.noBOM=!0),"autoencode"in r||(r.autoencode=!0);var h="",g=this.internal.getCurrentPageInfo().pageContext;if(!0===r.stroke?!0!==g.lastTextWasStroke&&(h="1 Tr\n",g.lastTextWasStroke=!0):(g.lastTextWasStroke&&(h="0 Tr\n"),g.lastTextWasStroke=!1),void 0===this._runningPageHeight&&(this._runningPageHeight=0),"string"==typeof t)t=a(t);else{if("[object Array]"!==Object.prototype.toString.call(t))throw new Error('Type of text must be string or Array. "'+t+'" is not recognized.');for(var w=t.concat(),v=[],b=w.length;b--;)v.push(a(w.shift()));if(o){var x,k,C,q=A*S,T=t.map(function(t){return this.getStringUnitWidth(t)*A/p},this);if(C=Math.max.apply(Math,T),"center"===o)x=e-C/2,e-=T[0]/2;else{if("right"!==o)throw new Error('Unrecognized alignment option, use "center" or "right".');x=e-C,e-=T[0]}k=e,t=v[0];for(var P=1,b=v.length;P<b;P++){var I=C-T[P];"center"===o&&(I/=2),t+=") Tj\n"+(x-k+I)+" -"+q+" Td ("+v[P],k=x+I}}else t=v.join(") Tj\nT* (")}var E;return E=V((y-n)*p),J("BT\n/"+d+" "+A+" Tf\n"+A*S+" TL\n"+h+_+"\n"+s+V(e*p)+" "+E+" "+c+"\n("+t+") Tj\nET"),this},H.lstext=function(t,e,n,r){console.warn("jsPDF.lstext is deprecated");for(var i=0,o=t.length;i<o;i++,e+=r)this.text(t[i],e,n);return this},H.line=function(t,e,n,r){return this.lines([[n-t,r-e]],t,e)},H.clip=function(){J("W"),J("S")},H.clip_fixed=function(t){J("evenodd"===t?"W*":"W"),J("n")},H.lines=function(t,e,n,r,i,o){var a,s,c,l,u,h,f,d,g,w,v;for("number"==typeof t&&(m=n,n=e,e=t,t=m),r=r||[1,1],J(G(e*p)+" "+G((y-n)*p)+" m "),a=r[0],s=r[1],l=t.length,w=e,v=n,c=0;c<l;c++)2===(u=t[c]).length?(w=u[0]*a+w,v=u[1]*s+v,J(G(w*p)+" "+G((y-v)*p)+" l")):(h=u[0]*a+w,f=u[1]*s+v,d=u[2]*a+w,g=u[3]*s+v,w=u[4]*a+w,v=u[5]*s+v,J(G(h*p)+" "+G((y-f)*p)+" "+G(d*p)+" "+G((y-g)*p)+" "+G(w*p)+" "+G((y-v)*p)+" c"));return o&&J(" h"),null!==i&&J(yt(i)),this},H.rect=function(t,e,n,r,i){yt(i);return J([V(t*p),V((y-e)*p),V(n*p),V(-r*p),"re"].join(" ")),null!==i&&J(yt(i)),this},H.triangle=function(t,e,n,r,i,o,a){return this.lines([[n-t,r-e],[i-n,o-r],[t-i,e-o]],t,e,[1,1],a,!0),this},H.roundedRect=function(t,e,n,r,i,o,a){var s=4/3*(Math.SQRT2-1);return this.lines([[n-2*i,0],[i*s,0,i,o-o*s,i,o],[0,r-2*o],[0,o*s,-i*s,o,-i,o],[2*i-n,0],[-i*s,0,-i,-o*s,-i,-o],[0,2*o-r],[0,-o*s,i*s,-o,i,-o]],t+i,e,[1,1],a),this},H.ellipse=function(t,e,n,r,i){var o=4/3*(Math.SQRT2-1)*n,a=4/3*(Math.SQRT2-1)*r;return J([V((t+n)*p),V((y-e)*p),"m",V((t+n)*p),V((y-(e-a))*p),V((t+o)*p),V((y-(e-r))*p),V(t*p),V((y-(e-r))*p),"c"].join(" ")),J([V((t-o)*p),V((y-(e-r))*p),V((t-n)*p),V((y-(e-a))*p),V((t-n)*p),V((y-e)*p),"c"].join(" ")),J([V((t-n)*p),V((y-(e+a))*p),V((t-o)*p),V((y-(e+r))*p),V(t*p),V((y-(e+r))*p),"c"].join(" ")),J([V((t+o)*p),V((y-(e+r))*p),V((t+n)*p),V((y-(e+a))*p),V((t+n)*p),V((y-e)*p),"c"].join(" ")),null!==i&&J(yt(i)),this},H.circle=function(t,e,n,r){return this.ellipse(t,e,n,n,r)},H.setProperties=function(t){for(var e in U)U.hasOwnProperty(e)&&t[e]&&(U[e]=t[e]);return this},H.setFontSize=function(t){return A=t,this},H.setFont=function(t,e){return d=gt(t,e),this},H.setFontStyle=H.setFontType=function(t){return d=gt(void 0,t),this},H.getFontList=function(){var t,e,n,r={};for(t in O)if(O.hasOwnProperty(t)){r[t]=n=[];for(e in O[t])O[t].hasOwnProperty(e)&&n.push(e)}return r},H.addFont=function(t,e,n){at(t,e,n,"StandardEncoding")},H.setLineWidth=function(t){return J((t*p).toFixed(2)+" w"),this},H.setDrawColor=function(t,e,n,r){var i;return i=void 0===e||void 0===r&&t===e===n?"string"==typeof t?t+" G":V(t/255)+" G":void 0===r?"string"==typeof t?[t,e,n,"RG"].join(" "):[V(t/255),V(e/255),V(n/255),"RG"].join(" "):"string"==typeof t?[t,e,n,r,"K"].join(" "):[V(t),V(e),V(n),V(r),"K"].join(" "),J(i),this},H.setFillColor=function(e,n,r,i){var o;return void 0===n||void 0===i&&e===n===r?o="string"==typeof e?e+" g":V(e/255)+" g":void 0===i||"object"===(void 0===i?"undefined":t(i))?(o="string"==typeof e?[e,n,r,"rg"].join(" "):[V(e/255),V(n/255),V(r/255),"rg"].join(" "),i&&0===i.a&&(o=["255","255","255","rg"].join(" "))):o="string"==typeof e?[e,n,r,i,"k"].join(" "):[V(e),V(n),V(r),V(i),"k"].join(" "),J(o),this},H.setTextColor=function(t,e,n){if("string"==typeof t&&/^#[0-9A-Fa-f]{6}$/.test(t)){var r=parseInt(t.substr(1),16);t=r>>16&255,e=r>>8&255,n=255&r}return _=0===t&&0===e&&0===n||void 0===e?G(t/255)+" g":[G(t/255),G(e/255),G(n/255),"rg"].join(" "),this},H.CapJoinStyles={0:0,butt:0,but:0,miter:0,1:1,round:1,rounded:1,circle:1,2:2,projecting:2,project:2,square:2,bevel:2},H.setLineCap=function(t){var e=this.CapJoinStyles[t];if(void 0===e)throw new Error("Line cap style of '"+t+"' is not recognized. See or extend .CapJoinStyles property for valid styles");return N=e,J(e+" J"),this},H.setLineJoin=function(t){var e=this.CapJoinStyles[t];if(void 0===e)throw new Error("Line join style of '"+t+"' is not recognized. See or extend .CapJoinStyles property for valid styles");return L=e,J(e+" j"),this},H.output=xt,H.save=function(t){H.output("save",t)};for(var _t in i.API)i.API.hasOwnProperty(_t)&&("events"===_t&&i.API.events.length?function(t,e){var n,r,i;for(i=e.length-1;-1!==i;i--)n=e[i][0],r=e[i][1],t.subscribe.apply(t,[n].concat("function"==typeof r?[r]:r))}(W,i.API.events):H[_t]=i.API[_t]);return function(){for(var t=[["Helvetica","helvetica","normal"],["Helvetica-Bold","helvetica","bold"],["Helvetica-Oblique","helvetica","italic"],["Helvetica-BoldOblique","helvetica","bolditalic"],["Courier","courier","normal"],["Courier-Bold","courier","bold"],["Courier-Oblique","courier","italic"],["Courier-BoldOblique","courier","bolditalic"],["Times-Roman","times","normal"],["Times-Bold","times","bold"],["Times-Italic","times","italic"],["Times-BoldItalic","times","bolditalic"],["ZapfDingbats","zapfdingbats"]],e=0,n=t.length;e<n;e++){var r=at(t[e][0],t[e][1],t[e][2],"StandardEncoding"),i=t[e][0].split("-");ot(r,i[0],i[1]||"")}W.publish("addFonts",{fonts:E,dictionary:O})}(),d="F1",dt(u,c),W.publish("initialized"),H}var a="1.3",s={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,161.57],c10:[79.37,113.39],dl:[311.81,623.62],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,360],ledger:[1224,792],tabloid:[792,1224],"credit-card":[153,243]};return i.API={events:[]},i.version="1.x-master", true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return i}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof module&&module.exports?module.exports=i:e.jsPDF=i,i}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||void 0));/**
 * jsPDF AcroForm Plugin
 * Copyright (c) 2016 Alexander Weidt, https://github.com/BiggA94
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
(window.AcroForm=function(t){var n=window.AcroForm;n.scale=function(t){return t*(r.internal.scaleFactor/1)},n.antiScale=function(t){return 1/r.internal.scaleFactor*t};var r={fields:[],xForms:[],acroFormDictionaryRoot:null,printedOut:!1,internal:null};e.API.acroformPlugin=r;var i=function(){for(var t in this.acroformPlugin.acroFormDictionaryRoot.Fields){var e=this.acroformPlugin.acroFormDictionaryRoot.Fields[t];e.hasAnnotation&&a.call(this,e)}},o=function(){if(this.acroformPlugin.acroFormDictionaryRoot)throw new Error("Exception while creating AcroformDictionary");this.acroformPlugin.acroFormDictionaryRoot=new n.AcroFormDictionary,this.acroformPlugin.internal=this.internal,this.acroformPlugin.acroFormDictionaryRoot._eventID=this.internal.events.subscribe("postPutResources",l),this.internal.events.subscribe("buildDocument",i),this.internal.events.subscribe("putCatalog",c),this.internal.events.subscribe("postPutPages",u)},a=function(t){var n={type:"reference",object:t};e.API.annotationPlugin.annotations[this.internal.getPageInfo(t.page).pageNumber].push(n)},s=function(t){this.acroformPlugin.printedOut&&(this.acroformPlugin.printedOut=!1,this.acroformPlugin.acroFormDictionaryRoot=null),this.acroformPlugin.acroFormDictionaryRoot||o.call(this),this.acroformPlugin.acroFormDictionaryRoot.Fields.push(t)},c=function(){void 0!==this.acroformPlugin.acroFormDictionaryRoot?this.internal.write("/AcroForm "+this.acroformPlugin.acroFormDictionaryRoot.objId+" 0 R"):console.log("Root missing...")},l=function(){this.internal.events.unsubscribe(this.acroformPlugin.acroFormDictionaryRoot._eventID),delete this.acroformPlugin.acroFormDictionaryRoot._eventID,this.acroformPlugin.printedOut=!0},u=function(t){var e=!t;t||(this.internal.newObjectDeferredBegin(this.acroformPlugin.acroFormDictionaryRoot.objId),this.internal.out(this.acroformPlugin.acroFormDictionaryRoot.getString()));var t=t||this.acroformPlugin.acroFormDictionaryRoot.Kids;for(var r in t){var i=t[r],o=i.Rect;i.Rect&&(i.Rect=n.internal.calculateCoordinates.call(this,i.Rect)),this.internal.newObjectDeferredBegin(i.objId);var a="";if(a+=i.objId+" 0 obj\n",a+="<<\n"+i.getContent(),i.Rect=o,i.hasAppearanceStream&&!i.appearanceStreamContent){var s=n.internal.calculateAppearanceStream.call(this,i);a+="/AP << /N "+s+" >>\n",this.acroformPlugin.xForms.push(s)}if(i.appearanceStreamContent){a+="/AP << ";for(var c in i.appearanceStreamContent){var l=i.appearanceStreamContent[c];if(a+="/"+c+" ",a+="<< ",Object.keys(l).length>=1||Array.isArray(l))for(var r in l)"function"==typeof(u=l[r])&&(u=u.call(this,i)),a+="/"+r+" "+u+" ",this.acroformPlugin.xForms.indexOf(u)>=0||this.acroformPlugin.xForms.push(u);else{var u=l;"function"==typeof u&&(u=u.call(this,i)),a+="/"+r+" "+u+" \n",this.acroformPlugin.xForms.indexOf(u)>=0||this.acroformPlugin.xForms.push(u)}a+=" >>\n"}a+=">>\n"}a+=">>\nendobj\n",this.internal.out(a)}e&&h.call(this,this.acroformPlugin.xForms)},h=function(t){for(var e in t){var n=e,r=t[e];this.internal.newObjectDeferredBegin(r&&r.objId);var i="";i+=r?r.getString():"",this.internal.out(i),delete t[n]}};t.addField=function(t){return t instanceof n.TextField?d.call(this,t):t instanceof n.ChoiceField?p.call(this,t):t instanceof n.Button?f.call(this,t):t instanceof n.ChildClass?s.call(this,t):t&&s.call(this,t),t.page=this.acroformPlugin.internal.getCurrentPageInfo().pageNumber,this};var f=function(t){(t=t||new n.Field).FT="/Btn";var e=t.Ff||0;t.pushbutton&&(e=n.internal.setBitPosition(e,17),delete t.pushbutton),t.radio&&(e=n.internal.setBitPosition(e,16),delete t.radio),t.noToggleToOff&&(e=n.internal.setBitPosition(e,15)),t.Ff=e,s.call(this,t)},d=function(t){(t=t||new n.Field).FT="/Tx";var e=t.Ff||0;t.multiline&&(e|=4096),t.password&&(e|=8192),t.fileSelect&&(e|=1<<20),t.doNotSpellCheck&&(e|=1<<22),t.doNotScroll&&(e|=1<<23),t.Ff=t.Ff||e,s.call(this,t)},p=function(t){var e=t||new n.Field;e.FT="/Ch";var r=e.Ff||0;e.combo&&(r=n.internal.setBitPosition(r,18),delete e.combo),e.edit&&(r=n.internal.setBitPosition(r,19),delete e.edit),e.sort&&(r=n.internal.setBitPosition(r,20),delete e.sort),e.multiSelect&&this.internal.getPDFVersion()>=1.4&&(r=n.internal.setBitPosition(r,22),delete e.multiSelect),e.doNotSpellCheck&&this.internal.getPDFVersion()>=1.4&&(r=n.internal.setBitPosition(r,23),delete e.doNotSpellCheck),e.Ff=r,s.call(this,e)}})(e.API);var n=window.AcroForm;n.internal={},n.createFormXObject=function(t){var e=new n.FormXObject,r=n.Appearance.internal.getHeight(t)||0,i=n.Appearance.internal.getWidth(t)||0;return e.BBox=[0,0,i,r],e},n.Appearance={CheckBox:{createAppearanceStream:function(){return{N:{On:n.Appearance.CheckBox.YesNormal},D:{On:n.Appearance.CheckBox.YesPushDown,Off:n.Appearance.CheckBox.OffPushDown}}},createMK:function(){return"<< /CA (3)>>"},YesPushDown:function(t){var e=n.createFormXObject(t),r="";t.Q=1;var i=n.internal.calculateX(t,"3","ZapfDingbats",50);return r+="0.749023 g\n             0 0 "+n.Appearance.internal.getWidth(t)+" "+n.Appearance.internal.getHeight(t)+" re\n             f\n             BMC\n             q\n             0 0 1 rg\n             /F13 "+i.fontSize+" Tf 0 g\n             BT\n",r+=i.text,r+="ET\n             Q\n             EMC\n",e.stream=r,e},YesNormal:function(t){var e=n.createFormXObject(t),r="";t.Q=1;var i=n.internal.calculateX(t,"3","ZapfDingbats",.9*n.Appearance.internal.getHeight(t));return r+="1 g\n0 0 "+n.Appearance.internal.getWidth(t)+" "+n.Appearance.internal.getHeight(t)+" re\nf\nq\n0 0 1 rg\n0 0 "+(n.Appearance.internal.getWidth(t)-1)+" "+(n.Appearance.internal.getHeight(t)-1)+" re\nW\nn\n0 g\nBT\n/F13 "+i.fontSize+" Tf 0 g\n",r+=i.text,r+="ET\n             Q\n",e.stream=r,e},OffPushDown:function(t){var e=n.createFormXObject(t),r="";return r+="0.749023 g\n            0 0 "+n.Appearance.internal.getWidth(t)+" "+n.Appearance.internal.getHeight(t)+" re\n            f\n",e.stream=r,e}},RadioButton:{Circle:{createAppearanceStream:function(t){var e={D:{Off:n.Appearance.RadioButton.Circle.OffPushDown},N:{}};return e.N[t]=n.Appearance.RadioButton.Circle.YesNormal,e.D[t]=n.Appearance.RadioButton.Circle.YesPushDown,e},createMK:function(){return"<< /CA (l)>>"},YesNormal:function(t){var e=n.createFormXObject(t),r="",i=n.Appearance.internal.getWidth(t)<=n.Appearance.internal.getHeight(t)?n.Appearance.internal.getWidth(t)/4:n.Appearance.internal.getHeight(t)/4;i*=.9;var o=n.Appearance.internal.Bezier_C;return r+="q\n1 0 0 1 "+n.Appearance.internal.getWidth(t)/2+" "+n.Appearance.internal.getHeight(t)/2+" cm\n"+i+" 0 m\n"+i+" "+i*o+" "+i*o+" "+i+" 0 "+i+" c\n-"+i*o+" "+i+" -"+i+" "+i*o+" -"+i+" 0 c\n-"+i+" -"+i*o+" -"+i*o+" -"+i+" 0 -"+i+" c\n"+i*o+" -"+i+" "+i+" -"+i*o+" "+i+" 0 c\nf\nQ\n",e.stream=r,e},YesPushDown:function(t){var e=n.createFormXObject(t),r="",i=n.Appearance.internal.getWidth(t)<=n.Appearance.internal.getHeight(t)?n.Appearance.internal.getWidth(t)/4:n.Appearance.internal.getHeight(t)/4,o=2*(i*=.9),a=o*n.Appearance.internal.Bezier_C,s=i*n.Appearance.internal.Bezier_C;return r+="0.749023 g\n            q\n           1 0 0 1 "+n.Appearance.internal.getWidth(t)/2+" "+n.Appearance.internal.getHeight(t)/2+" cm\n"+o+" 0 m\n"+o+" "+a+" "+a+" "+o+" 0 "+o+" c\n-"+a+" "+o+" -"+o+" "+a+" -"+o+" 0 c\n-"+o+" -"+a+" -"+a+" -"+o+" 0 -"+o+" c\n"+a+" -"+o+" "+o+" -"+a+" "+o+" 0 c\n            f\n            Q\n            0 g\n            q\n            1 0 0 1 "+n.Appearance.internal.getWidth(t)/2+" "+n.Appearance.internal.getHeight(t)/2+" cm\n"+i+" 0 m\n"+i+" "+s+" "+s+" "+i+" 0 "+i+" c\n-"+s+" "+i+" -"+i+" "+s+" -"+i+" 0 c\n-"+i+" -"+s+" -"+s+" -"+i+" 0 -"+i+" c\n"+s+" -"+i+" "+i+" -"+s+" "+i+" 0 c\n            f\n            Q\n",e.stream=r,e},OffPushDown:function(t){var e=n.createFormXObject(t),r="",i=n.Appearance.internal.getWidth(t)<=n.Appearance.internal.getHeight(t)?n.Appearance.internal.getWidth(t)/4:n.Appearance.internal.getHeight(t)/4,o=2*(i*=.9),a=o*n.Appearance.internal.Bezier_C;return r+="0.749023 g\n            q\n 1 0 0 1 "+n.Appearance.internal.getWidth(t)/2+" "+n.Appearance.internal.getHeight(t)/2+" cm\n"+o+" 0 m\n"+o+" "+a+" "+a+" "+o+" 0 "+o+" c\n-"+a+" "+o+" -"+o+" "+a+" -"+o+" 0 c\n-"+o+" -"+a+" -"+a+" -"+o+" 0 -"+o+" c\n"+a+" -"+o+" "+o+" -"+a+" "+o+" 0 c\n            f\n            Q\n",e.stream=r,e}},Cross:{createAppearanceStream:function(t){var e={D:{Off:n.Appearance.RadioButton.Cross.OffPushDown},N:{}};return e.N[t]=n.Appearance.RadioButton.Cross.YesNormal,e.D[t]=n.Appearance.RadioButton.Cross.YesPushDown,e},createMK:function(){return"<< /CA (8)>>"},YesNormal:function(t){var e=n.createFormXObject(t),r="",i=n.Appearance.internal.calculateCross(t);return r+="q\n            1 1 "+(n.Appearance.internal.getWidth(t)-2)+" "+(n.Appearance.internal.getHeight(t)-2)+" re\n            W\n            n\n            "+i.x1.x+" "+i.x1.y+" m\n            "+i.x2.x+" "+i.x2.y+" l\n            "+i.x4.x+" "+i.x4.y+" m\n            "+i.x3.x+" "+i.x3.y+" l\n            s\n            Q\n",e.stream=r,e},YesPushDown:function(t){var e=n.createFormXObject(t),r=n.Appearance.internal.calculateCross(t),i="";return i+="0.749023 g\n            0 0 "+n.Appearance.internal.getWidth(t)+" "+n.Appearance.internal.getHeight(t)+" re\n            f\n            q\n            1 1 "+(n.Appearance.internal.getWidth(t)-2)+" "+(n.Appearance.internal.getHeight(t)-2)+" re\n            W\n            n\n            "+r.x1.x+" "+r.x1.y+" m\n            "+r.x2.x+" "+r.x2.y+" l\n            "+r.x4.x+" "+r.x4.y+" m\n            "+r.x3.x+" "+r.x3.y+" l\n            s\n            Q\n",e.stream=i,e},OffPushDown:function(t){var e=n.createFormXObject(t),r="";return r+="0.749023 g\n            0 0 "+n.Appearance.internal.getWidth(t)+" "+n.Appearance.internal.getHeight(t)+" re\n            f\n",e.stream=r,e}}},createDefaultAppearanceStream:function(t){var e="";return e+="/Helv 0 Tf 0 g"}},n.Appearance.internal={Bezier_C:.551915024494,calculateCross:function(t){var e=n.Appearance.internal.getWidth(t),r=n.Appearance.internal.getHeight(t),i=function(t,e){return t>e?e:t}(e,r);return{x1:{x:(e-i)/2,y:(r-i)/2+i},x2:{x:(e-i)/2+i,y:(r-i)/2},x3:{x:(e-i)/2,y:(r-i)/2},x4:{x:(e-i)/2+i,y:(r-i)/2+i}}}},n.Appearance.internal.getWidth=function(t){return t.Rect[2]},n.Appearance.internal.getHeight=function(t){return t.Rect[3]},n.internal.inherit=function(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t},n.internal.arrayToPdfArray=function(t){if(Array.isArray(t)){var e=" [";for(var n in t)e+=t[n].toString(),e+=n<t.length-1?" ":"";return e+="]"}},n.internal.toPdfString=function(t){return 0!==(t=t||"").indexOf("(")&&(t="("+t),")"!=t.substring(t.length-1)&&(t+="("),t},n.PDFObject=function(){var t;Object.defineProperty(this,"objId",{get:function(){return t||(this.internal?t=this.internal.newObjectDeferred():e.API.acroformPlugin.internal&&(t=e.API.acroformPlugin.internal.newObjectDeferred())),t||console.log("Couldn't create Object ID"),t},configurable:!1})},n.PDFObject.prototype.toString=function(){return this.objId+" 0 R"},n.PDFObject.prototype.getString=function(){var t=this.objId+" 0 obj\n<<";return t+=this.getContent()+">>\n",this.stream&&(t+="stream\n",t+=this.stream,t+="endstream\n"),t+="endobj\n"},n.PDFObject.prototype.getContent=function(){var t="";return t+=function(t){var e="",r=Object.keys(t).filter(function(t){return"content"!=t&&"appearanceStreamContent"!=t&&"_"!=t.substring(0,1)});for(var i in r){var o=r[i],a=t[o];a&&(Array.isArray(a)?e+="/"+o+" "+n.internal.arrayToPdfArray(a)+"\n":a instanceof n.PDFObject?e+="/"+o+" "+a.objId+" 0 R\n":e+="/"+o+" "+a+"\n")}return e}(this)},n.FormXObject=function(){n.PDFObject.call(this),this.Type="/XObject",this.Subtype="/Form",this.FormType=1,this.BBox,this.Matrix,this.Resources="2 0 R",this.PieceInfo;var t;Object.defineProperty(this,"Length",{enumerable:!0,get:function(){return void 0!==t?t.length:0}}),Object.defineProperty(this,"stream",{enumerable:!1,set:function(e){t=e},get:function(){return t||null}})},n.internal.inherit(n.FormXObject,n.PDFObject),n.AcroFormDictionary=function(){n.PDFObject.call(this);var t=[];Object.defineProperty(this,"Kids",{enumerable:!1,configurable:!0,get:function(){return t.length>0?t:void 0}}),Object.defineProperty(this,"Fields",{enumerable:!0,configurable:!0,get:function(){return t}}),this.DA},n.internal.inherit(n.AcroFormDictionary,n.PDFObject),n.Field=function(){n.PDFObject.call(this);var t;Object.defineProperty(this,"Rect",{enumerable:!0,configurable:!1,get:function(){if(t)return t},set:function(e){t=e}});var e="";Object.defineProperty(this,"FT",{enumerable:!0,set:function(t){e=t},get:function(){return e}});var r;Object.defineProperty(this,"T",{enumerable:!0,configurable:!1,set:function(t){r=t},get:function(){if(!r||r.length<1){if(this instanceof n.ChildClass)return;return"(FieldObject"+n.Field.FieldNum+++")"}return"("==r.substring(0,1)&&r.substring(r.length-1)?r:"("+r+")"}});var i;Object.defineProperty(this,"DA",{enumerable:!0,get:function(){if(i)return"("+i+")"},set:function(t){i=t}});var o;Object.defineProperty(this,"DV",{enumerable:!0,configurable:!0,get:function(){if(o)return o},set:function(t){o=t}}),Object.defineProperty(this,"Type",{enumerable:!0,get:function(){return this.hasAnnotation?"/Annot":null}}),Object.defineProperty(this,"Subtype",{enumerable:!0,get:function(){return this.hasAnnotation?"/Widget":null}}),this.BG,Object.defineProperty(this,"hasAnnotation",{enumerable:!1,get:function(){return!!(this.Rect||this.BC||this.BG)}}),Object.defineProperty(this,"hasAppearanceStream",{enumerable:!1,configurable:!0,writable:!0}),Object.defineProperty(this,"page",{enumerable:!1,configurable:!0,writable:!0})},n.Field.FieldNum=0,n.internal.inherit(n.Field,n.PDFObject),n.ChoiceField=function(){n.Field.call(this),this.FT="/Ch",this.Opt=[],this.V="()",this.TI=0,this.combo=!1,Object.defineProperty(this,"edit",{enumerable:!0,set:function(t){1==t?(this._edit=!0,this.combo=!0):this._edit=!1},get:function(){return!!this._edit&&this._edit},configurable:!1}),this.hasAppearanceStream=!0,Object.defineProperty(this,"V",{get:function(){n.internal.toPdfString()}})},n.internal.inherit(n.ChoiceField,n.Field),window.ChoiceField=n.ChoiceField,n.ListBox=function(){n.ChoiceField.call(this)},n.internal.inherit(n.ListBox,n.ChoiceField),window.ListBox=n.ListBox,n.ComboBox=function(){n.ListBox.call(this),this.combo=!0},n.internal.inherit(n.ComboBox,n.ListBox),window.ComboBox=n.ComboBox,n.EditBox=function(){n.ComboBox.call(this),this.edit=!0},n.internal.inherit(n.EditBox,n.ComboBox),window.EditBox=n.EditBox,n.Button=function(){n.Field.call(this),this.FT="/Btn"},n.internal.inherit(n.Button,n.Field),window.Button=n.Button,n.PushButton=function(){n.Button.call(this),this.pushbutton=!0},n.internal.inherit(n.PushButton,n.Button),window.PushButton=n.PushButton,n.RadioButton=function(){n.Button.call(this),this.radio=!0;var t=[];Object.defineProperty(this,"Kids",{enumerable:!0,get:function(){if(t.length>0)return t}}),Object.defineProperty(this,"__Kids",{get:function(){return t}});var e;Object.defineProperty(this,"noToggleToOff",{enumerable:!1,get:function(){return e},set:function(t){e=t}})},n.internal.inherit(n.RadioButton,n.Button),window.RadioButton=n.RadioButton,n.ChildClass=function(t,e){n.Field.call(this),this.Parent=t,this._AppearanceType=n.Appearance.RadioButton.Circle,this.appearanceStreamContent=this._AppearanceType.createAppearanceStream(e),this.F=n.internal.setBitPosition(this.F,3,1),this.MK=this._AppearanceType.createMK(),this.AS="/Off",this._Name=e},n.internal.inherit(n.ChildClass,n.Field),n.RadioButton.prototype.setAppearance=function(t){if("createAppearanceStream"in t&&"createMK"in t)for(var e in this.__Kids){var n=this.__Kids[e];n.appearanceStreamContent=t.createAppearanceStream(n._Name),n.MK=t.createMK()}else console.log("Couldn't assign Appearance to RadioButton. Appearance was Invalid!")},n.RadioButton.prototype.createOption=function(t){var r=this,i=new n.ChildClass(r,t);return this.__Kids.push(i),e.API.addField(i),i},n.CheckBox=function(){Button.call(this),this.appearanceStreamContent=n.Appearance.CheckBox.createAppearanceStream(),this.MK=n.Appearance.CheckBox.createMK(),this.AS="/On",this.V="/On"},n.internal.inherit(n.CheckBox,n.Button),window.CheckBox=n.CheckBox,n.TextField=function(){n.Field.call(this),this.DA=n.Appearance.createDefaultAppearanceStream(),this.F=4;var t;Object.defineProperty(this,"V",{get:function(){return t?"("+t+")":t},enumerable:!0,set:function(e){t=e}});var e;Object.defineProperty(this,"DV",{get:function(){return e?"("+e+")":e},enumerable:!0,set:function(t){e=t}});var r=!1;Object.defineProperty(this,"multiline",{enumerable:!1,get:function(){return r},set:function(t){r=t}});var i=!1;Object.defineProperty(this,"MaxLen",{enumerable:!0,get:function(){return i},set:function(t){i=t}}),Object.defineProperty(this,"hasAppearanceStream",{enumerable:!1,get:function(){return this.V||this.DV}})},n.internal.inherit(n.TextField,n.Field),window.TextField=n.TextField,n.PasswordField=function(){TextField.call(this),Object.defineProperty(this,"password",{value:!0,enumerable:!1,configurable:!1,writable:!1})},n.internal.inherit(n.PasswordField,n.TextField),window.PasswordField=n.PasswordField,n.internal.calculateFontSpace=function(t,e,r){var r=r||"helvetica",i=n.internal.calculateFontSpace.canvas||(n.internal.calculateFontSpace.canvas=document.createElement("canvas"));(s=i.getContext("2d")).save();var o=e+" "+r;s.font=o;var a=s.measureText(t);s.fontcolor="black";var s=i.getContext("2d");return a.height=1.5*s.measureText("3").width,s.restore(),a},n.internal.calculateX=function(t,e,r,i){var i=i||12,r=r||"helvetica",o={text:"",fontSize:""},a=(e=")"==(e="("==e.substr(0,1)?e.substr(1):e).substr(e.length-1)?e.substr(0,e.length-1):e).split(" "),s=i,c=n.Appearance.internal.getHeight(t)||0;c=c<0?-c:c;var l=n.Appearance.internal.getWidth(t)||0;l=l<0?-l:l;s++;t:for(;;){var e="";s--;var u=n.internal.calculateFontSpace("3",s+"px",r).height,h=t.multiline?c-s:(c-u)/2,f=-2,d=h+=2,p=0,m=0,g=0;if(0==s){s=12,e="(...) Tj\n",e+="% Width of Text: "+n.internal.calculateFontSpace(e,"1px").width+", FieldWidth:"+l+"\n";break}g=n.internal.calculateFontSpace(a[0]+" ",s+"px",r).width;var w="",y=0;for(var v in a){w=" "==(w+=a[v]+" ").substr(w.length-1)?w.substr(0,w.length-1):w;var b=parseInt(v);g=n.internal.calculateFontSpace(w+" ",s+"px",r).width;var x=function(t,e,i){if(t+1<a.length){var o=e+" "+a[t+1];return n.internal.calculateFontSpace(o,i+"px",r).width<=l-4}return!1}(b,w,s),k=v>=a.length-1;if(!x||k){if(x||k){if(k)m=b;else if(t.multiline&&(u+2)*(y+2)+2>c)continue t}else{if(!t.multiline)continue t;if((u+2)*(y+2)+2>c)continue t;m=b}for(var _="",C=p;C<=m;C++)_+=a[C]+" ";switch(_=" "==_.substr(_.length-1)?_.substr(0,_.length-1):_,g=n.internal.calculateFontSpace(_,s+"px",r).width,t.Q){case 2:f=l-g-2;break;case 1:f=(l-g)/2;break;case 0:default:f=2}e+=f+" "+d+" Td\n",e+="("+_+") Tj\n",e+=-f+" 0 Td\n",d=-(s+2),g=0,p=m+1,y++,w=""}else w+=" "}break}return o.text=e,o.fontSize=s,o},n.internal.calculateAppearanceStream=function(t){if(t.appearanceStreamContent)return t.appearanceStreamContent;if(t.V||t.DV){var e="",r=t.V||t.DV,i=n.internal.calculateX(t,r);e+="/Tx BMC\nq\n/F1 "+i.fontSize+" Tf\n1 0 0 1 0 0 Tm\n",e+="BT\n",e+=i.text,e+="ET\n",e+="Q\nEMC\n";var o=new n.createFormXObject(t);return o.stream=e,o}},n.internal.calculateCoordinates=function(t,e,r,i){var o={};if(this.internal){var a=function(t){return t*this.internal.scaleFactor};Array.isArray(t)?(t[0]=n.scale(t[0]),t[1]=n.scale(t[1]),t[2]=n.scale(t[2]),t[3]=n.scale(t[3]),o.lowerLeft_X=t[0]||0,o.lowerLeft_Y=a.call(this,this.internal.pageSize.height)-t[3]-t[1]||0,o.upperRight_X=t[0]+t[2]||0,o.upperRight_Y=a.call(this,this.internal.pageSize.height)-t[1]||0):(t=n.scale(t),e=n.scale(e),r=n.scale(r),i=n.scale(i),o.lowerLeft_X=t||0,o.lowerLeft_Y=this.internal.pageSize.height-e||0,o.upperRight_X=t+r||0,o.upperRight_Y=this.internal.pageSize.height-e+i||0)}else Array.isArray(t)?(o.lowerLeft_X=t[0]||0,o.lowerLeft_Y=t[1]||0,o.upperRight_X=t[0]+t[2]||0,o.upperRight_Y=t[1]+t[3]||0):(o.lowerLeft_X=t||0,o.lowerLeft_Y=e||0,o.upperRight_X=t+r||0,o.upperRight_Y=e+i||0);return[o.lowerLeft_X,o.lowerLeft_Y,o.upperRight_X,o.upperRight_Y]},n.internal.calculateColor=function(t,e,n){var r=new Array(3);return r.r=0|t,r.g=0|e,r.b=0|n,r},n.internal.getBitPosition=function(t,e){var n=1;return n<<=e-1,(t=t||0)|n},n.internal.setBitPosition=function(t,e,n){t=t||0;var r=1;if(r<<=e-1,1==(n=n||1))t=t|r;else var t=t&~r;return t},e.API.addHTML=function(t,e,n,r,i){if("undefined"==typeof html2canvas&&"undefined"==typeof rasterizeHTML)throw new Error("You need either https://github.com/niklasvh/html2canvas or https://github.com/cburgmer/rasterizeHTML.js");"number"!=typeof e&&(r=e,i=n),"function"==typeof r&&(i=r,r=null);var o=this.internal,a=o.scaleFactor,s=o.pageSize.width,c=o.pageSize.height;if(r=r||{},r.onrendered=function(t){e=parseInt(e)||0,n=parseInt(n)||0;var o=r.dim||{},l=o.h||0,u=o.w||Math.min(s,t.width/a)-e,h="JPEG";if(r.format&&(h=r.format),t.height>c&&r.pagesplit){var f=function(){for(var r=0;;){var o=document.createElement("canvas");o.width=Math.min(s*a,t.width),o.height=Math.min(c*a,t.height-r),o.getContext("2d").drawImage(t,0,r,t.width,o.height,0,0,o.width,o.height);var l=[o,e,r?0:n,o.width/a,o.height/a,h,null,"SLOW"];if(this.addImage.apply(this,l),(r+=o.height)>=t.height)break;this.addPage()}i(u,r,null,l)}.bind(this);if("CANVAS"===t.nodeName){var d=new Image;d.onload=f,d.src=t.toDataURL("image/png"),t=d}else f()}else{var p=Math.random().toString(35),m=[t,e,n,u,l,h,p,"SLOW"];this.addImage.apply(this,m),i(u,l,p,m)}}.bind(this),"undefined"!=typeof html2canvas&&!r.rstz)return html2canvas(t,r);if("undefined"!=typeof rasterizeHTML){var l="drawDocument";return"string"==typeof t&&(l=/^http/.test(t)?"drawURL":"drawHTML"),r.width=r.width||s*a,rasterizeHTML[l](t,void 0,r).then(function(t){r.onrendered(t.image)},function(t){i(null,t)})}return null},/** @preserve
 * jsPDF addImage plugin
 * Copyright (c) 2012 Jason Siefken, https://github.com/siefkenj/
 *               2013 Chris Dowling, https://github.com/gingerchris
 *               2013 Trinh Ho, https://github.com/ineedfat
 *               2013 Edwin Alejandro Perez, https://github.com/eaparango
 *               2013 Norah Smith, https://github.com/burnburnrocket
 *               2014 Diego Casorran, https://github.com/diegocr
 *               2014 James Robb, https://github.com/jamesbrobb
 *
 *
 */
function(e){var n=["jpeg","jpg","png"],r=function t(e){var n=this.internal.newObject(),r=this.internal.write,i=this.internal.putStream;if(e.n=n,r("<</Type /XObject"),r("/Subtype /Image"),r("/Width "+e.w),r("/Height "+e.h),e.cs===this.color_spaces.INDEXED?r("/ColorSpace [/Indexed /DeviceRGB "+(e.pal.length/3-1)+" "+("smask"in e?n+2:n+1)+" 0 R]"):(r("/ColorSpace /"+e.cs),e.cs===this.color_spaces.DEVICE_CMYK&&r("/Decode [1 0 1 0 1 0 1 0]")),r("/BitsPerComponent "+e.bpc),"f"in e&&r("/Filter /"+e.f),"dp"in e&&r("/DecodeParms <<"+e.dp+">>"),"trns"in e&&e.trns.constructor==Array){for(var o="",a=0,s=e.trns.length;a<s;a++)o+=e.trns[a]+" "+e.trns[a]+" ";r("/Mask ["+o+"]")}if("smask"in e&&r("/SMask "+(n+1)+" 0 R"),r("/Length "+e.data.length+">>"),i(e.data),r("endobj"),"smask"in e){var c="/Predictor "+e.p+" /Colors 1 /BitsPerComponent "+e.bpc+" /Columns "+e.w,l={w:e.w,h:e.h,cs:"DeviceGray",bpc:e.bpc,dp:c,data:e.smask};"f"in e&&(l.f=e.f),t.call(this,l)}e.cs===this.color_spaces.INDEXED&&(this.internal.newObject(),r("<< /Length "+e.pal.length+">>"),i(this.arrayBufferToBinaryString(new Uint8Array(e.pal))),r("endobj"))},i=function(){var t=this.internal.collections.addImage_images;for(var e in t)r.call(this,t[e])},o=function(){var t,e=this.internal.collections.addImage_images,n=this.internal.write;for(var r in e)n("/I"+(t=e[r]).i,t.n,"0","R")},a=function(t){return t&&"string"==typeof t&&(t=t.toUpperCase()),t in e.image_compression?t:e.image_compression.NONE},s=function(){var t=this.internal.collections.addImage_images;return t||(this.internal.collections.addImage_images=t={},this.internal.events.subscribe("putResources",i),this.internal.events.subscribe("putXobjectDict",o)),t},c=function(t){var e=0;return t&&(e=Object.keys?Object.keys(t).length:function(t){var e=0;for(var n in t)t.hasOwnProperty(n)&&e++;return e}(t)),e},l=function(t){return void 0===t||null===t},u=function(t){return"string"==typeof t&&e.sHashCode(t)},h=function(t){return-1===n.indexOf(t)},f=function(t){return"function"!=typeof e["process"+t.toUpperCase()]},d=function(e){return"object"===(void 0===e?"undefined":t(e))&&1===e.nodeType},p=function(e,n,r){if("IMG"===e.nodeName&&e.hasAttribute("src")){var i=""+e.getAttribute("src");if(!r&&0===i.indexOf("data:image/"))return i;!n&&/\.png(?:[?#].*)?$/i.test(i)&&(n="png")}if("CANVAS"===e.nodeName)var o=e;else{(o=document.createElement("canvas")).width=e.clientWidth||e.width,o.height=e.clientHeight||e.height;var a=o.getContext("2d");if(!a)throw"addImage requires canvas to be supported by browser.";if(r){var s,c,l,u,h,f,d,p,m=Math.PI/180;"object"===(void 0===r?"undefined":t(r))&&(s=r.x,c=r.y,l=r.bg,r=r.angle),p=r*m,u=Math.abs(Math.cos(p)),h=Math.abs(Math.sin(p)),f=o.width,d=o.height,o.width=d*h+f*u,o.height=d*u+f*h,isNaN(s)&&(s=o.width/2),isNaN(c)&&(c=o.height/2),a.clearRect(0,0,o.width,o.height),a.fillStyle=l||"white",a.fillRect(0,0,o.width,o.height),a.save(),a.translate(s,c),a.rotate(p),a.drawImage(e,-f/2,-d/2),a.rotate(-p),a.translate(-s,-c),a.restore()}else a.drawImage(e,0,0,o.width,o.height)}return o.toDataURL("png"==(""+n).toLowerCase()?"image/png":"image/jpeg")},m=function(t,e){var n;if(e)for(var r in e)if(t===e[r].alias){n=e[r];break}return n},g=function(t,e,n){return t||e||(t=-96,e=-96),t<0&&(t=-1*n.w*72/t/this.internal.scaleFactor),e<0&&(e=-1*n.h*72/e/this.internal.scaleFactor),0===t&&(t=e*n.w/n.h),0===e&&(e=t*n.h/n.w),[t,e]},w=function(t,e,n,r,i,o,a){var s=g.call(this,n,r,i),c=this.internal.getCoordinateString,l=this.internal.getVerticalCoordinateString;n=s[0],r=s[1],a[o]=i,this.internal.write("q",c(n),"0 0",c(r),c(t),l(e+r),"cm /I"+i.i,"Do Q")};e.color_spaces={DEVICE_RGB:"DeviceRGB",DEVICE_GRAY:"DeviceGray",DEVICE_CMYK:"DeviceCMYK",CAL_GREY:"CalGray",CAL_RGB:"CalRGB",LAB:"Lab",ICC_BASED:"ICCBased",INDEXED:"Indexed",PATTERN:"Pattern",SEPARATION:"Separation",DEVICE_N:"DeviceN"},e.decode={DCT_DECODE:"DCTDecode",FLATE_DECODE:"FlateDecode",LZW_DECODE:"LZWDecode",JPX_DECODE:"JPXDecode",JBIG2_DECODE:"JBIG2Decode",ASCII85_DECODE:"ASCII85Decode",ASCII_HEX_DECODE:"ASCIIHexDecode",RUN_LENGTH_DECODE:"RunLengthDecode",CCITT_FAX_DECODE:"CCITTFaxDecode"},e.image_compression={NONE:"NONE",FAST:"FAST",MEDIUM:"MEDIUM",SLOW:"SLOW"},e.sHashCode=function(t){return Array.prototype.reduce&&t.split("").reduce(function(t,e){return(t=(t<<5)-t+e.charCodeAt(0))&t},0)},e.isString=function(t){return"string"==typeof t},e.extractInfoFromBase64DataURI=function(t){return/^data:([\w]+?\/([\w]+?));base64,(.+?)$/g.exec(t)},e.supportsArrayBuffer=function(){return"undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array},e.isArrayBuffer=function(t){return!!this.supportsArrayBuffer()&&t instanceof ArrayBuffer},e.isArrayBufferView=function(t){return!!this.supportsArrayBuffer()&&("undefined"!=typeof Uint32Array&&(t instanceof Int8Array||t instanceof Uint8Array||"undefined"!=typeof Uint8ClampedArray&&t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array))},e.binaryStringToUint8Array=function(t){for(var e=t.length,n=new Uint8Array(e),r=0;r<e;r++)n[r]=t.charCodeAt(r);return n},e.arrayBufferToBinaryString=function(t){if("function"==typeof window.atob)return atob(this.arrayBufferToBase64(t));for(var e=this.isArrayBuffer(t)?t:new Uint8Array(t),n="",r=Math.round(e.byteLength/20480),i=0;i<r;i++)n+=String.fromCharCode.apply(null,e.slice(20480*i,20480*i+20480));return n},e.arrayBufferToBase64=function(t){for(var e,n,r,i,o="",a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=new Uint8Array(t),c=s.byteLength,l=c%3,u=c-l,h=0;h<u;h+=3)e=(258048&(i=s[h]<<16|s[h+1]<<8|s[h+2]))>>12,n=(4032&i)>>6,r=63&i,o+=a[(16515072&i)>>18]+a[e]+a[n]+a[r];return 1==l?(e=(3&(i=s[u]))<<4,o+=a[(252&i)>>2]+a[e]+"=="):2==l&&(e=(1008&(i=s[u]<<8|s[u+1]))>>4,n=(15&i)<<2,o+=a[(64512&i)>>10]+a[e]+a[n]+"="),o},e.createImageInfo=function(t,e,n,r,i,o,a,s,c,l,u,h,f){var d={alias:s,w:e,h:n,cs:r,bpc:i,i:a,data:t};return o&&(d.f=o),c&&(d.dp=c),l&&(d.trns=l),u&&(d.pal=u),h&&(d.smask=h),f&&(d.p=f),d},e.addImage=function(e,r,i,o,g,y,v,b,x){if("string"!=typeof r){var k=y;y=g,g=o,o=i,i=r,r=k}if("object"===(void 0===e?"undefined":t(e))&&!d(e)&&"imageData"in e){var _=e;e=_.imageData,r=_.format||r,i=_.x||i||0,o=_.y||o||0,g=_.w||g,y=_.h||y,v=_.alias||v,b=_.compression||b,x=_.rotation||_.angle||x}if(isNaN(i)||isNaN(o))throw console.error("jsPDF.addImage: Invalid coordinates",arguments),new Error("Invalid coordinates passed to jsPDF.addImage");var C,A=s.call(this);if(!(C=m(e,A))){var S;if(d(e)&&(e=p(e,r,x)),l(v)&&(v=u(e)),!(C=m(v,A))){if(this.isString(e)){var q=this.extractInfoFromBase64DataURI(e);q?(r=q[2],e=atob(q[3])):137===e.charCodeAt(0)&&80===e.charCodeAt(1)&&78===e.charCodeAt(2)&&71===e.charCodeAt(3)&&(r="png")}if(r=(r||"JPEG").toLowerCase(),h(r))throw new Error("addImage currently only supports formats "+n+", not '"+r+"'");if(f(r))throw new Error("please ensure that the plugin for '"+r+"' support is added");if(this.supportsArrayBuffer()&&(e instanceof Uint8Array||(S=e,e=this.binaryStringToUint8Array(e))),!(C=this["process"+r.toUpperCase()](e,c(A),v,a(b),S)))throw new Error("An unkwown error occurred whilst processing the image")}}return w.call(this,i,o,g,y,C,C.i,A),this};var y=function(t){var e,n,r;if(255===!t.charCodeAt(0)||216===!t.charCodeAt(1)||255===!t.charCodeAt(2)||224===!t.charCodeAt(3)||!t.charCodeAt(6)==="J".charCodeAt(0)||!t.charCodeAt(7)==="F".charCodeAt(0)||!t.charCodeAt(8)==="I".charCodeAt(0)||!t.charCodeAt(9)==="F".charCodeAt(0)||0===!t.charCodeAt(10))throw new Error("getJpegSize requires a binary string jpeg file");for(var i=256*t.charCodeAt(4)+t.charCodeAt(5),o=4,a=t.length;o<a;){if(o+=i,255!==t.charCodeAt(o))throw new Error("getJpegSize could not find the size of the image");if(192===t.charCodeAt(o+1)||193===t.charCodeAt(o+1)||194===t.charCodeAt(o+1)||195===t.charCodeAt(o+1)||196===t.charCodeAt(o+1)||197===t.charCodeAt(o+1)||198===t.charCodeAt(o+1)||199===t.charCodeAt(o+1))return n=256*t.charCodeAt(o+5)+t.charCodeAt(o+6),e=256*t.charCodeAt(o+7)+t.charCodeAt(o+8),r=t.charCodeAt(o+9),[e,n,r];o+=2,i=256*t.charCodeAt(o)+t.charCodeAt(o+1)}},v=function(t){if(65496!==(t[0]<<8|t[1]))throw new Error("Supplied data is not a JPEG");for(var e,n,r,i,o=t.length,a=(t[4]<<8)+t[5],s=4;s<o;){if(s+=a,e=b(t,s),a=(e[2]<<8)+e[3],(192===e[1]||194===e[1])&&255===e[0]&&a>7)return e=b(t,s+5),n=(e[2]<<8)+e[3],r=(e[0]<<8)+e[1],i=e[4],{width:n,height:r,numcomponents:i};s+=2}throw new Error("getJpegSizeFromBytes could not find the size of the image")},b=function(t,e){return t.subarray(e,e+5)};e.processJPEG=function(t,e,n,r,i){var o,a=this.color_spaces.DEVICE_RGB,s=this.decode.DCT_DECODE;return this.isString(t)?(o=y(t),this.createImageInfo(t,o[0],o[1],1==o[3]?this.color_spaces.DEVICE_GRAY:a,8,s,e,n)):(this.isArrayBuffer(t)&&(t=new Uint8Array(t)),this.isArrayBufferView(t)?(o=v(t),t=i||this.arrayBufferToBinaryString(t),this.createImageInfo(t,o.width,o.height,1==o.numcomponents?this.color_spaces.DEVICE_GRAY:a,8,s,e,n)):null)},e.processJPG=function(){return this.processJPEG.apply(this,arguments)}}(e.API),/**
 * jsPDF Annotations PlugIn
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){var n={annotations:[],f2:function(t){return t.toFixed(2)},notEmpty:function(t){if(void 0!==t&&""!=t)return!0}};e.API.annotationPlugin=n,e.API.events.push(["addPage",function(t){this.annotationPlugin.annotations[t.pageNumber]=[]}]),t.events.push(["putPage",function(t){for(var e=this.annotationPlugin.annotations[t.pageNumber],r=!1,i=0;i<e.length&&!r;i++)switch((l=e[i]).type){case"link":if(n.notEmpty(l.options.url)||n.notEmpty(l.options.pageNumber)){r=!0;break}case"reference":case"text":case"freetext":r=!0}if(0!=r){this.internal.write("/Annots [");for(var o=this.annotationPlugin.f2,a=this.internal.scaleFactor,s=this.internal.pageSize.height,c=this.internal.getPageInfo(t.pageNumber),i=0;i<e.length;i++){var l=e[i];switch(l.type){case"reference":this.internal.write(" "+l.object.objId+" 0 R ");break;case"text":var u=this.internal.newAdditionalObject(),h=this.internal.newAdditionalObject(),f=l.title||"Note";w="<</Type /Annot /Subtype /Text "+(p="/Rect ["+o(l.bounds.x*a)+" "+o(s-(l.bounds.y+l.bounds.h)*a)+" "+o((l.bounds.x+l.bounds.w)*a)+" "+o((s-l.bounds.y)*a)+"] ")+"/Contents ("+l.contents+")",w+=" /Popup "+h.objId+" 0 R",w+=" /P "+c.objId+" 0 R",w+=" /T ("+f+") >>",u.content=w;var d=u.objId+" 0 R";w="<</Type /Annot /Subtype /Popup "+(p="/Rect ["+o((l.bounds.x+30)*a)+" "+o(s-(l.bounds.y+l.bounds.h)*a)+" "+o((l.bounds.x+l.bounds.w+30)*a)+" "+o((s-l.bounds.y)*a)+"] ")+" /Parent "+d,l.open&&(w+=" /Open true"),w+=" >>",h.content=w,this.internal.write(u.objId,"0 R",h.objId,"0 R");break;case"freetext":var p="/Rect ["+o(l.bounds.x*a)+" "+o((s-l.bounds.y)*a)+" "+o(l.bounds.x+l.bounds.w*a)+" "+o(s-(l.bounds.y+l.bounds.h)*a)+"] ",m=l.color||"#000000";w="<</Type /Annot /Subtype /FreeText "+p+"/Contents ("+l.contents+")",w+=" /DS(font: Helvetica,sans-serif 12.0pt; text-align:left; color:#"+m+")",w+=" /Border [0 0 0]",w+=" >>",this.internal.write(w);break;case"link":if(l.options.name){var g=this.annotations._nameMap[l.options.name];l.options.pageNumber=g.page,l.options.top=g.y}else l.options.top||(l.options.top=0);var p="/Rect ["+o(l.x*a)+" "+o((s-l.y)*a)+" "+o((l.x+l.w)*a)+" "+o((s-(l.y+l.h))*a)+"] ",w="";if(l.options.url)w="<</Type /Annot /Subtype /Link "+p+"/Border [0 0 0] /A <</S /URI /URI ("+l.options.url+") >>";else if(l.options.pageNumber)switch(w="<</Type /Annot /Subtype /Link "+p+"/Border [0 0 0] /Dest ["+(t=this.internal.getPageInfo(l.options.pageNumber)).objId+" 0 R",l.options.magFactor=l.options.magFactor||"XYZ",l.options.magFactor){case"Fit":w+=" /Fit]";break;case"FitH":w+=" /FitH "+l.options.top+"]";break;case"FitV":l.options.left=l.options.left||0,w+=" /FitV "+l.options.left+"]";break;case"XYZ":default:var y=o((s-l.options.top)*a);l.options.left=l.options.left||0,void 0===l.options.zoom&&(l.options.zoom=0),w+=" /XYZ "+l.options.left+" "+y+" "+l.options.zoom+"]"}""!=w&&(w+=" >>",this.internal.write(w))}}this.internal.write("]")}}]),t.createAnnotation=function(t){switch(t.type){case"link":this.link(t.bounds.x,t.bounds.y,t.bounds.w,t.bounds.h,t);break;case"text":case"freetext":this.annotationPlugin.annotations[this.internal.getCurrentPageInfo().pageNumber].push(t)}},t.link=function(t,e,n,r,i){this.annotationPlugin.annotations[this.internal.getCurrentPageInfo().pageNumber].push({x:t,y:e,w:n,h:r,options:i,type:"link"})},t.textWithLink=function(t,e,n,r){var i=this.getTextWidth(t),o=this.internal.getLineHeight()/this.internal.scaleFactor;return this.text(t,e,n),n+=.2*o,this.link(e,n-o,i,o,r),i},t.getTextWidth=function(t){var e=this.internal.getFontSize();return this.getStringUnitWidth(t)*e/this.internal.scaleFactor},t.getLineHeight=function(){return this.internal.getLineHeight()}}(e.API),e.API.autoPrint=function(){var t;return this.internal.events.subscribe("postPutResources",function(){t=this.internal.newObject(),this.internal.write("<< /S/Named /Type/Action /N/Print >>","endobj")}),this.internal.events.subscribe("putCatalog",function(){this.internal.write("/OpenAction "+t+" 0 R")}),this},/**
 * jsPDF Canvas PlugIn
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){t.events.push(["initialized",function(){this.canvas.pdf=this}]),t.canvas={getContext:function(t){return this.pdf.context2d._canvas=this,this.pdf.context2d},style:{}},Object.defineProperty(t.canvas,"width",{get:function(){return this._width},set:function(t){this._width=t,this.getContext("2d").pageWrapX=t+1}}),Object.defineProperty(t.canvas,"height",{get:function(){return this._height},set:function(t){this._height=t,this.getContext("2d").pageWrapY=t+1}})}(e.API),/** ====================================================================
 * jsPDF Cell plugin
 * Copyright (c) 2013 Youssef Beddad, youssef.beddad@gmail.com
 *               2013 Eduardo Menezes de Morais, eduardo.morais@usp.br
 *               2013 Lee Driscoll, https://github.com/lsdriscoll
 *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
 *               2014 James Hall, james@parall.ax
 *               2014 Diego Casorran, https://github.com/diegocr
 *
 *
 * ====================================================================
 */
function(t){var e,n,r,i,o={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0},a=1,s=function(t,e,n,r,i){o={x:t,y:e,w:n,h:r,ln:i}},c=function(){return o},l={left:0,top:0,bottom:0};t.setHeaderFunction=function(t){i=t},t.getTextDimensions=function(t){e=this.internal.getFont().fontName,n=this.table_font_size||this.internal.getFontSize(),r=this.internal.getFont().fontStyle;var i,o;(o=document.createElement("font")).id="jsPDFCell";try{o.style.fontStyle=r}catch(t){o.style.fontWeight=r}o.style.fontName=e,o.style.fontSize=n+"pt";try{o.textContent=t}catch(e){o.innerText=t}return document.body.appendChild(o),i={w:(o.offsetWidth+1)*(19.049976/25.4),h:(o.offsetHeight+1)*(19.049976/25.4)},document.body.removeChild(o),i},t.cellAddPage=function(){var t=this.margins||l;this.addPage(),s(t.left,t.top,void 0,void 0),a+=1},t.cellInitialize=function(){o={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0},a=1},t.cell=function(t,e,n,r,i,o,a){var u=c(),h=!1;if(void 0!==u.ln)if(u.ln===o)t=u.x+u.w,e=u.y;else{var f=this.margins||l;u.y+u.h+r+13>=this.internal.pageSize.height-f.bottom&&(this.cellAddPage(),h=!0,this.printHeaders&&this.tableHeaderRow&&this.printHeaderRow(o,!0)),e=c().y+c().h,h&&(e=23)}if(void 0!==i[0])if(this.printingHeaderRow?this.rect(t,e,n,r,"FD"):this.rect(t,e,n,r),"right"===a){i instanceof Array||(i=[i]);for(var d=0;d<i.length;d++){var p=i[d],m=this.getStringUnitWidth(p)*this.internal.getFontSize();this.text(p,t+n-m-3,e+this.internal.getLineHeight()*(d+1))}}else this.text(i,t+3,e+this.internal.getLineHeight());return s(t,e,n,r,o),this},t.arrayMax=function(t,e){var n,r,i,o=t[0];for(n=0,r=t.length;n<r;n+=1)i=t[n],e?-1===e(o,i)&&(o=i):i>o&&(o=i);return o},t.table=function(e,n,r,i,s){if(!r)throw"No data for PDF table";var c,u,h,f,d,p,m,g,w,y,v=[],b=[],x={},k={},_=[],C=[],A=!1,S=!0,q=12,T=l;if(T.width=this.internal.pageSize.width,s&&(!0===s.autoSize&&(A=!0),!1===s.printHeaders&&(S=!1),s.fontSize&&(q=s.fontSize),s.css&&void 0!==s.css["font-size"]&&(q=16*s.css["font-size"]),s.margins&&(T=s.margins)),this.lnMod=0,o={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0},a=1,this.printHeaders=S,this.margins=T,this.setFontSize(q),this.table_font_size=q,void 0===i||null===i)v=Object.keys(r[0]);else if(i[0]&&"string"!=typeof i[0]){for(u=0,h=i.length;u<h;u+=1)c=i[u],v.push(c.name),b.push(c.prompt),k[c.name]=c.width*(19.049976/25.4)}else v=i;if(A)for(y=function(t){return t[c]},u=0,h=v.length;u<h;u+=1){for(x[c=v[u]]=r.map(y),_.push(this.getTextDimensions(b[u]||c).w),m=0,f=(p=x[c]).length;m<f;m+=1)d=p[m],_.push(this.getTextDimensions(d).w);k[c]=t.arrayMax(_),_=[]}if(S){P=this.calculateLineHeight(v,k,b.length?b:v);for(u=0,h=v.length;u<h;u+=1)c=v[u],C.push([e,n,k[c],P,String(b.length?b[u]:c)]);this.setTableHeaderRow(C),this.printHeaderRow(1,!1)}for(u=0,h=r.length;u<h;u+=1){var P;for(g=r[u],P=this.calculateLineHeight(v,k,g),m=0,w=v.length;m<w;m+=1)c=v[m],this.cell(e,n,k[c],P,g[c],u+2,c.align)}return this.lastCellPos=o,this.table_x=e,this.table_y=n,this},t.calculateLineHeight=function(t,e,n){for(var r,i=0,o=0;o<t.length;o++){n[r=t[o]]=this.splitTextToSize(String(n[r]),e[r]-3);var a=this.internal.getLineHeight()*n[r].length+3;a>i&&(i=a)}return i},t.setTableHeaderRow=function(t){this.tableHeaderRow=t},t.printHeaderRow=function(t,e){if(!this.tableHeaderRow)throw"Property tableHeaderRow does not exist.";var n,r,o,c;if(this.printingHeaderRow=!0,void 0!==i){var l=i(this,a);s(l[0],l[1],l[2],l[3],-1)}this.setFontStyle("bold");var u=[];for(o=0,c=this.tableHeaderRow.length;o<c;o+=1)this.setFillColor(200,200,200),n=this.tableHeaderRow[o],e&&(this.margins.top=13,n[1]=this.margins&&this.margins.top||0,u.push(n)),r=[].concat(n),this.cell.apply(this,r.concat(t));u.length>0&&this.setTableHeaderRow(u),this.setFontStyle("normal"),this.printingHeaderRow=!1}}(e.API),/**
 * jsPDF Context2D PlugIn Copyright (c) 2014 Steven Spungin (TwelveTone LLC) steven@twelvetone.tv
 *
 * Licensed under the MIT License. http://opensource.org/licenses/mit-license
 */
function(t){function e(){this._isStrokeTransparent=!1,this._strokeOpacity=1,this.strokeStyle="#000000",this.fillStyle="#000000",this._isFillTransparent=!1,this._fillOpacity=1,this.font="12pt times",this.textBaseline="alphabetic",this.textAlign="start",this.lineWidth=1,this.lineJoin="miter",this.lineCap="butt",this._transform=[1,0,0,1,0,0],this.globalCompositeOperation="normal",this.globalAlpha=1,this._clip_path=[],this.ignoreClearRect=!1,this.copy=function(t){this._isStrokeTransparent=t._isStrokeTransparent,this._strokeOpacity=t._strokeOpacity,this.strokeStyle=t.strokeStyle,this._isFillTransparent=t._isFillTransparent,this._fillOpacity=t._fillOpacity,this.fillStyle=t.fillStyle,this.font=t.font,this.lineWidth=t.lineWidth,this.lineJoin=t.lineJoin,this.lineCap=t.lineCap,this.textBaseline=t.textBaseline,this.textAlign=t.textAlign,this._fontSize=t._fontSize,this._transform=t._transform.slice(0),this.globalCompositeOperation=t.globalCompositeOperation,this.globalAlpha=t.globalAlpha,this._clip_path=t._clip_path.slice(0),this.ignoreClearRect=t.ignoreClearRect}}t.events.push(["initialized",function(){this.context2d.pdf=this,this.context2d.internal.pdf=this,this.context2d.ctx=new e,this.context2d.ctxStack=[],this.context2d.path=[]}]),t.context2d={pageWrapXEnabled:!1,pageWrapYEnabled:!1,pageWrapX:9999999,pageWrapY:9999999,ctx:new e,f2:function(t){return t.toFixed(2)},fillRect:function(t,e,n,r){if(!this._isFillTransparent()){t=this._wrapX(t),e=this._wrapY(e);var i=this._matrix_map_rect(this.ctx._transform,{x:t,y:e,w:n,h:r});this.pdf.rect(i.x,i.y,i.w,i.h,"f")}},strokeRect:function(t,e,n,r){if(!this._isStrokeTransparent()){t=this._wrapX(t),e=this._wrapY(e);var i=this._matrix_map_rect(this.ctx._transform,{x:t,y:e,w:n,h:r});this.pdf.rect(i.x,i.y,i.w,i.h,"s")}},clearRect:function(t,e,n,r){if(!this.ctx.ignoreClearRect){t=this._wrapX(t),e=this._wrapY(e);var i=this._matrix_map_rect(this.ctx._transform,{x:t,y:e,w:n,h:r});this.save(),this.setFillStyle("#ffffff"),this.pdf.rect(i.x,i.y,i.w,i.h,"f"),this.restore()}},save:function(){this.ctx._fontSize=this.pdf.internal.getFontSize();var t=new e;t.copy(this.ctx),this.ctxStack.push(this.ctx),this.ctx=t},restore:function(){this.ctx=this.ctxStack.pop(),this.setFillStyle(this.ctx.fillStyle),this.setStrokeStyle(this.ctx.strokeStyle),this.setFont(this.ctx.font),this.pdf.setFontSize(this.ctx._fontSize),this.setLineCap(this.ctx.lineCap),this.setLineWidth(this.ctx.lineWidth),this.setLineJoin(this.ctx.lineJoin)},rect:function(t,e,n,r){this.moveTo(t,e),this.lineTo(t+n,e),this.lineTo(t+n,e+r),this.lineTo(t,e+r),this.lineTo(t,e),this.closePath()},beginPath:function(){this.path=[]},closePath:function(){this.path.push({type:"close"})},_getRGBA:function(t){var e,n,r,o;if(!t)return{r:0,g:0,b:0,a:0,style:t};if(this.internal.rxTransparent.test(t))e=0,n=0,r=0,o=0;else{var a=this.internal.rxRgb.exec(t);null!=a?(e=parseInt(a[1]),n=parseInt(a[2]),r=parseInt(a[3]),o=1):null!=(a=this.internal.rxRgba.exec(t))?(e=parseInt(a[1]),n=parseInt(a[2]),r=parseInt(a[3]),o=parseFloat(a[4])):(o=1,"#"!=t.charAt(0)&&((t=i.colorNameToHex(t))||(t="#000000")),4===t.length?(e=t.substring(1,2),e+=e,n=t.substring(2,3),n+=n,r=t.substring(3,4),r+=r):(e=t.substring(1,3),n=t.substring(3,5),r=t.substring(5,7)),e=parseInt(e,16),n=parseInt(n,16),r=parseInt(r,16))}return{r:e,g:n,b:r,a:o,style:t}},setFillStyle:function(t){var e=this._getRGBA(t);this.ctx.fillStyle=t,this.ctx._isFillTransparent=0===e.a,this.ctx._fillOpacity=e.a,this.pdf.setFillColor(e.r,e.g,e.b,{a:e.a}),this.pdf.setTextColor(e.r,e.g,e.b,{a:e.a})},setStrokeStyle:function(t){var e=this._getRGBA(t);this.ctx.strokeStyle=e.style,this.ctx._isStrokeTransparent=0===e.a,this.ctx._strokeOpacity=e.a,0===e.a?this.pdf.setDrawColor(255,255,255):(e.a,this.pdf.setDrawColor(e.r,e.g,e.b))},fillText:function(t,e,n,r){if(!this._isFillTransparent()){e=this._wrapX(e),n=this._wrapY(n);var i=this._matrix_map_point(this.ctx._transform,[e,n]);e=i[0],n=i[1];var o=57.2958*this._matrix_rotation(this.ctx._transform);if(this.ctx._clip_path.length>0){var a;(a=window.outIntercept?"group"===window.outIntercept.type?window.outIntercept.stream:window.outIntercept:this.internal.getCurrentPage()).push("q");var s=this.path;this.path=this.ctx._clip_path,this.ctx._clip_path=[],this._fill(null,!0),this.ctx._clip_path=this.path,this.path=s}var c=1;try{c=this._matrix_decompose(this._getTransform()).scale[0]}catch(t){console.warn(t)}if(c<.01)this.pdf.text(t,e,this._getBaseline(n),null,o);else{var l=this.pdf.internal.getFontSize();this.pdf.setFontSize(l*c),this.pdf.text(t,e,this._getBaseline(n),null,o),this.pdf.setFontSize(l)}this.ctx._clip_path.length>0&&a.push("Q")}},strokeText:function(t,e,n,r){if(!this._isStrokeTransparent()){e=this._wrapX(e),n=this._wrapY(n);var i=this._matrix_map_point(this.ctx._transform,[e,n]);e=i[0],n=i[1];var o=57.2958*this._matrix_rotation(this.ctx._transform);if(this.ctx._clip_path.length>0){var a;(a=window.outIntercept?"group"===window.outIntercept.type?window.outIntercept.stream:window.outIntercept:this.internal.getCurrentPage()).push("q");var s=this.path;this.path=this.ctx._clip_path,this.ctx._clip_path=[],this._fill(null,!0),this.ctx._clip_path=this.path,this.path=s}var c=1;try{c=this._matrix_decompose(this._getTransform()).scale[0]}catch(t){console.warn(t)}if(1===c)this.pdf.text(t,e,this._getBaseline(n),{stroke:!0},o);else{var l=this.pdf.internal.getFontSize();this.pdf.setFontSize(l*c),this.pdf.text(t,e,this._getBaseline(n),{stroke:!0},o),this.pdf.setFontSize(l)}this.ctx._clip_path.length>0&&a.push("Q")}},setFont:function(t){this.ctx.font=t;var e=/\s*(\w+)\s+(\w+)\s+(\w+)\s+([\d\.]+)(px|pt|em)\s+(.*)?/;if(null!=(u=e.exec(t))){var n=u[1],r=u[3],i=u[4],o=u[5],a=u[6];i="px"===o?Math.floor(parseFloat(i)):"em"===o?Math.floor(parseFloat(i)*this.pdf.getFontSize()):Math.floor(parseFloat(i)),this.pdf.setFontSize(i),"bold"===r||"700"===r?this.pdf.setFontStyle("bold"):"italic"===n?this.pdf.setFontStyle("italic"):this.pdf.setFontStyle("normal");var s,c=(f=a).toLowerCase().split(/\s*,\s*/);s=-1!=c.indexOf("arial")?"Arial":-1!=c.indexOf("verdana")?"Verdana":-1!=c.indexOf("helvetica")?"Helvetica":-1!=c.indexOf("sans-serif")?"sans-serif":-1!=c.indexOf("fixed")?"Fixed":-1!=c.indexOf("monospace")?"Monospace":-1!=c.indexOf("terminal")?"Terminal":-1!=c.indexOf("courier")?"Courier":-1!=c.indexOf("times")?"Times":-1!=c.indexOf("cursive")?"Cursive":-1!=c.indexOf("fantasy")?"Fantasy":(c.indexOf("serif"),"Serif");var l;l="bold"===r?"bold":"normal",this.pdf.setFont(s,l)}else{var u=(e=/\s*(\d+)(pt|px|em)\s+([\w "]+)\s*([\w "]+)?/).exec(t);if(null!=u){var h=u[1],f=u[3];(l=u[4])||(l="normal"),h="em"===o?Math.floor(parseFloat(i)*this.pdf.getFontSize()):Math.floor(parseFloat(h)),this.pdf.setFontSize(h),this.pdf.setFont(f,l)}}},setTextBaseline:function(t){this.ctx.textBaseline=t},getTextBaseline:function(){return this.ctx.textBaseline},setTextAlign:function(t){this.ctx.textAlign=t},getTextAlign:function(){return this.ctx.textAlign},setLineWidth:function(t){this.ctx.lineWidth=t,this.pdf.setLineWidth(t)},setLineCap:function(t){this.ctx.lineCap=t,this.pdf.setLineCap(t)},setLineJoin:function(t){this.ctx.lineJoin=t,this.pdf.setLineJoin(t)},moveTo:function(t,e){t=this._wrapX(t),e=this._wrapY(e);var n=this._matrix_map_point(this.ctx._transform,[t,e]),r={type:"mt",x:t=n[0],y:e=n[1]};this.path.push(r)},_wrapX:function(t){return this.pageWrapXEnabled?t%this.pageWrapX:t},_wrapY:function(t){return this.pageWrapYEnabled?(this._gotoPage(this._page(t)),(t-this.lastBreak)%this.pageWrapY):t},transform:function(t,e,n,r,i,o){this.ctx._transform=[t,e,n,r,i,o]},setTransform:function(t,e,n,r,i,o){this.ctx._transform=[t,e,n,r,i,o]},_getTransform:function(){return this.ctx._transform},lastBreak:0,pageBreaks:[],_page:function(t){if(this.pageWrapYEnabled){this.lastBreak=0;for(var e=0,n=0,r=0;r<this.pageBreaks.length;r++)if(t>=this.pageBreaks[r]){e++,0===this.lastBreak&&n++;var i=this.pageBreaks[r]-this.lastBreak;this.lastBreak=this.pageBreaks[r],n+=o=Math.floor(i/this.pageWrapY)}if(0===this.lastBreak){var o=Math.floor(t/this.pageWrapY)+1;n+=o}return n+e}return this.pdf.internal.getCurrentPageInfo().pageNumber},_gotoPage:function(t){},lineTo:function(t,e){t=this._wrapX(t),e=this._wrapY(e);var n=this._matrix_map_point(this.ctx._transform,[t,e]),r={type:"lt",x:t=n[0],y:e=n[1]};this.path.push(r)},bezierCurveTo:function(t,e,n,r,i,o){t=this._wrapX(t),e=this._wrapY(e),n=this._wrapX(n),r=this._wrapY(r),i=this._wrapX(i),o=this._wrapY(o);var a;i=(a=this._matrix_map_point(this.ctx._transform,[i,o]))[0],o=a[1];var s={type:"bct",x1:t=(a=this._matrix_map_point(this.ctx._transform,[t,e]))[0],y1:e=a[1],x2:n=(a=this._matrix_map_point(this.ctx._transform,[n,r]))[0],y2:r=a[1],x:i,y:o};this.path.push(s)},quadraticCurveTo:function(t,e,n,r){t=this._wrapX(t),e=this._wrapY(e),n=this._wrapX(n),r=this._wrapY(r);var i;n=(i=this._matrix_map_point(this.ctx._transform,[n,r]))[0],r=i[1];var o={type:"qct",x1:t=(i=this._matrix_map_point(this.ctx._transform,[t,e]))[0],y1:e=i[1],x:n,y:r};this.path.push(o)},arc:function(t,e,n,r,i,o){if(t=this._wrapX(t),e=this._wrapY(e),!this._matrix_is_identity(this.ctx._transform)){var a=this._matrix_map_point(this.ctx._transform,[t,e]);t=a[0],e=a[1];var s=this._matrix_map_point(this.ctx._transform,[0,0]),c=this._matrix_map_point(this.ctx._transform,[0,n]);n=Math.sqrt(Math.pow(c[0]-s[0],2)+Math.pow(c[1]-s[1],2))}var l={type:"arc",x:t,y:e,radius:n,startAngle:r,endAngle:i,anticlockwise:o};this.path.push(l)},drawImage:function(t,e,n,r,i,o,a,s,c){void 0!==o&&(e=o,n=a,r=s,i=c),e=this._wrapX(e),n=this._wrapY(n);var l,u=this._matrix_map_rect(this.ctx._transform,{x:e,y:n,w:r,h:i}),h=(this._matrix_map_rect(this.ctx._transform,{x:o,y:a,w:s,h:c}),/data:image\/(\w+).*/i.exec(t));l=null!=h?h[1]:"png",this.pdf.addImage(t,l,u.x,u.y,u.w,u.h)},_matrix_multiply:function(t,e){var n=e[0],r=e[1],i=e[2],o=e[3],a=e[4],s=e[5],c=n*t[0]+r*t[2],l=i*t[0]+o*t[2],u=a*t[0]+s*t[2]+t[4];return r=n*t[1]+r*t[3],o=i*t[1]+o*t[3],s=a*t[1]+s*t[3]+t[5],n=c,i=l,a=u,[n,r,i,o,a,s]},_matrix_rotation:function(t){return Math.atan2(t[2],t[0])},_matrix_decompose:function(t){var e=t[0],n=t[1],r=t[2],i=t[3],o=Math.sqrt(e*e+n*n),a=(e/=o)*r+(n/=o)*i;r-=e*a,i-=n*a;var s=Math.sqrt(r*r+i*i);return r/=s,i/=s,a/=s,e*i<n*r&&(e=-e,n=-n,a=-a,o=-o),{scale:[o,0,0,s,0,0],translate:[1,0,0,1,t[4],t[5]],rotate:[e,n,-n,e,0,0],skew:[1,0,a,1,0,0]}},_matrix_map_point:function(t,e){var n=t[0],r=t[1],i=t[2],o=t[3],a=t[4],s=t[5],c=e[0],l=e[1];return[c*n+l*i+a,c*r+l*o+s]},_matrix_map_point_obj:function(t,e){var n=this._matrix_map_point(t,[e.x,e.y]);return{x:n[0],y:n[1]}},_matrix_map_rect:function(t,e){var n=this._matrix_map_point(t,[e.x,e.y]),r=this._matrix_map_point(t,[e.x+e.w,e.y+e.h]);return{x:n[0],y:n[1],w:r[0]-n[0],h:r[1]-n[1]}},_matrix_is_identity:function(t){return 1==t[0]&&(0==t[1]&&(0==t[2]&&(1==t[3]&&(0==t[4]&&0==t[5]))))},rotate:function(t){var e=[Math.cos(t),Math.sin(t),-Math.sin(t),Math.cos(t),0,0];this.ctx._transform=this._matrix_multiply(this.ctx._transform,e)},scale:function(t,e){var n=[t,0,0,e,0,0];this.ctx._transform=this._matrix_multiply(this.ctx._transform,n)},translate:function(t,e){var n=[1,0,0,1,t,e];this.ctx._transform=this._matrix_multiply(this.ctx._transform,n)},stroke:function(){if(this.ctx._clip_path.length>0){var t;(t=window.outIntercept?"group"===window.outIntercept.type?window.outIntercept.stream:window.outIntercept:this.internal.getCurrentPage()).push("q");var e=this.path;this.path=this.ctx._clip_path,this.ctx._clip_path=[],this._stroke(!0),this.ctx._clip_path=this.path,this.path=e,this._stroke(!1),t.push("Q")}else this._stroke(!1)},_stroke:function(t){if(t||!this._isStrokeTransparent()){for(var e=[],n=this.path,r=0;r<n.length;r++){var i=n[r];switch(i.type){case"mt":e.push({start:i,deltas:[],abs:[]});break;case"lt":h=[i.x-n[r-1].x,i.y-n[r-1].y];e[e.length-1].deltas.push(h),e[e.length-1].abs.push(i);break;case"bct":h=[i.x1-n[r-1].x,i.y1-n[r-1].y,i.x2-n[r-1].x,i.y2-n[r-1].y,i.x-n[r-1].x,i.y-n[r-1].y];e[e.length-1].deltas.push(h);break;case"qct":var o=n[r-1].x+2/3*(i.x1-n[r-1].x),a=n[r-1].y+2/3*(i.y1-n[r-1].y),s=i.x+2/3*(i.x1-i.x),c=i.y+2/3*(i.y1-i.y),l=i.x,u=i.y,h=[o-n[r-1].x,a-n[r-1].y,s-n[r-1].x,c-n[r-1].y,l-n[r-1].x,u-n[r-1].y];e[e.length-1].deltas.push(h);break;case"arc":0==e.length&&e.push({start:{x:0,y:0},deltas:[],abs:[]}),e[e.length-1].arc=!0,e[e.length-1].abs.push(i)}}for(r=0;r<e.length;r++){var f;if(f=r==e.length-1?"s":null,e[r].arc)for(var d=e[r].abs,p=0;p<d.length;p++){var m=d[p],g=360*m.startAngle/(2*Math.PI),w=360*m.endAngle/(2*Math.PI),y=m.x,v=m.y;this.internal.arc2(this,y,v,m.radius,g,w,m.anticlockwise,f,t)}else{var y=e[r].start.x,v=e[r].start.y;t?(this.pdf.lines(e[r].deltas,y,v,null,null),this.pdf.clip_fixed()):this.pdf.lines(e[r].deltas,y,v,null,f)}}}},_isFillTransparent:function(){return this.ctx._isFillTransparent||0==this.globalAlpha},_isStrokeTransparent:function(){return this.ctx._isStrokeTransparent||0==this.globalAlpha},fill:function(t){if(this.ctx._clip_path.length>0){var e;(e=window.outIntercept?"group"===window.outIntercept.type?window.outIntercept.stream:window.outIntercept:this.internal.getCurrentPage()).push("q");var n=this.path;this.path=this.ctx._clip_path,this.ctx._clip_path=[],this._fill(t,!0),this.ctx._clip_path=this.path,this.path=n,this._fill(t,!1),e.push("Q")}else this._fill(t,!1)},_fill:function(t,e){if(!this._isFillTransparent()){var r,i="function"==typeof this.pdf.internal.newObject2;r=window.outIntercept?"group"===window.outIntercept.type?window.outIntercept.stream:window.outIntercept:this.internal.getCurrentPage();var o=[],a=window.outIntercept;if(i)switch(this.ctx.globalCompositeOperation){case"normal":case"source-over":break;case"destination-in":case"destination-out":var s=this.pdf.internal.newStreamObject(),c=this.pdf.internal.newObject2();c.push("<</Type /ExtGState"),c.push("/SMask <</S /Alpha /G "+s.objId+" 0 R>>"),c.push(">>");d="MASK"+c.objId;this.pdf.internal.addGraphicsState(d,c.objId);var l="/"+d+" gs";r.splice(0,0,"q"),r.splice(1,0,l),r.push("Q"),window.outIntercept=s;break;default:var u="/"+this.pdf.internal.blendModeMap[this.ctx.globalCompositeOperation.toUpperCase()];u&&this.pdf.internal.out(u+" gs")}var h=this.ctx.globalAlpha;if(this.ctx._fillOpacity<1&&(h=this.ctx._fillOpacity),i){var f=this.pdf.internal.newObject2();f.push("<</Type /ExtGState"),f.push("/CA "+h),f.push("/ca "+h),f.push(">>");var d="GS_O_"+f.objId;this.pdf.internal.addGraphicsState(d,f.objId),this.pdf.internal.out("/"+d+" gs")}for(var p=this.path,m=0;m<p.length;m++){var g=p[m];switch(g.type){case"mt":o.push({start:g,deltas:[],abs:[]});break;case"lt":_=[g.x-p[m-1].x,g.y-p[m-1].y];o[o.length-1].deltas.push(_),o[o.length-1].abs.push(g);break;case"bct":_=[g.x1-p[m-1].x,g.y1-p[m-1].y,g.x2-p[m-1].x,g.y2-p[m-1].y,g.x-p[m-1].x,g.y-p[m-1].y];o[o.length-1].deltas.push(_);break;case"qct":var w=p[m-1].x+2/3*(g.x1-p[m-1].x),y=p[m-1].y+2/3*(g.y1-p[m-1].y),v=g.x+2/3*(g.x1-g.x),b=g.y+2/3*(g.y1-g.y),x=g.x,k=g.y,_=[w-p[m-1].x,y-p[m-1].y,v-p[m-1].x,b-p[m-1].y,x-p[m-1].x,k-p[m-1].y];o[o.length-1].deltas.push(_);break;case"arc":0===o.length&&o.push({deltas:[],abs:[]}),o[o.length-1].arc=!0,o[o.length-1].abs.push(g);break;case"close":o.push({close:!0})}}for(m=0;m<o.length;m++){var C;if(m==o.length-1?(C="f","evenodd"===t&&(C+="*")):C=null,o[m].close)this.pdf.internal.out("h"),this.pdf.internal.out("f");else if(o[m].arc){o[m].start&&this.internal.move2(this,o[m].start.x,o[m].start.y);for(var A=o[m].abs,S=0;S<A.length;S++){var q=A[S];if(void 0!==q.startAngle){var T=360*q.startAngle/(2*Math.PI),P=360*q.endAngle/(2*Math.PI),I=q.x,E=q.y;if(0===S&&this.internal.move2(this,I,E),this.internal.arc2(this,I,E,q.radius,T,P,q.anticlockwise,null,e),S===A.length-1&&o[m].start){var I=o[m].start.x,E=o[m].start.y;this.internal.line2(n,I,E)}}else this.internal.line2(n,q.x,q.y)}}else{var I=o[m].start.x,E=o[m].start.y;e?(this.pdf.lines(o[m].deltas,I,E,null,null),this.pdf.clip_fixed()):this.pdf.lines(o[m].deltas,I,E,null,C)}}window.outIntercept=a}},pushMask:function(){if("function"==typeof this.pdf.internal.newObject2){var t=this.pdf.internal.newStreamObject(),e=this.pdf.internal.newObject2();e.push("<</Type /ExtGState"),e.push("/SMask <</S /Alpha /G "+t.objId+" 0 R>>"),e.push(">>");var n="MASK"+e.objId;this.pdf.internal.addGraphicsState(n,e.objId);var r="/"+n+" gs";this.pdf.internal.out(r)}else console.log("jsPDF v2 not enabled")},clip:function(){if(this.ctx._clip_path.length>0)for(var t=0;t<this.path.length;t++)this.ctx._clip_path.push(this.path[t]);else this.ctx._clip_path=this.path;this.path=[]},measureText:function(t){var e=this.pdf;return{getWidth:function(){var n=e.internal.getFontSize(),r=e.getStringUnitWidth(t)*n/e.internal.scaleFactor;return r*=1.3333},get width(){return this.getWidth(t)}}},_getBaseline:function(t){var e=parseInt(this.pdf.internal.getFontSize()),n=.25*e;switch(this.ctx.textBaseline){case"bottom":return t-n;case"top":return t+e;case"hanging":return t+e-n;case"middle":return t+e/2-n;case"ideographic":return t;case"alphabetic":default:return t}}};var n=t.context2d;Object.defineProperty(n,"fillStyle",{set:function(t){this.setFillStyle(t)},get:function(){return this.ctx.fillStyle}}),Object.defineProperty(n,"strokeStyle",{set:function(t){this.setStrokeStyle(t)},get:function(){return this.ctx.strokeStyle}}),Object.defineProperty(n,"lineWidth",{set:function(t){this.setLineWidth(t)},get:function(){return this.ctx.lineWidth}}),Object.defineProperty(n,"lineCap",{set:function(t){this.setLineCap(t)},get:function(){return this.ctx.lineCap}}),Object.defineProperty(n,"lineJoin",{set:function(t){this.setLineJoin(t)},get:function(){return this.ctx.lineJoin}}),Object.defineProperty(n,"miterLimit",{set:function(t){this.ctx.miterLimit=t},get:function(){return this.ctx.miterLimit}}),Object.defineProperty(n,"textBaseline",{set:function(t){this.setTextBaseline(t)},get:function(){return this.getTextBaseline()}}),Object.defineProperty(n,"textAlign",{set:function(t){this.setTextAlign(t)},get:function(){return this.getTextAlign()}}),Object.defineProperty(n,"font",{set:function(t){this.setFont(t)},get:function(){return this.ctx.font}}),Object.defineProperty(n,"globalCompositeOperation",{set:function(t){this.ctx.globalCompositeOperation=t},get:function(){return this.ctx.globalCompositeOperation}}),Object.defineProperty(n,"globalAlpha",{set:function(t){this.ctx.globalAlpha=t},get:function(){return this.ctx.globalAlpha}}),Object.defineProperty(n,"ignoreClearRect",{set:function(t){this.ctx.ignoreClearRect=t},get:function(){return this.ctx.ignoreClearRect}}),n.internal={},n.internal.rxRgb=/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/,n.internal.rxRgba=/rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)/,n.internal.rxTransparent=/transparent|rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*0+\s*\)/,n.internal.arc=function(t,e,n,r,i,o,a,s){for(var c=this.pdf.internal.scaleFactor,l=this.pdf.internal.pageSize.height,u=this.pdf.internal.f2,h=i*(Math.PI/180),f=o*(Math.PI/180),d=this.createArc(r,h,f,a),p=0;p<d.length;p++){var m=d[p];0===p?this.pdf.internal.out([u((m.x1+e)*c),u((l-(m.y1+n))*c),"m",u((m.x2+e)*c),u((l-(m.y2+n))*c),u((m.x3+e)*c),u((l-(m.y3+n))*c),u((m.x4+e)*c),u((l-(m.y4+n))*c),"c"].join(" ")):this.pdf.internal.out([u((m.x2+e)*c),u((l-(m.y2+n))*c),u((m.x3+e)*c),u((l-(m.y3+n))*c),u((m.x4+e)*c),u((l-(m.y4+n))*c),"c"].join(" ")),t._lastPoint={x:e,y:n}}null!==s&&this.pdf.internal.out(this.pdf.internal.getStyle(s))},n.internal.arc2=function(t,e,n,r,i,o,a,s,c){var l=e,u=n;c?(this.arc(t,l,u,r,i,o,a,null),this.pdf.clip_fixed()):this.arc(t,l,u,r,i,o,a,s)},n.internal.move2=function(t,e,n){var r=this.pdf.internal.scaleFactor,i=this.pdf.internal.pageSize.height,o=this.pdf.internal.f2;this.pdf.internal.out([o(e*r),o((i-n)*r),"m"].join(" ")),t._lastPoint={x:e,y:n}},n.internal.line2=function(t,e,n){var r=this.pdf.internal.scaleFactor,i=this.pdf.internal.pageSize.height,o=this.pdf.internal.f2,a={x:e,y:n};this.pdf.internal.out([o(a.x*r),o((i-a.y)*r),"l"].join(" ")),t._lastPoint=a},n.internal.createArc=function(t,e,n,r){var i=2*Math.PI,o=Math.PI/2,a=e;for((a<i||a>i)&&(a%=i),a<0&&(a=i+a);e>n;)e-=i;var s=Math.abs(n-e);s<i&&r&&(s=i-s);for(var c=[],l=r?-1:1,u=a;s>1e-5;){var h=u+l*Math.min(s,o);c.push(this.createSmallArc(t,u,h)),s-=Math.abs(h-u),u=h}return c},n.internal.getCurrentPage=function(){return this.pdf.internal.pages[this.pdf.internal.getCurrentPageInfo().pageNumber]},n.internal.createSmallArc=function(t,e,n){var r=(n-e)/2,i=t*Math.cos(r),o=t*Math.sin(r),a=i,s=-o,c=a*a+s*s,l=c+a*i+s*o,u=4/3*(Math.sqrt(2*c*l)-l)/(a*o-s*i),h=a-u*s,f=s+u*a,d=h,p=-f,m=r+e,g=Math.cos(m),w=Math.sin(m);return{x1:t*Math.cos(e),y1:t*Math.sin(e),x2:h*g-f*w,y2:h*w+f*g,x3:d*g-p*w,y3:d*w+p*g,x4:t*Math.cos(n),y4:t*Math.sin(n)}}}(e.API),/** @preserve
 * jsPDF fromHTML plugin. BETA stage. API subject to change. Needs browser
 * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
 *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
 *               2014 Diego Casorran, https://github.com/diegocr
 *               2014 Daniel Husar, https://github.com/danielhusar
 *               2014 Wolfgang Gassler, https://github.com/woolfg
 *               2014 Steven Spungin, https://github.com/flamenco
 *
 *
 * ====================================================================
 */
function(e){var n,r,o,a,s,c,l,u,h,f,d,p,m,g,w,y,v,b,x,k;n=function(){function t(){}return function(e){return t.prototype=e,new t}}(),f=function(t){var e,n,r,i,o,a,s;for(n=0,r=t.length,e=void 0,i=!1,a=!1;!i&&n!==r;)(e=t[n]=t[n].trimLeft())&&(i=!0),n++;for(n=r-1;r&&!a&&-1!==n;)(e=t[n]=t[n].trimRight())&&(a=!0),n--;for(o=/\s+$/g,s=!0,n=0;n!==r;)"\u2028"!=t[n]&&(e=t[n].replace(/\s+/g," "),s&&(e=e.trimLeft()),e&&(s=o.test(e)),t[n]=e),n++;return t},p=function(t){var e,n,r;for(e=void 0,n=(r=t.split(",")).shift();!e&&n;)e=o[n.trim().toLowerCase()],n=r.shift();return e},m=function(t){(t="auto"===t?"0px":t).indexOf("em")>-1&&!isNaN(Number(t.replace("em","")))&&(t=18.719*Number(t.replace("em",""))+"px"),t.indexOf("pt")>-1&&!isNaN(Number(t.replace("pt","")))&&(t=1.333*Number(t.replace("pt",""))+"px");var e;return void 0,16,(e=g[t])?e:void 0!==(e={"xx-small":9,"x-small":11,small:13,medium:16,large:19,"x-large":23,"xx-large":28,auto:0}[{css_line_height_string:t}])?g[t]=e/16:(e=parseFloat(t))?g[t]=e/16:3===(e=t.match(/([\d\.]+)(px)/)).length?g[t]=parseFloat(e[1])/16:g[t]=1},h=function(t){var e,n,r;return r=function(e){var n;return n=function(t){return document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(t,null):t.currentStyle?t.currentStyle:t.style}(t),function(t){return t=t.replace(/-\D/g,function(t){return t.charAt(1).toUpperCase()}),n[t]}}(),e={},n=void 0,e["font-family"]=p(r("font-family"))||"times",e["font-style"]=a[r("font-style")]||"normal",e["text-align"]=s[r("text-align")]||"left","bold"===(n=c[r("font-weight")]||"normal")&&("normal"===e["font-style"]?e["font-style"]=n:e["font-style"]=n+e["font-style"]),e["font-size"]=m(r("font-size"))||1,e["line-height"]=m(r("line-height"))||1,e.display="inline"===r("display")?"inline":"block",n="block"===e.display,e["margin-top"]=n&&m(r("margin-top"))||0,e["margin-bottom"]=n&&m(r("margin-bottom"))||0,e["padding-top"]=n&&m(r("padding-top"))||0,e["padding-bottom"]=n&&m(r("padding-bottom"))||0,e["margin-left"]=n&&m(r("margin-left"))||0,e["margin-right"]=n&&m(r("margin-right"))||0,e["padding-left"]=n&&m(r("padding-left"))||0,e["padding-right"]=n&&m(r("padding-right"))||0,e["page-break-before"]=r("page-break-before")||"auto",e.float=l[r("cssFloat")]||"none",e.clear=u[r("clear")]||"none",e.color=r("color"),e},w=function(t,e,n){var r,i,o,a,s;if(o=!1,i=void 0,a=void 0,r=n["#"+t.id])if("function"==typeof r)o=r(t,e);else for(i=0,a=r.length;!o&&i!==a;)o=r[i](t,e),i++;if(r=n[t.nodeName],!o&&r)if("function"==typeof r)o=r(t,e);else for(i=0,a=r.length;!o&&i!==a;)o=r[i](t,e),i++;for(s=t.className?t.className.split(" "):[],i=0;i<s.length;i++)if(r=n["."+s[i]],!o&&r)if("function"==typeof r)o=r(t,e);else for(i=0,a=r.length;!o&&i!==a;)o=r[i](t,e),i++;return o},k=function(t,e){var n,r,i,o,a,s,c,l,u;for(n=[],r=[],i=0,u=t.rows[0].cells.length,c=t.clientWidth;i<u;)l=t.rows[0].cells[i],r[i]={name:l.textContent.toLowerCase().replace(/\s+/g,""),prompt:l.textContent.replace(/\r?\n/g,""),width:l.clientWidth/c*e.pdf.internal.pageSize.width},i++;for(i=1;i<t.rows.length;){for(s=t.rows[i],a={},o=0;o<s.cells.length;)a[r[o].name]=s.cells[o].textContent.replace(/\r?\n/g,""),o++;n.push(a),i++}return{rows:n,headers:r}};var _={SCRIPT:1,STYLE:1,NOSCRIPT:1,OBJECT:1,EMBED:1,SELECT:1},C=1;r=function(e,i,o){var a,s,c,l,u,f,d,p;for(s=e.childNodes,a=void 0,(u="block"===(c=h(e)).display)&&(i.setBlockBoundary(),i.setBlockStyle(c)),l=0,f=s.length;l<f;){if("object"===(void 0===(a=s[l])?"undefined":t(a))){if(i.executeWatchFunctions(a),1===a.nodeType&&"HEADER"===a.nodeName){var m=a,g=i.pdf.margins_doc.top;i.pdf.internal.events.subscribe("addPage",function(t){i.y=g,r(m,i,o),i.pdf.margins_doc.top=i.y+10,i.y+=10},!1)}if(8===a.nodeType&&"#comment"===a.nodeName)~a.textContent.indexOf("ADD_PAGE")&&(i.pdf.addPage(),i.y=i.pdf.margins_doc.top);else if(1!==a.nodeType||_[a.nodeName])if(3===a.nodeType){var v=a.nodeValue;if(a.nodeValue&&"LI"===a.parentNode.nodeName)if("OL"===a.parentNode.parentNode.nodeName)v=C+++". "+v;else{var b=c["font-size"],x=(3-.75*b)*i.pdf.internal.scaleFactor,A=.75*b*i.pdf.internal.scaleFactor,S=1.74*b/i.pdf.internal.scaleFactor;p=function(t,e){this.pdf.circle(t+x,e+A,S,"FD")}}16&a.ownerDocument.body.compareDocumentPosition(a)&&i.addText(v,c)}else"string"==typeof a&&i.addText(a,c);else{var q;if("IMG"===a.nodeName){var T=a.getAttribute("src");q=y[i.pdf.sHashCode(T)||T]}if(q){i.pdf.internal.pageSize.height-i.pdf.margins_doc.bottom<i.y+a.height&&i.y>i.pdf.margins_doc.top&&(i.pdf.addPage(),i.y=i.pdf.margins_doc.top,i.executeWatchFunctions(a));var P=h(a),I=i.x,E=12/i.pdf.internal.scaleFactor,O=(P["margin-left"]+P["padding-left"])*E,F=(P["margin-right"]+P["padding-right"])*E,B=(P["margin-top"]+P["padding-top"])*E,R=(P["margin-bottom"]+P["padding-bottom"])*E;void 0!==P.float&&"right"===P.float?I+=i.settings.width-a.width-F:I+=O,i.pdf.addImage(q,I,i.y+B,a.width,a.height),q=void 0,"right"===P.float||"left"===P.float?(i.watchFunctions.push(function(t,e,n,r){return i.y>=e?(i.x+=t,i.settings.width+=n,!0):!!(r&&1===r.nodeType&&!_[r.nodeName]&&i.x+r.width>i.pdf.margins_doc.left+i.pdf.margins_doc.width)&&(i.x+=t,i.y=e,i.settings.width+=n,!0)}.bind(this,"left"===P.float?-a.width-O-F:0,i.y+a.height+B+R,a.width)),i.watchFunctions.push(function(t,e,n){return!(i.y<t&&e===i.pdf.internal.getNumberOfPages())||1===n.nodeType&&"both"===h(n).clear&&(i.y=t,!0)}.bind(this,i.y+a.height,i.pdf.internal.getNumberOfPages())),i.settings.width-=a.width+O+F,"left"===P.float&&(i.x+=a.width+O+F)):i.y+=a.height+B+R}else if("TABLE"===a.nodeName)d=k(a,i),i.y+=10,i.pdf.table(i.x,i.y,d.rows,d.headers,{autoSize:!1,printHeaders:o.printHeaders,margins:i.pdf.margins_doc,css:h(a)}),i.y=i.pdf.lastCellPos.y+i.pdf.lastCellPos.h+20;else if("OL"===a.nodeName||"UL"===a.nodeName)C=1,w(a,i,o)||r(a,i,o),i.y+=10;else if("LI"===a.nodeName){var D=i.x;i.x+=20/i.pdf.internal.scaleFactor,i.y+=3,w(a,i,o)||r(a,i,o),i.x=D}else"BR"===a.nodeName?(i.y+=c["font-size"]*i.pdf.internal.scaleFactor,i.addText("\u2028",n(c))):w(a,i,o)||r(a,i,o)}}l++}if(o.outY=i.y,u)return i.setBlockBoundary(p)},y={},v=function(t,e,n,r){function i(){e.pdf.internal.events.publish("imagesLoaded"),r(o)}for(var o,a=t.getElementsByTagName("img"),s=a.length,c=0;s--;)!function(t,n,r){if(t){var a=new Image;o=++c,a.crossOrigin="",a.onerror=a.onload=function(){if(a.complete&&(0===a.src.indexOf("data:image/")&&(a.width=n||a.width||0,a.height=r||a.height||0),a.width+a.height)){var o=e.pdf.sHashCode(t)||t;y[o]=y[o]||a}--c||i()},a.src=t}}(a[s].getAttribute("src"),a[s].width,a[s].height);return c||i()},b=function(t,e,n){var i=t.getElementsByTagName("footer");if(i.length>0){i=i[0];var o=e.pdf.internal.write,a=e.y;e.pdf.internal.write=function(){},r(i,e,n);var s=Math.ceil(e.y-a)+5;e.y=a,e.pdf.internal.write=o,e.pdf.margins_doc.bottom+=s;for(var c=function(t){var o=void 0!==t?t.pageNumber:1,a=e.y;e.y=e.pdf.internal.pageSize.height-e.pdf.margins_doc.bottom,e.pdf.margins_doc.bottom-=s;for(var c=i.getElementsByTagName("span"),l=0;l<c.length;++l)(" "+c[l].className+" ").replace(/[\n\t]/g," ").indexOf(" pageCounter ")>-1&&(c[l].innerHTML=o),(" "+c[l].className+" ").replace(/[\n\t]/g," ").indexOf(" totalPages ")>-1&&(c[l].innerHTML="###jsPDFVarTotalPages###");r(i,e,n),e.pdf.margins_doc.bottom+=s,e.y=a},l=i.getElementsByTagName("span"),u=0;u<l.length;++u)(" "+l[u].className+" ").replace(/[\n\t]/g," ").indexOf(" totalPages ")>-1&&e.pdf.internal.events.subscribe("htmlRenderingFinished",e.pdf.putTotalPages.bind(e.pdf,"###jsPDFVarTotalPages###"),!0);e.pdf.internal.events.subscribe("addPage",c,!1),c(),_.FOOTER=1}},x=function(t,e,n,i,o,a){if(!e)return!1;"string"==typeof e||e.parentNode||(e=""+e.innerHTML),"string"==typeof e&&(e=function(t){var e,n,r,i;return r="jsPDFhtmlText"+Date.now().toString()+(1e3*Math.random()).toFixed(0),i="position: absolute !important;clip: rect(1px 1px 1px 1px); /* IE6, IE7 */clip: rect(1px, 1px, 1px, 1px);padding:0 !important;border:0 !important;height: 1px !important;width: 1px !important; top:auto;left:-100px;overflow: hidden;",n=document.createElement("div"),n.style.cssText=i,n.innerHTML='<iframe style="height:1px;width:1px" name="'+r+'" />',document.body.appendChild(n),(e=window.frames[r]).document.open(),e.document.writeln(t),e.document.close(),e.document.body}(e.replace(/<\/?script[^>]*?>/gi,"")));var s,c=new d(t,n,i,o);return v.call(this,e,c,o.elementHandlers,function(t){b(e,c,o.elementHandlers),r(e,c,o.elementHandlers),c.pdf.internal.events.publish("htmlRenderingFinished"),s=c.dispose(),"function"==typeof a?a(s):t&&console.error("jsPDF Warning: rendering issues? provide a callback to fromHTML!")}),s||{x:c.x,y:c.y}},(d=function(t,e,n,r){return this.pdf=t,this.x=e,this.y=n,this.settings=r,this.watchFunctions=[],this.init(),this}).prototype.init=function(){return this.paragraph={text:[],style:[]},this.pdf.internal.write("q")},d.prototype.dispose=function(){return this.pdf.internal.write("Q"),{x:this.x,y:this.y,ready:!0}},d.prototype.executeWatchFunctions=function(t){var e=!1,n=[];if(this.watchFunctions.length>0){for(var r=0;r<this.watchFunctions.length;++r)!0===this.watchFunctions[r](t)?e=!0:n.push(this.watchFunctions[r]);this.watchFunctions=n}return e},d.prototype.splitFragmentsIntoLines=function(t,e){var r,i,o,a,s,c,l,u,h,f,d,p,m,g;for(12,f=this.pdf.internal.scaleFactor,a={},i=void 0,h=void 0,o=void 0,s=void 0,g=void 0,u=void 0,l=void 0,c=void 0,p=[d=[]],r=0,m=this.settings.width;t.length;)if(s=t.shift(),g=e.shift(),s)if(i=g["font-family"],h=g["font-style"],(o=a[i+h])||(o=this.pdf.internal.getFont(i,h).metadata.Unicode,a[i+h]=o),u={widths:o.widths,kerning:o.kerning,fontSize:12*g["font-size"],textIndent:r},l=this.pdf.getStringUnitWidth(s,u)*u.fontSize/f,"\u2028"==s)d=[],p.push(d);else if(r+l>m){for(c=this.pdf.splitTextToSize(s,m,u),d.push([c.shift(),g]);c.length;)d=[[c.shift(),g]],p.push(d);r=this.pdf.getStringUnitWidth(d[0][0],u)*u.fontSize/f}else d.push([s,g]),r+=l;if(void 0!==g["text-align"]&&("center"===g["text-align"]||"right"===g["text-align"]||"justify"===g["text-align"]))for(var w=0;w<p.length;++w){var y=this.pdf.getStringUnitWidth(p[w][0][0],u)*u.fontSize/f;w>0&&(p[w][0][1]=n(p[w][0][1]));var v=m-y;if("right"===g["text-align"])p[w][0][1]["margin-left"]=v;else if("center"===g["text-align"])p[w][0][1]["margin-left"]=v/2;else if("justify"===g["text-align"]){var b=p[w][0][0].split(" ").length-1;p[w][0][1]["word-spacing"]=v/b,w===p.length-1&&(p[w][0][1]["word-spacing"]=0)}}return p},d.prototype.RenderTextFragment=function(t,e){var n,r;r=0,this.pdf.internal.pageSize.height-this.pdf.margins_doc.bottom<this.y+this.pdf.internal.getFontSize()&&(this.pdf.internal.write("ET","Q"),this.pdf.addPage(),this.y=this.pdf.margins_doc.top,this.pdf.internal.write("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),e.color,"Td"),r=Math.max(r,e["line-height"],e["font-size"]),this.pdf.internal.write(0,(-12*r).toFixed(2),"Td")),n=this.pdf.internal.getFont(e["font-family"],e["font-style"]);var i=this.getPdfColor(e.color);i!==this.lastTextColor&&(this.pdf.internal.write(i),this.lastTextColor=i),void 0!==e["word-spacing"]&&e["word-spacing"]>0&&this.pdf.internal.write(e["word-spacing"].toFixed(2),"Tw"),this.pdf.internal.write("/"+n.id,(12*e["font-size"]).toFixed(2),"Tf","("+this.pdf.internal.pdfEscape(t)+") Tj"),void 0!==e["word-spacing"]&&this.pdf.internal.write(0,"Tw")},d.prototype.getPdfColor=function(t){var e,n,r,o=/rgb\s*\(\s*(\d+),\s*(\d+),\s*(\d+\s*)\)/.exec(t);if(null!=o?(e=parseInt(o[1]),n=parseInt(o[2]),r=parseInt(o[3])):("#"!=t.charAt(0)&&((t=i.colorNameToHex(t))||(t="#000000")),e=t.substring(1,3),e=parseInt(e,16),n=t.substring(3,5),n=parseInt(n,16),r=t.substring(5,7),r=parseInt(r,16)),"string"==typeof e&&/^#[0-9A-Fa-f]{6}$/.test(e)){var a=parseInt(e.substr(1),16);e=a>>16&255,n=a>>8&255,r=255&a}var s=this.f3;return 0===e&&0===n&&0===r||void 0===n?s(e/255)+" g":[s(e/255),s(n/255),s(r/255),"rg"].join(" ")},d.prototype.f3=function(t){return t.toFixed(3)},d.prototype.renderParagraph=function(t){var e,n,r,i,o,a,s,c,l,u,h,d,p;if(r=f(this.paragraph.text),d=this.paragraph.style,e=this.paragraph.blockstyle,this.paragraph={text:[],style:[],blockstyle:{},priorblockstyle:e},r.join("").trim()){s=this.splitFragmentsIntoLines(r,d),a=void 0,c=void 0,12,n=12/this.pdf.internal.scaleFactor,this.priorMarginBottom=this.priorMarginBottom||0,h=(Math.max((e["margin-top"]||0)-this.priorMarginBottom,0)+(e["padding-top"]||0))*n,u=((e["margin-bottom"]||0)+(e["padding-bottom"]||0))*n,this.priorMarginBottom=e["margin-bottom"]||0,"always"===e["page-break-before"]&&(this.pdf.addPage(),this.y=0,h=((e["margin-top"]||0)+(e["padding-top"]||0))*n),l=this.pdf.internal.write,i=void 0,o=void 0,this.y+=h,l("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td");for(var m=0;s.length;){for(c=0,i=0,o=(a=s.shift()).length;i!==o;)a[i][0].trim()&&(c=Math.max(c,a[i][1]["line-height"],a[i][1]["font-size"]),p=7*a[i][1]["font-size"]),i++;var g=0,w=0;for(void 0!==a[0][1]["margin-left"]&&a[0][1]["margin-left"]>0&&(g=(w=this.pdf.internal.getCoordinateString(a[0][1]["margin-left"]))-m,m=w),l(g+Math.max(e["margin-left"]||0,0)*n,(-12*c).toFixed(2),"Td"),i=0,o=a.length;i!==o;)a[i][0]&&this.RenderTextFragment(a[i][0],a[i][1]),i++;if(this.y+=c*n,this.executeWatchFunctions(a[0][1])&&s.length>0){var y=[],v=[];s.forEach(function(t){for(var e=0,n=t.length;e!==n;)t[e][0]&&(y.push(t[e][0]+" "),v.push(t[e][1])),++e}),s=this.splitFragmentsIntoLines(f(y),v),l("ET","Q"),l("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td")}}return t&&"function"==typeof t&&t.call(this,this.x-9,this.y-p/2),l("ET","Q"),this.y+=u}},d.prototype.setBlockBoundary=function(t){return this.renderParagraph(t)},d.prototype.setBlockStyle=function(t){return this.paragraph.blockstyle=t},d.prototype.addText=function(t,e){return this.paragraph.text.push(t),this.paragraph.style.push(e)},o={helvetica:"helvetica","sans-serif":"helvetica","times new roman":"times",serif:"times",times:"times",monospace:"courier",courier:"courier"},c={100:"normal",200:"normal",300:"normal",400:"normal",500:"bold",600:"bold",700:"bold",800:"bold",900:"bold",normal:"normal",bold:"bold",bolder:"bold",lighter:"normal"},a={normal:"normal",italic:"italic",oblique:"italic"},s={left:"left",right:"right",center:"center",justify:"justify"},l={none:"none",right:"right",left:"left"},u={none:"none",both:"both"},g={normal:1},e.fromHTML=function(t,e,n,r,i,o){return this.margins_doc=o||{top:0,bottom:0},r||(r={}),r.elementHandlers||(r.elementHandlers={}),x(this,t,isNaN(e)?4:e,isNaN(n)?4:n,r,i)}}(e.API),/** ====================================================================
 * jsPDF JavaScript plugin
 * Copyright (c) 2013 Youssef Beddad, youssef.beddad@gmail.com
 *
 *
 * ====================================================================
 */
function(t){var n,r,i;e.API.addJS=function(t){return i=t,this.internal.events.subscribe("postPutResources",function(t){n=this.internal.newObject(),this.internal.write("<< /Names [(EmbeddedJS) "+(n+1)+" 0 R] >>","endobj"),r=this.internal.newObject(),this.internal.write("<< /S /JavaScript /JS (",i,") >>","endobj")}),this.internal.events.subscribe("putCatalog",function(){void 0!==n&&void 0!==r&&this.internal.write("/Names <</JavaScript "+n+" 0 R>>")}),this}}(),/**
 * jsPDF Outline PlugIn
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){t.events.push(["postPutResources",function(){var t=this,e=/^(\d+) 0 obj$/;if(this.outline.root.children.length>0)for(var n=t.outline.render().split(/\r\n/),r=0;r<n.length;r++){var i=n[r],o=e.exec(i);if(null!=o){var a=o[1];t.internal.newObjectDeferredBegin(a)}t.internal.write(i)}if(this.outline.createNamedDestinations){for(var s=this.internal.pages.length,c=[],r=0;r<s;r++){var l=t.internal.newObject();c.push(l);var u=t.internal.getPageInfo(r+1);t.internal.write("<< /D["+u.objId+" 0 R /XYZ null null null]>> endobj")}var h=t.internal.newObject();t.internal.write("<< /Names [ ");for(r=0;r<c.length;r++)t.internal.write("(page_"+(r+1)+")"+c[r]+" 0 R");t.internal.write(" ] >>","endobj");t.internal.newObject();t.internal.write("<< /Dests "+h+" 0 R"),t.internal.write(">>","endobj")}}]),t.events.push(["putCatalog",function(){var t=this;t.outline.root.children.length>0&&(t.internal.write("/Outlines",this.outline.makeRef(this.outline.root)),this.outline.createNamedDestinations&&t.internal.write("/Names "+namesOid+" 0 R"))}]),t.events.push(["initialized",function(){var t=this;t.outline={createNamedDestinations:!1,root:{children:[]}},t.outline.add=function(t,e,n){var r={title:e,options:n,children:[]};return null==t&&(t=this.root),t.children.push(r),r},t.outline.render=function(){return this.ctx={},this.ctx.val="",this.ctx.pdf=t,this.genIds_r(this.root),this.renderRoot(this.root),this.renderItems(this.root),this.ctx.val},t.outline.genIds_r=function(e){e.id=t.internal.newObjectDeferred();for(var n=0;n<e.children.length;n++)this.genIds_r(e.children[n])},t.outline.renderRoot=function(t){this.objStart(t),this.line("/Type /Outlines"),t.children.length>0&&(this.line("/First "+this.makeRef(t.children[0])),this.line("/Last "+this.makeRef(t.children[t.children.length-1]))),this.line("/Count "+this.count_r({count:0},t)),this.objEnd()},t.outline.renderItems=function(e){for(i=0;i<e.children.length;i++){o=e.children[i];this.objStart(o),this.line("/Title "+this.makeString(o.title)),this.line("/Parent "+this.makeRef(e)),i>0&&this.line("/Prev "+this.makeRef(e.children[i-1])),i<e.children.length-1&&this.line("/Next "+this.makeRef(e.children[i+1])),o.children.length>0&&(this.line("/First "+this.makeRef(o.children[0])),this.line("/Last "+this.makeRef(o.children[o.children.length-1])));var n=this.count=this.count_r({count:0},o);if(n>0&&this.line("/Count "+n),o.options&&o.options.pageNumber){var r=t.internal.getPageInfo(o.options.pageNumber);this.line("/Dest ["+r.objId+" 0 R /XYZ 0 "+this.ctx.pdf.internal.pageSize.height+" 0]")}this.objEnd()}for(var i=0;i<e.children.length;i++){var o=e.children[i];this.renderItems(o)}},t.outline.line=function(t){this.ctx.val+=t+"\r\n"},t.outline.makeRef=function(t){return t.id+" 0 R"},t.outline.makeString=function(e){return"("+t.internal.pdfEscape(e)+")"},t.outline.objStart=function(t){this.ctx.val+="\r\n"+t.id+" 0 obj\r\n<<\r\n"},t.outline.objEnd=function(t){this.ctx.val+=">> \r\nendobj\r\n"},t.outline.count_r=function(t,e){for(var n=0;n<e.children.length;n++)t.count++,this.count_r(t,e.children[n]);return t.count}}])}(e.API),/**@preserve
 *  ====================================================================
 * jsPDF PNG PlugIn
 * Copyright (c) 2014 James Robb, https://github.com/jamesbrobb
 *
 *
 * ====================================================================
 */
function(t){var e=function(){return"function"!=typeof PNG||"function"!=typeof s},n=function(e){return e!==t.image_compression.NONE&&r()},r=function(){var t="function"==typeof o;if(!t)throw new Error("requires deflate.js for compression");return t},i=function(e,n,r,i){var s=5,u=f;switch(i){case t.image_compression.FAST:s=3,u=h;break;case t.image_compression.MEDIUM:s=6,u=d;break;case t.image_compression.SLOW:s=9,u=p}e=l(e,n,r,u);var m=new Uint8Array(a(s)),g=c(e),w=new o(s),y=w.append(e),v=w.flush(),b=m.length+y.length+v.length,x=new Uint8Array(b+4);return x.set(m),x.set(y,m.length),x.set(v,m.length+y.length),x[b++]=g>>>24&255,x[b++]=g>>>16&255,x[b++]=g>>>8&255,x[b++]=255&g,t.arrayBufferToBinaryString(x)},a=function(t,e){var n=Math.LOG2E*Math.log(32768)-8<<4|8,r=n<<8;return r|=Math.min(3,(e-1&255)>>1)<<6,r|=0,r+=31-r%31,[n,255&r]},c=function(t,e){for(var n,r=1,i=0,o=t.length,a=0;o>0;){o-=n=o>e?e:o;do{i+=r+=t[a++]}while(--n);r%=65521,i%=65521}return(i<<16|r)>>>0},l=function(t,e,n,r){for(var i,o,a,s=t.length/e,c=new Uint8Array(t.length+s),l=g(),u=0;u<s;u++){if(a=u*e,i=t.subarray(a,a+e),r)c.set(r(i,n,o),a+u);else{for(var h=0,f=l.length,d=[];h<f;h++)d[h]=l[h](i,n,o);var p=w(d.concat());c.set(d[p],a+u)}o=i}return c},u=function(t,e,n){var r=Array.apply([],t);return r.unshift(0),r},h=function(t,e,n){var r,i=[],o=0,a=t.length;for(i[0]=1;o<a;o++)r=t[o-e]||0,i[o+1]=t[o]-r+256&255;return i},f=function(t,e,n){var r,i=[],o=0,a=t.length;for(i[0]=2;o<a;o++)r=n&&n[o]||0,i[o+1]=t[o]-r+256&255;return i},d=function(t,e,n){var r,i,o=[],a=0,s=t.length;for(o[0]=3;a<s;a++)r=t[a-e]||0,i=n&&n[a]||0,o[a+1]=t[a]+256-(r+i>>>1)&255;return o},p=function(t,e,n){var r,i,o,a,s=[],c=0,l=t.length;for(s[0]=4;c<l;c++)r=t[c-e]||0,i=n&&n[c]||0,o=n&&n[c-e]||0,a=m(r,i,o),s[c+1]=t[c]-a+256&255;return s},m=function(t,e,n){var r=t+e-n,i=Math.abs(r-t),o=Math.abs(r-e),a=Math.abs(r-n);return i<=o&&i<=a?t:o<=a?e:n},g=function(){return[u,h,f,d,p]},w=function(t){for(var e,n,r,i=0,o=t.length;i<o;)((e=y(t[i].slice(1)))<n||!n)&&(n=e,r=i),i++;return r},y=function(t){for(var e=0,n=t.length,r=0;e<n;)r+=Math.abs(t[e++]);return r},v=function(e){var n;switch(e){case t.image_compression.FAST:n=11;break;case t.image_compression.MEDIUM:n=13;break;case t.image_compression.SLOW:n=14;break;default:n=12}return n};t.processPNG=function(t,r,o,a,s){var c,l,u,h,f,d,p=this.color_spaces.DEVICE_RGB,m=this.decode.FLATE_DECODE,g=8;if(this.isArrayBuffer(t)&&(t=new Uint8Array(t)),this.isArrayBufferView(t)){if(e())throw new Error("PNG support requires png.js and zlib.js");if(c=new PNG(t),t=c.imgData,g=c.bits,p=c.colorSpace,h=c.colors,-1!==[4,6].indexOf(c.colorType)){if(8===c.bits)for(var w,y=(I=32==c.pixelBitlength?new Uint32Array(c.decodePixels().buffer):16==c.pixelBitlength?new Uint16Array(c.decodePixels().buffer):new Uint8Array(c.decodePixels().buffer)).length,b=new Uint8Array(y*c.colors),x=new Uint8Array(y),k=c.pixelBitlength-c.bits,_=0,C=0;_<y;_++){for(A=I[_],w=0;w<k;)b[C++]=A>>>w&255,w+=c.bits;x[_]=A>>>w&255}if(16===c.bits){for(var A,y=(I=new Uint32Array(c.decodePixels().buffer)).length,b=new Uint8Array(y*(32/c.pixelBitlength)*c.colors),x=new Uint8Array(y*(32/c.pixelBitlength)),S=c.colors>1,_=0,C=0,q=0;_<y;)A=I[_++],b[C++]=A>>>0&255,S&&(b[C++]=A>>>16&255,A=I[_++],b[C++]=A>>>0&255),x[q++]=A>>>16&255;g=8}n(a)?(t=i(b,c.width*c.colors,c.colors,a),d=i(x,c.width,1,a)):(t=b,d=x,m=null)}if(3===c.colorType&&(p=this.color_spaces.INDEXED,f=c.palette,c.transparency.indexed)){for(var T=c.transparency.indexed,P=0,_=0,y=T.length;_<y;++_)P+=T[_];if((P/=255)===y-1&&-1!==T.indexOf(0))u=[T.indexOf(0)];else if(P!==y){for(var I=c.decodePixels(),x=new Uint8Array(I.length),_=0,y=I.length;_<y;_++)x[_]=T[I[_]];d=i(x,c.width,1)}}var E=v(a);return l=m===this.decode.FLATE_DECODE?"/Predictor "+E+" /Colors "+h+" /BitsPerComponent "+g+" /Columns "+c.width:"/Colors "+h+" /BitsPerComponent "+g+" /Columns "+c.width,(this.isArrayBuffer(t)||this.isArrayBufferView(t))&&(t=this.arrayBufferToBinaryString(t)),(d&&this.isArrayBuffer(d)||this.isArrayBufferView(d))&&(d=this.arrayBufferToBinaryString(d)),this.createImageInfo(t,c.width,c.height,p,g,m,r,o,l,u,f,d,E)}throw new Error("Unsupported PNG image data, try using JPEG instead.")}}(e.API),e.API.autoPrint=function(){var t;return this.internal.events.subscribe("postPutResources",function(){t=this.internal.newObject(),this.internal.write("<< /S/Named /Type/Action /N/Print >>","endobj")}),this.internal.events.subscribe("putCatalog",function(){this.internal.write("/OpenAction "+t+" 0 R")}),this},/** @preserve
 * jsPDF split_text_to_size plugin - MIT license.
 * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
 *               2014 Diego Casorran, https://github.com/diegocr
 */
function(t){var e=t.getCharWidthsArray=function(t,e){e||(e={});var n,r,i,o=e.widths?e.widths:this.internal.getFont().metadata.Unicode.widths,a=o.fof?o.fof:1,s=e.kerning?e.kerning:this.internal.getFont().metadata.Unicode.kerning,c=s.fof?s.fof:1,l=0,u=o[0]||a,h=[];for(n=0,r=t.length;n<r;n++)i=t.charCodeAt(n),h.push((o[i]||u)/a+(s[i]&&s[i][l]||0)/c),l=i;return h},n=function(t){for(var e=t.length,n=0;e;)n+=t[--e];return n},r=t.getStringUnitWidth=function(t,r){return n(e.call(this,t,r))},i=function(t,e,n,r){for(var i=[],o=0,a=t.length,s=0;o!==a&&s+e[o]<n;)s+=e[o],o++;i.push(t.slice(0,o));var c=o;for(s=0;o!==a;)s+e[o]>r&&(i.push(t.slice(c,o)),s=0,c=o),s+=e[o],o++;return c!==o&&i.push(t.slice(c,o)),i},o=function(t,o,a){a||(a={});var s,c,l,u,h,f,d=[],p=[d],m=a.textIndent||0,g=0,w=0,y=t.split(" "),v=e(" ",a)[0];if(f=-1===a.lineIndent?y[0].length+2:a.lineIndent||0){var b=Array(f).join(" "),x=[];y.map(function(t){(t=t.split(/\s*\n/)).length>1?x=x.concat(t.map(function(t,e){return(e&&t.length?"\n":"")+t})):x.push(t[0])}),y=x,f=r(b,a)}for(l=0,u=y.length;l<u;l++){var k=0;if(s=y[l],f&&"\n"==s[0]&&(s=s.substr(1),k=1),c=e(s,a),w=n(c),m+g+w>o||k){if(w>o){for(h=i(s,c,o-(m+g),o),d.push(h.shift()),d=[h.pop()];h.length;)p.push([h.shift()]);w=n(c.slice(s.length-d[0].length))}else d=[s];p.push(d),m=w+f,g=v}else d.push(s),m+=g+w,g=v}if(f)_=function(t,e){return(e?b:"")+t.join(" ")};else var _=function(t){return t.join(" ")};return p.map(_)};t.splitTextToSize=function(t,e,n){n||(n={});var r,i=n.fontSize||this.internal.getFontSize(),a=function(t){var e={0:1},n={};if(t.widths&&t.kerning)return{widths:t.widths,kerning:t.kerning};var r=this.internal.getFont(t.fontName,t.fontStyle);return r.metadata.Unicode?{widths:r.metadata.Unicode.widths||e,kerning:r.metadata.Unicode.kerning||n}:{widths:e,kerning:n}}.call(this,n);r=Array.isArray(t)?t:t.split(/\r?\n/);var s=1*this.internal.scaleFactor*e/i;a.textIndent=n.textIndent?1*n.textIndent*this.internal.scaleFactor/i:0,a.lineIndent=n.lineIndent;var c,l,u=[];for(c=0,l=r.length;c<l;c++)u=u.concat(o(r[c],s,a));return u}}(e.API),/** @preserve
jsPDF standard_fonts_metrics plugin
Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
MIT license.
*/
function(t){var e=function(t){for(var e={},n=0;n<"klmnopqrstuvwxyz".length;n++)e["klmnopqrstuvwxyz"[n]]="0123456789abcdef"[n];var r,i,o,a,s={},c=1,l=s,u=[],h="",f="",d=t.length-1;for(n=1;n!=d;)a=t[n],n+=1,"'"==a?r?(o=r.join(""),r=void 0):r=[]:r?r.push(a):"{"==a?(u.push([l,o]),l={},o=void 0):"}"==a?((i=u.pop())[0][i[1]]=l,o=void 0,l=i[0]):"-"==a?c=-1:void 0===o?e.hasOwnProperty(a)?(h+=e[a],o=parseInt(h,16)*c,c=1,h=""):h+=a:e.hasOwnProperty(a)?(f+=e[a],l[o]=parseInt(f,16)*c,c=1,o=void 0,f=""):f+=a;return s},n={codePages:["WinAnsiEncoding"],WinAnsiEncoding:e("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")},r={Unicode:{Courier:n,"Courier-Bold":n,"Courier-BoldOblique":n,"Courier-Oblique":n,Helvetica:n,"Helvetica-Bold":n,"Helvetica-BoldOblique":n,"Helvetica-Oblique":n,"Times-Roman":n,"Times-Bold":n,"Times-BoldItalic":n,"Times-Italic":n}},i={Unicode:{"Courier-Oblique":e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-BoldItalic":e("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),"Helvetica-Bold":e("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),Courier:e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Courier-BoldOblique":e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Bold":e("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),Helvetica:e("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),"Helvetica-BoldOblique":e("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),"Courier-Bold":e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Italic":e("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),"Times-Roman":e("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),"Helvetica-Oblique":e("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")}};t.events.push(["addFont",function(t){var e,n,o;(e=i.Unicode[t.PostScriptName])&&((n=t.metadata.Unicode?t.metadata.Unicode:t.metadata.Unicode={}).widths=e.widths,n.kerning=e.kerning),(o=r.Unicode[t.PostScriptName])&&((n=t.metadata.Unicode?t.metadata.Unicode:t.metadata.Unicode={}).encoding=o,o.codePages&&o.codePages.length&&(t.encoding=o.codePages[0]))}])}(e.API),e.API.addSVG=function(t,e,n,r,i){function o(t,e){var n=e.createElement("style");n.type="text/css",n.styleSheet?n.styleSheet.cssText=t:n.appendChild(e.createTextNode(t)),e.getElementsByTagName("head")[0].appendChild(n)}if(void 0===e||void 0===n)throw new Error("addSVG needs values for 'x' and 'y'");var a=function(t,e){var n=(e.contentWindow||e.contentDocument).document;return n.write(t),n.close(),n.getElementsByTagName("svg")[0]}(t,function(t){var e=t.createElement("iframe");return o(".jsPDF_sillysvg_iframe {display:none;position:absolute;}",t),e.name="childframe",e.setAttribute("width",0),e.setAttribute("height",0),e.setAttribute("frameborder","0"),e.setAttribute("scrolling","no"),e.setAttribute("seamless","seamless"),e.setAttribute("class","jsPDF_sillysvg_iframe"),t.body.appendChild(e),e}(document)),s=[1,1],c=parseFloat(a.getAttribute("width")),l=parseFloat(a.getAttribute("height"));c&&l&&(r&&i?s=[r/c,i/l]:r?s=[r/c,r/c]:i&&(s=[i/l,i/l]));var u,h,f,d,p=a.childNodes;for(u=0,h=p.length;u<h;u++)(f=p[u]).tagName&&"PATH"===f.tagName.toUpperCase()&&((d=function(t){for(var e=parseFloat(t[1]),n=parseFloat(t[2]),r=[],i=3,o=t.length;i<o;)"c"===t[i]?(r.push([parseFloat(t[i+1]),parseFloat(t[i+2]),parseFloat(t[i+3]),parseFloat(t[i+4]),parseFloat(t[i+5]),parseFloat(t[i+6])]),i+=7):"l"===t[i]?(r.push([parseFloat(t[i+1]),parseFloat(t[i+2])]),i+=3):i+=1;return[e,n,r]}(f.getAttribute("d").split(" ")))[0]=d[0]*s[0]+e,d[1]=d[1]*s[1]+n,this.lines.call(this,d[2],d[0],d[1],s));return this},e.API.putTotalPages=function(t){for(var e=new RegExp(t,"g"),n=1;n<=this.internal.getNumberOfPages();n++)for(var r=0;r<this.internal.pages[n].length;r++)this.internal.pages[n][r]=this.internal.pages[n][r].replace(e,this.internal.getNumberOfPages());return this},/** ====================================================================
 * jsPDF XMP metadata plugin
 * Copyright (c) 2016 Jussi Utunen, u-jussi@suomi24.fi
 *
 *
 * ====================================================================
 */
function(t){var n="",r="",i="";e.API.addMetadata=function(t,e){return r=e||"http://jspdf.default.namespaceuri/",n=t,this.internal.events.subscribe("postPutResources",function(){if(n){var t='<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:jspdf="'+r+'"><jspdf:metadata>',e=unescape(encodeURIComponent('<x:xmpmeta xmlns:x="adobe:ns:meta/">')),o=unescape(encodeURIComponent(t)),a=unescape(encodeURIComponent(n)),s=unescape(encodeURIComponent("</jspdf:metadata></rdf:Description></rdf:RDF>")),c=unescape(encodeURIComponent("</x:xmpmeta>")),l=o.length+a.length+s.length+e.length+c.length;i=this.internal.newObject(),this.internal.write("<< /Type /Metadata /Subtype /XML /Length "+l+" >>"),this.internal.write("stream"),this.internal.write(e+o+a+s+c),this.internal.write("endstream"),this.internal.write("endobj")}else i=""}),this.internal.events.subscribe("putCatalog",function(){i&&this.internal.write("/Metadata "+i+" 0 R")}),this}}(),function(t){if(t.URL=t.URL||t.webkitURL,t.Blob&&t.URL)try{return void new Blob}catch(t){}var e=t.BlobBuilder||t.WebKitBlobBuilder||t.MozBlobBuilder||function(t){var e=function(t){return Object.prototype.toString.call(t).match(/^\[object\s(.*)\]$/)[1]},n=function(){this.data=[]},r=function(t,e,n){this.data=t,this.size=t.length,this.type=e,this.encoding=n},i=n.prototype,o=r.prototype,a=t.FileReaderSync,s=function(t){this.code=this[this.name=t]},c="NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),l=c.length,u=t.URL||t.webkitURL||t,h=u.createObjectURL,f=u.revokeObjectURL,d=u,p=t.btoa,m=t.atob,g=t.ArrayBuffer,w=t.Uint8Array,y=/^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;for(r.fake=o.fake=!0;l--;)s.prototype[c[l]]=l+1;return u.createObjectURL||(d=t.URL=function(t){var e,n=document.createElementNS("http://www.w3.org/1999/xhtml","a");return n.href=t,"origin"in n||("data:"===n.protocol.toLowerCase()?n.origin=null:(e=t.match(y),n.origin=e&&e[1])),n}),d.createObjectURL=function(t){var e,n=t.type;return null===n&&(n="application/octet-stream"),t instanceof r?(e="data:"+n,"base64"===t.encoding?e+";base64,"+t.data:"URI"===t.encoding?e+","+decodeURIComponent(t.data):p?e+";base64,"+p(t.data):e+","+encodeURIComponent(t.data)):h?h.call(u,t):void 0},d.revokeObjectURL=function(t){"data:"!==t.substring(0,5)&&f&&f.call(u,t)},i.append=function(t){var n=this.data;if(w&&(t instanceof g||t instanceof w)){for(var i="",o=new w(t),c=0,l=o.length;c<l;c++)i+=String.fromCharCode(o[c]);n.push(i)}else if("Blob"===e(t)||"File"===e(t)){if(!a)throw new s("NOT_READABLE_ERR");var u=new a;n.push(u.readAsBinaryString(t))}else t instanceof r?"base64"===t.encoding&&m?n.push(m(t.data)):"URI"===t.encoding?n.push(decodeURIComponent(t.data)):"raw"===t.encoding&&n.push(t.data):("string"!=typeof t&&(t+=""),n.push(unescape(encodeURIComponent(t))))},i.getBlob=function(t){return arguments.length||(t=null),new r(this.data.join(""),t,"raw")},i.toString=function(){return"[object BlobBuilder]"},o.slice=function(t,e,n){var i=arguments.length;return i<3&&(n=null),new r(this.data.slice(t,i>1?e:this.data.length),n,this.encoding)},o.toString=function(){return"[object Blob]"},o.close=function(){this.size=0,delete this.data},n}(t);t.Blob=function(t,n){var r=n?n.type||"":"",i=new e;if(t)for(var o=0,a=t.length;o<a;o++)Uint8Array&&t[o]instanceof Uint8Array?i.append(t[o].buffer):i.append(t[o]);var s=i.getBlob(r);return!s.slice&&s.webkitSlice&&(s.slice=s.webkitSlice),s};var n=Object.getPrototypeOf||function(t){return t.__proto__};t.Blob.prototype=n(new t.Blob)}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||(void 0).content||void 0);var r=r||function(t){if(!(void 0===t||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var e=function(){return t.URL||t.webkitURL||t},n=t.document.createElementNS("http://www.w3.org/1999/xhtml","a"),r="download"in n,i=function(t){var e=new MouseEvent("click");t.dispatchEvent(e)},o=/constructor/i.test(t.HTMLElement)||t.safari,a=/CriOS\/[\d]+/.test(navigator.userAgent),s=function(e){(t.setImmediate||t.setTimeout)(function(){throw e},0)},c=function(t){setTimeout(function(){"string"==typeof t?e().revokeObjectURL(t):t.remove()},4e4)},l=function(t,e,n){for(var r=(e=[].concat(e)).length;r--;){var i=t["on"+e[r]];if("function"==typeof i)try{i.call(t,n||t)}catch(t){s(t)}}},u=function(t){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t},h=function(s,h,f){f||(s=u(s));var d,p=this,m="application/octet-stream"===s.type,g=function(){l(p,"writestart progress write writeend".split(" "))};if(p.readyState=p.INIT,r)return d=e().createObjectURL(s),void setTimeout(function(){n.href=d,n.download=h,i(n),g(),c(d),p.readyState=p.DONE});!function(){if((a||m&&o)&&t.FileReader){var n=new FileReader;return n.onloadend=function(){var e=a?n.result:n.result.replace(/^data:[^;]*;/,"data:attachment/file;");t.open(e,"_blank")||(t.location.href=e),e=void 0,p.readyState=p.DONE,g()},n.readAsDataURL(s),void(p.readyState=p.INIT)}d||(d=e().createObjectURL(s)),m?t.location.href=d:t.open(d,"_blank")||(t.location.href=d),p.readyState=p.DONE,g(),c(d)}()},f=h.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(t,e,n){return e=e||t.name||"download",n||(t=u(t)),navigator.msSaveOrOpenBlob(t,e)}:(f.abort=function(){},f.readyState=f.INIT=0,f.WRITING=1,f.DONE=2,f.error=f.onwritestart=f.onprogress=f.onwrite=f.onabort=f.onerror=f.onwriteend=null,function(t,e,n){return new h(t,e||t.name||"download",n)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||(void 0).content);"undefined"!=typeof module&&module.exports?module.exports.saveAs=r:"undefined"!="function"&&null!==__webpack_require__(107)&&null!==__webpack_require__(108)&&!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return r}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)),function(t,e){ true?module.exports=e():"function"==typeof define?define(e):t.adler32cs=e()}(e,function(){var t="function"==typeof ArrayBuffer&&"function"==typeof Uint8Array,e=null,n=function(){if(!t)return function(){return!1};try{var n={};"function"==typeof n.Buffer&&(e=n.Buffer)}catch(t){}return function(t){return t instanceof ArrayBuffer||null!==e&&t instanceof e}}(),r=null!==e?function(t){return new e(t,"utf8").toString("binary")}:function(t){return unescape(encodeURIComponent(t))},i=function(t,e){for(var n=65535&t,r=t>>>16,i=0,o=e.length;i<o;i++)r=(r+(n=(n+(255&e.charCodeAt(i)))%65521))%65521;return(r<<16|n)>>>0},o=function(t,e){for(var n=65535&t,r=t>>>16,i=0,o=e.length;i<o;i++)r=(r+(n=(n+e[i])%65521))%65521;return(r<<16|n)>>>0},a={},s=a.Adler32=function(){var e=function(t){if(!(this instanceof e))throw new TypeError("Constructor cannot called be as a function.");if(!isFinite(t=null==t?1:+t))throw new Error("First arguments needs to be a finite number.");this.checksum=t>>>0},a=e.prototype={};return a.constructor=e,e.from=function(t){return t.prototype=a,t}(function(t){if(!(this instanceof e))throw new TypeError("Constructor cannot called be as a function.");if(null==t)throw new Error("First argument needs to be a string.");this.checksum=i(1,t.toString())}),e.fromUtf8=function(t){return t.prototype=a,t}(function(t){if(!(this instanceof e))throw new TypeError("Constructor cannot called be as a function.");if(null==t)throw new Error("First argument needs to be a string.");var n=r(t.toString());this.checksum=i(1,n)}),t&&(e.fromBuffer=function(t){return t.prototype=a,t}(function(t){if(!(this instanceof e))throw new TypeError("Constructor cannot called be as a function.");if(!n(t))throw new Error("First argument needs to be ArrayBuffer.");var r=new Uint8Array(t);return this.checksum=o(1,r)})),a.update=function(t){if(null==t)throw new Error("First argument needs to be a string.");return t=t.toString(),this.checksum=i(this.checksum,t)},a.updateUtf8=function(t){if(null==t)throw new Error("First argument needs to be a string.");var e=r(t.toString());return this.checksum=i(this.checksum,e)},t&&(a.updateBuffer=function(t){if(!n(t))throw new Error("First argument needs to be ArrayBuffer.");var e=new Uint8Array(t);return this.checksum=o(this.checksum,e)}),a.clone=function(){return new s(this.checksum)},e}();return a.from=function(t){if(null==t)throw new Error("First argument needs to be a string.");return i(1,t.toString())},a.fromUtf8=function(t){if(null==t)throw new Error("First argument needs to be a string.");var e=r(t.toString());return i(1,e)},t&&(a.fromBuffer=function(t){if(!n(t))throw new Error("First argument need to be ArrayBuffer.");var e=new Uint8Array(t);return o(1,e)}),a});/**
 * CssColors
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
var i={};i._colorsTable={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4","indianred ":"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},i.colorNameToHex=function(t){return t=t.toLowerCase(),void 0!==this._colorsTable[t]&&this._colorsTable[t]};/*
 Deflate.js - https://github.com/gildas-lormeau/zip.js
 Copyright (c) 2013 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var o=function(t){function e(){function t(t){var e,n,i,o,a,c,l=r.dyn_tree,u=r.stat_desc.static_tree,h=r.stat_desc.extra_bits,d=r.stat_desc.extra_base,p=r.stat_desc.max_length,m=0;for(o=0;o<=s;o++)t.bl_count[o]=0;for(l[2*t.heap[t.heap_max]+1]=0,e=t.heap_max+1;e<f;e++)(o=l[2*l[2*(n=t.heap[e])+1]+1]+1)>p&&(o=p,m++),l[2*n+1]=o,n>r.max_code||(t.bl_count[o]++,a=0,n>=d&&(a=h[n-d]),c=l[2*n],t.opt_len+=c*(o+a),u&&(t.static_len+=c*(u[2*n+1]+a)));if(0!==m){do{for(o=p-1;0===t.bl_count[o];)o--;t.bl_count[o]--,t.bl_count[o+1]+=2,t.bl_count[p]--,m-=2}while(m>0);for(o=p;0!==o;o--)for(n=t.bl_count[o];0!==n;)(i=t.heap[--e])>r.max_code||(l[2*i+1]!=o&&(t.opt_len+=(o-l[2*i+1])*l[2*i],l[2*i+1]=o),n--)}}function e(t,e){var n=0;do{n|=1&t,t>>>=1,n<<=1}while(--e>0);return n>>>1}function n(t,n,r){var i,o,a,c=[],l=0;for(i=1;i<=s;i++)c[i]=l=l+r[i-1]<<1;for(o=0;o<=n;o++)0!==(a=t[2*o+1])&&(t[2*o]=e(c[a]++,a))}var r=this;r.build_tree=function(e){var i,o,a,s=r.dyn_tree,c=r.stat_desc.static_tree,l=r.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=f,i=0;i<l;i++)0!==s[2*i]?(e.heap[++e.heap_len]=u=i,e.depth[i]=0):s[2*i+1]=0;for(;e.heap_len<2;)s[2*(a=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[a]=0,e.opt_len--,c&&(e.static_len-=c[2*a+1]);for(r.max_code=u,i=Math.floor(e.heap_len/2);i>=1;i--)e.pqdownheap(s,i);a=l;do{i=e.heap[1],e.heap[1]=e.heap[e.heap_len--],e.pqdownheap(s,1),o=e.heap[1],e.heap[--e.heap_max]=i,e.heap[--e.heap_max]=o,s[2*a]=s[2*i]+s[2*o],e.depth[a]=Math.max(e.depth[i],e.depth[o])+1,s[2*i+1]=s[2*o+1]=a,e.heap[1]=a++,e.pqdownheap(s,1)}while(e.heap_len>=2);e.heap[--e.heap_max]=e.heap[1],t(e),n(s,r.max_code,e.bl_count)}}function n(t,e,n,r,i){var o=this;o.static_tree=t,o.extra_bits=e,o.extra_base=n,o.elems=r,o.max_length=i}function r(t,e,n,r,i){var o=this;o.good_length=t,o.max_lazy=e,o.nice_length=n,o.max_chain=r,o.func=i}function i(t,e,n,r){var i=t[2*e],o=t[2*n];return i<o||i==o&&r[e]<=r[n]}function o(){function t(){var t;for(Pt=2*At,Et[Ft-1]=0,t=0;t<Ft-1;t++)Et[t]=0;Vt=z[Gt].max_lazy,Jt=z[Gt].good_length,Qt=z[Gt].nice_length,Xt=z[Gt].max_chain,Mt=0,jt=0,Ht=0,zt=Wt=$-1,Lt=0,Ot=0}function r(){var t;for(t=0;t<h;t++)Kt[2*t]=0;for(t=0;t<c;t++)$t[2*t]=0;for(t=0;t<l;t++)Zt[2*t]=0;Kt[2*d]=1,te.opt_len=te.static_len=0,ae=ce=0}function o(){ee.dyn_tree=Kt,ee.stat_desc=n.static_l_desc,ne.dyn_tree=$t,ne.stat_desc=n.static_d_desc,re.dyn_tree=Zt,re.stat_desc=n.static_bl_desc,ue=0,he=0,le=8,r()}function a(t,e){var n,r,i=-1,o=t[1],a=0,s=7,c=4;for(0===o&&(s=138,c=3),t[2*(e+1)+1]=65535,n=0;n<=e;n++)r=o,o=t[2*(n+1)+1],++a<s&&r==o||(a<c?Zt[2*r]+=a:0!==r?(r!=i&&Zt[2*r]++,Zt[2*p]++):a<=10?Zt[2*m]++:Zt[2*g]++,a=0,i=r,0===o?(s=138,c=3):r==o?(s=6,c=3):(s=7,c=4))}function s(){var t;for(a(Kt,ee.max_code),a($t,ne.max_code),re.build_tree(te),t=l-1;t>=3&&0===Zt[2*e.bl_order[t]+1];t--);return te.opt_len+=3*(t+1)+5+5+4,t}function f(t){te.pending_buf[te.pending++]=t}function O(t){f(255&t),f(t>>>8&255)}function et(t){f(t>>8&255),f(255&t)}function nt(t,e){var n,r=e;he>w-r?(O(ue|=(n=t)<<he&65535),ue=n>>>w-he,he+=r-w):(ue|=t<<he&65535,he+=r)}function rt(t,e){var n=2*t;nt(65535&e[n],65535&e[n+1])}function it(t,e){var n,r,i=-1,o=t[1],a=0,s=7,c=4;for(0===o&&(s=138,c=3),n=0;n<=e;n++)if(r=o,o=t[2*(n+1)+1],!(++a<s&&r==o)){if(a<c)do{rt(r,Zt)}while(0!=--a);else 0!==r?(r!=i&&(rt(r,Zt),a--),rt(p,Zt),nt(a-3,2)):a<=10?(rt(m,Zt),nt(a-3,3)):(rt(g,Zt),nt(a-11,7));a=0,i=r,0===o?(s=138,c=3):r==o?(s=6,c=3):(s=7,c=4)}}function ot(t,n,r){var i;for(nt(t-257,5),nt(n-1,5),nt(r-4,4),i=0;i<r;i++)nt(Zt[2*e.bl_order[i]+1],3);it(Kt,t-1),it($t,n-1)}function at(){16==he?(O(ue),ue=0,he=0):he>=8&&(f(255&ue),ue>>>=8,he-=8)}function st(){nt(Q<<1,3),rt(d,n.static_ltree),at(),1+le+10-he<9&&(nt(Q<<1,3),rt(d,n.static_ltree),at()),le=7}function ct(t,n){var r,i,o;if(te.pending_buf[se+2*ae]=t>>>8&255,te.pending_buf[se+2*ae+1]=255&t,te.pending_buf[ie+ae]=255&n,ae++,0===t?Kt[2*n]++:(ce++,t--,Kt[2*(e._length_code[n]+u+1)]++,$t[2*e.d_code(t)]++),0==(8191&ae)&&Gt>2){for(r=8*ae,i=Mt-jt,o=0;o<c;o++)r+=$t[2*o]*(5+e.extra_dbits[o]);if(r>>>=3,ce<Math.floor(ae/2)&&r<Math.floor(i/2))return!0}return ae==oe-1}function lt(t,n){var r,i,o,a,s=0;if(0!==ae)do{r=te.pending_buf[se+2*s]<<8&65280|255&te.pending_buf[se+2*s+1],i=255&te.pending_buf[ie+s],s++,0===r?rt(i,t):(rt((o=e._length_code[i])+u+1,t),0!==(a=e.extra_lbits[o])&&nt(i-=e.base_length[o],a),r--,rt(o=e.d_code(r),n),0!==(a=e.extra_dbits[o])&&nt(r-=e.base_dist[o],a))}while(s<ae);rt(d,t),le=t[2*d+1]}function ut(){he>8?O(ue):he>0&&f(255&ue),ue=0,he=0}function ht(t,e,n){ut(),le=8,n&&(O(e),O(~e)),te.pending_buf.set(Tt.subarray(t,t+e),te.pending),te.pending+=e}function ft(t,e,n){nt((J<<1)+(n?1:0),3),ht(t,e,!0)}function dt(t,e,i){var o,a,c=0;Gt>0?(ee.build_tree(te),ne.build_tree(te),c=s(),o=te.opt_len+3+7>>>3,(a=te.static_len+3+7>>>3)<=o&&(o=a)):o=a=e+5,e+4<=o&&-1!=t?ft(t,e,i):a==o?(nt((Q<<1)+(i?1:0),3),lt(n.static_ltree,n.static_dtree)):(nt((K<<1)+(i?1:0),3),ot(ee.max_code+1,ne.max_code+1,c+1),lt(Kt,$t)),r(),i&&ut()}function pt(t){dt(jt>=0?jt:-1,Mt-jt,t),jt=Mt,xt.flush_pending()}function mt(){var t,e,n,r;do{if(0===(r=Pt-Ht-Mt)&&0===Mt&&0===Ht)r=At;else if(-1==r)r--;else if(Mt>=At+At-tt){Tt.set(Tt.subarray(At,At+At),0),Ut-=At,Mt-=At,jt-=At,n=t=Ft;do{e=65535&Et[--n],Et[n]=e>=At?e-At:0}while(0!=--t);n=t=At;do{e=65535&It[--n],It[n]=e>=At?e-At:0}while(0!=--t);r+=At}if(0===xt.avail_in)return;t=xt.read_buf(Tt,Mt+Ht,r),(Ht+=t)>=$&&(Ot=255&Tt[Mt],Ot=(Ot<<Dt^255&Tt[Mt+1])&Rt)}while(Ht<tt&&0!==xt.avail_in)}function gt(t){var e,n=65535;for(n>_t-5&&(n=_t-5);;){if(Ht<=1){if(mt(),0===Ht&&t==k)return L;if(0===Ht)break}if(Mt+=Ht,Ht=0,e=jt+n,(0===Mt||Mt>=e)&&(Ht=Mt-e,Mt=e,pt(!1),0===xt.avail_out))return L;if(Mt-jt>=At-tt&&(pt(!1),0===xt.avail_out))return L}return pt(t==A),0===xt.avail_out?t==A?U:L:t==A?H:M}function wt(t){var e,n,r=Xt,i=Mt,o=Wt,a=Mt>At-tt?Mt-(At-tt):0,s=Qt,c=qt,l=Mt+Z,u=Tt[i+o-1],h=Tt[i+o];Wt>=Jt&&(r>>=2),s>Ht&&(s=Ht);do{if(e=t,Tt[e+o]==h&&Tt[e+o-1]==u&&Tt[e]==Tt[i]&&Tt[++e]==Tt[i+1]){i+=2,e++;do{}while(Tt[++i]==Tt[++e]&&Tt[++i]==Tt[++e]&&Tt[++i]==Tt[++e]&&Tt[++i]==Tt[++e]&&Tt[++i]==Tt[++e]&&Tt[++i]==Tt[++e]&&Tt[++i]==Tt[++e]&&Tt[++i]==Tt[++e]&&i<l);if(n=Z-(l-i),i=l-Z,n>o){if(Ut=t,o=n,n>=s)break;u=Tt[i+o-1],h=Tt[i+o]}}}while((t=65535&It[t&c])>a&&0!=--r);return o<=Ht?o:Ht}function yt(t){for(var e,n=0;;){if(Ht<tt){if(mt(),Ht<tt&&t==k)return L;if(0===Ht)break}if(Ht>=$&&(Ot=(Ot<<Dt^255&Tt[Mt+($-1)])&Rt,n=65535&Et[Ot],It[Mt&qt]=Et[Ot],Et[Ot]=Mt),0!==n&&(Mt-n&65535)<=At-tt&&Yt!=b&&(zt=wt(n)),zt>=$)if(e=ct(Mt-Ut,zt-$),Ht-=zt,zt<=Vt&&Ht>=$){zt--;do{Ot=(Ot<<Dt^255&Tt[++Mt+($-1)])&Rt,n=65535&Et[Ot],It[Mt&qt]=Et[Ot],Et[Ot]=Mt}while(0!=--zt);Mt++}else Mt+=zt,zt=0,Ot=255&Tt[Mt],Ot=(Ot<<Dt^255&Tt[Mt+1])&Rt;else e=ct(0,255&Tt[Mt]),Ht--,Mt++;if(e&&(pt(!1),0===xt.avail_out))return L}return pt(t==A),0===xt.avail_out?t==A?U:L:t==A?H:M}function vt(t){for(var e,n,r=0;;){if(Ht<tt){if(mt(),Ht<tt&&t==k)return L;if(0===Ht)break}if(Ht>=$&&(Ot=(Ot<<Dt^255&Tt[Mt+($-1)])&Rt,r=65535&Et[Ot],It[Mt&qt]=Et[Ot],Et[Ot]=Mt),Wt=zt,Nt=Ut,zt=$-1,0!==r&&Wt<Vt&&(Mt-r&65535)<=At-tt&&(Yt!=b&&(zt=wt(r)),zt<=5&&(Yt==v||zt==$&&Mt-Ut>4096)&&(zt=$-1)),Wt>=$&&zt<=Wt){n=Mt+Ht-$,e=ct(Mt-1-Nt,Wt-$),Ht-=Wt-1,Wt-=2;do{++Mt<=n&&(Ot=(Ot<<Dt^255&Tt[Mt+($-1)])&Rt,r=65535&Et[Ot],It[Mt&qt]=Et[Ot],Et[Ot]=Mt)}while(0!=--Wt);if(Lt=0,zt=$-1,Mt++,e&&(pt(!1),0===xt.avail_out))return L}else if(0!==Lt){if((e=ct(0,255&Tt[Mt-1]))&&pt(!1),Mt++,Ht--,0===xt.avail_out)return L}else Lt=1,Mt++,Ht--}return 0!==Lt&&(e=ct(0,255&Tt[Mt-1]),Lt=0),pt(t==A),0===xt.avail_out?t==A?U:L:t==A?H:M}function bt(e){return e.total_in=e.total_out=0,e.msg=null,te.pending=0,te.pending_out=0,kt=V,Ct=k,o(),t(),S}var xt,kt,_t,Ct,At,St,qt,Tt,Pt,It,Et,Ot,Ft,Bt,Rt,Dt,jt,zt,Nt,Lt,Mt,Ut,Ht,Wt,Xt,Vt,Gt,Yt,Jt,Qt,Kt,$t,Zt,te=this,ee=new e,ne=new e,re=new e;te.depth=[];var ie,oe,ae,se,ce,le,ue,he;te.bl_count=[],te.heap=[],Kt=[],$t=[],Zt=[],te.pqdownheap=function(t,e){for(var n=te.heap,r=n[e],o=e<<1;o<=te.heap_len&&(o<te.heap_len&&i(t,n[o+1],n[o],te.depth)&&o++,!i(t,r,n[o],te.depth));)n[e]=n[o],e=o,o<<=1;n[e]=r},te.deflateInit=function(t,e,n,r,i,o){return r||(r=Y),i||(i=B),o||(o=x),t.msg=null,e==y&&(e=6),i<1||i>F||r!=Y||n<9||n>15||e<0||e>9||o<0||o>b?P:(t.dstate=te,St=n,At=1<<St,qt=At-1,Bt=i+7,Ft=1<<Bt,Rt=Ft-1,Dt=Math.floor((Bt+$-1)/$),Tt=new Uint8Array(2*At),It=[],Et=[],oe=1<<i+6,te.pending_buf=new Uint8Array(4*oe),_t=4*oe,se=Math.floor(oe/2),ie=3*oe,Gt=e,Yt=o,bt(t))},te.deflateEnd=function(){return kt!=X&&kt!=V&&kt!=G?P:(te.pending_buf=null,Et=null,It=null,Tt=null,te.dstate=null,kt==V?I:S)},te.deflateParams=function(t,e,n){var r=S;return e==y&&(e=6),e<0||e>9||n<0||n>b?P:(z[Gt].func!=z[e].func&&0!==t.total_in&&(r=t.deflate(_)),Gt!=e&&(Vt=z[Gt=e].max_lazy,Jt=z[Gt].good_length,Qt=z[Gt].nice_length,Xt=z[Gt].max_chain),Yt=n,r)},te.deflateSetDictionary=function(t,e,n){var r,i=n,o=0;if(!e||kt!=X)return P;if(i<$)return S;for(i>At-tt&&(o=n-(i=At-tt)),Tt.set(e.subarray(o,o+i),0),Mt=i,jt=i,Ot=255&Tt[0],Ot=(Ot<<Dt^255&Tt[1])&Rt,r=0;r<=i-$;r++)Ot=(Ot<<Dt^255&Tt[r+($-1)])&Rt,It[r&qt]=Et[Ot],Et[Ot]=r;return S},te.deflate=function(t,e){var n,r,i,o,a;if(e>A||e<0)return P;if(!t.next_out||!t.next_in&&0!==t.avail_in||kt==G&&e!=A)return t.msg=N[T-P],P;if(0===t.avail_out)return t.msg=N[T-E],E;if(xt=t,o=Ct,Ct=e,kt==X&&(r=Y+(St-8<<4)<<8,(i=(Gt-1&255)>>1)>3&&(i=3),r|=i<<6,0!==Mt&&(r|=W),kt=V,et(r+=31-r%31)),0!==te.pending){if(xt.flush_pending(),0===xt.avail_out)return Ct=-1,S}else if(0===xt.avail_in&&e<=o&&e!=A)return xt.msg=N[T-E],E;if(kt==G&&0!==xt.avail_in)return t.msg=N[T-E],E;if(0!==xt.avail_in||0!==Ht||e!=k&&kt!=G){switch(a=-1,z[Gt].func){case R:a=gt(e);break;case D:a=yt(e);break;case j:a=vt(e)}if(a!=U&&a!=H||(kt=G),a==L||a==U)return 0===xt.avail_out&&(Ct=-1),S;if(a==M){if(e==_)st();else if(ft(0,0,!1),e==C)for(n=0;n<Ft;n++)Et[n]=0;if(xt.flush_pending(),0===xt.avail_out)return Ct=-1,S}}return e!=A?S:q}}function a(){var t=this;t.next_in_index=0,t.next_out_index=0,t.avail_in=0,t.total_in=0,t.avail_out=0,t.total_out=0}var s=15,c=30,l=19,u=256,h=u+1+29,f=2*h+1,d=256,p=16,m=17,g=18,w=16,y=-1,v=1,b=2,x=0,k=0,_=1,C=3,A=4,S=0,q=1,T=2,P=-2,I=-3,E=-5,O=[0,1,2,3,4,4,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0,0,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29];e._length_code=[0,1,2,3,4,5,6,7,8,8,9,9,10,10,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28],e.base_length=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0],e.base_dist=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576],e.d_code=function(t){return t<256?O[t]:O[256+(t>>>7)]},e.extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],e.extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],e.extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],e.bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],n.static_ltree=[12,8,140,8,76,8,204,8,44,8,172,8,108,8,236,8,28,8,156,8,92,8,220,8,60,8,188,8,124,8,252,8,2,8,130,8,66,8,194,8,34,8,162,8,98,8,226,8,18,8,146,8,82,8,210,8,50,8,178,8,114,8,242,8,10,8,138,8,74,8,202,8,42,8,170,8,106,8,234,8,26,8,154,8,90,8,218,8,58,8,186,8,122,8,250,8,6,8,134,8,70,8,198,8,38,8,166,8,102,8,230,8,22,8,150,8,86,8,214,8,54,8,182,8,118,8,246,8,14,8,142,8,78,8,206,8,46,8,174,8,110,8,238,8,30,8,158,8,94,8,222,8,62,8,190,8,126,8,254,8,1,8,129,8,65,8,193,8,33,8,161,8,97,8,225,8,17,8,145,8,81,8,209,8,49,8,177,8,113,8,241,8,9,8,137,8,73,8,201,8,41,8,169,8,105,8,233,8,25,8,153,8,89,8,217,8,57,8,185,8,121,8,249,8,5,8,133,8,69,8,197,8,37,8,165,8,101,8,229,8,21,8,149,8,85,8,213,8,53,8,181,8,117,8,245,8,13,8,141,8,77,8,205,8,45,8,173,8,109,8,237,8,29,8,157,8,93,8,221,8,61,8,189,8,125,8,253,8,19,9,275,9,147,9,403,9,83,9,339,9,211,9,467,9,51,9,307,9,179,9,435,9,115,9,371,9,243,9,499,9,11,9,267,9,139,9,395,9,75,9,331,9,203,9,459,9,43,9,299,9,171,9,427,9,107,9,363,9,235,9,491,9,27,9,283,9,155,9,411,9,91,9,347,9,219,9,475,9,59,9,315,9,187,9,443,9,123,9,379,9,251,9,507,9,7,9,263,9,135,9,391,9,71,9,327,9,199,9,455,9,39,9,295,9,167,9,423,9,103,9,359,9,231,9,487,9,23,9,279,9,151,9,407,9,87,9,343,9,215,9,471,9,55,9,311,9,183,9,439,9,119,9,375,9,247,9,503,9,15,9,271,9,143,9,399,9,79,9,335,9,207,9,463,9,47,9,303,9,175,9,431,9,111,9,367,9,239,9,495,9,31,9,287,9,159,9,415,9,95,9,351,9,223,9,479,9,63,9,319,9,191,9,447,9,127,9,383,9,255,9,511,9,0,7,64,7,32,7,96,7,16,7,80,7,48,7,112,7,8,7,72,7,40,7,104,7,24,7,88,7,56,7,120,7,4,7,68,7,36,7,100,7,20,7,84,7,52,7,116,7,3,8,131,8,67,8,195,8,35,8,163,8,99,8,227,8],n.static_dtree=[0,5,16,5,8,5,24,5,4,5,20,5,12,5,28,5,2,5,18,5,10,5,26,5,6,5,22,5,14,5,30,5,1,5,17,5,9,5,25,5,5,5,21,5,13,5,29,5,3,5,19,5,11,5,27,5,7,5,23,5],n.static_l_desc=new n(n.static_ltree,e.extra_lbits,u+1,h,s),n.static_d_desc=new n(n.static_dtree,e.extra_dbits,0,c,s),n.static_bl_desc=new n(null,e.extra_blbits,0,l,7);var F=9,B=8,R=0,D=1,j=2,z=[new r(0,0,0,0,R),new r(4,4,8,4,D),new r(4,5,16,8,D),new r(4,6,32,32,D),new r(4,4,16,16,j),new r(8,16,32,32,j),new r(8,16,128,128,j),new r(8,32,128,256,j),new r(32,128,258,1024,j),new r(32,258,258,4096,j)],N=["need dictionary","stream end","","","stream error","data error","","buffer error","",""],L=0,M=1,U=2,H=3,W=32,X=42,V=113,G=666,Y=8,J=0,Q=1,K=2,$=3,Z=258,tt=Z+$+1;return a.prototype={deflateInit:function(t,e){var n=this;return n.dstate=new o,e||(e=s),n.dstate.deflateInit(n,t,e)},deflate:function(t){var e=this;return e.dstate?e.dstate.deflate(e,t):P},deflateEnd:function(){var t=this;if(!t.dstate)return P;var e=t.dstate.deflateEnd();return t.dstate=null,e},deflateParams:function(t,e){var n=this;return n.dstate?n.dstate.deflateParams(n,t,e):P},deflateSetDictionary:function(t,e){var n=this;return n.dstate?n.dstate.deflateSetDictionary(n,t,e):P},read_buf:function(t,e,n){var r=this,i=r.avail_in;return i>n&&(i=n),0===i?0:(r.avail_in-=i,t.set(r.next_in.subarray(r.next_in_index,r.next_in_index+i),e),r.next_in_index+=i,r.total_in+=i,i)},flush_pending:function(){var t=this,e=t.dstate.pending;e>t.avail_out&&(e=t.avail_out),0!==e&&(t.next_out.set(t.dstate.pending_buf.subarray(t.dstate.pending_out,t.dstate.pending_out+e),t.next_out_index),t.next_out_index+=e,t.dstate.pending_out+=e,t.total_out+=e,t.avail_out-=e,t.dstate.pending-=e,0===t.dstate.pending&&(t.dstate.pending_out=0))}},function(t){var e=this,n=new a,r=k,i=new Uint8Array(512);void 0===t&&(t=y),n.deflateInit(t),n.next_out=i,e.append=function(t,e){var o,a=[],s=0,c=0,l=0;if(t.length){n.next_in_index=0,n.next_in=t,n.avail_in=t.length;do{if(n.next_out_index=0,n.avail_out=512,n.deflate(r)!=S)throw"deflating: "+n.msg;n.next_out_index&&(512==n.next_out_index?a.push(new Uint8Array(i)):a.push(new Uint8Array(i.subarray(0,n.next_out_index)))),l+=n.next_out_index,e&&n.next_in_index>0&&n.next_in_index!=s&&(e(n.next_in_index),s=n.next_in_index)}while(n.avail_in>0||0===n.avail_out);return o=new Uint8Array(l),a.forEach(function(t){o.set(t,c),c+=t.length}),o}},e.flush=function(){var t,e,r=[],o=0,a=0;do{if(n.next_out_index=0,n.avail_out=512,(t=n.deflate(A))!=q&&t!=S)throw"deflating: "+n.msg;512-n.avail_out>0&&r.push(new Uint8Array(i.subarray(0,n.next_out_index))),a+=n.next_out_index}while(n.avail_in>0||0===n.avail_out);return n.deflateEnd(),e=new Uint8Array(a),r.forEach(function(t){e.set(t,o),o+=t.length}),e}}}();/*
  html2canvas 0.5.0-beta3 <http://html2canvas.hertzen.com>
  Copyright (c) 2016 Niklas von Hertzen

  Released under  License
*/
!function(t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.html2canvas=t()}}(function(){return function t(e,n,r){function i(a,s){if(!n[a]){if(!e[a]){var c="function"==typeof require&&require;if(!s&&c)return require(a,!0);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[a]={exports:{}};e[a][0].call(u.exports,function(t){var n=e[a][1][t];return i(n||t)},u,u.exports,t,e,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(t,e,n){(function(t){!function(r){function i(t){throw RangeError(E[t])}function o(t,e){for(var n=t.length;n--;)t[n]=e(t[n]);return t}function a(t,e){return o(t.split(I),e).join(".")}function s(t){for(var e,n,r=[],i=0,o=t.length;i<o;)(e=t.charCodeAt(i++))>=55296&&e<=56319&&i<o?56320==(64512&(n=t.charCodeAt(i++)))?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),i--):r.push(e);return r}function c(t){return o(t,function(t){var e="";return t>65535&&(e+=B((t-=65536)>>>10&1023|55296),t=56320|1023&t),e+=B(t)}).join("")}function l(t){return t-48<10?t-22:t-65<26?t-65:t-97<26?t-97:b}function u(t,e){return t+22+75*(t<26)-((0!=e)<<5)}function h(t,e,n){var r=0;for(t=n?F(t/C):t>>1,t+=F(t/e);t>O*k>>1;r+=b)t=F(t/O);return F(r+(O+1)*t/(t+_))}function f(t){var e,n,r,o,a,s,u,f,d,p,m=[],g=t.length,w=0,y=S,_=A;for((n=t.lastIndexOf(q))<0&&(n=0),r=0;r<n;++r)t.charCodeAt(r)>=128&&i("not-basic"),m.push(t.charCodeAt(r));for(o=n>0?n+1:0;o<g;){for(a=w,s=1,u=b;o>=g&&i("invalid-input"),((f=l(t.charCodeAt(o++)))>=b||f>F((v-w)/s))&&i("overflow"),w+=f*s,d=u<=_?x:u>=_+k?k:u-_,!(f<d);u+=b)s>F(v/(p=b-d))&&i("overflow"),s*=p;_=h(w-a,e=m.length+1,0==a),F(w/e)>v-y&&i("overflow"),y+=F(w/e),w%=e,m.splice(w++,0,y)}return c(m)}function d(t){var e,n,r,o,a,c,l,f,d,p,m,g,w,y,_,C=[];for(g=(t=s(t)).length,e=S,n=0,a=A,c=0;c<g;++c)(m=t[c])<128&&C.push(B(m));for(r=o=C.length,o&&C.push(q);r<g;){for(l=v,c=0;c<g;++c)(m=t[c])>=e&&m<l&&(l=m);for(l-e>F((v-n)/(w=r+1))&&i("overflow"),n+=(l-e)*w,e=l,c=0;c<g;++c)if((m=t[c])<e&&++n>v&&i("overflow"),m==e){for(f=n,d=b;p=d<=a?x:d>=a+k?k:d-a,!(f<p);d+=b)_=f-p,y=b-p,C.push(B(u(p+_%y,0))),f=F(_/y);C.push(B(u(f,0))),a=h(n,w,r==o),n=0,++r}++n,++e}return C.join("")}var p="object"==typeof n&&n,m="object"==typeof e&&e&&e.exports==p&&e,g="object"==typeof t&&t;g.global!==g&&g.window!==g||(r=g);var w,y,v=2147483647,b=36,x=1,k=26,_=38,C=700,A=72,S=128,q="-",T=/^xn--/,P=/[^ -~]/,I=/\x2E|\u3002|\uFF0E|\uFF61/g,E={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},O=b-x,F=Math.floor,B=String.fromCharCode;if(w={version:"1.2.4",ucs2:{decode:s,encode:c},decode:f,encode:d,toASCII:function(t){return a(t,function(t){return P.test(t)?"xn--"+d(t):t})},toUnicode:function(t){return a(t,function(t){return T.test(t)?f(t.slice(4).toLowerCase()):t})}},p&&!p.nodeType)if(m)m.exports=w;else for(y in w)w.hasOwnProperty(y)&&(p[y]=w[y]);else r.punycode=w}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(t,e,n){function r(t,e,n){!t.defaultView||e===t.defaultView.pageXOffset&&n===t.defaultView.pageYOffset||t.defaultView.scrollTo(e,n)}function i(t,e){try{e&&(e.width=t.width,e.height=t.height,e.getContext("2d").putImageData(t.getContext("2d").getImageData(0,0,t.width,t.height),0,0))}catch(e){s("Unable to copy canvas content from",t,e)}}function o(t,e){for(var n=3===t.nodeType?document.createTextNode(t.nodeValue):t.cloneNode(!1),r=t.firstChild;r;)!0!==e&&1===r.nodeType&&"SCRIPT"===r.nodeName||n.appendChild(o(r,e)),r=r.nextSibling;return 1===t.nodeType&&(n._scrollTop=t.scrollTop,n._scrollLeft=t.scrollLeft,"CANVAS"===t.nodeName?i(t,n):"TEXTAREA"!==t.nodeName&&"SELECT"!==t.nodeName||(n.value=t.value)),n}function a(t){if(1===t.nodeType){t.scrollTop=t._scrollTop,t.scrollLeft=t._scrollLeft;for(var e=t.firstChild;e;)a(e),e=e.nextSibling}}var s=t("./log");e.exports=function(t,e,n,i,s,c,l){var u=o(t.documentElement,s.javascriptEnabled),h=e.createElement("iframe");return h.className="html2canvas-container",h.style.visibility="hidden",h.style.position="fixed",h.style.left="-10000px",h.style.top="0px",h.style.border="0",h.width=n,h.height=i,h.scrolling="no",e.body.appendChild(h),new Promise(function(e){var n=h.contentWindow.document;h.contentWindow.onload=h.onload=function(){var t=setInterval(function(){n.body.childNodes.length>0&&(a(n.documentElement),clearInterval(t),"view"===s.type&&(h.contentWindow.scrollTo(c,l),!/(iPad|iPhone|iPod)/g.test(navigator.userAgent)||h.contentWindow.scrollY===l&&h.contentWindow.scrollX===c||(n.documentElement.style.top=-l+"px",n.documentElement.style.left=-c+"px",n.documentElement.style.position="absolute")),e(h))},50)},n.open(),n.write("<!DOCTYPE html><html></html>"),r(t,c,l),n.replaceChild(n.adoptNode(u),n.documentElement),n.close()})}},{"./log":13}],3:[function(t,e,n){function r(t){this.r=0,this.g=0,this.b=0,this.a=null;this.fromArray(t)||this.namedColor(t)||this.rgb(t)||this.rgba(t)||this.hex6(t)||this.hex3(t)}r.prototype.darken=function(t){var e=1-t;return new r([Math.round(this.r*e),Math.round(this.g*e),Math.round(this.b*e),this.a])},r.prototype.isTransparent=function(){return 0===this.a},r.prototype.isBlack=function(){return 0===this.r&&0===this.g&&0===this.b},r.prototype.fromArray=function(t){return Array.isArray(t)&&(this.r=Math.min(t[0],255),this.g=Math.min(t[1],255),this.b=Math.min(t[2],255),t.length>3&&(this.a=t[3])),Array.isArray(t)};var i=/^#([a-f0-9]{3})$/i;r.prototype.hex3=function(t){var e=null;return null!==(e=t.match(i))&&(this.r=parseInt(e[1][0]+e[1][0],16),this.g=parseInt(e[1][1]+e[1][1],16),this.b=parseInt(e[1][2]+e[1][2],16)),null!==e};var o=/^#([a-f0-9]{6})$/i;r.prototype.hex6=function(t){var e=null;return null!==(e=t.match(o))&&(this.r=parseInt(e[1].substring(0,2),16),this.g=parseInt(e[1].substring(2,4),16),this.b=parseInt(e[1].substring(4,6),16)),null!==e};var a=/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;r.prototype.rgb=function(t){var e=null;return null!==(e=t.match(a))&&(this.r=Number(e[1]),this.g=Number(e[2]),this.b=Number(e[3])),null!==e};var s=/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;r.prototype.rgba=function(t){var e=null;return null!==(e=t.match(s))&&(this.r=Number(e[1]),this.g=Number(e[2]),this.b=Number(e[3]),this.a=Number(e[4])),null!==e},r.prototype.toString=function(){return null!==this.a&&1!==this.a?"rgba("+[this.r,this.g,this.b,this.a].join(",")+")":"rgb("+[this.r,this.g,this.b].join(",")+")"},r.prototype.namedColor=function(t){t=t.toLowerCase();var e=c[t];if(e)this.r=e[0],this.g=e[1],this.b=e[2];else if("transparent"===t)return this.r=this.g=this.b=this.a=0,!0;return!!e},r.prototype.isColor=!0;var c={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]};e.exports=r},{}],4:[function(t,e,n){function r(t,e){var n=k++;if((e=e||{}).logging&&(g.options.logging=!0,g.options.start=Date.now()),e.async=void 0===e.async||e.async,e.allowTaint=void 0!==e.allowTaint&&e.allowTaint,e.removeContainer=void 0===e.removeContainer||e.removeContainer,e.javascriptEnabled=void 0!==e.javascriptEnabled&&e.javascriptEnabled,e.imageTimeout=void 0===e.imageTimeout?1e4:e.imageTimeout,e.renderer="function"==typeof e.renderer?e.renderer:f,e.strict=!!e.strict,"string"==typeof t){if("string"!=typeof e.proxy)return Promise.reject("Proxy must be used when rendering url");var r=null!=e.width?e.width:window.innerWidth,a=null!=e.height?e.height:window.innerHeight;return v(u(t),e.proxy,document,r,a,e).then(function(t){return o(t.contentWindow.document.documentElement,t,e,r,a)})}var s=(void 0===t?[document.documentElement]:t.length?t:[t])[0];return s.setAttribute(x+n,n),i(s.ownerDocument,e,s.ownerDocument.defaultView.innerWidth,s.ownerDocument.defaultView.innerHeight,n).then(function(t){return"function"==typeof e.onrendered&&(g("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"),e.onrendered(t)),t})}function i(t,e,n,r,i){return y(t,t,n,r,e,t.defaultView.pageXOffset,t.defaultView.pageYOffset).then(function(a){g("Document cloned");var s=x+i,c="["+s+"='"+i+"']";t.querySelector(c).removeAttribute(s);var l=a.contentWindow,u=l.document.querySelector(c);return("function"==typeof e.onclone?Promise.resolve(e.onclone(l.document)):Promise.resolve(!0)).then(function(){return o(u,a,e,n,r)})})}function o(t,e,n,r,i){var o=e.contentWindow,u=new h(o.document),f=new d(n,u),m=b(t),w="view"===n.type?r:c(o.document),y="view"===n.type?i:l(o.document),v=new n.renderer(w,y,f,n,document);return new p(t,v,u,f,n).ready.then(function(){g("Finished rendering");var r;return r="view"===n.type?s(v.canvas,{width:v.canvas.width,height:v.canvas.height,top:0,left:0,x:0,y:0}):t===o.document.body||t===o.document.documentElement||null!=n.canvas?v.canvas:s(v.canvas,{width:null!=n.width?n.width:m.width,height:null!=n.height?n.height:m.height,top:m.top,left:m.left,x:0,y:0}),a(e,n),r})}function a(t,e){e.removeContainer&&(t.parentNode.removeChild(t),g("Cleaned up container"))}function s(t,e){var n=document.createElement("canvas"),r=Math.min(t.width-1,Math.max(0,e.left)),i=Math.min(t.width,Math.max(1,e.left+e.width)),o=Math.min(t.height-1,Math.max(0,e.top)),a=Math.min(t.height,Math.max(1,e.top+e.height));n.width=e.width,n.height=e.height;var s=i-r,c=a-o;return g("Cropping canvas at:","left:",e.left,"top:",e.top,"width:",s,"height:",c),g("Resulting crop with width",e.width,"and height",e.height,"with x",r,"and y",o),n.getContext("2d").drawImage(t,r,o,s,c,e.x,e.y,s,c),n}function c(t){return Math.max(Math.max(t.body.scrollWidth,t.documentElement.scrollWidth),Math.max(t.body.offsetWidth,t.documentElement.offsetWidth),Math.max(t.body.clientWidth,t.documentElement.clientWidth))}function l(t){return Math.max(Math.max(t.body.scrollHeight,t.documentElement.scrollHeight),Math.max(t.body.offsetHeight,t.documentElement.offsetHeight),Math.max(t.body.clientHeight,t.documentElement.clientHeight))}function u(t){var e=document.createElement("a");return e.href=t,e.href=e.href,e}var h=t("./support"),f=t("./renderers/canvas"),d=t("./imageloader"),p=t("./nodeparser"),m=t("./nodecontainer"),g=t("./log"),w=t("./utils"),y=t("./clone"),v=t("./proxy").loadUrlDocument,b=w.getBounds,x="data-html2canvas-node",k=0;r.CanvasRenderer=f,r.NodeContainer=m,r.log=g,r.utils=w;var _="undefined"==typeof document||"function"!=typeof Object.create||"function"!=typeof document.createElement("canvas").getContext?function(){return Promise.reject("No canvas support")}:r;e.exports=_},{"./clone":2,"./imageloader":11,"./log":13,"./nodecontainer":14,"./nodeparser":15,"./proxy":16,"./renderers/canvas":20,"./support":22,"./utils":26}],5:[function(t,e,n){function r(t){if(this.src=t,i("DummyImageContainer for",t),!this.promise||!this.image){i("Initiating DummyImageContainer"),r.prototype.image=new Image;var e=this.image;r.prototype.promise=new Promise(function(t,n){e.onload=t,e.onerror=n,e.src=o(),!0===e.complete&&t(e)})}}var i=t("./log"),o=t("./utils").smallImage;e.exports=r},{"./log":13,"./utils":26}],6:[function(t,e,n){var r=t("./utils").smallImage;e.exports=function(t,e){var n,i,o=document.createElement("div"),a=document.createElement("img"),s=document.createElement("span");o.style.visibility="hidden",o.style.fontFamily=t,o.style.fontSize=e,o.style.margin=0,o.style.padding=0,document.body.appendChild(o),a.src=r(),a.width=1,a.height=1,a.style.margin=0,a.style.padding=0,a.style.verticalAlign="baseline",s.style.fontFamily=t,s.style.fontSize=e,s.style.margin=0,s.style.padding=0,s.appendChild(document.createTextNode("Hidden Text")),o.appendChild(s),o.appendChild(a),n=a.offsetTop-s.offsetTop+1,o.removeChild(s),o.appendChild(document.createTextNode("Hidden Text")),o.style.lineHeight="normal",a.style.verticalAlign="super",i=a.offsetTop-o.offsetTop+1,document.body.removeChild(o),this.baseline=n,this.lineWidth=1,this.middle=i}},{"./utils":26}],7:[function(t,e,n){function r(){this.data={}}var i=t("./font");r.prototype.getMetrics=function(t,e){return void 0===this.data[t+"-"+e]&&(this.data[t+"-"+e]=new i(t,e)),this.data[t+"-"+e]},e.exports=r},{"./font":6}],8:[function(t,e,n){function r(e,n,r){this.image=null,this.src=e;var o=this,a=i(e);this.promise=(n?new Promise(function(t){"about:blank"===e.contentWindow.document.URL||null==e.contentWindow.document.documentElement?e.contentWindow.onload=e.onload=function(){t(e)}:t(e)}):this.proxyLoad(r.proxy,a,r)).then(function(e){return t("./core")(e.contentWindow.document.documentElement,{type:"view",width:e.width,height:e.height,proxy:r.proxy,javascriptEnabled:r.javascriptEnabled,removeContainer:r.removeContainer,allowTaint:r.allowTaint,imageTimeout:r.imageTimeout/2})}).then(function(t){return o.image=t})}var i=t("./utils").getBounds,o=t("./proxy").loadUrlDocument;r.prototype.proxyLoad=function(t,e,n){var r=this.src;return o(r.src,t,r.ownerDocument,e.width,e.height,n)},e.exports=r},{"./core":4,"./proxy":16,"./utils":26}],9:[function(t,e,n){function r(t){this.src=t.value,this.colorStops=[],this.type=null,this.x0=.5,this.y0=.5,this.x1=.5,this.y1=.5,this.promise=Promise.resolve(!0)}r.TYPES={LINEAR:1,RADIAL:2},r.REGEXP_COLORSTOP=/^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i,e.exports=r},{}],10:[function(t,e,n){e.exports=function(t,e){this.src=t,this.image=new Image;var n=this;this.tainted=null,this.promise=new Promise(function(r,i){n.image.onload=r,n.image.onerror=i,e&&(n.image.crossOrigin="anonymous"),n.image.src=t,!0===n.image.complete&&r(n.image)})}},{}],11:[function(t,e,n){function r(t,e){this.link=null,this.options=t,this.support=e,this.origin=this.getOrigin(window.location.href)}var i=t("./log"),o=t("./imagecontainer"),a=t("./dummyimagecontainer"),s=t("./proxyimagecontainer"),c=t("./framecontainer"),l=t("./svgcontainer"),u=t("./svgnodecontainer"),h=t("./lineargradientcontainer"),f=t("./webkitgradientcontainer"),d=t("./utils").bind;r.prototype.findImages=function(t){var e=[];return t.reduce(function(t,e){switch(e.node.nodeName){case"IMG":return t.concat([{args:[e.node.src],method:"url"}]);case"svg":case"IFRAME":return t.concat([{args:[e.node],method:e.node.nodeName}])}return t},[]).forEach(this.addImage(e,this.loadImage),this),e},r.prototype.findBackgroundImage=function(t,e){return e.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(t,this.loadImage),this),t},r.prototype.addImage=function(t,e){return function(n){n.args.forEach(function(r){this.imageExists(t,r)||(t.splice(0,0,e.call(this,n)),i("Added image #"+t.length,"string"==typeof r?r.substring(0,100):r))},this)}},r.prototype.hasImageBackground=function(t){return"none"!==t.method},r.prototype.loadImage=function(t){if("url"===t.method){var e=t.args[0];return!this.isSVG(e)||this.support.svg||this.options.allowTaint?e.match(/data:image\/.*;base64,/i)?new o(e.replace(/url\(['"]{0,}|['"]{0,}\)$/gi,""),!1):this.isSameOrigin(e)||!0===this.options.allowTaint||this.isSVG(e)?new o(e,!1):this.support.cors&&!this.options.allowTaint&&this.options.useCORS?new o(e,!0):this.options.proxy?new s(e,this.options.proxy):new a(e):new l(e)}return"linear-gradient"===t.method?new h(t):"gradient"===t.method?new f(t):"svg"===t.method?new u(t.args[0],this.support.svg):"IFRAME"===t.method?new c(t.args[0],this.isSameOrigin(t.args[0].src),this.options):new a(t)},r.prototype.isSVG=function(t){return"svg"===t.substring(t.length-3).toLowerCase()||l.prototype.isInline(t)},r.prototype.imageExists=function(t,e){return t.some(function(t){return t.src===e})},r.prototype.isSameOrigin=function(t){return this.getOrigin(t)===this.origin},r.prototype.getOrigin=function(t){var e=this.link||(this.link=document.createElement("a"));return e.href=t,e.href=e.href,e.protocol+e.hostname+e.port},r.prototype.getPromise=function(t){return this.timeout(t,this.options.imageTimeout).catch(function(){return new a(t.src).promise.then(function(e){t.image=e})})},r.prototype.get=function(t){var e=null;return this.images.some(function(n){return(e=n).src===t})?e:null},r.prototype.fetch=function(t){return this.images=t.reduce(d(this.findBackgroundImage,this),this.findImages(t)),this.images.forEach(function(t,e){t.promise.then(function(){i("Succesfully loaded image #"+(e+1),t)},function(n){i("Failed loading image #"+(e+1),t,n)})}),this.ready=Promise.all(this.images.map(this.getPromise,this)),i("Finished searching images"),this},r.prototype.timeout=function(t,e){var n,r=Promise.race([t.promise,new Promise(function(r,o){n=setTimeout(function(){i("Timed out loading image",t),o(t)},e)})]).then(function(t){return clearTimeout(n),t});return r.catch(function(){clearTimeout(n)}),r},e.exports=r},{"./dummyimagecontainer":5,"./framecontainer":8,"./imagecontainer":10,"./lineargradientcontainer":12,"./log":13,"./proxyimagecontainer":17,"./svgcontainer":23,"./svgnodecontainer":24,"./utils":26,"./webkitgradientcontainer":27}],12:[function(t,e,n){function r(t){i.apply(this,arguments),this.type=i.TYPES.LINEAR;var e=r.REGEXP_DIRECTION.test(t.args[0])||!i.REGEXP_COLORSTOP.test(t.args[0]);e?t.args[0].split(/\s+/).reverse().forEach(function(t,e){switch(t){case"left":this.x0=0,this.x1=1;break;case"top":this.y0=0,this.y1=1;break;case"right":this.x0=1,this.x1=0;break;case"bottom":this.y0=1,this.y1=0;break;case"to":var n=this.y0,r=this.x0;this.y0=this.y1,this.x0=this.x1,this.x1=r,this.y1=n;break;case"center":break;default:var i=.01*parseFloat(t,10);if(isNaN(i))break;0===e?(this.y0=i,this.y1=1-this.y0):(this.x0=i,this.x1=1-this.x0)}},this):(this.y0=0,this.y1=1),this.colorStops=t.args.slice(e?1:0).map(function(t){var e=t.match(i.REGEXP_COLORSTOP),n=+e[2],r=0===n?"%":e[3];return{color:new o(e[1]),stop:"%"===r?n/100:null}}),null===this.colorStops[0].stop&&(this.colorStops[0].stop=0),null===this.colorStops[this.colorStops.length-1].stop&&(this.colorStops[this.colorStops.length-1].stop=1),this.colorStops.forEach(function(t,e){null===t.stop&&this.colorStops.slice(e).some(function(n,r){return null!==n.stop&&(t.stop=(n.stop-this.colorStops[e-1].stop)/(r+1)+this.colorStops[e-1].stop,!0)},this)},this)}var i=t("./gradientcontainer"),o=t("./color");r.prototype=Object.create(i.prototype),r.REGEXP_DIRECTION=/^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i,e.exports=r},{"./color":3,"./gradientcontainer":9}],13:[function(t,e,n){var r=function(){r.options.logging&&window.console&&window.console.log&&Function.prototype.bind.call(window.console.log,window.console).apply(window.console,[Date.now()-r.options.start+"ms","html2canvas:"].concat([].slice.call(arguments,0)))};r.options={logging:!1},e.exports=r},{}],14:[function(t,e,n){function r(t,e){this.node=t,this.parent=e,this.stack=null,this.bounds=null,this.borders=null,this.clip=[],this.backgroundClip=[],this.offsetBounds=null,this.visible=null,this.computedStyles=null,this.colors={},this.styles={},this.backgroundImages=null,this.transformData=null,this.transformMatrix=null,this.isPseudoElement=!1,this.opacity=null}function i(t){var e=t.options[t.selectedIndex||0];return e?e.text||"":""}function o(t){if(t&&"matrix"===t[1])return t[2].split(",").map(function(t){return parseFloat(t.trim())});if(t&&"matrix3d"===t[1]){var e=t[2].split(",").map(function(t){return parseFloat(t.trim())});return[e[0],e[1],e[4],e[5],e[12],e[13]]}}function a(t){return-1!==t.toString().indexOf("%")}function s(t){return t.replace("px","")}function c(t){return parseFloat(t)}var l=t("./color"),u=t("./utils"),h=u.getBounds,f=u.parseBackgrounds,d=u.offsetBounds;r.prototype.cloneTo=function(t){t.visible=this.visible,t.borders=this.borders,t.bounds=this.bounds,t.clip=this.clip,t.backgroundClip=this.backgroundClip,t.computedStyles=this.computedStyles,t.styles=this.styles,t.backgroundImages=this.backgroundImages,t.opacity=this.opacity},r.prototype.getOpacity=function(){return null===this.opacity?this.opacity=this.cssFloat("opacity"):this.opacity},r.prototype.assignStack=function(t){this.stack=t,t.children.push(this)},r.prototype.isElementVisible=function(){return this.node.nodeType===Node.TEXT_NODE?this.parent.visible:"none"!==this.css("display")&&"hidden"!==this.css("visibility")&&!this.node.hasAttribute("data-html2canvas-ignore")&&("INPUT"!==this.node.nodeName||"hidden"!==this.node.getAttribute("type"))},r.prototype.css=function(t){return this.computedStyles||(this.computedStyles=this.isPseudoElement?this.parent.computedStyle(this.before?":before":":after"):this.computedStyle(null)),this.styles[t]||(this.styles[t]=this.computedStyles[t])},r.prototype.prefixedCss=function(t){var e=["webkit","moz","ms","o"],n=this.css(t);return void 0===n&&e.some(function(e){return void 0!==(n=this.css(e+t.substr(0,1).toUpperCase()+t.substr(1)))},this),void 0===n?null:n},r.prototype.computedStyle=function(t){return this.node.ownerDocument.defaultView.getComputedStyle(this.node,t)},r.prototype.cssInt=function(t){var e=parseInt(this.css(t),10);return isNaN(e)?0:e},r.prototype.color=function(t){return this.colors[t]||(this.colors[t]=new l(this.css(t)))},r.prototype.cssFloat=function(t){var e=parseFloat(this.css(t));return isNaN(e)?0:e},r.prototype.fontWeight=function(){var t=this.css("fontWeight");switch(parseInt(t,10)){case 401:t="bold";break;case 400:t="normal"}return t},r.prototype.parseClip=function(){var t=this.css("clip").match(this.CLIP);return t?{top:parseInt(t[1],10),right:parseInt(t[2],10),bottom:parseInt(t[3],10),left:parseInt(t[4],10)}:null},r.prototype.parseBackgroundImages=function(){return this.backgroundImages||(this.backgroundImages=f(this.css("backgroundImage")))},r.prototype.cssList=function(t,e){var n=(this.css(t)||"").split(",");return n=n[e||0]||n[0]||"auto",1===(n=n.trim().split(" ")).length&&(n=[n[0],a(n[0])?"auto":n[0]]),n},r.prototype.parseBackgroundSize=function(t,e,n){var r,i,o=this.cssList("backgroundSize",n);if(a(o[0]))r=t.width*parseFloat(o[0])/100;else{if(/contain|cover/.test(o[0])){var s=t.width/t.height,c=e.width/e.height;return s<c^"contain"===o[0]?{width:t.height*c,height:t.height}:{width:t.width,height:t.width/c}}r=parseInt(o[0],10)}return i="auto"===o[0]&&"auto"===o[1]?e.height:"auto"===o[1]?r/e.width*e.height:a(o[1])?t.height*parseFloat(o[1])/100:parseInt(o[1],10),"auto"===o[0]&&(r=i/e.height*e.width),{width:r,height:i}},r.prototype.parseBackgroundPosition=function(t,e,n,r){var i,o,s=this.cssList("backgroundPosition",n);return i=a(s[0])?(t.width-(r||e).width)*(parseFloat(s[0])/100):parseInt(s[0],10),o="auto"===s[1]?i/e.width*e.height:a(s[1])?(t.height-(r||e).height)*parseFloat(s[1])/100:parseInt(s[1],10),"auto"===s[0]&&(i=o/e.height*e.width),{left:i,top:o}},r.prototype.parseBackgroundRepeat=function(t){return this.cssList("backgroundRepeat",t)[0]},r.prototype.parseTextShadows=function(){var t=this.css("textShadow"),e=[];if(t&&"none"!==t)for(var n=t.match(this.TEXT_SHADOW_PROPERTY),r=0;n&&r<n.length;r++){var i=n[r].match(this.TEXT_SHADOW_VALUES);e.push({color:new l(i[0]),offsetX:i[1]?parseFloat(i[1].replace("px","")):0,offsetY:i[2]?parseFloat(i[2].replace("px","")):0,blur:i[3]?i[3].replace("px",""):0})}return e},r.prototype.parseTransform=function(){if(!this.transformData)if(this.hasTransform()){var t=this.parseBounds(),e=this.prefixedCss("transformOrigin").split(" ").map(s).map(c);e[0]+=t.left,e[1]+=t.top,this.transformData={origin:e,matrix:this.parseTransformMatrix()}}else this.transformData={origin:[0,0],matrix:[1,0,0,1,0,0]};return this.transformData},r.prototype.parseTransformMatrix=function(){if(!this.transformMatrix){var t=this.prefixedCss("transform"),e=t?o(t.match(this.MATRIX_PROPERTY)):null;this.transformMatrix=e||[1,0,0,1,0,0]}return this.transformMatrix},r.prototype.parseBounds=function(){return this.bounds||(this.bounds=this.hasTransform()?d(this.node):h(this.node))},r.prototype.hasTransform=function(){return"1,0,0,1,0,0"!==this.parseTransformMatrix().join(",")||this.parent&&this.parent.hasTransform()},r.prototype.getValue=function(){var t=this.node.value||"";return"SELECT"===this.node.tagName?t=i(this.node):"password"===this.node.type&&(t=Array(t.length+1).join("•")),0===t.length?this.node.placeholder||"":t},r.prototype.MATRIX_PROPERTY=/(matrix|matrix3d)\((.+)\)/,r.prototype.TEXT_SHADOW_PROPERTY=/((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g,r.prototype.TEXT_SHADOW_VALUES=/(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g,r.prototype.CLIP=/^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/,e.exports=r},{"./color":3,"./utils":26}],15:[function(t,e,n){function r(t,e,n,r,i){L("Starting NodeParser"),this.renderer=e,this.options=i,this.range=null,this.support=n,this.renderQueue=[],this.stack=new G(!0,1,t.ownerDocument,null);var o=new U(t,null);if(i.background&&e.rectangle(0,0,e.width,e.height,new V(i.background)),t===t.ownerDocument.documentElement){var a=new U(o.color("backgroundColor").isTransparent()?t.ownerDocument.body:t.ownerDocument.documentElement,null);e.rectangle(0,0,e.width,e.height,a.color("backgroundColor"))}o.visibile=o.isElementVisible(),this.createPseudoHideStyles(t.ownerDocument),this.disableAnimations(t.ownerDocument),this.nodes=R([o].concat(this.getChildren(o)).filter(function(t){return t.visible=t.isElementVisible()}).map(this.getPseudoElements,this)),this.fontMetrics=new X,L("Fetched nodes, total:",this.nodes.length),L("Calculate overflow clips"),this.calculateOverflowClips(),L("Start fetching images"),this.images=r.fetch(this.nodes.filter(q)),this.ready=this.images.ready.then(J(function(){return L("Images loaded, starting parsing"),L("Creating stacking contexts"),this.createStackingContexts(),L("Sorting stacking contexts"),this.sortStackingContexts(this.stack),this.parse(this.stack),L("Render queue created with "+this.renderQueue.length+" items"),new Promise(J(function(t){i.async?"function"==typeof i.async?i.async.call(this,this.renderQueue,t):this.renderQueue.length>0?(this.renderIndex=0,this.asyncRenderer(this.renderQueue,t)):t():(this.renderQueue.forEach(this.paint,this),t())},this))},this))}function i(t){return t.parent&&t.parent.clip.length}function o(t){return t.replace(/(\-[a-z])/g,function(t){return t.toUpperCase().replace("-","")})}function a(){}function s(t,e,n,r){return t.map(function(i,o){if(i.width>0){var a=e.left,s=e.top,c=e.width,l=e.height-t[2].width;switch(o){case 0:l=t[0].width,i.args=h({c1:[a,s],c2:[a+c,s],c3:[a+c-t[1].width,s+l],c4:[a+t[3].width,s+l]},r[0],r[1],n.topLeftOuter,n.topLeftInner,n.topRightOuter,n.topRightInner);break;case 1:a=e.left+e.width-t[1].width,c=t[1].width,i.args=h({c1:[a+c,s],c2:[a+c,s+l+t[2].width],c3:[a,s+l],c4:[a,s+t[0].width]},r[1],r[2],n.topRightOuter,n.topRightInner,n.bottomRightOuter,n.bottomRightInner);break;case 2:s=s+e.height-t[2].width,l=t[2].width,i.args=h({c1:[a+c,s+l],c2:[a,s+l],c3:[a+t[3].width,s],c4:[a+c-t[3].width,s]},r[2],r[3],n.bottomRightOuter,n.bottomRightInner,n.bottomLeftOuter,n.bottomLeftInner);break;case 3:c=t[3].width,i.args=h({c1:[a,s+l+t[2].width],c2:[a,s],c3:[a+c,s+t[0].width],c4:[a+c,s+l]},r[3],r[0],n.bottomLeftOuter,n.bottomLeftInner,n.topLeftOuter,n.topLeftInner)}}return i})}function c(t,e,n,r){var i=(Math.sqrt(2)-1)/3*4,o=n*i,a=r*i,s=t+n,c=e+r;return{topLeft:u({x:t,y:c},{x:t,y:c-a},{x:s-o,y:e},{x:s,y:e}),topRight:u({x:t,y:e},{x:t+o,y:e},{x:s,y:c-a},{x:s,y:c}),bottomRight:u({x:s,y:e},{x:s,y:e+a},{x:t+o,y:c},{x:t,y:c}),bottomLeft:u({x:s,y:c},{x:s-o,y:c},{x:t,y:e+a},{x:t,y:e})}}function l(t,e,n){var r=t.left,i=t.top,o=t.width,a=t.height,s=e[0][0]<o/2?e[0][0]:o/2,l=e[0][1]<a/2?e[0][1]:a/2,u=e[1][0]<o/2?e[1][0]:o/2,h=e[1][1]<a/2?e[1][1]:a/2,f=e[2][0]<o/2?e[2][0]:o/2,d=e[2][1]<a/2?e[2][1]:a/2,p=e[3][0]<o/2?e[3][0]:o/2,m=e[3][1]<a/2?e[3][1]:a/2,g=o-u,w=a-d,y=o-f,v=a-m;return{topLeftOuter:c(r,i,s,l).topLeft.subdivide(.5),topLeftInner:c(r+n[3].width,i+n[0].width,Math.max(0,s-n[3].width),Math.max(0,l-n[0].width)).topLeft.subdivide(.5),topRightOuter:c(r+g,i,u,h).topRight.subdivide(.5),topRightInner:c(r+Math.min(g,o+n[3].width),i+n[0].width,g>o+n[3].width?0:u-n[3].width,h-n[0].width).topRight.subdivide(.5),bottomRightOuter:c(r+y,i+w,f,d).bottomRight.subdivide(.5),bottomRightInner:c(r+Math.min(y,o-n[3].width),i+Math.min(w,a+n[0].width),Math.max(0,f-n[1].width),d-n[2].width).bottomRight.subdivide(.5),bottomLeftOuter:c(r,i+v,p,m).bottomLeft.subdivide(.5),bottomLeftInner:c(r+n[3].width,i+v,Math.max(0,p-n[3].width),m-n[2].width).bottomLeft.subdivide(.5)}}function u(t,e,n,r){var i=function(t,e,n){return{x:t.x+(e.x-t.x)*n,y:t.y+(e.y-t.y)*n}};return{start:t,startControl:e,endControl:n,end:r,subdivide:function(o){var a=i(t,e,o),s=i(e,n,o),c=i(n,r,o),l=i(a,s,o),h=i(s,c,o),f=i(l,h,o);return[u(t,a,l,f),u(f,h,c,r)]},curveTo:function(t){t.push(["bezierCurve",e.x,e.y,n.x,n.y,r.x,r.y])},curveToReversed:function(r){r.push(["bezierCurve",n.x,n.y,e.x,e.y,t.x,t.y])}}}function h(t,e,n,r,i,o,a){var s=[];return e[0]>0||e[1]>0?(s.push(["line",r[1].start.x,r[1].start.y]),r[1].curveTo(s)):s.push(["line",t.c1[0],t.c1[1]]),n[0]>0||n[1]>0?(s.push(["line",o[0].start.x,o[0].start.y]),o[0].curveTo(s),s.push(["line",a[0].end.x,a[0].end.y]),a[0].curveToReversed(s)):(s.push(["line",t.c2[0],t.c2[1]]),s.push(["line",t.c3[0],t.c3[1]])),e[0]>0||e[1]>0?(s.push(["line",i[1].end.x,i[1].end.y]),i[1].curveToReversed(s)):s.push(["line",t.c4[0],t.c4[1]]),s}function f(t,e,n,r,i,o,a){e[0]>0||e[1]>0?(t.push(["line",r[0].start.x,r[0].start.y]),r[0].curveTo(t),r[1].curveTo(t)):t.push(["line",o,a]),(n[0]>0||n[1]>0)&&t.push(["line",i[0].start.x,i[0].start.y])}function d(t){return t.cssInt("zIndex")<0}function p(t){return t.cssInt("zIndex")>0}function m(t){return 0===t.cssInt("zIndex")}function g(t){return-1!==["inline","inline-block","inline-table"].indexOf(t.css("display"))}function w(t){return t instanceof G}function y(t){return t.node.data.trim().length>0}function v(t){return/^(normal|none|0px)$/.test(t.parent.css("letterSpacing"))}function b(t){return["TopLeft","TopRight","BottomRight","BottomLeft"].map(function(e){var n=t.css("border"+e+"Radius").split(" ");return n.length<=1&&(n[1]=n[0]),n.map(O)})}function x(t){return t.nodeType===Node.TEXT_NODE||t.nodeType===Node.ELEMENT_NODE}function k(t){var e=t.css("position");return"auto"!==(-1!==["absolute","relative","fixed"].indexOf(e)?t.css("zIndex"):"auto")}function _(t){return"static"!==t.css("position")}function C(t){return"none"!==t.css("float")}function A(t){return-1!==["inline-block","inline-table"].indexOf(t.css("display"))}function S(t){var e=this;return function(){return!t.apply(e,arguments)}}function q(t){return t.node.nodeType===Node.ELEMENT_NODE}function T(t){return!0===t.isPseudoElement}function P(t){return t.node.nodeType===Node.TEXT_NODE}function I(t){return function(e,n){return e.cssInt("zIndex")+t.indexOf(e)/t.length-(n.cssInt("zIndex")+t.indexOf(n)/t.length)}}function E(t){return t.getOpacity()<1}function O(t){return parseInt(t,10)}function F(t){return t.width}function B(t){return t.node.nodeType!==Node.ELEMENT_NODE||-1===["SCRIPT","HEAD","TITLE","OBJECT","BR","OPTION"].indexOf(t.node.nodeName)}function R(t){return[].concat.apply([],t)}function D(t){var e=t.substr(0,1);return e===t.substr(t.length-1)&&e.match(/'|"/)?t.substr(1,t.length-2):t}function j(t){for(var e,n=[],r=0,i=!1;t.length;)z(t[r])===i?((e=t.splice(0,r)).length&&n.push(M.ucs2.encode(e)),i=!i,r=0):r++,r>=t.length&&(e=t.splice(0,r)).length&&n.push(M.ucs2.encode(e));return n}function z(t){return-1!==[32,13,10,9,45].indexOf(t)}function N(t){return/[^\u0000-\u00ff]/.test(t)}var L=t("./log"),M=t("punycode"),U=t("./nodecontainer"),H=t("./textcontainer"),W=t("./pseudoelementcontainer"),X=t("./fontmetrics"),V=t("./color"),G=t("./stackingcontext"),Y=t("./utils"),J=Y.bind,Q=Y.getBounds,K=Y.parseBackgrounds,$=Y.offsetBounds;r.prototype.calculateOverflowClips=function(){this.nodes.forEach(function(t){if(q(t)){T(t)&&t.appendToDOM(),t.borders=this.parseBorders(t);var e="hidden"===t.css("overflow")?[t.borders.clip]:[],n=t.parseClip();n&&-1!==["absolute","fixed"].indexOf(t.css("position"))&&e.push([["rect",t.bounds.left+n.left,t.bounds.top+n.top,n.right-n.left,n.bottom-n.top]]),t.clip=i(t)?t.parent.clip.concat(e):e,t.backgroundClip="hidden"!==t.css("overflow")?t.clip.concat([t.borders.clip]):t.clip,T(t)&&t.cleanDOM()}else P(t)&&(t.clip=i(t)?t.parent.clip:[]);T(t)||(t.bounds=null)},this)},r.prototype.asyncRenderer=function(t,e,n){n=n||Date.now(),this.paint(t[this.renderIndex++]),t.length===this.renderIndex?e():n+20>Date.now()?this.asyncRenderer(t,e,n):setTimeout(J(function(){this.asyncRenderer(t,e)},this),0)},r.prototype.createPseudoHideStyles=function(t){this.createStyles(t,"."+W.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE+':before { content: "" !important; display: none !important; }.'+W.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER+':after { content: "" !important; display: none !important; }')},r.prototype.disableAnimations=function(t){this.createStyles(t,"* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}")},r.prototype.createStyles=function(t,e){var n=t.createElement("style");n.innerHTML=e,t.body.appendChild(n)},r.prototype.getPseudoElements=function(t){var e=[[t]];if(t.node.nodeType===Node.ELEMENT_NODE){var n=this.getPseudoElement(t,":before"),r=this.getPseudoElement(t,":after");n&&e.push(n),r&&e.push(r)}return R(e)},r.prototype.getPseudoElement=function(t,e){var n=t.computedStyle(e);if(!n||!n.content||"none"===n.content||"-moz-alt-content"===n.content||"none"===n.display)return null;for(var r=D(n.content),i="url"===r.substr(0,3),a=document.createElement(i?"img":"html2canvaspseudoelement"),s=new W(a,t,e),c=n.length-1;c>=0;c--){var l=o(n.item(c));a.style[l]=n[l]}if(a.className=W.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE+" "+W.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER,i)return a.src=K(r)[0].args[0],[s];var u=document.createTextNode(r);return a.appendChild(u),[s,new H(u,s)]},r.prototype.getChildren=function(t){return R([].filter.call(t.node.childNodes,x).map(function(e){var n=[e.nodeType===Node.TEXT_NODE?new H(e,t):new U(e,t)].filter(B);return e.nodeType===Node.ELEMENT_NODE&&n.length&&"TEXTAREA"!==e.tagName?n[0].isElementVisible()?n.concat(this.getChildren(n[0])):[]:n},this))},r.prototype.newStackingContext=function(t,e){var n=new G(e,t.getOpacity(),t.node,t.parent);t.cloneTo(n),(e?n.getParentStack(this):n.parent.stack).contexts.push(n),t.stack=n},r.prototype.createStackingContexts=function(){this.nodes.forEach(function(t){q(t)&&(this.isRootElement(t)||E(t)||k(t)||this.isBodyWithTransparentRoot(t)||t.hasTransform())?this.newStackingContext(t,!0):q(t)&&(_(t)&&m(t)||A(t)||C(t))?this.newStackingContext(t,!1):t.assignStack(t.parent.stack)},this)},r.prototype.isBodyWithTransparentRoot=function(t){return"BODY"===t.node.nodeName&&t.parent.color("backgroundColor").isTransparent()},r.prototype.isRootElement=function(t){return null===t.parent},r.prototype.sortStackingContexts=function(t){t.contexts.sort(I(t.contexts.slice(0))),t.contexts.forEach(this.sortStackingContexts,this)},r.prototype.parseTextBounds=function(t){return function(e,n,r){if("none"!==t.parent.css("textDecoration").substr(0,4)||0!==e.trim().length){if(this.support.rangeBounds&&!t.parent.hasTransform()){var i=r.slice(0,n).join("").length;return this.getRangeBounds(t.node,i,e.length)}if(t.node&&"string"==typeof t.node.data){var o=t.node.splitText(e.length),a=this.getWrapperBounds(t.node,t.parent.hasTransform());return t.node=o,a}}else this.support.rangeBounds&&!t.parent.hasTransform()||(t.node=t.node.splitText(e.length));return{}}},r.prototype.getWrapperBounds=function(t,e){var n=t.ownerDocument.createElement("html2canvaswrapper"),r=t.parentNode,i=t.cloneNode(!0);n.appendChild(t.cloneNode(!0)),r.replaceChild(n,t);var o=e?$(n):Q(n);return r.replaceChild(i,n),o},r.prototype.getRangeBounds=function(t,e,n){var r=this.range||(this.range=t.ownerDocument.createRange());return r.setStart(t,e),r.setEnd(t,e+n),r.getBoundingClientRect()},r.prototype.parse=function(t){var e=t.contexts.filter(d),n=t.children.filter(q),r=n.filter(S(C)),i=r.filter(S(_)).filter(S(g)),o=n.filter(S(_)).filter(C),s=r.filter(S(_)).filter(g),c=t.contexts.concat(r.filter(_)).filter(m),l=t.children.filter(P).filter(y),u=t.contexts.filter(p);e.concat(i).concat(o).concat(s).concat(c).concat(l).concat(u).forEach(function(t){this.renderQueue.push(t),w(t)&&(this.parse(t),this.renderQueue.push(new a))},this)},r.prototype.paint=function(t){try{t instanceof a?this.renderer.ctx.restore():P(t)?(T(t.parent)&&t.parent.appendToDOM(),this.paintText(t),T(t.parent)&&t.parent.cleanDOM()):this.paintNode(t)}catch(t){if(L(t),this.options.strict)throw t}},r.prototype.paintNode=function(t){w(t)&&(this.renderer.setOpacity(t.opacity),this.renderer.ctx.save(),t.hasTransform()&&this.renderer.setTransform(t.parseTransform())),"INPUT"===t.node.nodeName&&"checkbox"===t.node.type?this.paintCheckbox(t):"INPUT"===t.node.nodeName&&"radio"===t.node.type?this.paintRadio(t):this.paintElement(t)},r.prototype.paintElement=function(t){var e=t.parseBounds();this.renderer.clip(t.backgroundClip,function(){this.renderer.renderBackground(t,e,t.borders.borders.map(F))},this),this.renderer.clip(t.clip,function(){this.renderer.renderBorders(t.borders.borders)},this),this.renderer.clip(t.backgroundClip,function(){switch(t.node.nodeName){case"svg":case"IFRAME":var n=this.images.get(t.node);n?this.renderer.renderImage(t,e,t.borders,n):L("Error loading <"+t.node.nodeName+">",t.node);break;case"IMG":var r=this.images.get(t.node.src);r?this.renderer.renderImage(t,e,t.borders,r):L("Error loading <img>",t.node.src);break;case"CANVAS":this.renderer.renderImage(t,e,t.borders,{image:t.node});break;case"SELECT":case"INPUT":case"TEXTAREA":this.paintFormValue(t)}},this)},r.prototype.paintCheckbox=function(t){var e=t.parseBounds(),n=Math.min(e.width,e.height),r={width:n-1,height:n-1,top:e.top,left:e.left},i=[3,3],o=[i,i,i,i],a=[1,1,1,1].map(function(t){return{color:new V("#A5A5A5"),width:t}}),c=l(r,o,a);this.renderer.clip(t.backgroundClip,function(){this.renderer.rectangle(r.left+1,r.top+1,r.width-2,r.height-2,new V("#DEDEDE")),this.renderer.renderBorders(s(a,r,c,o)),t.node.checked&&(this.renderer.font(new V("#424242"),"normal","normal","bold",n-3+"px","arial"),this.renderer.text("✔",r.left+n/6,r.top+n-1))},this)},r.prototype.paintRadio=function(t){var e=t.parseBounds(),n=Math.min(e.width,e.height)-2;this.renderer.clip(t.backgroundClip,function(){this.renderer.circleStroke(e.left+1,e.top+1,n,new V("#DEDEDE"),1,new V("#A5A5A5")),t.node.checked&&this.renderer.circle(Math.ceil(e.left+n/4)+1,Math.ceil(e.top+n/4)+1,Math.floor(n/2),new V("#424242"))},this)},r.prototype.paintFormValue=function(t){var e=t.getValue();if(e.length>0){var n=t.node.ownerDocument,r=n.createElement("html2canvaswrapper");["lineHeight","textAlign","fontFamily","fontWeight","fontSize","color","paddingLeft","paddingTop","paddingRight","paddingBottom","width","height","borderLeftStyle","borderTopStyle","borderLeftWidth","borderTopWidth","boxSizing","whiteSpace","wordWrap"].forEach(function(e){try{r.style[e]=t.css(e)}catch(t){L("html2canvas: Parse: Exception caught in renderFormValue: "+t.message)}});var i=t.parseBounds();r.style.position="fixed",r.style.left=i.left+"px",r.style.top=i.top+"px",r.textContent=e,n.body.appendChild(r),this.paintText(new H(r.firstChild,t)),n.body.removeChild(r)}},r.prototype.paintText=function(t){t.applyTextTransform();var e=M.ucs2.decode(t.node.data),n=this.options.letterRendering&&!v(t)||N(t.node.data)?e.map(function(t){return M.ucs2.encode([t])}):j(e),r=t.parent.fontWeight(),i=t.parent.css("fontSize"),o=t.parent.css("fontFamily"),a=t.parent.parseTextShadows();this.renderer.font(t.parent.color("color"),t.parent.css("fontStyle"),t.parent.css("fontVariant"),r,i,o),a.length?this.renderer.fontShadow(a[0].color,a[0].offsetX,a[0].offsetY,a[0].blur):this.renderer.clearShadow(),this.renderer.clip(t.parent.clip,function(){n.map(this.parseTextBounds(t),this).forEach(function(e,r){e&&(this.renderer.text(n[r],e.left,e.bottom),this.renderTextDecoration(t.parent,e,this.fontMetrics.getMetrics(o,i)))},this)},this)},r.prototype.renderTextDecoration=function(t,e,n){switch(t.css("textDecoration").split(" ")[0]){case"underline":this.renderer.rectangle(e.left,Math.round(e.top+n.baseline+n.lineWidth),e.width,1,t.color("color"));break;case"overline":this.renderer.rectangle(e.left,Math.round(e.top),e.width,1,t.color("color"));break;case"line-through":this.renderer.rectangle(e.left,Math.ceil(e.top+n.middle+n.lineWidth),e.width,1,t.color("color"))}};var Z={inset:[["darken",.6],["darken",.1],["darken",.1],["darken",.6]]};r.prototype.parseBorders=function(t){var e=t.parseBounds(),n=b(t),r=["Top","Right","Bottom","Left"].map(function(e,n){var r=t.css("border"+e+"Style"),i=t.color("border"+e+"Color");"inset"===r&&i.isBlack()&&(i=new V([255,255,255,i.a]));var o=Z[r]?Z[r][n]:null;return{width:t.cssInt("border"+e+"Width"),color:o?i[o[0]](o[1]):i,args:null}}),i=l(e,n,r);return{clip:this.parseBackgroundClip(t,i,r,n,e),borders:s(r,e,i,n)}},r.prototype.parseBackgroundClip=function(t,e,n,r,i){var o=[];switch(t.css("backgroundClip")){case"content-box":case"padding-box":f(o,r[0],r[1],e.topLeftInner,e.topRightInner,i.left+n[3].width,i.top+n[0].width),f(o,r[1],r[2],e.topRightInner,e.bottomRightInner,i.left+i.width-n[1].width,i.top+n[0].width),f(o,r[2],r[3],e.bottomRightInner,e.bottomLeftInner,i.left+i.width-n[1].width,i.top+i.height-n[2].width),f(o,r[3],r[0],e.bottomLeftInner,e.topLeftInner,i.left+n[3].width,i.top+i.height-n[2].width);break;default:f(o,r[0],r[1],e.topLeftOuter,e.topRightOuter,i.left,i.top),f(o,r[1],r[2],e.topRightOuter,e.bottomRightOuter,i.left+i.width,i.top),f(o,r[2],r[3],e.bottomRightOuter,e.bottomLeftOuter,i.left+i.width,i.top+i.height),f(o,r[3],r[0],e.bottomLeftOuter,e.topLeftOuter,i.left,i.top+i.height)}return o},e.exports=r},{"./color":3,"./fontmetrics":7,"./log":13,"./nodecontainer":14,"./pseudoelementcontainer":18,"./stackingcontext":21,"./textcontainer":25,"./utils":26,punycode:1}],16:[function(t,e,n){function r(t,e,n){var r="withCredentials"in new XMLHttpRequest;if(!e)return Promise.reject("No proxy configured");var s=o(r),l=a(e,t,s);return r?c(l):i(n,l,s).then(function(t){return f(t.content)})}function i(t,e,n){return new Promise(function(r,i){var o=t.createElement("script"),a=function(){delete window.html2canvas.proxy[n],t.body.removeChild(o)};window.html2canvas.proxy[n]=function(t){a(),r(t)},o.src=e,o.onerror=function(t){a(),i(t)},t.body.appendChild(o)})}function o(t){return t?"":"html2canvas_"+Date.now()+"_"+ ++d+"_"+Math.round(1e5*Math.random())}function a(t,e,n){return t+"?url="+encodeURIComponent(e)+(n.length?"&callback=html2canvas.proxy."+n:"")}function s(t){return function(e){var n,r=new DOMParser;try{n=r.parseFromString(e,"text/html")}catch(t){u("DOMParser not supported, falling back to createHTMLDocument"),n=document.implementation.createHTMLDocument("");try{n.open(),n.write(e),n.close()}catch(t){u("createHTMLDocument write not supported, falling back to document.body.innerHTML"),n.body.innerHTML=e}}var i=n.querySelector("base");if(!i||!i.href.host){var o=n.createElement("base");o.href=t,n.head.insertBefore(o,n.head.firstChild)}return n}}var c=t("./xhr"),l=t("./utils"),u=t("./log"),h=t("./clone"),f=l.decode64,d=0;n.Proxy=r,n.ProxyURL=function(t,e,n){var r="crossOrigin"in new Image,s=o(r),c=a(e,t,s);return r?Promise.resolve(c):i(n,c,s).then(function(t){return"data:"+t.type+";base64,"+t.content})},n.loadUrlDocument=function(t,e,n,i,o,a){return new r(t,e,window.document).then(s(t)).then(function(t){return h(t,n,i,o,a,0,0)})}},{"./clone":2,"./log":13,"./utils":26,"./xhr":28}],17:[function(t,e,n){var r=t("./proxy").ProxyURL;e.exports=function(t,e){var n=document.createElement("a");n.href=t,t=n.href,this.src=t,this.image=new Image;var i=this;this.promise=new Promise(function(n,o){i.image.crossOrigin="Anonymous",i.image.onload=n,i.image.onerror=o,new r(t,e,document).then(function(t){i.image.src=t}).catch(o)})}},{"./proxy":16}],18:[function(t,e,n){function r(t,e,n){i.call(this,t,e),this.isPseudoElement=!0,this.before=":before"===n}var i=t("./nodecontainer");r.prototype.cloneTo=function(t){r.prototype.cloneTo.call(this,t),t.isPseudoElement=!0,t.before=this.before},(r.prototype=Object.create(i.prototype)).appendToDOM=function(){this.before?this.parent.node.insertBefore(this.node,this.parent.node.firstChild):this.parent.node.appendChild(this.node),this.parent.node.className+=" "+this.getHideClass()},r.prototype.cleanDOM=function(){this.node.parentNode.removeChild(this.node),this.parent.node.className=this.parent.node.className.replace(this.getHideClass(),"")},r.prototype.getHideClass=function(){return this["PSEUDO_HIDE_ELEMENT_CLASS_"+(this.before?"BEFORE":"AFTER")]},r.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE="___html2canvas___pseudoelement_before",r.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER="___html2canvas___pseudoelement_after",e.exports=r},{"./nodecontainer":14}],19:[function(t,e,n){function r(t,e,n,r,i){this.width=t,this.height=e,this.images=n,this.options=r,this.document=i}var i=t("./log");r.prototype.renderImage=function(t,e,n,r){var i=t.cssInt("paddingLeft"),o=t.cssInt("paddingTop"),a=t.cssInt("paddingRight"),s=t.cssInt("paddingBottom"),c=n.borders,l=e.width-(c[1].width+c[3].width+i+a),u=e.height-(c[0].width+c[2].width+o+s);this.drawImage(r,0,0,r.image.width||l,r.image.height||u,e.left+i+c[3].width,e.top+o+c[0].width,l,u)},r.prototype.renderBackground=function(t,e,n){e.height>0&&e.width>0&&(this.renderBackgroundColor(t,e),this.renderBackgroundImage(t,e,n))},r.prototype.renderBackgroundColor=function(t,e){var n=t.color("backgroundColor");n.isTransparent()||this.rectangle(e.left,e.top,e.width,e.height,n)},r.prototype.renderBorders=function(t){t.forEach(this.renderBorder,this)},r.prototype.renderBorder=function(t){t.color.isTransparent()||null===t.args||this.drawShape(t.args,t.color)},r.prototype.renderBackgroundImage=function(t,e,n){t.parseBackgroundImages().reverse().forEach(function(r,o,a){switch(r.method){case"url":var s=this.images.get(r.args[0]);s?this.renderBackgroundRepeating(t,e,s,a.length-(o+1),n):i("Error loading background-image",r.args[0]);break;case"linear-gradient":case"gradient":var c=this.images.get(r.value);c?this.renderBackgroundGradient(c,e,n):i("Error loading background-image",r.args[0]);break;case"none":break;default:i("Unknown background-image type",r.args[0])}},this)},r.prototype.renderBackgroundRepeating=function(t,e,n,r,i){var o=t.parseBackgroundSize(e,n.image,r),a=t.parseBackgroundPosition(e,n.image,r,o);switch(t.parseBackgroundRepeat(r)){case"repeat-x":case"repeat no-repeat":this.backgroundRepeatShape(n,a,o,e,e.left+i[3],e.top+a.top+i[0],99999,o.height,i);break;case"repeat-y":case"no-repeat repeat":this.backgroundRepeatShape(n,a,o,e,e.left+a.left+i[3],e.top+i[0],o.width,99999,i);break;case"no-repeat":this.backgroundRepeatShape(n,a,o,e,e.left+a.left+i[3],e.top+a.top+i[0],o.width,o.height,i);break;default:this.renderBackgroundRepeat(n,a,o,{top:e.top,left:e.left},i[3],i[0])}},e.exports=r},{"./log":13}],20:[function(t,e,n){function r(t,e){o.apply(this,arguments),this.canvas=this.options.canvas||this.document.createElement("canvas"),this.options.canvas||(this.canvas.width=t,this.canvas.height=e),this.ctx=this.canvas.getContext("2d"),this.taintCtx=this.document.createElement("canvas").getContext("2d"),this.ctx.textBaseline="bottom",this.variables={},s("Initialized CanvasRenderer with size",t,"x",e)}function i(t){return t.length>0}var o=t("../renderer"),a=t("../lineargradientcontainer"),s=t("../log");(r.prototype=Object.create(o.prototype)).setFillStyle=function(t){return this.ctx.fillStyle="object"==typeof t&&t.isColor?t.toString():t,this.ctx},r.prototype.rectangle=function(t,e,n,r,i){this.setFillStyle(i).fillRect(t,e,n,r)},r.prototype.circle=function(t,e,n,r){this.setFillStyle(r),this.ctx.beginPath(),this.ctx.arc(t+n/2,e+n/2,n/2,0,2*Math.PI,!0),this.ctx.closePath(),this.ctx.fill()},r.prototype.circleStroke=function(t,e,n,r,i,o){this.circle(t,e,n,r),this.ctx.strokeStyle=o.toString(),this.ctx.stroke()},r.prototype.drawShape=function(t,e){this.shape(t),this.setFillStyle(e).fill()},r.prototype.taints=function(t){if(null===t.tainted){this.taintCtx.drawImage(t.image,0,0);try{this.taintCtx.getImageData(0,0,1,1),t.tainted=!1}catch(e){this.taintCtx=document.createElement("canvas").getContext("2d"),t.tainted=!0}}return t.tainted},r.prototype.drawImage=function(t,e,n,r,i,o,a,s,c){this.taints(t)&&!this.options.allowTaint||this.ctx.drawImage(t.image,e,n,r,i,o,a,s,c)},r.prototype.clip=function(t,e,n){this.ctx.save(),t.filter(i).forEach(function(t){this.shape(t).clip()},this),e.call(n),this.ctx.restore()},r.prototype.shape=function(t){return this.ctx.beginPath(),t.forEach(function(t,e){"rect"===t[0]?this.ctx.rect.apply(this.ctx,t.slice(1)):this.ctx[0===e?"moveTo":t[0]+"To"].apply(this.ctx,t.slice(1))},this),this.ctx.closePath(),this.ctx},r.prototype.font=function(t,e,n,r,i,o){this.setFillStyle(t).font=[e,n,r,i,o].join(" ").split(",")[0]},r.prototype.fontShadow=function(t,e,n,r){this.setVariable("shadowColor",t.toString()).setVariable("shadowOffsetY",e).setVariable("shadowOffsetX",n).setVariable("shadowBlur",r)},r.prototype.clearShadow=function(){this.setVariable("shadowColor","rgba(0,0,0,0)")},r.prototype.setOpacity=function(t){this.ctx.globalAlpha=t},r.prototype.setTransform=function(t){this.ctx.translate(t.origin[0],t.origin[1]),this.ctx.transform.apply(this.ctx,t.matrix),this.ctx.translate(-t.origin[0],-t.origin[1])},r.prototype.setVariable=function(t,e){return this.variables[t]!==e&&(this.variables[t]=this.ctx[t]=e),this},r.prototype.text=function(t,e,n){this.ctx.fillText(t,e,n)},r.prototype.backgroundRepeatShape=function(t,e,n,r,i,o,a,s,c){var l=[["line",Math.round(i),Math.round(o)],["line",Math.round(i+a),Math.round(o)],["line",Math.round(i+a),Math.round(s+o)],["line",Math.round(i),Math.round(s+o)]];this.clip([l],function(){this.renderBackgroundRepeat(t,e,n,r,c[3],c[0])},this)},r.prototype.renderBackgroundRepeat=function(t,e,n,r,i,o){var a=Math.round(r.left+e.left+i),s=Math.round(r.top+e.top+o);this.setFillStyle(this.ctx.createPattern(this.resizeImage(t,n),"repeat")),this.ctx.translate(a,s),this.ctx.fill(),this.ctx.translate(-a,-s)},r.prototype.renderBackgroundGradient=function(t,e){if(t instanceof a){var n=this.ctx.createLinearGradient(e.left+e.width*t.x0,e.top+e.height*t.y0,e.left+e.width*t.x1,e.top+e.height*t.y1);t.colorStops.forEach(function(t){n.addColorStop(t.stop,t.color.toString())}),this.rectangle(e.left,e.top,e.width,e.height,n)}},r.prototype.resizeImage=function(t,e){var n=t.image;if(n.width===e.width&&n.height===e.height)return n;var r=document.createElement("canvas");return r.width=e.width,r.height=e.height,r.getContext("2d").drawImage(n,0,0,n.width,n.height,0,0,e.width,e.height),r},e.exports=r},{"../lineargradientcontainer":12,"../log":13,"../renderer":19}],21:[function(t,e,n){function r(t,e,n,r){i.call(this,n,r),this.ownStacking=t,this.contexts=[],this.children=[],this.opacity=(this.parent?this.parent.stack.opacity:1)*e}var i=t("./nodecontainer");(r.prototype=Object.create(i.prototype)).getParentStack=function(t){var e=this.parent?this.parent.stack:null;return e?e.ownStacking?e:e.getParentStack(t):t.stack},e.exports=r},{"./nodecontainer":14}],22:[function(t,e,n){function r(t){this.rangeBounds=this.testRangeBounds(t),this.cors=this.testCORS(),this.svg=this.testSVG()}r.prototype.testRangeBounds=function(t){var e,n,r=!1;return t.createRange&&(e=t.createRange()).getBoundingClientRect&&((n=t.createElement("boundtest")).style.height="123px",n.style.display="block",t.body.appendChild(n),e.selectNode(n),123===e.getBoundingClientRect().height&&(r=!0),t.body.removeChild(n)),r},r.prototype.testCORS=function(){return void 0!==(new Image).crossOrigin},r.prototype.testSVG=function(){var t=new Image,e=document.createElement("canvas"),n=e.getContext("2d");t.src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try{n.drawImage(t,0,0),e.toDataURL()}catch(t){return!1}return!0},e.exports=r},{}],23:[function(t,e,n){function r(t){this.src=t,this.image=null;var e=this;this.promise=this.hasFabric().then(function(){return e.isInline(t)?Promise.resolve(e.inlineFormatting(t)):i(t)}).then(function(t){return new Promise(function(n){window.html2canvas.svg.fabric.loadSVGFromString(t,e.createCanvas.call(e,n))})})}var i=t("./xhr"),o=t("./utils").decode64;r.prototype.hasFabric=function(){return window.html2canvas.svg&&window.html2canvas.svg.fabric?Promise.resolve():Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg"))},r.prototype.inlineFormatting=function(t){return/^data:image\/svg\+xml;base64,/.test(t)?this.decode64(this.removeContentType(t)):this.removeContentType(t)},r.prototype.removeContentType=function(t){return t.replace(/^data:image\/svg\+xml(;base64)?,/,"")},r.prototype.isInline=function(t){return/^data:image\/svg\+xml/i.test(t)},r.prototype.createCanvas=function(t){var e=this;return function(n,r){var i=new window.html2canvas.svg.fabric.StaticCanvas("c");e.image=i.lowerCanvasEl,i.setWidth(r.width).setHeight(r.height).add(window.html2canvas.svg.fabric.util.groupSVGElements(n,r)).renderAll(),t(i.lowerCanvasEl)}},r.prototype.decode64=function(t){return"function"==typeof window.atob?window.atob(t):o(t)},e.exports=r},{"./utils":26,"./xhr":28}],24:[function(t,e,n){function r(t,e){this.src=t,this.image=null;var n=this;this.promise=e?new Promise(function(e,r){n.image=new Image,n.image.onload=e,n.image.onerror=r,n.image.src="data:image/svg+xml,"+(new XMLSerializer).serializeToString(t),!0===n.image.complete&&e(n.image)}):this.hasFabric().then(function(){return new Promise(function(e){window.html2canvas.svg.fabric.parseSVGDocument(t,n.createCanvas.call(n,e))})})}var i=t("./svgcontainer");r.prototype=Object.create(i.prototype),e.exports=r},{"./svgcontainer":23}],25:[function(t,e,n){function r(t,e){o.call(this,t,e)}function i(t,e,n){if(t.length>0)return e+n.toUpperCase()}var o=t("./nodecontainer");(r.prototype=Object.create(o.prototype)).applyTextTransform=function(){this.node.data=this.transform(this.parent.css("textTransform"))},r.prototype.transform=function(t){var e=this.node.data;switch(t){case"lowercase":return e.toLowerCase();case"capitalize":return e.replace(/(^|\s|:|-|\(|\))([a-z])/g,i);case"uppercase":return e.toUpperCase();default:return e}},e.exports=r},{"./nodecontainer":14}],26:[function(t,e,n){n.smallImage=function(){return"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},n.bind=function(t,e){return function(){return t.apply(e,arguments)}},/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
n.decode64=function(t){var e,n,r,i,o,a,s,c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",l=t.length,u="";for(e=0;e<l;e+=4)o=c.indexOf(t[e])<<2|(n=c.indexOf(t[e+1]))>>4,a=(15&n)<<4|(r=c.indexOf(t[e+2]))>>2,s=(3&r)<<6|(i=c.indexOf(t[e+3])),u+=64===r?String.fromCharCode(o):64===i||-1===i?String.fromCharCode(o,a):String.fromCharCode(o,a,s);return u},n.getBounds=function(t){if(t.getBoundingClientRect){var e=t.getBoundingClientRect(),n=null==t.offsetWidth?e.width:t.offsetWidth;return{top:e.top,bottom:e.bottom||e.top+e.height,right:e.left+n,left:e.left,width:n,height:null==t.offsetHeight?e.height:t.offsetHeight}}return{}},n.offsetBounds=function(t){var e=t.offsetParent?n.offsetBounds(t.offsetParent):{top:0,left:0};return{top:t.offsetTop+e.top,bottom:t.offsetTop+t.offsetHeight+e.top,right:t.offsetLeft+e.left+t.offsetWidth,left:t.offsetLeft+e.left,width:t.offsetWidth,height:t.offsetHeight}},n.parseBackgrounds=function(t){var e,n,r,i,o,a,s,c=[],l=0,u=0,h=function(){e&&('"'===n.substr(0,1)&&(n=n.substr(1,n.length-2)),n&&s.push(n),"-"===e.substr(0,1)&&(i=e.indexOf("-",1)+1)>0&&(r=e.substr(0,i),e=e.substr(i)),c.push({prefix:r,method:e.toLowerCase(),value:o,args:s,image:null})),s=[],e=r=n=o=""};return s=[],e=r=n=o="",t.split("").forEach(function(t){if(!(0===l&&" \r\n\t".indexOf(t)>-1)){switch(t){case'"':a?a===t&&(a=null):a=t;break;case"(":if(a)break;if(0===l)return l=1,void(o+=t);u++;break;case")":if(a)break;if(1===l){if(0===u)return l=0,o+=t,void h();u--}break;case",":if(a)break;if(0===l)return void h();if(1===l&&0===u&&!e.match(/^url$/i))return s.push(n),n="",void(o+=t)}o+=t,0===l?e+=t:n+=t}}),h(),c}},{}],27:[function(t,e,n){function r(t){i.apply(this,arguments),this.type="linear"===t.args[0]?i.TYPES.LINEAR:i.TYPES.RADIAL}var i=t("./gradientcontainer");r.prototype=Object.create(i.prototype),e.exports=r},{"./gradientcontainer":9}],28:[function(t,e,n){e.exports=function(t){return new Promise(function(e,n){var r=new XMLHttpRequest;r.open("GET",t),r.onload=function(){200===r.status?e(r.responseText):n(new Error(r.statusText))},r.onerror=function(){n(new Error("Network Error"))},r.send()})}},{}]},{},[4])(4)}),/*
# PNG.js
# Copyright (c) 2011 Devon Govett
# MIT LICENSE
#
#
*/
function(t){var e;e=function(){function e(t){var e,n,r,i,o,a,s,c,l,u,h,f,d,p,m;for(this.data=t,this.pos=8,this.palette=[],this.imgData=[],this.transparency={},this.animation=null,this.text={},a=null;;){switch(e=this.readUInt32(),u=function(){var t,e;for(e=[],s=t=0;t<4;s=++t)e.push(String.fromCharCode(this.data[this.pos++]));return e}.call(this).join("")){case"IHDR":this.width=this.readUInt32(),this.height=this.readUInt32(),this.bits=this.data[this.pos++],this.colorType=this.data[this.pos++],this.compressionMethod=this.data[this.pos++],this.filterMethod=this.data[this.pos++],this.interlaceMethod=this.data[this.pos++];break;case"acTL":this.animation={numFrames:this.readUInt32(),numPlays:this.readUInt32()||1/0,frames:[]};break;case"PLTE":this.palette=this.read(e);break;case"fcTL":a&&this.animation.frames.push(a),this.pos+=4,a={width:this.readUInt32(),height:this.readUInt32(),xOffset:this.readUInt32(),yOffset:this.readUInt32()},o=this.readUInt16(),i=this.readUInt16()||100,a.delay=1e3*o/i,a.disposeOp=this.data[this.pos++],a.blendOp=this.data[this.pos++],a.data=[];break;case"IDAT":case"fdAT":for("fdAT"===u&&(this.pos+=4,e-=4),t=(null!=a?a.data:void 0)||this.imgData,s=d=0;0<=e?d<e:d>e;s=0<=e?++d:--d)t.push(this.data[this.pos++]);break;case"tRNS":switch(this.transparency={},this.colorType){case 3:if(r=this.palette.length/3,this.transparency.indexed=this.read(e),this.transparency.indexed.length>r)throw new Error("More transparent colors than palette size");if((h=r-this.transparency.indexed.length)>0)for(s=p=0;0<=h?p<h:p>h;s=0<=h?++p:--p)this.transparency.indexed.push(255);break;case 0:this.transparency.grayscale=this.read(e)[0];break;case 2:this.transparency.rgb=this.read(e)}break;case"tEXt":c=(f=this.read(e)).indexOf(0),l=String.fromCharCode.apply(String,f.slice(0,c)),this.text[l]=String.fromCharCode.apply(String,f.slice(c+1));break;case"IEND":return a&&this.animation.frames.push(a),this.colors=function(){switch(this.colorType){case 0:case 3:case 4:return 1;case 2:case 6:return 3}}.call(this),this.hasAlphaChannel=4===(m=this.colorType)||6===m,n=this.colors+(this.hasAlphaChannel?1:0),this.pixelBitlength=this.bits*n,this.colorSpace=function(){switch(this.colors){case 1:return"DeviceGray";case 3:return"DeviceRGB"}}.call(this),void(this.imgData=new Uint8Array(this.imgData));default:this.pos+=e}if(this.pos+=4,this.pos>this.data.length)throw new Error("Incomplete or corrupt PNG file")}}var n,r,i;e.load=function(t,n,r){var i;return"function"==typeof n&&(r=n),(i=new XMLHttpRequest).open("GET",t,!0),i.responseType="arraybuffer",i.onload=function(){var t,o;return t=new Uint8Array(i.response||i.mozResponseArrayBuffer),o=new e(t),"function"==typeof(null!=n?n.getContext:void 0)&&o.render(n),"function"==typeof r?r(o):void 0},i.send(null)},e.prototype.read=function(t){var e,n;for(n=[],e=0;0<=t?e<t:e>t;0<=t?++e:--e)n.push(this.data[this.pos++]);return n},e.prototype.readUInt32=function(){var t,e,n,r;return t=this.data[this.pos++]<<24,e=this.data[this.pos++]<<16,n=this.data[this.pos++]<<8,r=this.data[this.pos++],t|e|n|r},e.prototype.readUInt16=function(){var t,e;return t=this.data[this.pos++]<<8,e=this.data[this.pos++],t|e},e.prototype.decodePixels=function(t){var e,n,r,i,o,a,c,l,u,h,f,d,p,m,g,w,y,v,b,x,k,_,C;if(null==t&&(t=this.imgData),0===t.length)return new Uint8Array(0);for(t=(t=new s(t)).getBytes(),w=(d=this.pixelBitlength/8)*this.width,p=new Uint8Array(w*this.height),a=t.length,g=0,m=0,n=0;m<a;){switch(t[m++]){case 0:for(i=b=0;b<w;i=b+=1)p[n++]=t[m++];break;case 1:for(i=x=0;x<w;i=x+=1)e=t[m++],o=i<d?0:p[n-d],p[n++]=(e+o)%256;break;case 2:for(i=k=0;k<w;i=k+=1)e=t[m++],r=(i-i%d)/d,y=g&&p[(g-1)*w+r*d+i%d],p[n++]=(y+e)%256;break;case 3:for(i=_=0;_<w;i=_+=1)e=t[m++],r=(i-i%d)/d,o=i<d?0:p[n-d],y=g&&p[(g-1)*w+r*d+i%d],p[n++]=(e+Math.floor((o+y)/2))%256;break;case 4:for(i=C=0;C<w;i=C+=1)e=t[m++],r=(i-i%d)/d,o=i<d?0:p[n-d],0===g?y=v=0:(y=p[(g-1)*w+r*d+i%d],v=r&&p[(g-1)*w+(r-1)*d+i%d]),c=o+y-v,l=Math.abs(c-o),h=Math.abs(c-y),f=Math.abs(c-v),u=l<=h&&l<=f?o:h<=f?y:v,p[n++]=(e+u)%256;break;default:throw new Error("Invalid filter algorithm: "+t[m-1])}g++}return p},e.prototype.decodePalette=function(){var t,e,n,r,i,o,a,s,c;for(n=this.palette,o=this.transparency.indexed||[],i=new Uint8Array((o.length||0)+n.length),r=0,t=0,e=a=0,s=n.length;a<s;e=a+=3)i[r++]=n[e],i[r++]=n[e+1],i[r++]=n[e+2],i[r++]=null!=(c=o[t++])?c:255;return i},e.prototype.copyToImageData=function(t,e){var n,r,i,o,a,s,c,l,u,h,f;if(r=this.colors,u=null,n=this.hasAlphaChannel,this.palette.length&&(u=null!=(f=this._decodedPalette)?f:this._decodedPalette=this.decodePalette(),r=4,n=!0),i=t.data||t,l=i.length,a=u||e,o=s=0,1===r)for(;o<l;)c=u?4*e[o/4]:s,h=a[c++],i[o++]=h,i[o++]=h,i[o++]=h,i[o++]=n?a[c++]:255,s=c;else for(;o<l;)c=u?4*e[o/4]:s,i[o++]=a[c++],i[o++]=a[c++],i[o++]=a[c++],i[o++]=n?a[c++]:255,s=c},e.prototype.decode=function(){var t;return t=new Uint8Array(this.width*this.height*4),this.copyToImageData(t,this.decodePixels()),t};try{r=t.document.createElement("canvas"),i=r.getContext("2d")}catch(t){return-1}return n=function(t){var e;return i.width=t.width,i.height=t.height,i.clearRect(0,0,t.width,t.height),i.putImageData(t,0,0),e=new Image,e.src=r.toDataURL(),e},e.prototype.decodeFrames=function(t){var e,r,i,o,a,s,c,l;if(this.animation){for(l=[],r=a=0,s=(c=this.animation.frames).length;a<s;r=++a)e=c[r],i=t.createImageData(e.width,e.height),o=this.decodePixels(new Uint8Array(e.data)),this.copyToImageData(i,o),e.imageData=i,l.push(e.image=n(i));return l}},e.prototype.renderFrame=function(t,e){var n,r,i;return r=this.animation.frames,n=r[e],i=r[e-1],0===e&&t.clearRect(0,0,this.width,this.height),1===(null!=i?i.disposeOp:void 0)?t.clearRect(i.xOffset,i.yOffset,i.width,i.height):2===(null!=i?i.disposeOp:void 0)&&t.putImageData(i.imageData,i.xOffset,i.yOffset),0===n.blendOp&&t.clearRect(n.xOffset,n.yOffset,n.width,n.height),t.drawImage(n.image,n.xOffset,n.yOffset)},e.prototype.animate=function(t){var e,n,r,i,o,a,s=this;return n=0,a=this.animation,i=a.numFrames,r=a.frames,o=a.numPlays,(e=function(){var a,c;if(a=n++%i,c=r[a],s.renderFrame(t,a),i>1&&n/i<o)return s.animation._timeout=setTimeout(e,c.delay)})()},e.prototype.stopAnimation=function(){var t;return clearTimeout(null!=(t=this.animation)?t._timeout:void 0)},e.prototype.render=function(t){var e,n;return t._png&&t._png.stopAnimation(),t._png=this,t.width=this.width,t.height=this.height,e=t.getContext("2d"),this.animation?(this.decodeFrames(e),this.animate(e)):(n=e.createImageData(this.width,this.height),this.copyToImageData(n,this.decodePixels()),e.putImageData(n,0,0))},e}(),t.PNG=e}("undefined"!=typeof window&&window||void 0);/*
 * Extracted from pdf.js
 * https://github.com/andreasgal/pdf.js
 *
 * Copyright (c) 2011 Mozilla Foundation
 *
 * Contributors: Andreas Gal <gal@mozilla.com>
 *               Chris G Jones <cjones@mozilla.com>
 *               Shaon Barman <shaon.barman@gmail.com>
 *               Vivien Nicolas <21@vingtetun.org>
 *               Justin D'Arcangelo <justindarc@gmail.com>
 *               Yury Delendik
 *
 *
 */
var a=function(){function t(){this.pos=0,this.bufferLength=0,this.eof=!1,this.buffer=null}return t.prototype={ensureBuffer:function(t){var e=this.buffer,n=e?e.byteLength:0;if(t<n)return e;for(var r=512;r<t;)r<<=1;for(var i=new Uint8Array(r),o=0;o<n;++o)i[o]=e[o];return this.buffer=i},getByte:function(){for(var t=this.pos;this.bufferLength<=t;){if(this.eof)return null;this.readBlock()}return this.buffer[this.pos++]},getBytes:function(t){var e=this.pos;if(t){this.ensureBuffer(e+t);for(r=e+t;!this.eof&&this.bufferLength<r;)this.readBlock();var n=this.bufferLength;r>n&&(r=n)}else{for(;!this.eof;)this.readBlock();var r=this.bufferLength}return this.pos=r,this.buffer.subarray(e,r)},lookChar:function(){for(var t=this.pos;this.bufferLength<=t;){if(this.eof)return null;this.readBlock()}return String.fromCharCode(this.buffer[this.pos])},getChar:function(){for(var t=this.pos;this.bufferLength<=t;){if(this.eof)return null;this.readBlock()}return String.fromCharCode(this.buffer[this.pos++])},makeSubStream:function(t,e,n){for(var r=t+e;this.bufferLength<=r&&!this.eof;)this.readBlock();return new Stream(this.buffer,t,e,n)},skip:function(t){t||(t=1),this.pos+=t},reset:function(){this.pos=0}},t}(),s=function(){function t(t){throw new Error(t)}function e(e){var n=0,r=e[n++],i=e[n++];-1!=r&&-1!=i||t("Invalid header in flate stream"),8!=(15&r)&&t("Unknown compression method in flate stream"),((r<<8)+i)%31!=0&&t("Bad FCHECK in flate stream"),32&i&&t("FDICT bit set in flate stream"),this.bytes=e,this.bytesPos=n,this.codeSize=0,this.codeBuf=0,a.call(this)}if("undefined"!=typeof Uint32Array){var n=new Uint32Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),r=new Uint32Array([3,4,5,6,7,8,9,10,65547,65549,65551,65553,131091,131095,131099,131103,196643,196651,196659,196667,262211,262227,262243,262259,327811,327843,327875,327907,258,258,258]),i=new Uint32Array([1,2,3,4,65541,65543,131081,131085,196625,196633,262177,262193,327745,327777,393345,393409,459009,459137,524801,525057,590849,591361,657409,658433,724993,727041,794625,798721,868353,876545]),o=[new Uint32Array([459008,524368,524304,524568,459024,524400,524336,590016,459016,524384,524320,589984,524288,524416,524352,590048,459012,524376,524312,589968,459028,524408,524344,590032,459020,524392,524328,59e4,524296,524424,524360,590064,459010,524372,524308,524572,459026,524404,524340,590024,459018,524388,524324,589992,524292,524420,524356,590056,459014,524380,524316,589976,459030,524412,524348,590040,459022,524396,524332,590008,524300,524428,524364,590072,459009,524370,524306,524570,459025,524402,524338,590020,459017,524386,524322,589988,524290,524418,524354,590052,459013,524378,524314,589972,459029,524410,524346,590036,459021,524394,524330,590004,524298,524426,524362,590068,459011,524374,524310,524574,459027,524406,524342,590028,459019,524390,524326,589996,524294,524422,524358,590060,459015,524382,524318,589980,459031,524414,524350,590044,459023,524398,524334,590012,524302,524430,524366,590076,459008,524369,524305,524569,459024,524401,524337,590018,459016,524385,524321,589986,524289,524417,524353,590050,459012,524377,524313,589970,459028,524409,524345,590034,459020,524393,524329,590002,524297,524425,524361,590066,459010,524373,524309,524573,459026,524405,524341,590026,459018,524389,524325,589994,524293,524421,524357,590058,459014,524381,524317,589978,459030,524413,524349,590042,459022,524397,524333,590010,524301,524429,524365,590074,459009,524371,524307,524571,459025,524403,524339,590022,459017,524387,524323,589990,524291,524419,524355,590054,459013,524379,524315,589974,459029,524411,524347,590038,459021,524395,524331,590006,524299,524427,524363,590070,459011,524375,524311,524575,459027,524407,524343,590030,459019,524391,524327,589998,524295,524423,524359,590062,459015,524383,524319,589982,459031,524415,524351,590046,459023,524399,524335,590014,524303,524431,524367,590078,459008,524368,524304,524568,459024,524400,524336,590017,459016,524384,524320,589985,524288,524416,524352,590049,459012,524376,524312,589969,459028,524408,524344,590033,459020,524392,524328,590001,524296,524424,524360,590065,459010,524372,524308,524572,459026,524404,524340,590025,459018,524388,524324,589993,524292,524420,524356,590057,459014,524380,524316,589977,459030,524412,524348,590041,459022,524396,524332,590009,524300,524428,524364,590073,459009,524370,524306,524570,459025,524402,524338,590021,459017,524386,524322,589989,524290,524418,524354,590053,459013,524378,524314,589973,459029,524410,524346,590037,459021,524394,524330,590005,524298,524426,524362,590069,459011,524374,524310,524574,459027,524406,524342,590029,459019,524390,524326,589997,524294,524422,524358,590061,459015,524382,524318,589981,459031,524414,524350,590045,459023,524398,524334,590013,524302,524430,524366,590077,459008,524369,524305,524569,459024,524401,524337,590019,459016,524385,524321,589987,524289,524417,524353,590051,459012,524377,524313,589971,459028,524409,524345,590035,459020,524393,524329,590003,524297,524425,524361,590067,459010,524373,524309,524573,459026,524405,524341,590027,459018,524389,524325,589995,524293,524421,524357,590059,459014,524381,524317,589979,459030,524413,524349,590043,459022,524397,524333,590011,524301,524429,524365,590075,459009,524371,524307,524571,459025,524403,524339,590023,459017,524387,524323,589991,524291,524419,524355,590055,459013,524379,524315,589975,459029,524411,524347,590039,459021,524395,524331,590007,524299,524427,524363,590071,459011,524375,524311,524575,459027,524407,524343,590031,459019,524391,524327,589999,524295,524423,524359,590063,459015,524383,524319,589983,459031,524415,524351,590047,459023,524399,524335,590015,524303,524431,524367,590079]),9],s=[new Uint32Array([327680,327696,327688,327704,327684,327700,327692,327708,327682,327698,327690,327706,327686,327702,327694,0,327681,327697,327689,327705,327685,327701,327693,327709,327683,327699,327691,327707,327687,327703,327695,0]),5];return e.prototype=Object.create(a.prototype),e.prototype.getBits=function(e){for(var n,r=this.codeSize,i=this.codeBuf,o=this.bytes,a=this.bytesPos;r<e;)void 0===(n=o[a++])&&t("Bad encoding in flate stream"),i|=n<<r,r+=8;return n=i&(1<<e)-1,this.codeBuf=i>>e,this.codeSize=r-=e,this.bytesPos=a,n},e.prototype.getCode=function(e){for(var n=e[0],r=e[1],i=this.codeSize,o=this.codeBuf,a=this.bytes,s=this.bytesPos;i<r;){var c;void 0===(c=a[s++])&&t("Bad encoding in flate stream"),o|=c<<i,i+=8}var l=n[o&(1<<r)-1],u=l>>16,h=65535&l;return(0==i||i<u||0==u)&&t("Bad encoding in flate stream"),this.codeBuf=o>>u,this.codeSize=i-u,this.bytesPos=s,h},e.prototype.generateHuffmanTable=function(t){for(var e=t.length,n=0,r=0;r<e;++r)t[r]>n&&(n=t[r]);for(var i=1<<n,o=new Uint32Array(i),a=1,s=0,c=2;a<=n;++a,s<<=1,c<<=1)for(var l=0;l<e;++l)if(t[l]==a){for(var u=0,h=s,r=0;r<a;++r)u=u<<1|1&h,h>>=1;for(r=u;r<i;r+=c)o[r]=a<<16|l;++s}return[o,n]},e.prototype.readBlock=function(){function e(t,e,n,r,i){for(var o=t.getBits(n)+r;o-- >0;)e[p++]=i}var a=this.getBits(3);if(1&a&&(this.eof=!0),0!=(a>>=1)){var c,l;if(1==a)c=o,l=s;else if(2==a){for(var u=this.getBits(5)+257,h=this.getBits(5)+1,f=this.getBits(4)+4,d=Array(n.length),p=0;p<f;)d[n[p++]]=this.getBits(3);for(var m=this.generateHuffmanTable(d),g=0,p=0,w=u+h,y=new Array(w);p<w;){var v=this.getCode(m);16==v?e(this,y,2,3,g):17==v?e(this,y,3,3,g=0):18==v?e(this,y,7,11,g=0):y[p++]=g=v}c=this.generateHuffmanTable(y.slice(0,u)),l=this.generateHuffmanTable(y.slice(u,w))}else t("Unknown block type in flate stream");for(var b=(O=this.buffer)?O.length:0,x=this.bufferLength;;){var k=this.getCode(c);if(k<256)x+1>=b&&(b=(O=this.ensureBuffer(x+1)).length),O[x++]=k;else{if(256==k)return void(this.bufferLength=x);var _=(k=r[k-=257])>>16;_>0&&(_=this.getBits(_));g=(65535&k)+_;k=this.getCode(l),(_=(k=i[k])>>16)>0&&(_=this.getBits(_));var C=(65535&k)+_;x+g>=b&&(b=(O=this.ensureBuffer(x+g)).length);for(var A=0;A<g;++A,++x)O[x]=O[x-C]}}}else{var S,q=this.bytes,T=this.bytesPos;void 0===(S=q[T++])&&t("Bad block header in flate stream");var P=S;void 0===(S=q[T++])&&t("Bad block header in flate stream"),P|=S<<8,void 0===(S=q[T++])&&t("Bad block header in flate stream");var I=S;void 0===(S=q[T++])&&t("Bad block header in flate stream"),(I|=S<<8)!=(65535&~P)&&t("Bad uncompressed block length in flate stream"),this.codeBuf=0,this.codeSize=0;var E=this.bufferLength,O=this.ensureBuffer(E+P),F=E+P;this.bufferLength=F;for(var B=E;B<F;++B){if(void 0===(S=q[T++])){this.eof=!0;break}O[B]=S}this.bytesPos=T}},e}}();return function(t){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";void 0===t.btoa&&(t.btoa=function(t){var n,r,i,o,a,s=0,c=0,l="",u=[];if(!t)return t;do{n=(a=t.charCodeAt(s++)<<16|t.charCodeAt(s++)<<8|t.charCodeAt(s++))>>18&63,r=a>>12&63,i=a>>6&63,o=63&a,u[c++]=e.charAt(n)+e.charAt(r)+e.charAt(i)+e.charAt(o)}while(s<t.length);l=u.join("");var h=t.length%3;return(h?l.slice(0,h-3):l)+"===".slice(h||3)}),void 0===t.atob&&(t.atob=function(t){var n,r,i,o,a,s,c=0,l=0,u=[];if(!t)return t;t+="";do{n=(s=e.indexOf(t.charAt(c++))<<18|e.indexOf(t.charAt(c++))<<12|(o=e.indexOf(t.charAt(c++)))<<6|(a=e.indexOf(t.charAt(c++))))>>16&255,r=s>>8&255,i=255&s,u[l++]=64==o?String.fromCharCode(n):64==a?String.fromCharCode(n,r):String.fromCharCode(n,r,i)}while(c<t.length);return u.join("")}),Array.prototype.map||(Array.prototype.map=function(t){if(void 0===this||null===this||"function"!=typeof t)throw new TypeError;for(var e=Object(this),n=e.length>>>0,r=new Array(n),i=arguments.length>1?arguments[1]:void 0,o=0;o<n;o++)o in e&&(r[o]=t.call(i,e[o],o,e));return r}),Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),Array.prototype.forEach||(Array.prototype.forEach=function(t,e){if(void 0===this||null===this||"function"!=typeof t)throw new TypeError;for(var n=Object(this),r=n.length>>>0,i=0;i<r;i++)i in n&&t.call(e,n[i],i,n)}),Object.keys||(Object.keys=function(){var t=Object.prototype.hasOwnProperty,e=!{toString:null}.propertyIsEnumerable("toString"),n=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],r=n.length;return function(i){if("object"!=typeof i&&("function"!=typeof i||null===i))throw new TypeError;var o,a,s=[];for(o in i)t.call(i,o)&&s.push(o);if(e)for(a=0;a<r;a++)t.call(i,n[a])&&s.push(n[a]);return s}}()),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),String.prototype.trimLeft||(String.prototype.trimLeft=function(){return this.replace(/^\s+/g,"")}),String.prototype.trimRight||(String.prototype.trimRight=function(){return this.replace(/\s+$/g,"")})}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||void 0),e});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)))

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var baseClone = __webpack_require__(156);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;


/***/ }),
/* 136 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var macrotask = __webpack_require__(81).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(21)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 138 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var isObject = __webpack_require__(8);
var newPromiseCapability = __webpack_require__(75);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(5);
var aFunction = __webpack_require__(25);
var SPECIES = __webpack_require__(0)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(50);
var global = __webpack_require__(1);
var ctx = __webpack_require__(20);
var classof = __webpack_require__(32);
var $export = __webpack_require__(44);
var isObject = __webpack_require__(8);
var aFunction = __webpack_require__(25);
var anInstance = __webpack_require__(60);
var forOf = __webpack_require__(61);
var speciesConstructor = __webpack_require__(140);
var task = __webpack_require__(81).set;
var microtask = __webpack_require__(137)();
var newPromiseCapabilityModule = __webpack_require__(75);
var perform = __webpack_require__(138);
var promiseResolve = __webpack_require__(139);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(0)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(65)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(27)($Promise, PROMISE);
__webpack_require__(79)(PROMISE);
Wrapper = __webpack_require__(15)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(74)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(18),
    root = __webpack_require__(6);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(182),
    hashDelete = __webpack_require__(183),
    hashGet = __webpack_require__(184),
    hashHas = __webpack_require__(185),
    hashSet = __webpack_require__(186);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(198),
    mapCacheDelete = __webpack_require__(199),
    mapCacheGet = __webpack_require__(200),
    mapCacheHas = __webpack_require__(201),
    mapCacheSet = __webpack_require__(202);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(18),
    root = __webpack_require__(6);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(18),
    root = __webpack_require__(6);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(37),
    stackClear = __webpack_require__(209),
    stackDelete = __webpack_require__(210),
    stackGet = __webpack_require__(211),
    stackHas = __webpack_require__(212),
    stackSet = __webpack_require__(213);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(6);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(18),
    root = __webpack_require__(6);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 150 */
/***/ (function(module, exports) {

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

module.exports = addMapEntry;


/***/ }),
/* 151 */
/***/ (function(module, exports) {

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

module.exports = addSetEntry;


/***/ }),
/* 152 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),
/* 153 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(40),
    keys = __webpack_require__(58);

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(40),
    keysIn = __webpack_require__(105);

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(147),
    arrayEach = __webpack_require__(152),
    assignValue = __webpack_require__(92),
    baseAssign = __webpack_require__(154),
    baseAssignIn = __webpack_require__(155),
    cloneBuffer = __webpack_require__(165),
    copyArray = __webpack_require__(172),
    copySymbols = __webpack_require__(173),
    copySymbolsIn = __webpack_require__(174),
    getAllKeys = __webpack_require__(177),
    getAllKeysIn = __webpack_require__(178),
    getTag = __webpack_require__(180),
    initCloneArray = __webpack_require__(187),
    initCloneByTag = __webpack_require__(188),
    initCloneObject = __webpack_require__(189),
    isArray = __webpack_require__(56),
    isBuffer = __webpack_require__(102),
    isObject = __webpack_require__(30),
    keys = __webpack_require__(58);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(30);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(39),
    isObjectLike = __webpack_require__(57);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(103),
    isMasked = __webpack_require__(192),
    isObject = __webpack_require__(30),
    toSource = __webpack_require__(99);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(39),
    isLength = __webpack_require__(104),
    isObjectLike = __webpack_require__(57);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(55),
    nativeKeys = __webpack_require__(204);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(30),
    isPrototype = __webpack_require__(55),
    nativeKeysIn = __webpack_require__(205);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),
/* 163 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 164 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(6);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59)(module)))

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(53);

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var addMapEntry = __webpack_require__(150),
    arrayReduce = __webpack_require__(91),
    mapToArray = __webpack_require__(203);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

module.exports = cloneMap;


/***/ }),
/* 168 */
/***/ (function(module, exports) {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var addSetEntry = __webpack_require__(151),
    arrayReduce = __webpack_require__(91),
    setToArray = __webpack_require__(208);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

module.exports = cloneSet;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(52);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(53);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),
/* 172 */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(40),
    getSymbols = __webpack_require__(54);

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(40),
    getSymbolsIn = __webpack_require__(97);

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(6);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(18);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(94),
    getSymbols = __webpack_require__(54),
    keys = __webpack_require__(58);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(94),
    getSymbolsIn = __webpack_require__(97),
    keysIn = __webpack_require__(105);

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(52);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(142),
    Map = __webpack_require__(51),
    Promise = __webpack_require__(145),
    Set = __webpack_require__(146),
    WeakMap = __webpack_require__(149),
    baseGetTag = __webpack_require__(39),
    toSource = __webpack_require__(99);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),
/* 181 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(42);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 183 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(42);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(42);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(42);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 187 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(53),
    cloneDataView = __webpack_require__(166),
    cloneMap = __webpack_require__(167),
    cloneRegExp = __webpack_require__(168),
    cloneSet = __webpack_require__(169),
    cloneSymbol = __webpack_require__(170),
    cloneTypedArray = __webpack_require__(171);

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(157),
    getPrototype = __webpack_require__(96),
    isPrototype = __webpack_require__(55);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),
/* 190 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 191 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(175);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 193 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(38);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(38);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(38);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(38);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(143),
    ListCache = __webpack_require__(37),
    Map = __webpack_require__(51);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(41);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(41);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(41);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(41);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 203 */
/***/ (function(module, exports) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(98);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 205 */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(95);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59)(module)))

/***/ }),
/* 207 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 208 */
/***/ (function(module, exports) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(37);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),
/* 210 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),
/* 211 */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),
/* 212 */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(37),
    Map = __webpack_require__(51),
    MapCache = __webpack_require__(144);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(158),
    isObjectLike = __webpack_require__(57);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(160),
    baseUnary = __webpack_require__(164),
    nodeUtil = __webpack_require__(206);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 216 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.olToolsPrintfMap = exports.olSourceGaode = exports.olSourceBaidu = exports.olSourceGoogle = exports.olPopover = exports.olLayerUtils = exports.olStyleFactory = exports.olInteractionFreeHandCircle = exports.olInteractionMeasureTool = exports.olInteractionLayerSpyglass = exports.olInteractionLayerMagnify = exports.olControlContextMenu = exports.olControlLayerSwitcher = exports.olControlCompareLayer = exports.olControlBZoomSlider = exports.olControlLoading = undefined;

var _Loading = __webpack_require__(111);

var _Loading2 = _interopRequireDefault(_Loading);

var _BZoomSlider = __webpack_require__(109);

var _BZoomSlider2 = _interopRequireDefault(_BZoomSlider);

var _compareLayer = __webpack_require__(112);

var _compareLayer2 = _interopRequireDefault(_compareLayer);

var _LayerSwitcher = __webpack_require__(110);

var _LayerSwitcher2 = _interopRequireDefault(_LayerSwitcher);

var _contextMenu = __webpack_require__(113);

var _contextMenu2 = _interopRequireDefault(_contextMenu);

var _layerMagnify = __webpack_require__(115);

var _layerMagnify2 = _interopRequireDefault(_layerMagnify);

var _layerSpyglass = __webpack_require__(116);

var _layerSpyglass2 = _interopRequireDefault(_layerSpyglass);

var _measureTool = __webpack_require__(117);

var _measureTool2 = _interopRequireDefault(_measureTool);

var _freeHandCircle = __webpack_require__(114);

var _freeHandCircle2 = _interopRequireDefault(_freeHandCircle);

var _factory = __webpack_require__(24);

var _factory2 = _interopRequireDefault(_factory);

var _layerUtils = __webpack_require__(17);

var _layerUtils2 = _interopRequireDefault(_layerUtils);

var _popover = __webpack_require__(118);

var _popover2 = _interopRequireDefault(_popover);

var _Baidu = __webpack_require__(119);

var _Baidu2 = _interopRequireDefault(_Baidu);

var _Gaode = __webpack_require__(120);

var _Gaode2 = _interopRequireDefault(_Gaode);

var _Google = __webpack_require__(121);

var _Google2 = _interopRequireDefault(_Google);

var _printfMap = __webpack_require__(122);

var _printfMap2 = _interopRequireDefault(_printfMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.olControlLoading = _Loading2.default;
exports.olControlBZoomSlider = _BZoomSlider2.default;
exports.olControlCompareLayer = _compareLayer2.default;
exports.olControlLayerSwitcher = _LayerSwitcher2.default;
exports.olControlContextMenu = _contextMenu2.default;
exports.olInteractionLayerMagnify = _layerMagnify2.default;
exports.olInteractionLayerSpyglass = _layerSpyglass2.default;
exports.olInteractionMeasureTool = _measureTool2.default;
exports.olInteractionFreeHandCircle = _freeHandCircle2.default;
exports.olStyleFactory = _factory2.default;
exports.olLayerUtils = _layerUtils2.default;
exports.olPopover = _popover2.default;
exports.olSourceGoogle = _Google2.default;
exports.olSourceBaidu = _Baidu2.default;
exports.olSourceGaode = _Gaode2.default;
exports.olToolsPrintfMap = _printfMap2.default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=olExtent.js.map
