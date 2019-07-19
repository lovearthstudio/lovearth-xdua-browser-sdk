const lovearth = require('../lib')

async function test_qryGwenv(obj_key) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
    api_name = "查询环境"
    res = await dua.qryGwenv(obj_key)
    console.log(JSON.stringify(res));
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

query = {
    "where": {"gmac":"AC233FC0422D","time0":1563036033,"time1":1564037078,"type":1,"dmac":"AC233FC0422D"},
    "limit":10,
    "dataform":"heatmap"
}

test_qryGwenv(query)
//test_qryGwenv({filter:{},limit:10})
return false

   
