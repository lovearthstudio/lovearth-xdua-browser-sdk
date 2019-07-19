const lovearth = require('../lib')



async function test_qryGwlog(obj_key) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
   
    api_name = "查询对象";
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "A3bdXNT3",
        role:   "none"
    })
    res = await dua.qryGwlog(obj_key)
    console.log(JSON.stringify(res));
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}
query = {
    "where": {"gmac":"AC233FC0422D","time0":1563037033,"time1":1563037035},
    "limit":10,
    "order":"forward"
}

test_qryGwlog(query)
return false

   
