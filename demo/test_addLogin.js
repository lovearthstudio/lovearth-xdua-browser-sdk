const lovearth = require('../lib')

async function test_addLogin() {
    //--------------------------------------------------
    const dua = await lovearth({
        //APP_TOKEN:"eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NzE1NDg2NDYsIm5iZiI6MTU3MTU0ODY0NiwiaXNzIjoieGR1YS5jb20iLCJleHAiOjE4ODY5MDg2NDYsImF1ZCI6IkVJeGNQZHBUIiwic3ViIjoiQW5vTnltdVMiLCJqdGkiOiIxMjM0NTY3OCIsImNpcCI6IjE1OS4yMjYuMzkuMSIsImN1YSI6IkNhQ2xpZW50VWEiLCJkZXYiOiJVbml2ZXJzYWwiLCJvd24iOiJEdDVtdnJ0VSJ9.EuUqA9xBMxhc2pV-Th9g-TF-N6tYJsiAdCBW5H47dEDQuLWihm93Z4GxpgZxWII6ngTlmTCzhYwXB7n1Q9WxhN1cuZFfFzKvfmwss3t-9ekR4AlRxU8Oqho7A-bWZjqTuMzhp7xKFYtvltAIjfyyjFJ1x3MYp1mbHEhVoLkys7OzsT-hBMD10IDWJTWt9ddS04QnPjuFqby3_7--nqim_3oY_ZAGscmkOB1FSsV8XL9U_wF7nUfs6M-kSYmb_Io7G50exg8Jr6ibxzE_dkv6gAb52ahOx4zJw-aBVDPmcnRudFYuU0ekmKdMP0cB7h6uoP_9zsxblzoHpepLsg3Kcw" 
        APP_TOKEN:"eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NzE1NDg2NDYsIm5iZiI6MTU3MTU0ODY0NiwiaXNzIjoieGR1YS5jb20iLCJleHAiOjE4ODY5MDg2NDYsImF1ZCI6InJYU2JabnF2Iiwic3ViIjoiQW5vTnltdVMiLCJqdGkiOiIxMjM0NTY3OCIsImNpcCI6IjE1OS4yMjYuMzkuMSIsImN1YSI6IkNhQ2xpZW50VWEiLCJkZXYiOiJVbml2ZXJzYWwiLCJvd24iOiJEdDVtdnJ0VSJ9.rifAkhdMgeSu3ympIvFiHNFDLLXiANh-q2TekW0qFXISl4cdznxBFifk0_KO39eOakju9MziD5-MCRebzxBDB-iBk84uf47Xdt74NT8NBFmRCpGjs31LDaWHZH055ZBxEdaATjDXNHlQyYp2YCdnA0ULcpYwTbaZaRAKqLzmVQ--Daf0mRW8pjq01y4Tev7ZYyItDuO0Hwsyl9kmq6b10ji4hUTgFOQGVPANx3L01_wZO4jcPSvS9jPHOxp5YNPBVvwSU18gU6XSIgBEG_ixGcHqYvtIcfOjmNFsbQ4o0Inmfur88Jr8gbzfMSSlt9slNwU_F7mw8UYxTjJXw8xuIQ"
    })

    api_name = "用户登录";
    login_param = {
        by  :   "tel",
        ustr:   '+86-18017050123',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        shop:   "A3bdXNT3",
        role:   "none"
    }
    login_param = {
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        shop:   "A3bdXNT3",
        role:   "none"
    }

    const res = await dua.login(login_param)

    console.log(JSON.stringify(res));
    if(res.error == 0){
        got_ugrp_id = res.result.id;
        console.log(api_name+"成功 ");
    }else{
        got_ugrp_id = res.result.id;
        console.log(api_name+"失败 "+res.reason);
    }

}

test_addLogin();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
