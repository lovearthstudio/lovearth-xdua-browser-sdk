'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _ = require('lodash');

var UAParser = require('ua-parser-js');

var ArgumentError = require('./exceptions/ArgumentError');

var md5 = require('./utils/md5');

var _require = require('./constants/contentType'),
    APPLICATION_JSON = _require.APPLICATION_JSON,
    APPLICATION_X_WWW_FORM_URLENCODED = _require.APPLICATION_X_WWW_FORM_URLENCODED;

var _require2 = require('./oss/oss-client'),
    getClient = _require2.getClient,
    addfile = _require2.addfile;

var _require3 = require('./constants'),
    APIV = _require3.APIV,
    API_END_POINT = _require3.API_END_POINT,
    HAM_API_END_POINT = _require3.HAM_API_END_POINT,
    setAppSecret = _require3.setAppSecret,
    setAppKey = _require3.setAppKey,
    getAppSecret = _require3.getAppSecret,
    getAppKey = _require3.getAppKey,
    setLocalToken = _require3.setLocalToken,
    delLocalToken = _require3.delLocalToken,
    getLocalToken = _require3.getLocalToken;

var _require4 = require('./utils/Sign')(),
    generateSign = _require4.generateSign;

var aliYunClient = require('./aliyunClient');

function hannm(_x) {
  return _hannm.apply(this, arguments);
}

function _hannm() {
  _hannm = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(_ref) {
    var APP_SECRET, APP_KEY, initialize, _initialize, addToken, _addToken, getToken, _getToken, addIdcardValidation, _addIdcardValidation, getComtags, _getComtags, getIploc, _getIploc, getTeloc, _getTeloc, getSimcom, _getSimcom, addParStand, _addParStand, addParTremor, _addParTremor, addParStride, _addParStride, addParTapping, _addParTapping;

    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _addParTapping = function _ref25() {
              _addParTapping = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee12(params) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.prev = 0;
                        API_PATH = '/parstride';
                        url = encodeURI(HAM_API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };
                        _context12.next = 7;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: params
                        });

                      case 7:
                        res = _context12.sent;
                        data = res.data;
                        return _context12.abrupt("return", data);

                      case 12:
                        _context12.prev = 12;
                        _context12.t0 = _context12["catch"](0);
                        return _context12.abrupt("return", {
                          error: 2,
                          reason: _context12.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12, this, [[0, 12]]);
              }));
              return _addParTapping.apply(this, arguments);
            };

            addParTapping = function _ref24(_x11) {
              return _addParTapping.apply(this, arguments);
            };

            _addParStride = function _ref23() {
              _addParStride = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee11(params) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        _context11.prev = 0;
                        API_PATH = '/parstride';
                        url = encodeURI(HAM_API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };
                        _context11.next = 7;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: params
                        });

                      case 7:
                        res = _context11.sent;
                        data = res.data;
                        return _context11.abrupt("return", data);

                      case 12:
                        _context11.prev = 12;
                        _context11.t0 = _context11["catch"](0);
                        return _context11.abrupt("return", {
                          error: 2,
                          reason: _context11.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11, this, [[0, 12]]);
              }));
              return _addParStride.apply(this, arguments);
            };

            addParStride = function _ref22(_x10) {
              return _addParStride.apply(this, arguments);
            };

            _addParTremor = function _ref21() {
              _addParTremor = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee10(params) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.prev = 0;
                        API_PATH = '/partremor';
                        url = encodeURI(HAM_API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };
                        _context10.next = 7;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: params
                        });

                      case 7:
                        res = _context10.sent;
                        data = res.data;
                        return _context10.abrupt("return", data);

                      case 12:
                        _context10.prev = 12;
                        _context10.t0 = _context10["catch"](0);
                        return _context10.abrupt("return", {
                          error: 2,
                          reason: _context10.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10, this, [[0, 12]]);
              }));
              return _addParTremor.apply(this, arguments);
            };

            addParTremor = function _ref20(_x9) {
              return _addParTremor.apply(this, arguments);
            };

            _addParStand = function _ref19() {
              _addParStand = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee9(params) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.prev = 0;
                        API_PATH = '/parstand';
                        url = encodeURI(HAM_API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };
                        _context9.next = 7;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: params
                        });

                      case 7:
                        res = _context9.sent;
                        data = res.data;
                        return _context9.abrupt("return", data);

                      case 12:
                        _context9.prev = 12;
                        _context9.t0 = _context9["catch"](0);
                        return _context9.abrupt("return", {
                          error: 2,
                          reason: _context9.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9, this, [[0, 12]]);
              }));
              return _addParStand.apply(this, arguments);
            };

            addParStand = function _ref18(_x8) {
              return _addParStand.apply(this, arguments);
            };

            _getSimcom = function _ref17() {
              _getSimcom = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee8(com_name) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.prev = 0;
                        API_PATH = '/simcom/' + com_name;
                        url = encodeURI(HAM_API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(com_name) || typeof com_name !== 'string')) {
                          _context8.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: tel  is required as string');

                      case 7:
                        _context8.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context8.sent;
                        data = res.data;
                        return _context8.abrupt("return", data);

                      case 14:
                        _context8.prev = 14;
                        _context8.t0 = _context8["catch"](0);
                        return _context8.abrupt("return", {
                          error: 2,
                          reason: _context8.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8, this, [[0, 14]]);
              }));
              return _getSimcom.apply(this, arguments);
            };

            getSimcom = function _ref16(_x7) {
              return _getSimcom.apply(this, arguments);
            };

            _getTeloc = function _ref15() {
              _getTeloc = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee7(tel) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.prev = 0;
                        API_PATH = '/teloc/' + tel;
                        url = encodeURI(HAM_API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(tel) || typeof tel !== 'string')) {
                          _context7.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: tel  is required as string');

                      case 7:
                        _context7.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context7.sent;
                        data = res.data;
                        return _context7.abrupt("return", data);

                      case 14:
                        _context7.prev = 14;
                        _context7.t0 = _context7["catch"](0);
                        return _context7.abrupt("return", {
                          error: 2,
                          reason: _context7.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7, this, [[0, 14]]);
              }));
              return _getTeloc.apply(this, arguments);
            };

            getTeloc = function _ref14(_x6) {
              return _getTeloc.apply(this, arguments);
            };

            _getIploc = function _ref13() {
              _getIploc = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee6(ip) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.prev = 0;
                        API_PATH = '/iploc/' + ip;
                        url = encodeURI(HAM_API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };

                        if (!(_.isNil(ip) || typeof ip !== 'string')) {
                          _context6.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: obj_key  is required as string');

                      case 7:
                        _context6.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context6.sent;
                        data = res.data;
                        return _context6.abrupt("return", data);

                      case 14:
                        _context6.prev = 14;
                        _context6.t0 = _context6["catch"](0);
                        return _context6.abrupt("return", {
                          error: 2,
                          reason: _context6.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6, this, [[0, 14]]);
              }));
              return _getIploc.apply(this, arguments);
            };

            getIploc = function _ref12(_x5) {
              return _getIploc.apply(this, arguments);
            };

            _getComtags = function _ref11() {
              _getComtags = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee5(com_name) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.prev = 0;
                        API_PATH = '/comtags/' + com_name;
                        url = encodeURI(HAM_API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        console.log(localToken);
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: localToken //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(com_name) || typeof com_name !== 'string')) {
                          _context5.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: obj_key  is required as string');

                      case 8:
                        _context5.next = 10;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 10:
                        res = _context5.sent;
                        //console.log(res);
                        data = res.data;
                        return _context5.abrupt("return", data);

                      case 15:
                        _context5.prev = 15;
                        _context5.t0 = _context5["catch"](0);
                        return _context5.abrupt("return", {
                          error: 2,
                          reason: _context5.t0,
                          result: {},
                          debug: {}
                        });

                      case 18:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, this, [[0, 15]]);
              }));
              return _getComtags.apply(this, arguments);
            };

            getComtags = function _ref10(_x4) {
              return _getComtags.apply(this, arguments);
            };

            _addIdcardValidation = function _ref9() {
              _addIdcardValidation = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee4(params) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.prev = 0;
                        API_PATH = '/idcardvalidation';
                        url = encodeURI(HAM_API_END_POINT + API_PATH); //因为我们支持中文字符作为key，那么在修改和删除的时候,url上都与有中文,如果不用encodeURI,就会在aliyun.client这个SDK报 Reqeust Path contains unescaped characters 的错误 

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //字符串,数字,对象都会成功字符串化.

                        };
                        _context4.next = 7;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: params
                        });

                      case 7:
                        res = _context4.sent;
                        data = res.data;
                        return _context4.abrupt("return", data);

                      case 12:
                        _context4.prev = 12;
                        _context4.t0 = _context4["catch"](0);
                        return _context4.abrupt("return", {
                          error: 2,
                          reason: _context4.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, this, [[0, 12]]);
              }));
              return _addIdcardValidation.apply(this, arguments);
            };

            addIdcardValidation = function _ref8(_x3) {
              return _addIdcardValidation.apply(this, arguments);
            };

            _getToken = function _ref7() {
              _getToken = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3(token) {
                var url, sign, headers, res, data;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        //解析token这个接口本身也需要一个自己的匿名令牌
                        //gettoken的函数不需要token

                        /*
                        let localToken = getLocalToken()
                        if (_.isNil(localToken) || localToken == '' || true) {
                            console.log('fail to find local token turn to backend for anonymous token')
                            const res = await addToken()
                            console.log(res);
                            if (res.error !== 0) {
                                throw new Error('fail to get Token')
                            }
                            const { token } = res.result
                            setLocalToken(token)
                            localToken = token
                        }
                        */
                        url = API_END_POINT + '/token/' + token;
                        sign = generateSign({
                          method: 'GET',
                          path: '/token/' + token,
                          appSecret: getAppSecret(),
                          appKey: getAppKey()
                        });
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: sign
                        };
                        _context3.next = 6;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 6:
                        res = _context3.sent;
                        data = res.data;

                        if (!(data.error === 0)) {
                          _context3.next = 12;
                          break;
                        }

                        return _context3.abrupt("return", data);

                      case 12:
                        throw new Error('fail to get Token profile');

                      case 14:
                        _context3.next = 20;
                        break;

                      case 16:
                        _context3.prev = 16;
                        _context3.t0 = _context3["catch"](0);
                        console.log(_context3.t0);
                        return _context3.abrupt("return", {
                          error: 2,
                          reason: String(_context3.t0),
                          result: {},
                          debug: {}
                        });

                      case 20:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this, [[0, 16]]);
              }));
              return _getToken.apply(this, arguments);
            };

            getToken = function _ref6(_x2) {
              return _getToken.apply(this, arguments);
            };

            _addToken = function _ref5() {
              _addToken = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2() {
                var parser, ua_info, params, sign, headers, res, data, token, ret;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        parser = new UAParser();
                        ua_info = parser.getResult();
                        params = {
                          dsn: md5(ua_info.ua),
                          type: 'browser',
                          model: ua_info.device.model == undefined ? 'undefined' : ua_info.device.model,
                          man: ua_info.device.vendor == undefined ? 'undefined' : ua_info.device.vendor,
                          os: ua_info.os.name + ' ' + ua_info.os.version,
                          channel: 'RELEASE'
                        };
                        sign = generateSign({
                          method: 'POST',
                          path: '/auth',
                          appSecret: getAppSecret(),
                          appKey: getAppKey()
                        });
                        headers = {
                          'Content-Type': APPLICATION_X_WWW_FORM_URLENCODED,
                          'Authorization': sign
                        };
                        _context2.next = 8;
                        return aliYunClient.post({
                          url: API_END_POINT + '/auth',
                          headers: headers,
                          params: params
                        });

                      case 8:
                        res = _context2.sent;
                        data = res.data;

                        if (data.error === 0) {
                          token = data.result.token;
                          setLocalToken(token);
                        } else {
                          console.log("addToken:失败");
                          console.log(data);
                        }

                        return _context2.abrupt("return", data);

                      case 14:
                        _context2.prev = 14;
                        _context2.t0 = _context2["catch"](0);
                        console.log(_context2.t0);
                        ret = {
                          error: 2,
                          reason: _context2.t0,
                          result: {},
                          debug: {}
                        };
                        return _context2.abrupt("return", ret);

                      case 19:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this, [[0, 14]]);
              }));
              return _addToken.apply(this, arguments);
            };

            addToken = function _ref4() {
              return _addToken.apply(this, arguments);
            };

            _initialize = function _ref3() {
              _initialize = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                var localToken, res, data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        localToken = getLocalToken();

                        if (!_.isNil(localToken)) {
                          _context.next = 7;
                          break;
                        }

                        _context.next = 5;
                        return addToken();

                      case 5:
                        _context.next = 14;
                        break;

                      case 7:
                        _context.next = 9;
                        return getToken(localToken);

                      case 9:
                        res = _context.sent;
                        data = res.result.data;

                        if (!(data.vtl < 0)) {
                          _context.next = 14;
                          break;
                        }

                        _context.next = 14;
                        return addToken();

                      case 14:
                        _context.next = 19;
                        break;

                      case 16:
                        _context.prev = 16;
                        _context.t0 = _context["catch"](0);
                        console.log(_context.t0);

                      case 19:
                        return _context.abrupt("return", null);

                      case 20:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this, [[0, 16]]);
              }));
              return _initialize.apply(this, arguments);
            };

            initialize = function _ref2() {
              return _initialize.apply(this, arguments);
            };

            APP_SECRET = _ref.APP_SECRET, APP_KEY = _ref.APP_KEY;
            setAppKey(APP_KEY);
            setAppSecret(APP_SECRET);
            /**
             * 如果本地已经有一个token了,那么要判断这个匿名token是否过期了，
             * 地球号机制给所有的匿名token统一的24小时有效期。
             * 用户创建应用的时候也可以制定自己这个应用的有效期是多久。
             * 如果有效期已经过了，就需要重新申请匿名令牌。
             * 如果令牌的本地存储被人删除了,就需要也需要重新申请匿名令牌。 
             **/

            _context13.next = 29;
            return initialize();

          case 29:
            return _context13.abrupt("return", {
              initialize: initialize,
              addToken: addToken,
              getToken: getToken,
              addIdcardValidation: addIdcardValidation,
              getComtags: getComtags,
              getIploc: getIploc,
              getTeloc: getTeloc,
              getSimcom: getSimcom,
              addParStride: addParStride,
              addParStand: addParStand,
              addParTremor: addParTremor,
              addParTapping: addParTapping
            });

          case 30:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));
  return _hannm.apply(this, arguments);
}

module.exports = hannm;