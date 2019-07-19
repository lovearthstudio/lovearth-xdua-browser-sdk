const lovearth = require('../lib')

async function test_addIotpass(add_params) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
    api_name = "制作IOT密码";
    res = await dua.addIotpass(add_params)
    console.log(res)
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}


add_params = {
    pkey:"pkey",
    name:"name",
    secret:"secret",
    clientid:"clientid"
}

test_addIotpass(add_params)
return false

