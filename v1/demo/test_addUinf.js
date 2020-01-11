const lovearth = require('../lib')

async function test_addUinf(add_params) {
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
    login_uid = res_login.result.user_id
    api_name = "添加对象";
    //res = await dua.addUinf(login_uid,add_params)
    res = await dua.addUinf("RT0wAEA6",add_params)
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}


add_params = {
    weight:55.3,
    height:172,
    step:8000
}
test_addUinf(add_params)
return false
