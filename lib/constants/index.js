const APIV = '1.0.0'
const API_END_POINT = 'http://api.xdua.com'

let APP_SECRET
let APP_KEY
let DUA_ID

function setAppSecret(appSecret) {
  APP_SECRET = appSecret
}

function getAppSecret() {
  return APP_SECRET
}

function getAppKey() {
  return APP_KEY
}

function setAppKey(appKey) {
  APP_KEY = appKey
}

function setDuaId(duaId) {
  DUA_ID = duaId
}

function getDuaId() {
  return DUA_ID
}


module.exports = {
  APIV,
  API_END_POINT,
  getAppKey,
  getAppSecret,
  getDuaId,
  setAppKey,
  setAppSecret,
  setDuaId,
}