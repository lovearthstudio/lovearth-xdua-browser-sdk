'use strict'

const _ = require('lodash')
const UAParser = require('ua-parser-js')
const ArgumentError = require('./exceptions/ArgumentError')
const md5 = require('./utils/md5')
const { APPLICATION_JSON, APPLICATION_X_WWW_FORM_URLENCODED } = require('./constants/contentType')
const { getClient, addfile } = require('./oss/oss-client')

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

async function lovearth({ APP_SECRET, APP_KEY }) {
    setAppKey(APP_KEY)
    setAppSecret(APP_SECRET)
    /**
     * 如果本地已经有一个token了,那么要判断这个匿名token是否过期了，
     * 地球号机制给所有的匿名token统一的24小时有效期。
     * 用户创建应用的时候也可以制定自己这个应用的有效期是多久。
     * 如果有效期已经过了，就需要重新申请匿名令牌。
     * 如果令牌的本地存储被人删除了,就需要也需要重新申请匿名令牌。 
     **/
    async function initialize() {
        try{
            let localToken = getLocalToken(); 
            if (_.isNil(localToken)) {
                await addToken();
            }else{
                let res = await getToken(localToken)
                let data = res.result.data
                if (data.vtl < 0 ) {
                    await addToken();
                }
            }
        }catch(e){
            console.log(e);
        }
        return null;
    }
    
    //初始化lovearth时如果要默认初始化一次initialize,在外部就要await lovearth(KEY,SECRET) 
    await initialize();
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
        
            const sign = generateSign({ method: 'POST', path: '/auth', appSecret: getAppSecret(), appKey: getAppKey() })
            let headers = {
                'Content-Type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': sign
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
            const sign = generateSign({ method: 'GET', path: '/token/'+token, appSecret: getAppSecret(), appKey: getAppKey() })
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: sign
            }
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            if (data.error === 0) {
                return data;
            } else {
                //console.log(data);
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
            }else{
                let res = await getToken(localToken)
                let data = res.result.data
                if (data.vtl > 0 && data.uid != "anonymus") {
                    isLogin = true
                }
            }
            return { error: 0, result: { isLogin } }
        } catch (e) {
            return { error: 2, result: {}, debug: {} }
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
    async function login({ by, ustr, pwd, ugrp, role }) {
        try {
            if (_.isNil(by) || typeof by !== 'string') {
                throw new ArgumentError('String Type Field: by is required')
            }
            if (_.isNil(ustr) || typeof ustr !== 'string') {
                throw new ArgumentError('String Type Field: ustr is required')
            }
            if (_.isNil(pwd) || typeof pwd !== 'string') {
                throw new ArgumentError('String Type Field: pwd is required')
            }
            if (_.isNil(ugrp) || typeof ugrp !== 'string') {
                throw new ArgumentError('String Type Field: ugrp is required')
            }
            if (_.isNil(role) || typeof role !== 'string') {
                throw new ArgumentError('String Type Field: role is required')
            }
            const url = API_END_POINT + '/login'
                const localToken = getLocalToken()
                console.log(localToken)
                const headers = {
                    //'apiv'          : APIV,
                    accept: APPLICATION_JSON,
                    'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                    Authorization: getLocalToken()
                }
            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
            params: {
                by: by,
                ustr: ustr,
                pwd: pwd,
                ugrp: ugrp,
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
     * adduser Method(用户注册-电话)
     * ADD:/user
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addUser({ by, ustr, pwd, vfcode, incode, ugrp, role }) {
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
                    by: by,
                    ustr: ustr,
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
    async function putUser(user_id, put_param) {
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
            let res = await aliYunClient.put({
                url,
            headers: headers,
            signHeaders: { 'X-Ca-Stage': 'RELEASE' },
            params: put_param
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
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getUser(user_id) {
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
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
                    console.log('key: ' + key + ' ,value: ' + param[key])
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
                throw new ArgumentError('String Type Field: role is required as string')
            }
            if (_.isNil(towho) || typeof towho !== 'string') {
                throw new ArgumentError('String Type Field: towho is required as string not ' + typeof name)
            }
            if (_.isNil(ugrp_id) || typeof ugrp_id !== 'string') {
                throw new ArgumentError('String Type Field: ugrp is required as string')
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
            for (var key in param) {
                api_path = api_path + '&' + key + '=' + param[key]
                    console.log('key: ' + key + ' ,value: ' + param[key])
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
                    console.log('key: ' + key + ' ,value: ' + param[key])
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

            if (_.isNil(pkg) || typeof pkg !== 'string') {
                throw new ArgumentError('String Type Field: pkg is required as string')
            }

            if (_.isNil(name) || typeof name !== 'string') {
                throw new ArgumentError('String Type Field: name is required as string not ' + typeof name)
            }

            if (_.isNil(ugrp_id) || typeof ugrp_id !== 'string') {
                throw new ArgumentError('String Type Field: ugrp_id is required as string not ' + typeof ugrp)
            }

            if (_.isNil(brief) || typeof brief !== 'string') {
                throw new ArgumentError('String Type Field: brief is required as string')
            }

            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: {
                pkg: pkg,
                name: name,
                ugrp_id: ugrp_id,
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
    async function addObj({ key,value,key2,key3,key4,readonly}) {
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
            if (_.isNil(key) || typeof key !== 'string') {
                throw new ArgumentError('String Type Field: key is required as string')
            }
            //字符串,数字,对象都会成功字符串化.
            value = JSON.stringify(value);
            add_params = {
                key: key,
                value: value
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
            console.log(url);
            //字符串,数字,对象都会成功字符串化.
            obj_value = JSON.stringify(obj_value)
            let res = await aliYunClient.put({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: {value:obj_value}
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
     * addUsrz Method(创建授区)
     * ADD:/usrz
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addUsrz({towho,zone_id}) {
        try {
            const API_PATH = '/usrz'
            const url = API_END_POINT + API_PATH // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            if (_.isNil(towho) || typeof towho !== 'string') {
                throw new ArgumentError('String Type Field: code is required as string')
            }
            if (_.isNil(zone_id) || typeof zone_id !== 'string') {
                throw new ArgumentError('String Type Field: name is required as string not ' + typeof name)
            }
            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: {
                    towho: towho,
                    zone_id: zone_id,
                }
            })
            const { data } = res
                return data
        } catch (e) {
            return { error: 1, reason: e, debug: e }
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
        addRole,
        delRole,
        getRole,
        putRole,
        qryRole,
        addUsro,
        delUsro,
        getUsro,
        putUsro,
        qryUsro,
        addUsrz,
        addApp,
        delApp,
        getApp,
        putApp,
        qryApp,
        addObj,
        delObj,
        putObj,
        getObj,
        qryObj,
        addVfcodeByTel,
        addVfcodeByMail,
        rstPass,
        chgPass,
        addfile
    }
}

module.exports = lovearth
