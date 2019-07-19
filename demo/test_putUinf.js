const lovearth = require('../lib')

async function test_putUinf(obj_key,obj_value) {
    const dua2 = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
    const dua = await lovearth({
        APP_KEY: 'rXSbZnqv',
        APP_SECRET: '7a960fe9e5c83ae86fc70a9dc717eeaf'
    })

    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })
    console.log(res_login);

    api_name = "修改对象";
    res = await dua.putUinf("Tu7zQhjSFg5RxoB44KGWLh",{name:"哈哈哈",param:{"version":"1.3.3"}})
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

test_putUinf()
return false

