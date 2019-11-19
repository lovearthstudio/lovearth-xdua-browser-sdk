const lovearth = require('../lib')

async function test_qryDvenv(obj_key) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
    api_name = "查询环境"
    res = await dua.qryDvenv(obj_key)
    console.log(JSON.stringify(res));
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

query = {
    "where": {"gmac":"AC233FC0422D","time0":1563589330,"time1":1563589430,"type":1},
    "limit":1000,
    "dataform":"checkmacs"
}

test_qryDvenv(query)
//test_qryDvenv({filter:{},limit:10})
return false

   
