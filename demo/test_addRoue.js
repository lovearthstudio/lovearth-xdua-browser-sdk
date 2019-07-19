const lovearth = require('../lib')
async function test_addRule() {
    //-------------------------
    const dua = await lovearth({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })

    api_name = "创建权限";
    got_rule_id = "";
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })

    const res = await dua.addRoue({
        role_id:"sCV4VLVo",
        rule_id:"mUYxsWIz"
    })
    console.log(res)
    if(res.error == 0){
        got_rule_id = res.result.id;
        console.log(api_name+"成功 "+got_rule_id);
    }else{
        got_rule_id = res.result.id;
        console.log(api_name+"失败 "+res.reason);
    }
}

test_addRule();
