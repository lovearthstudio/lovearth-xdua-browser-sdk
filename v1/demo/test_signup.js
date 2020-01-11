const lovearth = require('../lib')
/*
const dua = lovearth({
    APP_KEY: "aHEVYhE1",
    APP_SECRET: "f34b127abc7cca1862dac91db6256190",
})
*/


async function test_addUser() {
    const dua = await lovearth({
        APP_TOKEN:"eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NzE1NDg2NDYsIm5iZiI6MTU3MTU0ODY0NiwiaXNzIjoieGR1YS5jb20iLCJleHAiOjE4ODY5MDg2NDYsImF1ZCI6IkVJeGNQZHBUIiwic3ViIjoiQW5vTnltdVMiLCJqdGkiOiIxMjM0NTY3OCIsImNpcCI6IjE1OS4yMjYuMzkuMSIsImN1YSI6IkNhQ2xpZW50VWEiLCJkZXYiOiJVbml2ZXJzYWwiLCJvd24iOiJEdDVtdnJ0VSJ9.EuUqA9xBMxhc2pV-Th9g-TF-N6tYJsiAdCBW5H47dEDQuLWihm93Z4GxpgZxWII6ngTlmTCzhYwXB7n1Q9WxhN1cuZFfFzKvfmwss3t-9ekR4AlRxU8Oqho7A-bWZjqTuMzhp7xKFYtvltAIjfyyjFJ1x3MYp1mbHEhVoLkys7OzsT-hBMD10IDWJTWt9ddS04QnPjuFqby3_7--nqim_3oY_ZAGscmkOB1FSsV8XL9U_wF7nUfs6M-kSYmb_Io7G50exg8Jr6ibxzE_dkv6gAb52ahOx4zJw-aBVDPmcnRudFYuU0ekmKdMP0cB7h6uoP_9zsxblzoHpepLsg3Kcw" 
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
    add_user_param={
        api_action: "signup",
        by        : "tel",
	    ustr      : "+86-15810419011",
	    pwd       : "a906449d5769fa7361d7ecc6aa3f6d28",
	    vfcode    : "FFFFFF",
	    shop      : "EldrCaRE",
        role      : "none",
        name      : "羊辣椒",
        sex       : "M",
        bday      : "19860823",
        avatar    : "default.jpg",
    }

    res = await dua.addUser(add_user_param)
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
