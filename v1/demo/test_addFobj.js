const lovearth = require('../lib')

async function test_addFobj(add_params) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })
    console.log(res_login);

    api_name = "添加对象";
    res = await dua.addFobj(add_params)
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}


add_params = {
    url:"http://file.xdua.com/fobj/HealthRingFirmware/E6-ap-FW6.6.31-HW4.5.15-190528.zip",
    size:47932345, //字节为单位的文件大小
    idx1:160631, //版本号 整形，用来版本升级
    idx2:"6.6.31",//版本字符串
    idx3:1,//1：待发布 2：已发布 3：停用
    idx4:201906191232, //2019年6月19日12点32分发布
    param:{"version":"6.6.31","versioncode":160632,"creator":"wellink@shenzhen","ptime":201906191232},
    name:"手表固件6.6.31版本",
    note:"微尔联智能手表，专为健康打造。",
    cato:"firmware"
}
add_params2 = {
    url:"http://file.xdua.com/fobj/HealthRingFirmware/E6-ap-FW6.6.32-HW4.5.15-190528.zip",
    size:47932345, //字节为单位的文件大小
    idx1:160632, //版本号 整形，用来版本升级
    idx2:"6.6.32",//版本字符串
    idx3:1,//1：待发布 2：已发布 3：停用
    idx4:201906191232, //2019年6月19日12点32分发布
    param:{"version":"6.6.32","versioncode":160632,"creator":"wellink@shenzhen","ptime":201906191232},
    name:"手表固件6.6.32版本",
    note:"微尔联智能手表，专为健康打造。",
    cato:"firmware"
}

add_params3 = {
    url:"http://file.xdua.com/fobj/HealthRingFirmware/E6-ap-FW6.6.30-HW4.5.15-190528.zip",
    size:47932345, //字节为单位的文件大小
    idx1:160630, //版本号 整形，用来版本升级
    idx2:"6.6.30",//版本字符串
    idx3:1,//1：待发布 2：已发布 3：停用
    idx4:201906191232, //2019年6月19日12点32分发布
    param:{"version":"6.6.30","versioncode":160630,"creator":"wellink@shenzhen","ptime":201906191232},
    name:"手表固件6.6.30版本",
    note:"微尔联智能手表，专为健康打造。",
    cato:"firmware"
}

test_addFobj(add_params)
test_addFobj(add_params2)

//这是一个修改Fobj的参数样例
put_params = {
    size:47932332, //文件大小,会覆盖旧的文件大小
    idx1:160630, //版本号,会覆盖旧的索引
    idx2:"6.6.30",//版本字符串,会覆盖旧的版本号
    idx3:1,//1：待发布 2：已发布 3：停用，本值会覆盖旧的
    idx4:201906191232, //2019年6月19日12点32分发布，覆盖旧值
    //整个param会覆盖旧的param,完全覆盖.目前不支持只修改某个子属性
    param:{"version":"6.6.30","versioncode":160630,"creator":"wellink@shenzhen","ptime":201906191232}, 
    name:"手表固件6.6.30版本",
    note:"微尔联智能手表，专为健康打造。",
    cato:"firmware"
}
   
    
return false

