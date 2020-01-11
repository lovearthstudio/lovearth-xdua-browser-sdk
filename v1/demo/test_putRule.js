const lovearth = require('../lib')
const {
    APP_SECRET,
    APP_KEY,
} = require('./option')


async function test_putRule() {
    //--------------------------------------------------
    const dua = await lovearth({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })

    got_rule_id = "";
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })

    api_name = "修改权限";
    let cur_rule_id = "gH9Gioju";
    res = await dua.putRule(cur_rule_id,{"name":"test_role_set"+Math.random()*100,"avatar":"new_avatar"})
    if(res.error == 0){
        console.log(api_name+"成功 "+cur_rule_id);
    }else{
        console.log(res)
        console.log(api_name+"失败 "+res.reason);
    }
}
test_putRule();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
