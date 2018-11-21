"use strict";

const _ = require('lodash');
const UAParser = require('ua-parser-js');
const ArgumentError = require('./exceptions/ArgumentError');
const md5 = require('./utils/md5');
const {
    APPLICATION_JSON,
    APPLICATION_X_WWW_FORM_URLENCODED
} = require('./constants/contentType');
const {getClient,upload} = require('./oss/oss-client')

const {
    APIV,
    API_END_POINT,
    setAppSecret,
    setAppKey,
    getAppSecret,
    getAppKey,
    setLocalToken,
    getLocalToken
} = require('./constants');

const {
    generateSign
} = require('./utils/Sign')();

const aliYunClient = require('./aliyunClient');

function lovearth({
    APP_SECRET,
    APP_KEY
}) {
    setAppKey(APP_KEY);
    setAppSecret(APP_SECRET);

    async function initialize() {
        //如果localstorage没有api_token,那一定要去获取api_token
        //如果localstorage由api_token,但是过期了,那也去要去获取api_token
        //下面的代码是原来用来验证token有效性的代码，是从本地localstorage的过期时间来检查的，这种机制以后要换掉,换成全是服务器端来做检查。
        //let cur_time = Math.ceil((new Date()).getTime() / 1000);
        //let api_info = localStorage.getItem('api_info');
        //let api_token_expired = true;
        //if(api_info!=null) {
        //    let api_token_expire_time = parseInt(api_info.token_expired_time);
        //    if(api_token_expire_time < cur_time){
        //        return
        //    }
        //}
        let promiseList = [];
        promiseList.push(addToken());
        return Promise.all(promiseList);
    }

    async function addToken(model = 'unknown', man = 'unknown', os = 'unknown') {
        try{
            let parser = new UAParser();
            let ua_info = parser.getResult();
            let params = {
                dsn: md5(ua_info.ua),
                type: 'browser',
                model: ua_info.device.model == undefined ? 'undefined':ua_info.device.model,
                man: ua_info.device.vendor == undefined ? 'undefined':ua_info.device.vendor,
                os: ua_info.os.name+' '+ua_info.os.version,
                apv: '1.0.0',
                aname: 'www.xdua.com',
                app: 'com.wikicivi.admin',
                channel: 'RELEASE',
                pkg: 'com.lovearthstudio.test'
            };
            
            const sign = generateSign({'method': 'POST','path': "/auth",'appSecret': getAppSecret(),'appKey': getAppKey()})
            let headers = {
                'Content-Type': APPLICATION_X_WWW_FORM_URLENCODED,
                //'apiv': APIV,
                'Authorization': sign
            };
            let res =  await aliYunClient.post({url: API_END_POINT + "/auth",headers,params});
            const {data} = res;
            if (data.error === 0) {
                let {token} = data.result;
                setLocalToken(token);
            }         
            return data;
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
        }

    }
   
    /**
     * 获取本地localstorage存储的token去后台解析里面的内容然后返回.
     * 解析的内容里包含它的过期时间还剩下多少秒,客户端以此来判断
     * fixme:测试本接口
     * */
    async function getToken() {
        try{
            let localToken = getLocalToken();
            //let localToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NDI3ODMwNjcsIm5iZiI6MTU0Mjc4MzA2NywiZXhwIjoxNTQyNzg2NjY3LCJpc3MiOiJMb3ZlYXJ0aCBEVUEgU2VydmljZSIsImF1ZCI6IkxvdmVhcnRoIEluYyIsImR1YSI6IlU5Z2JhQk1yIiwiZGlkIjoiSmtkYks3YkUiLCJ1aWQiOiJEdDVtdnJ0VSIsImFpZCI6ImFIRVZZaEUxIn0.Rj8k4gpwN038Wn4geOmLiqsrICZtpBrsyCXrdX-AMbIQE1qCqo_2s3JmGEkAvB-tmDNEKL1nLXB_HebsYsA5fjgakfVLGXL8gBo7zg4Y7HTF2MhJqo1dFZQ93R4ZrbwkI65jnxOl_rSuKG-3PiZXdRSlLT2LYDGei-JT5f1dW7gfKGqBrElazkhE0nxPc5I2lFjXTthKeQOjAWwLhkarTqhV8nYyzmQvEMrfje6Pj7J-flCJmyPUqa82ZIoKilyNoMYOZTPXa34kiMkPnnferb4puen7vXBwQBPHIhZi5TfaNmCyDCeHFexNZ5INi75MH-VjzCyOYNv6dlBwmPftkw";
            if (_.isNil(localToken) || localToken == ""){
                console.log("fail to find local token turn to backend for anonymous token")
                const res = await addToken();
                const data = res.data;
                if (data.error !== 0) {
                    throw new Error('fail to get Token');
                }
                const {token} = data.result;
                setLocalToken(token);
                localToken = token;
            }
            
            //console.log(localToken);
            const url = API_END_POINT + '/token/'+localToken; 
            const headers = {
                'accept'        : APPLICATION_JSON,
                'content-type'  : APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization' : localToken
            };
            let res = await aliYunClient.get({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            const {data} = res;
            if (data.error === 0) {
                return data;
            }else{
                //console.log(data);
                throw new Error('fail to get Token profile');
                return null;
            }         
        }catch(e){
            return {error:2,reason:String(e),result:{},debug:{}}; 
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
    async function login({
        by,
        ustr,
        pwd,
        ugrp,
        role
    }) {
        try{
            if (_.isNil(by)     || typeof by    !== 'string') {throw new ArgumentError('String Type Field: by is required');}
            if (_.isNil(ustr)   || typeof ustr  !== 'string') {throw new ArgumentError('String Type Field: ustr is required');}
            if (_.isNil(pwd)    || typeof pwd   !== 'string') {throw new ArgumentError('String Type Field: pwd is required');}
            if (_.isNil(ugrp)   || typeof ugrp  !== 'string') {throw new ArgumentError('String Type Field: ugrp is required');}
            if (_.isNil(role)   || typeof role  !== 'string') {throw new ArgumentError('String Type Field: role is required');}
            const url = API_END_POINT + '/login'; 
            const localToken = getLocalToken();
            // console.log(localToken)
            const headers = {
                //'apiv'          : APIV,
                'accept'        : APPLICATION_JSON,
                'content-type'  : APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization' : getLocalToken()
            };
            let res = await aliYunClient.post({url,headers: headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},
                params: {
                    by  : by,
                    ustr: ustr,
                    pwd : pwd,
                    ugrp: ugrp,
                    role: role,
                }
            });
            const {data} = res;
            if (data.error === 0) {
                let {token} = data.result;
                setLocalToken(token);
            }         
            return data;
        }catch(e){
            console.log(e)
            return {error:2,reason:e,result:{},debug:{}}; 
        }
    }
    
    
    async function addVfcodeByTel(tel) {
        try{
            const API_PATH = '/vfc';
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept'        : APPLICATION_JSON,
                'content-type'  : APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization' : getLocalToken(),
                //'apiv'          : APIV // Use md5 to hash the password
            };

            if (_.isNil(tel) || typeof tel !== 'string') {
                throw new ArgumentError('String Type Field: tel is required as string');
            }
              
            let res = await aliYunClient.post({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},
                params: {vfaddr: tel,tmpl: "SMS_25335288"}
            });
            //console.log(res);
            const {data} = res;
            return data;            
        }catch(e){
            console.log(e); 
            return {error:2,reason:e,result:{},debug:{}}; 
        }
   
    }
    /**
     * 根据邮件地址获取验证码
     **/
    async function addVfcodeByMail(mail) {
        try{
            const API_PATH = '/vfc';
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            
            const headers = {
                'accept'        : APPLICATION_JSON,
                'content-type'  : APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization' : getLocalToken(),
                //'apiv'          : APIV // Use md5 to hash the password
            };
            
            if (_.isNil(mail) || typeof mail !== 'string') {
                throw new ArgumentError('String Type Field: mail is required as string');
            }
              
            let res = await aliYunClient.post({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},
                params: {vfaddr: mail,tmpl: "DMS_VFC4USEREG"}
            });
            const {data} = res;
            return data;           
        }catch(e){
            console.log(e); 
            return {error:2,reason:e,result:{},debug:{}}; 
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
    async function rstPass({
        by,
        ustr,
        pwd,
        vfcode,
    }) {
        try{
            const API_PATH = '/pass';
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            if (_.isNil(by) || typeof by !== 'string') {
                throw new ArgumentError('String Type Field: by is required as string');
            }
            if (_.isNil(ustr) || typeof ustr !== 'string') {
                throw new ArgumentError('String Type Field: ustr is required as string');
            }
            if (_.isNil(pwd) || typeof pwd !== 'string') {
                throw new ArgumentError('String Type Field: pwd is required as string');
            }
            if (_.isNil(vfcode) || typeof vfcode !== 'string') {
                throw new ArgumentError('String Type Field:vfcode is required as string');
            }
              
            let res = await aliYunClient.post({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},
                params: {
                    by: by,
                    ustr: ustr,
                    vfcode: vfcode,
                    pwd: pwd,
                }
            });
            const {data} = res;
            return data;        
        }catch(e){
            console.log(e); 
            return {error:2,reason:e,result:{},debug:{}}; 
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
    async function chgPass(user_id,{
        oldpwd,
        newpwd
    }) {
        try{
            const API_PATH = '/pass/'+user_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            
            if (_.isNil(user_id) || typeof user_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string');
            }
            
            
            if (_.isNil(oldpwd) || typeof oldpwd !== 'string') {
                throw new ArgumentError('String Type Field: oldpwd is required as string');
            }
            
            if (_.isNil(newpwd) || typeof newpwd !== 'string') {
                throw new ArgumentError('String Type Field: pwd is required as string');
            }
            //下面这个try-catch可以捕捉云平台出现的错误.
            //另外注意,pathParameters不要出现在params里,否则阿里云API网关会自动发出MissingParameter的错误. 
            let res = await aliYunClient.put({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},
                params: {newpwd : newpwd,oldpwd : oldpwd,}
            });
            const data = res.data;
            return data; 
        }catch(e){
            return {error:1,reason:e,debug:e};
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
    async function addUser({
        by,
        ustr,
        pwd,
        vfcode,
        incode,
        ugrp,
        role   
    }) {
        try{
            const API_PATH = '/user';
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            if (_.isNil(by) || typeof by !== 'string') {
                throw new ArgumentError('String Type Field: by is required as string');
            }
            /**
             * 如果注册接口不设置incode,那么系统自动补充成字符串incode.
             * 它是默认的邀请码.
             * */
            if (_.isNil(incode)){incode = "incode";}

            if (incode == ""){incode = "incode";}

            if (_.isNil(ustr) || typeof ustr !== 'string') {
                throw new ArgumentError('String Type Field: ustr is required as string');
            }
            
            if (_.isNil(pwd) || typeof pwd !== 'string') {
                throw new ArgumentError('String Type Field: pwd is required as string');
            }
            
            if (_.isNil(vfcode) || typeof vfcode !== 'string') {
                throw new ArgumentError('String Type Field:vfcode is required as string');
            }
            
            if (_.isNil(incode) || typeof incode !== 'string') {
                throw new ArgumentError('String Type Field:incode is required as string');
            }
            
            if (_.isNil(ugrp) || typeof ugrp !== 'string') {
                throw new ArgumentError('String Type Field:ugrp is required as string');
            }
            
            if (_.isNil(role) || typeof role !== 'string') {
                throw new ArgumentError('String Type Field:role is required as string');
            }
              
            let res = await aliYunClient.post({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},
                params: {
                    by: by,
                    ustr: ustr,
                    vfcode: vfcode,
                    incode: incode,
                    pwd   : pwd,
                    ugrp    : ugrp,
                    role: role
                }
            });
            const {data} = res;
            return data;               
        }catch(e){
            return {error:1,reason:e,debug:e};
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
        try{
            const API_PATH = '/user/'+user_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            if (_.isNil(user_id) || typeof user_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string');
            }
            let res = await aliYunClient.delete({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            const {data} = res;
            return data;               
        }catch(e){
            return {error:1,reason:e,debug:e};
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
    async function putUser(user_id,put_param) {
        try{
            const API_PATH = '/user/'+user_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            let res = await aliYunClient.put({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},
                params: put_param        });
            const {data} = res;
            return data;            
        }catch(e){
            return {error:1,reason:e,debug:e};
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
        try{
            const API_PATH = '/user/'+user_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            
            if (_.isNil(user_id) || typeof user_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string');
            }
             
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            //console.log(res);
            const {data} = res;
            return data;  
        }catch(e){
            return {error:1,reason:e,debug:e};
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
        try{
            let api_path = '/user';
            if (JSON.stringify(param) !== "{}"){
                api_path = '/user?';
            }
            for(var key in param){
                api_path = api_path + "&"+key+"="+param[key];
                //console.log("key: " + key + " ,value: " + param[key]);
            }
            
            const API_PATH = api_path;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
             
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            //console.log(res);
            const {data} = res;
            return data;        
        }catch(e){
            return {error:1,reason:e,debug:e};
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
    async function addUgrp({
        code,
        name,
        brief,
        avatar,
    }) {
        try{
            const API_PATH = '/ugrp';
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            if (_.isNil(code) || typeof code  !== 'string') {
                throw new ArgumentError('String Type Field: code is required as string');
            }
            if (_.isNil(name) || typeof name !== 'string') {
                throw new ArgumentError('String Type Field: name is required as string not '+typeof(name));
            }
            if (_.isNil(brief) || typeof brief !== 'string') {
                throw new ArgumentError('String Type Field: brief is required as string');
            }
            let res = await aliYunClient.post({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},
                params: {
                    code: code,
                    name: name,
                    brief: brief,
                    avatar: avatar,
                }
            });
            const {data} = res;
            return data;               
        }catch(e){
            return {error:1,reason:e,debug:e};
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
        try{
            const API_PATH = '/ugrp/'+ugrp_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };

            if (_.isNil(ugrp_id) || typeof ugrp_id !== 'string') {
                throw new ArgumentError('String Type Field: ugrp_id is required as string');
            }
             
            let res = await aliYunClient.delete({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            const {data} = res;
            return data;               
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}};       
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
    async function putUgrp(ugrp_id,put_param) {
        try{
            const API_PATH = '/ugrp/'+ugrp_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            let res = await aliYunClient.put({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},params: put_param        });
            const {data} = res;
            return data;        
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
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
        try{
            const API_PATH = '/ugrp/'+ugrp_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };

            if (_.isNil(ugrp_id) || typeof ugrp_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string');
            }
             
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            //console.log(res);
            const {data} = res;
            return data;               
        }catch(e){
            console.log(e);
            return {error:2,reason:e,result:{}} 
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
        try{
            let api_path = '/ugrp';
            if (JSON.stringify(param) !== "{}"){
                api_path = '/ugrp?';
            }
            for(var key in param){
                api_path = api_path + "&"+key+"="+param[key];
                console.log("key: " + key + " ,value: " + param[key]);
            }
            
            const API_PATH = api_path;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            const {data} = res;
            return data;        
        }catch(e){
            console.log(e);
            return {error:2,reason:e,result:{}} 
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
    async function addRole({
        code,
        name,
        ugrp_id,
        granter,
    }) {
        try{
            const API_PATH = '/role';
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            if (_.isNil(code) || typeof code  !== 'string') {
                throw new ArgumentError('String Type Field: code is required as string');
            }
            
            if (_.isNil(name) || typeof name !== 'string') {
                throw new ArgumentError('String Type Field: name is required as string not '+typeof(name));
            }
            
            if (_.isNil(ugrp_id) || typeof ugrp_id !== 'string') {
                throw new ArgumentError('String Type Field: ugrp_id is required as string');
            }
              
            let res = await aliYunClient.post({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},
                params: {
                    code: code,
                    name: name,
                    ugrp_id: ugrp_id,
                    granter: granter,
                }
            });
            const {data} = res;
            return data;        
        }catch(e){
            console.log(e)
            return {error:2,reason:e,result:{},debug:{}}; 
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
        try{
            const API_PATH = '/role/'+role_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            if (_.isNil(role_id) || typeof role_id !== 'string') {
                throw new ArgumentError('String Type Field: role_id is required as string');
            }
            let res = await aliYunClient.delete({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            const {data} = res;
            return data;        
        }catch(e){
            console.log(e);
            return {error:2,reason:e,result:{},debug:{}};
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
    async function putRole(role_id,put_param) {
        try{
            const API_PATH = '/role/'+role_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            let res = await aliYunClient.put({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},params: put_param        });
            const {data} = res;
            return data;               
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}};
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
        try{
            const API_PATH = '/role/'+role_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            if (_.isNil(role_id) || typeof role_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string');
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            //console.log(res);
            const {data} = res;
            return data;              
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
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
        try{
            let api_path = '/role';
            if (JSON.stringify(param) !== "{}"){
                api_path = '/role?';
            }
            for(var key in param){
                api_path = api_path + "&"+key+"="+param[key];
                //console.log("key: " + key + " ,value: " + param[key]);
            }
            
            const API_PATH = api_path;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
             
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            //console.log(res);
            const {data} = res;
            return data;        
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
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
    async function addUsro({
        role_id,
        ugrp_id,
        towho,
    }) {
        try{
            const API_PATH = '/usro';
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            if (_.isNil(role_id) || typeof role_id  !== 'string') {
                throw new ArgumentError('String Type Field: role is required as string');
            }
            if (_.isNil(towho) || typeof towho !== 'string') {
                throw new ArgumentError('String Type Field: towho is required as string not '+typeof(name));
            }
            if (_.isNil(ugrp_id) || typeof ugrp_id !== 'string') {
                throw new ArgumentError('String Type Field: ugrp is required as string');
            }
              
            let res = await aliYunClient.post({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},
                params: {
                    role_id: role_id,
                    ugrp_id: ugrp_id,
                    towho: towho,
                }
            });
            const {data} = res;
            return data;        
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
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
        try{
            const API_PATH = '/usro/'+usro_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };

            if (_.isNil(usro_id) || typeof usro_id !== 'string') {
                throw new ArgumentError('String Type Field: usro_id is required as string');
            }
             
            let res = await aliYunClient.delete({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            const {data} = res;
            return data;        
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
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
    async function putUsro(usro_id,put_param) {
        try{
            const API_PATH = '/usro/'+usro_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
        
              
            let res = await aliYunClient.put({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},
                params: put_param        });
            //console.log(res);
            const {data} = res;
            return data;        
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}};
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
        try{
            const API_PATH = '/usro/'+usro_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            if (_.isNil(usro_id) || typeof usro_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string');
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            //console.log(res);
            const {data} = res;
            return data;        
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
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
        try{
            let api_path = '/usro';
            if (JSON.stringify(param) !== "{}"){
                api_path = '/usro?';
            }
            for(var key in param){
                api_path = api_path + "&"+key+"="+param[key];
                console.log("key: " + key + " ,value: " + param[key]);
            }
            const API_PATH = api_path;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
             
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            //console.log(res);
            const {data} = res;
            return data;        
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
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
        try{
            const API_PATH = '/app/'+app_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };

            if (_.isNil(app_id) || typeof app_id !== 'string') {
                throw new ArgumentError('String Type Field: app_id is required as string');
            }
             
            let res = await aliYunClient.delete({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            const {data} = res;
            return data;        
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
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
    async function putApp(app_id,put_param) {
        try{
            const API_PATH = '/app/'+app_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            let res = await aliYunClient.put({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},
                params: put_param        });
            const {data} = res;
            return data;               
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
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
        try{
            const API_PATH = '/app/'+app_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            if (_.isNil(app_id) || typeof app_id !== 'string') {
                throw new ArgumentError('String Type Field: user_id is required as string');
            }
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            //console.log(res);
            const {data} = res;
            return data;
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
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
        try{
             let api_path = '/app';
            if (JSON.stringify(param) !== "{}"){
                api_path = '/app?';
            }
            for(var key in param){
                api_path = api_path + "&"+key+"="+param[key];
                console.log("key: " + key + " ,value: " + param[key]);
            }
            
            const API_PATH = api_path;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
             
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            //console.log(res);
            const {data} = res;
            return data;        
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
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
    async function addApp({
        pkg,
        name,
        ugrp_id,
        brief,
        avatar,
    }) {
        try{
             const API_PATH = '/app';
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };

            if (_.isNil(pkg) || typeof pkg  !== 'string') {
                throw new ArgumentError('String Type Field: pkg is required as string');
            }
            
            if (_.isNil(name) || typeof name !== 'string') {
                throw new ArgumentError('String Type Field: name is required as string not '+typeof(name));
            }
            
            if (_.isNil(ugrp_id) || typeof ugrp_id !== 'string') {
                throw new ArgumentError('String Type Field: ugrp_id is required as string not '+typeof(ugrp));
            }
            
            if (_.isNil(brief) || typeof brief !== 'string') {
                throw new ArgumentError('String Type Field: brief is required as string');
            }
              
            let res = await aliYunClient.post({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},
                params: {
                    pkg: pkg,
                    name: name,
                    ugrp_id: ugrp_id,
                    brief: brief,
                    avatar: avatar,
                }
            });
            const {data} = res;
            return data;        
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
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
        try{
            const API_PATH = '/app/'+app_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            
            if (_.isNil(app_id) || typeof app_id !== 'string') {
                throw new ArgumentError('String Type Field: app_id is required as string');
            }
             
            let res = await aliYunClient.delete({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            const {data} = res;
            return data;        
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
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
    async function putApp(app_id,put_param) {
        try{
            const API_PATH = '/app/'+app_id;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
            let res = await aliYunClient.put({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'},params: put_param        });
            const {data} = res;
            return data;        
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
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
        const API_PATH = '/app/'+app_id;
        const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
        const localToken = getLocalToken();
        
        const headers = {
            'accept': APPLICATION_JSON,
            'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
            'Authorization': getLocalToken(),
            //'apiv': APIV // Use md5 to hash the password
        };

        if (_.isNil(app_id) || typeof app_id !== 'string') {
            throw new ArgumentError('String Type Field: user_id is required as string');
        }
         
        //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
        let res = await aliYunClient.get({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
        //console.log(res);
        const {data} = res;
        return data;        
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
        try{
            let api_path = '/app';
            if (JSON.stringify(param) !== "{}"){
                api_path = '/app?';
            }
            for(var key in param){
                api_path = api_path + "&"+key+"="+param[key];
                //console.log("key: " + key + " ,value: " + param[key]);
            }
            
            const API_PATH = api_path;
            const url = API_END_POINT + API_PATH; // Add '+86-' to the username, since we currently only support registration from China mainland
            const localToken = getLocalToken();
            
            const headers = {
                'accept': APPLICATION_JSON,
                'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
                'Authorization': getLocalToken(),
                //'apiv': APIV // Use md5 to hash the password
            };
             
            //再调用get的时候,不要再opts参数里放置param,就是不要放置params={"user_id":"ufnfFJx"}
            let res = await aliYunClient.get({url,headers:headers,signHeaders: {'X-Ca-Stage': 'RELEASE'}});
            //console.log(res);
            const {data} = res;
            return data;        
        }catch(e){
            return {error:2,reason:e,result:{},debug:{}}; 
        }
    }


    /*------------------------------------------------------------*/

    return {
        initialize,
        addToken,
        getToken,
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
        addApp,
        delApp,
        getApp,
        putApp,
        qryApp,
        addVfcodeByTel,
        addVfcodeByMail,
        rstPass,
        chgPass,
        upload
    };
}
module.exports = lovearth;
