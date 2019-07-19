const lovearth = require('../lib')

async function test_qryRole() {
    const dua = await lovearth({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })
    let api_name = "用户登录";
    const loginres = await dua.login({
        by  :   "tel",
        //ustr:   '+86-13202300003',
        //pwd :   '96e79218965eb72c92a549dd5a330112',
        //ugrp:   "A3bdXNT3",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        //ugrp:   "XdUaXduA",
        ugrp:   "A3bdXNT3",
        role:   "none"
    })

    //--------------------------------------------------
    query = {
        filter:{
            ugrp_id:"A3bdXNT3",
            role_code:"god"
        }
    }
    query = {
        filter:{
            ugrp_id:"A3bdXNT3",
            role_code:["ce06","ce08"]
        }
    }

    const res = await dua.qryRoue(query);
    console.log(res);
    console.log(JSON.stringify(res));
    if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

test_qryRole();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
