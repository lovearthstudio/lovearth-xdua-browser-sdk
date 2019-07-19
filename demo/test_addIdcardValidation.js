const hannm = require('../lib/hannm')
async function test_addIdcardValidation() {
    const ham = await hannm({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })

    const res = await ham.addIdcardValidation({
        idno    :"340406199512301413",
        name    :"吴仲狄",
        birthday:"19951230",
        validity:"1994.07.14-2004.07.14",
        address :"南京市鼓楼区街8号",
        issuer  :"南京市公安局鼓楼分局",
        sex     :"1",
        nation  :"维吾尔"
    })
    api_name = "身份验证";
    console.log(res);
    if(res.error == 0){
        got_ugrp_id = res.result.id;
        console.log(api_name+"成功 "+got_ugrp_id);
    }else{
        got_ugrp_id = res.result.id;
        console.log(api_name+"失败 "+res.reason);
    }
}

test_addIdcardValidation();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // dua.initialize().then(() => {
//   dua.login({
//     username: username,
//     password: password,
//   }).then(res => {
//     console.log(res)
//   }).catch(err => {
//     console.log(err)
//   })
// })
