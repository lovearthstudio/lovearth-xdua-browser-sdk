"use strict";

var md5 = require('./md5');

var _ = require('lodash');

function Sign(nonce) {
  var Nonce;

  if (_.isNil(nonce)) {
    Nonce = md5(Math.random());
  } else {
    Nonce = md5(nonce);
  }
  /**
   * Sign the string according to http://doc.xdua.com/guide/dosign.html
   * @param method
   * @param path
   * @param nonce
   * @param appSecret
   * @param appKey
   * @returns {string}
   */


  function generateSign(_ref) {
    var method = _ref.method,
        path = _ref.path,
        appSecret = _ref.appSecret,
        appKey = _ref.appKey;
    var stringToSign = method + path + Nonce + appSecret;
    var signedString = md5(stringToSign);
    return appKey + '|' + Nonce + '|' + signedString;
  }

  return {
    generateSign: generateSign
  };
}

module.exports = Sign;