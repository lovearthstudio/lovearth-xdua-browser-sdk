const {OSS_INFO} = require('../../demo/option')
const OSS = require('ali-oss')

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

async function upload(file) {
  const point = file.name.lastIndexOf('.')

  let suffix = file.name.substr(point)
  let fileName = file.name.substr(0, point)
  let date = Date.parse(new Date())
  let fileNames = `${fileName}_${date}${suffix}`
  
  try{
    let oss = await getClient()
    let r1 = await oss.put(fileNames,file)
    return r1
  }catch(e){
    console.error(e)
    return null
  }
}


module.exports = {
  getClient,
  upload
}