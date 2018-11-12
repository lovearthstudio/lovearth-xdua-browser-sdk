const lovearth = require('../dist')
const {
    APP_SECRET,
    APP_KEY,
} = require('./option')

const dua = lovearth({
    APP_KEY: "aHEVYhE1",
    APP_SECRET: "f34b127abc7cca1862dac91db6256190",
})

async function demo() {
    //--------------------------------------------------
    let api_name = "用户登录";
    await dua.initialize()
    res = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "dua",
        role:   "none"
    })
    //console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败:"+res.reason);
    }
    //return false; 
    //--------------------------------------------------
    api_name = "重置密码";
    res = await dua.rstPass({
        by:"tel",
        ustr:"+86-15810419011",
        vfcode:"FFFFFF",
        pwd:"a906449d5769fa7361d7ecc6aa3f6d28"
    });
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }

    //--------------------------------------------------
    api_name = "修改密码";
    res = await dua.chgPass("4ivmegH1",{
        oldpwd:"a906449d5769fa7361d7ecc6aa3f6d28",
        newpwd:"a906449d5769fa7361d7ecc6aa3f6d28",
    });
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }

    //--------------------------------------------------
    api_name = "电话注册";
    added_user_id = "anonymus";
    res = await dua.addUser({
        by  :   "tel",
	    ustr:   "+86-15810419021",
	    pwd :   "a906449d5769fa7361d7ecc6aa3f6d28",
	    vfcode: "FFFFFF",
	    ugrp:   "dua",
	    role:   "none"
    })
    if(res.error == 0){
        added_user_id = res.result.id;
        console.log(api_name+"成功");
    }else{
        added_user_id = res.result.id;
        console.log(api_name+"失败 "+res.reason);
    }

    //--------------------------------------------------
    api_name = "用户删除";
    res = await dua.delUser(added_user_id)
    if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(added_user_id)
        console.log(api_name+"失败 "+res.reason);
    }
    //--------------------------------------------------
    api_name = "用户详情";
    got_user_id = "4ivmegH1";
    res = await dua.getUser(got_user_id)
    if(res.error == 0){
        console.log(api_name+"成功 "+got_user_id);
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
    
    //--------------------------------------------------
    api_name = "用户查询";
    res = await dua.qryUser({})
    if(res.error == 0){
        console.log(api_name+"成功 "+got_user_id);
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
    
    //--------------------------------------------------
    api_name = "创建户群";
    got_ugrp_id = "";
    await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "dua",
        role:   "none"
    })
    
    res = await dua.addUgrp({
        code:"test_ugrp_rand",
        name:"测试用户组",
        brief:"测试用户组简介", 
        avatar:"测试用户组头像"
    })
    if(res.error == 0){
        got_ugrp_id = res.result.id;
        console.log(api_name+"成功 "+got_ugrp_id);
    }else{
        got_ugrp_id = res.result.id;
        console.log(api_name+"失败 "+res.reason);
    }
    //--------------------------------------------------
    api_name = "删除户群";
    res = await dua.delUgrp(got_ugrp_id)
    if(res.error == 0){
        console.log(api_name+"成功 "+got_ugrp_id);
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
    //--------------------------------------------------
    api_name = "修改户群";
    let cur_ugrp_id = "fbe261e0";
    res = await dua.putUgrp(cur_ugrp_id,{name:"test_ugrp_set"})
    if(res.error == 0){
        console.log(api_name+"成功 "+cur_ugrp_id);
    }else{
        console.log(api_name+"失败 "+res.reason);
    }

    //--------------------------------------------------
    api_name = "户群详情";
    cur_ugrp_id = "fbe261e0";
    res = await dua.getUgrp(cur_ugrp_id)
    if(res.error == 0){
        console.log(api_name+"成功 "+cur_ugrp_id);
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
    //--------------------------------------------------
    api_name = "查询户群";
    res = await dua.qryUgrp({})
    if(res.error == 0){
        console.log(api_name+"成功 "+cur_ugrp_id);
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
    
    //--------------------------------------------------
    api_name = "创建角色";
    await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "dua",
        role:   "none"
    })
   
    
    let role_id = "";
    res = await dua.addRole({
        code:"test_role_2"+(Math.random()*100),
        name:"测试角色"+(Math.random()*100),
        ugrp_id:"fbe261e0", 
        granter:"test_role",
        brief:"角色简介"
    })
    if(res.error == 0){
        role_id = res.result.id;
        console.log(api_name+"成功 "+cur_ugrp_id);
    }else{
        role_id = res.result.id;
        console.log(res.result.id)
        console.log(api_name+"失败 "+res.reason);
    }
    
    //--------------------------------------------------
    api_name = "修改角色";
    res = await dua.putRole(role_id,{"name":"test_role_set"+Math.random()*100})
    if(res.error == 0){
        console.log(api_name+"成功 "+cur_ugrp_id);
    }else{
        console.log(api_name+"失败 "+res.reason);
    }

    //--------------------------------------------------
    api_name = "角色详情";
    res = await dua.getRole(role_id)
     if(res.error == 0){
        console.log(api_name+"成功 "+cur_ugrp_id);
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
    //--------------------------------------------------
    api_name = "查询角色";
    res = await dua.qryRole({})
     if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }

    //--------------------------------------------------
    api_name = "删除角色";
    res = await dua.delRole(role_id);
     if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(res);
        console.log(api_name+"失败 "+res.reason);
    }

    //--------------------------------------------------
    api_name = "创建授权";
    usro_id = "";
    res = await dua.addUsro({
        role_id:"vM227dTl",//对应test_role角色
        ugrp_id:"fbe261e0",//对应test户群 
        towho:"4ivmegH1"
    })
    
    usro_id = res.result.id;
    if(res.error == 0){
        console.log(api_name+"成功 "+usro_id);
    }else{
        console.log(res);
        console.log(api_name+"失败 "+res.reason);
    }
   
    //--------------------------------------------------
    api_name = "修改授权";
    res = await dua.putUsro(usro_id,{name:"test_usro_set"})
     if(res.error == 0){
        console.log(api_name+"成功 "+usro_id);
    }else{
        console.log(usro_id);
        console.log(res);
        console.log(res.debug.res);
        console.log(api_name+"失败 "+res.reason);
    }
    //--------------------------------------------------
    api_name = "授权详情";
    res = await dua.getUsro(usro_id)
     if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
    //--------------------------------------------------
    api_name = "查询授权";
    res = await dua.qryUsro({})
     if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }

    //--------------------------------------------------
    api_name = "删除授权";
    res = await dua.delUsro(usro_id)
    if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(res);
        console.log(api_name+"失败 "+res.reason);
    }

    //--------------------------------------------------
    api_name = "创建应用";
    app_id = "";
    res = await dua.addApp({
        pkg:"com.test.rand2"+(Math.random()*1000),
        name:"测试应用",
        ugrp_id:"fbe261e0",
        brief:"测试简介",
        avatar:"头像", 
    })
    app_id = res.result.id;
    if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(res);
        console.log(api_name+"失败 "+res.reason);
    }

    //--------------------------------------------------
    api_name = "修改应用";
    res = await dua.putApp(app_id,{name:"修改后的应用名字"})
     if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(res);
        console.log(api_name+"失败 "+res.reason);
    }

    //--------------------------------------------------
    api_name = "应用详情";
    res = await dua.getApp(app_id)
     if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }

    //--------------------------------------------------
    api_name = "查询应用";
    res = await dua.qryApp({})
     if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }

    //--------------------------------------------------
    api_name = "删除应用";
    res = await dua.delApp(app_id)
     if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
    return false;
    //--------------------------------------------------
    api_name = "短信验码";
    res = await dua.addVfcodeByTel("+86-15810419011")
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
    
    //--------------------------------------------------
    api_name = "邮箱验码";
    res = await dua.addVfcodeByMail("jiaoshuai@ict.ac.cn")
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }


}
demo()

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
