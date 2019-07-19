const lovearth = require('../lib')

async function test_addApp(code,name,pkg,ugrp_id,brief) {
    //--------------------------------------------------
    const dua = await lovearth({
        APP_KEY: "firstapp",
        APP_SECRET: "34390cd41e427233cb67fafe649d3cda",
    })

    api_name = "创建应用";
    await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })

    const res = await dua.addApp({
        code:code,
        name:name,
        pkg:pkg,
        ugrp_id:ugrp_id,
        brief:brief, 
        avatar:""
    })
    console.log(res);
    if(res.error == 0){
        got_ugrp_id = res.result.id;
        console.log(api_name+"成功 "+got_ugrp_id);
    }else{
        got_ugrp_id = res.result.id;
        console.log(api_name+"失败 "+res.reason);
    }

}

//test_addApp("admin4dua","地球号后台","com.xdua.admin","XdUaXduA","地球号管理后台");
test_addApp("children4mobile","儿研所手机端","cn.ac.ict.children","YRym9QaM","儿研所手机端");
test_addApp("children4pc","儿研所PC端","cn.ac.ict.childrenpc","0ag53Ltm","儿研所PC端");
test_addApp("appring","健康手环","cn.ac.ict.ring","A3bdXNT3","健康手环安卓端");
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
