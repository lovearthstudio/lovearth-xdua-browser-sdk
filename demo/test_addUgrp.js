const lovearth = require('../lib')
const {
    APP_SECRET,
    APP_KEY,
} = require('./option')
/*
const dua = lovearth({
    APP_KEY: "aHEVYhE1",
    APP_SECRET: "f34b127abc7cca1862dac91db6256190",
})
*/
const dua = lovearth({
    APP_KEY: "EIxcPdpT",
    APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
})

async function test_addUgrp() {
    //--------------------------------------------------
    await dua.initialize()
    api_name = "创建户群";
    got_ugrp_id = "";
    await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "dua",
        role:   "none"
    })

    const res = await dua.addUgrp({
        code:"test_ugrp_rand2",
        name:"测试用户组",
        brief:"测试用户组简介", 
        avatar:"测试用户组头像"
    })
    console.log(res);
    if(res.error == 0){
        got_ugrp_id = res.result.id;
        console.log(api_name+"成功 "+got_ugrp_id);
    }else{
        got_ugrp_id = res.result.id;
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
