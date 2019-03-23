"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var OSS = require('ali-oss');

var OSS_INFO = {
  url: 'http://api.xdua.com/sts/osser',
  region: 'oss-cn-beijing',
  bucket: 'file-xdua-com'
};

function getClient() {
  return _getClient.apply(this, arguments);
}

function _getClient() {
  _getClient = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var raw_res, res, client;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch(OSS_INFO.url);

          case 3:
            raw_res = _context.sent;
            _context.next = 6;
            return raw_res.json();

          case 6:
            res = _context.sent;
            client = new OSS({
              region: OSS_INFO.region,
              accessKeyId: res.access_key_id,
              accessKeySecret: res.access_key_secret,
              bucket: OSS_INFO.bucket
            });
            return _context.abrupt("return", client);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            return _context.abrupt("return", null);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 11]]);
  }));
  return _getClient.apply(this, arguments);
}

function addfile(_x, _x2) {
  return _addfile.apply(this, arguments);
}

function _addfile() {
  _addfile = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(file, ossfilepath) {
    var point, oss, r1;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            point = file.name.lastIndexOf('.');
            _context2.prev = 1;
            _context2.next = 4;
            return getClient();

          case 4:
            oss = _context2.sent;
            _context2.next = 7;
            return oss.put(ossfilepath, file);

          case 7:
            r1 = _context2.sent;
            return _context2.abrupt("return", r1);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](1);
            console.error(_context2.t0);
            return _context2.abrupt("return", null);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 11]]);
  }));
  return _addfile.apply(this, arguments);
}

module.exports = {
  getClient: getClient,
  addfile: addfile
};