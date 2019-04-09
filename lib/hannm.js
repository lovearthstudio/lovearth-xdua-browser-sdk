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

async function hannm({ APP_SECRET, APP_KEY }) {
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
     * putObj Method(修改对象)
     * ADD:/app
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addIdcardValidation(params) {
        try {
            const API_PATH = '/idcardvalidation'
            const url = encodeURI(HAM_API_END_POINT + API_PATH) 
            //因为我们支持中文字符作为key，那么在修改和删除的时候,url上都与有中文,如果不用encodeURI,就会在aliyun.client这个SDK报 Reqeust Path contains unescaped characters 的错误 
            
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            //字符串,数字,对象都会成功字符串化.
            let res = await aliYunClient.post({
                url,
                headers: headers,
                signHeaders: { 'X-Ca-Stage': 'RELEASE' },
                params: params
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }

    /**
     * 获取公司标签
     * GET:/comtags
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getComtags(com_name) {
        try {
            const API_PATH = '/comtags/' + com_name
            const url = encodeURI(HAM_API_END_POINT + API_PATH) 
            const localToken = getLocalToken()
            console.log(localToken);
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: localToken
                //'apiv': APIV // Use md5 to hash the password
            }
            if (_.isNil(com_name) || typeof com_name !== 'string') {
                throw new ArgumentError('String Type Field: obj_key  is required as string')
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
     * 获取IP地址对应位置信息
     * GET:/comtags
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getIploc(ip) {
        try {
            const API_PATH = '/iploc/' + ip
            const url = encodeURI(HAM_API_END_POINT + API_PATH) 
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
            }
            if (_.isNil(ip) || typeof ip !== 'string') {
                throw new ArgumentError('String Type Field: obj_key  is required as string')
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {return { error: 2, reason: e, result: {}, debug: {} }}
    }

    /**
     * 获取手机号码位置信息
     * GET:/comtags
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getTeloc(tel) {
        try {
            const API_PATH = '/teloc/' + tel
            const url = encodeURI(HAM_API_END_POINT + API_PATH) 
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            if (_.isNil(tel) || typeof tel !== 'string') {
                throw new ArgumentError('String Type Field: tel  is required as string')
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {return { error: 2, reason: e, result: {}, debug: {} }}
    }

    /**
     * 获取企业相似企业
     * GET:/comtags
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function getSimcom(com_name) {
        try {
            const API_PATH = '/simcom/' + com_name
            const url = encodeURI(HAM_API_END_POINT + API_PATH) 
            const localToken = getLocalToken()
            const headers = {
                accept: APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                Authorization: getLocalToken()
                //'apiv': APIV // Use md5 to hash the password
            }
            if (_.isNil(com_name) || typeof com_name !== 'string') {
                throw new ArgumentError('String Type Field: tel  is required as string')
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({ url, headers: headers, signHeaders: { 'X-Ca-Stage': 'RELEASE' } })
            const { data } = res
            return data
        } catch (e) {return { error: 2, reason: e, result: {}, debug: {} }}
    }

    /*------------------------------------------------------------*/

    /**
     * 测试Parkinson的几大症状
     * GET:/comtags
     *
     * @param {String} username The phone number of the registered user, should be like '15810419011'.
     *  There should not be any ' ' or '-' between the digit
     * @param {String} password the password of the user
     * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
     */
    async function addParStand(params) {
        try {
            const API_PATH = '/parstand'
            const url = encodeURI(HAM_API_END_POINT + API_PATH) 
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
                params: params
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }
    async function addParTremor(params) {
        try {
            const API_PATH = '/partremor'
            const url = encodeURI(HAM_API_END_POINT + API_PATH) 
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
                params: params
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }
    async function addParStride(params) {
        try {
            const API_PATH = '/parstride'
            const url = encodeURI(HAM_API_END_POINT + API_PATH) 
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
                params: params
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }
    async function addParTapping(params) {
        try {
            const API_PATH = '/parstride'
            const url = encodeURI(HAM_API_END_POINT + API_PATH) 
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
                params: params
            })
            const { data } = res
            return data
        } catch (e) {
            return { error: 2, reason: e, result: {}, debug: {} }
        }
    }



    /**-----------------------*/
    return {
        initialize,
        addToken,
        getToken,
        addIdcardValidation,
        getComtags,
        getIploc,
        getTeloc,
        getSimcom,
        addParStride,
        addParStand,
        addParTremor,
        addParTapping
    }
}

module.exports = hannm
