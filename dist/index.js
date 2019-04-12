'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function lovearth(_x) {
  return _lovearth.apply(this, arguments);
}

function _lovearth() {
  _lovearth = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee50(_ref) {
    var APP_SECRET, APP_KEY, initialize, _initialize, addToken, _addToken, getToken, _getToken, isLogin, _isLogin, logout, _logout, login, _login, addVfcodeByTel, _addVfcodeByTel, addVfcodeByMail, _addVfcodeByMail, rstPass, _rstPass, chgPass, _chgPass, addUser, _addUser, delUser, _delUser, putUser, _putUser, getUser, _getUser, qryUser, _qryUser, addUgrp, _addUgrp, delUgrp, _delUgrp, putUgrp, _putUgrp, getUgrp, _getUgrp, qryUgrp, _qryUgrp, addZone, _addZone, delZone, _delZone, putZone, _putZone, getZone, _getZone, qryZone, _qryZone, addRole, _addRole, delRole, _delRole, putRole, _putRole, getRole, _getRole, qryRole, _qryRole, addUsro, _addUsro, delUsro, _delUsro, putUsro, _putUsro, getUsro, _getUsro, qryUsro, _qryUsro, delApp, _delApp, putApp, _putApp, getApp, _getApp, qryApp, _qryApp, addApp, _addApp, _delApp2, _putApp2, _getApp2, _qryApp2, addObj, _addObj, delObj, _delObj, putObj, _putObj, getObj, _getObj, qryObj, _qryObj;

    return regeneratorRuntime.wrap(function _callee50$(_context50) {
      while (1) {
        switch (_context50.prev = _context50.next) {
          case 0:
            _qryObj = function _ref109() {
              _qryObj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee49(param) {
                var api_path, key, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee49$(_context49) {
                  while (1) {
                    switch (_context49.prev = _context49.next) {
                      case 0:
                        _context49.prev = 0;
                        api_path = '/obj';

                        if (JSON.stringify(param) !== '{}') {
                          api_path = '/obj?';
                        }

                        param["filter"] = JSON.stringify(param["filter"]);

                        for (key in param) {
                          api_path = api_path + '&' + key + '=' + param[key]; //console.log("key: " + key + " ,value: " + param[key]);
                        }

                        API_PATH = api_path;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context49.next = 11;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 11:
                        res = _context49.sent;
                        //console.log(res);
                        data = res.data;
                        return _context49.abrupt("return", data);

                      case 16:
                        _context49.prev = 16;
                        _context49.t0 = _context49["catch"](0);
                        return _context49.abrupt("return", {
                          error: 2,
                          reason: _context49.t0,
                          result: {},
                          debug: {}
                        });

                      case 19:
                      case "end":
                        return _context49.stop();
                    }
                  }
                }, _callee49, this, [[0, 16]]);
              }));
              return _qryObj.apply(this, arguments);
            };

            qryObj = function _ref108(_x55) {
              return _qryObj.apply(this, arguments);
            };

            _getObj = function _ref107() {
              _getObj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee48(obj_key) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee48$(_context48) {
                  while (1) {
                    switch (_context48.prev = _context48.next) {
                      case 0:
                        API_PATH = '/obj/' + obj_key;
                        url = encodeURI(API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(obj_key) || typeof obj_key !== 'string')) {
                          _context48.next = 6;
                          break;
                        }

                        throw new ArgumentError('String Type Field: obj_key  is required as string');

                      case 6:
                        _context48.next = 8;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 8:
                        res = _context48.sent;
                        //console.log(res);
                        data = res.data;
                        return _context48.abrupt("return", data);

                      case 11:
                      case "end":
                        return _context48.stop();
                    }
                  }
                }, _callee48, this);
              }));
              return _getObj.apply(this, arguments);
            };

            getObj = function _ref106(_x54) {
              return _getObj.apply(this, arguments);
            };

            _putObj = function _ref105() {
              _putObj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee47(obj_key, obj_value) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee47$(_context47) {
                  while (1) {
                    switch (_context47.prev = _context47.next) {
                      case 0:
                        _context47.prev = 0;
                        API_PATH = '/obj/' + obj_key;
                        url = encodeURI(API_END_POINT + API_PATH); //因为我们支持中文字符作为key，那么在修改和删除的时候,url上都与有中文,如果不用encodeURI,就会在aliyun.client这个SDK报 Reqeust Path contains unescaped characters 的错误 

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };
                        console.log(url); //字符串,数字,对象都会成功字符串化.

                        obj_value = JSON.stringify(obj_value);
                        _context47.next = 9;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            value: obj_value
                          }
                        });

                      case 9:
                        res = _context47.sent;
                        data = res.data;
                        return _context47.abrupt("return", data);

                      case 14:
                        _context47.prev = 14;
                        _context47.t0 = _context47["catch"](0);
                        return _context47.abrupt("return", {
                          error: 2,
                          reason: _context47.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context47.stop();
                    }
                  }
                }, _callee47, this, [[0, 14]]);
              }));
              return _putObj.apply(this, arguments);
            };

            putObj = function _ref104(_x52, _x53) {
              return _putObj.apply(this, arguments);
            };

            _delObj = function _ref103() {
              _delObj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee46(obj_key) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee46$(_context46) {
                  while (1) {
                    switch (_context46.prev = _context46.next) {
                      case 0:
                        _context46.prev = 0;
                        API_PATH = '/obj/' + obj_key;
                        url = encodeURI(API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(obj_key) || typeof obj_key !== 'string')) {
                          _context46.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: obj_key is required as string');

                      case 7:
                        _context46.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context46.sent;
                        data = res.data;
                        return _context46.abrupt("return", data);

                      case 14:
                        _context46.prev = 14;
                        _context46.t0 = _context46["catch"](0);
                        return _context46.abrupt("return", {
                          error: 2,
                          reason: _context46.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context46.stop();
                    }
                  }
                }, _callee46, this, [[0, 14]]);
              }));
              return _delObj.apply(this, arguments);
            };

            delObj = function _ref102(_x51) {
              return _delObj.apply(this, arguments);
            };

            _addObj = function _ref101() {
              _addObj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee45(_ref11) {
                var key, value, key2, key3, key4, readonly, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee45$(_context45) {
                  while (1) {
                    switch (_context45.prev = _context45.next) {
                      case 0:
                        key = _ref11.key, value = _ref11.value, key2 = _ref11.key2, key3 = _ref11.key3, key4 = _ref11.key4, readonly = _ref11.readonly;
                        _context45.prev = 1;
                        API_PATH = '/obj';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(key) || typeof key !== 'string')) {
                          _context45.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: key is required as string');

                      case 8:
                        //字符串,数字,对象都会成功字符串化.
                        value = JSON.stringify(value);
                        add_params = {
                          key: key,
                          value: value
                        };

                        if (!_.isNil(key2)) {
                          add_params.key2 = key2;
                        }

                        if (!_.isNil(key3)) {
                          add_params.key3 = key3;
                        }

                        if (!_.isNil(key4)) {
                          add_params.key4 = key4;
                        }

                        if (!_.isNil(readonly)) {
                          add_params.readonly = readonly;
                        }

                        _context45.next = 16;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: add_params
                        });

                      case 16:
                        res = _context45.sent;
                        data = res.data;
                        return _context45.abrupt("return", data);

                      case 21:
                        _context45.prev = 21;
                        _context45.t0 = _context45["catch"](1);
                        return _context45.abrupt("return", {
                          error: 1,
                          reason: _context45.t0,
                          debug: _context45.t0
                        });

                      case 24:
                      case "end":
                        return _context45.stop();
                    }
                  }
                }, _callee45, this, [[1, 21]]);
              }));
              return _addObj.apply(this, arguments);
            };

            addObj = function _ref100(_x50) {
              return _addObj.apply(this, arguments);
            };

            _qryApp2 = function _ref99() {
              _qryApp2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee44(param) {
                var api_path, key, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee44$(_context44) {
                  while (1) {
                    switch (_context44.prev = _context44.next) {
                      case 0:
                        _context44.prev = 0;
                        api_path = '/app';

                        if (JSON.stringify(param) !== '{}') {
                          api_path = '/app?';
                        }

                        for (key in param) {
                          api_path = api_path + '&' + key + '=' + param[key]; //console.log("key: " + key + " ,value: " + param[key]);
                        }

                        API_PATH = api_path;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context44.next = 10;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 10:
                        res = _context44.sent;
                        //console.log(res);
                        data = res.data;
                        return _context44.abrupt("return", data);

                      case 15:
                        _context44.prev = 15;
                        _context44.t0 = _context44["catch"](0);
                        return _context44.abrupt("return", {
                          error: 2,
                          reason: _context44.t0,
                          result: {},
                          debug: {}
                        });

                      case 18:
                      case "end":
                        return _context44.stop();
                    }
                  }
                }, _callee44, this, [[0, 15]]);
              }));
              return _qryApp2.apply(this, arguments);
            };

            qryApp = function _ref98(_x49) {
              return _qryApp2.apply(this, arguments);
            };

            _getApp2 = function _ref97() {
              _getApp2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee43(app_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee43$(_context43) {
                  while (1) {
                    switch (_context43.prev = _context43.next) {
                      case 0:
                        API_PATH = '/app/' + app_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(app_id) || typeof app_id !== 'string')) {
                          _context43.next = 6;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 6:
                        _context43.next = 8;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 8:
                        res = _context43.sent;
                        //console.log(res);
                        data = res.data;
                        return _context43.abrupt("return", data);

                      case 11:
                      case "end":
                        return _context43.stop();
                    }
                  }
                }, _callee43, this);
              }));
              return _getApp2.apply(this, arguments);
            };

            getApp = function _ref96(_x48) {
              return _getApp2.apply(this, arguments);
            };

            _putApp2 = function _ref95() {
              _putApp2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee42(app_id, put_param) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee42$(_context42) {
                  while (1) {
                    switch (_context42.prev = _context42.next) {
                      case 0:
                        _context42.prev = 0;
                        API_PATH = '/app/' + app_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };
                        _context42.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context42.sent;
                        data = res.data;
                        return _context42.abrupt("return", data);

                      case 12:
                        _context42.prev = 12;
                        _context42.t0 = _context42["catch"](0);
                        return _context42.abrupt("return", {
                          error: 2,
                          reason: _context42.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context42.stop();
                    }
                  }
                }, _callee42, this, [[0, 12]]);
              }));
              return _putApp2.apply(this, arguments);
            };

            putApp = function _ref94(_x46, _x47) {
              return _putApp2.apply(this, arguments);
            };

            _delApp2 = function _ref93() {
              _delApp2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee41(app_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee41$(_context41) {
                  while (1) {
                    switch (_context41.prev = _context41.next) {
                      case 0:
                        _context41.prev = 0;
                        API_PATH = '/app/' + app_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(app_id) || typeof app_id !== 'string')) {
                          _context41.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: app_id is required as string');

                      case 7:
                        _context41.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context41.sent;
                        data = res.data;
                        return _context41.abrupt("return", data);

                      case 14:
                        _context41.prev = 14;
                        _context41.t0 = _context41["catch"](0);
                        return _context41.abrupt("return", {
                          error: 2,
                          reason: _context41.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context41.stop();
                    }
                  }
                }, _callee41, this, [[0, 14]]);
              }));
              return _delApp2.apply(this, arguments);
            };

            delApp = function _ref92(_x45) {
              return _delApp2.apply(this, arguments);
            };

            _addApp = function _ref91() {
              _addApp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee40(_ref10) {
                var pkg, name, ugrp_id, brief, avatar, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee40$(_context40) {
                  while (1) {
                    switch (_context40.prev = _context40.next) {
                      case 0:
                        pkg = _ref10.pkg, name = _ref10.name, ugrp_id = _ref10.ugrp_id, brief = _ref10.brief, avatar = _ref10.avatar;
                        _context40.prev = 1;
                        API_PATH = '/app';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(pkg) || typeof pkg !== 'string')) {
                          _context40.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: pkg is required as string');

                      case 8:
                        if (!(_.isNil(name) || typeof name !== 'string')) {
                          _context40.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: name is required as string not ' + _typeof(name));

                      case 10:
                        if (!(_.isNil(ugrp_id) || typeof ugrp_id !== 'string')) {
                          _context40.next = 12;
                          break;
                        }

                        throw new ArgumentError('String Type Field: ugrp_id is required as string not ' + (typeof ugrp === "undefined" ? "undefined" : _typeof(ugrp)));

                      case 12:
                        if (!(_.isNil(brief) || typeof brief !== 'string')) {
                          _context40.next = 14;
                          break;
                        }

                        throw new ArgumentError('String Type Field: brief is required as string');

                      case 14:
                        _context40.next = 16;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            pkg: pkg,
                            name: name,
                            ugrp_id: ugrp_id,
                            brief: brief,
                            avatar: avatar
                          }
                        });

                      case 16:
                        res = _context40.sent;
                        data = res.data;
                        return _context40.abrupt("return", data);

                      case 21:
                        _context40.prev = 21;
                        _context40.t0 = _context40["catch"](1);
                        return _context40.abrupt("return", {
                          error: 2,
                          reason: _context40.t0,
                          result: {},
                          debug: {}
                        });

                      case 24:
                      case "end":
                        return _context40.stop();
                    }
                  }
                }, _callee40, this, [[1, 21]]);
              }));
              return _addApp.apply(this, arguments);
            };

            addApp = function _ref90(_x44) {
              return _addApp.apply(this, arguments);
            };

            _qryApp = function _ref89() {
              _qryApp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee39(param) {
                var api_path, key, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee39$(_context39) {
                  while (1) {
                    switch (_context39.prev = _context39.next) {
                      case 0:
                        _context39.prev = 0;
                        api_path = '/app';

                        if (JSON.stringify(param) !== '{}') {
                          api_path = '/app?';
                        }

                        for (key in param) {
                          api_path = api_path + '&' + key + '=' + param[key];
                        }

                        API_PATH = api_path;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context39.next = 10;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 10:
                        res = _context39.sent;
                        //console.log(res);
                        data = res.data;
                        return _context39.abrupt("return", data);

                      case 15:
                        _context39.prev = 15;
                        _context39.t0 = _context39["catch"](0);
                        return _context39.abrupt("return", {
                          error: 2,
                          reason: _context39.t0,
                          result: {},
                          debug: {}
                        });

                      case 18:
                      case "end":
                        return _context39.stop();
                    }
                  }
                }, _callee39, this, [[0, 15]]);
              }));
              return _qryApp.apply(this, arguments);
            };

            qryApp = function _ref88(_x43) {
              return _qryApp.apply(this, arguments);
            };

            _getApp = function _ref87() {
              _getApp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee38(app_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee38$(_context38) {
                  while (1) {
                    switch (_context38.prev = _context38.next) {
                      case 0:
                        _context38.prev = 0;
                        API_PATH = '/app/' + app_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(app_id) || typeof app_id !== 'string')) {
                          _context38.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 7:
                        _context38.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context38.sent;
                        //console.log(res);
                        data = res.data;
                        return _context38.abrupt("return", data);

                      case 14:
                        _context38.prev = 14;
                        _context38.t0 = _context38["catch"](0);
                        return _context38.abrupt("return", {
                          error: 2,
                          reason: _context38.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context38.stop();
                    }
                  }
                }, _callee38, this, [[0, 14]]);
              }));
              return _getApp.apply(this, arguments);
            };

            getApp = function _ref86(_x42) {
              return _getApp.apply(this, arguments);
            };

            _putApp = function _ref85() {
              _putApp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee37(app_id, put_param) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee37$(_context37) {
                  while (1) {
                    switch (_context37.prev = _context37.next) {
                      case 0:
                        _context37.prev = 0;
                        API_PATH = '/app/' + app_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };
                        _context37.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context37.sent;
                        data = res.data;
                        return _context37.abrupt("return", data);

                      case 12:
                        _context37.prev = 12;
                        _context37.t0 = _context37["catch"](0);
                        return _context37.abrupt("return", {
                          error: 2,
                          reason: _context37.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context37.stop();
                    }
                  }
                }, _callee37, this, [[0, 12]]);
              }));
              return _putApp.apply(this, arguments);
            };

            putApp = function _ref84(_x40, _x41) {
              return _putApp.apply(this, arguments);
            };

            _delApp = function _ref83() {
              _delApp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee36(app_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee36$(_context36) {
                  while (1) {
                    switch (_context36.prev = _context36.next) {
                      case 0:
                        _context36.prev = 0;
                        API_PATH = '/app/' + app_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(app_id) || typeof app_id !== 'string')) {
                          _context36.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: app_id is required as string');

                      case 7:
                        _context36.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context36.sent;
                        data = res.data;
                        return _context36.abrupt("return", data);

                      case 14:
                        _context36.prev = 14;
                        _context36.t0 = _context36["catch"](0);
                        return _context36.abrupt("return", {
                          error: 2,
                          reason: _context36.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context36.stop();
                    }
                  }
                }, _callee36, this, [[0, 14]]);
              }));
              return _delApp.apply(this, arguments);
            };

            delApp = function _ref82(_x39) {
              return _delApp.apply(this, arguments);
            };

            _qryUsro = function _ref81() {
              _qryUsro = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee35(param) {
                var api_path, key, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee35$(_context35) {
                  while (1) {
                    switch (_context35.prev = _context35.next) {
                      case 0:
                        _context35.prev = 0;
                        api_path = '/usro';

                        if (JSON.stringify(param) !== '{}') {
                          api_path = '/usro?';
                        }

                        for (key in param) {
                          api_path = api_path + '&' + key + '=' + param[key];
                        }

                        API_PATH = api_path;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context35.next = 10;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 10:
                        res = _context35.sent;
                        //console.log(res);
                        data = res.data;
                        return _context35.abrupt("return", data);

                      case 15:
                        _context35.prev = 15;
                        _context35.t0 = _context35["catch"](0);
                        return _context35.abrupt("return", {
                          error: 2,
                          reason: _context35.t0,
                          result: {},
                          debug: {}
                        });

                      case 18:
                      case "end":
                        return _context35.stop();
                    }
                  }
                }, _callee35, this, [[0, 15]]);
              }));
              return _qryUsro.apply(this, arguments);
            };

            qryUsro = function _ref80(_x38) {
              return _qryUsro.apply(this, arguments);
            };

            _getUsro = function _ref79() {
              _getUsro = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee34(usro_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee34$(_context34) {
                  while (1) {
                    switch (_context34.prev = _context34.next) {
                      case 0:
                        _context34.prev = 0;
                        API_PATH = '/usro/' + usro_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(usro_id) || typeof usro_id !== 'string')) {
                          _context34.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 7:
                        _context34.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context34.sent;
                        //console.log(res);
                        data = res.data;
                        return _context34.abrupt("return", data);

                      case 14:
                        _context34.prev = 14;
                        _context34.t0 = _context34["catch"](0);
                        return _context34.abrupt("return", {
                          error: 2,
                          reason: _context34.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context34.stop();
                    }
                  }
                }, _callee34, this, [[0, 14]]);
              }));
              return _getUsro.apply(this, arguments);
            };

            getUsro = function _ref78(_x37) {
              return _getUsro.apply(this, arguments);
            };

            _putUsro = function _ref77() {
              _putUsro = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee33(usro_id, put_param) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee33$(_context33) {
                  while (1) {
                    switch (_context33.prev = _context33.next) {
                      case 0:
                        _context33.prev = 0;
                        API_PATH = '/usro/' + usro_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };
                        _context33.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context33.sent;
                        //console.log(res);
                        data = res.data;
                        return _context33.abrupt("return", data);

                      case 12:
                        _context33.prev = 12;
                        _context33.t0 = _context33["catch"](0);
                        return _context33.abrupt("return", {
                          error: 2,
                          reason: _context33.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context33.stop();
                    }
                  }
                }, _callee33, this, [[0, 12]]);
              }));
              return _putUsro.apply(this, arguments);
            };

            putUsro = function _ref76(_x35, _x36) {
              return _putUsro.apply(this, arguments);
            };

            _delUsro = function _ref75() {
              _delUsro = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee32(usro_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee32$(_context32) {
                  while (1) {
                    switch (_context32.prev = _context32.next) {
                      case 0:
                        _context32.prev = 0;
                        API_PATH = '/usro/' + usro_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(usro_id) || typeof usro_id !== 'string')) {
                          _context32.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: usro_id is required as string');

                      case 7:
                        _context32.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context32.sent;
                        data = res.data;
                        return _context32.abrupt("return", data);

                      case 14:
                        _context32.prev = 14;
                        _context32.t0 = _context32["catch"](0);
                        return _context32.abrupt("return", {
                          error: 2,
                          reason: _context32.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context32.stop();
                    }
                  }
                }, _callee32, this, [[0, 14]]);
              }));
              return _delUsro.apply(this, arguments);
            };

            delUsro = function _ref74(_x34) {
              return _delUsro.apply(this, arguments);
            };

            _addUsro = function _ref73() {
              _addUsro = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee31(_ref9) {
                var role_id, ugrp_id, towho, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee31$(_context31) {
                  while (1) {
                    switch (_context31.prev = _context31.next) {
                      case 0:
                        role_id = _ref9.role_id, ugrp_id = _ref9.ugrp_id, towho = _ref9.towho;
                        _context31.prev = 1;
                        API_PATH = '/usro';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(role_id) || typeof role_id !== 'string')) {
                          _context31.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: role is required as string');

                      case 8:
                        if (!(_.isNil(towho) || typeof towho !== 'string')) {
                          _context31.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: towho is required as string not ' + (typeof name === "undefined" ? "undefined" : _typeof(name)));

                      case 10:
                        if (!(_.isNil(ugrp_id) || typeof ugrp_id !== 'string')) {
                          _context31.next = 12;
                          break;
                        }

                        throw new ArgumentError('String Type Field: ugrp is required as string');

                      case 12:
                        _context31.next = 14;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            role_id: role_id,
                            ugrp_id: ugrp_id,
                            towho: towho
                          }
                        });

                      case 14:
                        res = _context31.sent;
                        data = res.data;
                        return _context31.abrupt("return", data);

                      case 19:
                        _context31.prev = 19;
                        _context31.t0 = _context31["catch"](1);
                        return _context31.abrupt("return", {
                          error: 2,
                          reason: _context31.t0,
                          result: {},
                          debug: {}
                        });

                      case 22:
                      case "end":
                        return _context31.stop();
                    }
                  }
                }, _callee31, this, [[1, 19]]);
              }));
              return _addUsro.apply(this, arguments);
            };

            addUsro = function _ref72(_x33) {
              return _addUsro.apply(this, arguments);
            };

            _qryRole = function _ref71() {
              _qryRole = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee30(param) {
                var api_path, key, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee30$(_context30) {
                  while (1) {
                    switch (_context30.prev = _context30.next) {
                      case 0:
                        _context30.prev = 0;
                        api_path = '/role';

                        if (JSON.stringify(param) !== '{}') {
                          api_path = '/role?';
                        }

                        for (key in param) {
                          api_path = api_path + '&' + key + '=' + param[key]; //console.log("key: " + key + " ,value: " + param[key]);
                        }

                        API_PATH = api_path;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context30.next = 10;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 10:
                        res = _context30.sent;
                        //console.log(res);
                        data = res.data;
                        return _context30.abrupt("return", data);

                      case 15:
                        _context30.prev = 15;
                        _context30.t0 = _context30["catch"](0);
                        return _context30.abrupt("return", {
                          error: 2,
                          reason: _context30.t0,
                          result: {},
                          debug: {}
                        });

                      case 18:
                      case "end":
                        return _context30.stop();
                    }
                  }
                }, _callee30, this, [[0, 15]]);
              }));
              return _qryRole.apply(this, arguments);
            };

            qryRole = function _ref70(_x32) {
              return _qryRole.apply(this, arguments);
            };

            _getRole = function _ref69() {
              _getRole = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee29(role_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee29$(_context29) {
                  while (1) {
                    switch (_context29.prev = _context29.next) {
                      case 0:
                        _context29.prev = 0;
                        API_PATH = '/role/' + role_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(role_id) || typeof role_id !== 'string')) {
                          _context29.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 7:
                        _context29.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context29.sent;
                        //console.log(res);
                        data = res.data;
                        return _context29.abrupt("return", data);

                      case 14:
                        _context29.prev = 14;
                        _context29.t0 = _context29["catch"](0);
                        return _context29.abrupt("return", {
                          error: 2,
                          reason: _context29.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context29.stop();
                    }
                  }
                }, _callee29, this, [[0, 14]]);
              }));
              return _getRole.apply(this, arguments);
            };

            getRole = function _ref68(_x31) {
              return _getRole.apply(this, arguments);
            };

            _putRole = function _ref67() {
              _putRole = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee28(role_id, put_param) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee28$(_context28) {
                  while (1) {
                    switch (_context28.prev = _context28.next) {
                      case 0:
                        _context28.prev = 0;
                        API_PATH = '/role/' + role_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };
                        _context28.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context28.sent;
                        data = res.data;
                        return _context28.abrupt("return", data);

                      case 12:
                        _context28.prev = 12;
                        _context28.t0 = _context28["catch"](0);
                        return _context28.abrupt("return", {
                          error: 2,
                          reason: _context28.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context28.stop();
                    }
                  }
                }, _callee28, this, [[0, 12]]);
              }));
              return _putRole.apply(this, arguments);
            };

            putRole = function _ref66(_x29, _x30) {
              return _putRole.apply(this, arguments);
            };

            _delRole = function _ref65() {
              _delRole = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee27(role_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee27$(_context27) {
                  while (1) {
                    switch (_context27.prev = _context27.next) {
                      case 0:
                        _context27.prev = 0;
                        API_PATH = '/role/' + role_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(role_id) || typeof role_id !== 'string')) {
                          _context27.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: role_id is required as string');

                      case 7:
                        _context27.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context27.sent;
                        data = res.data;
                        return _context27.abrupt("return", data);

                      case 14:
                        _context27.prev = 14;
                        _context27.t0 = _context27["catch"](0);
                        console.log(_context27.t0);
                        return _context27.abrupt("return", {
                          error: 2,
                          reason: _context27.t0,
                          result: {},
                          debug: {}
                        });

                      case 18:
                      case "end":
                        return _context27.stop();
                    }
                  }
                }, _callee27, this, [[0, 14]]);
              }));
              return _delRole.apply(this, arguments);
            };

            delRole = function _ref64(_x28) {
              return _delRole.apply(this, arguments);
            };

            _addRole = function _ref63() {
              _addRole = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee26(_ref8) {
                var code, name, ugrp_id, granter, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee26$(_context26) {
                  while (1) {
                    switch (_context26.prev = _context26.next) {
                      case 0:
                        code = _ref8.code, name = _ref8.name, ugrp_id = _ref8.ugrp_id, granter = _ref8.granter;
                        _context26.prev = 1;
                        API_PATH = '/role';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(code) || typeof code !== 'string')) {
                          _context26.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: code is required as string');

                      case 8:
                        if (!(_.isNil(name) || typeof name !== 'string')) {
                          _context26.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: name is required as string not ' + _typeof(name));

                      case 10:
                        if (!(_.isNil(ugrp_id) || typeof ugrp_id !== 'string')) {
                          _context26.next = 12;
                          break;
                        }

                        throw new ArgumentError('String Type Field: ugrp_id is required as string');

                      case 12:
                        _context26.next = 14;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            code: code,
                            name: name,
                            ugrp_id: ugrp_id,
                            granter: granter
                          }
                        });

                      case 14:
                        res = _context26.sent;
                        data = res.data;
                        return _context26.abrupt("return", data);

                      case 19:
                        _context26.prev = 19;
                        _context26.t0 = _context26["catch"](1);
                        console.log(_context26.t0);
                        return _context26.abrupt("return", {
                          error: 2,
                          reason: _context26.t0,
                          result: {},
                          debug: {}
                        });

                      case 23:
                      case "end":
                        return _context26.stop();
                    }
                  }
                }, _callee26, this, [[1, 19]]);
              }));
              return _addRole.apply(this, arguments);
            };

            addRole = function _ref62(_x27) {
              return _addRole.apply(this, arguments);
            };

            _qryZone = function _ref61() {
              _qryZone = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee25(param) {
                var api_path, key, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee25$(_context25) {
                  while (1) {
                    switch (_context25.prev = _context25.next) {
                      case 0:
                        _context25.prev = 0;
                        api_path = '/zone';

                        if (JSON.stringify(param) !== '{}') {
                          api_path = '/zone?';
                        }

                        for (key in param) {
                          api_path = api_path + '&' + key + '=' + param[key];
                        }

                        API_PATH = api_path;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context25.next = 10;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 10:
                        res = _context25.sent;
                        data = res.data;
                        return _context25.abrupt("return", data);

                      case 15:
                        _context25.prev = 15;
                        _context25.t0 = _context25["catch"](0);
                        console.log(_context25.t0);
                        return _context25.abrupt("return", {
                          error: 2,
                          reason: _context25.t0,
                          result: {}
                        });

                      case 19:
                      case "end":
                        return _context25.stop();
                    }
                  }
                }, _callee25, this, [[0, 15]]);
              }));
              return _qryZone.apply(this, arguments);
            };

            qryZone = function _ref60(_x26) {
              return _qryZone.apply(this, arguments);
            };

            _getZone = function _ref59() {
              _getZone = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee24(zone_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee24$(_context24) {
                  while (1) {
                    switch (_context24.prev = _context24.next) {
                      case 0:
                        _context24.prev = 0;
                        API_PATH = '/zone/' + zone_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: localToken //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(zone_id) || typeof zone_id !== 'string')) {
                          _context24.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 7:
                        _context24.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context24.sent;
                        data = res.data;
                        return _context24.abrupt("return", data);

                      case 14:
                        _context24.prev = 14;
                        _context24.t0 = _context24["catch"](0);
                        console.log(_context24.t0);
                        return _context24.abrupt("return", {
                          error: 2,
                          reason: _context24.t0,
                          result: {}
                        });

                      case 18:
                      case "end":
                        return _context24.stop();
                    }
                  }
                }, _callee24, this, [[0, 14]]);
              }));
              return _getZone.apply(this, arguments);
            };

            getZone = function _ref58(_x25) {
              return _getZone.apply(this, arguments);
            };

            _putZone = function _ref57() {
              _putZone = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee23(zone_id, put_param) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee23$(_context23) {
                  while (1) {
                    switch (_context23.prev = _context23.next) {
                      case 0:
                        _context23.prev = 0;
                        API_PATH = '/zone/' + zone_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };
                        _context23.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context23.sent;
                        data = res.data;
                        return _context23.abrupt("return", data);

                      case 12:
                        _context23.prev = 12;
                        _context23.t0 = _context23["catch"](0);
                        return _context23.abrupt("return", {
                          error: 2,
                          reason: _context23.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context23.stop();
                    }
                  }
                }, _callee23, this, [[0, 12]]);
              }));
              return _putZone.apply(this, arguments);
            };

            putZone = function _ref56(_x23, _x24) {
              return _putZone.apply(this, arguments);
            };

            _delZone = function _ref55() {
              _delZone = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee22(zone_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee22$(_context22) {
                  while (1) {
                    switch (_context22.prev = _context22.next) {
                      case 0:
                        _context22.prev = 0;
                        API_PATH = '/zone/' + zone_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };

                        if (!(_.isNil(zone_id) || typeof zone_id !== 'string')) {
                          _context22.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: zone_id is required as string');

                      case 7:
                        _context22.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context22.sent;
                        data = res.data;
                        return _context22.abrupt("return", data);

                      case 14:
                        _context22.prev = 14;
                        _context22.t0 = _context22["catch"](0);
                        return _context22.abrupt("return", {
                          error: 2,
                          reason: _context22.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context22.stop();
                    }
                  }
                }, _callee22, this, [[0, 14]]);
              }));
              return _delZone.apply(this, arguments);
            };

            delZone = function _ref54(_x22) {
              return _delZone.apply(this, arguments);
            };

            _addZone = function _ref53() {
              _addZone = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee21(_ref7) {
                var name, brief, avatar, pid, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee21$(_context21) {
                  while (1) {
                    switch (_context21.prev = _context21.next) {
                      case 0:
                        name = _ref7.name, brief = _ref7.brief, avatar = _ref7.avatar, pid = _ref7.pid;
                        _context21.prev = 1;
                        API_PATH = '/zone';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(name) || typeof name !== 'string')) {
                          _context21.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: name is required as string not ' + _typeof(name));

                      case 8:
                        if (!(_.isNil(brief) || typeof brief !== 'string')) {
                          _context21.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: brief is required as string');

                      case 10:
                        _context21.next = 12;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            name: name,
                            brief: brief,
                            avatar: avatar,
                            pid: pid
                          }
                        });

                      case 12:
                        res = _context21.sent;
                        data = res.data;
                        return _context21.abrupt("return", data);

                      case 17:
                        _context21.prev = 17;
                        _context21.t0 = _context21["catch"](1);
                        return _context21.abrupt("return", {
                          error: 1,
                          reason: _context21.t0,
                          debug: _context21.t0
                        });

                      case 20:
                      case "end":
                        return _context21.stop();
                    }
                  }
                }, _callee21, this, [[1, 17]]);
              }));
              return _addZone.apply(this, arguments);
            };

            addZone = function _ref52(_x21) {
              return _addZone.apply(this, arguments);
            };

            _qryUgrp = function _ref51() {
              _qryUgrp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee20(param) {
                var api_path, key, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee20$(_context20) {
                  while (1) {
                    switch (_context20.prev = _context20.next) {
                      case 0:
                        _context20.prev = 0;
                        api_path = '/ugrp';

                        if (JSON.stringify(param) !== '{}') {
                          api_path = '/ugrp?';
                        }

                        for (key in param) {
                          api_path = api_path + '&' + key + '=' + param[key];
                        }

                        API_PATH = api_path;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context20.next = 10;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 10:
                        res = _context20.sent;
                        data = res.data;
                        return _context20.abrupt("return", data);

                      case 15:
                        _context20.prev = 15;
                        _context20.t0 = _context20["catch"](0);
                        console.log(_context20.t0);
                        return _context20.abrupt("return", {
                          error: 2,
                          reason: _context20.t0,
                          result: {}
                        });

                      case 19:
                      case "end":
                        return _context20.stop();
                    }
                  }
                }, _callee20, this, [[0, 15]]);
              }));
              return _qryUgrp.apply(this, arguments);
            };

            qryUgrp = function _ref50(_x20) {
              return _qryUgrp.apply(this, arguments);
            };

            _getUgrp = function _ref49() {
              _getUgrp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee19(ugrp_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee19$(_context19) {
                  while (1) {
                    switch (_context19.prev = _context19.next) {
                      case 0:
                        _context19.prev = 0;
                        API_PATH = '/ugrp/' + ugrp_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(ugrp_id) || typeof ugrp_id !== 'string')) {
                          _context19.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 7:
                        _context19.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context19.sent;
                        //console.log(res);
                        data = res.data;
                        return _context19.abrupt("return", data);

                      case 14:
                        _context19.prev = 14;
                        _context19.t0 = _context19["catch"](0);
                        console.log(_context19.t0);
                        return _context19.abrupt("return", {
                          error: 2,
                          reason: _context19.t0,
                          result: {}
                        });

                      case 18:
                      case "end":
                        return _context19.stop();
                    }
                  }
                }, _callee19, this, [[0, 14]]);
              }));
              return _getUgrp.apply(this, arguments);
            };

            getUgrp = function _ref48(_x19) {
              return _getUgrp.apply(this, arguments);
            };

            _putUgrp = function _ref47() {
              _putUgrp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee18(ugrp_id, put_param) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee18$(_context18) {
                  while (1) {
                    switch (_context18.prev = _context18.next) {
                      case 0:
                        _context18.prev = 0;
                        API_PATH = '/ugrp/' + ugrp_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };
                        _context18.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context18.sent;
                        data = res.data;
                        return _context18.abrupt("return", data);

                      case 12:
                        _context18.prev = 12;
                        _context18.t0 = _context18["catch"](0);
                        return _context18.abrupt("return", {
                          error: 2,
                          reason: _context18.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context18.stop();
                    }
                  }
                }, _callee18, this, [[0, 12]]);
              }));
              return _putUgrp.apply(this, arguments);
            };

            putUgrp = function _ref46(_x17, _x18) {
              return _putUgrp.apply(this, arguments);
            };

            _delUgrp = function _ref45() {
              _delUgrp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee17(ugrp_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee17$(_context17) {
                  while (1) {
                    switch (_context17.prev = _context17.next) {
                      case 0:
                        _context17.prev = 0;
                        API_PATH = '/ugrp/' + ugrp_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(ugrp_id) || typeof ugrp_id !== 'string')) {
                          _context17.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: ugrp_id is required as string');

                      case 7:
                        _context17.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context17.sent;
                        data = res.data;
                        return _context17.abrupt("return", data);

                      case 14:
                        _context17.prev = 14;
                        _context17.t0 = _context17["catch"](0);
                        return _context17.abrupt("return", {
                          error: 2,
                          reason: _context17.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context17.stop();
                    }
                  }
                }, _callee17, this, [[0, 14]]);
              }));
              return _delUgrp.apply(this, arguments);
            };

            delUgrp = function _ref44(_x16) {
              return _delUgrp.apply(this, arguments);
            };

            _addUgrp = function _ref43() {
              _addUgrp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee16(_ref6) {
                var code, name, brief, avatar, pid, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee16$(_context16) {
                  while (1) {
                    switch (_context16.prev = _context16.next) {
                      case 0:
                        code = _ref6.code, name = _ref6.name, brief = _ref6.brief, avatar = _ref6.avatar, pid = _ref6.pid;
                        _context16.prev = 1;
                        API_PATH = '/ugrp';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(code) || typeof code !== 'string')) {
                          _context16.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: code is required as string');

                      case 8:
                        if (!(_.isNil(name) || typeof name !== 'string')) {
                          _context16.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: name is required as string not ' + _typeof(name));

                      case 10:
                        if (!(_.isNil(brief) || typeof brief !== 'string')) {
                          _context16.next = 12;
                          break;
                        }

                        throw new ArgumentError('String Type Field: brief is required as string');

                      case 12:
                        _context16.next = 14;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            code: code,
                            name: name,
                            brief: brief,
                            avatar: avatar,
                            pid: pid
                          }
                        });

                      case 14:
                        res = _context16.sent;
                        data = res.data;
                        return _context16.abrupt("return", data);

                      case 19:
                        _context16.prev = 19;
                        _context16.t0 = _context16["catch"](1);
                        return _context16.abrupt("return", {
                          error: 1,
                          reason: _context16.t0,
                          debug: _context16.t0
                        });

                      case 22:
                      case "end":
                        return _context16.stop();
                    }
                  }
                }, _callee16, this, [[1, 19]]);
              }));
              return _addUgrp.apply(this, arguments);
            };

            addUgrp = function _ref42(_x15) {
              return _addUgrp.apply(this, arguments);
            };

            _qryUser = function _ref41() {
              _qryUser = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee15(param) {
                var api_path, key, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.prev = 0;
                        api_path = '/user';

                        if (JSON.stringify(param) !== '{}') {
                          api_path = '/user?';
                        }

                        for (key in param) {
                          api_path = api_path + '&' + key + '=' + param[key];
                        }

                        API_PATH = api_path;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context15.next = 10;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 10:
                        res = _context15.sent;
                        //console.log(res);
                        data = res.data;
                        return _context15.abrupt("return", data);

                      case 15:
                        _context15.prev = 15;
                        _context15.t0 = _context15["catch"](0);
                        return _context15.abrupt("return", {
                          error: 1,
                          reason: _context15.t0,
                          debug: _context15.t0
                        });

                      case 18:
                      case "end":
                        return _context15.stop();
                    }
                  }
                }, _callee15, this, [[0, 15]]);
              }));
              return _qryUser.apply(this, arguments);
            };

            qryUser = function _ref40(_x14) {
              return _qryUser.apply(this, arguments);
            };

            _getUser = function _ref39() {
              _getUser = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee14(user_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                  while (1) {
                    switch (_context14.prev = _context14.next) {
                      case 0:
                        _context14.prev = 0;
                        API_PATH = '/user/' + user_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(user_id) || typeof user_id !== 'string')) {
                          _context14.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 7:
                        _context14.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context14.sent;
                        //console.log(res);
                        data = res.data;
                        return _context14.abrupt("return", data);

                      case 14:
                        _context14.prev = 14;
                        _context14.t0 = _context14["catch"](0);
                        return _context14.abrupt("return", {
                          error: 1,
                          reason: _context14.t0,
                          debug: _context14.t0
                        });

                      case 17:
                      case "end":
                        return _context14.stop();
                    }
                  }
                }, _callee14, this, [[0, 14]]);
              }));
              return _getUser.apply(this, arguments);
            };

            getUser = function _ref38(_x13) {
              return _getUser.apply(this, arguments);
            };

            _putUser = function _ref37() {
              _putUser = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee13(user_id, put_param) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        _context13.prev = 0;
                        API_PATH = '/user/' + user_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };
                        _context13.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context13.sent;
                        data = res.data;
                        return _context13.abrupt("return", data);

                      case 12:
                        _context13.prev = 12;
                        _context13.t0 = _context13["catch"](0);
                        return _context13.abrupt("return", {
                          error: 1,
                          reason: _context13.t0,
                          debug: _context13.t0
                        });

                      case 15:
                      case "end":
                        return _context13.stop();
                    }
                  }
                }, _callee13, this, [[0, 12]]);
              }));
              return _putUser.apply(this, arguments);
            };

            putUser = function _ref36(_x11, _x12) {
              return _putUser.apply(this, arguments);
            };

            _delUser = function _ref35() {
              _delUser = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee12(user_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.prev = 0;
                        API_PATH = '/user/' + user_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(user_id) || typeof user_id !== 'string')) {
                          _context12.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 7:
                        _context12.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context12.sent;
                        data = res.data;
                        return _context12.abrupt("return", data);

                      case 14:
                        _context12.prev = 14;
                        _context12.t0 = _context12["catch"](0);
                        return _context12.abrupt("return", {
                          error: 1,
                          reason: _context12.t0,
                          debug: _context12.t0
                        });

                      case 17:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12, this, [[0, 14]]);
              }));
              return _delUser.apply(this, arguments);
            };

            delUser = function _ref34(_x10) {
              return _delUser.apply(this, arguments);
            };

            _addUser = function _ref33() {
              _addUser = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee11(_ref5) {
                var by, ustr, pwd, vfcode, incode, ugrp, role, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        by = _ref5.by, ustr = _ref5.ustr, pwd = _ref5.pwd, vfcode = _ref5.vfcode, incode = _ref5.incode, ugrp = _ref5.ugrp, role = _ref5.role;
                        _context11.prev = 1;
                        API_PATH = '/user';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(by) || typeof by !== 'string')) {
                          _context11.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: by is required as string');

                      case 8:
                        /**
                         * 如果注册接口不设置incode,那么系统自动补充成字符串incode.
                         * 它是默认的邀请码.
                         * */
                        if (_.isNil(incode)) {
                          incode = 'incode';
                        }

                        if (incode == '') {
                          incode = 'incode';
                        }

                        if (!(_.isNil(ustr) || typeof ustr !== 'string')) {
                          _context11.next = 12;
                          break;
                        }

                        throw new ArgumentError('String Type Field: ustr is required as string');

                      case 12:
                        if (!(_.isNil(pwd) || typeof pwd !== 'string')) {
                          _context11.next = 14;
                          break;
                        }

                        throw new ArgumentError('String Type Field: pwd is required as string');

                      case 14:
                        if (!(_.isNil(vfcode) || typeof vfcode !== 'string')) {
                          _context11.next = 16;
                          break;
                        }

                        throw new ArgumentError('String Type Field:vfcode is required as string');

                      case 16:
                        if (!(_.isNil(incode) || typeof incode !== 'string')) {
                          _context11.next = 18;
                          break;
                        }

                        throw new ArgumentError('String Type Field:incode is required as string');

                      case 18:
                        if (!(_.isNil(ugrp) || typeof ugrp !== 'string')) {
                          _context11.next = 20;
                          break;
                        }

                        throw new ArgumentError('String Type Field:ugrp is required as string');

                      case 20:
                        if (!(_.isNil(role) || typeof role !== 'string')) {
                          _context11.next = 22;
                          break;
                        }

                        throw new ArgumentError('String Type Field:role is required as string');

                      case 22:
                        _context11.next = 24;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            by: by,
                            ustr: ustr,
                            vfcode: vfcode,
                            incode: incode,
                            pwd: pwd,
                            ugrp: ugrp,
                            role: role
                          }
                        });

                      case 24:
                        res = _context11.sent;
                        data = res.data;
                        return _context11.abrupt("return", data);

                      case 29:
                        _context11.prev = 29;
                        _context11.t0 = _context11["catch"](1);
                        return _context11.abrupt("return", {
                          error: 1,
                          reason: _context11.t0,
                          debug: _context11.t0
                        });

                      case 32:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11, this, [[1, 29]]);
              }));
              return _addUser.apply(this, arguments);
            };

            addUser = function _ref32(_x9) {
              return _addUser.apply(this, arguments);
            };

            _chgPass = function _ref31() {
              _chgPass = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee10(user_id, _ref4) {
                var oldpwd, newpwd, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        oldpwd = _ref4.oldpwd, newpwd = _ref4.newpwd;
                        _context10.prev = 1;
                        API_PATH = '/pass/' + user_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(user_id) || typeof user_id !== 'string')) {
                          _context10.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 8:
                        if (!(_.isNil(oldpwd) || typeof oldpwd !== 'string')) {
                          _context10.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: oldpwd is required as string');

                      case 10:
                        if (!(_.isNil(newpwd) || typeof newpwd !== 'string')) {
                          _context10.next = 12;
                          break;
                        }

                        throw new ArgumentError('String Type Field: pwd is required as string');

                      case 12:
                        _context10.next = 14;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            newpwd: newpwd,
                            oldpwd: oldpwd
                          }
                        });

                      case 14:
                        res = _context10.sent;
                        data = res.data;
                        return _context10.abrupt("return", data);

                      case 19:
                        _context10.prev = 19;
                        _context10.t0 = _context10["catch"](1);
                        return _context10.abrupt("return", {
                          error: 1,
                          reason: _context10.t0,
                          debug: _context10.t0
                        });

                      case 22:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10, this, [[1, 19]]);
              }));
              return _chgPass.apply(this, arguments);
            };

            chgPass = function _ref30(_x7, _x8) {
              return _chgPass.apply(this, arguments);
            };

            _rstPass = function _ref29() {
              _rstPass = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee9(_ref3) {
                var by, ustr, pwd, vfcode, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        by = _ref3.by, ustr = _ref3.ustr, pwd = _ref3.pwd, vfcode = _ref3.vfcode;
                        _context9.prev = 1;
                        API_PATH = '/pass';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(by) || typeof by !== 'string')) {
                          _context9.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: by is required as string');

                      case 8:
                        if (!(_.isNil(ustr) || typeof ustr !== 'string')) {
                          _context9.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: ustr is required as string');

                      case 10:
                        if (!(_.isNil(pwd) || typeof pwd !== 'string')) {
                          _context9.next = 12;
                          break;
                        }

                        throw new ArgumentError('String Type Field: pwd is required as string');

                      case 12:
                        if (!(_.isNil(vfcode) || typeof vfcode !== 'string')) {
                          _context9.next = 14;
                          break;
                        }

                        throw new ArgumentError('String Type Field:vfcode is required as string');

                      case 14:
                        _context9.next = 16;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            by: by,
                            ustr: ustr,
                            vfcode: vfcode,
                            pwd: pwd
                          }
                        });

                      case 16:
                        res = _context9.sent;
                        data = res.data;
                        return _context9.abrupt("return", data);

                      case 21:
                        _context9.prev = 21;
                        _context9.t0 = _context9["catch"](1);
                        console.log(_context9.t0);
                        return _context9.abrupt("return", {
                          error: 2,
                          reason: _context9.t0,
                          result: {},
                          debug: {}
                        });

                      case 25:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9, this, [[1, 21]]);
              }));
              return _rstPass.apply(this, arguments);
            };

            rstPass = function _ref28(_x6) {
              return _rstPass.apply(this, arguments);
            };

            _addVfcodeByMail = function _ref27() {
              _addVfcodeByMail = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee8(mail) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.prev = 0;
                        API_PATH = '/vfc';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv'          : APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(mail) || typeof mail !== 'string')) {
                          _context8.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: mail is required as string');

                      case 7:
                        _context8.next = 9;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            vfaddr: mail,
                            tmpl: 'DMS_VFC4USEREG'
                          }
                        });

                      case 9:
                        res = _context8.sent;
                        data = res.data;
                        return _context8.abrupt("return", data);

                      case 14:
                        _context8.prev = 14;
                        _context8.t0 = _context8["catch"](0);
                        console.log(_context8.t0);
                        return _context8.abrupt("return", {
                          error: 2,
                          reason: _context8.t0,
                          result: {},
                          debug: {}
                        });

                      case 18:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8, this, [[0, 14]]);
              }));
              return _addVfcodeByMail.apply(this, arguments);
            };

            addVfcodeByMail = function _ref26(_x5) {
              return _addVfcodeByMail.apply(this, arguments);
            };

            _addVfcodeByTel = function _ref25() {
              _addVfcodeByTel = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee7(tel) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.prev = 0;
                        API_PATH = '/vfc';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv'          : APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(tel) || typeof tel !== 'string')) {
                          _context7.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: tel is required as string');

                      case 7:
                        _context7.next = 9;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            vfaddr: tel,
                            tmpl: 'SMS_25335288'
                          }
                        });

                      case 9:
                        res = _context7.sent;
                        //console.log(res);
                        data = res.data;
                        return _context7.abrupt("return", data);

                      case 14:
                        _context7.prev = 14;
                        _context7.t0 = _context7["catch"](0);
                        console.log(_context7.t0);
                        return _context7.abrupt("return", {
                          error: 2,
                          reason: _context7.t0,
                          result: {},
                          debug: {}
                        });

                      case 18:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7, this, [[0, 14]]);
              }));
              return _addVfcodeByTel.apply(this, arguments);
            };

            addVfcodeByTel = function _ref24(_x4) {
              return _addVfcodeByTel.apply(this, arguments);
            };

            _login = function _ref23() {
              _login = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee6(_ref2) {
                var by, ustr, pwd, ugrp, role, url, localToken, headers, res, data, token;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        by = _ref2.by, ustr = _ref2.ustr, pwd = _ref2.pwd, ugrp = _ref2.ugrp, role = _ref2.role;
                        _context6.prev = 1;

                        if (!(_.isNil(by) || typeof by !== 'string')) {
                          _context6.next = 4;
                          break;
                        }

                        throw new ArgumentError('String Type Field: by is required');

                      case 4:
                        if (!(_.isNil(ustr) || typeof ustr !== 'string')) {
                          _context6.next = 6;
                          break;
                        }

                        throw new ArgumentError('String Type Field: ustr is required');

                      case 6:
                        if (!(_.isNil(pwd) || typeof pwd !== 'string')) {
                          _context6.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: pwd is required');

                      case 8:
                        if (!(_.isNil(ugrp) || typeof ugrp !== 'string')) {
                          _context6.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: ugrp is required');

                      case 10:
                        if (!(_.isNil(role) || typeof role !== 'string')) {
                          _context6.next = 12;
                          break;
                        }

                        throw new ArgumentError('String Type Field: role is required');

                      case 12:
                        url = API_END_POINT + '/login';
                        localToken = getLocalToken();

                        if (!_.isNil(localToken)) {
                          _context6.next = 18;
                          break;
                        }

                        _context6.next = 17;
                        return addToken();

                      case 17:
                        localToken = getLocalToken();

                      case 18:
                        headers = {
                          //'apiv'          : APIV,
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };
                        _context6.next = 21;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            by: by,
                            ustr: ustr,
                            pwd: pwd,
                            ugrp: ugrp,
                            role: role
                          }
                        });

                      case 21:
                        res = _context6.sent;
                        data = res.data;

                        if (data.error === 0) {
                          token = data.result.token;
                          setLocalToken(token);
                        } else {
                          console.log(data);
                        }

                        return _context6.abrupt("return", data);

                      case 27:
                        _context6.prev = 27;
                        _context6.t0 = _context6["catch"](1);
                        console.log(_context6.t0);
                        return _context6.abrupt("return", {
                          error: 2,
                          reason: _context6.t0,
                          result: {},
                          debug: {}
                        });

                      case 31:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6, this, [[1, 27]]);
              }));
              return _login.apply(this, arguments);
            };

            login = function _ref22(_x3) {
              return _login.apply(this, arguments);
            };

            _logout = function _ref21() {
              _logout = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.prev = 0;
                        delLocalToken();
                        return _context5.abrupt("return", true);

                      case 5:
                        _context5.prev = 5;
                        _context5.t0 = _context5["catch"](0);
                        return _context5.abrupt("return", {
                          error: 2,
                          reason: String(_context5.t0),
                          result: {},
                          debug: {}
                        });

                      case 8:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, this, [[0, 5]]);
              }));
              return _logout.apply(this, arguments);
            };

            logout = function _ref20() {
              return _logout.apply(this, arguments);
            };

            _isLogin = function _ref19() {
              _isLogin = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee4() {
                var localToken, _isLogin2, url, sign, headers, res, data;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.prev = 0;
                        localToken = getLocalToken();
                        _isLogin2 = false;

                        if (!(_.isNil(localToken) || localToken == '')) {
                          _context4.next = 6;
                          break;
                        }

                        _isLogin2 = false;
                        return _context4.abrupt("return", false);

                      case 6:
                        /*
                        localToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NTQ5NTM0NDEsIm5iZiI6MTU1NDk1MzQ0MSwiZXhwIjoxNTU0OTU3MDQxLCJpc3MiOiJsb3ZlYXJ0aCIsImR1YSI6IkhQenFZTktrIiwiZGlkIjoidnN5RGRTcmIiLCJ1aWQiOiJqUU9wRXAybSIsImFpZCI6Ilp2VVcxdExwIiwiYXVkIjoiY24uYWMuaWN0LmNoaWxkcmVucGMiLCJpcCI6IjExMy4xMTAuMjI4Ljg5IiwidWEiOiJYZHVhVXNlckFnZW50IiwidWdycCI6IlhkVWFYZHVBIiwicm9sZSI6Im5vbmUifQ.eFElFNUl9PJz6hZZNqZ8XBuU9gWQrg9sp9M2rP2IQ-0RPLw8M1BGVo8i0LCZsoC_NUcpJSn8ChGGOO87p32oaatsNzdr6jFOWyx3536kJdoVz4PFqipEg7Jtyut8q3940W8PHQKVmXgjLlESpDW8YAvE_Qsl0U7TgTDPDDrrR-rLuCD504N3a0kOwb1MZHE-MZQ5QT8t2AxqgbsV2y5qz2aTbOZAQD5KjLHhKvipiblBq2D27X74bxRP-e0iDbyKYAYpH8luzeqe3y-SRn3XvEu5gficInnSLlFiy56KZPeZPOQSOmu_rjNds7cIASnpxbFjXkMj9YPUHKBOjcEkkw'
                        localToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NTQ5Njg3MTAsIm5iZiI6MTU1NDk2ODcxMCwiZXhwIjoxNTU1MDU1MTEwLCJpc3MiOiJsb3ZlYXJ0aCIsImR1YSI6IkhQenFZTktrIiwiZGlkIjoidnN5RGRTcmIiLCJ1aWQiOiJqUU9wRXAybSIsImFpZCI6Ilp2VVcxdExwIiwiYXVkIjoiY24uYWMuaWN0LmNoaWxkcmVucGMiLCJpcCI6IjExMy4xMTAuMjI4Ljg5IiwidWEiOiJYZHVhVXNlckFnZW50IiwidWdycCI6IlhkVWFYZHVBIiwicm9sZSI6Im5vbmUifQ.bv0NXpFT1uyk5J2HBo0hsdA-KCMp9s7QCYwOJq8XiamRlw97czpQWfsNYIjmUoJLElqrLZL8L93PThurQW3f1JaR-rK_izZz088Iv0F2Gklc-La3YOVwXzNMkC1lY5g_zIAcJu-FcMD0nkJeub6EnHzbCLZOh63WN424q3G4-pi3HfgfKOF8ly0b3znZOSj5xVSGagCsZEPJ9E9Xx8sHAq7dtx6Liyh2ugw_eGttTexEXR8LUgazgwK0vBmBiMf0pAviioGQhaD_uLRQpr2yWvLEuqCkga62iA92kJiHpD3lihJeFTwsi6NJWS2RCz_Y1DeCiDNhNeXP0Tq6P-lRsg';
                        localToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NTQ5Njk0NTksIm5iZiI6MTU1NDk2OTQ1OSwiZXhwIjoxNTU1MDU1ODU5LCJpc3MiOiJsb3ZlYXJ0aCIsImR1YSI6IkhQenFZTktrIiwiZGlkIjoidnN5RGRTcmIiLCJ1aWQiOiJqUU9wRXAybSIsImFpZCI6Ilp2VVcxdExwIiwiYXVkIjoiY24uYWMuaWN0LmNoaWxkcmVucGMiLCJpcCI6IjExMy4xMTAuMjI4Ljg5IiwidWEiOiJYZHVhVXNlckFnZW50IiwidWdycCI6IlhkVWFYZHVBIiwicm9sZSI6Im5vbmUifQ.TJ3lsepFtSppQsK1db-tdzistF68VrVr9FI3i-DnsLy6GAGLYNth1zCLPSAYHE3UhlI-s_yY-nNS2tX6eAyKD2xArpC1bLIUbp_LgoF6kEjg81GLtUFYcL2mbSKL1FQBI7lKWbGzZea-zY93D2PgqAdlGYDF1dp8Tfggka3pxfcZRp3208DrHWRj9qEOc-VZfrFvX0FgxX_z8GhiZZQmp5mi13ptGl4VnlLM3lVKijhMIsGuLVKlbB57TDcjlAqe0uyhncxw6Ue1yJYtH6Ff2A8sxEUuY5Ht3xm-IIOv_uOvqkls091Oq5ENXYD0htpIqocXplQFcZK5FArtR8CHlQ';
                        */
                        url = API_END_POINT + '/login/' + localToken;
                        sign = generateSign({
                          method: 'GET',
                          path: '/login/' + localToken,
                          appSecret: getAppSecret(),
                          appKey: getAppKey()
                        });
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: sign
                        };
                        _context4.next = 11;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 11:
                        res = _context4.sent;
                        data = res.data;

                        if (!(data.error === 0)) {
                          _context4.next = 21;
                          break;
                        }

                        if (!(data.result.islogin == 1)) {
                          _context4.next = 18;
                          break;
                        }

                        return _context4.abrupt("return", true);

                      case 18:
                        return _context4.abrupt("return", false);

                      case 19:
                        _context4.next = 23;
                        break;

                      case 21:
                        throw new Error('fail to get Login profile');

                      case 23:
                        _context4.next = 29;
                        break;

                      case 25:
                        _context4.prev = 25;
                        _context4.t0 = _context4["catch"](0);
                        console.log(_context4.t0);
                        return _context4.abrupt("return", false);

                      case 29:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, this, [[0, 25]]);
              }));
              return _isLogin.apply(this, arguments);
            };

            isLogin = function _ref18() {
              return _isLogin.apply(this, arguments);
            };

            _getToken = function _ref17() {
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

            getToken = function _ref16(_x2) {
              return _getToken.apply(this, arguments);
            };

            _addToken = function _ref15() {
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

            addToken = function _ref14() {
              return _addToken.apply(this, arguments);
            };

            _initialize = function _ref13() {
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

            initialize = function _ref12() {
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

            _context50.next = 103;
            return initialize();

          case 103:
            return _context50.abrupt("return", {
              initialize: initialize,
              addToken: addToken,
              getToken: getToken,
              isLogin: isLogin,
              logout: logout,
              login: login,
              addUser: addUser,
              delUser: delUser,
              getUser: getUser,
              qryUser: qryUser,
              putUser: putUser,
              addUgrp: addUgrp,
              delUgrp: delUgrp,
              getUgrp: getUgrp,
              putUgrp: putUgrp,
              qryUgrp: qryUgrp,
              addZone: addZone,
              delZone: delZone,
              getZone: getZone,
              putZone: putZone,
              qryZone: qryZone,
              addRole: addRole,
              delRole: delRole,
              getRole: getRole,
              putRole: putRole,
              qryRole: qryRole,
              addUsro: addUsro,
              delUsro: delUsro,
              getUsro: getUsro,
              putUsro: putUsro,
              qryUsro: qryUsro,
              addApp: addApp,
              delApp: delApp,
              getApp: getApp,
              putApp: putApp,
              qryApp: qryApp,
              addObj: addObj,
              delObj: delObj,
              putObj: putObj,
              getObj: getObj,
              qryObj: qryObj,
              addVfcodeByTel: addVfcodeByTel,
              addVfcodeByMail: addVfcodeByMail,
              rstPass: rstPass,
              chgPass: chgPass,
              addfile: addfile
            });

          case 104:
          case "end":
            return _context50.stop();
        }
      }
    }, _callee50, this);
  }));
  return _lovearth.apply(this, arguments);
}

module.exports = lovearth;