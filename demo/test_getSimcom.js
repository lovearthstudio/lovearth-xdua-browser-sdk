const hannm = require('../lib/hannm')
async function test_getSimcom() {
    const ham = await hannm({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })
    let api_name = "企相似查";
    let res = await ham.getSimcom("上海惠而美贸易有限公司")
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
    console.log(JSON.stringify(res));
}

test_getSimcom();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
