"use strict";

const APIV = '1.0.0';
const API_END_POINT = 'http://api.xdua.com';
let APP_SECRET;
let APP_KEY;
let LOCAL_TOKEN;

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
    let date = new Date();
    let token_expire_time = parseInt(date.getTime()/1000) + 3600
    let api_info = {
        token:token,
        token_expire_time: token_expire_time
    }
    localStorage.setItem('api_info',JSON.stringify(api_info));
    LOCAL_TOKEN = token;
}

function getLocalToken() {
    let api_info = localStorage.getItem('api_info');
    api_info = JSON.parse(api_info);
    return api_info.token;
}

module.exports = {
  APIV,
  API_END_POINT,
  getAppKey,
  getAppSecret,
  getLocalToken,
  setAppKey,
  setAppSecret,
  setLocalToken
};