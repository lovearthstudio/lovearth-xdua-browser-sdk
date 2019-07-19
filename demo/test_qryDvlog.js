const lovearth = require('../lib')



async function test_qryDvlog(obj_key) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
   
    api_name = "查询对象";
    res = await dua.qryDvlog(obj_key)
    console.log(res);
    console.log(JSON.stringify(res));
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

query = {
    "where": {"dmac":"0009A72F4EFF","time0":1563097146,"time1":1564037035},
    "limit":10
}

test_qryDvlog(query)
return false

