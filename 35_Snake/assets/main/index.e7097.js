window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  HTTP: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "92e59Y3uS5P04ziVpjc1w2/", "HTTP");
    "use strict";
    window.HTTP = {
      HTTPTimeout: 2e3,
      iMvid: 1,
      maxFailTime: 1,
      fileList: {},
      GET: function GET(url, params, callback, failCallback) {
        var hasReturnFail = false;
        var strUrl = url;
        var addUrl = this.encodeTab(params);
        "" != addUrl && (strUrl += "?" + addUrl);
        var hasFailCalled = false;
        var onFail = function() {
          if (hasFailCalled) return;
          hasFailCalled = true;
          if (this.fileList[strUrl]) {
            this.fileList[strUrl]++;
            if (this.fileList[strUrl] >= this.maxFailTime) {
              if (failCallback && !hasReturnFail) {
                hasReturnFail = true;
                failCallback();
              }
              this.fileList[strUrl] = 0;
              return;
            }
            this.GET(url, params, callback, failCallback);
          } else {
            this.fileList[strUrl] = 1;
            this.GET(url, params, callback, failCallback);
          }
        }.bind(this);
        var onSuc = function() {
          this.fileList[strUrl] = 0;
        }.bind(this);
        var xhr = cc.loader.getXMLHttpRequest();
        var time = new Date().Format("m:s.S");
        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState) if (xhr.status >= 200 && xhr.status < 300) {
            if (callback) {
              var respone = xhr.response;
              console.log("rev:", respone);
              var resObj = JSON.parse(respone);
              callback(resObj);
            }
            onSuc();
          } else {
            onFail();
            console.log("rev error:", strUrl, xhr.readyState, xhr.status);
          }
        };
        xhr.onerror = function() {
          console.log("[\u65ad\u7f51\u91cd\u8fde]");
          onFail();
        };
        xhr.open("GET", strUrl, true);
        xhr.timeout = this.HTTPTimeout;
        xhr.send();
      },
      POST: function POST(url, params, suc, fail) {
        var hasFailCalled = false;
        var onFail = function onFail() {
          if (hasFailCalled) return;
          hasFailCalled = true;
          console.log(url, "[\u8fd4\u56de\u5931\u8d25]");
          fail && fail();
        };
        var sendParams = this.encodeTab(params);
        console.log("POST url:", url, params);
        if (sendParams.length > 4e3) {
          cc.error("\u6570\u636e\u8fc7\u957f,\u53d1\u9001\u5931\u8d25");
          return;
        }
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState) if (xhr.status >= 200 && xhr.status < 300) {
            var respone = xhr.responseText;
            console.log("http \u8fd4\u56de\u4fe1\u606f", respone);
            if (suc) {
              var resObj = JSON.parse(respone);
              suc(resObj);
            }
          } else onFail();
        };
        xhr.onerror = function() {
          onFail();
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.timeout = this.HTTPTimeout;
        xhr.send(sendParams);
      },
      PostBuffer: function PostBuffer(url, params, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState) if (xhr.status >= 200 && xhr.status < 300) {
            var respone = xhr.responseText;
            callback(respone);
          } else cc.log("HTTP POST return Error");
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.timeout = this.HTTPTimeout;
        xhr.send(params);
      },
      encodeTab: function encodeTab(tab) {
        var str = "";
        for (var key in tab) str = str + key + "=" + this.urlencode(tab[key]) + "&";
        str = str.slice(0, -1);
        return str;
      },
      concatTab: function concatTab(tab) {
        var str = "";
        for (var key in tab) str = str + key + "=" + tab[key] + "&";
        str = str.slice(0, -1);
        return str;
      },
      urlencode: function urlencode(str) {
        str = (str + "").toString();
        return encodeURIComponent(str).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/%20/g, "+");
      }
    };
    cc._RF.pop();
  }, {} ],
  LabelLanguage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "54f9cGdYohB9pIC+XK4s1ww", "LabelLanguage");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        index: cc.String,
        param: cc.String,
        perfix: cc.String,
        suffix: cc.String
      },
      onLoad: function onLoad() {
        if (void 0 != this.index) {
          var text = this.perfix + cc.util.getText(this.index, this.param) + this.suffix;
          var label = this.node.getComponent(cc.Label);
          if (label) label.string = text; else {
            label = this.node.getComponent(cc.RichText);
            label && (label.string = text);
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  audioData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5a37d6b64lBSKx0FzjRh2G2", "audioData");
    "use strict";
    var AUDIO_PATH = "audio/";
    var Zones = cc.Enum({
      Main: 1,
      Loading: 2,
      Instance: 3,
      Roller: 4
    });
    var main = require("main");
    var baseData = require("baseData");
    cc.Class({
      extends: baseData,
      name: "audioData",
      properties: {
        _fileName: {
          override: true,
          default: "video"
        },
        _clipBuffer: {
          type: Map,
          default: null
        },
        _playEffetTime: 0,
        _playEffetTime2: 0,
        _InInstanceZones: Zones.Main,
        _StopAllSound: false
      },
      ctor: function ctor() {
        this._clipBuffer = new Map();
      },
      SettingMusic: function SettingMusic(isOpen) {
        gameData.set("settingMusic", isOpen);
        if ("open" == isOpen) cc.director.getScene().children[0].children[0].getComponent("cc.AudioSource").play(); else {
          console.error("cc.director.getScene().children[0].children[0]2222", cc.director.getScene().children[0].children[0].name);
          cc.director.getScene().children[0].children[0].getComponent("cc.AudioSource").stop();
        }
      },
      SettingEffect: function SettingEffect(isOpen) {
        gameData.set("settingEffect", isOpen);
      },
      SettingVibratet: function SettingVibratet(isOpen) {
        gameData.set("settingVibrate", isOpen);
      },
      SwitchToMainZones: function SwitchToMainZones() {
        this._InInstanceZones = Zones.Main;
        this.playBGM();
      },
      SwitchToLoadingZones: function SwitchToLoadingZones() {
        this._InInstanceZones = Zones.Loading;
      },
      SwitchBack: function SwitchBack() {
        this._InInstanceZones = Zones.Main;
        this.resumeMusics();
      },
      SwitchToLuckyRollerZone: function SwitchToLuckyRollerZone() {
        this._InInstanceZones = Zones.Roller;
        cc.audioEngine.setMusicVolume(0);
      },
      StopAllSound: function StopAllSound() {
        this._StopAllSound = true;
        cc.game.pause();
        cc.audioEngine.setEffectsVolume(0);
      },
      ResumeAllSound: function ResumeAllSound() {
        this._StopAllSound = false;
        cc.game.resume();
        this.resumeNow();
      },
      resumeNow: function resumeNow() {
        this.resumeEffects();
        this.resumeMusics();
      },
      resumeEffects: function resumeEffects() {
        "close" == gameData.settingEffect ? cc.audioEngine.setEffectsVolume(0) : cc.audioEngine.setEffectsVolume(1);
      },
      resumeMusics: function resumeMusics() {
        "close" == gameData.settingMusic ? cc.audioEngine.setMusicVolume(0) : cc.audioEngine.setMusicVolume(1);
      },
      playBGM: function playBGM(state) {
        if ("close" == gameData.settingMusic) return;
        cc.director.getScene().children[0].children[0].getComponent("cc.AudioSource").play();
      },
      playMusic: function playMusic(path) {
        if ("close" == gameData.settingMusic) return;
        cc.util.playMusic(path);
      },
      stopBGM: function stopBGM() {
        cc.audioEngine.setMusicVolume(0);
      },
      playSoundByID: function playSoundByID(id, force) {
        var path = this._getPathByID(id);
        this.playSoundByPath(path, force);
      },
      playSoundByPath: function playSoundByPath(fullPath, force) {
        var _this = this;
        if (this._StopAllSound) return;
        if ("close" == gameData.settingEffect) return;
        if (!fullPath) return;
        var now = Date.now();
        if (!force) {
          if (now - this._playEffetTime < 300) return;
          this._playEffetTime = now;
        }
        var clip = this._clipBuffer.get(fullPath);
        if (clip) {
          cc.audioEngine.playEffect(clip, false);
          return;
        }
        cc.resources.load(fullPath, cc.AudioClip, function(err, clip) {
          if (err) {
            cc.error(err.message || err);
            return;
          }
          _this._clipBuffer.set(fullPath, clip);
          cc.audioEngine.playEffect(clip, false);
        });
      },
      _getPathByID: function _getPathByID(id) {
        var key = "link";
        var path = this.getValueByIDKey(id, key);
        if (!path) {
          cc.error("\u58f0\u97f3\u672a\u627e\u5230id = " + id);
          return;
        }
        path.indexOf(".") > 0 && (path = path.substr(0, path.indexOf(".")));
        path = path.replace(/\\/g, "/");
        return AUDIO_PATH + path;
      }
    });
    cc._RF.pop();
  }, {
    baseData: "baseData",
    main: "main"
  } ],
  baseData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7450149+klNGrPLCxWlG1q8", "baseData");
    "use strict";
    var _dataEvent = cc.systemEvent;
    var _saveKey = "";
    cc.Class({
      properties: {
        _eventHandlers: {
          default: {}
        }
      },
      setSaveKey: function setSaveKey(key) {
        _saveKey = key;
      },
      set: function set(key, value, type) {
        var _this = this;
        this[key] = type ? type(value) : value;
        var eventKey = this.__cid__ + key;
        if (this._eventHandlers[eventKey]) {
          var _loop = function _loop(i) {
            var handler = _this._eventHandlers[eventKey][i];
            if (handler) if (handler.activeInHierarchy) handler.emit(eventKey, value); else if (handler._catchEvents) handler._catchEvents[eventKey] = value; else {
              handler._catchEvents = {};
              handler.on("active", function(active) {
                if (active) {
                  for (var _key in handler._catchEvents) handler.emit(_key, handler._catchEvents[_key]);
                  handler._catchEvents = {};
                }
              });
            }
          };
          for (var i in this._eventHandlers[eventKey]) _loop(i);
        }
        _dataEvent && _dataEvent.emit(eventKey, value);
        return value;
      },
      add: function add(key, value) {
        this.plus(key, value);
      },
      sets: function sets(values) {
        for (var k in values) this.set(k, values[k]);
      },
      get: function get(key) {
        return this[key];
      },
      getNumString: function getNumString(key) {
        var num = this[key] - 0;
        num = num.toLocaleString();
        num = num.toString().replace(/\$|\,/g, "");
        return num;
      },
      getAll: function getAll() {
        return this;
      },
      plus: function plus(key, value) {
        var addValue = Number(value);
        var oriValue = Number(this.get(key));
        if (!addValue && 0 !== addValue) {
          cc.error("plus value error key value = ", key, value);
          return;
        }
        this.set(key, oriValue + addValue);
      },
      on: function on(key, callback, handler) {
        if ("function" !== typeof callback) return;
        if (handler) {
          var eventKey = this.__cid__ + key;
          handler = handler.node || handler;
          this._eventHandlers[eventKey] = this._eventHandlers[eventKey] || [];
          handler.on(eventKey, callback, handler);
          var hasPushed = false;
          for (var id in this._eventHandlers[eventKey]) if (handler == this._eventHandlers[eventKey][id]) {
            hasPushed = true;
            break;
          }
          hasPushed || this._eventHandlers[eventKey].push(handler);
        } else _dataEvent && _dataEvent.on(this.__cid__ + key, callback);
        var value = this.get(key);
        void 0 !== value && callback(value);
      },
      off: function off(key, callback, handler) {
        if (handler) {
          handler = handler.node || handler;
          callback ? handler.off(this.__cid__ + key, callback, handler) : handler.targetOff(this.__cid__ + key);
        } else _dataEvent && _dataEvent.off(this.__cid__ + key, callback);
      },
      bindLable: function bindLable(key, lable, iBaseNum, useDefaultConver) {
        var nodeLable = lable.getComponent(cc.Label) || lable.getComponent(cc.EditBox);
        if (!nodeLable) {
          cc.error("bindLable arg2 mush be a cc.Lable");
          return;
        }
        this.on(key, function(text) {
          if (!cc.isValid(lable)) return;
          if ("number" == typeof text) {
            iBaseNum = iBaseNum || 1;
            if (true == useDefaultConver) {
              if (1 == iBaseNum) text = cc.util.getEasyNum(text); else if (100 == iBaseNum) if (text >= 1e6) {
                var wan = 1e6;
                text = text >= 1e3 * wan ? Math.floor(text / wan) + "\u4e07" : text >= 100 * wan ? (Math.floor(text / 1e5) / 10).toFixed(1) + "\u4e07" : (Math.floor(text / 1e4) / 100).toFixed(2) + "\u4e07";
              } else text = text >= 1e5 ? (Math.floor(text / 10) / 10).toFixed(1) : (text / iBaseNum).toFixed(2);
            } else text /= iBaseNum;
          } else iBaseNum && cc.error("bindLable value is not a number key = " + key);
          nodeLable.string = text;
          lable.changeStrFunc && lable.changeStrFunc(text);
        }.bind(this));
      },
      setLableText: function setLableText(key, lable) {
        var nodeLable = lable.getComponent(cc.Label) || lable.getComponent(cc.EditBox);
        if (!nodeLable) {
          cc.error("bindLable arg2 mush be a cc.Lable");
          return;
        }
        var text = this.get(key);
        nodeLable.string = text;
      },
      undefinedOrSet: function undefinedOrSet(key, value, type) {
        cc.util.isNull(this.get(key)) && this.set(key, value, type);
      },
      save: function save(key) {
        if (!this.__cid__ || "" == this.__cid__) return;
        var value = this.get(key);
        null === value || void 0 === value || "undefined" === value || "null" === value ? cc.sys.localStorage.removeItem(_saveKey + this.__cid__ + key) : cc.sys.localStorage.setItem(_saveKey + this.__cid__ + key, JSON.stringify(value));
        return value;
      },
      read: function read(key, def) {
        if (!this.__cid__ || "" == this.__cid__) return;
        var value = cc.sys.localStorage.getItem(_saveKey + this.__cid__ + key);
        if ("" !== value) try {
          value = JSON.parse(value);
          null !== value && void 0 !== value || (value = def);
        } catch (e) {
          cc.error(key + " " + value);
          cc.error(e);
        } else value = void 0;
        return value;
      },
      autoReadSave: function autoReadSave(key, def) {
        var _this2 = this;
        this.autoKey = this.autoKey || {};
        if (this.autoKey[key]) return;
        var isFirst = true;
        this.autoKey[key] = true;
        var value = this.read(key, def);
        void 0 !== value ? this.set(key, value) : isFirst = null;
        this.on(key, function(text) {
          if (isFirst) {
            isFirst = null;
            return;
          }
          this.save(key);
        }.bind(this));
        cc.game.on(cc.game.EVENT_HIDE, function() {
          _this2.save(key);
        });
        return value;
      },
      getIsAutoSave: function getIsAutoSave(key) {
        return this.autoKey && this.autoKey[key];
      },
      storeValue: function storeValue(key) {
        var value = this.get(key);
        cc.sys.localStorage.setItem(key, value);
      },
      readValue: function readValue(key) {
        var value = cc.sys.localStorage.getItem(key);
        return value;
      }
    });
    cc._RF.pop();
  }, {} ],
  baseDlg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dc45eMTOfdKV42xSlRVcbBr", "baseDlg");
    "use strict";
    var baseNode = require("baseNode");
    cc.Class({
      extends: baseNode,
      properties: {
        mask: {
          default: true
        },
        istouchClose: {
          default: true
        }
      },
      onLoad: function onLoad() {
        var _this = this;
        this._super();
        cc.initMsg.commonFixScale(this.node);
        this.mask && cc.util.loadSp(this.node, "img/common/box1", function(sp_bg) {
          sp_bg.color = cc.Color.BLACK;
          sp_bg.opacity = _this.mask ? 200 : 1;
          sp_bg.lwMaskName = "lwMaskName";
          sp_bg.zIndex = -1;
          sp_bg.width = 2e3;
          sp_bg.height = 2e3;
          sp_bg.touchDing(function() {
            _this.istouchClose && _this.cantouch && _this.touchClose();
          }, true);
        });
      }
    });
    cc._RF.pop();
  }, {
    baseNode: "baseNode"
  } ],
  baseNode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e26deZ33GdISKYijAufdHan", "baseNode");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        openAction: {
          default: false
        }
      },
      onLoad: function onLoad() {
        cc.util.setNodeMap(this.node, this);
        this.cantouch = false;
      },
      onEnter: function onEnter() {},
      show: function show() {
        this.__showing__ = true;
        var children = this.node.parent.children;
        var zIndex = 0;
        for (var _i = 0; _i < children.length; _i++) {
          var max = Math.max(zIndex, children[_i].zIndex);
          max < cc.macro.MAX_ZINDEX && (zIndex = max);
        }
        this.node.zIndex = zIndex + 1;
        if (this.openAction) {
          var children = this.node.children;
          for (var i = 0; i < children.length; i++) if ("lwMaskName" != children[i].lwMaskName) {
            var oriScale = children[i].scale;
            var action3 = cc.scaleTo(.13, oriScale);
            var action4 = cc.scaleTo(.08, oriScale + .02);
            var action5 = cc.scaleTo(.08, oriScale);
            var action1 = cc.scaleTo(.005, .5);
            var action2 = cc.scaleTo(.13, oriScale + .05);
            var seq = void 0;
            seq = cc.sequence(cc.hide(), action1, cc.show(), action2, action3, action4, action5);
            seq.easing(cc.easeOut(1));
            children[i].runAction(seq);
          }
        }
      },
      touchClose: function touchClose() {
        uiFunc.closeUI(this, null, true);
      },
      hide: function hide() {
        this.node.zIndex = 0;
      },
      lateUpdate: function lateUpdate() {
        if (this.__showing__ && this.onEnter) {
          this.__showing__ = false;
          if (this.openAction) {
            this.cantouch = false;
            this.scheduleOnce(function() {
              this.cantouch = true;
            }, .8);
            this.scheduleOnce(function() {
              this.onEnter();
            }, .05);
          } else {
            this.cantouch = true;
            this.onEnter();
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  baseWin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4bd626EfaFBWogKVno/vNjO", "baseWin");
    "use strict";
    var baseNode = require("baseNode");
    cc.Class({
      extends: baseNode,
      properties: {},
      onLoad: function onLoad() {
        this._super();
        this.addComponent(cc.BlockInputEvents);
      }
    });
    cc._RF.pop();
  }, {
    baseNode: "baseNode"
  } ],
  extend: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "358acKCfclATbz+L2laR8UY", "extend");
    "use strict";
    var main = require("main");
    cc.GM = {};
    cc.GM.hasLoadImg = {};
    cc.GM.hasLoadSound = {};
    cc.GM.hasLoadCsv = {};
    cc.GM.hasLoadPrefab = {};
    cc.GM.hasLoadJson = {};
    cc.GM.config = {
      isAd: true
    };
    Date.prototype.Format = function(fmt) {
      var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
      };
      /(y+)/.test(fmt) && (fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (var k in o) new RegExp("(" + k + ")").test(fmt) && (fmt = fmt.replace(RegExp.$1, 1 == RegExp.$1.length ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    };
    cc.Node.prototype.loadUrlImage = function(url, type) {
      var _this = this;
      if (!url) return;
      url = url.replace(/\s+/g, "");
      if (cc.GM.hasLoadImg[url]) this.getComponent(cc.Sprite).spriteFrame = cc.GM.hasLoadImg[url]; else {
        type || (type = cc.util.getSuffixName(url));
        cc.loader.load({
          url: url,
          type: type
        }, function(err, texture) {
          err && console.error(err);
          var sprite = _this.getComponent(cc.Sprite);
          if (sprite && texture) {
            var spriteFrame = new cc.SpriteFrame(texture);
            sprite.spriteFrame = spriteFrame;
            cc.GM.hasLoadImg[url] = spriteFrame;
          }
        });
      }
    };
    cc.Node.prototype.unbindTouch = function() {
      this.off(cc.Node.EventType.TOUCH_START);
      this.off(cc.Node.EventType.TOUCH_MOVE);
      this.off(cc.Node.EventType.TOUCH_END);
      this.off(cc.Node.EventType.TOUCH_CANCEL);
      this.off(cc.Node.EventType.MOUSE_ENTER);
      this.off(cc.Node.EventType.MOUSE_LEAVE);
      return this;
    };
    cc.GM.pAdd = function(v1, v2) {
      return cc.v2(v1.x + v2.x, v1.y + v2.y);
    };
    cc.GM.pSub = function(v1, v2) {
      return cc.v2(v1.x - v2.x, v1.y - v2.y);
    };
    cc.Node.prototype.bindTouchLocate = function(pxOrCcp, py) {
      this.on(cc.Node.EventType.TOUCH_START, function(event) {
        this.lBeganPos_ = this.getPosition();
        this.lBeganPoint_ = cc.v2(event.touch._point.x, event.touch._point.y);
      }, this);
      this.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
        this.setPosition(cc.GM.pAdd(this.lBeganPos_, cc.GM.pSub(event.touch._point, this.lBeganPoint_)));
      }, this);
      this.on(cc.Node.EventType.TOUCH_END, function(event) {
        var pw = cc.winSize.width, ph = cc.winSize.height;
        if (null != this.getParent()) {
          var size = this.getParent().getContentSize();
          pw = size.width;
          ph = size.height;
        }
      }, this);
      return this;
    };
    cc.Node.prototype.touchDing = function(fn, touchSilence, Shield) {
      this.unbindTouch();
      this.lastClickTime = 0;
      this.clickCdTime = 300;
      this.canTouch = true;
      this.iHasTouchBegan = false;
      this.on(cc.Node.EventType.TOUCH_START, function(event) {
        if (false == this.canTouch) return;
        this.iHasTouchBegan = true;
        this.BeganScale_ = this.scale;
        this.BeganOpacity_ = this.opacity;
        if (touchSilence) this._startPos = cc.v2(event.currentTouch._point.x, event.currentTouch._point.y); else {
          this.setScale(.9 * this.BeganScale_);
          this.opacity = .9 * this.BeganOpacity_;
        }
      }, this);
      this.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
        if (false == this.canTouch) return;
        if (false == this.iHasTouchBegan) return;
        this.iHasTouchBegan = false;
        if (!touchSilence) {
          this.setScale(this.BeganScale_);
          this.opacity = this.BeganOpacity_;
        }
      }, this);
      this.on(cc.Node.EventType.TOUCH_END, function(event) {
        if (false == this.canTouch) return;
        if (false == this.iHasTouchBegan) return;
        this.iHasTouchBegan = false;
        if (!touchSilence) {
          this.setScale(this.BeganScale_);
          this.opacity = this.BeganOpacity_;
          cc.util.SoundClick();
        }
        if (!Shield) {
          var now = cc.util.getNow();
          if (now - this.lastClickTime < this.clickCdTime) {
            console.log("---\u5c4f\u853d\u8fc7\u5feb\u70b9\u51fb---");
            return;
          }
          this.lastClickTime = now;
        }
        fn && fn(event);
      }, this);
      this.autoClick = function() {
        fn();
      };
      return this;
    };
    cc.Node.prototype.onClick = function(func, target, isNotScale) {
      var button = this.getComponent(cc.Button);
      if (!button) {
        button = this.addComponent(cc.Button);
        button.transition = cc.Button.Transition.SCALE;
      }
      isNotScale ? button.transition = cc.Button.Transition.NONE : button.zoomScale = .9;
      var CD_TIME = 300;
      var LAST_CLICK_TIME = 0;
      var closure = function closure() {
        var fullPath = "audio/common/Common_Panel_Dialog_Pop_Sound";
        null == cc.GM.hasLoadSound[fullPath] ? cc.resources.load(fullPath, cc.AudioClip, function(err, clip) {
          cc.audioEngine.playEffect(clip, false);
          cc.GM.hasLoadSound[fullPath] = clip;
        }) : cc.audioEngine.playEffect(cc.GM.hasLoadSound[fullPath], false);
        var now = cc.util.getNow();
        if (now - LAST_CLICK_TIME < CD_TIME) {
          console.log("---\u5c4f\u853d\u8fc7\u5feb\u70b9\u51fb---");
          return;
        }
        LAST_CLICK_TIME = now;
        func.call(target);
      };
      this.off("click");
      this.on("click", closure, target);
      this.autoClick = function() {
        func.call(target);
      };
    };
    var CHILD_ADDED = "child-added";
    var CHILD_REMOVED = "child-removed";
    var getChildByName = cc.Node.prototype.getChildByName;
    cc.Node.prototype.getChildByName = function(name) {
      var _this2 = this;
      if (!this._childByName) {
        this._childByName = {};
        var locChildren = this._children;
        for (var i = 0, len = locChildren.length; i < len; i++) {
          var childName = locChildren[i]._name;
          childName && (this._childByName[childName] = locChildren[i]);
        }
        this.on(CHILD_ADDED, function(child) {
          child._name && (_this2._childByName[child._name] = child);
        });
        this.on(CHILD_REMOVED, function(child) {
          child._name && _this2._childByName[child._name] == child && (_this2._childByName[child._name] = void 0);
        });
      }
      return this._childByName[name];
    };
    cc.Node.prototype.setLabel = function(str, maxTextWidth) {
      this._lwLabel = this._lwLabel || this.getComponent(cc.Label);
      if (this._lwLabel && null != str) {
        this._lwLabel.string = str;
        if (maxTextWidth) {
          var curWidth = this._lwLabel.width;
          if (curWidth > maxTextWidth) {
            var maxLen = str.length * maxTextWidth / curWidth;
            this._lwLabel.string = str.substr(0, maxLen) + "...";
          }
        }
      }
    };
    cc.Node.prototype.delayCall = function(func, delayTime, bRepeat) {
      var action = cc.sequence(cc.delayTime(delayTime), cc.callFunc(func));
      bRepeat && (action = "number" === typeof bRepeat ? action.repeat(bRepeat) : action.repeatForever());
      this.runAction(action);
    };
    cc.Node.prototype.delayStopCall = function(func, delayTime, bRepeat) {
      this.stopAllActions();
      cc.director.getActionManager().removeAllActionsFromTarget(this);
      var action = cc.sequence(cc.delayTime(delayTime), cc.callFunc(function() {
        func();
      }, this));
      bRepeat && (action = "number" === typeof bRepeat ? action.repeat(bRepeat) : action.repeatForever());
      this.runAction(action);
    };
    cc.Node.prototype.delayRemove = function(delayTime) {
      var action = cc.sequence(cc.delayTime(delayTime), cc.removeSelf());
      this.runAction(action);
    };
    cc.Node.prototype.runAc = function(action) {
      this.stopAllActions();
      cc.director.getActionManager().removeAllActionsFromTarget(this);
      this.runAction(action);
    };
    String.prototype.format = function(args) {
      var result = this;
      if (arguments.length > 0) if (1 == arguments.length && "object" == typeof args) {
        for (var key in args) if (void 0 != args[key]) {
          var reg = new RegExp("({)" + key + "(})", "g");
          result = result.replace(reg, args[key]);
        }
      } else for (var i = 0; i < arguments.length; i++) if (void 0 != arguments[i]) {
        var reg = new RegExp("({)" + i + "(})", "g");
        result = result.replace(reg, arguments[i]);
      }
      return result;
    };
    cc.Node.prototype.to = function(father, zorder, tag) {
      zorder = zorder || 0;
      null != tag ? father.addChild(this, zorder, tag) : father.addChild(this, zorder);
      return this;
    };
    cc.Node.prototype.p = function(xOrCcp, py) {
      var x = xOrCcp;
      if (null == y) {
        y = xOrCcp.y;
        x = xOrCcp.x;
      }
      this.setPosition(x, y);
      return this;
    };
    cc.Node.maxTouchNum = 1;
    cc.Node.touchNum = 0;
    var __dispatchEvent__ = cc.Node.prototype.dispatchEvent;
    var onPostActivated = cc.Node.prototype._onPostActivated;
    cc.Node.prototype._onPostActivated = function(active) {
      if (!active && this._canTouch) {
        this._canTouch = false;
        cc.Node.touchNum--;
      }
      onPostActivated.call(this, active);
      this.emit("active", active);
    };
    var onPreDestroy = cc.Node.prototype._onPreDestroy;
    cc.Node.prototype._onPreDestroy = function() {
      if (this._canTouch) {
        this._canTouch = false;
        cc.Node.touchNum--;
      }
      this.emit("destory");
      onPreDestroy.call(this);
    };
    cc.Node.prototype.pp = function(pxOrCcp, py) {
      var px = pxOrCcp;
      if (null == px) {
        px = .5;
        py = .5;
      } else if (null == py) {
        py = pxOrCcp.y;
        px = pxOrCcp.x;
      }
      var pw = cc.winSize.width, ph = cc.winSize.height;
      if (null != this.getParent()) {
        var size = this.getParent().getContentSize();
        pw = size.width;
        ph = size.height;
      }
      this.setPosition(pw * px, ph * py);
      return this;
    };
    cc._RF.pop();
  }, {
    main: "main"
  } ],
  gameData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "726a9nLvk9HcZHfZonBu4ZM", "gameData");
    "use strict";
    var baseData = require("baseData");
    cc.Class({
      extends: baseData,
      name: "gameData",
      properties: {
        _lastSaveKey: "LOCAL",
        luckyRollerMultiple: void 0,
        luckyRollerTicket: void 0,
        golds: void 0,
        diamonds: void 0
      },
      ctor: function ctor() {
        this.initSaveData("LOCAL");
        this.initgameData();
      },
      initLastSaveData: function initLastSaveData() {
        var savekey = this.readValue("_lastSaveKey");
        if (savekey) {
          this.initSaveData(savekey);
          return true;
        }
        return false;
      },
      initSaveData: function initSaveData(key) {
        this.set("_lastSaveKey", key);
        this.storeValue("_lastSaveKey");
        this.setSaveKey(key);
        this.autoReadSave("settingMusic");
        this.autoReadSave("settingEffect");
        this.autoReadSave("settingVibrate");
        this.autoReadSave("golds");
        this.autoReadSave("diamonds");
        this.autoReadSave("checkPoint");
        this.autoReadSave("shareTime");
        this.autoReadSave("watchTime");
        this.autoReadSave("todate");
        this.autoReadSave("openid");
        this.autoReadSave("collect");
        this.autoReadSave("jumps");
        this.autoReadSave("prizes");
        this.autoReadSave("spdAlway");
        this.autoReadSave("mName");
        this.autoReadSave("mHead");
        this.autoReadSave("useSkin");
        this.autoReadSave("signDay");
        this.autoReadSave("isSign");
        this.autoReadSave("przIdx");
        this.autoReadSave("frTime");
        this.autoReadSave("zuoshou");
        this.autoReadSave("tdBest1");
        this.autoReadSave("score1");
        this.autoReadSave("tdBest2");
        this.autoReadSave("score2");
        this.autoReadSave("tdBest3");
        this.autoReadSave("score3");
        this.autoReadSave("offline");
        for (var i = 2; i <= cc.initMsg.pifuMax; i++) this.autoReadSave("hsp" + i);
      },
      initgameData: function initgameData() {
        this.undefinedOrSet("luckyRollerTicket", 2);
        this.undefinedOrSet("luckyRollerMultiple", 0);
        this.undefinedOrSet("settingMusic", "close");
        this.undefinedOrSet("settingEffect", "close");
        this.undefinedOrSet("settingVibrate", "close");
        this.undefinedOrSet("golds", 50);
        this.undefinedOrSet("diamonds", 0);
        this.undefinedOrSet("checkPoint", 1);
        this.undefinedOrSet("shareTime", 0);
        this.undefinedOrSet("watchTime", 0);
        this.undefinedOrSet("todate", cc.util.getDate());
        this.undefinedOrSet("openid", "white");
        this.undefinedOrSet("collect", 0);
        this.undefinedOrSet("jumps", []);
        this.undefinedOrSet("prizes", []);
        this.undefinedOrSet("spdAlway", 0);
        this.undefinedOrSet("mName", "white");
        this.undefinedOrSet("mHead", "");
        this.undefinedOrSet("useSkin", 1);
        this.undefinedOrSet("signDay", 1);
        this.undefinedOrSet("isSign", 0);
        this.undefinedOrSet("przIdx", 41);
        this.undefinedOrSet("frTime", 0);
        this.undefinedOrSet("zuoshou", 1);
        this.undefinedOrSet("tdBest1", 0);
        this.undefinedOrSet("score1", 0);
        this.undefinedOrSet("tdBest2", 0);
        this.undefinedOrSet("score2", 0);
        this.undefinedOrSet("tdBest3", 0);
        this.undefinedOrSet("score3", 0);
        this.undefinedOrSet("offline", cc.util.getNow());
        this.hsp1 = 1;
        for (var i = 2; i <= cc.initMsg.pifuMax; i++) this.undefinedOrSet("hsp" + i, 0);
      }
    });
    cc._RF.pop();
  }, {
    baseData: "baseData"
  } ],
  initDatas: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "55352VCpyNKkpwvckGX50Wu", "initDatas");
    "use strict";
    var dataKeys = [ "webData", "wxData", "gameData", "audioData", "shareData" ];
    for (var k in dataKeys) try {
      var dataModuleName = dataKeys[k];
      var className = require(dataModuleName);
      window[dataModuleName] = window[dataModuleName] || new className();
    } catch (e) {
      cc.log(e);
    }
    cc._RF.pop();
  }, {} ],
  initMsg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6a8c3iExahIm6Pw4YPEFat6", "initMsg");
    "use strict";
    var initMsg = {};
    initMsg.dt = .01667;
    initMsg.dt3 = .0125;
    initMsg.white = "white";
    initMsg.rogue = false;
    initMsg.adPass = false;
    initMsg.hightShare = false;
    initMsg.frTime = 5;
    initMsg.maxReliveTime = 2;
    initMsg.wdRank = false;
    initMsg.readRank = false;
    initMsg.thankTime = 2.5;
    initMsg.chooseRank = 1;
    initMsg.defbodyCount = 5;
    initMsg.eatDistance = 48;
    initMsg.colidDis = .89 * initMsg.eatDistance;
    initMsg.tarDistance = .94 * initMsg.eatDistance;
    initMsg.xitieMulti = 2;
    initMsg.avoidDis = 1.5 * initMsg.eatDistance;
    initMsg.foodUp = 350;
    initMsg.debugViewMode = false;
    initMsg.dbShowTarget = false;
    initMsg.leftTime = 300;
    initMsg.defUseWidth = 36;
    initMsg.pifuMax = 43;
    initMsg.dtT = .07;
    initMsg.hightShare = false;
    initMsg.shouQuan = false;
    initMsg.chooseModel = 1;
    initMsg.init = function() {
      if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        initMsg.systemInfo = wx.getSystemInfoSync();
        console.log("initMsg.systemInfo", initMsg.systemInfo);
        null == initMsg.systemInfo && (initMsg.systemInfo = 15);
      } else initMsg.systemInfo = {
        benchmarkLevel: 13
      };
      initMsg.systemInfo.benchmarkLevel < 2 && (initMsg.systemInfo.benchmarkLevel = 15);
      if (initMsg.systemInfo.benchmarkLevel < 8.5) {
        initMsg.isLowConfig = true;
        initMsg.spliceSome();
        initMsg.foodUp = 250;
        initMsg.dtT = .14;
      } else initMsg.isLowConfig = false;
    };
    initMsg.host = "https://www.";
    initMsg.share = [];
    initMsg.getShareInfo = function() {
      var info = {};
      var rand = cc.util.randInt(0, initMsg.share.length - 1);
      info.title = initMsg.share[rand].title;
      info.imageUrl = initMsg.host + initMsg.share[rand].url;
      var tab = initMsg.share[rand].url.split("/");
      info.shareUrl = tab[tab.length - 1];
      info.query = "shareId=" + this._shareId + "&shareUrl=" + info.shareUrl;
      return info;
    };
    initMsg.getShareInfoXuanyao = function() {
      var info = {};
      info.title = "\u4e00\u8d77\u8e66\u8e66\u7403\uff0c\u6211\u5728" + initMsg.rankDescTab[initMsg.chooseRank] + "\u8e66\u5230\u4e86" + initMsg.xuanyaoScore + "\u5206\uff0c\u6211\u5728\u8fd9\u7b49\u4f60\u5466\uff01";
      info.imageUrl = initMsg.host + "bengqiu/1.jpg";
      info.shareUrl = "shareUrl";
      info.query = "shareId=" + this._shareId + "&shareUrl=" + info.shareUrl;
      return info;
    };
    initMsg.sendScore = function() {
      var str = "score" + initMsg.chooseRank;
      var score = gameData.get(str);
      wxUtil.postMessage(str, score);
    };
    initMsg.verifyAnimation = function(states, aniTab) {
      if (aniTab.hasTransAnimation) return;
      for (var i in states) if (aniTab[i]) {
        var key = states[i];
        if ("number" === typeof aniTab[i][1]) {
          aniTab[key] = [];
          for (var j = aniTab[i][1]; j <= aniTab[i][2]; j++) {
            var str = aniTab[i][0] + j;
            if (aniTab[i][3]) {
              var dic = {
                flipX: true,
                str: str
              };
              aniTab[key].push(dic);
            } else aniTab[key].push(str);
          }
        } else aniTab[key] = aniTab[i];
      }
      aniTab.hasTransAnimation = true;
    };
    initMsg.commonFixScale = function(node) {
      if (this.defScale) ; else {
        var defaultRatio = 1280 / 720;
        var ratio = null;
        ratio = cc.winSize.height / cc.winSize.width > 1 ? cc.winSize.height / cc.winSize.width : cc.winSize.width / cc.winSize.height;
        var defScale = defaultRatio / ratio;
        if (defScale < .99) {
          defScale /= .95;
          defScale > 1 && (defScale = 1);
        } else defScale > 1 && (defScale = 1);
        this.defScale = defScale;
        this.defScaleX2 = 2 * defScale;
      }
      var children = node.children;
      for (var i = 0; i < children.length; i++) children[i].setScale(this.defScale);
    };
    initMsg.lastAllTime = 0;
    initMsg.recordGameTime = function() {
      if (cc.GM.mainScene && cc.GM.mainScene.nowAllTime) {
        var nowAllTime = 30 * Math.ceil(cc.GM.mainScene.nowAllTime / 30);
        if (nowAllTime > initMsg.lastAllTime) {
          initMsg.lastAllTime = nowAllTime;
          if (nowAllTime >= 1200) {
            initMsg.lastAllTime = 299970;
            nowAllTime = 1200;
          }
        }
      }
    };
    initMsg.getSaveDic = function() {
      var dic = {};
      for (var i in gameData.autoKey) dic[i] = gameData[i];
      return JSON.stringify(dic);
    };
    initMsg.setScore = function(guanka, score) {
      var realGuan = guanka - 1;
      var tab = [];
      if (gameData.scores[realGuan]) {
        if (score > gameData.scores[realGuan]) {
          gameData.scores[realGuan] = score;
          gameData.set("scores", gameData.scores);
        }
      } else {
        var maxNum = Math.max(gameData.scores.length, guanka);
        for (var i = 0; i < maxNum; i++) i == realGuan ? tab[i] = score : gameData.scores[i] ? tab[i] = gameData.scores[i] : tab[i] = 0;
        gameData.set("scores", tab);
      }
    };
    initMsg.mY1 = 1270;
    initMsg.mY2 = 1285;
    initMsg.mY3 = -1270;
    initMsg.mY4 = -1285;
    initMsg.mY5 = 1230;
    initMsg.mY6 = -1 * initMsg.mY5;
    initMsg.mX1 = 2430;
    initMsg.mX2 = 2445;
    initMsg.mX3 = -2430;
    initMsg.mX4 = -2445;
    initMsg.mX5 = 2400;
    initMsg.mX6 = -1 * initMsg.mX5;
    initMsg.skin0 = {
      head: "img/snake/head_36",
      tail: "img/snake/tail_36",
      body: "img/snake/body_36"
    };
    for (var i = 1; i <= initMsg.pifuMax; i++) {
      var str = "skin" + i;
      initMsg[str] = {
        head: "img/snake/head_" + i,
        body: "img/snake/body_" + i
      };
    }
    initMsg.skin36.tail = "img/snake/tail_36";
    initMsg.skin15.head_pos = cc.v2(10, 0);
    initMsg.skin16.head_pos = cc.v2(-8, 0);
    initMsg.skin17.head_pos = cc.v2(3, 1);
    initMsg.skin19.head_pos = cc.v2(-8, 0);
    initMsg.skin20.head_pos = cc.v2(-8, 0);
    initMsg.skin21.head_pos = cc.v2(-5, 0);
    initMsg.skin25.head_pos = cc.v2(-3, 0);
    initMsg.skin28.head_pos = cc.v2(0, 3);
    initMsg.skin29.head_pos = cc.v2(7, 4);
    initMsg.skin30.head_pos = cc.v2(-5, 1);
    initMsg.skin33.head_pos = cc.v2(6, 0);
    initMsg.skin35.head_pos = cc.v2(-4, -1);
    initMsg.skin38.head_pos = cc.v2(-16, 0);
    initMsg.skin39.head_pos = cc.v2(-6, 5);
    initMsg.skin42.head_pos = cc.v2(-6, 3);
    initMsg.foodLevel1 = [ "img/snake/food21", "img/snake/food31", "img/snake/food41", "img/snake/food51" ];
    initMsg.foodLevel2 = [ "img/snake/food22", "img/snake/food32", "img/snake/food42", "img/snake/food52" ];
    initMsg.foodLevel3 = [ "img/snake/food23", "img/snake/food33", "img/snake/food43", "img/snake/food53" ];
    initMsg.foodLevel4 = [ "img/snake/food24", "img/snake/food34", "img/snake/food44", "img/snake/food54" ];
    initMsg.foodLevel5 = [ "img/snake/food25", "img/snake/food35", "img/snake/food45", "img/snake/food55" ];
    initMsg.foodLevel6 = [ "img/snake/food26", "img/snake/food36", "img/snake/food46", "img/snake/food56" ];
    initMsg.nameTab = [ "Nancy", "Emma", "Marie", "Alan", "Kyle", "Kelvin", "Chris", "Kelly", "Lane", "Holt", "Walter", "Scales", "Tommy", "Work", "What", "Terry", "Aidan", "Wilbert", "Gilbert", "Theobald", "Lee", "Williams", "Hunter", "Ahern", "Kevin", "Adair", "Kane", "Buff", "When", "Mike", "Smith", "Gold", "Ghost", "Good", "Who", "Awen", "Love", "She", "Dog", "Boy", "Girl", "Satyr", "Coward", "Madcap", "Done" ];
    initMsg.foodValueTab = [ 1, 1, 1.4, 1.8, 2.2, 2.5 ];
    initMsg.defsnkScale = .35;
    initMsg.levelChange = [ [ 2, initMsg.defsnkScale, initMsg.defbodyCount ], [ 4, initMsg.defsnkScale + .01, initMsg.defbodyCount + 1 ], [ 6, initMsg.defsnkScale + .02, initMsg.defbodyCount + 2 ], [ 8, initMsg.defsnkScale + .03, initMsg.defbodyCount + 3 ], [ 10, initMsg.defsnkScale + .04, initMsg.defbodyCount + 4 ], [ 13, initMsg.defsnkScale + .05, initMsg.defbodyCount + 5 ], [ 16, initMsg.defsnkScale + .06, initMsg.defbodyCount + 6 ], [ 19, initMsg.defsnkScale + .07, initMsg.defbodyCount + 7 ], [ 21, initMsg.defsnkScale + .08, initMsg.defbodyCount + 8 ], [ 25, initMsg.defsnkScale + .09, initMsg.defbodyCount + 9 ], [ 29, initMsg.defsnkScale + .1, initMsg.defbodyCount + 10 ], [ 33, initMsg.defsnkScale + .11, initMsg.defbodyCount + 11 ], [ 37, initMsg.defsnkScale + .12, initMsg.defbodyCount + 12 ], [ 41, initMsg.defsnkScale + .13, initMsg.defbodyCount + 13 ], [ 45, initMsg.defsnkScale + .14, initMsg.defbodyCount + 14 ], [ 55, initMsg.defsnkScale + .15, initMsg.defbodyCount + 15 ], [ 60, initMsg.defsnkScale + .16, initMsg.defbodyCount + 16 ], [ 65, initMsg.defsnkScale + .17, initMsg.defbodyCount + 17 ], [ 70, initMsg.defsnkScale + .18, initMsg.defbodyCount + 18 ], [ 76, initMsg.defsnkScale + .19, initMsg.defbodyCount + 19 ], [ 82, initMsg.defsnkScale + .2, initMsg.defbodyCount + 20 ], [ 88, initMsg.defsnkScale + .21, initMsg.defbodyCount + 21 ], [ 94, initMsg.defsnkScale + .22, initMsg.defbodyCount + 22 ], [ 100, initMsg.defsnkScale + .23, initMsg.defbodyCount + 23 ], [ 107, initMsg.defsnkScale + .24, initMsg.defbodyCount + 24 ], [ 114, initMsg.defsnkScale + .25, initMsg.defbodyCount + 25 ], [ 121, initMsg.defsnkScale + .26, initMsg.defbodyCount + 26 ], [ 128, initMsg.defsnkScale + .27, initMsg.defbodyCount + 27 ], [ 135, initMsg.defsnkScale + .28, initMsg.defbodyCount + 28 ], [ 143, initMsg.defsnkScale + .29, initMsg.defbodyCount + 29 ], [ 151, initMsg.defsnkScale + .3, initMsg.defbodyCount + 30 ], [ 159, initMsg.defsnkScale + .31, initMsg.defbodyCount + 31 ], [ 167, initMsg.defsnkScale + .32, initMsg.defbodyCount + 32 ], [ 175, initMsg.defsnkScale + .33, initMsg.defbodyCount + 33 ], [ 190, initMsg.defsnkScale + .34, initMsg.defbodyCount + 34 ], [ 208, initMsg.defsnkScale + .35, initMsg.defbodyCount + 35 ], [ 230, initMsg.defsnkScale + .36, initMsg.defbodyCount + 36 ] ];
    initMsg.spliceSome = function(argument) {
      if (initMsg.levelChange.length > 35) {
        initMsg.levelChange.splice(29, 8);
        initMsg.defUseWidth = initMsg.defUseWidth + 2;
      }
    };
    initMsg.snakePriceTab = [ 0, 0, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 300, 320, 340, 360, 400, 440, 480, 520, 660, 720, 780, 840, 900, 990, 1080, 1180, 2180, 2180, 2180, 2180, 3200, 3200, 3200, 3200, 4500, 4500, 4500 ];
    initMsg.lianshan = [ "", "firstBlood", "doublekill", "triplekill", "quatrekill", "pentakill", "unstopppedable", "killingspree", "godlike", "legendary", "rampage", "dominating" ];
    initMsg.findTryUse = function() {
      var hasTab = [];
      var noHasTab = [];
      for (var _i = 1; _i <= initMsg.pifuMax; _i++) gameData.get("hsp" + _i) ? hasTab.push(_i) : noHasTab.push(_i);
      if (noHasTab.length > 27) {
        var rand = cc.util.randInt(20, noHasTab.length - 1);
        initMsg.trySkin = noHasTab[rand];
      } else if (0 == noHasTab.length) initMsg.trySkin = 41; else {
        var rand = cc.util.randInt(0, noHasTab.length - 1);
        initMsg.trySkin = noHasTab[rand];
      }
    };
    module.exports = initMsg;
    cc._RF.pop();
  }, {} ],
  init: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "72ebeGkqrxD6aVeuL1wK8xq", "init");
    "use strict";
    cc.util = require("util");
    cc.initMsg = require("initMsg");
    cc.main = require("main");
    require("uiFunc");
    require("initDatas");
    cc.ui = {
      baseNode: require("baseNode"),
      baseDlg: require("baseDlg"),
      baseWin: require("baseWin")
    };
    cc._RF.pop();
  }, {
    baseDlg: "baseDlg",
    baseNode: "baseNode",
    baseWin: "baseWin",
    initDatas: "initDatas",
    initMsg: "initMsg",
    main: "main",
    uiFunc: "uiFunc",
    util: "util"
  } ],
  main: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "97656HBrJdPJIAESvxEzPP8", "main");
    "use strict";
    module.exports = cc.Class({
      extends: cc.Component,
      properties: {
        buySuccess: {
          default: null,
          type: cc.AudioClip
        },
        Common_Panel_Dialog_Pop_Sound: {
          default: null,
          type: cc.AudioClip
        },
        getReward: {
          default: null,
          type: cc.AudioClip
        },
        upgrade: {
          default: null,
          type: cc.AudioClip
        },
        warning: {
          default: null,
          type: cc.AudioClip
        },
        zha: {
          default: null,
          type: cc.AudioClip
        },
        dominating: {
          default: null,
          type: cc.AudioClip
        },
        doublekill: {
          default: null,
          type: cc.AudioClip
        },
        firstBlood: {
          default: null,
          type: cc.AudioClip
        },
        godlike: {
          default: null,
          type: cc.AudioClip
        },
        killingspree: {
          default: null,
          type: cc.AudioClip
        },
        legendary: {
          default: null,
          type: cc.AudioClip
        },
        pentakill: {
          default: null,
          type: cc.AudioClip
        },
        quatrekill: {
          default: null,
          type: cc.AudioClip
        },
        rampage: {
          default: null,
          type: cc.AudioClip
        },
        triplekill: {
          default: null,
          type: cc.AudioClip
        },
        unstopppedable: {
          default: null,
          type: cc.AudioClip
        },
        audioSourceBgMusic: {
          default: null,
          type: cc.AudioSource
        }
      },
      audioPlay: function audioPlay(audio) {
        this.audioSource.clip = audio;
        this.audioSource.play();
      },
      audiopPlayBgMusic: function audiopPlayBgMusic() {
        this.audioSourceBgMusic.clip = tanchi;
        this.audioSourceBgMusic.play();
      },
      audioStopBgMusic: function audioStopBgMusic() {
        this.audioSourceBgMusic.clip = tanchi;
        this.audioSourceBgMusic.stop();
      },
      onLoad: function onLoad() {
        cc.debug.setDisplayStats(false);
        cc.util.loadText();
        this.hasPreload = false;
        this.hasEnterGame = false;
        cc.GM.mainScene = this;
        this.startTime = cc.util.getNow();
        this.hideTime = 0;
      },
      start: function start() {
        wxUtil.setKeepScreenOn();
        cc.initMsg.init();
        this.openLoading();
      },
      openLoading: function openLoading() {
        var _this = this;
        var paths = [ "img/common", "ui" ];
        uiFunc.openUI("main/uiLoading", function(uiScript) {
          uiScript.init(paths, function() {
            cc.GM.hasReadLog ? _this.loginSuccess() : gameData.openid == cc.initMsg.white && cc.util.getNow() - _this.startTime < 2800 ? _this.node.delayCall(function() {
              this.loginSuccess();
            }.bind(_this), 1.6) : _this.loginSuccess();
          });
        }, null, true);
      },
      loginSuccess: function loginSuccess() {
        if (this.hasEnterGame) return;
        this.hasEnterGame = true;
        uiFunc.openUI("main/uiHall");
        uiFunc.closeUI(cc.GM.uiLoading, null, true);
        cc.GM.uiLoading = null;
      }
    });
    cc._RF.pop();
  }, {} ],
  newUnlock: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ec16bdVf6VHFL8XE99p7j5/", "newUnlock");
    "use strict";
    cc.Class({
      extends: cc.ui.baseDlg,
      properties: {
        snakeCom: {
          default: null,
          type: cc.Prefab
        }
      },
      start: function start() {
        this.addSnake();
        var action = cc.rotateBy(2, 360);
        this.bei_guang.runAction(action.repeatForever());
        this.btn_xuanyao.touchDing(function() {
          shareData.shareToWx(function() {}, function() {});
        });
        this.btn_close.touchDing(function() {
          this.touchClose();
        }.bind(this));
        this.btn_xuanyao.active = false;
      },
      onEnter: function onEnter() {
        cc.util.playSound("common/upgrade");
      },
      addSnake: function addSnake() {
        var snake = cc.instantiate(this.snakeCom);
        snake.defUseWidth = 26;
        snake.skinIndex = cc.initMsg.unLockIndex;
        snake.nowScale = .9;
        this.snake_add.addChild(snake);
      }
    });
    cc._RF.pop();
  }, {} ],
  shareData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c04f8lRIjNGSpap3FXmHuEA", "shareData");
    "use strict";
    var baseData = require("baseData");
    cc.Class({
      extends: baseData,
      name: "shareData",
      properties: {
        _fileName: {
          override: true,
          default: "share"
        },
        isLockWatchVideo: false,
        watchVideoTime: void 0,
        shareCDTime: void 0,
        watchVideoMaxCount: void 0,
        isShareSuccess: void 0,
        videoCount: void 0,
        hasTodayShare: void 0,
        hasTodayWatchVideo: void 0,
        shareId: 1
      },
      getType: function getType(id) {
        var key = "type";
        var arr = this.getValueByIDKey(id, key).split("\u3001");
        for (var index = 0; index < arr.length; index++) {
          var type = arr[index];
          arr[index] = type.trim();
        }
        return arr;
      },
      getProbability: function getProbability(id) {
        var key = "probability";
        var arr = this.getValueByIDKey(id, key).split("\u3001");
        for (var index = 0; index < arr.length; index++) {
          var type = arr[index];
          arr[index] = type.trim();
        }
        return arr;
      },
      getItemRankArr: function getItemRankArr(id) {
        var typeArr = this.getType(id);
        var probabilityArr = this.getProbability(id);
        var arr = [];
        for (var index = 0; index < typeArr.length; index++) if (typeArr[index].trim().length > 0) {
          var item = parseInt(typeArr[index]);
          var rank = parseInt(probabilityArr[index] || "0");
          arr.push({
            item: item,
            rank: rank
          });
        }
        return arr;
      },
      getIsOpenType: function getIsOpenType(id, type) {
        var isOpenShare = false;
        var items = this.getItemRankArr(id);
        for (var index = 0; index < items.length; index++) {
          var item = parseInt(items[index].item);
          if (item == type && parseInt(items[index].rank) > 0) {
            isOpenShare = true;
            break;
          }
        }
        return isOpenShare;
      },
      setRukou: function setRukou(id, value) {
        this.set(id + "rukou", value);
      },
      getRukou: function getRukou(id) {
        return this.get(id + "rukou");
      },
      getVideoCDTime: function getVideoCDTime() {
        return 5e3;
      },
      getIsLockWatchVideo: function getIsLockWatchVideo() {
        return new Date().getTime() - this.watchVideoTime < this.getVideoCDTime();
      },
      getShareCDTime: function getShareCDTime() {
        return 2e3;
      },
      getIsInShareCDTime: function getIsInShareCDTime() {
        return new Date().getTime() - this.shareCDTime < this.getShareCDTime();
      },
      getWatchVideoMaxCount: function getWatchVideoMaxCount() {
        return 100;
      },
      getShareCount: function getShareCount() {
        return (this.get("shareCount") || 0) + (this.get("videoCount") || 0);
      },
      shareOrLookAd: function shareOrLookAd(_callback, failCall) {
        if (wxData._isExamine || cc.sys.platform !== cc.sys.WECHAT_GAME) _callback && _callback(); else {
          if (0 == gameData.shareTime) {
            this.shareToWx(_callback, failCall);
            return;
          }
          if (1 == gameData.shareTime) {
            this.watchVideo(_callback, failCall);
            gameData.add("shareTime", 1);
            return;
          }
          var delt = new Date().getTime() - this.watchVideoTime;
          if (delt < this.getVideoCDTime()) {
            if (!(delt >= 2e3)) return;
            this.shareToWx(_callback, failCall);
          } else Math.random() < .92 ? this.watchVideo(_callback, failCall) : this.shareToWx(_callback, failCall);
        }
      },
      shareToWx: function shareToWx(suc, failCall) {
        wxUtil.shareToWx({
          success: function success(res) {
            suc && suc();
          },
          fail: function fail() {
            failCall ? failCall() : util.showAlert("\u9886\u53d6\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5", 1.5);
          }
        });
      },
      watchVideo: function watchVideo(_callback, failCall) {
        var _this = this;
        this._callback = _callback;
        if (shareData.getIsLockWatchVideo()) {
          this.shareToWx(_callback, failCall);
          return;
        }
        wxUtil.fhowAD(this.shareId, function() {
          _callback && _callback();
          shareData.set("watchVideoTime", new Date().getTime());
          shareData.set("videoCount", (shareData.get("videoCount") || 0) + 1);
          shareData.set("hasTodayWatchVideo", true);
        }, function() {
          _this.shareToWx(_callback, failCall);
        });
      }
    });
    cc._RF.pop();
  }, {
    baseData: "baseData"
  } ],
  snakeAi1: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bf335mYuTlND7wMwTd50jDt", "snakeAi1");
    "use strict";
    var snakeBase = require("snakeBase");
    cc.Class({
      extends: snakeBase,
      start: function start() {
        this.skin = cc.util.randInt(30, cc.initMsg.pifuMax);
        var rand = cc.util.randInt(0, cc.initMsg.nameTab.length - 1);
        this.mName = cc.util.setTextMaxCharCode(cc.initMsg.nameTab[rand], 5);
        this.lb_name.setLabel(this.mName);
        this.changeSkin();
        this.init();
        this.pushDelay(.5, function() {
          this.canEat = true;
        }.bind(this));
        cc.GM.game.snakeTab.push(this);
        this.createShield();
        this.openAi = true;
        this.aiFunc = this.ai1Update;
      },
      update: function update(dt) {
        if (this.isAlive) {
          this.getDetectPos();
          if (this.canMove) {
            this.targetTime += dt;
            if (this.targetTime > 8) {
              this.removeTarget();
              this.setTargetPos(cc.v2(cc.util.rand(-200, 200), cc.util.rand(-200, 200)));
            }
            if (!this.inAvoid) {
              this.avoidSnake();
              this.updateTime += dt;
              if (this.updateTime > .7) {
                this.updateTime = 0;
                Math.random() < .7 && !this.inSpeedUp && this.isNeedSpeedUp();
              }
            }
            this.autoFindFoodTarget(true);
            this.turnToTarget(dt);
            this.moveStep(dt);
            this.getTargetDetect();
          }
          this.edgeDetect();
          this.callDelay(dt);
        }
      },
      onDie: function onDie() {
        this.isAlive = false;
        this.canEat = false;
        this.canCollide = false;
        this.delayCallArrays = [];
        var canRelive = Math.random() < .5;
        if (canRelive) {
          this.bodyTurnFoods(true);
          var reliveTime = cc.util.rand(1, 10);
          this.node.delayCall(function() {
            this.onRelive();
          }.bind(this), reliveTime);
        } else {
          this.bodyTurnFoods();
          cc.GM.game.isCreateNewSnake();
        }
        this.removeAllTarget();
      }
    });
    cc._RF.pop();
  }, {
    snakeBase: "snakeBase"
  } ],
  snakeBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aac19FyQ2hOgJRhyAHADMt7", "snakeBase");
    "use strict";
    var baseDelayTime = .2;
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        cc.util.setNodeMap(this.node, this);
        this.node.script = this;
        this.initBaseData();
      },
      initBaseData: function initBaseData() {
        this.getDetectPos();
        this.targetTime = 0;
        this.killCount = 0;
        this.lastKillTime = 0;
        this.lianSha = 0;
        this.xitieState = 0;
        this.levelIndex = 0;
        this.nowValue = 0;
        this.inSpeedUp = false;
        this.delayCallArrays = [];
        this.nowScale = cc.initMsg.defsnkScale;
        this.nowScaleSqrt = Math.sqrt(this.nowScale);
        this.nearDis = 40;
        this.angSpeed = 5;
        this.bodyCount = cc.initMsg.defbodyCount;
        this.diffRange = 0;
        this.freeGo = .3;
        this.m_head.useWidth = this.node.defUseWidth || cc.initMsg.defUseWidth;
        this.m_head.useParts = 0;
        this.m_head.useIndex = 0;
        this.m_tail.useWidth = this.node.defUseWidth || cc.initMsg.defUseWidth;
        this.canMove = true;
        this.baseSpeed = 300;
        this.nowSpeedLevel = 0;
        this.addSpeed = .3 * this.baseSpeed;
        this.maxSpeedLevel = 3;
        this.nowSpeed = this.baseSpeed * this.nowScaleSqrt;
        this.isAlive = true;
        this.canEat = false;
        this.canCollide = false;
        this.inAvoid = false;
        this.targetsTab = [];
        this.quickGoTab = [];
        this.bodyTab = [];
        this.walkPath = [];
        this.baseWalkPixel = 5;
        this.nowWalkPixel = this.nowSpeed / 60;
        this.updateTime = 0;
        this.updateAllTime = 0;
        this.resetEdgeDetectPos();
      },
      bodyTurnFoods: function bodyTurnFoods(waitRelive) {
        var _this = this;
        var fadeTime = .3;
        this.lb_name.active = false;
        var _loop = function _loop(i) {
          var body = _this.bodyTab[i];
          var action = null;
          action = waitRelive ? cc.sequence(cc.delayTime(fadeTime), cc.callFunc(function() {
            body.active = false;
          }, _this)) : cc.sequence(cc.fadeOut(fadeTime), cc.removeSelf());
          body.runAction(action);
          var x = body.x + cc.util.rand(-10, 10) * _this.nowScale;
          var y = body.y + cc.util.rand(-10, 10) * _this.nowScale;
          cc.GM.game.createFood(x, y, cc.util.randInt(2, 5));
        };
        for (var i = 0; i < this.bodyTab.length; i++) _loop(i);
        if (!waitRelive) {
          var action = cc.sequence(cc.delayTime(.6), cc.removeSelf());
          this.node.runAction(action);
          for (var _i in cc.GM.game.snakeTab) if (cc.GM.game.snakeTab[_i] == this) {
            cc.GM.game.snakeTab.splice(_i, 1);
            break;
          }
        }
      },
      resetEdgeDetectPos: function resetEdgeDetectPos() {
        var add = 25 - 25 * this.nowScale;
        this.mY1 = cc.initMsg.mY1 + add;
        this.mY2 = cc.initMsg.mY2 + add;
        this.mY3 = cc.initMsg.mY3 - add;
        this.mY4 = cc.initMsg.mY4 - add;
        this.mY5 = cc.initMsg.mY5 + add;
        this.mY6 = cc.initMsg.mY6 - add;
        this.mX1 = cc.initMsg.mX1 + add;
        this.mX2 = cc.initMsg.mX2 + add;
        this.mX3 = cc.initMsg.mX3 - add;
        this.mX4 = cc.initMsg.mX4 - add;
        this.mX5 = cc.initMsg.mX5 + add;
        this.mX6 = cc.initMsg.mX6 - add;
      },
      showXiTie: function showXiTie() {
        this.xi_tie.active = true;
        this.xitieState += 1;
        this.pushDelay(3.4, function() {
          this.xitieState -= 1;
          if (this.xitieState <= 0) {
            this.xitieState = 0;
            this.xi_tie.active = false;
          }
        }.bind(this));
      },
      createShield: function createShield() {
        if (this.bodyTab.length > 4 && this.bodyTab[3]) {
          this.canCollide = false;
          var shield = cc.instantiate(cc.GM.game.t_qipao);
          this.bodyTab[3].removeAllChildren();
          this.bodyTab[3].addChild(shield);
          this.pushDelay(2.3, function() {
            shield.removeFromParent();
            this.canCollide = true;
          }.bind(this));
        }
      },
      getDetectPos: function getDetectPos() {
        var x = 18 * Math.cos(-this.m_head.angle * Math.PI / 180) * this.nowScale;
        var y = 18 * Math.sin(-this.m_head.angle * Math.PI / 180) * this.nowScale;
        this.detectPos = cc.v2(this.m_head.x + x, this.m_head.y - y);
      },
      eatFood: function eatFood(food, pos, time) {
        if (food.alive) {
          food.alive = false;
          var angle = -this.m_head.angle;
          var x = Math.cos(angle * Math.PI / 180) * time * .8 * this.nowSpeed;
          var y = Math.sin(angle * Math.PI / 180) * time * .8 * this.nowSpeed;
          pos.x += x;
          pos.y -= y;
          var action = cc.sequence(cc.moveTo(time, pos), cc.callFunc(function() {
            this.addFoodValue(food.level);
          }, this), cc.removeSelf());
          food.runAction(action);
          if (Math.random() < .8) {
            cc.GM.game.createRandFood();
            Math.random() < .2 && cc.GM.game.createRandFood();
          }
          cc.GM.game.foodTab.length < 100 && cc.GM.game.createRandFood();
        }
      },
      addFoodValue: function addFoodValue(level) {
        if (50 == level) this.showXiTie(); else if (51 == level) this.createShield(); else {
          this.nowValue += cc.initMsg.foodValueTab[level];
          var tab = cc.initMsg.levelChange[this.levelIndex];
          if (tab && this.nowValue > tab[0]) {
            tab[2] != this.bodyCount ? this.addBody(tab[1]) : tab[1] != this.nowScale && this.setNowSCale(tab[1]);
            this.levelIndex += 1;
          }
        }
      },
      addSpeedLevel: function addSpeedLevel() {
        if (this.isAlive && this.nowSpeedLevel < this.maxSpeedLevel) {
          this.nowSpeedLevel += 1;
          var speed = this.nowSpeedLevel * this.addSpeed + this.baseSpeed * this.nowScaleSqrt;
          this.changeSpeed(speed);
        }
      },
      cutSpeedLevel: function cutSpeedLevel() {
        if (this.isAlive && this.nowSpeedLevel > 0) {
          this.nowSpeedLevel = 0;
          var speed = this.nowSpeedLevel * this.addSpeed + this.baseSpeed * this.nowScaleSqrt;
          this.changeSpeed(speed);
        }
      },
      setNowSCale: function setNowSCale(scale) {
        this.nowScale = scale;
        this.nowScaleSqrt = Math.sqrt(this.nowScale);
        for (var i = 0; i < this.bodyTab.length; i++) this.bodyTab[i].scale = this.nowScale;
        this.resetEdgeDetectPos();
        this.changeSpeed(this.nowSpeed);
      },
      setNowScaleMust: function setNowScaleMust() {
        this.m_tail.scale = this.nowScale;
        this.m_head.scale = this.nowScale;
      },
      init: function init() {
        this.chooseLivePos();
        this.myCreate();
      },
      chooseLivePos: function chooseLivePos() {
        var x = cc.util.rand(-2200, 2200);
        var y = cc.util.rand(-1050, 1050);
        this.m_head.setPosition(x, y);
        this.m_head.angle = -cc.util.randInt(1, 359);
      },
      changeSpeed: function changeSpeed(newSpeed) {
        var befSpeed = this.nowSpeed;
        var befWalkPixel = this.nowWalkPixel;
        this.nowSpeed = newSpeed;
        this.nowWalkPixel = newSpeed / 60;
        this.reSetUseParts();
        var length = this.m_tail.useIndex + 1;
        var newWalkPath = [];
        newWalkPath.push(this.walkPath[0]);
        for (var i = 1; i < length; i++) {
          var befIndex = Math.floor(this.nowWalkPixel * i / befWalkPixel);
          var AftIndex = befIndex + 1;
          if (null == this.walkPath[AftIndex]) {
            var lastPoint = newWalkPath[newWalkPath.length - 1];
            var addX = Math.cos(lastPoint[1] * Math.PI / 180) * cc.initMsg.dt * this.nowSpeed;
            var addY = Math.sin(lastPoint[1] * Math.PI / 180) * cc.initMsg.dt * this.nowSpeed;
            newWalkPath.push([ cc.v2(lastPoint[0].x - addX, lastPoint[0].y + addY), lastPoint[1] ]);
          } else {
            var count1 = this.nowWalkPixel * i / befWalkPixel - befIndex;
            var count2 = 1 - count1;
            var x = this.walkPath[befIndex][0].x * count2 + this.walkPath[AftIndex][0].x * count1;
            var y = this.walkPath[befIndex][0].y * count2 + this.walkPath[AftIndex][0].y * count1;
            var ang = this.walkPath[Math.round(this.nowWalkPixel * i / befWalkPixel)][1];
            newWalkPath.push([ cc.v2(x, y), ang ]);
          }
        }
        this.walkPath = newWalkPath;
      },
      myCreate: function myCreate() {
        this.bodyTab.push(this.m_head);
        for (var i = 0; i < this.bodyCount; i++) {
          var node = cc.instantiate(this.body_part);
          this.skinTab && cc.util.display(node, this.skinTab.body);
          node.useWidth = this.node.defUseWidth || cc.initMsg.defUseWidth;
          node.scale = this.nowScale;
          this.node_body.addChild(node);
          this.bodyTab.push(node);
        }
        this.bodyTab.push(this.m_tail);
        this.setNowScaleMust();
        this.reSetBodyZIndex();
        this.reSetUseParts();
        this.createBaseWalkPath();
        this.reSetBodyPos();
      },
      addBody: function addBody(newScale) {
        var node = cc.instantiate(this.body_part);
        this.skinTab && cc.util.display(node, this.skinTab.body);
        node.setPosition(5e3, 3e3);
        node.useWidth = this.node.defUseWidth || cc.initMsg.defUseWidth;
        node.scale = this.nowScale;
        this.node_body.addChild(node);
        this.bodyCount += 1;
        this.bodyTab[this.bodyTab.length - 1] = node;
        this.bodyTab.push(this.m_tail);
        this.setNowSCale(newScale);
      },
      reSetBodyZIndex: function reSetBodyZIndex() {
        this.m_tail.zIndex = -1;
        for (var i = 0; i < this.bodyTab.length - 1; i++) this.bodyTab[i].zIndex = 100 - i;
      },
      reSetUseParts: function reSetUseParts() {
        for (var i = 1; i < this.bodyTab.length; i++) {
          var targetNow = this.bodyTab[i];
          var targetBef = this.bodyTab[i - 1];
          targetNow.useParts = .5 * (targetNow.useWidth + targetBef.useWidth) * this.nowScale / this.nowWalkPixel + targetBef.useParts;
          this.bodyTab[i].useIndex = Math.round(this.bodyTab[i].useParts);
        }
      },
      reSetUseIndex: function reSetUseIndex() {
        for (var i = 1; i < this.bodyTab.length; i++) this.bodyTab[i].useIndex = Math.round(this.bodyTab[i].useParts);
      },
      createBaseWalkPath: function createBaseWalkPath() {
        var angle = -this.m_head.angle;
        var addX = Math.cos(-this.m_head.angle * Math.PI / 180) * this.nowWalkPixel;
        var addY = Math.sin(-this.m_head.angle * Math.PI / 180) * this.nowWalkPixel;
        for (var i = 0; i <= this.m_tail.useIndex; i++) {
          var tab = [ cc.v2(this.m_head.x - addX * i, this.m_head.y + addY * i), angle ];
          this.walkPath[i] = tab;
        }
      },
      reSetBodyPos: function reSetBodyPos(withAc) {
        for (var i = 1; i < this.bodyTab.length; i++) {
          var target = this.bodyTab[i];
          if (withAc) {
            var distance = cc.util.pointDistance(target, this.walkPath[target.useIndex][0]);
            if (distance > .1) {
              var action = cc.spawn(cc.moveTo(baseDelayTime, this.walkPath[target.useIndex][0]), cc.rotateTo(baseDelayTime, this.walkPath[target.useIndex][1]));
              target.runAction(action);
            }
          } else {
            target.setPosition(this.walkPath[target.useIndex][0]);
            target.angle = -this.walkPath[target.useIndex][1];
          }
        }
      },
      clearMoreBodyTab: function clearMoreBodyTab() {
        if (this.walkPath.length > this.m_tail.useIndex + 40) {
          var count = this.walkPath.length - this.m_tail.useIndex;
          this.walkPath.splice(this.m_tail.useIndex + 1, count);
        }
      },
      removeTarget: function removeTarget() {
        this.targetTime = 0;
        if (this.targetsTab[0]) {
          cc.initMsg.dbShowTarget && this.targetsTab[0].removeFromParent();
          this.targetsTab.splice(0, 1);
        }
      },
      removeAllTarget: function removeAllTarget() {
        this.targetTime = 0;
        if (cc.initMsg.dbShowTarget) for (var i = 0; i < this.targetsTab.length; i++) this.targetsTab[i].removeFromParent();
        this.targetsTab = [];
      },
      setTargetPos: function setTargetPos(targetPoint) {
        if (cc.initMsg.dbShowTarget) {
          var target = cc.instantiate(this.red_point);
          this.snake_show.addChild(target);
          target.setPosition(targetPoint);
          this.targetsTab.push(target);
        } else this.targetsTab.push(targetPoint);
      },
      turnToTarget: function turnToTarget(dt) {
        if (this.targetsTab.length > 0) {
          var target = this.targetsTab[0];
          var angleDest = cc.util.TwoPointAngle(this.m_head, target);
          var delta = Math.abs(angleDest - this.m_head.angle);
          if (delta < 2) this.m_head.angle != angleDest && (this.m_head.angle = angleDest); else if (delta < 180) this.m_head.angle += (angleDest - this.m_head.angle) * dt * this.angSpeed; else {
            var agdel = angleDest - this.m_head.angle;
            agdel < -170 ? agdel += 360 : agdel -= 360;
            var ang = (this.m_head.angle + agdel * dt * this.angSpeed) % 360;
            ang < 0 ? ang += 360 : ang > 360 && (ang -= 360);
            this.m_head.angle = ang;
          }
        }
      },
      getTargetDetect: function getTargetDetect() {
        if (this.targetsTab.length > 0) {
          var target = this.targetsTab[0];
          var distance = cc.util.pointDistance(target, this.detectPos) / this.nowScaleSqrt;
          var tarDistance = cc.initMsg.tarDistance;
          this.xitieState && (tarDistance *= 1.5);
          distance < tarDistance && this.removeTarget();
        }
      },
      moveStep: function moveStep(dt) {
        dt = dt / 4 + cc.initMsg.dt3;
        var angle = -this.m_head.angle;
        var x = Math.cos(angle * Math.PI / 180) * dt * this.nowSpeed;
        var y = Math.sin(angle * Math.PI / 180) * dt * this.nowSpeed;
        this.m_head.setPosition(this.m_head.x + x, this.m_head.y - y);
        var tab = [ cc.v2(this.m_head.x, this.m_head.y), angle ];
        this.walkPath.unshift(tab);
        this.reSetBodyPos();
        this.clearMoreBodyTab();
        this.lb_name.setPosition(this.m_head.x, this.m_head.y - 55);
      },
      deleteUnuseBody: function deleteUnuseBody() {
        var newTab = [];
        for (var i = 0; i < this.bodyTab.length; i++) this.bodyTab[i] && newTab.push(this.bodyTab[i]);
        this.bodyTab = newTab;
      },
      pushDelay: function pushDelay(dalayTime, func) {
        if (dalayTime) {
          var task = {};
          task.dalayTime = dalayTime;
          task.nowTime = 0;
          task.func = func;
          this.delayCallArrays.push(task);
        }
      },
      callDelay: function callDelay(dt) {
        if (this.delayCallArrays.length > 0) for (var i = this.delayCallArrays.length - 1; i >= 0; i--) {
          var v = this.delayCallArrays[i];
          v.nowTime += dt;
          if (v.nowTime >= v.dalayTime) {
            v.func && v.func();
            this.delayCallArrays.splice(i, 1);
          }
        }
      },
      edgeDetect: function edgeDetect() {
        this.m_head.y > this.mY1 ? this.m_head.angle > 230 && this.m_head.angle < 310 ? this.onDie() : this.m_head.y > this.mY2 && this.onDie() : this.m_head.y < this.mY3 && (this.m_head.angle > 50 && this.m_head.angle < 130 ? this.onDie() : this.m_head.y < this.mY4 && this.onDie());
        this.m_head.x > this.mX1 ? this.m_head.angle > 40 && this.m_head.angle < 320 ? this.m_head.x > this.mX2 && this.onDie() : this.onDie() : this.m_head.x < this.mX3 && (this.m_head.angle > 140 && this.m_head.angle < 220 ? this.onDie() : this.m_head.x < this.mX4 && this.onDie());
      },
      addKillCount: function addKillCount() {
        this.killCount += 1;
        this.lianSha += 1;
      },
      followNoOut: function followNoOut() {
        cc.GM.game.follow_node.x = -this.m_head.x;
        cc.GM.game.follow_node.y = -this.m_head.y;
      },
      changeSkin: function changeSkin() {
        if (this.skin) {
          this.skinTab = cc.initMsg["skin" + this.skin];
          cc.util.display(this.sp_head, this.skinTab.head);
          this.skinTab.head_pos && this.sp_head.setPosition(this.skinTab.head_pos);
          this.skinTab.tail ? cc.util.display(this.m_tail, this.skinTab.tail) : cc.util.display(this.m_tail, this.skinTab.body);
        }
      },
      addBigTouch: function addBigTouch() {
        var self = this.big_touch;
        self.canTouch = true;
        self.iHasTouchBegan = false;
        self.on(cc.Node.EventType.TOUCH_START, function(event) {
          if (false == self.canTouch) return;
          self.iHasTouchBegan = true;
          var sPos = cc.GM.snakeMe.snake_show.convertToNodeSpace(event.touch._point);
          cc.GM.snakeMe.setTargetPos(sPos);
        }, this);
        self.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
          if (false == self.canTouch) return;
          if (false == self.iHasTouchBegan) return;
        }, this);
        self.on(cc.Node.EventType.TOUCH_END, function(event) {
          if (false == self.canTouch) return;
          if (false == self.iHasTouchBegan) return;
          self.iHasTouchBegan = false;
        }, this);
        self.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          if (false == self.canTouch) return;
          if (false == self.iHasTouchBegan) return;
          self.iHasTouchBegan = false;
        }, this);
      },
      touchSpeedUp: function touchSpeedUp() {
        this.inSpeedUp = true;
        this.addSpeedLevel();
        this.nowSpeedLevel < this.maxSpeedLevel && this.pushDelay(.3, function() {
          this.inSpeedUp && this.addSpeedLevel();
        }.bind(this));
      },
      touchSpeedCancel: function touchSpeedCancel() {
        this.inSpeedUp = false;
        this.cutSpeedLevel();
      },
      autoFindFoodTarget: function autoFindFoodTarget(noEdge) {
        var length = cc.GM.game.foodTab.length;
        if (0 == this.targetsTab.length && length > 0) {
          if (this.freeGo && Math.random() < this.freeGo && !this.inSpeedUp) {
            var pos = cc.v2(this.m_head.x + cc.util.rand(-250, 250), this.m_head.y + cc.util.rand(-250, 250));
            this.setTargetPos(pos);
            return;
          }
          var min = 9999;
          var nearPos = null;
          for (var i = 0; i < length; i++) {
            var food = cc.GM.game.foodTab[i];
            var distance = cc.util.pointDistance(this.m_head, food);
            noEdge && (food.x < -2390 || food.x > 2390 || food.y < -1200 || food.y > 1200) && (distance += 5e3);
            var ang = cc.util.TwoPointAngle(this.m_head, food);
            var angDif = Math.abs(-this.m_head.angle - ang) / 20;
            distance += angDif;
            if (distance < min) {
              min = distance;
              nearPos = this.diffRange ? cc.v2(food.x + cc.util.rand(-this.diffRange, this.diffRange), food.y + cc.util.rand(-this.diffRange, this.diffRange)) : cc.v2(food.x, food.y);
            }
          }
          nearPos && this.setTargetPos(nearPos);
        }
      },
      avoidSnake: function avoidSnake() {
        if (this.m_head.y > this.mY5 || this.m_head.y < this.mY6 || this.m_head.x > this.mX5 || this.m_head.x < this.mX6) {
          this.removeTarget();
          var mPos = cc.util.pointDirectAdd(this.snake_show, this.m_head, -200);
          this.setTargetPos(mPos);
          this.inAvoid = true;
          this.pushDelay(.3, function() {
            this.inAvoid = false;
          }.bind(this));
          return;
        }
        var snakeTab = cc.GM.game.snakeTab;
        var addX = Math.cos(-this.m_head.angle * Math.PI / 180) * this.nowWalkPixel;
        var scale = this.nowSpeed / (this.baseSpeed * this.nowScaleSqrt);
        var avoidDis = cc.initMsg.avoidDis * scale;
        for (var i = 0; i < snakeTab.length; i++) if (snakeTab[i] != this && snakeTab[i].isAlive) {
          var bodyTab = snakeTab[i].bodyTab;
          var avoidTab = [];
          for (var j = 0; j < bodyTab.length; j++) {
            var distance = cc.util.pointDistance(bodyTab[j], this.detectPos);
            if (distance < avoidDis) {
              var angle = (cc.util.TwoPointAngle(this.detectPos, bodyTab[j]) + 180 + cc.util.rand(-50, 50)) % 360;
              var x = 100 * Math.cos(angle * Math.PI / 180);
              var y = 100 * Math.sin(angle * Math.PI / 180);
              var pos = cc.v2(this.m_head.x + x, this.m_head.y - y);
              var value = this.nowValue / 2 + 30;
              var rand = cc.util.rand(0, value);
              this.inSpeedUp && (rand *= .5);
              if (rand < 3) {
                this.inAvoid = true;
                this.pushDelay(.12, function() {
                  this.inAvoid = false;
                  this.removeTarget();
                }.bind(this));
                return;
              }
              this.removeTarget();
              this.setTargetPos(pos);
              this.inAvoid = true;
              this.pushDelay(.3, function() {
                this.inAvoid = false;
                this.removeTarget();
              }.bind(this));
              return;
            }
          }
        }
      },
      onRelive: function onRelive() {
        this.isAlive = true;
        this.canEat = true;
        this.xitieState = 0;
        this.xi_tie.active = false;
        this.delayCallArrays = [];
        this.chooseLivePos();
        var pos = cc.v2(this.m_head.x, this.m_head.y);
        var ang = -this.m_head.angle;
        for (var i = 0; i < this.bodyTab.length; i++) {
          this.bodyTab[i].active = true;
          this.bodyTab[i].setPosition(pos);
          this.bodyTab[i].angle = -ang;
        }
        var length = this.m_tail.useIndex + 2;
        var walkPath = [];
        for (var _i2 = 0; _i2 < length; _i2++) walkPath.push([ cc.v2(this.m_head.x, this.m_head.y), ang ]);
        this.walkPath = walkPath;
        this.pushDelay(.02, function() {
          this.lb_name.active = true;
        }.bind(this));
        this.createShield();
      },
      isNeedSpeedUp: function isNeedSpeedUp() {
        var foodCount = 0;
        var length = cc.GM.game.foodTab.length;
        for (var i = 0; i < length; i++) {
          var food = cc.GM.game.foodTab[i];
          var distance = cc.util.pointDistance(this.m_head, food);
          distance < 180 && (foodCount += 1);
        }
        if (foodCount > 4) {
          this.touchSpeedUp();
          var time = cc.util.rand(.7, 3);
          this.pushDelay(time, function() {
            this.touchSpeedCancel();
          }.bind(this));
        } else if (Math.random() < .5) {
          var value = this.nowValue / 2 + 40;
          var rand = cc.util.rand(0, value);
          if (rand < 3) {
            this.touchSpeedUp();
            var time = cc.util.rand(.3, 1.5);
            this.pushDelay(time, function() {
              this.touchSpeedCancel();
            }.bind(this));
          }
        }
      },
      ai0Update: function ai0Update(dt) {
        if (this.isAlive) {
          if (this.canMove) {
            this.openAi && this.autoFindFoodTarget();
            this.turnToTarget(dt);
            this.moveStep(dt);
            this.getTargetDetect();
          }
          this.edgeDetect();
          this.callDelay(dt);
        }
      },
      ai1Update: function ai1Update(dt) {
        if (this.isAlive) {
          if (this.canMove) {
            if (this.openAi) {
              this.inAvoid || this.avoidSnake();
              this.autoFindFoodTarget();
            }
            this.turnToTarget(dt);
            this.moveStep(dt);
            this.getTargetDetect();
          }
          this.edgeDetect();
          this.callDelay(dt);
        }
      },
      ai2Update: function ai2Update(dt) {
        if (this.isAlive) {
          if (this.canMove) {
            if (this.openAi) {
              this.inAvoid || this.avoidSnake();
              this.autoFindFoodTarget(true);
            }
            this.turnToTarget(dt);
            this.moveStep(dt);
            this.getTargetDetect();
          }
          this.edgeDetect();
          this.callDelay(dt);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  snakeCom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "39061I76SRIhb7GZD+DxUM+", "snakeCom");
    "use strict";
    var snakeBase = require("snakeBase");
    cc.Class({
      extends: snakeBase,
      start: function start() {
        this.skin = this.node.skinIndex || 41;
        this.nowScale = this.node.nowScale || .7;
        this.bodyCount = 5;
        this.setNowScaleMust();
        this.changeSkin();
        this.m_head.setPosition(0, 0);
        this.m_head.angle = -270;
        this.myCreate();
      }
    });
    cc._RF.pop();
  }, {
    snakeBase: "snakeBase"
  } ],
  snakeHall: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "19026nxWLZGYq7Yik51ShBH", "snakeHall");
    "use strict";
    var snakeBase = require("snakeBase");
    cc.Class({
      extends: snakeBase,
      start: function start() {
        this.skin = this.node.skinIndex || 1;
        this.nowScale = .7;
        this.bodyCount = 8;
        this.setNowScaleMust();
        this.changeSkin();
        this.myCreate();
        this.pushDelay(.5, function() {
          this.canMove = true;
        }.bind(this));
        this.targetIndex = 0;
        var targetPosTab = [];
        for (var i = 1; i <= 15; i++) {
          var node = this["red_" + i];
          targetPosTab.push(cc.v2(node.x, node.y));
        }
        this.targetPosTab = targetPosTab;
        this.autoCreatePoint();
      },
      autoCreatePoint: function autoCreatePoint() {
        this.targetIndex > this.targetPosTab.length - 1 && (this.targetIndex = 0);
        this.setTargetPos(this.targetPosTab[this.targetIndex]);
        this.targetIndex += 1;
      },
      removeTarget: function removeTarget() {
        this._super();
        this.autoCreatePoint();
      },
      autoCreatePoint0: function autoCreatePoint0() {
        if (this.targetsTab.length > 1) return;
        var point = cc.v2(0, 120);
        0 == this.targetNum || (1 == this.targetNum ? point.x += this.targetX : 2 == this.targetNum || (point.x -= this.targetX));
        var sPos = cc.v2(point.x, this.m_head.y - 240);
        this.setTargetPos(sPos);
        this.targetNum += 1;
        this.targetNum > 3 && (this.targetNum = 0);
      },
      update: function update(dt) {
        if (this.canMove) {
          this.getDetectPos();
          this.turnToTarget(dt);
          this.moveStep(dt);
          this.getTargetDetect();
        }
      }
    });
    cc._RF.pop();
  }, {
    snakeBase: "snakeBase"
  } ],
  snakeMe: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f10534+1oNDeZeiLMZ/tAOS", "snakeMe");
    "use strict";
    var snakeBase = require("snakeBase");
    cc.Class({
      extends: snakeBase,
      start: function start() {
        cc.GM.snakeMe = this;
        cc.initMsg.trySkin ? this.skin = cc.initMsg.trySkin : this.skin = gameData.useSkin;
        this.changeSkin();
        this.init();
        this.pushDelay(.5, function() {
          this.canEat = true;
        }.bind(this));
        this.mName = cc.util.setTextMaxCharCode(gameData.mName, 5);
        this.lb_name.setLabel(this.mName);
        cc.GM.game.snakeTab.push(this);
        this.createShield();
        this.openAi = false;
      },
      update: function update(dt) {
        if (this.isAlive) {
          this.getDetectPos();
          if (this.canMove) {
            this.turnToTarget(dt);
            this.moveStep(dt);
          }
          this.followNoOut();
          this.edgeDetect();
          this.callDelay(dt);
        }
      },
      onDie: function onDie() {
        this.isAlive = false;
        this.canEat = false;
        this.canCollide = false;
        this.delayCallArrays = [];
        this.lianSha = 0;
        this.bodyTurnFoods(true);
        this.removeAllTarget();
        cc.GM.game.showRelive();
      },
      onRelive: function onRelive() {
        this._super();
        this.changeSpeed(this.baseSpeed * this.nowScaleSqrt);
        if (gameData.spdAlway && false == cc.GM.game.speedup_state1.active) {
          cc.GM.game.speedup_state1.active = true;
          cc.GM.game.speedup_state2.active = false;
          cc.GM.snakeMe.touchSpeedCancel();
        }
      },
      addFoodValue: function addFoodValue(level) {
        this._super(level);
        cc.GM.game.lb_now_length.setLabel(cc.util.getText(1010, Math.round(this.nowValue)));
      },
      addKillCount: function addKillCount() {
        this._super();
        cc.GM.game.lb_now_kill.setLabel(cc.util.getText(286) + ": " + this.killCount);
      }
    });
    cc._RF.pop();
  }, {
    snakeBase: "snakeBase"
  } ],
  uFindRoom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1fb9f68UedJqb7J3W0VLp1X", "uFindRoom");
    "use strict";
    cc.Class({
      extends: cc.ui.baseDlg,
      properties: {},
      start: function start() {
        var time = cc.util.rand(.4, 1.3);
        this.node.delayCall(function() {
          cc.GM.hall.enterGame();
          this.touchClose();
        }.bind(this), time);
      }
    });
    cc._RF.pop();
  }, {} ],
  uHome: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7b62ae6SoxGeZjc4S+YIIB1", "uHome");
    "use strict";
    cc.Class({
      extends: cc.ui.baseDlg,
      properties: {},
      start: function start() {
        var self = this;
        var nowScore = cc.GM.game.nowScore;
        if (cc.initMsg.adPass) {
          this.ad_node.isLeft = true;
          wxUtil.setBannerAd(4, this.ad_node);
        } else wxUtil.setBannerAd(4, this.node, true);
        this.btn_xuanyao.touchDing(function() {
          cc.initMsg.xuanyaoScore = nowScore;
          shareData.shareToWx(function() {}, function() {});
        });
        this.btn_close.touchDing(function() {
          self.touchClose();
        });
        if (cc.GM.game.giveMoney && cc.GM.config.isAd) {
          this.node_weiling.active = true;
          this.lb_gold_add.setLabel("+" + cc.GM.game.giveMoney);
          this.btn_gold.touchDing(function() {
            shareData.shareOrLookAd(function() {
              self.node_weiling.active = false;
              gameData.add("golds", cc.GM.game.giveMoney);
              cc.GM.game.giveMoney = 0;
              cc.util.playSound("common/getReward");
            });
          });
        } else {
          this.node_weiling.active = false;
          if (cc.GM.game.giveMoney > 0) {
            gameData.add("golds", cc.GM.game.giveMoney);
            cc.GM.game.giveMoney = 0;
          }
        }
        this.btn_zhujiemian.touchDing(function() {
          cc.GM.game.touchClose();
          self.touchClose();
          uiFunc.openUI("main/uiHall");
        });
        this.btn_zaici.touchDing(function() {
          cc.GM.game.overGuanZhan();
          self.touchClose();
          true;
          cc.initMsg.findTryUse();
          uiFunc.openUI("pops/uTryGame");
        });
        this.btn_xuanyao.active = false;
      }
    });
    cc._RF.pop();
  }, {} ],
  uOffline: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f5b93pIHsBE/a6JfvT7yyMH", "uOffline");
    "use strict";
    cc.Class({
      extends: cc.ui.baseDlg,
      properties: {
        snakeCom: {
          default: null,
          type: cc.Prefab
        }
      },
      start: function start() {
        var self = this;
        var prize = cc.util.randInt(30, 80);
        if (cc.initMsg.adPass) {
          this.btn_xuanyao.y = -200;
          wxUtil.setBannerAd(1, this.ad_node, false, true);
          var time = cc.util.rand(.2, 1.8);
          this.ad_node.delayCall(function() {
            self.btn_xuanyao.y = -95;
            self.ad_node && self.ad_node.reShow && self.ad_node.reShow();
          }, time);
        } else wxUtil.setBannerAd(1, this.node, true);
        this.btn_xuanyao.touchDing(function() {
          shareData.shareOrLookAd(function() {
            self.touchClose();
            cc.util.playSound("common/getReward");
            gameData.add("golds", prize);
            cc.GM.hall.isShowSign();
          });
        });
        var action = cc.rotateBy(2, 360);
        this.bei_guang.runAction(action.repeatForever());
        this.lb_desc.setLabel("+" + prize);
        this.btn_close.touchDing(function() {
          self.touchClose();
          cc.GM.hall.isShowSign();
        });
      },
      onEnter: function onEnter() {
        cc.util.playSound("common/upgrade");
      }
    });
    cc._RF.pop();
  }, {} ],
  uRpOver: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f0b8jF9zxGBqrdEO/Dv7sn", "uRpOver");
    "use strict";
    cc.Class({
      extends: cc.ui.baseDlg,
      start: function start() {
        cc.GM.uOver = this;
        var self = this;
        var nowScore = cc.GM.game.nowScore;
        cc.initMsg.adPass || (this.big_node.y = -50);
        var time = 0;
        wxUtil.showChaPing(1, false, function() {
          if (0 == time) {
            time += 1;
            cc.initMsg.adPass && self.ad_node.reShow && self.ad_node.reShow();
            self.rogueAgain();
          }
        });
        this.btn_zhujiemian.touchDing(function() {
          cc.GM.game.touchClose();
          self.touchClose();
          uiFunc.openUI("main/uiHall");
        });
        this.btn_guanzhan.touchDing(function() {
          cc.GM.game.initGuanZhan();
          self.touchClose();
        });
        this.btn_zaici.touchDing(function() {
          if (cc.GM.config.isAd) {
            self.touchClose();
            cc.initMsg.findTryUse();
            uiFunc.openUI("pops/uTryGame");
          } else {
            cc.GM.game.touchClose();
            self.touchClose();
            uiFunc.openUI("main/uiHall");
          }
        });
        cc.initMsg.chooseRank = cc.initMsg.chooseModel;
        if (1 == cc.initMsg.chooseModel) {
          if (nowScore > gameData.score1) {
            gameData.set("score1", nowScore);
            cc.initMsg.sendScore();
          }
          nowScore > gameData.tdBest1 && gameData.set("tdBest1", nowScore);
          this.lb_best.setLabel(cc.util.getText(1013, gameData.score1));
        } else if (2 == cc.initMsg.chooseModel) {
          if (nowScore > gameData.score2) {
            gameData.set("score2", nowScore);
            cc.initMsg.sendScore();
          }
          nowScore > gameData.tdBest2 && gameData.set("tdBest2", nowScore);
          this.lb_best.setLabel(cc.util.getText(1013, gameData.score2));
        } else {
          if (nowScore > gameData.score3) {
            gameData.set("score3", nowScore);
            cc.initMsg.sendScore();
          }
          nowScore > gameData.tdBest3 && gameData.set("tdBest3", nowScore);
          this.lb_best.setLabel(cc.util.getText(1013, gameData.score3));
        }
        this.lb_score.setLabel(nowScore);
        if (cc.GM.game.giveMoney && cc.GM.config.isAd) {
          this.lb_gold_add.setLabel("+" + cc.GM.game.giveMoney);
          this.btn_gold.active = true;
          this.btn_gold.touchDing(function() {
            self.getGiveMoney();
          });
        } else {
          this.getGiveMoney();
          this.btn_gold.active = false;
          this.btn_guanzhan.x = 0;
        }
        this.btn_rank.touchDing(function() {
          cc.initMsg.chooseRank = cc.initMsg.chooseModel;
        });
        this.btn_xuanyao.touchDing(function() {});
        this.btn_rank.active = false;
        this.btn_xuanyao.active = false;
      },
      rogueAgain: function rogueAgain() {
        var self = this;
        cc.initMsg.adPass && cc.initMsg.rogue && shareData.shareOrLookAd(function() {
          self.getGiveMoney();
        }, function() {});
      },
      reshowAd: function reshowAd() {
        this.ad_node.reShow && this.ad_node.reShow();
      },
      getGiveMoney: function getGiveMoney() {
        this.btn_gold.active = false;
        this.btn_guanzhan.x = 0;
        gameData.add("golds", cc.GM.game.giveMoney);
        cc.GM.game.giveMoney = 0;
        cc.util.playSound("common/getReward");
      }
    });
    cc._RF.pop();
  }, {} ],
  uRpRelive: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6a80e2UlbRBWKnJT6kn4mNM", "uRpRelive");
    "use strict";
    cc.Class({
      extends: cc.ui.baseDlg,
      properties: {},
      start: function start() {
        this.toSetRpProgress = this.m_progress.getComponent(cc.ProgressBar);
        this.lb_countDown.setLabel(this.nowLb);
        this.inCoundRpDown = true;
        this.updateTime = 5;
        this.nowLb = 5;
        this.addEvents();
      },
      update: function update(dt) {
        if (this.inCoundRpDown) {
          this.updateTime -= dt;
          if (Math.round(this.updateTime) < this.nowLb) {
            this.lb_countDown.setLabel(this.nowLb);
            this.nowLb = Math.round(this.updateTime);
            if (this.updateTime < 0) {
              this.touchClose();
              cc.GM.game.showBalance();
              return;
            }
          }
          this.toSetRpProgress.progress = this.updateTime / 5;
        }
      },
      addEvents: function addEvents() {
        var self = this;
        this.btn_no.touchDing(function() {
          self.touchClose();
          cc.GM.game.showBalance();
        });
        this.btn_yes.touchDing(function() {
          self.inCoundRpDown = false;
          cc.GM.game.onRelive();
          self.touchClose();
        }, true);
      }
    });
    cc._RF.pop();
  }, {} ],
  uSign: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5fdd6mLLctFGqi0kae08h4I", "uSign");
    "use strict";
    cc.Class({
      extends: cc.ui.baseDlg,
      properties: {
        snakeCom: {
          default: null,
          type: cc.Prefab
        }
      },
      start: function start() {
        var self = this;
        this.btn_close.touchDing(function() {
          self.touchClose();
        });
        var signDay = gameData.signDay;
        if (gameData.isSign) {
          signDay += 1;
          this.btn_get.active = false;
          this.btn_already.active = true;
          this.video_icon2.active = cc.GM.config.isAd;
        } else {
          this.btn_get.touchDing(function() {
            if (cc.GM.config.isAd) self.lingQuToday(); else {
              self.video_icon.active = false;
              self.lingQuToday();
            }
          });
          if (gameData.signDay < 7) {
            var str = "kuang_" + gameData.signDay;
            this[str].active = true;
          }
        }
        if (signDay > 1) for (var i = 1; i < signDay; i++) this["yiling_" + i].active = true;
        this.addSnake();
      },
      addSnake: function addSnake() {
        var snake = cc.instantiate(this.snakeCom);
        snake.defUseWidth = 26;
        snake.skinIndex = gameData.przIdx;
        snake.nowScale = .9;
        this.snake_add.addChild(snake);
      },
      lingQuToday: function lingQuToday() {
        gameData.set("isSign", 1);
        if (gameData.signDay < 7) {
          var prizeTab = [ 0, 30, 30, 40, 40, 50, 50 ];
          var gold = prizeTab[gameData.signDay];
          gameData.add("golds", gold);
          cc.util.playSound("common/getReward");
        } else {
          cc.initMsg.unLockIndex = gameData.przIdx;
          var str = "hsp" + gameData.przIdx;
          gameData.set(str, 1);
          uiFunc.openUI("pops/newUnlock");
        }
        this.touchClose();
      }
    });
    cc._RF.pop();
  }, {} ],
  uTryGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9e268AP3ndK5oXzekoANbKj", "uTryGame");
    "use strict";
    cc.Class({
      extends: cc.ui.baseDlg,
      properties: {
        snakeCom: {
          default: null,
          type: cc.Prefab
        }
      },
      start: function start() {
        var self = this;
        this.addSnake();
        if (cc.initMsg.adPass) {
          this.btn_tryUse.y = -95;
          wxUtil.setBannerAd(6, this.ad_node, false, true);
          var time = cc.util.rand(.2, 1.8);
          this.ad_node.delayCall(function() {
            self.btn_tryUse.y = -95;
            self.ad_node && self.ad_node.reShow && self.ad_node.reShow();
          }, time);
        } else wxUtil.setBannerAd(6, this.node, true);
        this.btn_close.touchDing(function() {
          cc.initMsg.trySkin = 0;
          self.touchClose();
          cc.GM.game.playAGain();
        });
        this.btn_tryUse.touchDing(function() {
          self.touchClose();
          cc.GM.game.playAGain();
        });
        this.node.delayCall(function() {
          self.btn_close.active = true;
        }, cc.initMsg.thankTime);
      },
      addSnake: function addSnake() {
        var snake = cc.instantiate(this.snakeCom);
        snake.defUseWidth = 26;
        snake.skinIndex = cc.initMsg.trySkin;
        snake.nowScale = .9;
        this.snake_add.addChild(snake);
      }
    });
    cc._RF.pop();
  }, {} ],
  uTryUse: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "30994ZeR2JEMpKnwHO/cwif", "uTryUse");
    "use strict";
    cc.Class({
      extends: cc.ui.baseDlg,
      properties: {
        snakeCom: {
          default: null,
          type: cc.Prefab
        }
      },
      start: function start() {
        var self = this;
        this.addSnake();
        this.btn_close.touchDing(function() {
          cc.initMsg.trySkin = 0;
          cc.GM.hall.showPipei();
          self.touchClose();
        });
        this.btn_tryUse.touchDing(function() {
          cc.GM.hall.showPipei();
          self.touchClose();
        });
        this.node.delayCall(function() {
          self.btn_close.active = true;
        }, cc.initMsg.thankTime);
      },
      addSnake: function addSnake() {
        var snake = cc.instantiate(this.snakeCom);
        snake.defUseWidth = 26;
        snake.skinIndex = cc.initMsg.trySkin;
        snake.nowScale = .9;
        this.snake_add.addChild(snake);
      }
    });
    cc._RF.pop();
  }, {} ],
  uiAlert: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "60ebd56nlNDw5NsBKZ9BnqG", "uiAlert");
    "use strict";
    cc.Class({
      extends: cc.ui.baseDlg,
      properties: {},
      init: function init(str, time) {
        this.lbl_desc.setLabel(str);
        var self = this;
        this.unscheduleAllCallbacks();
        this.scheduleOnce(function() {
          uiFunc.closeUI(self);
        }, time);
        if (1 == str.split("\n").length) {
          var length = cc.util.getStrLength(str);
          this.img_bg.width = 29 * length + 40;
          this.img_bg.height = 62;
        } else {
          var tab = str.split("\n");
          var maxLength = 0;
          for (var i in tab) {
            var len = cc.util.getStrLength(tab[i]);
            len > maxLength && (maxLength = len);
          }
          this.img_bg.width = 28 * maxLength + 40;
          this.img_bg.height = 32 * tab.length + 30;
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  uiCommonTips: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe2aa7C8FRGMYhsVgCkZX1K", "uiCommonTips");
    "use strict";
    cc.Class({
      extends: cc.ui.baseDlg,
      properties: {},
      init: function init(obj) {
        var _this = this;
        this.node.stopAllActions();
        var self = this;
        obj.confirmText && (this.lb_confirm.getComponent(cc.Label).string = obj.confirmText);
        obj.cancleText && (this.lbl_cancle.getComponent(cc.Label).string = obj.cancleText);
        this.btn_confirm.onClick(function() {
          obj.confirmFunc && obj.confirmFunc();
          _this.touchClose();
        }, this);
        this.btn_close.onClick(function() {
          obj.cancelFunc && obj.cancelFunc();
          _this.touchClose();
        }, this);
        if (obj.richDesc) {
          this.lb_rich.active = true;
          this.lb_desc.active = false;
          this.setRichText(obj.richDesc);
        } else {
          this.lb_rich.active = false;
          this.lb_desc.active = true;
          this.lb_desc.getComponent(cc.Label).string = obj.desc;
        }
        if (obj.btnCount && 1 == obj.btnCount) {
          this.btn_cancel.active = false;
          this.btn_confirm.x = 0;
        }
        obj.time && this.node.delayCall(function() {
          self.touchClose();
        }, obj.time);
        this.btn_cancel.onClick(function() {
          obj.cancelFunc && obj.cancelFunc();
          _this.touchClose();
        }, this);
      },
      setRichText: function setRichText(paramStr) {}
    });
    cc._RF.pop();
  }, {} ],
  uiFunc: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b48923lOi1Ic6RanLBwY9Us", "uiFunc");
    "use strict";
    window.uiFunc = {
      uiList: [],
      cacheUIList: [],
      openingUI: {}
    };
    uiFunc.openUI = function(uiPath, callBack, bWin) {
      if (this.openingUI[uiPath]) return;
      this.openingUI[uiPath] = true;
      var initFame = function(frame) {
        var panel = frame.getComponent("baseNode");
        callBack && callBack(panel);
        panel && panel.show();
        this.openingUI[uiPath] = null;
      }.bind(this);
      var findtemp = this.findUI(uiPath);
      if (findtemp) {
        findtemp.active = true;
        initFame(findtemp);
        return;
      }
      for (var i = 0; i < uiFunc.cacheUIList.length; i++) {
        var temp = uiFunc.cacheUIList[i];
        if (temp && temp.pathName === uiPath) {
          temp.active = true;
          temp.parent = cc.Canvas.instance.node;
          temp.bWin = bWin;
          uiFunc.uiList.push(temp);
          uiFunc.cacheUIList.splice(i, 1);
          initFame(temp);
          return;
        }
      }
      cc.resources.load("ui/" + uiPath, function(err, prefab) {
        if (err) {
          this.openingUI[uiPath] = null;
          cc.error(err.message || err);
          return;
        }
        var temp = cc.instantiate(prefab);
        temp.pathName = uiPath;
        temp.parent = cc.Canvas.instance.node;
        temp.bWin = bWin;
        uiFunc.uiList.push(temp);
        initFame(temp);
      }.bind(this));
    };
    uiFunc.closeAllDlg = function() {
      for (var index = uiFunc.uiList.length - 1; index >= 0; index--) {
        var temp = uiFunc.uiList[index];
        if (temp && !temp.bWin) {
          temp.active = false;
          var panel = temp.getComponent("baseNode");
          panel && panel.hide && panel.hide();
          temp.removeFromParent(false);
          uiFunc.cacheUIList.push(temp);
          uiFunc.uiList.splice(index, 1);
        }
      }
    };
    uiFunc.closeUI = function(uiPath, callBack, clear) {
      for (var i = uiFunc.uiList.length - 1; i >= 0; i--) {
        var temp = uiFunc.uiList[i];
        if (temp && (temp.pathName === uiPath || "object" == typeof uiPath && temp === uiPath.node)) {
          temp.active = false;
          if (clear) temp.removeFromParent(true); else {
            var panel = temp.getComponent("baseNode");
            panel && panel.hide && panel.hide();
            temp.removeFromParent(false);
            uiFunc.cacheUIList.push(temp);
          }
          uiFunc.uiList.splice(i, 1);
          callBack && callBack();
          return;
        }
      }
    };
    uiFunc.findUI = function(uiPath, uiScript) {
      for (var i = uiFunc.uiList.length - 1; i >= 0; i--) {
        var temp = uiFunc.uiList[i];
        if (temp && temp.pathName === uiPath) {
          if ("undefined" !== typeof uiScript) return temp.getComponent("baseNode");
          return temp;
        }
      }
    };
    uiFunc.clearUI = function(uiPath, clear) {
      this.findUI(uiPath) && (clear ? this.closeUI(uiPath, null, clear) : this.closeUI(uiPath));
    };
    uiFunc.exitGame = function() {
      cc.sys.platform === cc.sys.WECHAT_GAME && wx.exitMiniProgram();
    };
    cc._RF.pop();
  }, {} ],
  uiGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2da72Exh5ZM3aqEWOJ6SXPG", "uiGame");
    "use strict";
    cc.Class({
      extends: cc.ui.baseNode,
      properties: {
        snakeMe: {
          default: null,
          type: cc.Prefab
        },
        snakeAi1: {
          default: null,
          type: cc.Prefab
        },
        sfProtect: {
          default: null,
          type: cc.SpriteFrame
        },
        sfAbsorb: {
          default: null,
          type: cc.SpriteFrame
        }
      },
      start: function start() {
        cc.GM.game = this;
        cc.initMsg.commonFixScale(this.node);
        this._reliveTime = 0;
        if (gameData.zuoshou) {
          this.control_bg.x = -445;
          this.node_2.x = 445;
        } else {
          this.control_bg.x = 445;
          this.node_2.x = -445;
        }
        this.showLeftTime = false;
        this.leftAllTime = cc.initMsg.leftTime;
        if (cc.initMsg.chooseModel > 1) {
          this.showLeftTime = true;
          this.lb_left_time.active = true;
        }
        this.baseScale = this.main_node.scale;
        this.updateTime = 0;
        this.updateTime2 = 0;
        this.updateAllTime = 0;
        this.showSpeedAlways();
        this.controlDistance = 45;
        this.controlCenter = cc.v2(94, 94);
        var str = "tdBest" + cc.initMsg.chooseModel;
        gameData.bindLable(str, this.lb_today_best);
        this.initDatas();
        this.addEvents();
      },
      cleanAllFoods: function cleanAllFoods() {
        var tab = [ "foods_21", "foods_31", "foods_41", "foods_51", "foods_22", "foods_32", "foods_42", "foods_52", "foods_23", "foods_33", "foods_43", "foods_53", "foods_24", "foods_34", "foods_44", "foods_54", "foods_25", "foods_35", "foods_45", "foods_55", "foods_26", "foods_36", "foods_46", "foods_56", "food_dun", "food_tie" ];
        for (var i in tab) {
          var str = tab[i];
          this[str].removeAllChildren();
        }
      },
      playAGain: function playAGain() {
        this.cleanAllFoods();
        this.node_snakes.removeAllChildren();
        this.initDatas();
      },
      onRelive: function onRelive() {
        this._reliveTime += 1;
        cc.GM.snakeMe && cc.GM.snakeMe.onRelive();
      },
      showRelive: function showRelive() {
        this._reliveTime < cc.initMsg.maxReliveTime && cc.GM.config.isAd ? uiFunc.openUI("game/uRpRelive") : this.showBalance();
      },
      overGuanZhan: function overGuanZhan() {
        this.control_node.active = true;
        this.watch_node.active = false;
        this.fight_area.active = false;
        this.follow_node.setPosition(0, 0);
        var self = this;
        this.main_node.unbindTouch();
        this.btn_viewModel.unbindTouch();
        this.btn_back.unbindTouch();
        this.main_node.scale = self.baseScale;
      },
      initGuanZhan: function initGuanZhan() {
        this.control_node.active = false;
        this.watch_node.active = true;
        this.fight_area.active = false;
        this.follow_node.setPosition(0, 0);
        var self = this;
        this.main_node.bindTouchLocate();
        this.btn_viewModel.touchDing(function() {
          self.main_node.setPosition(0, 0);
          .25 != self.main_node.scale ? self.main_node.scale = .25 : self.main_node.scale = self.baseScale;
        });
        this.btn_back.touchDing(function() {
          uiFunc.openUI("pops/uHome");
        });
      },
      showBalance: function showBalance() {
        if (this.isGameOver) return;
        for (var i in this.snakeTab) if (this.snakeTab[i] == cc.GM.snakeMe) {
          this.snakeTab.splice(i, 1);
          break;
        }
        this.isGameOver = true;
        this.nowScore = Math.round(cc.GM.snakeMe.nowValue);
        this.countGiveMoney();
        cc.GM.snakeMe.node.removeFromParent();
        uiFunc.openUI("game/uRpOver");
      },
      countGiveMoney: function countGiveMoney() {
        var give = Math.round(3 + 57 * this.nowScore / 300);
        give > 60 && (give = 60);
        this.giveMoney = give;
      },
      initDatas: function initDatas() {
        this.overGuanZhan();
        this.lb_timeon.active = false;
        this.updateAllTime = 0;
        this.isGameOver = false;
        this.canControl = true;
        this.angleDest = 90;
        this.snakeTab = [];
        this.foodTab = [];
        this.giveMoney = 0;
        this.createMySnake();
        this.lb_now_length.setLabel(cc.util.getText(1010, "0"));
        this.lb_now_kill.setLabel(cc.util.getText(286) + ":0");
        var addNum = 25;
        cc.initMsg.isLowConfig && (addNum = 18);
        if (3 == cc.initMsg.chooseModel) {
          addNum = 30;
          cc.initMsg.isLowConfig && (addNum = 18);
        }
        for (var i = 0; i < addNum; i++) this.createAi1Snake();
        this.initFoods();
      },
      leftTime: function leftTime() {
        if (this.showLeftTime) {
          var time = Math.round(cc.initMsg.leftTime - this.updateAllTime);
          if (time > -1) {
            if (time != this.leftAllTime) {
              this.leftAllTime = time;
              var str = "0" + Math.floor(time / 60) + ":";
              var time2 = time % 60;
              time2 < 10 ? str = str + "0" + time2 : str += time2;
              this.lb_left_time.setLabel(str);
            }
            if (0 == time) {
              uiFunc.clearUI("game/uRpRelive", true);
              this.showBalance();
              this.cleanAllFoods();
              this.node_snakes.removeAllChildren();
              this.snakeTab = [];
              this.lb_timeon.active = true;
            }
          }
        }
      },
      update: function update(dt) {
        this.updateAllTime += dt;
        this.canControl && this.control_bg.iHasTouchBegan && this.controlSnakeMe(dt);
        this.updateTime += dt;
        if (this.updateTime > cc.initMsg.dtT) {
          this.updateTime = 0;
          this.updateTime2 += 1;
          if (this.updateTime2 > 6) {
            this.updateTime2 = 0;
            this.pageRank();
          }
          this.snakeCollideDetect();
          this.eatFoodDetect();
        }
        this.leftTime();
      },
      pageRank: function pageRank() {
        var tab = [];
        for (var i in this.snakeTab) this.snakeTab[i].isAlive && tab.push(this.snakeTab[i]);
        tab.sort(function(a, b) {
          return b.nowValue - a.nowValue;
        });
        for (var _i = 0; _i < 10; _i++) {
          var index = _i + 1;
          if (tab[_i] && tab[_i].mName) {
            var str = "lb_name" + index;
            this[str].setLabel(tab[_i].mName);
            str = "lb_score" + index;
            this[str].setLabel(Math.round(tab[_i].nowValue));
          } else {
            var _str = "lb_name" + index;
            this[_str].setLabel("");
            _str = "lb_score" + index;
            this[_str].setLabel("");
          }
        }
      },
      bobaoKill: function bobaoKill(who, killWho) {
        var str = cc.util.getText(1016, who.mName, killWho.mName);
        var action = cc.sequence(cc.delayTime(1.4), cc.callFunc(function() {
          this.lb_bobao_desc.active = false;
        }, this));
        this.lb_bobao_desc.active = true;
        this.lb_bobao_desc.setLabel(str);
        this.lb_bobao_desc.runAc(action);
        who == cc.GM.snakeMe && this.bobaoLianSha();
      },
      bobaoLianSha: function bobaoLianSha() {
        var lianSha = 0;
        cc.GM.snakeMe && cc.GM.snakeMe.lianSha && (lianSha = cc.GM.snakeMe.lianSha);
        if (lianSha > 0) {
          if (lianSha < 12) {
            var str = "game/" + cc.initMsg.lianshan[lianSha];
            cc.util.playSound(str);
          } else {
            var index = cc.util.randInt(6, 11);
            var str = "game/" + cc.initMsg.lianshan[index];
            cc.util.playSound(str);
          }
          this.bobao_kuang.active = true;
          this.lb_bobao.setLabel(lianSha + cc.util.getText(286));
          var action = cc.sequence(cc.delayTime(1.4), cc.callFunc(function() {
            this.bobao_kuang.active = false;
          }, this));
          this.bobao_kuang.runAc(action);
        }
      },
      createMySnake: function createMySnake() {
        var snake = cc.instantiate(this.snakeMe);
        this.node_snakes.addChild(snake);
      },
      createAi1Snake: function createAi1Snake() {
        var snake = cc.instantiate(this.snakeAi1);
        this.node_snakes.addChild(snake);
      },
      isCreateNewSnake: function isCreateNewSnake() {
        var length = this.snakeTab.length;
        if (cc.initMsg.chooseModel < 3) if (length < 9) {
          if (Math.random() < .95) {
            this.createAi1Snake();
            Math.random() < .5 && this.createAi1Snake();
          }
        } else if (length < 14) {
          if (Math.random() < .65) {
            this.createAi1Snake();
            Math.random() < .18 && this.createAi1Snake();
          }
        } else Math.random() < .2 && this.createAi1Snake();
      },
      snakeCollideDetect: function snakeCollideDetect() {
        for (var i = 0; i < this.snakeTab.length; i++) {
          var snakeHead = this.snakeTab[i];
          if (snakeHead.canCollide) for (var j = 0; j < this.snakeTab.length; j++) if (i != j && this.snakeTab[j].canCollide) {
            var bodyTab = this.snakeTab[j].bodyTab;
            for (var k = 0; k < bodyTab.length; k++) {
              var distance = cc.util.pointDistance(snakeHead.detectPos, bodyTab[k]) / ((snakeHead.nowScale + this.snakeTab[j].nowScale) / 2);
              if (distance < cc.initMsg.colidDis) {
                this.snakeTab[j].addKillCount();
                this.bobaoKill(this.snakeTab[j], snakeHead);
                snakeHead.onDie();
                break;
              }
            }
          }
        }
      },
      eatFoodDetect: function eatFoodDetect() {
        if (this.snakeTab.length > 0) {
          var length = this.foodTab.length;
          for (var i = length - 1; i > -1; i--) {
            var food = this.foodTab[i];
            if (food.alive) for (var j = 0; j < this.snakeTab.length; j++) {
              var snake = this.snakeTab[j];
              if (snake.canEat) {
                var distance = cc.util.pointDistance(food, snake.detectPos) / snake.nowScaleSqrt;
                var eatDistance = cc.initMsg.eatDistance;
                snake.xitieState && (eatDistance *= cc.initMsg.xitieMulti);
                if (distance < eatDistance) {
                  var time = .05 + distance / 800;
                  snake.eatFood(food, snake.detectPos, time);
                  this.foodTab.splice(i, 1);
                  break;
                }
              }
            } else this.foodTab.splice(i, 1);
          }
        }
      },
      initFoods: function initFoods() {
        var length = cc.initMsg.foodUp - 50;
        for (var i = 0; i < length; i++) this.createRandFood();
      },
      createRandFood: function createRandFood() {
        var x = cc.util.rand(-2400, 2400);
        var y = cc.util.rand(-1250, 1250);
        var level = cc.util.randInt(2, 5);
        this.createFood(x, y, level);
      },
      createFood: function createFood(x, y, level) {
        var rand = Math.random();
        if (rand < .015) {
          this.createXiTieFood(x, y, level);
          return;
        }
        if (rand < .03) {
          this.createHudunFood(x, y, level);
          return;
        }
        var which = cc.util.randInt(1, 6);
        var tab = cc.initMsg["foodLevel" + which];
        var str = tab[level - 2];
        var str2 = "foods_" + level + which;
        var node = cc.instantiate(this.sp_food);
        cc.util.display(node, str);
        this[str2].addChild(node);
        this.foodTab.push(node);
        node.setPosition(x, y);
        node.alive = true;
        node.level = level;
      },
      createXiTieFood: function createXiTieFood(x, y, level) {
        var node = cc.instantiate(this.sp_food);
        node.getComponent(cc.Sprite).spriteFrame = this.sfAbsorb;
        this.food_tie.addChild(node);
        this.foodTab.push(node);
        node.setPosition(x, y);
        node.alive = true;
        node.level = 50;
      },
      createHudunFood: function createHudunFood(x, y, level) {
        var node = cc.instantiate(this.sp_food);
        node.getComponent(cc.Sprite).spriteFrame = this.sfProtect;
        this.food_dun.addChild(node);
        this.foodTab.push(node);
        node.setPosition(x, y);
        node.alive = true;
        node.level = 51;
      },
      controlSnakeMe: function controlSnakeMe(dt) {
        if (cc.GM.snakeMe) {
          var delta = Math.abs(this.angleDest - cc.GM.snakeMe.m_head.angle);
          if (delta < 2) cc.GM.snakeMe.m_head.angle != this.angleDest && (cc.GM.snakeMe.m_head.angle = this.angleDest); else if (delta < 180) cc.GM.snakeMe.m_head.angle += (this.angleDest - cc.GM.snakeMe.m_head.angle) * dt * cc.GM.snakeMe.angSpeed; else {
            var agdel = this.angleDest - cc.GM.snakeMe.m_head.angle;
            agdel < -170 ? agdel += 360 : agdel -= 360;
            var ang = (cc.GM.snakeMe.m_head.angle + agdel * dt * cc.GM.snakeMe.angSpeed) % 360;
            ang < 0 ? ang += 360 : ang > 360 && (ang -= 360);
            cc.GM.snakeMe.m_head.angle = ang;
          }
        }
      },
      addEvents: function addEvents() {
        this.btn_speedAlways.touchDing(function() {
          gameData.spdAlway ? gameData.set("spdAlway", 0) : gameData.set("spdAlway", 1);
          this.showSpeedAlways();
          this.speedup_state1.active = true;
          this.speedup_state2.active = false;
          cc.GM.snakeMe.touchSpeedCancel();
        }.bind(this));
        this.speedUpTouch();
        this.controlTouch();
      },
      speedUpTouch: function speedUpTouch() {
        var self = this.btn_speedup;
        self.canTouch = true;
        self.iHasTouchBegan = false;
        self.on(cc.Node.EventType.TOUCH_START, function(event) {
          if (false == self.canTouch) return;
          if (!cc.GM.snakeMe) return;
          self.iHasTouchBegan = true;
          self.BeganScale_ = self.scale;
          self.BeganOpacity_ = self.opacity;
          self.setScale(.9 * self.BeganScale_);
          self.opacity = .9 * self.BeganOpacity_;
          gameData.spdAlway || cc.GM.snakeMe && cc.GM.snakeMe.touchSpeedUp();
        }, this);
        self.on(cc.Node.EventType.TOUCH_END, function(event) {
          if (false == self.canTouch) return;
          if (false == self.iHasTouchBegan) return;
          self.iHasTouchBegan = false;
          self.setScale(self.BeganScale_);
          self.opacity = self.BeganOpacity_;
          this.touchSpeedUpEnd();
        }, this);
        self.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          if (false == self.canTouch) return;
          if (false == self.iHasTouchBegan) return;
          self.iHasTouchBegan = false;
          self.setScale(self.BeganScale_);
          self.opacity = self.BeganOpacity_;
        }, this);
      },
      touchSpeedUpEnd: function touchSpeedUpEnd() {
        if (gameData.spdAlway) {
          if (cc.GM.snakeMe.isAlive) if (this.speedup_state1.active) {
            this.speedup_state1.active = false;
            this.speedup_state2.active = true;
            cc.GM.snakeMe.touchSpeedUp();
          } else {
            this.speedup_state1.active = true;
            this.speedup_state2.active = false;
            cc.GM.snakeMe.touchSpeedCancel();
          }
        } else cc.GM.snakeMe && cc.GM.snakeMe.touchSpeedCancel();
      },
      controlTouch: function controlTouch() {
        var self = this.control_bg;
        self.canTouch = true;
        self.iHasTouchBegan = false;
        self.on(cc.Node.EventType.TOUCH_START, function(event) {
          if (false == self.canTouch) return;
          self.iHasTouchBegan = true;
        }, this);
        self.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
          if (false == self.canTouch) return;
          if (false == self.iHasTouchBegan) return;
          var sPos = cc.GM.game.control_bg.convertToNodeSpace(event.touch._point);
          this.touchMoveControl(sPos);
        }, this);
        self.on(cc.Node.EventType.TOUCH_END, function(event) {
          if (false == self.canTouch) return;
          if (false == self.iHasTouchBegan) return;
          self.iHasTouchBegan = false;
          this.touchControlEnd();
        }, this);
        self.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          if (false == self.canTouch) return;
          if (false == self.iHasTouchBegan) return;
          self.iHasTouchBegan = false;
          this.touchControlEnd();
        }, this);
      },
      touchMoveControl: function touchMoveControl(sPos) {
        var distance = cc.util.pointDistance(this.controlCenter, sPos);
        var rotation = Math.atan2(sPos.y - 94, sPos.x - 94);
        if (distance < this.controlDistance) {
          var pos = cc.v2(sPos.x - this.controlCenter.x, sPos.y - this.controlCenter.y);
          this.control_center.setPosition(pos);
        } else {
          var x = this.controlDistance * Math.cos(rotation);
          var y = this.controlDistance * Math.sin(rotation);
          this.control_center.setPosition(x, y);
        }
        if (distance > 4) {
          var jiaodu = cc.util.TwoPointAngle(sPos, this.controlCenter);
          jiaodu = (jiaodu + 180) % 360;
          this.angleDest = jiaodu;
        }
      },
      touchControlEnd: function touchControlEnd() {
        this.control_center.setPosition(0, 0);
      },
      showSpeedAlways: function showSpeedAlways() {
        gameData.spdAlway ? this.always_gou.active = true : this.always_gou.active = false;
      },
      pushDelay: function pushDelay(dalayTime, func) {
        if (dalayTime) {
          var task = {};
          task.dalayTime = dalayTime;
          task.nowTime = 0;
          task.func = func;
          this.delayCallArrays.push(task);
        }
      },
      callDelay: function callDelay(dt) {
        if (this.delayCallArrays.length > 0) for (var i = this.delayCallArrays.length - 1; i > -1; i--) {
          var v = this.delayCallArrays[i];
          v.nowTime += dt;
          if (v.nowTime >= v.dalayTime) {
            v.func && v.func();
            this.delayCallArrays.splice(i, 1);
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  uiHall: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f3c45bZUUdDa4kNdctHn3nu", "uiHall");
    "use strict";
    cc.Class({
      extends: cc.ui.baseNode,
      properties: {
        snakeHall: {
          default: null,
          type: cc.Prefab
        }
      },
      start: function start() {
        cc.GM.hall = this;
        cc.initMsg.commonFixScale(this.node);
        this.dailyReset();
        this.initDatas();
        this.addEvents();
        cc.util.stopMusic();
        cc.GM.firstEnter || (cc.GM.firstEnter = true);
      },
      dailyReset: function dailyReset() {
        var todate = cc.util.getDate();
        if (todate !== gameData.todate) {
          gameData.set("todate", todate);
          gameData.set("shareTime", 0);
          gameData.set("watchTime", 0);
          gameData.set("tdBest", 0);
          gameData.set("frTime", 0);
          if (gameData.isSign) {
            gameData.add("signDay", 1);
            gameData.set("isSign", 0);
            if (gameData.signDay > 7) {
              gameData.set("signDay", 1);
              this.findNextSevenPrize();
            }
          }
        }
      },
      showOffLine: function showOffLine() {
        uiFunc.openUI("pops/uOffline");
      },
      isShowSign: function isShowSign() {
        0 == gameData.isSign && uiFunc.openUI("main/uSign");
      },
      findNextSevenPrize: function findNextSevenPrize() {
        var przIdx = 41;
        for (var i = 35; i <= cc.initMsg.pifuMax; i++) if (0 == gameData.get("hsp" + i)) {
          przIdx = i;
          break;
        }
        if (41 != przIdx) gameData.set("przIdx", przIdx); else {
          for (var _i = 34; _i > 1; _i--) if (0 == gameData.get("hsp" + _i)) {
            przIdx = _i;
            break;
          }
          gameData.set("przIdx", przIdx);
        }
      },
      initDatas: function initDatas() {
        "" != gameData.mHead && this.sp_head.loadUrlImage(gameData.mHead, "png");
        gameData.bindLable("mName", this.lb_name);
        gameData.bindLable("golds", this.lb_golds);
        this.addSnake();
      },
      shopBack: function shopBack() {
        if (this.nowSkin != gameData.useSkin) {
          this.snake_pos.removeAllChildren();
          this.addSnake();
        }
      },
      addSnake: function addSnake() {
        var snake = cc.instantiate(this.snakeHall);
        snake.defUseWidth = 26;
        snake.skinIndex = gameData.useSkin;
        this.nowSkin = gameData.useSkin;
        this.snake_pos.addChild(snake);
      },
      addEvents: function addEvents() {
        var self = this;
        cc.GM.config.isAd && this.btn_golds.touchDing(function() {
          gameData.add("golds", 50);
          gameData.add("frTime", 1);
          cc.util.playSound("common/getReward");
        });
        this.btn_wujin.touchDing(function() {
          cc.initMsg.chooseModel = 1;
          self.enterGamePrepare();
        });
        this.btn_xianshi.touchDing(function() {
          cc.initMsg.chooseModel = 2;
          self.enterGamePrepare();
        });
        this.btn_tenv.touchDing(function() {
          cc.initMsg.chooseModel = 3;
          self.enterGamePrepare();
        });
        this.btn_signin.touchDing(function() {
          uiFunc.openUI("main/uSign");
        });
        this.btn_pifu.touchDing(function() {
          uiFunc.openUI("main/uiShop");
        });
        this.btn_rank.touchDing(function() {
          cc.initMsg.chooseRank = 1;
        });
        this.btn_setting.touchDing(function() {
          uiFunc.openUI("main/uiSetting");
        });
        this.btn_share.touchDing(function() {});
        this.btn_share.active = false;
        this.btn_rank.active = false;
      },
      enterGamePrepare: function enterGamePrepare() {
        if (cc.GM.config.isAd) {
          cc.initMsg.findTryUse();
          uiFunc.openUI("pops/uTryUse");
        } else cc.GM.hall.showPipei();
      },
      showPipei: function showPipei() {
        uiFunc.openUI("pops/uFindRoom");
      },
      enterGame: function enterGame() {
        this.touchClose();
        uiFunc.openUI("game/uiGame");
      }
    });
    cc._RF.pop();
  }, {} ],
  uiLoading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "29420ATfrNJ9YFa8X1BUehZ", "uiLoading");
    "use strict";
    cc.Class({
      extends: cc.ui.baseNode,
      properties: {},
      start: function start() {
        cc.GM.uiLoading = this;
        this.nowMaxProgress = 0;
        cc.initMsg.commonFixScale(this.node);
      },
      init: function init(paths, callback) {
        audioData.SwitchToLoadingZones();
        this.downloadResources(paths, callback, 0);
      },
      downloadResources: function downloadResources(paths, callback, _index) {
        var index = _index || 0;
        cc.resources.loadDir(paths[index], function(completedCount, totalCount, item) {
          if (totalCount > 0) {
            var progress = Math.floor(100 * (1 / paths.length * (completedCount / totalCount) + index * (1 / paths.length)));
            if (progress >= this.nowMaxProgress) {
              this.nowMaxProgress = progress;
              this.pre_load.getComponent(cc.ProgressBar).progress = progress / 100;
              this.txt_load.getComponent(cc.Label).string = cc.util.getText(100) + progress + "%";
            }
          }
        }.bind(this), function(err, resource, urls) {
          index++;
          if (index < paths.length) {
            this.downloadResources(paths, callback, index);
            return;
          }
          this.txt_load.stopAllActions();
          callback();
        }.bind(this));
      }
    });
    cc._RF.pop();
  }, {} ],
  uiSetting: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "848590sG0lDbI9FKIGKO2n0", "uiSetting");
    "use strict";
    cc.Class({
      extends: cc.ui.baseDlg,
      properties: {},
      start: function start() {
        this.addEvents();
        this.initButonUI();
      },
      addEvents: function addEvents() {
        var self = this;
        this.btn_moshi.touchDing(function() {
          gameData.zuoshou ? gameData.set("zuoshou", 0) : gameData.set("zuoshou", 1);
          self.setModel();
        });
        this.btn_close.touchDing(function() {
          uiFunc.closeUI(self, null, true);
        });
        this.menu_music_off.touchDing(function() {
          audioData.SettingMusic("open");
          self.menu_music_on.active = true;
          self.menu_music_off.active = false;
        }, true);
        this.menu_vibration_on.touchDing(function() {
          audioData.SettingVibratet("close");
          self.menu_vibration_on.active = false;
          self.menu_vibration_off.active = true;
        }, true);
        this.menu_vibration_off.touchDing(function() {
          audioData.SettingVibratet("open");
          self.menu_vibration_on.active = true;
          self.menu_vibration_off.active = false;
        }, true);
        this.menu_sfx_on.touchDing(function() {
          audioData.SettingEffect("close");
          self.menu_sfx_on.active = false;
          self.menu_sfx_off.active = true;
        }, true);
        this.menu_sfx_off.touchDing(function() {
          audioData.SettingEffect("open");
          self.menu_sfx_on.active = true;
          self.menu_sfx_off.active = false;
        }, true);
        this.menu_music_on.touchDing(function() {
          audioData.SettingMusic("close");
          self.menu_music_on.active = false;
          self.menu_music_off.active = true;
        }, true);
      },
      setModel: function setModel() {
        if (gameData.zuoshou) {
          this.control_bg.x = -445;
          this.btn_speedup.x = 445;
          this.lb_desc.setLabel(cc.util.getText(1004));
        } else {
          this.control_bg.x = 445;
          this.btn_speedup.x = -445;
          this.lb_desc.setLabel(cc.util.getText(1005));
        }
      },
      initButonUI: function initButonUI() {
        if ("open" == gameData.get("settingVibrate")) {
          this.menu_vibration_on.active = true;
          this.menu_vibration_off.active = false;
        } else {
          this.menu_vibration_on.active = false;
          this.menu_vibration_off.active = true;
        }
        if ("open" == gameData.get("settingEffect")) {
          this.menu_sfx_on.active = true;
          this.menu_sfx_off.active = false;
        } else {
          this.menu_sfx_on.active = false;
          this.menu_sfx_off.active = true;
        }
        if ("open" == gameData.get("settingMusic")) {
          this.menu_music_on.active = true;
          this.menu_music_off.active = false;
        } else {
          this.menu_music_on.active = false;
          this.menu_music_off.active = true;
        }
        this.menu_music_on.active = false;
        this.menu_music_off.active = false;
        this.menu_vibration_on.active = false;
        this.menu_vibration_off.active = false;
        this.setModel();
      }
    });
    cc._RF.pop();
  }, {} ],
  uiShop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "749eaOpt/pGj5SHXq9yG8nP", "uiShop");
    "use strict";
    cc.Class({
      extends: cc.ui.baseNode,
      properties: {
        snakeCom: {
          default: null,
          type: cc.Prefab
        }
      },
      start: function start() {
        cc.GM.shop = this;
        cc.initMsg.commonFixScale(this.node);
        this.needRefresh1 = true;
        this.needRefresh2 = true;
        gameData.bindLable("golds", this.lb_golds);
        this.resetOwner();
        this.touchBtn1();
        this.addEvents();
      },
      resetOwner: function resetOwner() {
        var hasTab = [];
        var noHasTab = [];
        for (var i = 1; i <= cc.initMsg.pifuMax; i++) noHasTab.push(i);
        this.hasTab = hasTab;
        this.noHasTab = noHasTab;
      },
      addEvents: function addEvents() {
        var self = this;
        this.btn_1.touchDing(function() {
          self.touchBtn1();
        });
        this.btn_2.touchDing(function() {
          self.touchBtn2();
        });
        this.btn_back.touchDing(function() {
          cc.GM.hall && cc.GM.hall.shopBack && cc.GM.hall.shopBack();
          self.touchClose();
        });
        if (cc.GM.config.isAd) {
          this.btn_watch.active = true;
          this.btn_watch.touchDing(function() {
            gameData.add("golds", 50);
            gameData.add("frTime", 1);
            cc.util.playSound("common/getReward");
          });
        } else this.btn_watch.active = false;
      },
      addSnake: function addSnake(node, level) {
        var snake = cc.instantiate(this.snakeCom);
        snake.defUseWidth = 26;
        snake.skinIndex = level;
        snake.nowScale = 1;
        node.add_node.addChild(snake);
      },
      touchBtn1: function touchBtn1() {
        var _this = this;
        this.state1_1.active = false;
        this.state1_2.active = true;
        this.state2_1.active = true;
        this.state2_2.active = false;
        this.scrollview_1.active = true;
        this.scrollview_2.active = false;
        if (this.needRefresh1) {
          this.scroll_1.removeAllChildren();
          var _loop = function _loop(i) {
            var node = cc.instantiate(_this.m_bg);
            node.level = _this.hasTab[i];
            var str = "mBtn_" + node.level;
            _this[str] = node;
            cc.util.setNodeMap(node, node);
            gameData.useSkin == node.level ? node.lb_desc.setLabel(cc.util.getText(320)) : node.lb_desc.setLabel(cc.util.getText(345));
            node.touchDing(function() {
              if (gameData.useSkin == node.level) cc.util.showAlert(cc.util.getText(320)); else {
                var befuseSkin = gameData.useSkin;
                gameData.set("useSkin", node.level);
                var temStr = "mBtn_" + befuseSkin;
                cc.GM.shop[temStr].lb_desc.setLabel(cc.util.getText(345));
                node.lb_desc.setLabel(cc.util.getText(320));
              }
            });
            node.btn_touch.touchDing(function() {
              if (gameData.useSkin == node.level) cc.util.showAlert(cc.util.getText(320)); else {
                var befuseSkin = gameData.useSkin;
                gameData.set("useSkin", node.level);
                var temStr = "mBtn_" + befuseSkin;
                cc.GM.shop[temStr].lb_desc.setLabel(cc.util.getText(345));
                node.lb_desc.setLabel(cc.util.getText(320));
              }
            });
            _this.addSnake(node, node.level);
            _this.scroll_1.addChild(node);
          };
          for (var i = 0; i < this.hasTab.length; i++) _loop(i);
          this.needRefresh1 = false;
        }
      },
      touchBtn2: function touchBtn2() {
        var _this2 = this;
        this.state1_1.active = true;
        this.state1_2.active = false;
        this.state2_1.active = false;
        this.state2_2.active = true;
        this.scrollview_1.active = false;
        this.scrollview_2.active = true;
        if (this.needRefresh2) {
          this.scroll_2.removeAllChildren();
          var _loop2 = function _loop2(i) {
            var node = cc.instantiate(_this2.m_bg);
            node.level = _this2.noHasTab[i];
            var str = "mBtn_" + node.level;
            _this2[str] = node;
            cc.util.setNodeMap(node, node);
            node.lb_desc.setLabel(cc.util.getText(105) + ": " + cc.initMsg.snakePriceTab[node.level]);
            node.touchDing(function() {
              cc.GM.shop.buySkin(node.level);
            });
            node.btn_touch.touchDing(function() {
              cc.GM.shop.buySkin(node.level);
            });
            _this2.addSnake(node, node.level);
            _this2.scroll_2.addChild(node);
          };
          for (var i = 0; i < this.noHasTab.length; i++) _loop2(i);
          this.needRefresh2 = false;
        }
      },
      buySkin: function buySkin(level) {
        var price = cc.initMsg.snakePriceTab[level];
        gameData.golds < price ? cc.util.showAlert(cc.util.getText(333)) : cc.util.showTip({
          desc: cc.util.getText(351, ""),
          confirmFunc: function confirmFunc() {
            cc.GM.shop.sureBuy(level);
          }
        });
      },
      sureBuy: function sureBuy(level) {
        var price = -1 * cc.initMsg.snakePriceTab[level];
        cc.util.playSound("common/buySuccess");
        gameData.add("golds", price);
        gameData.set("hsp" + level, 1);
        var str = "mBtn_" + level;
        this[str].removeFromParent();
        this.needRefresh1 = true;
        cc.initMsg.unLockIndex = level;
        uiFunc.openUI("pops/newUnlock");
        this.resetOwner();
      }
    });
    cc._RF.pop();
  }, {} ],
  "use_v2.1-2.2.1_cc.Toggle_event": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5d0d5CG725F6IvOkUBPJS4+", "use_v2.1-2.2.1_cc.Toggle_event");
    "use strict";
    cc.Toggle && (cc.Toggle._triggerEventInScript_isChecked = true);
    cc._RF.pop();
  }, {} ],
  util: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "90b76DZBEZKuocg4oGXS7Gs", "util");
    "use strict";
    require("extend");
    require("wxUtil");
    var util = {};
    util.isChangweiTest = true;
    util.PrintPosDiff = 15;
    util._textTable = null;
    util.formatNum = function(num) {
      null == num && (num = 0);
      var str = "" + num;
      var count = 0;
      var result = "";
      for (var i = str.length - 1; i >= 0; i--) {
        count += 1;
        var s = str[i];
        result = s + result;
        if (3 == count && 0 != i) {
          result = "," + result;
          count = 0;
        }
      }
      return result;
    };
    util.copyArr = function(arr1) {
      var arr2 = JSON.parse(JSON.stringify(arr1));
      return arr2;
    };
    util.loadResNow = function(url) {
      return new Promise(function(resolve, reject) {
        cc.resources.load(url, function(err, content) {
          resolve({
            e: err,
            v: content
          });
        });
      });
    };
    util.mlog = function() {
      var mstr = "";
      for (var i in arguments) mstr += 0 == i ? arguments[i] : " ; " + arguments[i];
      util.PrintPosDiff > 1 ? util.PrintPosDiff -= 1 : util.PrintPosDiff = 15;
      var scene = cc.director.getScene();
      var uTime = 6.5;
      var node = new cc.Node("loadText");
      var label = node.addComponent(cc.Label);
      node.color = new cc.Color(80, 19, 0);
      node.position = cc.v2(cc.winSize.width / 2, 30 * util.PrintPosDiff);
      label.fontSize = 30;
      label.Font = "\u9ed1\u4f53";
      label.string = mstr;
      scene.addChild(node);
      node.zIndex = 9999;
      util.isChangweiTest && console.log("mlog--", mstr);
      var action = cc.sequence(cc.spawn(cc.fadeOut(uTime), cc.moveBy(uTime, cc.v2(0, 400))), cc.removeSelf());
      node.runAction(action);
    };
    util.moveToOtherWordPoint = function(mNode, toNode) {
      var worldPos1 = mNode.convertToWorldSpace(cc.v2(0, 0));
      var worldPos2 = toNode.convertToWorldSpace(cc.v2(0, 0));
      return cc.v2(mNode.x + (worldPos2.x - worldPos1.x), mNode.y + (worldPos2.y - worldPos1.y));
    };
    util.playSound = function(path, isLoop) {
      if ("close" == gameData.settingEffect) return;
      null == isLoop && (isLoop = false);
      var fullPath = "audio/" + path;
      var playSoundID = 0;
      null == cc.GM.hasLoadSound[fullPath] ? cc.resources.load(fullPath, cc.AudioClip, function(err, clip) {
        if (err) {
          cc.error(err.message || err);
          return;
        }
        playSoundID = cc.audioEngine.playEffect(clip, isLoop);
        cc.GM.hasLoadSound[fullPath] = clip;
      }) : playSoundID = cc.audioEngine.playEffect(cc.GM.hasLoadSound[fullPath], isLoop);
      return playSoundID;
    };
    util.stopSound = function(playSoundID) {
      cc.audioEngine.stopEffect(playSoundID);
    };
    util.playMusic = function(path) {
      if ("close" == gameData.settingMusic) return;
      var fullPath = "audio/" + path;
      cc.audioEngine.stopMusic();
      null == cc.GM.hasLoadSound[fullPath] ? cc.resources.load(fullPath, cc.AudioClip, function(err, clip) {
        if (err) {
          cc.error(err.message || err);
          return;
        }
        cc.GM.curPlayMusicID = cc.audioEngine.playMusic(clip, true);
        cc.GM.hasLoadSound[fullPath] = clip;
      }) : cc.GM.curPlayMusicID = cc.audioEngine.playMusic(cc.GM.hasLoadSound[fullPath], true);
    };
    util.stopMusic = function(musicID) {
      cc.audioEngine.stopMusic(cc.GM.curPlayMusicID);
      cc.audioEngine.stopMusic();
    };
    util.SoundClick = function() {
      util.playSound("common/Common_Panel_Dialog_Pop_Sound");
    };
    util.display = function(node, fileName) {
      if (void 0 === fileName) return node.getSpriteFrame();
      "string" === typeof fileName && (cc.GM.hasLoadImg[fileName] ? node.getComponent(cc.Sprite).spriteFrame = cc.GM.hasLoadImg[fileName] : cc.resources.load(fileName, cc.SpriteFrame, function(err, spriteFrame) {
        if (err) {
          cc.error(err.message || err);
          return;
        }
        cc.GM.hasLoadImg[fileName] = spriteFrame;
        node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      }));
    };
    util.getSuffixName = function(filename) {
      var index1 = filename.lastIndexOf(".");
      var index2 = filename.length;
      var postf = filename.substring(index1 + 1, index2);
      return postf;
    };
    util.loadUrlImg = function(node, picUrl, suffix) {
      if (!picUrl) return;
      picUrl = picUrl.replace(/\s+/g, "");
      if (cc.GM.hasLoadImg[picUrl]) node.getComponent(cc.Sprite).spriteFrame = cc.GM.hasLoadImg[picUrl]; else {
        suffix || (suffix = util.getSuffixName(picUrl));
        cc.loader.load({
          url: picUrl,
          type: suffix
        }, function(err, texTure) {
          if (texTure) {
            var spriteFrame = new cc.SpriteFrame(texTure);
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            cc.GM.hasLoadImg[picUrl] = spriteFrame;
          }
        });
      }
    };
    util.loadUrlCsv = function(picUrl, callBack) {
      cc.GM.hasLoadCsv[picUrl] ? callBack(cc.GM.hasLoadCsv[picUrl]) : cc.loader.load({
        url: picUrl,
        type: util.getSuffixName(picUrl)
      }, function(err, csvText) {
        var csvDataMap = {};
        var mapCsv = {
          text: csvText
        };
        util.transMapCsv2(csvDataMap, mapCsv);
        csvDataMap.picUrl = picUrl;
        cc.GM.hasLoadCsv[picUrl] = csvDataMap;
        callBack(cc.GM.hasLoadCsv[picUrl]);
      });
    };
    util.exto = function(child, father, zorder) {
      zorder = zorder || 0;
      var oldFather = child.getParent();
      if (oldFather) {
        child.removeFromParent(false);
        father.addChild(child, zorder);
      } else father.addChild(child, zorder);
    };
    util.preloadSp = function(fileName) {
      if (cc.GM.hasLoadImg[fileName]) return;
      cc.resources.load(fileName, cc.SpriteFrame, function(err, spriteFrame) {
        if (err) {
          cc.error(err.message || err);
          return;
        }
        cc.GM.hasLoadImg[fileName] = spriteFrame;
      });
    };
    util.setColor = function(node, color) {
      node.color = color;
      var children = node.getChildren();
      for (var i = 0; i < children.length; i++) util.setColor(children[i], color);
    };
    util.getCsvData = function(csvFile, callBack, listByID) {
      var dataBeginLine = 5;
      var filePath = "csvtable/" + csvFile;
      if (null != cc.GM.hasLoadCsv[csvFile]) {
        callBack && callBack(cc.GM.hasLoadCsv[csvFile]);
        return;
      }
      var csvDataMap = {};
      cc.resources.load(filePath, function(err, mapCsv) {
        if (err) cc.error(err); else {
          var mapArr = mapCsv.text.split("\n");
          var mapKey = mapArr[1].split(",");
          var mapKeyType = mapArr[2].split(",");
          "hero" == csvFile && cc.log(mapKeyType);
          for (var lineIndex = dataBeginLine; lineIndex < mapArr.length; lineIndex++) {
            var itemArr = mapArr[lineIndex].split(",");
            csvDataMap[lineIndex - dataBeginLine] = {};
            for (var itemIndex = 0; itemIndex <= itemArr.length; itemIndex++) {
              var keyValue = itemArr[itemIndex];
              "int" == mapKeyType[itemIndex] && (keyValue = parseInt(itemArr[itemIndex]));
              "float" == mapKeyType[itemIndex] && (keyValue = parseFloat(itemArr[itemIndex]));
              void 0 != mapKey[itemIndex] && (csvDataMap[lineIndex - dataBeginLine][mapKey[itemIndex].replace(/\s+/g, "")] = keyValue);
            }
          }
          var nCount = 0;
          for (var i in csvDataMap) csvDataMap[i].hasOwnProperty("ID") && !isNaN(csvDataMap[i].ID) ? nCount += 1 : csvDataMap[i] = {};
          csvDataMap.nCount = nCount;
          util.getFilePath(csvFile, csvDataMap);
          if (callBack) {
            var csvDataMapNew = {};
            if (listByID) {
              for (var index in csvDataMap) csvDataMap[index] && csvDataMap[index].ID && (csvDataMapNew[csvDataMap[index].ID] = csvDataMap[index]);
              csvDataMap = csvDataMapNew;
            }
            "7Sign" == csvFile && cc.log(csvDataMap);
            cc.GM.hasLoadCsv[csvFile] = csvDataMap;
            callBack(csvDataMap);
          }
        }
      });
    };
    util.getCsvData2 = function(csvFile, callBack) {
      var filePath = "csvtable/" + csvFile;
      if (null != cc.GM.hasLoadCsv[csvFile]) {
        callBack && callBack(cc.GM.hasLoadCsv[csvFile]);
        return;
      }
      var csvDataMap = {};
      cc.resources.load(filePath, function(err, mapCsv) {
        if (err) cc.error(err); else {
          util.transMapCsv2(csvDataMap, mapCsv);
          util.getFilePath(csvFile, csvDataMap);
          if (callBack) {
            cc.GM.hasLoadCsv[csvFile] = csvDataMap;
            callBack(csvDataMap);
          }
        }
      });
    };
    util.getKey = function(tab, key) {
      if (tab && tab[key]) return tab[key];
      cc.error("tab can't find key = " + key);
      return null;
    };
    util.getFilePath = function(csvFile, csvDataMap) {
      if ("Goods" == csvFile) for (var i in csvDataMap) if (csvDataMap[i].hasOwnProperty("icon")) {
        var tempIcon = csvDataMap[i].icon.replace(/\s+/g, "");
        for (var nIndex = 1; nIndex <= 6; nIndex++) "jinbi" + nIndex.toString() == tempIcon && (csvDataMap[i].icon = "img/common/token/jinbi/jinbi" + nIndex.toString());
        for (var nIndex = 1; nIndex <= 6; nIndex++) "zuanshi" + nIndex.toString() == tempIcon && (csvDataMap[i].icon = "img/common/token/zuanshi/zuanshi" + nIndex.toString());
        for (var nIndex = 1; nIndex <= 8; nIndex++) "hongbao" + nIndex.toString() == tempIcon && (csvDataMap[i].icon = "img/common/token/hongbao/hongbao" + nIndex.toString());
        for (var nIndex = 1; nIndex <= 7; nIndex++) "menpiao" + nIndex.toString() == tempIcon && (csvDataMap[i].icon = "img/common/token/menpiao/menpiao" + nIndex.toString());
        "hongbao" == tempIcon && (csvDataMap[i].icon = "img/common/token/hongbao/hongbao");
      }
    };
    util.showTip = function(obj) {
      uiFunc.clearUI("common/uiCommonTips");
      uiFunc.openUI("common/uiCommonTips", function(uiScript) {
        uiScript.init(obj);
      });
    };
    util.showDlg = function(path, obj) {
      uiFunc.clearUI(path);
      uiFunc.openUI(path, function(uiScript) {
        uiScript.init(obj);
      });
    };
    util.ifNull = function(mParam, mDefault) {
      return null == mParam ? mDefault : mParam;
    };
    util.showAlert = function(str, time) {
      if (!str) return;
      time = time || 2;
      uiFunc.clearUI("common/uiAlert");
      uiFunc.openUI("common/uiAlert", function(uiScript) {
        uiScript.init(str, time);
      });
    };
    util.transWan = function(num) {
      var wanNum = num / 1e4;
      return wanNum + "\u4e07";
    };
    util.getDateString = function(time) {
      return new Date(1e3 * time).Format("yyyy-MM-dd hh:mm:ss");
    };
    util.getNow = function() {
      return new Date().getTime();
    };
    util.getDate = function() {
      var date = new Date();
      date = 100 * (date.getMonth() + 1) + date.getDate();
      return date;
    };
    util.encodeTab = function(tab) {
      var str = "";
      for (var key in tab) str = str + key + "=" + util.urlencode(tab[key]) + "&";
      str = str.slice(0, -1);
      return str;
    };
    util.urlencode = function(str) {
      "object" === typeof str && (str = JSON.stringify(str));
      str = (str + "").toString();
      return encodeURIComponent(str).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/%20/g, "+");
    };
    util.setNodeMap = function(node, nodeDict) {
      var linkWidget = function(self, nodeDict) {
        var children = self.children;
        for (var i = 0; i < children.length; i++) {
          var widgetName = children[i].name;
          if (widgetName && widgetName.indexOf("_") > 0) {
            var nodeName = widgetName;
            nodeDict[nodeName] = children[i];
          }
          children[i].childrenCount > 0 && linkWidget(children[i], nodeDict);
        }
      }.bind(this);
      linkWidget(node, nodeDict);
    };
    util.getRandom = function(maxSize) {
      return Math.floor(Math.random() * maxSize) % maxSize;
    };
    util.tabcontains = function(tab, value) {
      for (var i = 0; i < tab.length; i++) if (tab[i] == value) return true;
      return false;
    };
    util.openUi = function(uiPath, callBack) {
      var fullUrl = "ui/" + uiPath;
      if (cc.GM.hasLoadPrefab[fullUrl]) {
        var temp = cc.instantiate(cc.GM.hasLoadPrefab[fullUrl]);
        callBack(temp);
      } else cc.resources.load(fullUrl, function(err, prefab) {
        if (err) {
          cc.error(err.message || err);
          return;
        }
        cc.GM.hasLoadPrefab[fullUrl] = prefab;
        var temp = cc.instantiate(prefab);
        callBack(temp);
      });
    };
    util.useShader = function(sprite, lab) {
      if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
        console.warn("Shader not surpport for canvas");
        return;
      }
      if (!sprite || !sprite.spriteFrame || sprite.lab == lab) return;
      if (lab) {
        if (null == lab.vert || null == lab.frag) {
          console.warn("Shader not defined", lab);
          return;
        }
        cc.dynamicAtlasManager.enabled = false;
        var material = new ShaderMaterial();
        var name = lab.name ? lab.name : "None";
        material.callfunc(name, lab.vert, lab.frag, lab.defines || []);
        var texture = sprite.spriteFrame.getTexture();
        material.setTexture(texture);
        material.updateHash();
        sprite._material = material;
        sprite._renderData.material = material;
        sprite.lab = lab;
        return material;
      }
      sprite.setState(1);
    };
    util.useLabShader = function(sprite, shader) {
      if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
        console.warn("Shader not surpport for canvas");
        return;
      }
      if (!sprite || !sprite.spriteFrame || sprite.getState() === shader) return;
      if (ShaderType[shader]) {
        var name = ShaderType[shader];
        var lab = ShaderLab[name];
        if (!lab) {
          console.warn("Shader not defined", name);
          return;
        }
        cc.dynamicAtlasManager.enabled = false;
        var material = new ShaderMaterial();
        material.callfunc(name, lab.vert, lab.frag, lab.defines || []);
        var texture = sprite.spriteFrame.getTexture();
        material.setTexture(texture);
        material.updateHash();
        sprite._material = material;
        sprite._renderData.material = material;
        sprite._state = shader;
        return material;
      }
      sprite.setState(1);
    };
    util.loadSp = function(parent, path, func) {
      if (cc.GM.hasLoadImg[path]) {
        var node = new cc.Node("loadSp");
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = cc.GM.hasLoadImg[path];
        parent.addChild(node);
        null != func && func(node);
      } else cc.resources.load(path, cc.SpriteFrame, function(err, spriteFrame) {
        if (err) {
          cc.error(err.message || err);
          return;
        }
        var node = new cc.Node("loadSp");
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
        cc.GM.hasLoadImg[path] = spriteFrame;
        parent.addChild(node);
        null != func && func(node);
      });
    };
    util.isIos = function() {
      if (cc.sys.os === cc.sys.OS_IOS) return true;
      return false;
    };
    util.setTextMaxCharCode = function(str, maxNum) {
      null == maxNum && (maxNum = 4);
      if (str.length <= maxNum) return str;
      var num = 0;
      for (var i in str) {
        var charCode = str.charCodeAt(i);
        num += charCode > 32 && charCode < 127 ? 5 / 9 : 1;
        if (num > maxNum) {
          str = str.substr(0, i);
          str += "..";
          return str;
        }
      }
      return str;
    };
    util.getStrLength = function(str) {
      var num = 0;
      for (var i in str) {
        var charCode = str.charCodeAt(i);
        num += charCode > 32 && charCode < 127 ? 5 / 9 : 1;
      }
      return num;
    };
    util.getCirclePos = function(angle, center, radius) {
      var x = center.x + Math.cos(angle) * radius;
      var y = center.y + Math.sin(angle) * radius;
      return cc.v2(x, y);
    };
    util.angleToRotation = function(angle) {
      return 180 / Math.PI * angle;
    };
    util.TwoPointAngle = function(pointFrom, pointTo) {
      var dx = Math.abs(pointFrom.x - pointTo.x);
      var dy = Math.abs(pointFrom.y - pointTo.y);
      var z = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      var cos = dy / z;
      var radina = Math.acos(cos);
      var angle = Math.floor(180 / (Math.PI / radina));
      pointTo.x > pointFrom.x && pointTo.y > pointFrom.y ? angle = 180 - angle : pointTo.x == pointFrom.x && pointTo.y > pointFrom.y ? angle = 180 : pointTo.x > pointFrom.x && pointTo.y == pointFrom.y ? angle = 90 : pointTo.x < pointFrom.x && pointTo.y > pointFrom.y ? angle = 180 + angle : pointTo.x < pointFrom.x && pointTo.y == pointFrom.y ? angle = 270 : pointTo.x < pointFrom.x && pointTo.y < pointFrom.y && (angle = 360 - angle);
      angle = (angle + 270) % 360;
      return angle;
    };
    util.loadJson = function(path, func) {
      var fullPath = "json/" + path;
      null == cc.GM.hasLoadJson[fullPath] ? cc.resources.load(fullPath, function(err, res) {
        if (err) cc.error(err); else {
          cc.GM.hasLoadJson[fullPath] = res.json;
          null != func && func(res.json);
        }
      }) : null != func && func(cc.GM.hasLoadJson[fullPath]);
    };
    util.rand = function(st, ed) {
      if (null == ed) {
        ed = st;
        st = 0;
      }
      return Math.random() * (ed - st) + st;
    };
    util.randInt = function(st, ed) {
      return Math.round(this.rand(st, ed));
    };
    util.pointDistance = function(a, b) {
      var x = a.x - b.x, y = a.y - b.y;
      return Math.sqrt(x * x + y * y);
    };
    util.pointDirectAdd = function(mPoint, toPoint, add) {
      var distance = util.pointDistance(mPoint, toPoint);
      var x = (toPoint.x - mPoint.x) / distance;
      var y = (toPoint.y - mPoint.y) / distance;
      return cc.v2(toPoint.x + add * x, toPoint.y + add * y);
    };
    util.submitScore = function(key, score) {
      cc.sys.platform === cc.sys.WECHAT_GAME ? wx.getOpenDataContext().postMessage({
        messageType: 2,
        key: key,
        score: score
      }) : cc.log("\u63d0\u4ea4\u5f97\u5206" + key + ":" + score);
    };
    util.convertToNodePos = function(target, node) {
      var worldPos = target.parent.convertToWorldSpaceAR(target.position);
      var nodePos = node.convertToNodeSpaceAR(worldPos);
      return nodePos;
    };
    util.setCenterWithNode = function(target, node1, node2) {
      var parent = target.parent;
      var pos1 = util.convertToNodePos(node1, parent).y - node1.height * node1.scale / 2;
      var pos2 = util.convertToNodePos(node2, parent).y + node2.height * node2.scale / 2;
      target.y = (pos1 + pos2) / 2;
    };
    util.randomRange = function(min, max) {
      max = max || 0;
      min = min || 0;
      var rnd = Math.random() * (max - min + 1);
      return Math.floor(min + rnd);
    };
    util.isNull = function(x) {
      if (void 0 == x) return true;
      if ("" === x) return true;
      if (null == x) return true;
      return false;
    };
    util.copyObj = function(obj1, obj2) {
      var obj2 = obj2 || {};
      for (var name in obj1) if ("object" === typeof obj1[name]) {
        obj2[name] = obj1[name].constructor === Array ? [] : {};
        util.copyObj(obj1[name], obj2[name]);
      } else obj2[name] = obj1[name];
      return obj2;
    };
    util.shuffle = function(array) {
      for (var i = array.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = array[randomIndex];
        array[randomIndex] = array[i];
        array[i] = itemAtIndex;
      }
    };
    var thousandTab = {
      th1: Math.pow(10, 3),
      th2: Math.pow(10, 6),
      th3: Math.pow(10, 9),
      th4: Math.pow(10, 12),
      th5: Math.pow(10, 15),
      th6: Math.pow(10, 18),
      th7: Math.pow(10, 21),
      th8: Math.pow(10, 24)
    };
    util.getEasyNum = function(realNum) {
      realNum = Math.floor(realNum);
      var result = "";
      var baseNum = 1e5;
      if (realNum < baseNum) result = util.formatNum(realNum); else if (realNum >= baseNum && realNum < baseNum * thousandTab.th1) {
        var countNum = Math.floor(realNum / thousandTab.th1);
        result = util.formatNum(countNum) + "K";
      } else if (realNum >= baseNum * thousandTab.th1 && realNum < baseNum * thousandTab.th2) {
        var countNum = Math.floor(realNum / thousandTab.th2);
        result = util.formatNum(countNum) + "M";
      } else if (realNum >= baseNum * thousandTab.th2 && realNum < baseNum * thousandTab.th3) {
        var countNum = Math.floor(realNum / thousandTab.th3);
        result = util.formatNum(countNum) + "B";
      } else if (realNum >= baseNum * thousandTab.th3 && realNum < baseNum * thousandTab.th4) {
        var countNum = Math.floor(realNum / thousandTab.th4);
        result = util.formatNum(countNum) + "T";
      } else if (realNum >= baseNum * thousandTab.th4 && realNum < baseNum * thousandTab.th5) {
        var countNum = Math.floor(realNum / thousandTab.th5);
        result = util.formatNum(countNum) + "P";
      } else if (realNum >= baseNum * thousandTab.th5 && realNum < baseNum * thousandTab.th6) {
        var countNum = Math.floor(realNum / thousandTab.th6);
        result = util.formatNum(countNum) + "E";
      } else if (realNum >= baseNum * thousandTab.th6 && realNum < baseNum * thousandTab.th7) {
        var countNum = Math.floor(realNum / thousandTab.th7);
        result = util.formatNum(countNum) + "o";
      }
      return result;
    };
    util.transMapCsv2 = function(csvDataMap, mapCsv) {
      var dataBeginLine = 5;
      var mapArr = mapCsv.text.split("\n");
      var mapKey = mapArr[1].split(",");
      var mapKeyType = mapArr[2].split(",");
      for (var lineIndex = dataBeginLine; lineIndex < mapArr.length; lineIndex++) {
        var itemArr = mapArr[lineIndex].split(",");
        if (itemArr.length != mapKey.length || "" == itemArr[0]) continue;
        csvDataMap[lineIndex - dataBeginLine] = {};
        for (var itemIndex = 0; itemIndex < itemArr.length; itemIndex++) {
          var keyValue = itemArr[itemIndex];
          "int" == mapKeyType[itemIndex] && (keyValue = parseInt(itemArr[itemIndex]));
          "float" == mapKeyType[itemIndex] && (keyValue = parseFloat(itemArr[itemIndex]));
          void 0 != mapKey[itemIndex] && (csvDataMap[lineIndex - dataBeginLine][mapKey[itemIndex].replace(/\s+/g, "")] = keyValue);
        }
      }
    };
    util.loadText = function() {
      util.loadJson("language_zh_CN", function(json) {
        util._textTable = json;
      });
    };
    util.getText = function(key) {
      if (!util.isNull(util._textTable)) {
        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) params[_key - 1] = arguments[_key];
        if (null != params && params.length > 0) return util._textTable[key].format(params);
        return util._textTable[key];
      }
      return key;
    };
    module.exports = util;
    cc._RF.pop();
  }, {
    extend: "extend",
    wxUtil: "wxUtil"
  } ],
  webData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "62f40krbY5ELJ1IskKh/wrT", "webData");
    "use strict";
    var _host = "https://www";
    var _getPublicData = "";
    var _setGameClick = "";
    var baseData = require("baseData");
    cc.Class({
      extends: baseData,
      name: "webData",
      properties: {
        login: _host + "/Login/Index",
        userinfo: _host + "/Login/SetUserInfo",
        _navigateData: [],
        _sendDataTypes: {
          default: {}
        }
      },
      mInit: function mInit() {
        var _this = this;
        HTTP.GET(_host + "/manage/version/snake.json", {}, function(res) {
          wxData.set("_isExamine", res.version == wxData.get("ver"));
          console.log("_isExamine", res, wxData._isExamine);
          res.adPass && (cc.initMsg.adPass = res.adPass);
          res.frTime && (cc.initMsg.frTime = res.frTime);
          res.qunHao && (cc.initMsg.qunHao = res.qunHao);
          res.share && (cc.initMsg.share = res.share);
          res.rogue && (cc.initMsg.rogue = res.rogue);
          if (res.hightShare) {
            wxData.SharePro1 = 75;
            wxData.SharePro2 = 99;
          }
          res.shouQuan && _this.needShouQuan();
          if (wxData._isExamine) {
            cc.initMsg.thankTime = .2;
            cc.initMsg.qunHao = null;
          }
        });
        this.initLogin();
      },
      init: function init(callback) {},
      needShouQuan: function needShouQuan() {
        if (gameData.mName == cc.initMsg.white) {
          console.log("needGetUserInfo");
          this.getUserInfo();
        } else {
          var nickName = gameData.mName;
          if (nickName.indexOf("Tencent") >= 0 || nickName.indexOf("game") >= 0) {
            cc.initMsg.inBlack = true;
            this.setBlack();
          }
        }
      },
      initNavigateData: function initNavigateData(data) {
        this._navigateData = data;
      },
      getnavigateData: function getnavigateData() {
        return this._navigateData;
      },
      initLogin: function initLogin() {
        cc.sys.platform === cc.sys.WECHAT_GAME && wxUtil.loginWx(function(res) {
          var fullUrl = _host + "/openId?appid=wx11111&jsCode=" + res.code + "&haslog=true&folder=snake";
          if (gameData.get("openid") == cc.initMsg.white) HTTP.GET(fullUrl, {}, function(res2) {
            console.log("res2", res2);
            if (1e3 == res2.code) {
              var mJson = res2.data;
              "object" != typeof mJson && (mJson = JSON.parse(res2.data));
              console.log("mJson", mJson);
              mJson.openid && gameData.set("openid", mJson.openid);
              if (res2.mlog) {
                var mlog = JSON.parse(res2.mlog);
                if (null == cc.GM.game) for (var i in mlog) gameData.set(i, mlog[i]);
                cc.GM.hasReadLog = true;
              }
            }
          }); else {
            cc.GM.hasReadLog = true;
            console.log("\u5df2\u6709id", gameData.get("openid"));
          }
        }, function() {});
      },
      setBlack: function setBlack() {
        console.log("setBlack", cc.initMsg.inBlack);
        cc.initMsg.inBlack && (cc.initMsg.rogue = false);
      },
      getUserInfo: function getUserInfo() {
        var onGetUserInfo = function(res) {
          gameData.set("mName", res.nickName);
          gameData.set("mHead", res.avatarUrl);
          var nickName = res.nickName;
          if (nickName.indexOf("Tencent") >= 0 || nickName.indexOf("game") >= 0) {
            cc.initMsg.inBlack = true;
            this.setBlack();
          }
        }.bind(this);
        wxUtil.getUserInfo(function(res) {
          onGetUserInfo(res.userInfo);
        }, function() {
          wxUtil.createUserInfoButton(function(res) {
            cc.log("createUserInfoButton", res);
            onGetUserInfo(res.userInfo);
          });
        });
      },
      getShareInfo: function getShareInfo() {
        var info = {};
        return info;
      }
    });
    cc._RF.pop();
  }, {
    baseData: "baseData"
  } ],
  wxData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7eebd0pW+tD/I6DxBKmb9BN", "wxData");
    "use strict";
    var baseData = require("baseData");
    cc.Class({
      extends: baseData,
      name: "wxData",
      properties: {
        gameType: 7,
        szName: "cc.wocao",
        ver: "1.009",
        _isExamine: false,
        sdkver: 673,
        shareCallback: null,
        shareTime: 0,
        SharePro1: 35,
        SharePro2: 96
      },
      ctor: function ctor() {
        var _this = this;
        cc.sys.platform === cc.sys.WECHAT_GAME && wx.onShow(function(res) {
          var delay = util.getNow() - _this.shareTime;
          setTimeout(function() {
            var obj = _this.get("shareCallback");
            if (obj) {
              delay < 2700 ? _this.isShareSuc(_this.SharePro1) ? obj.success && obj.success() : obj.fail && obj.fail() : _this.isShareSuc(_this.SharePro2) ? obj.success && obj.success() : obj.fail && obj.fail();
              _this.set("shareCallback", null);
            }
          }, 500);
        });
      },
      isExamine: function isExamine() {
        return this.get("_isExamine");
      },
      hasShareCallback: function hasShareCallback() {
        return this.get("sdkver") < 673;
      },
      isShareSuc: function isShareSuc(key) {
        var per = Math.random();
        return per < key / 100;
      }
    });
    cc._RF.pop();
  }, {
    baseData: "baseData"
  } ],
  wxUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "44857ET6FdHE4WJLyvh1d95", "wxUtil");
    "use strict";
    window.wxUtil = {};
    wxUtil.postMessage = function(type, value) {
      if (cc.sys.platform !== cc.sys.WECHAT_GAME) return;
      wx.postMessage({
        type: type,
        value: value
      });
    };
    wxUtil.initMat = function() {};
    wxUtil.startMat = function(event, key, value) {};
    wxUtil.shareToWx = function(obj) {
      if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
        cc.util.showAlert("\u5f53\u524d\u4e0d\u662f\u5fae\u4fe1\u5c0f\u6e38\u620f\u73af\u5883\n\u65e0\u6cd5\u5206\u4eab");
        return;
      }
      cc.GM.waitShareCallBack = true;
      wxData.set("shareCallback", null);
      wxData.set("shareTime", cc.util.getNow());
      var shareInfo = cc.initMsg.getShareInfo();
      obj.title = shareInfo.title;
      obj.imageUrl = shareInfo.imageUrl;
      obj.query = shareInfo.query;
      var suc = obj.success;
      var fail = obj.fail;
      obj.success = function(res) {
        if (cc.GM.waitShareCallBack) {
          cc.GM.waitShareCallBack = false;
          0 == gameData.shareTime ? fail(res) : suc(res);
          gameData.add("shareTime", 1);
        }
      };
      obj.fail = function(res) {
        if (cc.GM.waitShareCallBack) {
          gameData.add("shareTime", 1);
          cc.GM.waitShareCallBack = false;
          fail(res);
        }
      };
      obj.cancel = function(res) {
        if (cc.GM.waitShareCallBack) {
          gameData.add("shareTime", 1);
          cc.GM.waitShareCallBack = false;
          fail(res);
        }
      };
      wxData.set("shareCallback", obj);
      wx.showShareMenu({
        withShareTicket: true,
        success: function success() {
          cc.log("showShareMenu \u6210\u529f");
          wx.shareAppMessage(obj);
        },
        fail: function fail() {
          cc.log("showShareMenu \u5931\u8d25");
        },
        cancel: function cancel() {
          cc.log("showShareMenu \u53d6\u6d88\u8f6c\u53d1");
          obj.fail();
        }
      });
    };
    wxUtil.getUserInfo = function(callBack, failcallBack) {
      cc.sys.platform === cc.sys.WECHAT_GAME ? wx.getUserInfo({
        withCredentials: true,
        lang: "zh_CN",
        success: function success(res) {
          callBack && callBack(res);
        },
        fail: function fail() {
          cc.log("\u83b7\u53d6\u7528\u6237\u4fe1\u606f\u5931\u8d25!");
          callBack && failcallBack();
        }
      }) : cc.log("\u5f53\u524d\u4e0d\u662f\u5fae\u4fe1\u5c0f\u6e38\u620f\u73af\u5883,\u65e0\u6cd5\u83b7\u5f97\u7528\u6237\u4fe1\u606f");
    };
    wxUtil.getLaunchParam = function() {
      if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        var arg = wx.getLaunchOptionsSync();
        cc.log("\u5c0f\u7a0b\u5e8f\u542f\u52a8\u53c2\u6570", arg);
        return arg;
      }
      return {};
    };
    wxUtil.getUserAuthInfo = function(key, callback) {
      cc.sys.platform === cc.sys.WECHAT_GAME ? wx.getSetting({
        success: function success(res) {
          callback(res.authSetting[key]);
        },
        fail: function fail() {
          cc.log("\u83b7\u53d6\u7528\u6237\u6388\u6743\u4fe1\u606f\u5931\u8d25");
        }
      }) : cc.log("\u5f53\u524d\u4e0d\u662f\u5fae\u4fe1\u5c0f\u6e38\u620f\u73af\u5883,\u65e0\u6cd5\u5206\u4eab");
    };
    var bannerAdid = {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: ""
    };
    var adunitids = {
      1: ""
    };
    var chapingAdids = {
      1: ""
    };
    wxUtil.showChaPing = function(index, noShow, closeFunc) {
      var _this = this;
      if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        var id = chapingAdids[index];
        if (!id) {
          cc.error("not chapingAdids index = ", index);
          return;
        }
        var str = "chapinMsg" + index;
        chapingAdids[str] || (chapingAdids[str] = {
          whichAd: null,
          showTime: 0
        });
        if (wx.createInterstitialAd) {
          var interstitialAd = null;
          if (chapingAdids[str].whichAd) {
            interstitialAd = chapingAdids[str].whichAd;
            cc.log("\u76f4\u63a5\u7528\u9884\u52a0\u8f7d\u597d\u7684\u5c55\u793a");
          } else {
            interstitialAd = wx.createInterstitialAd({
              adUnitId: id
            });
            chapingAdids[str].whichAd = interstitialAd;
          }
          if (noShow) ; else if (interstitialAd) {
            interstitialAd.show()["catch"](function(err) {
              cc.log("\u63d2\u5c4f\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25", index);
              interstitialAd.closeFunc && interstitialAd.closeFunc();
            });
            chapingAdids[str].showTime += 1;
          }
          interstitialAd.closeFunc && (interstitialAd.closeFunc = null);
          closeFunc && (interstitialAd.closeFunc = closeFunc);
          interstitialAd.onClose(function(res) {
            interstitialAd.closeFunc && interstitialAd.closeFunc();
            if (chapingAdids[str].showTime > 8) {
              chapingAdids[str] = null;
              _this.showChaPing(index, true);
            }
          });
        }
      }
    };
    wxUtil.preLoadAd = function() {
      if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        var index = 1;
        var id = adunitids[index];
        if (!id) {
          cc.error("not adunitid index = ", index);
          return;
        }
        var rewardedVideoAd = wx.createRewardedVideoAd({
          adUnitId: id
        });
        rewardedVideoAd.onLoad(function() {
          cc.log("\u3010\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u52a0\u8f7d\u6210\u529f\u3011...");
        });
        rewardedVideoAd.onError(function(err) {
          cc.log("\u3010\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25\u3011...", err);
        });
      }
    };
    wxUtil.fhowAD = function(index, callback, failcallback) {
      var _this2 = this;
      if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        var id = adunitids[index];
        if (!id) {
          cc.error("not adunitid index = ", index);
          return;
        }
        if (this._openingAD) return;
        this._openingAD = Date.now();
        this._adcallback = callback;
        this._failcallback = failcallback;
        var rewardedVideoAd = wx.createRewardedVideoAd({
          adUnitId: id
        });
        rewardedVideoAd.show().then(function() {
          audioData.StopAllSound();
        })["catch"](function(err) {
          rewardedVideoAd.load().then(function() {
            rewardedVideoAd.show().then(function() {
              audioData.StopAllSound();
            });
          });
        });
        if (this._hasCreatedAd) return;
        this._hasCreatedAd = true;
        rewardedVideoAd.onLoad(function() {});
        rewardedVideoAd.onError(function(err) {
          _this2._openingAD = false;
          audioData.ResumeAllSound();
          _this2._failcallback && _this2._failcallback();
        });
        rewardedVideoAd.onClose(function(res) {
          audioData.ResumeAllSound();
          (res && res.isEnded || void 0 === res) && _this2._openingAD && Date.now() - _this2._openingAD > 5e3 ? _this2._adcallback && _this2._adcallback() : cc.util.showAlert("\u9886\u53d6\u5931\u8d25\uff0c\u8bf7\u60a8\u91cd\u8bd5", 1);
          _this2._openingAD = false;
        });
        return;
      }
      callback();
    };
    wxUtil.createUserInfoButton = function(callback) {
      if (cc.sys.platform !== cc.sys.WECHAT_GAME) return;
      var rect = new cc.Rect(-720, 0, 300, 300);
      var frameSize = cc.view.getFrameSize();
      var winSize = cc.winSize;
      var left = (winSize.width + rect.x - .5 * rect.width) / winSize.width * frameSize.width;
      var top = (.5 * winSize.height - rect.y - .5 * rect.height) / winSize.height * frameSize.height;
      var width = rect.width / winSize.width * frameSize.width;
      var height = rect.height / winSize.height * frameSize.height;
      var style = {
        left: left,
        top: top,
        width: width,
        height: height
      };
      var createUserInfoButton = wx.createUserInfoButton({
        type: "image",
        image: "",
        style: style
      });
      var onCreateUserInfoButtonTap = function(res) {
        createUserInfoButton.hide();
        createUserInfoButton.destroy();
        if ("getUserInfo:ok" !== res.errMsg) {
          cc.util.showAlert("\u6388\u6743\u5931\u8d25");
          return;
        }
        callback && callback(res);
      }.bind(this);
      createUserInfoButton.onTap(onCreateUserInfoButtonTap);
      createUserInfoButton.show();
      return createUserInfoButton;
    };
    wxUtil.getUserStorageDataSync = function(key) {
      if (cc.sys.platform === cc.sys.WECHAT_GAME && "string" === typeof key && key.length > 0) {
        var fullKey = "Storage" + key;
        return wx.getStorageSync(fullKey);
      }
      return null;
    };
    wxUtil.saveUserStorageDataSync = function(value, key) {
      if (cc.sys.platform === cc.sys.WECHAT_GAME && "string" === typeof key && key.length > 0) {
        var fullKey = "Storage" + key;
        wx && wx.setStorageSync && wx.setStorageSync(fullKey, value);
        return true;
      }
      return false;
    };
    wxUtil.pay = function(value, key) {
      wx.requestMidasPayment({
        mode: "game",
        offerId: "",
        buyQuantity: 10,
        zoneId: 1,
        success: function success() {},
        fail: function fail(_ref) {
          var errMsg = _ref.errMsg, errCode = _ref.errCode;
          cc.log(errMsg, errCode);
        }
      });
    };
    wxUtil.startOtherGame = function(strAppID, path, callback) {
      if (cc.sys.platform !== cc.sys.WECHAT_GAME || null == wx.navigateToMiniProgram) {
        cc.log("\u5f53\u524d\u4e0d\u662f\u5fae\u4fe1\u5c0f\u7a0b\u5e8f\u73af\u5883!", strAppID, path);
        return;
      }
      wx.navigateToMiniProgram({
        appId: strAppID,
        path: path,
        extraData: {},
        envVersion: "release",
        success: function success(res) {
          callback && callback(true);
        },
        fail: function fail(res) {
          callback && callback(false);
        }
      });
    };
    wxUtil.openCustomerService = function(callBack) {
      if (cc.sys.platform !== cc.sys.WECHAT_GAME) return;
      wx.openCustomerServiceConversation({
        success: function success() {
          callBack && callBack(true);
        },
        fail: function fail() {
          callBack && callBack(false);
        }
      });
    };
    wxUtil.getSystemInfoSync = function() {
      if (cc.sys.platform === cc.sys.WECHAT_GAME) return wx.getSystemInfoSync();
    };
    wxUtil.vibrate = function() {
      cc.sys.platform === cc.sys.WECHAT_GAME && "open" == gameData.get("settingVibrate") && wx.vibrateLong({});
    };
    wxUtil.vibrateShort = function() {
      if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        if ("close" == gameData.get("settingVibrate")) return;
        wx.vibrateShort({
          success: function success(res) {
            cc.log("\u9707\u52a8\u6210\u529f");
          },
          fail: function fail(err) {
            cc.log("\u9707\u52a8\u5931\u8d25");
          }
        });
      }
    };
    wxUtil.vibrateLong = function() {
      if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        if ("close" == audioData.get("_SettingVibrate")) return;
        wx.vibrateLong({
          success: function success(res) {
            cc.log("\u9707\u52a8\u6210\u529f");
          },
          fail: function fail(err) {
            cc.log("\u9707\u52a8\u5931\u8d25");
          }
        });
      }
    };
    wxUtil.setKeepScreenOn = function() {
      if (cc.sys.platform !== cc.sys.WECHAT_GAME) return;
      wx.setKeepScreenOn({
        keepScreenOn: true,
        success: function success(res) {
          cc.log("\u8bbe\u7f6e\u6210\u529f");
        }
      });
    };
    var bannerlist = [];
    var bannerCd = [];
    wxUtil.setBannerAd = function(index, node, isbottom, noShow) {
      if (cc.sys.platform === cc.sys.WECHAT_GAME && wx.createBannerAd) {
        var id = bannerAdid[index];
        if (!id) {
          cc.log("\u5e7f\u544aid\u4e0d\u5b58\u5728", id);
          return;
        }
        if (bannerlist[index] && node) {
          node.isbottom = !!isbottom;
          bannerlist[index].careNode = node;
        }
        var createBanner = function createBanner(id) {
          var winSize = cc.initMsg.systemInfo;
          var wxban = wx.createBannerAd({
            adUnitId: id,
            style: {
              left: 0,
              top: winSize.screenHeight / 2 - 370,
              width: winSize.windowWidth / 3.5 - 10
            }
          });
          wxban.onLoad(function() {
            cc.log("\u5e7f\u544a\u52a0\u8f7d\u6210\u529f");
            bannerCd[id] = Date.now();
          });
          wxban.onError(function() {
            cc.log("\u5e7f\u544a\u9519\u8bef");
          });
          if (node) {
            node.isbottom = !!isbottom;
            wxban.careNode = node;
          }
          wxban.onResize(function(res) {
            var isbottomNow = true;
            bannerlist[index] && bannerlist[index].careNode && false == bannerlist[index].careNode.isbottom && (isbottomNow = false);
            if (isbottomNow) {
              wxban.style.top = winSize.windowHeight - wxban.style.realHeight - 1280 / winSize.screenHeight;
              node && node.isLeft ? wxban.style.left = winSize.screenWidth / 2 - wxban.style.realWidth - 20 : wxban.style.left = winSize.screenWidth / 2 - wxban.style.realWidth / 2;
            } else wxUtil.resetAdPos(index, node);
          });
          return wxban;
        };
        if (!node) {
          bannerlist[index] = createBanner(id);
          return;
        }
        node.bannerid = index;
        node.off("destory");
        node.off("active");
        node.on("destory", function() {
          if (null != bannerlist[node.bannerid]) {
            cc.log("\u5e7f\u544a\u9690\u85cf");
            var oldban = bannerlist[node.bannerid];
            oldban && oldban.hide && oldban.hide();
            var _id = bannerAdid[node.bannerid];
            if (Date.now() - bannerCd[_id] > 45e3) {
              oldban.destroy();
              var newban = createBanner(_id);
              bannerlist[node.bannerid] = newban;
            }
            wxUtil.popBanner();
          }
        });
        node.on("active", function(active) {
          if (active) ; else if (null != bannerlist[node.bannerid]) {
            cc.log("\u5e7f\u544a\u9690\u85cfactive");
            var oldban = bannerlist[node.bannerid];
            oldban && oldban.hide && oldban.hide();
            var _id2 = bannerAdid[node.bannerid];
            if (Date.now() - bannerCd[_id2] > 45e3) {
              oldban.destroy();
              var newban = createBanner(_id2);
              bannerlist[node.bannerid] = newban;
            }
            wxUtil.popBanner();
          }
        });
        node.reShow = function() {
          if (node.bannerid) {
            bannerlist[node.bannerid].show();
            bannerlist[node.bannerid].onResize();
          }
        };
        node.reHide = function() {
          if (node.bannerid) {
            var oldban = bannerlist[node.bannerid];
            oldban.hide();
            var _id3 = bannerAdid[node.bannerid];
            if (bannerCd[_id3]) {
              if (Date.now() - bannerCd[_id3] > 45e3) {
                oldban.destroy();
                var newban = createBanner(_id3);
                bannerlist[node.bannerid] = newban;
              }
            } else if (Math.random() < .5) {
              oldban.destroy();
              var newban = createBanner(_id3, isbottom);
              bannerlist[node.bannerid] = newban;
            }
          }
        };
        bannerlist[index] || (bannerlist[index] = createBanner(id));
        noShow || bannerlist[index].show();
        node && bannerlist[index].onResize();
        wxUtil.pushBanner(index);
      }
    };
    wxUtil.resetAdPos = function(index, node_ui) {
      var bannerAd = bannerlist[index];
      if (!bannerAd) return;
      var phone = cc.initMsg.systemInfo;
      node_ui && node_ui.isLeft ? bannerAd.style.left = phone.screenWidth / 2 - bannerAd.style.realWidth - 20 : bannerAd.style.left = phone.screenWidth / 2 - bannerAd.style.realWidth / 2;
      if (node_ui && cc.isValid(node_ui)) {
        var node_pos = node_ui.parent.convertToWorldSpaceAR(node_ui.position);
        var bottomOffset = node_pos.y / cc.winSize.height * phone.screenHeight;
        bannerAd.style.top = phone.screenHeight - bottomOffset;
      } else bannerAd.style.top = phone.screenHeight - bannerAd.style.realHeight - 1280 / phone.screenHeight;
    };
    wxUtil.loginWx = function(callBack, failcallBack) {};
    wxUtil.preLoadBanner = function() {};
    var bannerStack = [];
    wxUtil.pushBanner = function(index) {};
    wxUtil.hideAllBanner = function() {};
    wxUtil.popBanner = function() {};
    cc._RF.pop();
  }, {} ]
}, {}, [ "LabelLanguage", "baseData", "HTTP", "baseDlg", "baseNode", "baseWin", "uiFunc", "extend", "util", "wxUtil", "audioData", "shareData", "gameData", "webData", "wxData", "init", "main", "initMsg", "uiAlert", "uiCommonTips", "initDatas", "snakeAi1", "snakeBase", "snakeCom", "snakeHall", "snakeMe", "uRpOver", "uRpRelive", "uiGame", "uiHall", "uiLoading", "uiShop", "newUnlock", "uFindRoom", "uHome", "uOffline", "uSign", "uTryGame", "uTryUse", "uiSetting", "use_v2.1-2.2.1_cc.Toggle_event" ]);