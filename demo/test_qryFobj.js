const lovearth = require('../lib')

async function test_qryFobj(obj_filter) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
    api_name = "查询对象";
    res = await dua.qryFobj(obj_filter)
    console.log(res);
    console.log(JSON.stringify(res));
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}


test_qryFobj({filter:{cato:"firmware"},order:"idx1:DESC",limit:1})
return false


   
