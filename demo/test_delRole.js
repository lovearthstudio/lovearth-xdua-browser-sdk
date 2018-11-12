const lovearth = require('../dist')
const {
    APP_SECRET,
    APP_KEY,
} = require('./option')

const dua = lovearth({
    APP_KEY: "aHEVYhE1",
    APP_SECRET: "f34b127abc7cca1862dac91db6256190",
})

async function test_qryRole() {
    //--------------------------------------------------
    let api_name = "角色详情";
    await dua.initialize()
    let res = await dua.getRole("vM227dTl")
    
    console.log(res);
    console.log(JSON.stringify(res));
    if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

test_qryRole();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
