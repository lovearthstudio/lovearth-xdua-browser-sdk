"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const {
  OSS_INFO
} = require('../../demo/option');

const OSS = require('ali-oss');

function getClient() {
  return _getClient.apply(this, arguments);
}

function _getClient() {
  _getClient = _asyncToGenerator(function* () {
    try {
      let raw_res = yield fetch(OSS_INFO.url);
      let res = yield raw_res.json();
      let client = new OSS({
        region: OSS_INFO.region,
        accessKeyId: res.access_key_id,
        accessKeySecret: res.access_key_secret,
        bucket: OSS_INFO.bucket
      });
      return client;
    } catch (e) {
      console.error(e);
      return null;
    }
  });
  return _getClient.apply(this, arguments);
}

function upload(_x) {
  return _upload.apply(this, arguments);
}

function _upload() {
  _upload = _asyncToGenerator(function* (file) {
    const point = file.name.lastIndexOf('.');
    let suffix = file.name.substr(point);
    let fileName = file.name.substr(0, point);
    let date = Date.parse(new Date());
    let fileNames = `${fileName}_${date}${suffix}`;

    try {
      let oss = yield getClient();
      let r1 = yield oss.put(fileNames, file);
      return r1;
    } catch (e) {
      console.error(e);
      return null;
    }
  });
  return _upload.apply(this, arguments);
}

module.exports = {
  getClient,
  upload
};