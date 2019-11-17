const xdua = require('../lib')

async function test_addApp(name,brief) {
    //--------------------------------------------------
    const dua = await xdua({
        APP_TOKEN:"eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NzE1NDg2NDYsIm5iZiI6MTU3MTU0ODY0NiwiaXNzIjoieGR1YS5jb20iLCJleHAiOjE4ODY5MDg2NDYsImF1ZCI6IkVJeGNQZHBUIiwic3ViIjoiQW5vTnltdVMiLCJqdGkiOiIxMjM0NTY3OCIsImNpcCI6IjE1OS4yMjYuMzkuMSIsImN1YSI6IkNhQ2xpZW50VWEiLCJkZXYiOiJVbml2ZXJzYWwiLCJvd24iOiJEdDVtdnJ0VSJ9.EuUqA9xBMxhc2pV-Th9g-TF-N6tYJsiAdCBW5H47dEDQuLWihm93Z4GxpgZxWII6ngTlmTCzhYwXB7n1Q9WxhN1cuZFfFzKvfmwss3t-9ekR4AlRxU8Oqho7A-bWZjqTuMzhp7xKFYtvltAIjfyyjFJ1x3MYp1mbHEhVoLkys7OzsT-hBMD10IDWJTWt9ddS04QnPjuFqby3_7--nqim_3oY_ZAGscmkOB1FSsV8XL9U_wF7nUfs6M-kSYmb_Io7G50exg8Jr6ibxzE_dkv6gAb52ahOx4zJw-aBVDPmcnRudFYuU0ekmKdMP0cB7h6uoP_9zsxblzoHpepLsg3Kcw" 
    })

    api_name = "创建应用";
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "XdUaXduA",
        role:   "none"
    })
    console.log(res_login);
    const res = await dua.addApp({
        name:name,
        brief:brief 
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
//test_addApp("children4mobile","儿研所手机端","cn.ac.ict.children","YRym9QaM","儿研所手机端");
//test_addApp("children4pc","儿研所PC端","cn.ac.ict.childrenpc","0ag53Ltm","儿研所PC端");
//test_addApp("appring","健康手环","cn.ac.ict.ring","A3bdXNT3","健康手环安卓端");
test_addApp("医养云","医养云平台的描述");
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
