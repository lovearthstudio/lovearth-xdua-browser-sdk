const lovearth = require('../dist')
const {
    APP_SECRET,
    APP_KEY,
} = require('./option')

const dua = lovearth({
    APP_KEY: "aHEVYhE1",
    APP_SECRET: "f34b127abc7cca1862dac91db6256190",
})

async function test_putPass() {
    //--------------------------------------------------
    let api_name = "修改角色";
    await dua.initialize()
    await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "dua",
        role:   "none"
    })
    let cur_ugrp_id = "vM227dTl";
    res = await dua.putRole(cur_ugrp_id,{"name":"test_role_set"+Math.random()*100})
    if(res.error == 0){
        console.log(api_name+"成功 "+cur_ugrp_id);
    }else{
        console.log(res)
        console.log(api_name+"失败 "+res.reason);
    }


}

test_putPass();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
