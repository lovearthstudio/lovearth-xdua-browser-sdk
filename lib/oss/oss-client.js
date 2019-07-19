const OSS = require('ali-oss')
const OSS_INFO = {
    url: 'http://api.xdua.com/sts/osser',
    region: 'oss-cn-beijing',
    bucket: 'file-xdua-com'
}
async function getClient(){
  try{
    let raw_res = await fetch(OSS_INFO.url)
    let res = await raw_res.json()
    let client = new OSS({
        region: OSS_INFO.region,
        accessKeyId: res.access_key_id,
        accessKeySecret: res.access_key_secret,
        stsToken: res.security_token,
        bucket: OSS_INFO.bucket
    })
    return client
  }catch(e){
    console.error(e)
    return null
  }
}
/**
 * 当你用ApiCloud这种平台开发APP的时候,不好操作文件路径（传闻）,特别是IOS平台，如果这个时候能用blob上传就太好了
 * https://help.aliyun.com/document_detail/64047.html?spm=a2c4g.11174283.6.1133.45eb7da2k9cASc
 *  
 * */

async function addfile(file,ossfilepath,options) {
  try{
    let oss = await getClient()
    let r1 = await oss.put(ossfilepath,file,options)
    return r1
  }catch(e){
    console.error(e)
    return null
  }
}
async function addblob(blob,ossfilepath,options) {
  try{
    let oss = await getClient()
    let r1 = await oss.put(ossfilepath,blob,options)
    return r1
  }catch(e){
    console.error(e)
    return null
  }
}


module.exports = {
  getClient,
  addfile,
  addblob
}
