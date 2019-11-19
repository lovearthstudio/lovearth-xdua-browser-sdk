// xdua 1.9.2
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
    addfile = _require2.addfile,
    addavatar = _require2.addavatar,
    addblob = _require2.addblob;

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
/**
 * APP专属的应用token
 * */


var global_app_token = null;
/**
 * 用户专属的登录token
 * */

var global_usr_token = null;

function xdua(_x) {
  return _xdua.apply(this, arguments);
}

function _xdua() {
  _xdua = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee89(_ref) {
    var APP_TOKEN, initialize, _initialize, addToken, _addToken, getToken, _getToken, isLogin, _isLogin, logout, _logout, login, _login, addVfcodeByTel, _addVfcodeByTel, addVfcodeByMail, _addVfcodeByMail, rstPass, _rstPass, chgPass, _chgPass, signup, _signup, addUser, _addUser, delUser, _delUser, putUser, _putUser, getUser, _getUser, qryUser, _qryUser, addUgrp, _addUgrp, delUgrp, _delUgrp, putUgrp, _putUgrp, getUgrp, _getUgrp, qryUgrp, _qryUgrp, addZone, _addZone, delZone, _delZone, putZone, _putZone, getZone, _getZone, qryZone, _qryZone, addRole, _addRole, delRole, _delRole, putRole, _putRole, getRole, _getRole, qryRole, _qryRole, addRule, _addRule, delRule, _delRule, putRule, _putRule, getRule, _getRule, qryRule, _qryRule, addRoue, _addRoue, delRoues, _delRoues, delRoue, _delRoue, putRoue, _putRoue, getRoue, _getRoue, qryRoue, _qryRoue, addUsro, _addUsro, delUsro, _delUsro, putUsro, _putUsro, getUsro, _getUsro, qryUsro, _qryUsro, addUaff, _addUaff, delUaff, _delUaff, putUaff, _putUaff, getUaff, _getUaff, qryUaff, _qryUaff, delApp, _delApp, putApp, _putApp, getApp, _getApp, qryApp, _qryApp, addApp, _addApp, _delApp2, _putApp2, _getApp2, _qryApp2, addObj, _addObj, delObj, _delObj, delObjs, _delObjs, putObj, _putObj, getObj, _getObj, qryObj, _qryObj, hasObj, _hasObj, addFobj, _addFobj, delFobj, _delFobj, putFobj, _putFobj, getFobj, _getFobj, qryFobj, _qryFobj, addUinf, _addUinf, delUinf, _delUinf, putUinf, _putUinf, getUinf, _getUinf, qryUinf, _qryUinf, addJobq, _addJobq, delJobq, _delJobq, putJobq, _putJobq, getJobq, _getJobq, qryJobq, _qryJobq, qryGwenv, _qryGwenv, qryDvenv, _qryDvenv, qryGwlog, _qryGwlog, qryDvlog, _qryDvlog, addIotpass, _addIotpass;

    return regeneratorRuntime.wrap(function _callee89$(_context89) {
      while (1) {
        switch (_context89.prev = _context89.next) {
          case 0:
            _addIotpass = function _ref198() {
              _addIotpass = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee88(add_params) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee88$(_context88) {
                  while (1) {
                    switch (_context88.prev = _context88.next) {
                      case 0:
                        _context88.prev = 0;
                        API_PATH = '/iotpass';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };
                        _context88.next = 7;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: add_params
                        });

                      case 7:
                        res = _context88.sent;
                        console.log(res);
                        data = res.data;
                        return _context88.abrupt("return", data);

                      case 13:
                        _context88.prev = 13;
                        _context88.t0 = _context88["catch"](0);
                        return _context88.abrupt("return", {
                          error: 2,
                          reason: _context88.t0,
                          result: {},
                          debug: {}
                        });

                      case 16:
                      case "end":
                        return _context88.stop();
                    }
                  }
                }, _callee88, this, [[0, 13]]);
              }));
              return _addIotpass.apply(this, arguments);
            };

            addIotpass = function _ref197(_x102) {
              return _addIotpass.apply(this, arguments);
            };

            _qryDvlog = function _ref196() {
              _qryDvlog = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee87(_ref22) {
                var where, limit, order, qryParam, _api_path20, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee87$(_context87) {
                  while (1) {
                    switch (_context87.prev = _context87.next) {
                      case 0:
                        where = _ref22.where, limit = _ref22.limit, order = _ref22.order;
                        _context87.prev = 1;

                        if (typeof where !== "string") {
                          where = JSON.stringify(where);
                        }

                        qryParam = {
                          "where": where,
                          "limit": limit,
                          "order": order
                        };
                        _api_path20 = '/dvlog';

                        if (JSON.stringify(qryParam) !== '{}') {
                          _api_path20 = '/dvlog?';
                        }

                        for (key in qryParam) {
                          _api_path20 = _api_path20 + '&' + key + '=' + qryParam[key];
                        }

                        API_PATH = _api_path20; //电话号码的+86的+号会在Url丢失
                        //const url = encodeURI(API_END_POINT + API_PATH) 

                        url = API_END_POINT + API_PATH;
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context87.next = 13;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 13:
                        res = _context87.sent;
                        data = res.data;
                        return _context87.abrupt("return", data);

                      case 18:
                        _context87.prev = 18;
                        _context87.t0 = _context87["catch"](1);
                        return _context87.abrupt("return", {
                          error: 2,
                          reason: _context87.t0,
                          result: {},
                          debug: {}
                        });

                      case 21:
                      case "end":
                        return _context87.stop();
                    }
                  }
                }, _callee87, this, [[1, 18]]);
              }));
              return _qryDvlog.apply(this, arguments);
            };

            qryDvlog = function _ref195(_x101) {
              return _qryDvlog.apply(this, arguments);
            };

            _qryGwlog = function _ref194() {
              _qryGwlog = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee86(_ref21) {
                var where, limit, order, qryParam, _api_path19, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee86$(_context86) {
                  while (1) {
                    switch (_context86.prev = _context86.next) {
                      case 0:
                        where = _ref21.where, limit = _ref21.limit, order = _ref21.order;
                        _context86.prev = 1;

                        if (typeof where !== "string") {
                          where = JSON.stringify(where);
                        }

                        console.log(where);
                        qryParam = {
                          "where": where,
                          "limit": limit,
                          "order": order
                        };
                        _api_path19 = '/gwlog';

                        if (JSON.stringify(qryParam) !== '{}') {
                          _api_path19 = '/gwlog?';
                        }

                        for (key in qryParam) {
                          _api_path19 = _api_path19 + '&' + key + '=' + qryParam[key];
                        }

                        API_PATH = _api_path19; //电话号码的+86的+号会在Url丢失

                        url = API_END_POINT + API_PATH; //const url = encodeURI(API_END_POINT + API_PATH) 

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context86.next = 14;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 14:
                        res = _context86.sent;
                        data = res.data;
                        return _context86.abrupt("return", data);

                      case 19:
                        _context86.prev = 19;
                        _context86.t0 = _context86["catch"](1);
                        return _context86.abrupt("return", {
                          error: 2,
                          reason: _context86.t0,
                          result: {},
                          debug: {}
                        });

                      case 22:
                      case "end":
                        return _context86.stop();
                    }
                  }
                }, _callee86, this, [[1, 19]]);
              }));
              return _qryGwlog.apply(this, arguments);
            };

            qryGwlog = function _ref193(_x100) {
              return _qryGwlog.apply(this, arguments);
            };

            _qryDvenv = function _ref192() {
              _qryDvenv = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee85(_ref20) {
                var where, limit, order, dataform, qryParam, _api_path18, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee85$(_context85) {
                  while (1) {
                    switch (_context85.prev = _context85.next) {
                      case 0:
                        where = _ref20.where, limit = _ref20.limit, order = _ref20.order, dataform = _ref20.dataform;
                        _context85.prev = 1;

                        if (typeof where !== "string") {
                          where = JSON.stringify(where);
                        }

                        qryParam = {
                          "where": where,
                          "limit": limit,
                          "order": order,
                          "dataform": dataform
                        };
                        _api_path18 = '/dvenv';

                        if (JSON.stringify(qryParam) !== '{}') {
                          _api_path18 = '/dvenv?';
                        }

                        for (key in qryParam) {
                          _api_path18 = _api_path18 + '&' + key + '=' + qryParam[key];
                        }

                        API_PATH = _api_path18; //电话号码的+86的+号会在Url丢失
                        //const url = encodeURI(API_END_POINT + API_PATH) 

                        url = API_END_POINT + API_PATH;
                        console.log(url);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context85.next = 14;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 14:
                        res = _context85.sent;
                        data = res.data;
                        return _context85.abrupt("return", data);

                      case 19:
                        _context85.prev = 19;
                        _context85.t0 = _context85["catch"](1);
                        return _context85.abrupt("return", {
                          error: 2,
                          reason: _context85.t0,
                          result: {},
                          debug: {}
                        });

                      case 22:
                      case "end":
                        return _context85.stop();
                    }
                  }
                }, _callee85, this, [[1, 19]]);
              }));
              return _qryDvenv.apply(this, arguments);
            };

            qryDvenv = function _ref191(_x99) {
              return _qryDvenv.apply(this, arguments);
            };

            _qryGwenv = function _ref190() {
              _qryGwenv = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee84(_ref19) {
                var where, limit, order, dataform, qryParam, _api_path17, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee84$(_context84) {
                  while (1) {
                    switch (_context84.prev = _context84.next) {
                      case 0:
                        where = _ref19.where, limit = _ref19.limit, order = _ref19.order, dataform = _ref19.dataform;
                        _context84.prev = 1;

                        if (typeof where !== "string") {
                          where = JSON.stringify(where);
                        }

                        qryParam = {
                          "where": where,
                          "limit": limit,
                          "order": order,
                          "dataform": dataform
                        };
                        _api_path17 = '/gwenv';

                        if (JSON.stringify(qryParam) !== '{}') {
                          _api_path17 = '/gwenv?';
                        }

                        for (key in qryParam) {
                          _api_path17 = _api_path17 + '&' + key + '=' + qryParam[key];
                        }

                        API_PATH = _api_path17; //电话号码的+86的+号会在Url丢失
                        //const url = encodeURI(API_END_POINT + API_PATH) 

                        url = API_END_POINT + API_PATH;
                        console.log(url);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context84.next = 14;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 14:
                        res = _context84.sent;
                        data = res.data;
                        return _context84.abrupt("return", data);

                      case 19:
                        _context84.prev = 19;
                        _context84.t0 = _context84["catch"](1);
                        return _context84.abrupt("return", {
                          error: 2,
                          reason: _context84.t0,
                          result: {},
                          debug: {}
                        });

                      case 22:
                      case "end":
                        return _context84.stop();
                    }
                  }
                }, _callee84, this, [[1, 19]]);
              }));
              return _qryGwenv.apply(this, arguments);
            };

            qryGwenv = function _ref189(_x98) {
              return _qryGwenv.apply(this, arguments);
            };

            _qryJobq = function _ref188() {
              _qryJobq = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee83(param) {
                var jobq_path, key, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee83$(_context83) {
                  while (1) {
                    switch (_context83.prev = _context83.next) {
                      case 0:
                        _context83.prev = 0;
                        jobq_path = '/jobq';

                        if (JSON.stringify(param) !== '{}') {
                          api_path = '/jobq?';
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
                          Authorization: getLocalToken() //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context83.next = 10;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 10:
                        res = _context83.sent;
                        data = res.data;
                        return _context83.abrupt("return", data);

                      case 15:
                        _context83.prev = 15;
                        _context83.t0 = _context83["catch"](0);
                        return _context83.abrupt("return", {
                          error: 2,
                          reason: _context83.t0,
                          result: {},
                          debug: {}
                        });

                      case 18:
                      case "end":
                        return _context83.stop();
                    }
                  }
                }, _callee83, this, [[0, 15]]);
              }));
              return _qryJobq.apply(this, arguments);
            };

            qryJobq = function _ref187(_x97) {
              return _qryJobq.apply(this, arguments);
            };

            _getJobq = function _ref186() {
              _getJobq = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee82(jobq_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee82$(_context82) {
                  while (1) {
                    switch (_context82.prev = _context82.next) {
                      case 0:
                        API_PATH = '/jobq/' + jobq_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };

                        if (!(_.isNil(jobq_id) || typeof jobq_id !== 'string')) {
                          _context82.next = 6;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 6:
                        _context82.next = 8;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 8:
                        res = _context82.sent;
                        data = res.data;
                        return _context82.abrupt("return", data);

                      case 11:
                      case "end":
                        return _context82.stop();
                    }
                  }
                }, _callee82, this);
              }));
              return _getJobq.apply(this, arguments);
            };

            getJobq = function _ref185(_x96) {
              return _getJobq.apply(this, arguments);
            };

            _putJobq = function _ref184() {
              _putJobq = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee81(jobq_id, put_param) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee81$(_context81) {
                  while (1) {
                    switch (_context81.prev = _context81.next) {
                      case 0:
                        _context81.prev = 0;
                        API_PATH = '/jobq/' + jobq_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };
                        _context81.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context81.sent;
                        data = res.data;
                        return _context81.abrupt("return", data);

                      case 12:
                        _context81.prev = 12;
                        _context81.t0 = _context81["catch"](0);
                        return _context81.abrupt("return", {
                          error: 2,
                          reason: _context81.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context81.stop();
                    }
                  }
                }, _callee81, this, [[0, 12]]);
              }));
              return _putJobq.apply(this, arguments);
            };

            putJobq = function _ref183(_x94, _x95) {
              return _putJobq.apply(this, arguments);
            };

            _delJobq = function _ref182() {
              _delJobq = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee80(jobq_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee80$(_context80) {
                  while (1) {
                    switch (_context80.prev = _context80.next) {
                      case 0:
                        _context80.prev = 0;
                        API_PATH = '/jobq/' + jobp_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };

                        if (!(_.isNil(app_id) || typeof app_id !== 'string')) {
                          _context80.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: app_id is required as string');

                      case 7:
                        _context80.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context80.sent;
                        data = res.data;
                        return _context80.abrupt("return", data);

                      case 14:
                        _context80.prev = 14;
                        _context80.t0 = _context80["catch"](0);
                        return _context80.abrupt("return", {
                          error: 2,
                          reason: _context80.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context80.stop();
                    }
                  }
                }, _callee80, this, [[0, 14]]);
              }));
              return _delJobq.apply(this, arguments);
            };

            delJobq = function _ref181(_x93) {
              return _delJobq.apply(this, arguments);
            };

            _addJobq = function _ref180() {
              _addJobq = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee79(_ref18) {
                var name, brief, avatar, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee79$(_context79) {
                  while (1) {
                    switch (_context79.prev = _context79.next) {
                      case 0:
                        name = _ref18.name, brief = _ref18.brief, avatar = _ref18.avatar;
                        _context79.prev = 1;
                        API_PATH = '/jobq';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };

                        if (!(_.isNil(name) || typeof name !== 'string')) {
                          _context79.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: name is required as string not ' + _typeof(name));

                      case 8:
                        if (!(_.isNil(brief) || typeof brief !== 'string')) {
                          _context79.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: brief is required as string');

                      case 10:
                        _context79.next = 12;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            name: name,
                            brief: brief,
                            avatar: avatar
                          }
                        });

                      case 12:
                        res = _context79.sent;
                        data = res.data;
                        return _context79.abrupt("return", data);

                      case 17:
                        _context79.prev = 17;
                        _context79.t0 = _context79["catch"](1);
                        return _context79.abrupt("return", {
                          error: 2,
                          reason: _context79.t0,
                          result: {},
                          debug: {}
                        });

                      case 20:
                      case "end":
                        return _context79.stop();
                    }
                  }
                }, _callee79, this, [[1, 17]]);
              }));
              return _addJobq.apply(this, arguments);
            };

            addJobq = function _ref179(_x92) {
              return _addJobq.apply(this, arguments);
            };

            _qryUinf = function _ref178() {
              _qryUinf = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee78(query) {
                var _api_path16, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee78$(_context78) {
                  while (1) {
                    switch (_context78.prev = _context78.next) {
                      case 0:
                        _context78.prev = 0;
                        _api_path16 = '/uinf';

                        if (JSON.stringify(query) !== '{}') {
                          _api_path16 = '/uinf?';
                        }

                        query["filter"] = JSON.stringify(query["filter"]);

                        for (key in query) {
                          _api_path16 = _api_path16 + '&' + key + '=' + query[key];
                        }

                        API_PATH = _api_path16;
                        url = encodeURI(API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context78.next = 11;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 11:
                        res = _context78.sent;
                        //console.log(res);
                        data = res.data;
                        return _context78.abrupt("return", data);

                      case 16:
                        _context78.prev = 16;
                        _context78.t0 = _context78["catch"](0);
                        return _context78.abrupt("return", {
                          error: 2,
                          reason: _context78.t0,
                          result: {},
                          debug: {}
                        });

                      case 19:
                      case "end":
                        return _context78.stop();
                    }
                  }
                }, _callee78, this, [[0, 16]]);
              }));
              return _qryUinf.apply(this, arguments);
            };

            qryUinf = function _ref177(_x91) {
              return _qryUinf.apply(this, arguments);
            };

            _getUinf = function _ref176() {
              _getUinf = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee77(uinf_uid) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee77$(_context77) {
                  while (1) {
                    switch (_context77.prev = _context77.next) {
                      case 0:
                        API_PATH = '/uinf/' + uinf_uid;
                        url = encodeURI(API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };

                        if (!(_.isNil(uinf_uid) || typeof uinf_uid !== 'string')) {
                          _context77.next = 6;
                          break;
                        }

                        throw new ArgumentError('String Type Field: uinf_uid  is required as string');

                      case 6:
                        _context77.next = 8;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 8:
                        res = _context77.sent;
                        data = res.data;
                        return _context77.abrupt("return", data);

                      case 11:
                      case "end":
                        return _context77.stop();
                    }
                  }
                }, _callee77, this);
              }));
              return _getUinf.apply(this, arguments);
            };

            getUinf = function _ref175(_x90) {
              return _getUinf.apply(this, arguments);
            };

            _putUinf = function _ref174() {
              _putUinf = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee76(uinf_uid, update) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee76$(_context76) {
                  while (1) {
                    switch (_context76.prev = _context76.next) {
                      case 0:
                        _context76.prev = 0;
                        console.log(update); //因为我们支持中文字符作为key，那么在修改和删除的时候,url上都与有中文,如果不用encodeURI,就会在aliyun.client这个SDK报 Reqeust Path contains unescaped characters 的错误 

                        API_PATH = '/uinf/' + uinf_uid;
                        url = encodeURI(API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };
                        _context76.next = 8;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            data: JSON.stringify(update)
                          }
                        });

                      case 8:
                        res = _context76.sent;
                        data = res.data;
                        return _context76.abrupt("return", data);

                      case 13:
                        _context76.prev = 13;
                        _context76.t0 = _context76["catch"](0);
                        return _context76.abrupt("return", {
                          error: 2,
                          reason: _context76.t0,
                          result: {},
                          debug: {}
                        });

                      case 16:
                      case "end":
                        return _context76.stop();
                    }
                  }
                }, _callee76, this, [[0, 13]]);
              }));
              return _putUinf.apply(this, arguments);
            };

            putUinf = function _ref173(_x88, _x89) {
              return _putUinf.apply(this, arguments);
            };

            _delUinf = function _ref172() {
              _delUinf = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee75(uinf_uid) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee75$(_context75) {
                  while (1) {
                    switch (_context75.prev = _context75.next) {
                      case 0:
                        _context75.prev = 0;
                        API_PATH = '/uinf/' + uinf_uid;
                        url = encodeURI(API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(uinf_uid) || typeof uinf_uid !== 'string')) {
                          _context75.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: obj_key is required as string');

                      case 7:
                        _context75.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context75.sent;
                        data = res.data;
                        return _context75.abrupt("return", data);

                      case 14:
                        _context75.prev = 14;
                        _context75.t0 = _context75["catch"](0);
                        return _context75.abrupt("return", {
                          error: 2,
                          reason: _context75.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context75.stop();
                    }
                  }
                }, _callee75, this, [[0, 14]]);
              }));
              return _delUinf.apply(this, arguments);
            };

            delUinf = function _ref171(_x87) {
              return _delUinf.apply(this, arguments);
            };

            _addUinf = function _ref170() {
              _addUinf = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee74(uid, param) {
                var API_PATH, url, localToken, headers, add_params, res, data;
                return regeneratorRuntime.wrap(function _callee74$(_context74) {
                  while (1) {
                    switch (_context74.prev = _context74.next) {
                      case 0:
                        _context74.prev = 0;
                        API_PATH = '/uinf';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(uid) || typeof uid !== 'string')) {
                          _context74.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: uid is required as string');

                      case 7:
                        if (_.isNil(param) || typeof url !== 'string') {
                          param = null;
                        } //字符串,数字,对象都会成功字符串化.


                        param = JSON.stringify(param); //总结一个非常高端的BUG,下面这个地方,必须要有let, 如果没有let,自己是能够跑通的,但是,如果别人把这个SDK转成ES5标准,就会出现
                        //Can't find variable add_params
                        //问题就是转换成ES5后,add_params这个变量就丢失了.

                        add_params = {
                          uid: uid,
                          data: param
                        };
                        _context74.next = 12;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: add_params
                        });

                      case 12:
                        res = _context74.sent;
                        data = res.data;
                        return _context74.abrupt("return", data);

                      case 17:
                        _context74.prev = 17;
                        _context74.t0 = _context74["catch"](0);
                        return _context74.abrupt("return", {
                          error: 1,
                          reason: _context74.t0,
                          debug: _context74.t0
                        });

                      case 20:
                      case "end":
                        return _context74.stop();
                    }
                  }
                }, _callee74, this, [[0, 17]]);
              }));
              return _addUinf.apply(this, arguments);
            };

            addUinf = function _ref169(_x85, _x86) {
              return _addUinf.apply(this, arguments);
            };

            _qryFobj = function _ref168() {
              _qryFobj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee73(param) {
                var _api_path15, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee73$(_context73) {
                  while (1) {
                    switch (_context73.prev = _context73.next) {
                      case 0:
                        _context73.prev = 0;
                        _api_path15 = '/fobj';

                        if (JSON.stringify(param) !== '{}') {
                          _api_path15 = '/fobj?';
                        } //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量


                        param["filter"] = JSON.stringify(param["filter"]);

                        for (key in param) {
                          _api_path15 = _api_path15 + '&' + key + '=' + param[key];
                        }

                        API_PATH = _api_path15;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context73.next = 11;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 11:
                        res = _context73.sent;
                        //console.log(res);
                        data = res.data;
                        return _context73.abrupt("return", data);

                      case 16:
                        _context73.prev = 16;
                        _context73.t0 = _context73["catch"](0);
                        return _context73.abrupt("return", {
                          error: 2,
                          reason: _context73.t0,
                          result: {},
                          debug: {}
                        });

                      case 19:
                      case "end":
                        return _context73.stop();
                    }
                  }
                }, _callee73, this, [[0, 16]]);
              }));
              return _qryFobj.apply(this, arguments);
            };

            qryFobj = function _ref167(_x84) {
              return _qryFobj.apply(this, arguments);
            };

            _getFobj = function _ref166() {
              _getFobj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee72(fobj_key) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee72$(_context72) {
                  while (1) {
                    switch (_context72.prev = _context72.next) {
                      case 0:
                        API_PATH = '/fobj/' + fobj_key;
                        url = encodeURI(API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };

                        if (!(_.isNil(fobj_key) || typeof fobj_key !== 'string')) {
                          _context72.next = 6;
                          break;
                        }

                        throw new ArgumentError('String Type Field: fobj_key  is required as string');

                      case 6:
                        _context72.next = 8;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 8:
                        res = _context72.sent;
                        data = res.data;
                        return _context72.abrupt("return", data);

                      case 11:
                      case "end":
                        return _context72.stop();
                    }
                  }
                }, _callee72, this);
              }));
              return _getFobj.apply(this, arguments);
            };

            getFobj = function _ref165(_x83) {
              return _getFobj.apply(this, arguments);
            };

            _putFobj = function _ref164() {
              _putFobj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee71(fobj_key, fobj_update) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee71$(_context71) {
                  while (1) {
                    switch (_context71.prev = _context71.next) {
                      case 0:
                        _context71.prev = 0;
                        API_PATH = '/fobj/' + fobj_key;
                        url = encodeURI(API_END_POINT + API_PATH); //因为我们支持中文字符作为key，那么在修改和删除的时候,url上都与有中文,如果不用encodeURI,就会在aliyun.client这个SDK报 Reqeust Path contains unescaped characters 的错误 

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //如果在path里有key变量,那么在body里不能有key变量了，否则凉凉，key变量哪都没了。

                        };
                        console.log(fobj_update);
                        fobj_update["param"] = JSON.stringify(fobj_update["param"]);
                        _context71.next = 9;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: fobj_update
                        });

                      case 9:
                        res = _context71.sent;
                        data = res.data;
                        return _context71.abrupt("return", data);

                      case 14:
                        _context71.prev = 14;
                        _context71.t0 = _context71["catch"](0);
                        return _context71.abrupt("return", {
                          error: 2,
                          reason: _context71.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context71.stop();
                    }
                  }
                }, _callee71, this, [[0, 14]]);
              }));
              return _putFobj.apply(this, arguments);
            };

            putFobj = function _ref163(_x81, _x82) {
              return _putFobj.apply(this, arguments);
            };

            _delFobj = function _ref162() {
              _delFobj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee70(fobj_key) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee70$(_context70) {
                  while (1) {
                    switch (_context70.prev = _context70.next) {
                      case 0:
                        _context70.prev = 0;
                        API_PATH = '/fobj/' + fobj_key;
                        url = encodeURI(API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(fobj_key) || typeof fobj_key !== 'string')) {
                          _context70.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: obj_key is required as string');

                      case 7:
                        _context70.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context70.sent;
                        data = res.data;
                        return _context70.abrupt("return", data);

                      case 14:
                        _context70.prev = 14;
                        _context70.t0 = _context70["catch"](0);
                        return _context70.abrupt("return", {
                          error: 2,
                          reason: _context70.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context70.stop();
                    }
                  }
                }, _callee70, this, [[0, 14]]);
              }));
              return _delFobj.apply(this, arguments);
            };

            delFobj = function _ref161(_x80) {
              return _delFobj.apply(this, arguments);
            };

            _addFobj = function _ref160() {
              _addFobj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee69(_ref17) {
                var url, param, name, note, cato, size, idx1, idx2, idx3, idx4, API_PATH, api_url, localToken, headers, add_params, res, data;
                return regeneratorRuntime.wrap(function _callee69$(_context69) {
                  while (1) {
                    switch (_context69.prev = _context69.next) {
                      case 0:
                        url = _ref17.url, param = _ref17.param, name = _ref17.name, note = _ref17.note, cato = _ref17.cato, size = _ref17.size, idx1 = _ref17.idx1, idx2 = _ref17.idx2, idx3 = _ref17.idx3, idx4 = _ref17.idx4;
                        _context69.prev = 1;
                        API_PATH = '/fobj';
                        api_url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(url) || typeof url !== 'string')) {
                          _context69.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: url is required as string');

                      case 8:
                        if (!(_.isNil(size) || typeof size !== 'number')) {
                          _context69.next = 10;
                          break;
                        }

                        throw new ArgumentError('Integer Type Field: size is required as number');

                      case 10:
                        if (_.isNil(param) || typeof url !== 'string') {
                          param = null;
                        } //字符串,数字,对象都会成功字符串化.


                        param = JSON.stringify(param); //总结一个非常高端的BUG,下面这个地方,必须要有let, 如果没有let,自己是能够跑通的,但是,如果别人把这个SDK转成ES5标准,就会出现
                        //Can't find variable add_params
                        //问题就是转换成ES5后,add_params这个变量就丢失了.

                        add_params = {
                          url: url,
                          param: param,
                          note: note,
                          name: name,
                          cato: cato,
                          idx1: idx1,
                          idx2: idx2,
                          idx3: idx3,
                          idx4: idx4,
                          size: size
                        };
                        _context69.next = 15;
                        return aliYunClient.post({
                          url: api_url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: add_params
                        });

                      case 15:
                        res = _context69.sent;
                        data = res.data;
                        return _context69.abrupt("return", data);

                      case 20:
                        _context69.prev = 20;
                        _context69.t0 = _context69["catch"](1);
                        return _context69.abrupt("return", {
                          error: 1,
                          reason: _context69.t0,
                          debug: _context69.t0
                        });

                      case 23:
                      case "end":
                        return _context69.stop();
                    }
                  }
                }, _callee69, this, [[1, 20]]);
              }));
              return _addFobj.apply(this, arguments);
            };

            addFobj = function _ref159(_x79) {
              return _addFobj.apply(this, arguments);
            };

            _hasObj = function _ref158() {
              _hasObj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee68(filter) {
                var _api_path14, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee68$(_context68) {
                  while (1) {
                    switch (_context68.prev = _context68.next) {
                      case 0:
                        _context68.prev = 0;
                        _api_path14 = '/obj';

                        if (JSON.stringify(filter) !== '{}') {
                          _api_path14 = '/obj?';
                        }

                        filter = JSON.stringify(filter);
                        _api_path14 = _api_path14 + 'hasonly=1&filter=' + filter;
                        API_PATH = _api_path14;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context68.next = 11;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 11:
                        res = _context68.sent;
                        //console.log(res);
                        data = res.data;
                        return _context68.abrupt("return", data);

                      case 16:
                        _context68.prev = 16;
                        _context68.t0 = _context68["catch"](0);
                        return _context68.abrupt("return", {
                          error: 2,
                          reason: _context68.t0,
                          result: {},
                          debug: {}
                        });

                      case 19:
                      case "end":
                        return _context68.stop();
                    }
                  }
                }, _callee68, this, [[0, 16]]);
              }));
              return _hasObj.apply(this, arguments);
            };

            hasObj = function _ref157(_x78) {
              return _hasObj.apply(this, arguments);
            };

            _qryObj = function _ref156() {
              _qryObj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee67(param) {
                var _api_path13, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee67$(_context67) {
                  while (1) {
                    switch (_context67.prev = _context67.next) {
                      case 0:
                        _context67.prev = 0;
                        _api_path13 = '/obj';

                        if (JSON.stringify(param) !== '{}') {
                          _api_path13 = '/obj?';
                        }

                        param["filter"] = JSON.stringify(param["filter"]);

                        if (param["group"]) {
                          param["group"] = JSON.stringify(param["group"]);
                        }

                        for (key in param) {
                          _api_path13 = _api_path13 + '&' + key + '=' + param[key];
                        }

                        API_PATH = _api_path13; //电话号码的+86的+号会在Url丢失
                        //const url = encodeURI(API_END_POINT + API_PATH) 

                        url = API_END_POINT + API_PATH;
                        console.log(url);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context67.next = 13;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 13:
                        res = _context67.sent;
                        //console.log(res);
                        data = res.data;
                        return _context67.abrupt("return", data);

                      case 18:
                        _context67.prev = 18;
                        _context67.t0 = _context67["catch"](0);
                        return _context67.abrupt("return", {
                          error: 2,
                          reason: _context67.t0,
                          result: {},
                          debug: {}
                        });

                      case 21:
                      case "end":
                        return _context67.stop();
                    }
                  }
                }, _callee67, this, [[0, 18]]);
              }));
              return _qryObj.apply(this, arguments);
            };

            qryObj = function _ref155(_x77) {
              return _qryObj.apply(this, arguments);
            };

            _getObj = function _ref154() {
              _getObj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee66(obj_key) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee66$(_context66) {
                  while (1) {
                    switch (_context66.prev = _context66.next) {
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
                          _context66.next = 6;
                          break;
                        }

                        throw new ArgumentError('String Type Field: obj_key  is required as string');

                      case 6:
                        _context66.next = 8;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 8:
                        res = _context66.sent;
                        //console.log(res);
                        data = res.data;
                        return _context66.abrupt("return", data);

                      case 11:
                      case "end":
                        return _context66.stop();
                    }
                  }
                }, _callee66, this);
              }));
              return _getObj.apply(this, arguments);
            };

            getObj = function _ref153(_x76) {
              return _getObj.apply(this, arguments);
            };

            _putObj = function _ref152() {
              _putObj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee65(obj_key, obj_value) {
                var API_PATH, url, localToken, headers, obj_value_type, obj_value_str, res, data;
                return regeneratorRuntime.wrap(function _callee65$(_context65) {
                  while (1) {
                    switch (_context65.prev = _context65.next) {
                      case 0:
                        _context65.prev = 0;
                        API_PATH = '/obj/' + obj_key;
                        url = encodeURI(API_END_POINT + API_PATH); //因为我们支持中文字符作为key，那么在修改和删除的时候,url上都与有中文,如果不用encodeURI,就会在aliyun.client这个SDK报 Reqeust Path contains unescaped characters 的错误 

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //console.log(url);
                          //字符串,数字,对象都会成功字符串化.
                          //下面的obj_value一定要用let

                        };
                        obj_value_type = _typeof(obj_value);
                        obj_value_str = String(obj_value);

                        if (obj_value_type == "object") {
                          obj_value_str = JSON.stringify(obj_value);
                        }

                        _context65.next = 10;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            value: obj_value_str
                          }
                        });

                      case 10:
                        res = _context65.sent;
                        data = res.data;
                        return _context65.abrupt("return", data);

                      case 15:
                        _context65.prev = 15;
                        _context65.t0 = _context65["catch"](0);
                        return _context65.abrupt("return", {
                          error: 2,
                          reason: _context65.t0,
                          result: {},
                          debug: {}
                        });

                      case 18:
                      case "end":
                        return _context65.stop();
                    }
                  }
                }, _callee65, this, [[0, 15]]);
              }));
              return _putObj.apply(this, arguments);
            };

            putObj = function _ref151(_x74, _x75) {
              return _putObj.apply(this, arguments);
            };

            _delObjs = function _ref150() {
              _delObjs = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee64(param) {
                var _api_path12, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee64$(_context64) {
                  while (1) {
                    switch (_context64.prev = _context64.next) {
                      case 0:
                        _context64.prev = 0;
                        _api_path12 = '/obj';

                        if (JSON.stringify(param) !== '{}') {
                          _api_path12 = '/obj?';
                        }

                        param["action"] = "DELS"; //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量

                        param["filter"] = JSON.stringify(param["filter"]);

                        for (key in param) {
                          _api_path12 = _api_path12 + '&' + key + '=' + param[key];
                        }

                        API_PATH = _api_path12; //电话号码的+86的+号会在Url丢失
                        //const url = encodeURI(API_END_POINT + API_PATH) 

                        url = API_END_POINT + API_PATH;
                        console.log(url);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context64.next = 13;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 13:
                        res = _context64.sent;
                        //console.log(res);
                        data = res.data;
                        return _context64.abrupt("return", data);

                      case 18:
                        _context64.prev = 18;
                        _context64.t0 = _context64["catch"](0);
                        return _context64.abrupt("return", {
                          error: 2,
                          reason: _context64.t0,
                          result: {},
                          debug: {}
                        });

                      case 21:
                      case "end":
                        return _context64.stop();
                    }
                  }
                }, _callee64, this, [[0, 18]]);
              }));
              return _delObjs.apply(this, arguments);
            };

            delObjs = function _ref149(_x73) {
              return _delObjs.apply(this, arguments);
            };

            _delObj = function _ref148() {
              _delObj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee63(obj_key) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee63$(_context63) {
                  while (1) {
                    switch (_context63.prev = _context63.next) {
                      case 0:
                        _context63.prev = 0;
                        API_PATH = '/obj/' + obj_key;
                        url = encodeURI(API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(obj_key) || typeof obj_key !== 'string')) {
                          _context63.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: obj_key is required as string');

                      case 7:
                        _context63.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context63.sent;
                        data = res.data;
                        return _context63.abrupt("return", data);

                      case 14:
                        _context63.prev = 14;
                        _context63.t0 = _context63["catch"](0);
                        return _context63.abrupt("return", {
                          error: 2,
                          reason: _context63.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context63.stop();
                    }
                  }
                }, _callee63, this, [[0, 14]]);
              }));
              return _delObj.apply(this, arguments);
            };

            delObj = function _ref147(_x72) {
              return _delObj.apply(this, arguments);
            };

            _addObj = function _ref146() {
              _addObj = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee62(_ref16) {
                var name, value, type, key1, key2, key3, key4, readonly, API_PATH, url, localToken, headers, add_params, res, data;
                return regeneratorRuntime.wrap(function _callee62$(_context62) {
                  while (1) {
                    switch (_context62.prev = _context62.next) {
                      case 0:
                        name = _ref16.name, value = _ref16.value, type = _ref16.type, key1 = _ref16.key1, key2 = _ref16.key2, key3 = _ref16.key3, key4 = _ref16.key4, readonly = _ref16.readonly;
                        _context62.prev = 1;
                        API_PATH = '/obj';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(name) || typeof name !== 'string')) {
                          _context62.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: name is required as string');

                      case 8:
                        //字符串,数字,对象都会成功字符串化.
                        value = JSON.stringify(value); //总结一个非常高端的BUG,下面这个地方,必须要有let, 如果没有let,自己是能够跑通的,但是,如果别人把这个SDK转成ES5标准,就会出现
                        //Can't find variable add_params
                        //问题就是转换成ES5后,add_params这个变量就丢失了.

                        add_params = {
                          name: name,
                          value: value
                        };

                        if (!_.isNil(key1)) {
                          add_params.key1 = key1;
                        }

                        if (!_.isNil(type)) {
                          add_params.type = type;
                        }

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

                        _context62.next = 18;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: add_params
                        });

                      case 18:
                        res = _context62.sent;
                        data = res.data;
                        return _context62.abrupt("return", data);

                      case 23:
                        _context62.prev = 23;
                        _context62.t0 = _context62["catch"](1);
                        return _context62.abrupt("return", {
                          error: 1,
                          reason: _context62.t0,
                          debug: _context62.t0
                        });

                      case 26:
                      case "end":
                        return _context62.stop();
                    }
                  }
                }, _callee62, this, [[1, 23]]);
              }));
              return _addObj.apply(this, arguments);
            };

            addObj = function _ref145(_x71) {
              return _addObj.apply(this, arguments);
            };

            _qryApp2 = function _ref144() {
              _qryApp2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee61(param) {
                var _api_path11, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee61$(_context61) {
                  while (1) {
                    switch (_context61.prev = _context61.next) {
                      case 0:
                        _context61.prev = 0;
                        _api_path11 = '/app';

                        if (JSON.stringify(param) !== '{}') {
                          _api_path11 = '/app?';
                        }

                        for (key in param) {
                          _api_path11 = _api_path11 + '&' + key + '=' + param[key]; //console.log("key: " + key + " ,value: " + param[key]);
                        }

                        API_PATH = _api_path11;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context61.next = 10;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 10:
                        res = _context61.sent;
                        //console.log(res);
                        data = res.data;
                        return _context61.abrupt("return", data);

                      case 15:
                        _context61.prev = 15;
                        _context61.t0 = _context61["catch"](0);
                        return _context61.abrupt("return", {
                          error: 2,
                          reason: _context61.t0,
                          result: {},
                          debug: {}
                        });

                      case 18:
                      case "end":
                        return _context61.stop();
                    }
                  }
                }, _callee61, this, [[0, 15]]);
              }));
              return _qryApp2.apply(this, arguments);
            };

            qryApp = function _ref143(_x70) {
              return _qryApp2.apply(this, arguments);
            };

            _getApp2 = function _ref142() {
              _getApp2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee60(app_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee60$(_context60) {
                  while (1) {
                    switch (_context60.prev = _context60.next) {
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
                          _context60.next = 6;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 6:
                        _context60.next = 8;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 8:
                        res = _context60.sent;
                        //console.log(res);
                        data = res.data;
                        return _context60.abrupt("return", data);

                      case 11:
                      case "end":
                        return _context60.stop();
                    }
                  }
                }, _callee60, this);
              }));
              return _getApp2.apply(this, arguments);
            };

            getApp = function _ref141(_x69) {
              return _getApp2.apply(this, arguments);
            };

            _putApp2 = function _ref140() {
              _putApp2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee59(app_id, put_param) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee59$(_context59) {
                  while (1) {
                    switch (_context59.prev = _context59.next) {
                      case 0:
                        _context59.prev = 0;
                        API_PATH = '/app/' + app_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };
                        _context59.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context59.sent;
                        data = res.data;
                        return _context59.abrupt("return", data);

                      case 12:
                        _context59.prev = 12;
                        _context59.t0 = _context59["catch"](0);
                        return _context59.abrupt("return", {
                          error: 2,
                          reason: _context59.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context59.stop();
                    }
                  }
                }, _callee59, this, [[0, 12]]);
              }));
              return _putApp2.apply(this, arguments);
            };

            putApp = function _ref139(_x67, _x68) {
              return _putApp2.apply(this, arguments);
            };

            _delApp2 = function _ref138() {
              _delApp2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee58(app_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee58$(_context58) {
                  while (1) {
                    switch (_context58.prev = _context58.next) {
                      case 0:
                        _context58.prev = 0;
                        API_PATH = '/app/' + app_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(app_id) || typeof app_id !== 'string')) {
                          _context58.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: app_id is required as string');

                      case 7:
                        _context58.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context58.sent;
                        data = res.data;
                        return _context58.abrupt("return", data);

                      case 14:
                        _context58.prev = 14;
                        _context58.t0 = _context58["catch"](0);
                        return _context58.abrupt("return", {
                          error: 2,
                          reason: _context58.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context58.stop();
                    }
                  }
                }, _callee58, this, [[0, 14]]);
              }));
              return _delApp2.apply(this, arguments);
            };

            delApp = function _ref137(_x66) {
              return _delApp2.apply(this, arguments);
            };

            _addApp = function _ref136() {
              _addApp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee57(_ref15) {
                var pkg, name, ugrp_id, brief, avatar, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee57$(_context57) {
                  while (1) {
                    switch (_context57.prev = _context57.next) {
                      case 0:
                        pkg = _ref15.pkg, name = _ref15.name, ugrp_id = _ref15.ugrp_id, brief = _ref15.brief, avatar = _ref15.avatar;
                        _context57.prev = 1;
                        API_PATH = '/app';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(name) || typeof name !== 'string')) {
                          _context57.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: name is required as string not ' + _typeof(name));

                      case 8:
                        if (!(_.isNil(brief) || typeof brief !== 'string')) {
                          _context57.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: brief is required as string');

                      case 10:
                        _context57.next = 12;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            name: name,
                            brief: brief,
                            avatar: avatar
                          }
                        });

                      case 12:
                        res = _context57.sent;
                        data = res.data;
                        return _context57.abrupt("return", data);

                      case 17:
                        _context57.prev = 17;
                        _context57.t0 = _context57["catch"](1);
                        return _context57.abrupt("return", {
                          error: 2,
                          reason: _context57.t0,
                          result: {},
                          debug: {}
                        });

                      case 20:
                      case "end":
                        return _context57.stop();
                    }
                  }
                }, _callee57, this, [[1, 17]]);
              }));
              return _addApp.apply(this, arguments);
            };

            addApp = function _ref135(_x65) {
              return _addApp.apply(this, arguments);
            };

            _qryApp = function _ref134() {
              _qryApp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee56(param) {
                var _api_path10, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee56$(_context56) {
                  while (1) {
                    switch (_context56.prev = _context56.next) {
                      case 0:
                        _context56.prev = 0;
                        _api_path10 = '/app';

                        if (JSON.stringify(param) !== '{}') {
                          _api_path10 = '/app?';
                        }

                        for (key in param) {
                          _api_path10 = _api_path10 + '&' + key + '=' + param[key];
                        }

                        API_PATH = _api_path10;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context56.next = 10;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 10:
                        res = _context56.sent;
                        //console.log(res);
                        data = res.data;
                        return _context56.abrupt("return", data);

                      case 15:
                        _context56.prev = 15;
                        _context56.t0 = _context56["catch"](0);
                        return _context56.abrupt("return", {
                          error: 2,
                          reason: _context56.t0,
                          result: {},
                          debug: {}
                        });

                      case 18:
                      case "end":
                        return _context56.stop();
                    }
                  }
                }, _callee56, this, [[0, 15]]);
              }));
              return _qryApp.apply(this, arguments);
            };

            qryApp = function _ref133(_x64) {
              return _qryApp.apply(this, arguments);
            };

            _getApp = function _ref132() {
              _getApp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee55(app_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee55$(_context55) {
                  while (1) {
                    switch (_context55.prev = _context55.next) {
                      case 0:
                        _context55.prev = 0;
                        API_PATH = '/app/' + app_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(app_id) || typeof app_id !== 'string')) {
                          _context55.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 7:
                        _context55.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context55.sent;
                        //console.log(res);
                        data = res.data;
                        return _context55.abrupt("return", data);

                      case 14:
                        _context55.prev = 14;
                        _context55.t0 = _context55["catch"](0);
                        return _context55.abrupt("return", {
                          error: 2,
                          reason: _context55.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context55.stop();
                    }
                  }
                }, _callee55, this, [[0, 14]]);
              }));
              return _getApp.apply(this, arguments);
            };

            getApp = function _ref131(_x63) {
              return _getApp.apply(this, arguments);
            };

            _putApp = function _ref130() {
              _putApp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee54(app_id, put_param) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee54$(_context54) {
                  while (1) {
                    switch (_context54.prev = _context54.next) {
                      case 0:
                        _context54.prev = 0;
                        API_PATH = '/app/' + app_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };
                        _context54.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context54.sent;
                        data = res.data;
                        return _context54.abrupt("return", data);

                      case 12:
                        _context54.prev = 12;
                        _context54.t0 = _context54["catch"](0);
                        return _context54.abrupt("return", {
                          error: 2,
                          reason: _context54.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context54.stop();
                    }
                  }
                }, _callee54, this, [[0, 12]]);
              }));
              return _putApp.apply(this, arguments);
            };

            putApp = function _ref129(_x61, _x62) {
              return _putApp.apply(this, arguments);
            };

            _delApp = function _ref128() {
              _delApp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee53(app_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee53$(_context53) {
                  while (1) {
                    switch (_context53.prev = _context53.next) {
                      case 0:
                        _context53.prev = 0;
                        API_PATH = '/app/' + app_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(app_id) || typeof app_id !== 'string')) {
                          _context53.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: app_id is required as string');

                      case 7:
                        _context53.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context53.sent;
                        data = res.data;
                        return _context53.abrupt("return", data);

                      case 14:
                        _context53.prev = 14;
                        _context53.t0 = _context53["catch"](0);
                        return _context53.abrupt("return", {
                          error: 2,
                          reason: _context53.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context53.stop();
                    }
                  }
                }, _callee53, this, [[0, 14]]);
              }));
              return _delApp.apply(this, arguments);
            };

            delApp = function _ref127(_x60) {
              return _delApp.apply(this, arguments);
            };

            _qryUaff = function _ref126() {
              _qryUaff = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee52(param) {
                var _api_path9, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee52$(_context52) {
                  while (1) {
                    switch (_context52.prev = _context52.next) {
                      case 0:
                        _context52.prev = 0;
                        _api_path9 = '/uaff';

                        if (JSON.stringify(param) !== '{}') {
                          _api_path9 = '/uaff?';
                        }

                        for (key in param) {
                          _api_path9 = _api_path9 + '&' + key + '=' + param[key];
                        }

                        API_PATH = _api_path9;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context52.next = 10;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 10:
                        res = _context52.sent;
                        //console.log(res);
                        data = res.data;
                        return _context52.abrupt("return", data);

                      case 15:
                        _context52.prev = 15;
                        _context52.t0 = _context52["catch"](0);
                        return _context52.abrupt("return", {
                          error: 2,
                          reason: _context52.t0,
                          result: {},
                          debug: {}
                        });

                      case 18:
                      case "end":
                        return _context52.stop();
                    }
                  }
                }, _callee52, this, [[0, 15]]);
              }));
              return _qryUaff.apply(this, arguments);
            };

            qryUaff = function _ref125(_x59) {
              return _qryUaff.apply(this, arguments);
            };

            _getUaff = function _ref124() {
              _getUaff = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee51(uaff_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee51$(_context51) {
                  while (1) {
                    switch (_context51.prev = _context51.next) {
                      case 0:
                        _context51.prev = 0;
                        API_PATH = '/uaff/' + uaff_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(uaff_id) || typeof uaff_id !== 'string')) {
                          _context51.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 7:
                        _context51.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context51.sent;
                        //console.log(res);
                        data = res.data;
                        return _context51.abrupt("return", data);

                      case 14:
                        _context51.prev = 14;
                        _context51.t0 = _context51["catch"](0);
                        return _context51.abrupt("return", {
                          error: 2,
                          reason: _context51.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context51.stop();
                    }
                  }
                }, _callee51, this, [[0, 14]]);
              }));
              return _getUaff.apply(this, arguments);
            };

            getUaff = function _ref123(_x58) {
              return _getUaff.apply(this, arguments);
            };

            _putUaff = function _ref122() {
              _putUaff = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee50(uaff_id, put_param) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee50$(_context50) {
                  while (1) {
                    switch (_context50.prev = _context50.next) {
                      case 0:
                        _context50.prev = 0;
                        API_PATH = '/uaff/' + uaff_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };
                        _context50.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context50.sent;
                        data = res.data;
                        return _context50.abrupt("return", data);

                      case 12:
                        _context50.prev = 12;
                        _context50.t0 = _context50["catch"](0);
                        return _context50.abrupt("return", {
                          error: 2,
                          reason: _context50.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context50.stop();
                    }
                  }
                }, _callee50, this, [[0, 12]]);
              }));
              return _putUaff.apply(this, arguments);
            };

            putUaff = function _ref121(_x56, _x57) {
              return _putUaff.apply(this, arguments);
            };

            _delUaff = function _ref120() {
              _delUaff = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee49(uaff_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee49$(_context49) {
                  while (1) {
                    switch (_context49.prev = _context49.next) {
                      case 0:
                        _context49.prev = 0;
                        API_PATH = '/uaff/' + uaff_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(uaff_id) || typeof uaff_id !== 'string')) {
                          _context49.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: uaff_id is required as string');

                      case 7:
                        _context49.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context49.sent;
                        data = res.data;
                        return _context49.abrupt("return", data);

                      case 14:
                        _context49.prev = 14;
                        _context49.t0 = _context49["catch"](0);
                        return _context49.abrupt("return", {
                          error: 2,
                          reason: _context49.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context49.stop();
                    }
                  }
                }, _callee49, this, [[0, 14]]);
              }));
              return _delUaff.apply(this, arguments);
            };

            delUaff = function _ref119(_x55) {
              return _delUaff.apply(this, arguments);
            };

            _addUaff = function _ref118() {
              _addUaff = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee48(_ref14) {
                var user_id, ugrp_id, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee48$(_context48) {
                  while (1) {
                    switch (_context48.prev = _context48.next) {
                      case 0:
                        user_id = _ref14.user_id, ugrp_id = _ref14.ugrp_id;
                        _context48.prev = 1;
                        API_PATH = '/uaff';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(user_id) || typeof user_id !== 'string')) {
                          _context48.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 8:
                        if (!(_.isNil(ugrp_id) || typeof ugrp_id !== 'string')) {
                          _context48.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: ugrp_id is required as string');

                      case 10:
                        _context48.next = 12;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            user_id: user_id,
                            ugrp_id: ugrp_id
                          }
                        });

                      case 12:
                        res = _context48.sent;
                        data = res.data;
                        return _context48.abrupt("return", data);

                      case 17:
                        _context48.prev = 17;
                        _context48.t0 = _context48["catch"](1);
                        return _context48.abrupt("return", {
                          error: 2,
                          reason: _context48.t0,
                          result: {},
                          debug: {}
                        });

                      case 20:
                      case "end":
                        return _context48.stop();
                    }
                  }
                }, _callee48, this, [[1, 17]]);
              }));
              return _addUaff.apply(this, arguments);
            };

            addUaff = function _ref117(_x54) {
              return _addUaff.apply(this, arguments);
            };

            _qryUsro = function _ref116() {
              _qryUsro = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee47(param) {
                var _api_path8, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee47$(_context47) {
                  while (1) {
                    switch (_context47.prev = _context47.next) {
                      case 0:
                        _context47.prev = 0;
                        _api_path8 = '/usro';

                        if (JSON.stringify(param) !== '{}') {
                          _api_path8 = '/usro?';
                        } //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量


                        param["filter"] = JSON.stringify(param["filter"]);

                        for (key in param) {
                          _api_path8 = _api_path8 + '&' + key + '=' + param[key];
                        }

                        API_PATH = _api_path8;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context47.next = 11;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 11:
                        res = _context47.sent;
                        //console.log(res);
                        data = res.data;
                        return _context47.abrupt("return", data);

                      case 16:
                        _context47.prev = 16;
                        _context47.t0 = _context47["catch"](0);
                        return _context47.abrupt("return", {
                          error: 2,
                          reason: _context47.t0,
                          result: {},
                          debug: {}
                        });

                      case 19:
                      case "end":
                        return _context47.stop();
                    }
                  }
                }, _callee47, this, [[0, 16]]);
              }));
              return _qryUsro.apply(this, arguments);
            };

            qryUsro = function _ref115(_x53) {
              return _qryUsro.apply(this, arguments);
            };

            _getUsro = function _ref114() {
              _getUsro = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee46(usro_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee46$(_context46) {
                  while (1) {
                    switch (_context46.prev = _context46.next) {
                      case 0:
                        _context46.prev = 0;
                        API_PATH = '/usro/' + usro_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(usro_id) || typeof usro_id !== 'string')) {
                          _context46.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 7:
                        _context46.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context46.sent;
                        //console.log(res);
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
              return _getUsro.apply(this, arguments);
            };

            getUsro = function _ref113(_x52) {
              return _getUsro.apply(this, arguments);
            };

            _putUsro = function _ref112() {
              _putUsro = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee45(usro_id, put_param) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee45$(_context45) {
                  while (1) {
                    switch (_context45.prev = _context45.next) {
                      case 0:
                        _context45.prev = 0;
                        API_PATH = '/usro/' + usro_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };
                        _context45.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context45.sent;
                        //console.log(res);
                        data = res.data;
                        return _context45.abrupt("return", data);

                      case 12:
                        _context45.prev = 12;
                        _context45.t0 = _context45["catch"](0);
                        return _context45.abrupt("return", {
                          error: 2,
                          reason: _context45.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context45.stop();
                    }
                  }
                }, _callee45, this, [[0, 12]]);
              }));
              return _putUsro.apply(this, arguments);
            };

            putUsro = function _ref111(_x50, _x51) {
              return _putUsro.apply(this, arguments);
            };

            _delUsro = function _ref110() {
              _delUsro = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee44(usro_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee44$(_context44) {
                  while (1) {
                    switch (_context44.prev = _context44.next) {
                      case 0:
                        _context44.prev = 0;
                        API_PATH = '/usro/' + usro_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(usro_id) || typeof usro_id !== 'string')) {
                          _context44.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: usro_id is required as string');

                      case 7:
                        _context44.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context44.sent;
                        data = res.data;
                        return _context44.abrupt("return", data);

                      case 14:
                        _context44.prev = 14;
                        _context44.t0 = _context44["catch"](0);
                        return _context44.abrupt("return", {
                          error: 2,
                          reason: _context44.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context44.stop();
                    }
                  }
                }, _callee44, this, [[0, 14]]);
              }));
              return _delUsro.apply(this, arguments);
            };

            delUsro = function _ref109(_x49) {
              return _delUsro.apply(this, arguments);
            };

            _addUsro = function _ref108() {
              _addUsro = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee43(_ref13) {
                var role_id, ugrp_id, towho, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee43$(_context43) {
                  while (1) {
                    switch (_context43.prev = _context43.next) {
                      case 0:
                        role_id = _ref13.role_id, ugrp_id = _ref13.ugrp_id, towho = _ref13.towho;
                        _context43.prev = 1;
                        API_PATH = '/usro';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(role_id) || typeof role_id !== 'string')) {
                          _context43.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: role_id is required as string');

                      case 8:
                        if (!(_.isNil(towho) || typeof towho !== 'string')) {
                          _context43.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: towho is required as string not ' + (typeof name === "undefined" ? "undefined" : _typeof(name)));

                      case 10:
                        if (!(_.isNil(ugrp_id) || typeof ugrp_id !== 'string')) {
                          _context43.next = 12;
                          break;
                        }

                        throw new ArgumentError('String Type Field: ugrp_id is required as string');

                      case 12:
                        _context43.next = 14;
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
                        res = _context43.sent;
                        data = res.data;
                        return _context43.abrupt("return", data);

                      case 19:
                        _context43.prev = 19;
                        _context43.t0 = _context43["catch"](1);
                        return _context43.abrupt("return", {
                          error: 2,
                          reason: _context43.t0,
                          result: {},
                          debug: {}
                        });

                      case 22:
                      case "end":
                        return _context43.stop();
                    }
                  }
                }, _callee43, this, [[1, 19]]);
              }));
              return _addUsro.apply(this, arguments);
            };

            addUsro = function _ref107(_x48) {
              return _addUsro.apply(this, arguments);
            };

            _qryRoue = function _ref106() {
              _qryRoue = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee42(param) {
                var _api_path7, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee42$(_context42) {
                  while (1) {
                    switch (_context42.prev = _context42.next) {
                      case 0:
                        _context42.prev = 0;
                        _api_path7 = '/roue';

                        if (JSON.stringify(param) !== '{}') {
                          _api_path7 = '/roue?';
                        } //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量


                        param["filter"] = JSON.stringify(param["filter"]);

                        for (key in param) {
                          _api_path7 = _api_path7 + '&' + key + '=' + param[key];
                        }

                        API_PATH = _api_path7;
                        url = encodeURI(API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context42.next = 11;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 11:
                        res = _context42.sent;
                        data = res.data;
                        return _context42.abrupt("return", data);

                      case 16:
                        _context42.prev = 16;
                        _context42.t0 = _context42["catch"](0);
                        return _context42.abrupt("return", {
                          error: 2,
                          reason: _context42.t0,
                          result: {},
                          debug: {}
                        });

                      case 19:
                      case "end":
                        return _context42.stop();
                    }
                  }
                }, _callee42, this, [[0, 16]]);
              }));
              return _qryRoue.apply(this, arguments);
            };

            qryRoue = function _ref105(_x47) {
              return _qryRoue.apply(this, arguments);
            };

            _getRoue = function _ref104() {
              _getRoue = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee41(roue_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee41$(_context41) {
                  while (1) {
                    switch (_context41.prev = _context41.next) {
                      case 0:
                        _context41.prev = 0;
                        API_PATH = '/roue/' + roue_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };

                        if (!(_.isNil(roue_id) || typeof roue_id !== 'string')) {
                          _context41.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: roue_id is required as string');

                      case 7:
                        _context41.next = 9;
                        return aliYunClient.get({
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
              return _getRoue.apply(this, arguments);
            };

            getRoue = function _ref103(_x46) {
              return _getRoue.apply(this, arguments);
            };

            _putRoue = function _ref102() {
              _putRoue = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee40(roue_id, put_param) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee40$(_context40) {
                  while (1) {
                    switch (_context40.prev = _context40.next) {
                      case 0:
                        _context40.prev = 0;
                        API_PATH = '/roue/' + roue_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };
                        _context40.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context40.sent;
                        data = res.data;
                        return _context40.abrupt("return", data);

                      case 12:
                        _context40.prev = 12;
                        _context40.t0 = _context40["catch"](0);
                        return _context40.abrupt("return", {
                          error: 2,
                          reason: _context40.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context40.stop();
                    }
                  }
                }, _callee40, this, [[0, 12]]);
              }));
              return _putRoue.apply(this, arguments);
            };

            putRoue = function _ref101(_x44, _x45) {
              return _putRoue.apply(this, arguments);
            };

            _delRoue = function _ref100() {
              _delRoue = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee39(roue_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee39$(_context39) {
                  while (1) {
                    switch (_context39.prev = _context39.next) {
                      case 0:
                        _context39.prev = 0;
                        API_PATH = '/roue/' + roue_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };

                        if (!(_.isNil(roue_id) || typeof roue_id !== 'string')) {
                          _context39.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: roue_id is required as string');

                      case 7:
                        _context39.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context39.sent;
                        data = res.data;
                        return _context39.abrupt("return", data);

                      case 14:
                        _context39.prev = 14;
                        _context39.t0 = _context39["catch"](0);
                        console.log(_context39.t0);
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
                }, _callee39, this, [[0, 14]]);
              }));
              return _delRoue.apply(this, arguments);
            };

            delRoue = function _ref99(_x43) {
              return _delRoue.apply(this, arguments);
            };

            _delRoues = function _ref98() {
              _delRoues = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee38(param) {
                var _api_path6, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee38$(_context38) {
                  while (1) {
                    switch (_context38.prev = _context38.next) {
                      case 0:
                        _context38.prev = 0;
                        _api_path6 = '/roue';

                        if (JSON.stringify(param) !== '{}') {
                          _api_path6 = '/roue?';
                        }

                        param["action"] = "DELS"; //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量

                        param["filter"] = JSON.stringify(param["filter"]);

                        for (key in param) {
                          _api_path6 = _api_path6 + '&' + key + '=' + param[key];
                        }

                        API_PATH = _api_path6; //电话号码的+86的+号会在Url丢失
                        //const url = encodeURI(API_END_POINT + API_PATH) 

                        url = API_END_POINT + API_PATH;
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context38.next = 12;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 12:
                        res = _context38.sent;
                        //console.log(res);
                        data = res.data;
                        return _context38.abrupt("return", data);

                      case 17:
                        _context38.prev = 17;
                        _context38.t0 = _context38["catch"](0);
                        return _context38.abrupt("return", {
                          error: 2,
                          reason: _context38.t0,
                          result: {},
                          debug: {}
                        });

                      case 20:
                      case "end":
                        return _context38.stop();
                    }
                  }
                }, _callee38, this, [[0, 17]]);
              }));
              return _delRoues.apply(this, arguments);
            };

            delRoues = function _ref97(_x42) {
              return _delRoues.apply(this, arguments);
            };

            _addRoue = function _ref96() {
              _addRoue = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee37(_ref12) {
                var role_id, rule_id, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee37$(_context37) {
                  while (1) {
                    switch (_context37.prev = _context37.next) {
                      case 0:
                        role_id = _ref12.role_id, rule_id = _ref12.rule_id;
                        _context37.prev = 1;
                        API_PATH = '/roue';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };

                        if (!(_.isNil(role_id) || typeof role_id !== 'string')) {
                          _context37.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: role_id is required as string');

                      case 8:
                        if (!(_.isNil(rule_id) || typeof rule_id !== 'string')) {
                          _context37.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: rule_id is required as string');

                      case 10:
                        _context37.next = 12;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            role_id: role_id,
                            rule_id: rule_id
                          }
                        });

                      case 12:
                        res = _context37.sent;
                        data = res.data;
                        return _context37.abrupt("return", data);

                      case 17:
                        _context37.prev = 17;
                        _context37.t0 = _context37["catch"](1);
                        return _context37.abrupt("return", {
                          error: 2,
                          reason: _context37.t0,
                          result: {},
                          debug: {}
                        });

                      case 20:
                      case "end":
                        return _context37.stop();
                    }
                  }
                }, _callee37, this, [[1, 17]]);
              }));
              return _addRoue.apply(this, arguments);
            };

            addRoue = function _ref95(_x41) {
              return _addRoue.apply(this, arguments);
            };

            _qryRule = function _ref94() {
              _qryRule = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee36(param) {
                var _api_path5, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee36$(_context36) {
                  while (1) {
                    switch (_context36.prev = _context36.next) {
                      case 0:
                        _context36.prev = 0;
                        _api_path5 = '/rule';

                        if (JSON.stringify(param) !== '{}') {
                          _api_path5 = '/rule?';
                        } //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量


                        param["filter"] = JSON.stringify(param["filter"]);

                        for (key in param) {
                          _api_path5 = _api_path5 + '&' + key + '=' + param[key];
                        } //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量


                        param["filter"] = JSON.stringify(param["filter"]);

                        for (key in param) {
                          _api_path5 = _api_path5 + '&' + key + '=' + param[key];
                        }

                        for (key in param) {
                          _api_path5 = _api_path5 + '&' + key + '=' + param[key];
                        }

                        API_PATH = _api_path5;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context36.next = 14;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 14:
                        res = _context36.sent;
                        data = res.data;
                        return _context36.abrupt("return", data);

                      case 19:
                        _context36.prev = 19;
                        _context36.t0 = _context36["catch"](0);
                        return _context36.abrupt("return", {
                          error: 2,
                          reason: _context36.t0,
                          result: {},
                          debug: {}
                        });

                      case 22:
                      case "end":
                        return _context36.stop();
                    }
                  }
                }, _callee36, this, [[0, 19]]);
              }));
              return _qryRule.apply(this, arguments);
            };

            qryRule = function _ref93(_x40) {
              return _qryRule.apply(this, arguments);
            };

            _getRule = function _ref92() {
              _getRule = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee35(rule_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee35$(_context35) {
                  while (1) {
                    switch (_context35.prev = _context35.next) {
                      case 0:
                        _context35.prev = 0;
                        API_PATH = '/rule/' + rule_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };

                        if (!(_.isNil(rule_id) || typeof rule_id !== 'string')) {
                          _context35.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: rule_id is required as string');

                      case 7:
                        _context35.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context35.sent;
                        data = res.data;
                        return _context35.abrupt("return", data);

                      case 14:
                        _context35.prev = 14;
                        _context35.t0 = _context35["catch"](0);
                        return _context35.abrupt("return", {
                          error: 2,
                          reason: _context35.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context35.stop();
                    }
                  }
                }, _callee35, this, [[0, 14]]);
              }));
              return _getRule.apply(this, arguments);
            };

            getRule = function _ref91(_x39) {
              return _getRule.apply(this, arguments);
            };

            _putRule = function _ref90() {
              _putRule = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee34(rule_id, put_param) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee34$(_context34) {
                  while (1) {
                    switch (_context34.prev = _context34.next) {
                      case 0:
                        _context34.prev = 0;
                        API_PATH = '/rule/' + rule_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };
                        _context34.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context34.sent;
                        data = res.data;
                        return _context34.abrupt("return", data);

                      case 12:
                        _context34.prev = 12;
                        _context34.t0 = _context34["catch"](0);
                        return _context34.abrupt("return", {
                          error: 2,
                          reason: _context34.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context34.stop();
                    }
                  }
                }, _callee34, this, [[0, 12]]);
              }));
              return _putRule.apply(this, arguments);
            };

            putRule = function _ref89(_x37, _x38) {
              return _putRule.apply(this, arguments);
            };

            _delRule = function _ref88() {
              _delRule = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee33(rule_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee33$(_context33) {
                  while (1) {
                    switch (_context33.prev = _context33.next) {
                      case 0:
                        _context33.prev = 0;
                        API_PATH = '/rule/' + rule_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };

                        if (!(_.isNil(rule_id) || typeof rule_id !== 'string')) {
                          _context33.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: rule_id is required as string');

                      case 7:
                        _context33.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context33.sent;
                        data = res.data;
                        return _context33.abrupt("return", data);

                      case 14:
                        _context33.prev = 14;
                        _context33.t0 = _context33["catch"](0);
                        console.log(_context33.t0);
                        return _context33.abrupt("return", {
                          error: 2,
                          reason: _context33.t0,
                          result: {},
                          debug: {}
                        });

                      case 18:
                      case "end":
                        return _context33.stop();
                    }
                  }
                }, _callee33, this, [[0, 14]]);
              }));
              return _delRule.apply(this, arguments);
            };

            delRule = function _ref87(_x36) {
              return _delRule.apply(this, arguments);
            };

            _addRule = function _ref86() {
              _addRule = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee32(_ref11) {
                var code, name, ugrp_id, extra, avatar, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee32$(_context32) {
                  while (1) {
                    switch (_context32.prev = _context32.next) {
                      case 0:
                        code = _ref11.code, name = _ref11.name, ugrp_id = _ref11.ugrp_id, extra = _ref11.extra, avatar = _ref11.avatar;
                        _context32.prev = 1;
                        API_PATH = '/rule';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken()
                        };

                        if (!(_.isNil(code) || typeof code !== 'string')) {
                          _context32.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: code is required as string');

                      case 8:
                        if (!(_.isNil(name) || typeof name !== 'string')) {
                          _context32.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: name is required as string not ' + _typeof(name));

                      case 10:
                        if (!(_.isNil(ugrp_id) || typeof ugrp_id !== 'string')) {
                          _context32.next = 12;
                          break;
                        }

                        throw new ArgumentError('String Type Field: ugrp_id is required as string');

                      case 12:
                        _context32.next = 14;
                        return aliYunClient.post({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            code: code,
                            name: name,
                            extra: extra,
                            avatar: avatar,
                            ugrp_id: ugrp_id
                          }
                        });

                      case 14:
                        res = _context32.sent;
                        data = res.data;
                        return _context32.abrupt("return", data);

                      case 19:
                        _context32.prev = 19;
                        _context32.t0 = _context32["catch"](1);
                        return _context32.abrupt("return", {
                          error: 2,
                          reason: _context32.t0,
                          result: {},
                          debug: {}
                        });

                      case 22:
                      case "end":
                        return _context32.stop();
                    }
                  }
                }, _callee32, this, [[1, 19]]);
              }));
              return _addRule.apply(this, arguments);
            };

            addRule = function _ref85(_x35) {
              return _addRule.apply(this, arguments);
            };

            _qryRole = function _ref84() {
              _qryRole = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee31(param) {
                var _api_path4, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee31$(_context31) {
                  while (1) {
                    switch (_context31.prev = _context31.next) {
                      case 0:
                        _context31.prev = 0;
                        _api_path4 = '/role';

                        if (JSON.stringify(param) !== '{}') {
                          _api_path4 = '/role?';
                        } //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量


                        param["filter"] = JSON.stringify(param["filter"]);

                        for (key in param) {
                          _api_path4 = _api_path4 + '&' + key + '=' + param[key];
                        }

                        console.log(_api_path4);
                        API_PATH = _api_path4;
                        url = encodeURI(API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context31.next = 12;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 12:
                        res = _context31.sent;
                        data = res.data;
                        return _context31.abrupt("return", data);

                      case 17:
                        _context31.prev = 17;
                        _context31.t0 = _context31["catch"](0);
                        return _context31.abrupt("return", {
                          error: 2,
                          reason: _context31.t0,
                          result: {},
                          debug: {}
                        });

                      case 20:
                      case "end":
                        return _context31.stop();
                    }
                  }
                }, _callee31, this, [[0, 17]]);
              }));
              return _qryRole.apply(this, arguments);
            };

            qryRole = function _ref83(_x34) {
              return _qryRole.apply(this, arguments);
            };

            _getRole = function _ref82() {
              _getRole = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee30(role_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee30$(_context30) {
                  while (1) {
                    switch (_context30.prev = _context30.next) {
                      case 0:
                        _context30.prev = 0;
                        API_PATH = '/role/' + role_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(role_id) || typeof role_id !== 'string')) {
                          _context30.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 7:
                        _context30.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context30.sent;
                        //console.log(res);
                        data = res.data;
                        return _context30.abrupt("return", data);

                      case 14:
                        _context30.prev = 14;
                        _context30.t0 = _context30["catch"](0);
                        return _context30.abrupt("return", {
                          error: 2,
                          reason: _context30.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context30.stop();
                    }
                  }
                }, _callee30, this, [[0, 14]]);
              }));
              return _getRole.apply(this, arguments);
            };

            getRole = function _ref81(_x33) {
              return _getRole.apply(this, arguments);
            };

            _putRole = function _ref80() {
              _putRole = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee29(role_id, put_param) {
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
                        _context29.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context29.sent;
                        data = res.data;
                        return _context29.abrupt("return", data);

                      case 12:
                        _context29.prev = 12;
                        _context29.t0 = _context29["catch"](0);
                        return _context29.abrupt("return", {
                          error: 2,
                          reason: _context29.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context29.stop();
                    }
                  }
                }, _callee29, this, [[0, 12]]);
              }));
              return _putRole.apply(this, arguments);
            };

            putRole = function _ref79(_x31, _x32) {
              return _putRole.apply(this, arguments);
            };

            _delRole = function _ref78() {
              _delRole = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee28(role_id) {
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

                        if (!(_.isNil(role_id) || typeof role_id !== 'string')) {
                          _context28.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: role_id is required as string');

                      case 7:
                        _context28.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context28.sent;
                        data = res.data;
                        return _context28.abrupt("return", data);

                      case 14:
                        _context28.prev = 14;
                        _context28.t0 = _context28["catch"](0);
                        console.log(_context28.t0);
                        return _context28.abrupt("return", {
                          error: 2,
                          reason: _context28.t0,
                          result: {},
                          debug: {}
                        });

                      case 18:
                      case "end":
                        return _context28.stop();
                    }
                  }
                }, _callee28, this, [[0, 14]]);
              }));
              return _delRole.apply(this, arguments);
            };

            delRole = function _ref77(_x30) {
              return _delRole.apply(this, arguments);
            };

            _addRole = function _ref76() {
              _addRole = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee27(_ref10) {
                var code, name, ugrp_id, granter, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee27$(_context27) {
                  while (1) {
                    switch (_context27.prev = _context27.next) {
                      case 0:
                        code = _ref10.code, name = _ref10.name, ugrp_id = _ref10.ugrp_id, granter = _ref10.granter;
                        _context27.prev = 1;
                        API_PATH = '/role';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(code) || typeof code !== 'string')) {
                          _context27.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: code is required as string');

                      case 8:
                        if (!(_.isNil(name) || typeof name !== 'string')) {
                          _context27.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: name is required as string not ' + _typeof(name));

                      case 10:
                        if (!(_.isNil(ugrp_id) || typeof ugrp_id !== 'string')) {
                          _context27.next = 12;
                          break;
                        }

                        throw new ArgumentError('String Type Field: ugrp_id is required as string');

                      case 12:
                        _context27.next = 14;
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
                        res = _context27.sent;
                        data = res.data;
                        return _context27.abrupt("return", data);

                      case 19:
                        _context27.prev = 19;
                        _context27.t0 = _context27["catch"](1);
                        console.log(_context27.t0);
                        return _context27.abrupt("return", {
                          error: 2,
                          reason: _context27.t0,
                          result: {},
                          debug: {}
                        });

                      case 23:
                      case "end":
                        return _context27.stop();
                    }
                  }
                }, _callee27, this, [[1, 19]]);
              }));
              return _addRole.apply(this, arguments);
            };

            addRole = function _ref75(_x29) {
              return _addRole.apply(this, arguments);
            };

            _qryZone = function _ref74() {
              _qryZone = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee26(param) {
                var _api_path3, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee26$(_context26) {
                  while (1) {
                    switch (_context26.prev = _context26.next) {
                      case 0:
                        _context26.prev = 0;
                        _api_path3 = '/zone';

                        if (JSON.stringify(param) !== '{}') {
                          _api_path3 = '/zone?';
                        } //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量


                        param["filter"] = JSON.stringify(param["filter"]);

                        for (key in param) {
                          _api_path3 = _api_path3 + '&' + key + '=' + param[key];
                        }

                        API_PATH = _api_path3;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context26.next = 11;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 11:
                        res = _context26.sent;
                        data = res.data;
                        return _context26.abrupt("return", data);

                      case 16:
                        _context26.prev = 16;
                        _context26.t0 = _context26["catch"](0);
                        console.log(_context26.t0);
                        return _context26.abrupt("return", {
                          error: 2,
                          reason: _context26.t0,
                          result: {}
                        });

                      case 20:
                      case "end":
                        return _context26.stop();
                    }
                  }
                }, _callee26, this, [[0, 16]]);
              }));
              return _qryZone.apply(this, arguments);
            };

            qryZone = function _ref73(_x28) {
              return _qryZone.apply(this, arguments);
            };

            _getZone = function _ref72() {
              _getZone = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee25(zone_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee25$(_context25) {
                  while (1) {
                    switch (_context25.prev = _context25.next) {
                      case 0:
                        _context25.prev = 0;
                        API_PATH = '/zone/' + zone_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: localToken //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(zone_id) || typeof zone_id !== 'string')) {
                          _context25.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 7:
                        _context25.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context25.sent;
                        data = res.data;
                        return _context25.abrupt("return", data);

                      case 14:
                        _context25.prev = 14;
                        _context25.t0 = _context25["catch"](0);
                        console.log(_context25.t0);
                        return _context25.abrupt("return", {
                          error: 2,
                          reason: _context25.t0,
                          result: {}
                        });

                      case 18:
                      case "end":
                        return _context25.stop();
                    }
                  }
                }, _callee25, this, [[0, 14]]);
              }));
              return _getZone.apply(this, arguments);
            };

            getZone = function _ref71(_x27) {
              return _getZone.apply(this, arguments);
            };

            _putZone = function _ref70() {
              _putZone = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee24(zone_id, put_param) {
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
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };
                        _context24.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context24.sent;
                        data = res.data;
                        return _context24.abrupt("return", data);

                      case 12:
                        _context24.prev = 12;
                        _context24.t0 = _context24["catch"](0);
                        return _context24.abrupt("return", {
                          error: 2,
                          reason: _context24.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context24.stop();
                    }
                  }
                }, _callee24, this, [[0, 12]]);
              }));
              return _putZone.apply(this, arguments);
            };

            putZone = function _ref69(_x25, _x26) {
              return _putZone.apply(this, arguments);
            };

            _delZone = function _ref68() {
              _delZone = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee23(zone_id) {
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
                          Authorization: getLocalToken()
                        };

                        if (!(_.isNil(zone_id) || typeof zone_id !== 'string')) {
                          _context23.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: zone_id is required as string');

                      case 7:
                        _context23.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context23.sent;
                        data = res.data;
                        return _context23.abrupt("return", data);

                      case 14:
                        _context23.prev = 14;
                        _context23.t0 = _context23["catch"](0);
                        return _context23.abrupt("return", {
                          error: 2,
                          reason: _context23.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context23.stop();
                    }
                  }
                }, _callee23, this, [[0, 14]]);
              }));
              return _delZone.apply(this, arguments);
            };

            delZone = function _ref67(_x24) {
              return _delZone.apply(this, arguments);
            };

            _addZone = function _ref66() {
              _addZone = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee22(_ref9) {
                var name, god_id, brief, avatar, pid, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee22$(_context22) {
                  while (1) {
                    switch (_context22.prev = _context22.next) {
                      case 0:
                        name = _ref9.name, god_id = _ref9.god_id, brief = _ref9.brief, avatar = _ref9.avatar, pid = _ref9.pid;
                        _context22.prev = 1;
                        API_PATH = '/zone';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(name) || typeof name !== 'string')) {
                          _context22.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: name is required as string not ' + _typeof(name));

                      case 8:
                        if (!(_.isNil(brief) || typeof brief !== 'string')) {
                          _context22.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: brief is required as string');

                      case 10:
                        _context22.next = 12;
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
                            pid: pid,
                            god_id: god_id
                          }
                        });

                      case 12:
                        res = _context22.sent;
                        data = res.data;
                        return _context22.abrupt("return", data);

                      case 17:
                        _context22.prev = 17;
                        _context22.t0 = _context22["catch"](1);
                        return _context22.abrupt("return", {
                          error: 1,
                          reason: _context22.t0,
                          debug: _context22.t0
                        });

                      case 20:
                      case "end":
                        return _context22.stop();
                    }
                  }
                }, _callee22, this, [[1, 17]]);
              }));
              return _addZone.apply(this, arguments);
            };

            addZone = function _ref65(_x23) {
              return _addZone.apply(this, arguments);
            };

            _qryUgrp = function _ref64() {
              _qryUgrp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee21(param) {
                var _api_path2, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee21$(_context21) {
                  while (1) {
                    switch (_context21.prev = _context21.next) {
                      case 0:
                        _context21.prev = 0;
                        _api_path2 = '/ugrp';

                        if (JSON.stringify(param) !== '{}') {
                          _api_path2 = '/ugrp?';
                        } //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量


                        param["filter"] = JSON.stringify(param["filter"]);

                        for (key in param) {
                          _api_path2 = _api_path2 + '&' + key + '=' + param[key];
                        }

                        API_PATH = _api_path2;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context21.next = 11;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 11:
                        res = _context21.sent;
                        data = res.data;
                        return _context21.abrupt("return", data);

                      case 16:
                        _context21.prev = 16;
                        _context21.t0 = _context21["catch"](0);
                        console.log(_context21.t0);
                        return _context21.abrupt("return", {
                          error: 2,
                          reason: _context21.t0,
                          result: {}
                        });

                      case 20:
                      case "end":
                        return _context21.stop();
                    }
                  }
                }, _callee21, this, [[0, 16]]);
              }));
              return _qryUgrp.apply(this, arguments);
            };

            qryUgrp = function _ref63(_x22) {
              return _qryUgrp.apply(this, arguments);
            };

            _getUgrp = function _ref62() {
              _getUgrp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee20(ugrp_id) {
                var API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee20$(_context20) {
                  while (1) {
                    switch (_context20.prev = _context20.next) {
                      case 0:
                        _context20.prev = 0;
                        API_PATH = '/ugrp/' + ugrp_id;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(ugrp_id) || typeof ugrp_id !== 'string')) {
                          _context20.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 7:
                        _context20.next = 9;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context20.sent;
                        //console.log(res);
                        data = res.data;
                        return _context20.abrupt("return", data);

                      case 14:
                        _context20.prev = 14;
                        _context20.t0 = _context20["catch"](0);
                        console.log(_context20.t0);
                        return _context20.abrupt("return", {
                          error: 2,
                          reason: _context20.t0,
                          result: {}
                        });

                      case 18:
                      case "end":
                        return _context20.stop();
                    }
                  }
                }, _callee20, this, [[0, 14]]);
              }));
              return _getUgrp.apply(this, arguments);
            };

            getUgrp = function _ref61(_x21) {
              return _getUgrp.apply(this, arguments);
            };

            _putUgrp = function _ref60() {
              _putUgrp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee19(ugrp_id, put_param) {
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
                        _context19.next = 7;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: put_param
                        });

                      case 7:
                        res = _context19.sent;
                        data = res.data;
                        return _context19.abrupt("return", data);

                      case 12:
                        _context19.prev = 12;
                        _context19.t0 = _context19["catch"](0);
                        return _context19.abrupt("return", {
                          error: 2,
                          reason: _context19.t0,
                          result: {},
                          debug: {}
                        });

                      case 15:
                      case "end":
                        return _context19.stop();
                    }
                  }
                }, _callee19, this, [[0, 12]]);
              }));
              return _putUgrp.apply(this, arguments);
            };

            putUgrp = function _ref59(_x19, _x20) {
              return _putUgrp.apply(this, arguments);
            };

            _delUgrp = function _ref58() {
              _delUgrp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee18(ugrp_id) {
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

                        if (!(_.isNil(ugrp_id) || typeof ugrp_id !== 'string')) {
                          _context18.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: ugrp_id is required as string');

                      case 7:
                        _context18.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context18.sent;
                        data = res.data;
                        return _context18.abrupt("return", data);

                      case 14:
                        _context18.prev = 14;
                        _context18.t0 = _context18["catch"](0);
                        return _context18.abrupt("return", {
                          error: 2,
                          reason: _context18.t0,
                          result: {},
                          debug: {}
                        });

                      case 17:
                      case "end":
                        return _context18.stop();
                    }
                  }
                }, _callee18, this, [[0, 14]]);
              }));
              return _delUgrp.apply(this, arguments);
            };

            delUgrp = function _ref57(_x18) {
              return _delUgrp.apply(this, arguments);
            };

            _addUgrp = function _ref56() {
              _addUgrp = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee17(_ref8) {
                var code, name, brief, avatar, pid, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee17$(_context17) {
                  while (1) {
                    switch (_context17.prev = _context17.next) {
                      case 0:
                        code = _ref8.code, name = _ref8.name, brief = _ref8.brief, avatar = _ref8.avatar, pid = _ref8.pid;
                        _context17.prev = 1;
                        API_PATH = '/ugrp';
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(code) || typeof code !== 'string')) {
                          _context17.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: code is required as string');

                      case 8:
                        if (!(_.isNil(name) || typeof name !== 'string')) {
                          _context17.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: name is required as string not ' + _typeof(name));

                      case 10:
                        if (!(_.isNil(brief) || typeof brief !== 'string')) {
                          _context17.next = 12;
                          break;
                        }

                        throw new ArgumentError('String Type Field: brief is required as string');

                      case 12:
                        _context17.next = 14;
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
                        res = _context17.sent;
                        data = res.data;
                        return _context17.abrupt("return", data);

                      case 19:
                        _context17.prev = 19;
                        _context17.t0 = _context17["catch"](1);
                        return _context17.abrupt("return", {
                          error: 1,
                          reason: _context17.t0,
                          debug: _context17.t0
                        });

                      case 22:
                      case "end":
                        return _context17.stop();
                    }
                  }
                }, _callee17, this, [[1, 19]]);
              }));
              return _addUgrp.apply(this, arguments);
            };

            addUgrp = function _ref55(_x17) {
              return _addUgrp.apply(this, arguments);
            };

            _qryUser = function _ref54() {
              _qryUser = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee16(param) {
                var _api_path, key, API_PATH, url, localToken, headers, res, data;

                return regeneratorRuntime.wrap(function _callee16$(_context16) {
                  while (1) {
                    switch (_context16.prev = _context16.next) {
                      case 0:
                        _context16.prev = 0;
                        _api_path = '/user';

                        if (JSON.stringify(param) !== '{}') {
                          _api_path = '/user?';
                        } //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量


                        param["where"] = JSON.stringify(param["where"]);

                        for (key in param) {
                          _api_path = _api_path + '&' + key + '=' + param[key];
                        }

                        API_PATH = _api_path; // Add '+86-' to the username, since we currently only support registration from China mainland
                        // 必须用encodeURI,否则如果按照name模糊查询的话,比如name~ "辣",这边网管SDK就会报出
                        // Request path contains unescaped characters 这种搞错

                        url = encodeURI(API_END_POINT + API_PATH);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context16.next = 11;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 11:
                        res = _context16.sent;
                        //console.log(res);
                        data = res.data;
                        return _context16.abrupt("return", data);

                      case 16:
                        _context16.prev = 16;
                        _context16.t0 = _context16["catch"](0);
                        return _context16.abrupt("return", {
                          error: 1,
                          reason: _context16.t0,
                          debug: _context16.t0
                        });

                      case 19:
                      case "end":
                        return _context16.stop();
                    }
                  }
                }, _callee16, this, [[0, 16]]);
              }));
              return _qryUser.apply(this, arguments);
            };

            qryUser = function _ref53(_x16) {
              return _qryUser.apply(this, arguments);
            };

            _getUser = function _ref52() {
              _getUser = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee15(_ref7) {
                var user_id, tabx, api_action, fields, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        user_id = _ref7.user_id, tabx = _ref7.tabx, api_action = _ref7.api_action, fields = _ref7.fields;
                        _context15.prev = 1;

                        if (!(api_action != "getuser" && api_action != 'getself')) {
                          _context15.next = 4;
                          break;
                        }

                        throw new ArgumentError('Invalid Api Action');

                      case 4:
                        if (!(_.isNil(user_id) || typeof user_id !== 'string')) {
                          _context15.next = 6;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 6:
                        if (!(_.isNil(tabx) || typeof tabx !== 'string')) {
                          _context15.next = 8;
                          break;
                        }

                        throw new ArgumentError('String Type Field: tabx is required as string');

                      case 8:
                        if (!(_.isNil(api_action) || typeof api_action !== 'string')) {
                          _context15.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: api_action is required as string');

                      case 10:
                        if (!(_.isNil(fields) || typeof fields !== 'string')) {
                          _context15.next = 12;
                          break;
                        }

                        throw new ArgumentError('String Type Field: fields is required as string');

                      case 12:
                        API_PATH = '/user/' + user_id + "?action=" + api_action + "&tabx=" + tabx + "&fields=" + fields;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        console.log(url);
                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password
                          //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}

                        };
                        _context15.next = 19;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 19:
                        res = _context15.sent;
                        data = res.data;
                        return _context15.abrupt("return", data);

                      case 24:
                        _context15.prev = 24;
                        _context15.t0 = _context15["catch"](1);
                        return _context15.abrupt("return", {
                          error: 1,
                          reason: _context15.t0,
                          debug: _context15.t0
                        });

                      case 27:
                      case "end":
                        return _context15.stop();
                    }
                  }
                }, _callee15, this, [[1, 24]]);
              }));
              return _getUser.apply(this, arguments);
            };

            getUser = function _ref51(_x15) {
              return _getUser.apply(this, arguments);
            };

            _putUser = function _ref50() {
              _putUser = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee14(user_id, tabx, update) {
                var API_PATH, url, localToken, headers, update_str, res, data;
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
                          Authorization: getLocalToken()
                        };
                        update_str = "";

                        if (!_.isNil(update)) {
                          update_str = JSON.stringify(update);
                        }

                        _context14.next = 9;
                        return aliYunClient.put({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          },
                          params: {
                            tabx: tabx,
                            update: update_str
                          }
                        });

                      case 9:
                        res = _context14.sent;
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
              return _putUser.apply(this, arguments);
            };

            putUser = function _ref49(_x12, _x13, _x14) {
              return _putUser.apply(this, arguments);
            };

            _delUser = function _ref48() {
              _delUser = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee13(user_id) {
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

                        if (!(_.isNil(user_id) || typeof user_id !== 'string')) {
                          _context13.next = 7;
                          break;
                        }

                        throw new ArgumentError('String Type Field: user_id is required as string');

                      case 7:
                        _context13.next = 9;
                        return aliYunClient.delete({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 9:
                        res = _context13.sent;
                        data = res.data;
                        return _context13.abrupt("return", data);

                      case 14:
                        _context13.prev = 14;
                        _context13.t0 = _context13["catch"](0);
                        return _context13.abrupt("return", {
                          error: 1,
                          reason: _context13.t0,
                          debug: _context13.t0
                        });

                      case 17:
                      case "end":
                        return _context13.stop();
                    }
                  }
                }, _callee13, this, [[0, 14]]);
              }));
              return _delUser.apply(this, arguments);
            };

            delUser = function _ref47(_x11) {
              return _delUser.apply(this, arguments);
            };

            _addUser = function _ref46() {
              _addUser = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee12(_ref6) {
                var by, extra, ustr, pwd, vfcode, incode, shop, role, _ref6$api_action, api_action, API_PATH, url, localToken, headers, extra_str, res, data;

                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        by = _ref6.by, extra = _ref6.extra, ustr = _ref6.ustr, pwd = _ref6.pwd, vfcode = _ref6.vfcode, incode = _ref6.incode, shop = _ref6.shop, role = _ref6.role, _ref6$api_action = _ref6.api_action, api_action = _ref6$api_action === void 0 ? "adduser" : _ref6$api_action;
                        _context12.prev = 1;

                        if (!(api_action != "adduser" && api_action != 'signup')) {
                          _context12.next = 4;
                          break;
                        }

                        throw new ArgumentError('Invalid Api Action');

                      case 4:
                        API_PATH = '/user?action=' + api_action;
                        url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland

                        localToken = getLocalToken();
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: getLocalToken() //'apiv': APIV // Use md5 to hash the password

                        };

                        if (!(_.isNil(by) || typeof by !== 'string')) {
                          _context12.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: by is required as string');

                      case 10:
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
                          _context12.next = 14;
                          break;
                        }

                        throw new ArgumentError('String Type Field: ustr is required as string');

                      case 14:
                        if (!(_.isNil(pwd) || typeof pwd !== 'string')) {
                          _context12.next = 16;
                          break;
                        }

                        throw new ArgumentError('String Type Field: pwd is required as string');

                      case 16:
                        if (!(_.isNil(vfcode) || typeof vfcode !== 'string')) {
                          _context12.next = 18;
                          break;
                        }

                        throw new ArgumentError('String Type Field:vfcode is required as string');

                      case 18:
                        if (!(_.isNil(shop) || typeof shop !== 'string')) {
                          _context12.next = 20;
                          break;
                        }

                        throw new ArgumentError('String Type Field:shop is required as string');

                      case 20:
                        if (!(_.isNil(role) || typeof role !== 'string')) {
                          _context12.next = 22;
                          break;
                        }

                        throw new ArgumentError('String Type Field:role is required as string');

                      case 22:
                        extra_str = "";

                        if (!_.isNil(extra)) {
                          extra_str = JSON.stringify(extra);
                        }

                        _context12.next = 26;
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
                            pwd: pwd,
                            shop: shop,
                            role: role,
                            extra: extra_str
                          }
                        });

                      case 26:
                        res = _context12.sent;
                        data = res.data;
                        return _context12.abrupt("return", data);

                      case 31:
                        _context12.prev = 31;
                        _context12.t0 = _context12["catch"](1);
                        return _context12.abrupt("return", {
                          error: 1,
                          reason: _context12.t0,
                          debug: _context12.t0
                        });

                      case 34:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12, this, [[1, 31]]);
              }));
              return _addUser.apply(this, arguments);
            };

            addUser = function _ref45(_x10) {
              return _addUser.apply(this, arguments);
            };

            _signup = function _ref44() {
              _signup = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee11(_ref5) {
                var name, by, tel, mail, sex, ustr, pwd, vfcode, incode, ugrp, role, API_PATH, url, localToken, headers, res, data;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        name = _ref5.name, by = _ref5.by, tel = _ref5.tel, mail = _ref5.mail, sex = _ref5.sex, ustr = _ref5.ustr, pwd = _ref5.pwd, vfcode = _ref5.vfcode, incode = _ref5.incode, ugrp = _ref5.ugrp, role = _ref5.role;
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
                            action: "signup",
                            by: by,
                            ustr: ustr,
                            name: name,
                            tel: tel,
                            sex: sex,
                            mail: mail,
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
              return _signup.apply(this, arguments);
            };

            signup = function _ref43(_x9) {
              return _signup.apply(this, arguments);
            };

            _chgPass = function _ref42() {
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

            chgPass = function _ref41(_x7, _x8) {
              return _chgPass.apply(this, arguments);
            };

            _rstPass = function _ref40() {
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

            rstPass = function _ref39(_x6) {
              return _rstPass.apply(this, arguments);
            };

            _addVfcodeByMail = function _ref38() {
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

            addVfcodeByMail = function _ref37(_x5) {
              return _addVfcodeByMail.apply(this, arguments);
            };

            _addVfcodeByTel = function _ref36() {
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

            addVfcodeByTel = function _ref35(_x4) {
              return _addVfcodeByTel.apply(this, arguments);
            };

            _login = function _ref34() {
              _login = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee6(_ref2) {
                var by, ustr, pwd, shop, role, url, headers, res, data, token;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        by = _ref2.by, ustr = _ref2.ustr, pwd = _ref2.pwd, shop = _ref2.shop, role = _ref2.role;
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
                        if (!(_.isNil(shop) || typeof shop !== 'string')) {
                          _context6.next = 10;
                          break;
                        }

                        throw new ArgumentError('String Type Field: shop is required');

                      case 10:
                        if (!(_.isNil(role) || typeof role !== 'string')) {
                          _context6.next = 12;
                          break;
                        }

                        throw new ArgumentError('String Type Field: role is required');

                      case 12:
                        url = API_END_POINT + '/login';
                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: global_app_token
                        };
                        _context6.next = 16;
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
                            shop: shop,
                            role: role
                          }
                        });

                      case 16:
                        res = _context6.sent;
                        data = res.data;

                        if (data.error === 0) {
                          token = data.result.token;
                          setLocalToken(token);
                        } else {
                          console.log(data);
                        }

                        return _context6.abrupt("return", data);

                      case 22:
                        _context6.prev = 22;
                        _context6.t0 = _context6["catch"](1);
                        console.log(_context6.t0);
                        return _context6.abrupt("return", {
                          error: 2,
                          reason: _context6.t0,
                          result: {},
                          debug: {}
                        });

                      case 26:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6, this, [[1, 22]]);
              }));
              return _login.apply(this, arguments);
            };

            login = function _ref33(_x3) {
              return _login.apply(this, arguments);
            };

            _logout = function _ref32() {
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

            logout = function _ref31() {
              return _logout.apply(this, arguments);
            };

            _isLogin = function _ref30() {
              _isLogin = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee4() {
                var localToken, _isLogin2, url, headers, res, data;

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
                        url = API_END_POINT + '/login/' + localToken; //const sign = generateSign({ method: 'GET', path: '/login/'+localToken, appSecret: getAppSecret(), appKey: getAppKey() })

                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          Authorization: global_app_token
                        };
                        _context4.next = 10;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 10:
                        res = _context4.sent;
                        data = res.data;

                        if (!(data.error === 0)) {
                          _context4.next = 20;
                          break;
                        }

                        if (!(data.result.islogin == 1)) {
                          _context4.next = 17;
                          break;
                        }

                        return _context4.abrupt("return", true);

                      case 17:
                        return _context4.abrupt("return", false);

                      case 18:
                        _context4.next = 22;
                        break;

                      case 20:
                        throw new Error('fail to get Login profile');

                      case 22:
                        _context4.next = 28;
                        break;

                      case 24:
                        _context4.prev = 24;
                        _context4.t0 = _context4["catch"](0);
                        console.log(_context4.t0);
                        return _context4.abrupt("return", false);

                      case 28:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, this, [[0, 24]]);
              }));
              return _isLogin.apply(this, arguments);
            };

            isLogin = function _ref29() {
              return _isLogin.apply(this, arguments);
            };

            _getToken = function _ref28() {
              _getToken = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3(token) {
                var url, headers, res, data;
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
                        url = API_END_POINT + '/token/' + token; //const sign = generateSign({ method: 'GET', path: '/token/'+token, appSecret: getAppSecret(), appKey: getAppKey() })

                        headers = {
                          accept: APPLICATION_JSON,
                          'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                          //Authorization: sign,
                          Authorization: global_app_token
                        };
                        _context3.next = 5;
                        return aliYunClient.get({
                          url: url,
                          headers: headers,
                          signHeaders: {
                            'X-Ca-Stage': 'RELEASE'
                          }
                        });

                      case 5:
                        res = _context3.sent;
                        data = res.data;

                        if (!(data.error === 0)) {
                          _context3.next = 11;
                          break;
                        }

                        return _context3.abrupt("return", data);

                      case 11:
                        throw new Error('fail to get Token profile');

                      case 13:
                        _context3.next = 19;
                        break;

                      case 15:
                        _context3.prev = 15;
                        _context3.t0 = _context3["catch"](0);
                        console.log(_context3.t0);
                        return _context3.abrupt("return", {
                          error: 2,
                          reason: String(_context3.t0),
                          result: {},
                          debug: {}
                        });

                      case 19:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this, [[0, 15]]);
              }));
              return _getToken.apply(this, arguments);
            };

            getToken = function _ref27(_x2) {
              return _getToken.apply(this, arguments);
            };

            _addToken = function _ref26() {
              _addToken = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2() {
                var parser, ua_info, params, headers, res, data, token, ret;
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
                          channel: 'RELEASE' //const sign = generateSign({ method: 'POST', path: '/auth', appSecret: getAppSecret(), appKey: getAppKey() })

                        };
                        headers = {
                          'Content-Type': APPLICATION_X_WWW_FORM_URLENCODED,
                          //'Authorization': sign
                          'Authorization': global_app_token
                        };
                        _context2.next = 7;
                        return aliYunClient.post({
                          url: API_END_POINT + '/auth',
                          headers: headers,
                          params: params
                        });

                      case 7:
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

                      case 13:
                        _context2.prev = 13;
                        _context2.t0 = _context2["catch"](0);
                        console.log(_context2.t0);
                        ret = {
                          error: 2,
                          reason: _context2.t0,
                          result: {},
                          debug: {}
                        };
                        return _context2.abrupt("return", ret);

                      case 18:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this, [[0, 13]]);
              }));
              return _addToken.apply(this, arguments);
            };

            addToken = function _ref25() {
              return _addToken.apply(this, arguments);
            };

            _initialize = function _ref24() {
              _initialize = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                var localUserToken;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        try {
                          localUserToken = getLocalToken(); //--对付网页刷新-开始

                          if (_.isNil(localUserToken)) {
                            console.log("Missing Local User Token");
                          } //--对付网页刷新-结束

                        } catch (e) {
                          console.log("Exception at initialize:" + String(e));
                        }

                        return _context.abrupt("return", null);

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));
              return _initialize.apply(this, arguments);
            };

            initialize = function _ref23() {
              return _initialize.apply(this, arguments);
            };

            APP_TOKEN = _ref.APP_TOKEN;
            //setAppKey(APP_KEY)
            //setAppSecret(APP_SECRET)
            global_app_token = APP_TOKEN;
            setLocalToken(APP_TOKEN);
            /**
             * 如果本地已经有一个token了,那么要判断这个匿名token是否过期了，
             * 地球号机制给所有的匿名token统一的24小时有效期。
             * 用户创建应用的时候也可以制定自己这个应用的有效期是多久。
             * 如果有效期已经过了，就需要重新申请匿名令牌。
             * 如果令牌的本地存储被人删除了,就需要也需要重新申请匿名令牌。 
             **/

            /**
             * 修改20190628:
             * 旧版：初始化的时候，会查询本地是否有token,如果有token,就用它。
             * 新版：初始化的时候，必须获取新的token。
             * 原因：因为如果初始化全新的lovearth,即使给了新的app的key和secret，结果token却用的是旧的，这就是问题。
             * 修改20191018
             * 改版：因为前端网页登录后会刷网页覆盖token,导致用这个token是个匿名token,没有什么权限,导致前端api拿不到真正的权限。
             * */

            _context89.next = 181;
            return initialize();

          case 181:
            return _context89.abrupt("return", {
              initialize: initialize,
              addToken: addToken,
              getToken: getToken,
              isLogin: isLogin,
              logout: logout,
              login: login,
              signup: signup,
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
              addRule: addRule,
              delRule: delRule,
              getRule: getRule,
              putRule: putRule,
              qryRule: qryRule,
              addRoue: addRoue,
              delRoue: delRoue,
              getRoue: getRoue,
              putRoue: putRoue,
              qryRoue: qryRoue,
              delRoues: delRoues,
              addUsro: addUsro,
              delUsro: delUsro,
              getUsro: getUsro,
              putUsro: putUsro,
              qryUsro: qryUsro,
              addUaff: addUaff,
              delUaff: delUaff,
              getUaff: getUaff,
              putUaff: putUaff,
              qryUaff: qryUaff,
              addApp: addApp,
              delApp: delApp,
              getApp: getApp,
              putApp: putApp,
              qryApp: qryApp,
              addObj: addObj,
              delObj: delObj,
              delObjs: delObjs,
              putObj: putObj,
              getObj: getObj,
              qryObj: qryObj,
              hasObj: hasObj,
              addFobj: addFobj,
              delFobj: delFobj,
              putFobj: putFobj,
              getFobj: getFobj,
              qryFobj: qryFobj,
              addUinf: addUinf,
              delUinf: delUinf,
              putUinf: putUinf,
              getUinf: getUinf,
              qryUinf: qryUinf,
              addJobq: addJobq,
              delJobq: delJobq,
              getJobq: getJobq,
              putJobq: putJobq,
              qryJobq: qryJobq,
              addVfcodeByTel: addVfcodeByTel,
              addVfcodeByMail: addVfcodeByMail,
              rstPass: rstPass,
              chgPass: chgPass,
              addfile: addfile,
              addavatar: addavatar,
              addblob: addblob,
              qryGwlog: qryGwlog,
              qryDvlog: qryDvlog,
              qryGwenv: qryGwenv,
              qryDvenv: qryDvenv,
              addIotpass: addIotpass
            });

          case 182:
          case "end":
            return _context89.stop();
        }
      }
    }, _callee89, this);
  }));
  return _xdua.apply(this, arguments);
}

module.exports = xdua;