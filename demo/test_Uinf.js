const lovearth = require('../lib')

async function test_addFobj(add_params) {
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
    res = await dua.addFobj(add_params)
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

async function test_getFobj(obj_key) {
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


    api_name = "详情对象";
    res = await dua.getFobj(obj_key)
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

async function test_delFobj(obj_key) {
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
    res = await dua.delFobj(obj_key)
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}


async function test_putFobj(obj_key,obj_value) {
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
    res = await dua.putFobj(obj_key,"哈哈哈")
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

async function test_qryFobj(obj_filter) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
    api_name = "查询对象";
    res = await dua.qryFobj(obj_filter)
    console.log(res);
    console.log(JSON.stringify(res));
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}
qry_param = {
    "filter":{
         "ckey":'czbfGP6rPb2UnKUHsvP67j'
    },
}


test_qryFobj(qry_param)

//test_getFobj("ZQ2F4xH4MHuMUuKkuGZZZV")

add_params = {
    url:"http://file.xdua.com/example2.txt",
    size:1024,
    param:{"version":"1.3.2"},
    name:"作为案例的文件",
    note:"这里是备注",
    cato:"firmware"
}
//test_addFobj(add_params)
//test_qryFobj({filter:{key:"*"}})
return false


test_delFobj("%allkeys%")





for( var i = 23;i<22;i++){
    obj_key = "obj_key0"+i
    obj_value = "obj_value0"+i
    test_addFobj(obj_key,obj_value)
}

    
//test_getFobj("key1")
//test_putFobj("key1","newvalue")
//test_qryFobj({"key":"^key.*"})
    

for( var i = 0;i<22;i++){
    key_pfx = "obj_key0"+i
    val_pfx = "obj_value0"+i
    test_delFobj(key_pfx)
}
   
    
    
    
