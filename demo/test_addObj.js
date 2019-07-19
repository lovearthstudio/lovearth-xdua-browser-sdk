const lovearth = require('../lib')


async function test_addObj(add_params) {
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
    res = await dua.addObj(add_params)
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}


add_params = {
    type:"step",
    name:"step-147473345779",
    key1:"key1",
    value:{"name":"四阿哥的手4","mac":"f3:23:b7:c2"},
    key2:"f3:23:b7:c2",
    readonly:1
}
test_addObj(add_params)
return false


