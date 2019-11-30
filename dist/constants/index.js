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
  var api_info = {
    token: token
  };
  store.set('api_info', api_info);
}
/**
 * 以获取本地token,优先寻找usr_token,如果usr_token不存在，切换到app_token
 * */


function getLocalToken() {
  var localtoken = undefined;

  try {
    var local_usr_token = store.get('usr_token');

    if (!_.isNil(local_usr_token)) {
      localtoken = local_usr_token;
      console.log("Found local Usr Token");
    } else {
      var local_app_token = store.get('app_token');

      if (!_.isNil(local_app_token)) {
        localtoken = local_app_token;
        console.log("Found local App Token");
      } else {
        localtoken = null;
        console.log("Found No Token");
      }
    }

    return localtoken;
  } catch (error) {
    return null;
  }
}
/**
 * 获取本地应用token
 * */


function getLocalAppToken() {
  var localtoken = undefined;

  try {
    var local_app_token = store.get('app_token');

    if (!_.isNil(local_app_token)) {
      localtoken = local_app_token;
      console.log("Found local App Token +");
    } else {
      localtoken = null;
      console.log("Found No Token");
    }

    return localtoken;
  } catch (error) {
    return null;
  }
}
/**
 * 获取本地应用token
 * */


function getLocalUsrToken() {
  var localtoken = undefined;

  try {
    var local_usr_token = store.get('usr_token');

    if (!_.isNil(local_usr_token)) {
      localtoken = local_usr_token;
      console.log("Found local Usr Token +");
    } else {
      localtoken = null;
      console.log("Found No Token");
    }

    return localtoken;
  } catch (error) {
    return null;
  }
}
/**
 * 设置本地应用token
 * */


function setLocalAppToken(token) {
  store.set('app_token', token);
}
/**
 * 设置本地应用token
 * */


function setLocalUsrToken(token) {
  store.set('usr_token', token);
}
/**
 * 删除本地所有token
 * */


function delLocalToken() {
  store.remove('app_token');
  store.remove('usr_token');
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
  setLocalToken: setLocalToken,
  setLocalUsrToken: setLocalUsrToken,
  setLocalAppToken: setLocalAppToken,
  getLocalAppToken: getLocalAppToken
};