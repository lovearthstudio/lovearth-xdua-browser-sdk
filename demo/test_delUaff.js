const lovearth = require('../lib')
async function test_delUaff(uaff_id) {
    const dua = await lovearth({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })
    //--------------------------------------------------
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })

    //--------------------------------------------------
    let api_name = "删除户属";
    let res = await dua.delUaff(uaff_id)
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

test_delUaff("2ZI0ZBYe");
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
