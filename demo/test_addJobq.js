const lovearth = require('../lib')
async function test_addJobq() {
    //--------------------------------------------------
    const dua = await lovearth({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })

    api_name = "创建户群";
    got_ugrp_id = "";
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })
    console.log(res_login);
    const res = await dua.addJobq({
        name:"我的工队",
        brief:"这是一个测试用的工队", 
        avatar:"",
    })
    console.log(JSON.stringify(res));
    if(res.error == 0){
        got_ugrp_id = res.result.id;
        console.log(api_name+"成功 "+got_ugrp_id);
    }else{
        got_ugrp_id = res.result.id;
        console.log(api_name+"失败 "+res.reason);
    }
}

test_addJobq();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
