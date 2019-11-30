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
} //头像上传要使用专门的bucket


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
              stsToken: res.security_token,
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

var OSS_INFO_AVATAR = {
  url: 'http://api.xdua.com/sts/osser',
  region: 'oss-cn-beijing',
  bucket: 'avatar-xdua-com'
};

function getAvatarClient() {
  return _getAvatarClient.apply(this, arguments);
}
/**
 * 当你用ApiCloud这种平台开发APP的时候,不好操作文件路径（传闻）,特别是IOS平台，如果这个时候能用blob上传就太好了
 * https://help.aliyun.com/document_detail/64047.html?spm=a2c4g.11174283.6.1133.45eb7da2k9cASc
 *  
 * */


function _getAvatarClient() {
  _getAvatarClient = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var raw_res, res, client;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return fetch(OSS_INFO_AVATAR.url);

          case 3:
            raw_res = _context2.sent;
            _context2.next = 6;
            return raw_res.json();

          case 6:
            res = _context2.sent;
            client = new OSS({
              region: OSS_INFO_AVATAR.region,
              accessKeyId: res.access_key_id,
              accessKeySecret: res.access_key_secret,
              stsToken: res.security_token,
              bucket: OSS_INFO_AVATAR.bucket
            });
            return _context2.abrupt("return", client);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
            return _context2.abrupt("return", null);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 11]]);
  }));
  return _getAvatarClient.apply(this, arguments);
}

function addavatar(_x, _x2, _x3) {
  return _addavatar.apply(this, arguments);
}

function _addavatar() {
  _addavatar = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(file, ossfilepath, options) {
    var oss, r1;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return getAvatarClient();

          case 3:
            oss = _context3.sent;
            _context3.next = 6;
            return oss.put(ossfilepath, file, options);

          case 6:
            r1 = _context3.sent;
            return _context3.abrupt("return", r1);

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);
            return _context3.abrupt("return", null);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 10]]);
  }));
  return _addavatar.apply(this, arguments);
}

function addfile(_x4, _x5, _x6) {
  return _addfile.apply(this, arguments);
}

function _addfile() {
  _addfile = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(file, ossfilepath, options) {
    var oss, r1;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return getClient();

          case 3:
            oss = _context4.sent;
            _context4.next = 6;
            return oss.put(ossfilepath, file, options);

          case 6:
            r1 = _context4.sent;
            return _context4.abrupt("return", r1);

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0);
            return _context4.abrupt("return", null);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 10]]);
  }));
  return _addfile.apply(this, arguments);
}

function addblob(_x7, _x8, _x9) {
  return _addblob.apply(this, arguments);
}

function _addblob() {
  _addblob = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(blob, ossfilepath, options) {
    var oss, r1;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return getClient();

          case 3:
            oss = _context5.sent;
            _context5.next = 6;
            return oss.put(ossfilepath, blob, options);

          case 6:
            r1 = _context5.sent;
            return _context5.abrupt("return", r1);

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0);
            return _context5.abrupt("return", null);

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[0, 10]]);
  }));
  return _addblob.apply(this, arguments);
}

module.exports = {
  getClient: getClient,
  addfile: addfile,
  addavatar: addavatar,
  addblob: addblob
};