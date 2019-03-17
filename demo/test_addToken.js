const lovearth = require('../lib')
async function test_addToken() {
    const dua = await lovearth({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })
    //--------------------------------------------------
    let api_name = "获取匿名令牌";
    let res = await dua.addToken()
    if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        got_ugrp_id = res.result.id;
        console.log(api_name+"失败 "+res.reason);
    }
    token = res.result.token;
    console.log(token); 
    
    api_name = "验证匿名令牌";
    res = await dua.getToken(token)
    if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
    console.log(res);
}

test_addToken();
