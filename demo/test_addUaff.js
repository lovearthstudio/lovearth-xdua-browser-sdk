const lovearth = require('../lib')

async function test_addUaff() {
    const dua = await lovearth({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })
    //--------------------------------------------------
    api_name = "创建户属";
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })
    console.log(res_login);
    //模拟辣椒帅给"管理员"授区
    res = await dua.addUaff({
        user_id:"Dt5mvrtV",
	    ugrp_id:"YRym9QaM",
    })
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }


}

test_addUaff();
    
    
    
    
