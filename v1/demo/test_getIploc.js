const hannm = require('../lib/hannm')
async function test_getIploc() {
    const ham = await hannm({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })
    let api_name = "IP归属地";
    let res = await ham.getIploc("159.226.39.124")
    console.log(res);
    console.log(JSON.stringify(res));
    if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

test_getIploc();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
