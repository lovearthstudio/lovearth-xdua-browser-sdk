// xdua 1.9.1
'use strict'

const _ = require('lodash')
const UAParser = require('ua-parser-js')
const ArgumentError = require('./exceptions/ArgumentError')
const md5 = require('./utils/md5')
const { APPLICATION_JSON, APPLICATION_X_WWW_FORM_URLENCODED } = require('./constants/contentType')
const { getClient, addfile,addavatar,addblob } = require('./oss/oss-client')

const {
    APIV,
    API_END_POINT,
    HAM_API_END_POINT,
    setAppSecret,
    setAppKey,
    getAppSecret,
    getAppKey,
    setLocalToken,
    delLocalToken,
    getLocalToken,
} = require('./constants')

const { generateSign } = require('./utils/Sign')()

const aliYunClient = require('./aliyunClient')

/**
 * APP专属的应用token
 * */
let global_app_token = null
/**
 * 用户专属的登录token
 * */ 
let global_usr_token = null

async function xdua ({ APP_TOKEN }) {
    //setAppKey(APP_KEY)
    //setAppSecret(APP_SECRET)
    global_app_token = APP_TOKEN
    setLocalToken(APP_TOKEN)
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
    async function initialize() {
        try{
            let localUserToken = getLocalToken(); 
            //--对付网页刷新-开始
            if (_.isNil(localUserToken)) {
                console.log("Missing Local User Token");
            } 
            //--对付网页刷新-结束
        }catch(e){
            console.log("Exception at initialize:"+String(e));
        }
        return null;
    }
    
    //初始化lovearth时如果要默认初始化一次initialize,在外部就要await lovearth(KEY,SECRET) 
    await initialize();

    //本函数即将废弃，不再支持用key/secret换取匿名token,这个函数彻底废弃。
    async function addToken() {
        try {
            let parser = new UAParser()
            let ua_info = parser.getResult()
            let params = {
                dsn: md5(ua_info.ua),
                type: 'browser',
                model: ua_info.device.model == undefined ? 'undefined' : ua_info.device.model,
                man: ua_info.device.vendor == undefined ? 'undefined' : ua_info.device.vendor,
                os: ua_info.os.name + ' ' + ua_info.os.version,
                channel: 'RELEASE'
            }
            //const sign = generateSign({ method: 'POST', path: '/auth', appSecret: getAppSecret(), appKey: getAppKey() })
            let headers = {
                'Content-Type': APPLICATION_X_WWW_FORM_URLENCODED,
                //'Authorization': sign
                'Authorization': global_app_token
            }
            let res = await aliYunClient.post({ url: API_END_POINT + '/auth', headers, params })
            const { data } = res
            if (data.error === 0) {
                let { token } = data.result
                setLocalToken(token);
            }else{
                console.log("addToken:失败");
                console.log(data);
            }
            return data
        } catch (e) {
            console.log(e);
            let ret = { error: 2, reason: e, result: {}, debug: {} };
            return ret
        }
    }

    /**
    * 获取本地localstorage存储的token去后台解析里面的内容然后返回.
    * 解析的内容里包含它的过期时间还剩下多少秒,客户端以此来判断
    * fixme:测试本接口
    * */
    async function getToken(token) {
        try {
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
            const url = API_END_POINT + '/token/' + token
            //const sign = generateSign({ method: 'GET', path: '/token/'+token, appSecret: getAppSecret(), appKey: getAppKey() })
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                //Authorization: sign,
                Authorization: global_app_token,
            }
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            if (data.error === 0) {
                return data;
            } else {
                throw new Error('fail to get Token profile');
                return null;
            }
        } catch (e) {
            console.log(e);
            return { error: 2, reason: String(e), result: {}, debug: {} }
        }
    }


    /**
     * 这个函数每次页面路由都要判断并调用本函数，以便决定是否跳到登陆页面。
     * 获取本地token，返回客户端登录状态
     * 如果本地token不存在或者为空,返回false
     * 如果本地token存在,我们要去服务器看一下,这个token,如果它的vtl>0,那么返回true
     * 修改BUG:网页刷新会触发生成新鲜的匿名token,这个匿名token因为新鲜,vtl总是>0的,所以我们要修改长,本地token必须不是anonymus并且vtl>0才可以是登陆状态。
     */
    async function isLogin() {
        try {
            let localToken = getLocalToken()
            let isLogin = false
            if (_.isNil(localToken) || localToken == '') {
                isLogin = false
                return false
            }
            /*
            localToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NTQ5NTM0NDEsIm5iZiI6MTU1NDk1MzQ0MSwiZXhwIjoxNTU0OTU3MDQxLCJpc3MiOiJsb3ZlYXJ0aCIsImR1YSI6IkhQenFZTktrIiwiZGlkIjoidnN5RGRTcmIiLCJ1aWQiOiJqUU9wRXAybSIsImFpZCI6Ilp2VVcxdExwIiwiYXVkIjoiY24uYWMuaWN0LmNoaWxkcmVucGMiLCJpcCI6IjExMy4xMTAuMjI4Ljg5IiwidWEiOiJYZHVhVXNlckFnZW50IiwidWdycCI6IlhkVWFYZHVBIiwicm9sZSI6Im5vbmUifQ.eFElFNUl9PJz6hZZNqZ8XBuU9gWQrg9sp9M2rP2IQ-0RPLw8M1BGVo8i0LCZsoC_NUcpJSn8ChGGOO87p32oaatsNzdr6jFOWyx3536kJdoVz4PFqipEg7Jtyut8q3940W8PHQKVmXgjLlESpDW8YAvE_Qsl0U7TgTDPDDrrR-rLuCD504N3a0kOwb1MZHE-MZQ5QT8t2AxqgbsV2y5qz2aTbOZAQD5KjLHhKvipiblBq2D27X74bxRP-e0iDbyKYAYpH8luzeqe3y-SRn3XvEu5gficInnSLlFiy56KZPeZPOQSOmu_rjNds7cIASnpxbFjXkMj9YPUHKBOjcEkkw'
            localToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NTQ5Njg3MTAsIm5iZiI6MTU1NDk2ODcxMCwiZXhwIjoxNTU1MDU1MTEwLCJpc3MiOiJsb3ZlYXJ0aCIsImR1YSI6IkhQenFZTktrIiwiZGlkIjoidnN5RGRTcmIiLCJ1aWQiOiJqUU9wRXAybSIsImFpZCI6Ilp2VVcxdExwIiwiYXVkIjoiY24uYWMuaWN0LmNoaWxkcmVucGMiLCJpcCI6IjExMy4xMTAuMjI4Ljg5IiwidWEiOiJYZHVhVXNlckFnZW50IiwidWdycCI6IlhkVWFYZHVBIiwicm9sZSI6Im5vbmUifQ.bv0NXpFT1uyk5J2HBo0hsdA-KCMp9s7QCYwOJq8XiamRlw97czpQWfsNYIjmUoJLElqrLZL8L93PThurQW3f1JaR-rK_izZz088Iv0F2Gklc-La3YOVwXzNMkC1lY5g_zIAcJu-FcMD0nkJeub6EnHzbCLZOh63WN424q3G4-pi3HfgfKOF8ly0b3znZOSj5xVSGagCsZEPJ9E9Xx8sHAq7dtx6Liyh2ugw_eGttTexEXR8LUgazgwK0vBmBiMf0pAviioGQhaD_uLRQpr2yWvLEuqCkga62iA92kJiHpD3lihJeFTwsi6NJWS2RCz_Y1DeCiDNhNeXP0Tq6P-lRsg';
            localToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NTQ5Njk0NTksIm5iZiI6MTU1NDk2OTQ1OSwiZXhwIjoxNTU1MDU1ODU5LCJpc3MiOiJsb3ZlYXJ0aCIsImR1YSI6IkhQenFZTktrIiwiZGlkIjoidnN5RGRTcmIiLCJ1aWQiOiJqUU9wRXAybSIsImFpZCI6Ilp2VVcxdExwIiwiYXVkIjoiY24uYWMuaWN0LmNoaWxkcmVucGMiLCJpcCI6IjExMy4xMTAuMjI4Ljg5IiwidWEiOiJYZHVhVXNlckFnZW50IiwidWdycCI6IlhkVWFYZHVBIiwicm9sZSI6Im5vbmUifQ.TJ3lsepFtSppQsK1db-tdzistF68VrVr9FI3i-DnsLy6GAGLYNth1zCLPSAYHE3UhlI-s_yY-nNS2tX6eAyKD2xArpC1bLIUbp_LgoF6kEjg81GLtUFYcL2mbSKL1FQBI7lKWbGzZea-zY93D2PgqAdlGYDF1dp8Tfggka3pxfcZRp3208DrHWRj9qEOc-VZfrFvX0FgxX_z8GhiZZQmp5mi13ptGl4VnlLM3lVKijhMIsGuLVKlbB57TDcjlAqe0uyhncxw6Ue1yJYtH6Ff2A8sxEUuY5Ht3xm-IIOv_uOvqkls091Oq5ENXYD0htpIqocXplQFcZK5FArtR8CHlQ';
            */
            const url = API_END_POINT + '/login/' + localToken
            //const sign = generateSign({ method: 'GET', path: '/login/'+localToken, appSecret: getAppSecret(), appKey: getAppKey() })
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: global_app_token
            }
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            if (data.error === 0) {
                if (data.result.islogin == 1){
                    return true;
                }else{
                    return false;
                }
            } else {
                throw new Error('fail to get Login profile');
                return false;
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 删除本地localstorage里的token就可以了
     * fixme:测试本接口
     * */
    async function logout() {
        try {
            delLocalToken()
            return true
        } catch (e) {
            return { error: 2, reason: String(e), result: {}, debug: {} }
        }
    }

    /**
     * Login Method
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function login({ by, ustr, pwd, shop, role }) {
        try {
            if (_.isNil(by)   || typeof by !== 'string') {
                throw new ArgumentError('String Type Field: by is required')
            }
            if (_.isNil(ustr) || typeof ustr !== 'string') {
                throw new ArgumentError('String Type Field: ustr is required')
            }
            if (_.isNil(pwd)  || typeof pwd !== 'string') {
                throw new ArgumentError('String Type Field: pwd is required')
            }
            if (_.isNil(shop) || typeof shop !== 'string') {
                throw new ArgumentError('String Type Field: shop is required')
            }
            if (_.isNil(role) || typeof role !== 'string') {
                throw new ArgumentError('String Type Field: role is required')
            }
            const url = API_END_POINT + '/login'
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: global_app_token
            }
            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: {
                    by: by,
                    ustr: ustr,
                    pwd: pwd,
                    shop: shop,
                    role: role
                }
            })
            const { data } = res;
            if (data.error === 0) {
                let { token } = data.result;
                setLocalToken(token);
            }else{
                console.log(data);
            }
            return data;
        } catch (e) {
            console.log(e);
            return { error: 2, reason: e, result: {}, debug: {} };
        }
    }

    async function addVfcodeByTel(tel) {
        try {
            const API_PATH = '/vfc'
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()
                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv'          : APIV // Use md5 to hash the password
                }

            if (_.isNil(tel) || typeof tel !== 'string') {
                throw new ArgumentError('String Type Field: tel is required as string')
            }

            let res = await aliYunClient.post({
                url,
            headers: headers,
            signHeaders: { 'X-Ca-Stage': 'RELEASE' },
            params: { vfaddr: tel, tmpl: 'SMS_25335288' }
            })
            //console.log(res);
            const { data } = res
                return data
        } catch (e) {
            console.log(e)
                return { error: 2, reason: e, result: {}, debug: {} }
        }
    }
    /**
     * 根据邮件地址获取验证码
     **/
    async function addVfcodeByMail(mail) {
        try {
            const API_PATH = '/vfc'
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()

                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv'          : APIV // Use md5 to hash the password
                }

            if (_.isNil(mail) || typeof mail !== 'string') {
                throw new ArgumentError('String Type Field: mail is required as string')
            }

            let res = await aliYunClient.post({
                url,
            headers: headers,
            signHeaders: { 'X-Ca-Stage': 'RELEASE' },
            params: { vfaddr: mail, tmpl: 'DMS_VFC4USEREG' }
            })
            const { data } = res
                return data
        } catch (e) {
            console.log(e)
                return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * addpass Method(重置密码)
     * ADD:/pass
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function rstPass({ by, ustr, pwd, vfcode }) {
        try {
            const API_PATH = '/pass'
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()
                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }
            if (_.isNil(by) || typeof by !== 'string') {
                throw new ArgumentError('String Type Field: by is required as string')
            }
            if (_.isNil(ustr) || typeof ustr !== 'string') {
                throw new ArgumentError('String Type Field: ustr is required as string')
            }
            if (_.isNil(pwd) || typeof pwd !== 'string') {
                throw new ArgumentError('String Type Field: pwd is required as string')
            }
            if (_.isNil(vfcode) || typeof vfcode !== 'string') {
                throw new ArgumentError('String Type Field:vfcode is required as string')
            }

            let res = await aliYunClient.post({
                url,
            headers: headers,
            signHeaders: { 'X-Ca-Stage': 'RELEASE' },
            params: {
                by: by,
                ustr: ustr,
                vfcode: vfcode,
                pwd: pwd
            }
            })
            const { data } = res
                return data
        } catch (e) {
            console.log(e)
                return { error: 2, reason: e, result: {}, debug: {} }
        }
    }
    /**
     * putpass Method(修改密码)
     * PUT:/pass
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function chgPass(user_id, { oldpwd, newpwd }) {
        try {
            const API_PATH = '/pass/' + user_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()
                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }

            if (_.isNil(user_id) || typeof user_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string')
            }

            if (_.isNil(oldpwd) || typeof oldpwd !== 'string') {
                throw new ArgumentError('String Type Field: oldpwd is required as string')
            }

            if (_.isNil(newpwd) || typeof newpwd !== 'string') {
                throw new ArgumentError('String Type Field: pwd is required as string')
            }
            //下面这个try-catch可以捕捉云平台出现的错误.
            //另外注意,pathParameters不要出现在params里,否则阿里云API网关会自动发出MissingParameter的错误.
            let res = await aliYunClient.put({
                url,
            headers: headers,
            signHeaders: { 'X-Ca-Stage': 'RELEASE' },
            params: { newpwd: newpwd, oldpwd: oldpwd }
            })
            const data = res.data
                return data
        } catch (e) {
            return { error: 1, reason: e, debug: e }
        }
    }

    /**
     * signup Method(用户注册-电话)
     * ADD:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @para/m {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function signup({ name,by,tel,mail,sex, ustr, pwd, vfcode, incode, ugrp, role }) {
        try {
            const API_PATH = '/user'
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            if (_.isNil(by) || typeof by !== 'string') {
                throw new ArgumentError('String Type Field: by is required as string')
            }
            /**
             * 如果注册接口不设置incode,那么系统自动补充成字符串incode.
             * 它是默认的邀请码.
             * */
            if (_.isNil(incode)) {
                incode = 'incode'
            }

            if (incode == '') {
                incode = 'incode'
            }

            if (_.isNil(ustr) || typeof ustr !== 'string') {
                throw new ArgumentError('String Type Field: ustr is required as string')
            }

            if (_.isNil(pwd) || typeof pwd !== 'string') {
                throw new ArgumentError('String Type Field: pwd is required as string')
            }

            if (_.isNil(vfcode) || typeof vfcode !== 'string') {
                throw new ArgumentError('String Type Field:vfcode is required as string')
            }

            if (_.isNil(incode) || typeof incode !== 'string') {
                throw new ArgumentError('String Type Field:incode is required as string')
            }

            if (_.isNil(ugrp) || typeof ugrp !== 'string') {
                throw new ArgumentError('String Type Field:ugrp is required as string')
            }

            if (_.isNil(role) || typeof role !== 'string') {
                throw new ArgumentError('String Type Field:role is required as string')
            }

            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: {
                    action:"signup",
                    by  : by,
                    ustr: ustr,
                    name: name,
                    tel : tel,
                    sex : sex,
                    mail: mail,
                    vfcode: vfcode,
                    incode: incode,
                    pwd: pwd,
                    ugrp: ugrp,
                    role: role
                }
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 1, reason: e, debug: e }
        }
    }

    /**
     * adduser Method(在控制台硬添加用户)
     * ADD:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addUser({ by,extra,ustr, pwd, vfcode, incode, shop, role,api_action="adduser"}) {
        try {
            if ( api_action != "adduser" && api_action != 'signup') {
                throw new ArgumentError('Invalid Api Action')
            }
            const API_PATH = '/user?action='+api_action
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            if (_.isNil(by) || typeof by !== 'string') {
                throw new ArgumentError('String Type Field: by is required as string')
            }
            /**
             * 如果注册接口不设置incode,那么系统自动补充成字符串incode.
             * 它是默认的邀请码.
             * */
            if (_.isNil(incode)) {
                incode = 'incode'
            }

            if (incode == '') {
                incode = 'incode'
            }

            if (_.isNil(ustr) || typeof ustr !== 'string') {
                throw new ArgumentError('String Type Field: ustr is required as string')
            }

            if (_.isNil(pwd) || typeof pwd !== 'string') {
                throw new ArgumentError('String Type Field: pwd is required as string')
            }

            if (_.isNil(vfcode) || typeof vfcode !== 'string') {
                throw new ArgumentError('String Type Field:vfcode is required as string')
            }

            if (_.isNil(shop) || typeof shop !== 'string') {
                throw new ArgumentError('String Type Field:shop is required as string')
            }

            if (_.isNil(role) || typeof role !== 'string') {
                throw new ArgumentError('String Type Field:role is required as string')
            }
 
            let extra_str = ""
            if (!_.isNil(extra)) {
                extra_str = JSON.stringify(extra)
            }
            
            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: {
                    by  : by,
                    ustr: ustr,
                    vfcode: vfcode,
                    pwd: pwd,
                    shop: shop,
                    role: role,
                    extra:extra_str,
                }
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 1, reason: e, debug: e }
        }
    }
    /**
     * delUser Method(用户删除)
     * ADD:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delUser(user_id) {
        try {
            const API_PATH = '/user/' + user_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()
                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }
            if (_.isNil(user_id) || typeof user_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string')
            }
            let res = await aliYunClient.delete({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                const { data } = res
                return data
        } catch (e) {
            return { error: 1, reason: e, debug: e }
        }
    }

    /**
     * putUser Method(修改用户)
     * ADD:/ugrp
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function putUser(user_id,tabx,update) {
        try {
            const API_PATH = '/user/' + user_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            
            let update_str = ""
            if (!_.isNil(update)) {
                update_str = JSON.stringify(update)
            }
           
            let res = await aliYunClient.put({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: {
                    tabx:tabx,
                    update:update_str
                }
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 1, reason: e, debug: e }
        }
    }

    /**
     * getUser Method(用户详情)
     * GET:/user
     * 默认的api_action是getuser,可以选择的是getself
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getUser({user_id,tabx,api_action,fields}) {
        try {
            if ( api_action != "getuser" && api_action != 'getself') {
                throw new ArgumentError('Invalid Api Action')
            }
            if (_.isNil(user_id) || typeof user_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string')
            }
            if (_.isNil(tabx) || typeof tabx !== 'string') {
                throw new ArgumentError('String Type Field: tabx is required as string')
            }
            if (_.isNil(api_action) || typeof api_action !== 'string') {
                throw new ArgumentError('String Type Field: api_action is required as string')
            }

            if (_.isNil(fields) || typeof fields !== 'string') {
                throw new ArgumentError('String Type Field: fields is required as string')
            }

            const API_PATH = '/user/' + user_id+"?action="+api_action+"&tabx="+tabx_id+"&fields="+fields
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            console.log(url);
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            return { error: 1, reason: e, debug: e }
        }
    }

    /**
     * qryUser Method(用户详情)
     * GET:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryUser(param) {
        try {
            let api_path = '/user'
            if (JSON.stringify(param) !== '{}') {
                api_path = '/user?'
            }
            //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量
            param["where"] = JSON.stringify(param["where"])
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }

            const API_PATH = api_path
            // Add '+86-' to the username, since we currently only support registration from China mainland
            // 必须用encodeURI,否则如果按照name模糊查询的话,比如name~ "辣",这边网管SDK就会报出
            // Request path contains unescaped characters 这种搞错
            const url = encodeURI(API_END_POINT + API_PATH) 
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            //console.log(res);
            const { data } = res
            return data
        } catch (e) {
            return { error: 1, reason: e, debug: e }
        }
    }

    /**
     * addUgrp Method(创建户群)
     * ADD:/ugrp
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addUgrp({ code, name, brief, avatar ,pid}) {
        try {
            const API_PATH = '/ugrp'
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            if (_.isNil(code) || typeof code !== 'string') {
                throw new ArgumentError('String Type Field: code is required as string')
            }
            if (_.isNil(name) || typeof name !== 'string') {
                throw new ArgumentError('String Type Field: name is required as string not ' + typeof name)
            }
            if (_.isNil(brief) || typeof brief !== 'string') {
                throw new ArgumentError('String Type Field: brief is required as string')
            }
            let res = await aliYunClient.post({
                url,
            headers: headers,
            signHeaders: { 'X-Ca-Stage': 'RELEASE' },
            params: {
                code: code,
                name: name,
                brief: brief,
                avatar: avatar,
                pid:pid
            }
            })
            const { data } = res
                return data
        } catch (e) {
            return { error: 1, reason: e, debug: e }
        }
    }

    /**
     * delUgrp Method(用户删除)
     * DEL:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delUgrp(ugrp_id) {
        try {
            const API_PATH = '/ugrp/' + ugrp_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()
                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }

            if (_.isNil(ugrp_id) || typeof ugrp_id !== 'string') {
                throw new ArgumentError('String Type Field: ugrp_id is required as string')
            }

            let res = await aliYunClient.delete({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * putUgrp Method(创建户群)
     * ADD:/ugrp
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function putUgrp(ugrp_id, put_param) {
        try {
            const API_PATH = '/ugrp/' + ugrp_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()
                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }
            let res = await aliYunClient.put({
                url,
            headers: headers,
            signHeaders: { 'X-Ca-Stage': 'RELEASE' },
            params: put_param
            })
            const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * getUser Method(用户详情)
     * GET:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getUgrp(ugrp_id) {
        try {
            const API_PATH = '/ugrp/' + ugrp_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()

                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }

            if (_.isNil(ugrp_id) || typeof ugrp_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string')
            }

            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                //console.log(res);
                const { data } = res
                return data
        } catch (e) {
            console.log(e)
                return { error: 2, reason: e, result: {} }
        }
    }

    /**
     * qryUgrp Method(户群详情)
     * GET:/ugrp
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryUgrp(param) {
        try {
            let api_path = '/ugrp'
            if (JSON.stringify(param) !== '{}') {
                api_path = '/ugrp?'
            }
            //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量
            param["filter"] = JSON.stringify(param["filter"])
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }
            const API_PATH = api_path
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()

            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                const { data } = res
                return data
        } catch (e) {
            console.log(e)
                return { error: 2, reason: e, result: {} }
        }
    }


    /**
     * addzone Method(创建户区)
     * ADD:/zone
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addZone({ name,god_id, brief, avatar ,pid}) {
        try {
            const API_PATH = '/zone'
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            if (_.isNil(name) || typeof name !== 'string') {
                throw new ArgumentError('String Type Field: name is required as string not ' + typeof name)
            }
            if (_.isNil(brief) || typeof brief !== 'string') {
                throw new ArgumentError('String Type Field: brief is required as string')
            }
            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: {
                    name: name,
                    brief: brief,
                    avatar: avatar,
                    pid:pid,
                    god_id:god_id
                }
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 1, reason: e, debug: e }
        }
    }

    /**
     * delzone Method(用户删除)
     * DEL:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delZone(zone_id) {
        try {
            const API_PATH = '/zone/' + zone_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            if (_.isNil(zone_id) || typeof zone_id !== 'string') {
                throw new ArgumentError('String Type Field: zone_id is required as string')
            }

            let res = await aliYunClient.delete({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * putzone Method(修改户区)
     * ADD:/zone
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function putZone(zone_id, put_param) {
        try {
            const API_PATH = '/zone/' + zone_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            let res = await aliYunClient.put({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: put_param
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * getUser Method(用户详情)
     * GET:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getZone(zone_id) {
        try {
            const API_PATH = '/zone/' + zone_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: localToken
                //'apiv': APIV // Use md5 to hash the password
            }

            if (_.isNil(zone_id) || typeof zone_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string')
            }

            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            console.log(e)
            return { error: 2, reason: e, result: {} }
        }
    }

    /**
     * qryZone Method(户区查询)
     * GET:/zone
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryZone(param) {
        try {
            let api_path = '/zone'
            if (JSON.stringify(param) !== '{}') {
                api_path = '/zone?'
            }
            //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量
            param["filter"] = JSON.stringify(param["filter"])
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }
            const API_PATH = api_path
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            console.log(e)
            return { error: 2, reason: e, result: {} }
        }
    }

    /**
     * addRole Method(创建角色)
     * ADD:/role
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addRole({ code, name, ugrp_id, granter }) {
        try {
            const API_PATH = '/role'
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()
                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }
            if (_.isNil(code) || typeof code !== 'string') {
                throw new ArgumentError('String Type Field: code is required as string')
            }

            if (_.isNil(name) || typeof name !== 'string') {
                throw new ArgumentError('String Type Field: name is required as string not ' + typeof name)
            }

            if (_.isNil(ugrp_id) || typeof ugrp_id !== 'string') {
                throw new ArgumentError('String Type Field: ugrp_id is required as string')
            }

            let res = await aliYunClient.post({
                url,
            headers: headers,
            signHeaders: { 'X-Ca-Stage': 'RELEASE' },
            params: {
                code: code,
                name: name,
                ugrp_id: ugrp_id,
                granter: granter
            }
            })
            const { data } = res
                return data
        } catch (e) {
            console.log(e)
                return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * delRole Method(用户删除)
     * DEL:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delRole(role_id) {
        try {
            const API_PATH = '/role/' + role_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()
                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }
            if (_.isNil(role_id) || typeof role_id !== 'string') {
                throw new ArgumentError('String Type Field: role_id is required as string')
            }
            let res = await aliYunClient.delete({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                const { data } = res
                return data
        } catch (e) {
            console.log(e)
                return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * putRole Method(创建户群)
     * ADD:/role
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function putRole(role_id, put_param) {
        try {
            const API_PATH = '/role/' + role_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()
                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }
            let res = await aliYunClient.put({
                url,
            headers: headers,
            signHeaders: { 'X-Ca-Stage': 'RELEASE' },
            params: put_param
            })
            const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * getUser Method(角色详情)
     * GET:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getRole(role_id) {
        try {
            const API_PATH = '/role/' + role_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()
                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }
            if (_.isNil(role_id) || typeof role_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string')
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                //console.log(res);
                const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * qryRole Method(户群详情)
     * GET:/role
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryRole(param) {
        try {
            let api_path = '/role'
            if (JSON.stringify(param) !== '{}') {
                api_path = '/role?'
            }
            //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量
            param["filter"] = JSON.stringify(param["filter"])
            
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }
            console.log(api_path);
            const API_PATH = api_path
            const url = encodeURI(API_END_POINT + API_PATH) 
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }
    /**
     * addUgrp Method(创建权限)
     * ADD:/rule
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addRule({ code, name,ugrp_id,extra,avatar}) {
        try {
            const API_PATH = '/rule'
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            if (_.isNil(code) || typeof code !== 'string') {
                throw new ArgumentError('String Type Field: code is required as string')
            }

            if (_.isNil(name) || typeof name !== 'string') {
                throw new ArgumentError('String Type Field: name is required as string not ' + typeof name)
            }

            if (_.isNil(ugrp_id) || typeof ugrp_id !== 'string') {
                throw new ArgumentError('String Type Field: ugrp_id is required as string')
            }


            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                    params: {
                        code: code,
                        name: name,
                        extra: extra,
                        avatar: avatar,
                        ugrp_id: ugrp_id
                    }
                })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * delRule Method(权限删除)
     * DEL:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delRule(rule_id) {
        try {
            const API_PATH = '/rule/' + rule_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            if (_.isNil(rule_id) || typeof rule_id !== 'string') {
                throw new ArgumentError('String Type Field: rule_id is required as string')
            }
            let res = await aliYunClient.delete({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            console.log(e)
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * putRule Method(创建权限)
     * ADD:/rule
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function putRule(rule_id, put_param) {
        try {
            const API_PATH = '/rule/' + rule_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            let res = await aliYunClient.put({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: put_param
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * getRule Method(权限详情)
     * GET:/rule
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getRule(rule_id) {
        try {
            const API_PATH = '/rule/' + rule_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            if (_.isNil(rule_id) || typeof rule_id !== 'string') {
                throw new ArgumentError('String Type Field: rule_id is required as string')
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * qryRule Method(权限查询)
     * GET:/rule
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryRule(param) {
        try {
            let api_path = '/rule'
            if (JSON.stringify(param) !== '{}') {
                api_path = '/rule?'
            }

            //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量
            param["filter"] = JSON.stringify(param["filter"])
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }
            
            //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量
            param["filter"] = JSON.stringify(param["filter"])
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }

            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }

            const API_PATH = api_path
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()

            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }

            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * addRoue Method(创建角权)
     * ADD:/rule
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addRoue({ role_id,rule_id}) {
        try {
            const API_PATH = '/roue'
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }

            if (_.isNil(role_id) || typeof role_id !== 'string') {
                throw new ArgumentError('String Type Field: role_id is required as string')
            }

            if (_.isNil(rule_id) || typeof rule_id !== 'string') {
                throw new ArgumentError('String Type Field: rule_id is required as string')
            }

            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                    params: {
                        role_id: role_id,
                        rule_id: rule_id
                    }
                })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }
    /**
     * delRoues Method(对象们删除)
     * QRY:/obj/
     * action:DELS
     * 
     * @param {String} objkey 对象的key.
     *  There should not be any ' ' or '-' between the digit
     * 
     * @param {String} objattr 对象的属性名. 如果为"_all"表示删除整个对象.
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delRoues(param) {
        try {
            let api_path = '/roue'
            if (JSON.stringify(param) !== '{}') {
                api_path = '/roue?'
            }
            param["action"] = "DELS"
            //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量
            param["filter"] = JSON.stringify(param["filter"])
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }
            
            const API_PATH = api_path
            //电话号码的+86的+号会在Url丢失
            //const url = encodeURI(API_END_POINT + API_PATH) 
            const url = API_END_POINT + API_PATH
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }

            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            //console.log(res);
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }


    /**
     * delRoue Method(角权删除)
     * DEL:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delRoue(roue_id) {
        try {
            const API_PATH = '/roue/' + roue_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            if (_.isNil(roue_id) || typeof roue_id !== 'string') {
                throw new ArgumentError('String Type Field: roue_id is required as string')
            }
            let res = await aliYunClient.delete({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            console.log(e)
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * putRoue Method(创建角权)
     * ADD:/rule
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function putRoue(roue_id, put_param) {
        try {
            const API_PATH = '/roue/' + roue_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            let res = await aliYunClient.put({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: put_param
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * getRoue Method(角权详情)
     * GET:/roue
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getRoue(roue_id) {
        try {
            const API_PATH = '/roue/' + roue_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            if (_.isNil(roue_id) || typeof roue_id !== 'string') {
                throw new ArgumentError('String Type Field: roue_id is required as string')
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * qryRoue Method(权限查询)
     * GET:/roue
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryRoue(param) {
        try {
            let api_path = '/roue'
            if (JSON.stringify(param) !== '{}') {
                api_path = '/roue?'
            }
            
            //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量
            param["filter"] = JSON.stringify(param["filter"])
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }

            const API_PATH = api_path
            const url = encodeURI(API_END_POINT + API_PATH) 
            const localToken = getLocalToken()

            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }

            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * addUsro Method(创建授权)
     * ADD:/usro
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addUsro({ role_id, ugrp_id, towho }) {
        try {
            const API_PATH = '/usro'
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()
                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }
            if (_.isNil(role_id) || typeof role_id !== 'string') {
                throw new ArgumentError('String Type Field: role_id is required as string')
            }
            if (_.isNil(towho) || typeof towho !== 'string') {
                throw new ArgumentError('String Type Field: towho is required as string not ' + typeof name)
            }
            if (_.isNil(ugrp_id) || typeof ugrp_id !== 'string') {
                throw new ArgumentError('String Type Field: ugrp_id is required as string')
            }

            let res = await aliYunClient.post({
                url,
            headers: headers,
            signHeaders: { 'X-Ca-Stage': 'RELEASE' },
            params: {
                role_id: role_id,
            ugrp_id: ugrp_id,
            towho: towho
            }
            })
            const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * delUsro Method(用户删除)
     * DEL:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delUsro(usro_id) {
        try {
            const API_PATH = '/usro/' + usro_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()

                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }

            if (_.isNil(usro_id) || typeof usro_id !== 'string') {
                throw new ArgumentError('String Type Field: usro_id is required as string')
            }

            let res = await aliYunClient.delete({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * putUsro Method(创建授权)
     * ADD:/usro
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function putUsro(usro_id, put_param) {
        try {
            const API_PATH = '/usro/' + usro_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()

                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }

            let res = await aliYunClient.put({
                url,
            headers: headers,
            signHeaders: { 'X-Ca-Stage': 'RELEASE' },
            params: put_param
            })
            //console.log(res);
            const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * getUser Method(角色详情)
     * GET:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getUsro(usro_id) {
        try {
            const API_PATH = '/usro/' + usro_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()
                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }
            if (_.isNil(usro_id) || typeof usro_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string')
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                //console.log(res);
                const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * qryUsro Method(授权详情)
     * GET:/usro
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryUsro(param) {
        try {
            let api_path = '/usro'
                if (JSON.stringify(param) !== '{}') {
                    api_path = '/usro?'
                }
            //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量
            param["filter"] = JSON.stringify(param["filter"])
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }
            const API_PATH = api_path
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()

                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }

            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                //console.log(res);
                const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * adduaff Method(创建授权)
     * ADD:/uaff
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addUaff({ user_id, ugrp_id}) {
        try {
            const API_PATH = '/uaff'
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                    //'apiv': APIV // Use md5 to hash the password
            }
            if (_.isNil(user_id) || typeof user_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string')
            }

            if (_.isNil(ugrp_id) || typeof ugrp_id !== 'string') {
                throw new ArgumentError('String Type Field: ugrp_id is required as string')
            }

            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: {
                    user_id: user_id,
                    ugrp_id: ugrp_id
                }
            })
            const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * deluaff Method(用户删除)
     * DEL:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delUaff(uaff_id) {
        try {
            const API_PATH = '/uaff/' + uaff_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()

                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }

            if (_.isNil(uaff_id) || typeof uaff_id !== 'string') {
                throw new ArgumentError('String Type Field: uaff_id is required as string')
            }

            let res = await aliYunClient.delete({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * putuaff Method(创建授权)
     * ADD:/uaff
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function putUaff(uaff_id, put_param) {
        try {
            const API_PATH = '/uaff/' + uaff_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()

            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }

            let res = await aliYunClient.put({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: put_param
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * getUser Method(角色详情)
     * GET:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getUaff(uaff_id) {
        try {
            const API_PATH = '/uaff/' + uaff_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            if (_.isNil(uaff_id) || typeof uaff_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string')
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            //console.log(res);
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * qryuaff Method(授权详情)
     * GET:/uaff
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryUaff(param) {
        try {
            let api_path = '/uaff'
            if (JSON.stringify(param) !== '{}') {
                api_path = '/uaff?'
            }
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }
            const API_PATH = api_path
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()

            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            //console.log(res);
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }









    /**
     * delApp Method(应用删除)
     * DEL:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delApp(app_id) {
        try {
            const API_PATH = '/app/' + app_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()

                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }

            if (_.isNil(app_id) || typeof app_id !== 'string') {
                throw new ArgumentError('String Type Field: app_id is required as string')
            }

            let res = await aliYunClient.delete({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * putApp Method(修改应用)
     * ADD:/app
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function putApp(app_id, put_param) {
        try {
            const API_PATH = '/app/' + app_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()
                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }
            let res = await aliYunClient.put({
                url,
            headers: headers,
            signHeaders: { 'X-Ca-Stage': 'RELEASE' },
            params: put_param
            })
            const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * getUser Method(应用详情)
     * GET:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getApp(app_id) {
        try {
            const API_PATH = '/app/' + app_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()
                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }
            if (_.isNil(app_id) || typeof app_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string')
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                //console.log(res);
                const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * qryApp Method(应用详情)
     * GET:/app
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryApp(param) {
        try {
            let api_path = '/app'
                if (JSON.stringify(param) !== '{}') {
                    api_path = '/app?'
                }
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }

            const API_PATH = api_path
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()

                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }

            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                //console.log(res);
                const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * addApp Method(创建应用)
     * ADD:/app
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addApp({ pkg, name, ugrp_id, brief, avatar }) {
        try {
            const API_PATH = '/app'
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }

            if (_.isNil(name) || typeof name !== 'string') {
                throw new ArgumentError('String Type Field: name is required as string not ' + typeof name)
            }

            if (_.isNil(brief) || typeof brief !== 'string') {
                throw new ArgumentError('String Type Field: brief is required as string')
            }

            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: {
                    name: name,
                    brief: brief,
                    avatar: avatar
                }
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * delApp Method(用户删除)
     * DEL:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delApp(app_id) {
        try {
            const API_PATH = '/app/' + app_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()

                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }

            if (_.isNil(app_id) || typeof app_id !== 'string') {
                throw new ArgumentError('String Type Field: app_id is required as string')
            }

            let res = await aliYunClient.delete({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * putApp Method(修改应用)
     * ADD:/app
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function putApp(app_id, put_param) {
        try {
            const API_PATH = '/app/' + app_id
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()
                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }
            let res = await aliYunClient.put({
                url,
            headers: headers,
            signHeaders: { 'X-Ca-Stage': 'RELEASE' },
            params: put_param
            })
            const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * getUser Method(应用详情)
     * GET:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getApp(app_id) {
        const API_PATH = '/app/' + app_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()

            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                    //'apiv': APIV // Use md5 to hash the password
            }

        if (_.isNil(app_id) || typeof app_id !== 'string') {
            throw new ArgumentError('String Type Field: user_id is required as string')
        }

        //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
        let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            //console.log(res);
            const { data } = res
            return data
    }

    /**
     * qryApp Method(应用查询)
     * GET:/app
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryApp(param) {
        try {
            let api_path = '/app'
                if (JSON.stringify(param) !== '{}') {
                    api_path = '/app?'
                }
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
                    //console.log("key: " + key + " ,value: " + param[key]);
            }

            const API_PATH = api_path
                const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
                const localToken = getLocalToken()

                const headers = {
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                        //'apiv': APIV // Use md5 to hash the password
                }

            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                //console.log(res);
                const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * addobj Method(对象添加)
     * ADD:/obj
     *
     * @param {String} key
     *  对象的key名
     * @param {String} value
     *  对象的json过的字符串
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addObj({name,value,type,key1,key2,key3,key4,readonly}) {
        try {
            const API_PATH = '/obj'
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            if (_.isNil(name) || typeof name !== 'string') {
                throw new ArgumentError('String Type Field: name is required as string')
            }
            //字符串,数字,对象都会成功字符串化.
            value = JSON.stringify(value);
            //总结一个非常高端的BUG,下面这个地方,必须要有let, 如果没有let,自己是能够跑通的,但是,如果别人把这个SDK转成ES5标准,就会出现
            //Can't find variable add_params
            //问题就是转换成ES5后,add_params这个变量就丢失了.
            let add_params = {
                name: name,
                value: value
            }
            if (!_.isNil(key1)){
                add_params.key1 = key1 
            }
            if (!_.isNil(type)){
                add_params.type = type
            }
            if (!_.isNil(key2)){
                add_params.key2 = key2 
            }
            if (!_.isNil(key3)){
                add_params.key3 = key3
            }
            if (!_.isNil(key4)){
                add_params.key4 = key4
            }
            if (!_.isNil(readonly)){
                add_params.readonly = readonly
            }
         
            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: add_params
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 1, reason: e, debug: e }
        }
    }

    /**
     * delObj Method(对象删除)
     * DEL:/obj/[objkey]/[objattr]
     * 
     * @param {String} objkey 对象的key.
     *  There should not be any ' ' or '-' between the digit
     * 
     * @param {String} objattr 对象的属性名. 如果为"_all"表示删除整个对象.
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delObj(obj_key) {
        try {
            const API_PATH = '/obj/' + obj_key
            const url = encodeURI(API_END_POINT + API_PATH) 
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }

            if (_.isNil(obj_key) || typeof obj_key !== 'string') {
                throw new ArgumentError('String Type Field: obj_key is required as string')
            }


            let res = await aliYunClient.delete({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * delObjs Method(对象们删除)
     * QRY:/obj/
     * action:DELS
     * 
     * @param {String} objkey 对象的key.
     *  There should not be any ' ' or '-' between the digit
     * 
     * @param {String} objattr 对象的属性名. 如果为"_all"表示删除整个对象.
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delObjs(param) {
        try {
            let api_path = '/obj'
            if (JSON.stringify(param) !== '{}') {
                api_path = '/obj?'
            }
            param["action"] = "DELS"
            //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量
            param["filter"] = JSON.stringify(param["filter"])
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }
            
            const API_PATH = api_path
            //电话号码的+86的+号会在Url丢失
            //const url = encodeURI(API_END_POINT + API_PATH) 
            const url = API_END_POINT + API_PATH
            console.log(url)
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }

            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            //console.log(res);
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }


    /**
     * putObj Method(修改对象)
     * ADD:/app
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function putObj(obj_key,obj_value) {
        try {
            const API_PATH = '/obj/' + obj_key
            const url = encodeURI(API_END_POINT + API_PATH) 
            //因为我们支持中文字符作为key，那么在修改和删除的时候,url上都与有中文,如果不用encodeURI,就会在aliyun.client这个SDK报 Reqeust Path contains unescaped characters 的错误 
            
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            //console.log(url);
            //字符串,数字,对象都会成功字符串化.
            //下面的obj_value一定要用let
            let obj_value_type = typeof obj_value;
            let obj_value_str  = String(obj_value);
            if(obj_value_type == "object"){
                obj_value_str = JSON.stringify(obj_value)
            }
            let res = await aliYunClient.put({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: {value:obj_value_str}
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * getUser Method(对象详情)
     * GET:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getObj(obj_key) {
        const API_PATH = '/obj/' + obj_key
        const url = encodeURI(API_END_POINT + API_PATH) 
        const localToken = getLocalToken()
        const headers = {
            accept: APPLICATION_JSON,
            'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
            Authorization: getLocalToken()
            //'apiv': APIV // Use md5 to hash the password
        }

        if (_.isNil(obj_key) || typeof obj_key !== 'string') {
            throw new ArgumentError('String Type Field: obj_key  is required as string')
        }

        //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
        let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            //console.log(res);
            const { data } = res
            return data
    }

    /**
     * qryObj Method(对象查询)
     * GET:/app
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryObj(param) {
        try {
            let api_path = '/obj'
            if (JSON.stringify(param) !== '{}') {
                api_path = '/obj?'
            }
            param["filter"] = JSON.stringify(param["filter"])
            if (param["group"]){
                param["group"] = JSON.stringify(param["group"])
            }
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }
            
            const API_PATH = api_path
            //电话号码的+86的+号会在Url丢失
            //const url = encodeURI(API_END_POINT + API_PATH) 
            const url = API_END_POINT + API_PATH
            console.log(url)
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }

            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            //console.log(res);
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * hasObj Method(对象存在)
     * GET:/obj
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function hasObj(filter) {
        try {
            let api_path = '/obj'
            if (JSON.stringify(filter) !== '{}') {
                api_path = '/obj?'
            }
            filter = JSON.stringify(filter)
            api_path = api_path + 'hasonly=1&filter='+filter
            
            const API_PATH = api_path
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }

            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            //console.log(res);
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * addfobj Method(文件添加)
     * ADD:/fobj
     *
     * @param {String} key
     *  对象的key名
     * @param {String} value
     *  对象的json过的字符串
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addFobj({url,param,name,note,cato,size,idx1,idx2,idx3,idx4}) {
        try {
            const API_PATH = '/fobj'
            const api_url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            if (_.isNil(url) || typeof url !== 'string') {
                throw new ArgumentError('String Type Field: url is required as string')
            }

            if (_.isNil(size) || typeof size !== 'number') {
                throw new ArgumentError('Integer Type Field: size is required as number')
            }

            if (_.isNil(param) || typeof url !== 'string') {
                param = null
            }
            //字符串,数字,对象都会成功字符串化.
            param = JSON.stringify(param);
            //总结一个非常高端的BUG,下面这个地方,必须要有let, 如果没有let,自己是能够跑通的,但是,如果别人把这个SDK转成ES5标准,就会出现
            //Can't find variable add_params
            //问题就是转换成ES5后,add_params这个变量就丢失了.
            let add_params = {
                url: url,
                param: param,
                note:note,
                name:name,
                cato:cato,
                idx1:idx1,
                idx2:idx2,
                idx3:idx3,
                idx4:idx4,
                size:size
            }
         
            let res = await aliYunClient.post({
                url:api_url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: add_params
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 1, reason: e, debug: e }
        }
    }

    /**
     * delFobj Method(对象删除)
     * DEL:/fobj/[fobjkey]
     * 
     * @param {String} objkey 对象的key.
     *  There should not be any ' ' or '-' between the digit
     * 
     * @param {String} objattr 对象的属性名. 如果为"_all"表示删除整个对象.
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delFobj(fobj_key) {
        try {
            const API_PATH = '/fobj/' + fobj_key
            const url = encodeURI(API_END_POINT + API_PATH) 
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }

            if (_.isNil(fobj_key) || typeof fobj_key !== 'string') {
                throw new ArgumentError('String Type Field: obj_key is required as string')
            }
            let res = await aliYunClient.delete({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }
    /**
     * putObj Method(修改对象)
     * ADD:/app
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function putFobj(fobj_key,fobj_update) {
        try {
            const API_PATH = '/fobj/' + fobj_key
            const url = encodeURI(API_END_POINT + API_PATH) 
            //因为我们支持中文字符作为key，那么在修改和删除的时候,url上都与有中文,如果不用encodeURI,就会在aliyun.client这个SDK报 Reqeust Path contains unescaped characters 的错误 
            
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            //如果在path里有key变量,那么在body里不能有key变量了，否则凉凉，key变量哪都没了。
            console.log(fobj_update);
            fobj_update["param"] = JSON.stringify(fobj_update["param"]);
            let res = await aliYunClient.put({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: fobj_update
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * getUser Method(对象详情)
     * GET:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getFobj(fobj_key) {
        const API_PATH = '/fobj/' + fobj_key
        const url = encodeURI(API_END_POINT + API_PATH) 
        const localToken = getLocalToken()
        const headers = {
            accept: APPLICATION_JSON,
            'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
            Authorization: getLocalToken()
        }

        if (_.isNil(fobj_key) || typeof fobj_key !== 'string') {
            throw new ArgumentError('String Type Field: fobj_key  is required as string')
        }

        //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
        let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
        const { data } = res
        return data
    }

    /**
     * qryFobj Method(对象查询)
     * GET:/fobj?
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryFobj(param) {
        try {
            let api_path = '/fobj'
            if (JSON.stringify(param) !== '{}') {
                api_path = '/fobj?'
            }
            //fixme:这个会影响客户攒param的参数,param有可能是客户端的一个全局变量
            param["filter"] = JSON.stringify(param["filter"])
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }

            const API_PATH = api_path
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()

            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }

            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            //console.log(res);
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }
    
     /**
     * adduinf Method(文件添加)
     * ADD:/uinf
     *
     * @param {String} key
     *  对象的key名
     * @param {String} value
     *  对象的json过的字符串
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addUinf(uid,param) {
        try {
            const API_PATH = '/uinf'
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            if (_.isNil(uid) || typeof uid !== 'string') {
                throw new ArgumentError('String Type Field: uid is required as string')
            }

            if (_.isNil(param) || typeof url !== 'string') {
                param = null
            }
            //字符串,数字,对象都会成功字符串化.
            param = JSON.stringify(param);
            //总结一个非常高端的BUG,下面这个地方,必须要有let, 如果没有let,自己是能够跑通的,但是,如果别人把这个SDK转成ES5标准,就会出现
            //Can't find variable add_params
            //问题就是转换成ES5后,add_params这个变量就丢失了.
            let add_params = {
                uid: uid,
                data: param,
            }
         
            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: add_params
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 1, reason: e, debug: e }
        }
    }


    /**
     * delUinf Method(对象删除)
     * DEL:/uinf/[uinfkey]
     * 
     * @param {String} objkey 对象的key.
     *  There should not be any ' ' or '-' between the digit
     * 
     * @param {String} objattr 对象的属性名. 如果为"_all"表示删除整个对象.
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delUinf(uinf_uid) {
        try {
            const API_PATH = '/uinf/' + uinf_uid
            const url = encodeURI(API_END_POINT + API_PATH) 
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }

            if (_.isNil(uinf_uid) || typeof uinf_uid !== 'string') {
                throw new ArgumentError('String Type Field: obj_key is required as string')
            }
            let res = await aliYunClient.delete({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }
    /**
     * putObj Method(修改对象)
     * ADD:/app
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function putUinf(uinf_uid,update) {
        try {
            console.log(update);
            //因为我们支持中文字符作为key，那么在修改和删除的时候,url上都与有中文,如果不用encodeURI,就会在aliyun.client这个SDK报 Reqeust Path contains unescaped characters 的错误 
            const API_PATH = '/uinf/' + uinf_uid
            const url = encodeURI(API_END_POINT + API_PATH) 
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            let res = await aliYunClient.put({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: {data:JSON.stringify(update)}
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * getUser Method(对象详情)
     * GET:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getUinf(uinf_uid) {
        const API_PATH = '/uinf/' + uinf_uid
        const url = encodeURI(API_END_POINT + API_PATH) 
        const localToken = getLocalToken()
        const headers = {
            accept: APPLICATION_JSON,
            'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
            Authorization: getLocalToken()
        }

        if (_.isNil(uinf_uid) || typeof uinf_uid !== 'string') {
            throw new ArgumentError('String Type Field: uinf_uid  is required as string')
        }

        //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
        let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
        const { data } = res
        return data
    }

    /**
     * qryUinf Method(对象查询)
     * GET:/uinf?
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryUinf(query) {
        try {
            let api_path = '/uinf'
            if (JSON.stringify(query) !== '{}') {
                api_path = '/uinf?'
            }
            query["filter"] = JSON.stringify(query["filter"])
            for (var key in query) {
                api_path = api_path + '&' + key + '=' + query[key]
            }
            
            const API_PATH = api_path
            const url = encodeURI(API_END_POINT + API_PATH) 
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }

            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            //console.log(res);
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }
   
    
    /**
     * addJobq Method(创建工队)
     * ADD:/jobq
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addJobq({name, brief, avatar }) {
        try {
            const API_PATH = '/jobq'
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            if (_.isNil(name) || typeof name !== 'string') {
                throw new ArgumentError('String Type Field: name is required as string not ' + typeof name)
            }

            if (_.isNil(brief) || typeof brief !== 'string') {
                throw new ArgumentError('String Type Field: brief is required as string')
            }

            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: {
                    name: name,
                    brief: brief,
                    avatar: avatar
                }
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * delJobq Method(用户删除)
     * DEL:/jobq
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function delJobq(jobq_id) {
        try {
            const API_PATH = '/jobq/' + jobp_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()

            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }

            if (_.isNil(app_id) || typeof app_id !== 'string') {
                throw new ArgumentError('String Type Field: app_id is required as string')
            }

            let res = await aliYunClient.delete({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
                const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * putApp Method(修改应用)
     * ADD:/app
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function putJobq(jobq_id, put_param) {
        try {
            const API_PATH = '/jobq/' + jobq_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                    //'apiv': APIV // Use md5 to hash the password
            }
            let res = await aliYunClient.put({
                url,
            headers: headers,
            signHeaders: { 'X-Ca-Stage': 'RELEASE' },
            params: put_param
            })
            const { data } = res
                return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * getUser Method(应用详情)
     * GET:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getJobq(jobq_id) {
        const API_PATH = '/jobq/' + jobq_id
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
        if (_.isNil(jobq_id) || typeof jobq_id !== 'string') {
            throw new ArgumentError('String Type Field: user_id is required as string')
        }

        //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
        let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
        const { data } = res
        return data
    }

    /**
     * qryApp Method(应用查询)
     * GET:/app
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryJobq(param) {
        try {
            let jobq_path = '/jobq'
            if (JSON.stringify(param) !== '{}') {
                api_path = '/jobq?'
            }
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
            }

            const API_PATH = api_path
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * qryGwenv Method(对象查询)
     * GET:/gwenv
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryGwenv({where,limit,order,dataform}) {
        try {
            if (typeof where !== "string"){
                where = JSON.stringify(where)
            }
 
            const qryParam = {
                "where":where,
                "limit":limit,
                "order":order, 
                "dataform":dataform, 
            }
           
            let api_path = '/gwenv'
            if (JSON.stringify(qryParam) !== '{}') {
                api_path = '/gwenv?'
            }
            for (var key in qryParam) {
                api_path = api_path + '&' + key + '=' + qryParam[key]
            }
            const API_PATH = api_path
            //电话号码的+86的+号会在Url丢失
            //const url = encodeURI(API_END_POINT + API_PATH) 
            const url = API_END_POINT + API_PATH
            console.log(url)
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * qryDvenv Method(对象查询)
     * GET:/dvenv
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryDvenv({where,limit,order,dataform}) {
        try {
            if (typeof where !== "string"){
                where = JSON.stringify(where)
            }
 
            const qryParam = {
                "where":where,
                "limit":limit,
                "order":order, 
                "dataform":dataform, 
            }
           
            let api_path = '/dvenv'
            if (JSON.stringify(qryParam) !== '{}') {
                api_path = '/dvenv?'
            }
            for (var key in qryParam) {
                api_path = api_path + '&' + key + '=' + qryParam[key]
            }
            const API_PATH = api_path
            //电话号码的+86的+号会在Url丢失
            //const url = encodeURI(API_END_POINT + API_PATH) 
            const url = API_END_POINT + API_PATH
            console.log(url)
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }



    /**
     * qryGwlog Method(对象查询)
     * GET:/gwlog
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryGwlog({where,limit,order}) {
        try {
            if (typeof where !== "string"){
                where = JSON.stringify(where)
            }
            
            
            console.log(where)
            const qryParam = {
                "where":where,
                "limit":limit,
                "order":order 
            }



            let api_path = '/gwlog'
            if (JSON.stringify(qryParam) !== '{}') {
                api_path = '/gwlog?'
            }
            for (var key in qryParam) {
                api_path = api_path + '&' + key + '=' + qryParam[key]
            }
            const API_PATH = api_path
            //电话号码的+86的+号会在Url丢失
            const url = API_END_POINT + API_PATH
            //const url = encodeURI(API_END_POINT + API_PATH) 
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * qryDvlog Method(对象查询)
     * GET:/dvlog
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function qryDvlog({where,limit,order}) {
        try {
            if (typeof where !== "string"){
                where = JSON.stringify(where)
            }
 
            const qryParam = {
                "where":where,
                "limit":limit,
                "order":order 
            }
            
            let api_path = '/dvlog'
            if (JSON.stringify(qryParam) !== '{}') {
                api_path = '/dvlog?'
            }

            for (var key in qryParam) {
                api_path = api_path + '&' + key + '=' + qryParam[key]
            }
            const API_PATH = api_path
            //电话号码的+86的+号会在Url丢失
            //const url = encodeURI(API_END_POINT + API_PATH) 
            const url = API_END_POINT + API_PATH
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * qryDvlog Method(生成一个iot设备的密码)
     * GET:/dvlog
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */

    async function addIotpass(add_params) {
        try {
            const API_PATH = '/iotpass'
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
    
            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: add_params
            })
            console.log(res)
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }


    /*------------------------------------------------------------*/

    return {
        initialize,
        addToken,
        getToken,
        isLogin,
        logout,
        login,
        signup,
        addUser,
        delUser,
        getUser,
        qryUser,
        putUser,
        addUgrp,
        delUgrp,
        getUgrp,
        putUgrp,
        qryUgrp,
        addZone,
        delZone,
        getZone,
        putZone,
        qryZone,
        addRole,
        delRole,
        getRole,
        putRole,
        qryRole,
        addRule,
        delRule,
        getRule,
        putRule,
        qryRule,
        addRoue,
        delRoue,
        getRoue,
        putRoue,
        qryRoue,
        delRoues,
        addUsro,
        delUsro,
        getUsro,
        putUsro,
        qryUsro,
        addUaff,
        delUaff,
        getUaff,
        putUaff,
        qryUaff,
        addApp,
        delApp,
        getApp,
        putApp,
        qryApp,
        addObj,
        delObj,
        delObjs,
        putObj,
        getObj,
        qryObj,
        hasObj,
        addFobj,
        delFobj,
        putFobj,
        getFobj,
        qryFobj,
        addUinf,
        delUinf,
        putUinf,
        getUinf,
        qryUinf,
        addJobq,
        delJobq,
        getJobq,
        putJobq,
        qryJobq,
        addVfcodeByTel,
        addVfcodeByMail,
        rstPass,
        chgPass,
        addfile,
        addavatar,
        addblob,
        qryGwlog,
        qryDvlog,
        qryGwenv,
        qryDvenv,
        addIotpass
    }
}

module.exports = xdua
