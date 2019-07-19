const lovearth = require('../lib')
/*
const dua = lovearth({
    APP_KEY: "aHEVYhE1",
    APP_SECRET: "f34b127abc7cca1862dac91db6256190",
})
*/


async function test_addUser() {
    const dua = await lovearth({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })
    //--------------------------------------------------
    api_name = "修改头像";
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })
    let user_id = "Dt5mvrtU" 
    res = await dua.putUser(user_id,{
	    name:   "辣椒帅"
    })
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

test_addUser();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
