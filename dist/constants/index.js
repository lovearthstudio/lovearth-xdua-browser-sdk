"use strict";

var _ = require('lodash');

var APIV = '1.0.0';
var API_END_POINT = 'http://api.xdua.com';
var HAM_API_END_POINT = 'http://api.hannm.com';
var APP_SECRET;
var APP_KEY; //我们用localStorage只能用于浏览器.于是使用store插件.可以兼容android,ios,nodejs,browser
//https://github.com/marcuswestin/store.js

var store = require('store');

function setAppSecret(appSecret) {
  APP_SECRET = appSecret;
}

function getAppSecret() {
  return APP_SECRET;
}

function getAppKey() {
  return APP_KEY;
}

function setAppKey(appKey) {
  APP_KEY = appKey;
}

function setLocalToken(token) {
  var date = new Date();
  var token_expire_time = parseInt(date.getTime() / 1000) + 3600;
  var api_info = {
    token: token,
    token_expire_time: token_expire_time
  };
  store.set('api_info', api_info);
}

function getLocalToken() {
  var localtoken = undefined;

  try {
    var api_info = store.get('api_info');
    localtoken = api_info.token;
    return localtoken;
  } catch (error) {
    return null;
  }
}

function delLocalToken() {
  store.remove('api_info');
  return true;
}

module.exports = {
  APIV: APIV,
  API_END_POINT: API_END_POINT,
  HAM_API_END_POINT: HAM_API_END_POINT,
  getAppKey: getAppKey,
  getAppSecret: getAppSecret,
  getLocalToken: getLocalToken,
  delLocalToken: delLocalToken,
  setAppKey: setAppKey,
  setAppSecret: setAppSecret,
  setLocalToken: setLocalToken
};