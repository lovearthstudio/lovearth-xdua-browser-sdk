const hannm = require('../lib/hannm')
async function test_do() {
    const ham = await hannm({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })
    let api_name = "企业标签";
    let res = await ham.getComtags("英国钟氏企业进出口贸易有限公司驻东莞办事处")
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
    console.log(JSON.stringify(res));
}

test_do();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
