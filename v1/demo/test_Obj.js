const lovearth = require('../lib')


async function test_addObj(add_params) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })
    console.log(res_login);

    api_name = "添加对象";
    res = await dua.addObj(add_params)
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

async function test_getObj(obj_key) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
    api_name = "详情对象";
    res = await dua.getObj(obj_key)
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

async function test_delObj(obj_key) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })
    console.log(res_login);

    api_name = "删除对象";
    res = await dua.delObj(obj_key)
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}


async function test_putObj(obj_key,obj_value) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })
    console.log(res_login);


    api_name = "修改对象";
    res = await dua.putObj(obj_key,"哈哈哈")
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

async function test_qryObj(obj_key) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
    api_name = "查询对象";
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })

    res = await dua.qryObj(obj_key)
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}
add_params = {
    name:"step-147473345758",
    value:{"name":"四阿哥的手环","mac":"f3:23:b7:c2"},
    key2:"f3:23:b7:c2",
    readonly:1
}
test_addObj(add_params)
test_qryObj({"filter":{'name': {"$regex":"^step-.*"} }})
return false


//test_delObj("%allkeys%")

//test_putObj("他的手环哈-147473345756.name","来自法国的手环")


qry_param = {
    "filter":{
         "key":{"$regex":"^obj_key.*"}
    },
}




for( var i = 23;i<22;i++){
    obj_key = "obj_key0"+i
    obj_value = "obj_value0"+i
    test_addObj(obj_key,obj_value)
}

    
//test_getObj("key1")
//test_putObj("key1","newvalue")
//test_qryObj({"key":"^key.*"})
    

for( var i = 0;i<22;i++){
    key_pfx = "obj_key0"+i
    val_pfx = "obj_value0"+i
    test_delObj(key_pfx)
}
   
    
    
    
