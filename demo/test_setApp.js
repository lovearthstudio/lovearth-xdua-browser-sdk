const lovearth = require('../lib')

async function test_setApp(code,name,pkg,ugrp_id,brief) {
    //--------------------------------------------------
    const dua = await lovearth({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })

    api_name = "修改应用";
    await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })

    const res = await dua.putApp("UmTZB0Bm",{secret:"mysecret"})
    console.log(res);
    if(res.error == 0){
        got_ugrp_id = res.result.id;
        console.log(api_name+"成功 "+got_ugrp_id);
    }else{
        got_ugrp_id = res.result.id;
        console.log(api_name+"失败 "+res.reason);
    }

}

test_setApp("admin4dua","地球号后台","com.xdua.admin","XdUaXduA","地球号管理后台");
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
