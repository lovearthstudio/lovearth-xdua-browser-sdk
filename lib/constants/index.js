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


/**
 * 以获取本地token,优先寻找usr_token,如果usr_token不存在，切换到app_token
 * */ 
function getLocalToken() {
    let localtoken = undefined;
    try {
        let local_usr_token = store.get('usr_token');
        if(!_.isNil(local_usr_token)){
            localtoken = local_usr_token;
        }else{
            let local_app_token = store.get('app_token');
            if(!_.isNil(local_app_token)){
                localtoken = local_app_token
            }else{
                localtoken = null
            }  
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
    setLocalUsrToken,
    setLocalAppToken,
};
