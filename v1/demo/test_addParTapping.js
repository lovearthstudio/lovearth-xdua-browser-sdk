const hannm = require('../lib/hannm')
async function test_addParTapping() {
    const ham = await hannm({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })

    const res = await ham.addParTapping({
        type    :"acca",
        freq    :32,
        datas   :'LRLLLLRRLLRLLLLLLLRRLLLLRLLRLLRRLLLLRLRLLLRLLLRLRL',    
        time    :"0,1516088077249, 1516088077459, 1516088077801, 1516088078330, 1516088078604, 1516088078896, 1516088079013, 1516088079189, 1516088079714, 1516088080232, 1516088080440, 1516088080891, 1516088081375, 1516088081680, 1516088082354, 1516088082466, 1516088082569, 1516088082591, 1516088082681, 1516088083041, 1516088083289, 1516088083540, 1516088083718, 1516088083857, 1516088084396, 1516088084913, 1516088085011, 1516088085040, 1516088085404, 1516088085535, 1516088085617, 1516088085827, 1516088086033, 1516088086471, 1516088086569, 1516088086608, 1516088086741, 1516088086765, 1516088087022, 1516088087861, 1516088088070, 1516088088283, 1516088088289, 1516088088558, 1516088088703, 1516088088876, 1516088089280, 1516088089766, 1516088089767],                  
    })
    api_name = "敲击测试";
    console.log(res);
    if(res.error == 0){
        got_ugrp_id = res.result.score;
        console.log(api_name+"成功 "+got_ugrp_id);
    }else{
        got_ugrp_id = res.result.score;
        console.log(api_name+"失败 "+res.reason);
    }
}

test_addParTapping();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
