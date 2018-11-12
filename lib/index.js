
const _ = require('lodash')

const ArgumentError = require('./exceptions/ArgumentError')

const Sign = require('./utils/Sign')
const { generateSign } = Sign()
const md5 = require('./utils/md5')

const {
  APPLICATION_JSON,
  APPLICATION_X_WWW_FORM_URLENCODED,
} = require('./constants/contentType')
const {
  APIV,
  API_END_POINT,
  setAppKey, getAppKey,
  setAppSecret, getAppSecret,
  setDuaId, getDuaId,
} = require('./constants')

const { initializeDuaId } = require('./duaId')

const aliYunClient = require('./aliyunClient')

function lovearth({ APP_SECRET, APP_KEY }) {
  setAppKey(APP_KEY)
  setAppSecret(APP_SECRET)

  async function initialize() {
    let promiseList = []
    promiseList.push(initializeDuaId())
    return Promise.all(promiseList)
  }

  /**
   * Login Method
   *
   * @param {String} username The phone number of the registered user, should be like '15810419011'.
   *  There should not be any ' ' or '-' between the digit
   * @param {String} password the password of the user
   * @returns {Object<*>} the result of the login. If failed, return the reason of the failure
   */
  async function login ({ username, password }) {
    if (_.isNil(username) || typeof username !== 'string') {
      throw new ArgumentError('String Type Field: username is required')
    }

    if (_.isNil(password) || typeof password !== 'string') {
      throw new ArgumentError('String Type Field: password is required')
    }

    const API_PATH = '/login'
    const url = API_END_POINT + API_PATH

    // Add '+86-' to the username, since we currently only support registration from China mainland
    let formattedUsername = '+86-' + username
    const headers = {
      'accept': APPLICATION_JSON,
      'content-type': APPLICATION_X_WWW_FORM_URLENCODED,
      'dua': getDuaId(),
      'apiv': APIV,
    }
    
    // Use md5 to hash the password
    let passwordMD5 = md5(password)
    let res = await aliYunClient.post({
        url,
        headers: Object.assign(
          {},
          headers,
          {
          'sign': generateSign({
            'method': 'POST',
            'path': API_PATH,
            'appSecret': APP_SECRET,
            'appKey': APP_KEY,
          })
        }),
        signHeaders: {
          'X-Ca-Stage': 'RELEASE',
        },
        params: {
          by: 'tel',
          ustr: formattedUsername,
          pwd: passwordMD5,
        },
      }
    )

    const { data } = res

    if (data.status === 0) {
      let { dua_id } = data.result
      setDuaId(duaId)

      return data.result
    } else {
      throw new Error(data.reason)
    }

  }

  return {
    login,
    initialize,
  }
}

module.exports = lovearth
