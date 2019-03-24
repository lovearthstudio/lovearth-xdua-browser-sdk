"use strict";

const _ = require('lodash')
const APIV = '1.0.0';
const API_END_POINT = 'http://api.xdua.com';
const HAM_API_END_POINT = 'http://api.hannm.com';
let APP_SECRET;
let APP_KEY;

//我们用localStorage只能用于浏览器.于是使用store插件.可以兼容android,ios,nodejs,browser
//https://github.com/marcuswestin/store.js
let store = require('store')



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
    let api_info = {
        token:token
    }
    store.set('api_info', api_info);
}

function getLocalToken() {
    let localtoken = undefined;
    try {
        let api_info = store.get('api_info');
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
  APIV,
  API_END_POINT,
  HAM_API_END_POINT,
  getAppKey,
  getAppSecret,
  getLocalToken,
  delLocalToken,
  setAppKey,
  setAppSecret,
  setLocalToken,
};
