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
      bucket: OSS_INFO.bucket
    })
    return client
  }catch(e){
    console.error(e)
    return null
  }
}

async function addfile(file,ossfilepath) {
  const point = file.name.lastIndexOf('.')

  try{
    let oss = await getClient()
    let r1 = await oss.put(ossfilepath,file)
    return r1
  }catch(e){
    console.error(e)
    return null
  }
}


module.exports = {
  getClient,
  addfile
}
