const lovearth = require('../lib')
async function test_addUgrp() {
    //--------------------------------------------------
    const dua = await lovearth({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })

    api_name = "创建户群";
    got_zone_id = "";
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })
    //console.log(res_login);
    const res = await dua.addZone({
        name:"儿研所户群/PC2端",
        brief:"户区描述", 
        avatar:"",
        god_id:"Dt5mvrtU",
        pid:"YRym9QaM"
    })
    console.log(JSON.stringify(res));
    //console.log(res);
    if(res.error == 0){
        got_zone_id = res.result.id;
        console.log(api_name+"成功 "+got_zone_id);
    }else{
        got_zone_id = res.result.id;
        console.log(api_name+"失败 "+res.reason);
    }
}

test_addUgrp();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
