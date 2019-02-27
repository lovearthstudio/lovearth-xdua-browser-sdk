const lovearth = require('../lib')


async function test_addVfcTel() {
    try{
        //--------------------------------------------------
        const dua = await lovearth({
            APP_KEY: "aHEVYhE1",
            APP_SECRET: "f34b127abc7cca1862dac91db6256190",
        })
        
        api_name = "短信验码";
        res = await dua.addVfcodeByTel("+86-1581041901x")
        if(res.error == 0){
            console.log(api_name+"成功");
        }else{
            console.log(api_name+"失败 "+res.reason);
        }
    }catch(e){
        console.log(e)      
    }
}

async function test_addVfcMail() {
    //--------------------------------------------------
    const dua = await lovearth({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })
   
    api_name = "邮箱验码";
    res = await dua.addVfcodeByMail("jiaoshuai@ict.ac.cn")
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

test_addVfcTel();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
