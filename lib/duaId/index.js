const {
  APPLICATION_X_WWW_FORM_URLENCODED,
  APPLICATION_JSON,
} = require('../constants/contentType')

const { APIV, API_END_POINT, getAppSecret, getAppKey, setDuaId } = require('../constants')

const { generateSign } = require('../utils/Sign')()
const aliYunClient = require('../aliyunClient')

async function getDuaId (model = 'unknown', man = 'unknown', os = 'unknown') {
  let params = {
    dsn: '',
    type: 'browser',
    model,
    man,
    os,
    apv:'1.0.0',
    aname:'www.xdua.com',
    app:'com.wikicivi.admin',
    channel:'RELEASE',
    pkg: 'test.pname.292607778',
  }

  const API_PATH = '/dua'

  let headers = {
    'Content-Type': APPLICATION_X_WWW_FORM_URLENCODED,
    'apiv': APIV,
    'sign': generateSign({
      'method': 'POST',
      'path': API_PATH,
      'appSecret': getAppSecret(),
      'appKey': getAppKey(),
    }),
  }

  return aliYunClient.post({
    url: API_END_POINT + API_PATH,
    headers,
    params,
  })
}

async function initializeDuaId() {
  const res = await getDuaId()
  const data = res.data
  if (data.status !== 0) {
    throw new Error('fail to get duaId')
  }

  const { id } = data.result
  setDuaId(id)
}

module.exports = {
  getDuaId,
  initializeDuaId,
}
