const lovearth = require('../lib')
/*
const dua = lovearth({
    APP_KEY: "aHEVYhE1",
    APP_SECRET: "f34b127abc7cca1862dac91db6256190",
})
*/


async function test_addUser() {
    const dua = await lovearth({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })
    //--------------------------------------------------
    api_name = "电话注册";
    added_user_id = "anonymus";
    add_user_param={
        by  :   "tel",
	    ustr:   "+86-13202300004",
	    pwd :   "a906449d5769fa7361d7ecc6aa3f6d28",
	    vfcode: "FFFFFF",
	    ugrp:   "XdUaXduA",
	    role:   "none"
    }
    add_user_param={
        by  :   "tel",
	    ustr:   "+86-18017050137",
	    pwd :   "a906449d5769fa7361d7ecc6aa3f6d28",
	    vfcode: "FFFFFF",
	    ugrp:   "A3bdXNT3",
        name:   "testd",
        sex:   "F",
        mail:   "jiaoshuai@ict.ac.cn",
	    role:   "none"
    }

    res = await dua.signup(add_user_param)
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }


}

test_addUser();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
