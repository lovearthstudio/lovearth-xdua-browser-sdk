const lovearth = require('../lib')

async function test_qryGwlog(obj_key) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
    const dua2 = await lovearth({
        APP_KEY: "rXSbZnqv",
        APP_SECRET: "7a960fe9e5c83ae86fc70a9dc717eeaf",
    })
   
    api_name = "查询对象";
    const res_login = await dua2.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "A3bdXNT3",
        //ugrp:   "XdUaXduA",
        role:   "none"
    })

    res = await dua2.qryGwlog(obj_key)
    console.log(res);
    console.log(JSON.stringify(res));
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

query = {
    "filter": {"name":{"$regex":"^ecg_list-.*"},"key4":"2019-07-11","key2":"%2B86-17727945069"},
    "offset":1,
    "limit":2
}

test_qryGwlog(query)
return false

   
