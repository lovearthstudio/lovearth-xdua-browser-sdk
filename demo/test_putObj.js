const lovearth = require('../lib')

async function test_putObj(obj_key,obj_value) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
    api_name = "修改对象";
    res = await dua.putObj(obj_key,obj_value)
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}


test_putObj("他的手环哈-147473345752",{})
return false


    
    
