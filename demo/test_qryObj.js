const lovearth = require('../lib')

async function test_qryObj(obj_key) {
    const dua = await lovearth({
        APP_KEY: "EIxcPdpT",
        APP_SECRET: "b8466f37b99bea6496b192be399cfbd2",
    })
    const dua2 = await lovearth({
        APP_TOKEN:"eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NzE1NDg2NDYsIm5iZiI6MTU3MTU0ODY0NiwiaXNzIjoieGR1YS5jb20iLCJleHAiOjE4ODY5MDg2NDYsImF1ZCI6IkVJeGNQZHBUIiwic3ViIjoiQW5vTnltdVMiLCJqdGkiOiIxMjM0NTY3OCIsImNpcCI6IjE1OS4yMjYuMzkuMSIsImN1YSI6IkNhQ2xpZW50VWEiLCJkZXYiOiJVbml2ZXJzYWwiLCJvd24iOiJEdDVtdnJ0VSJ9.EuUqA9xBMxhc2pV-Th9g-TF-N6tYJsiAdCBW5H47dEDQuLWihm93Z4GxpgZxWII6ngTlmTCzhYwXB7n1Q9WxhN1cuZFfFzKvfmwss3t-9ekR4AlRxU8Oqho7A-bWZjqTuMzhp7xKFYtvltAIjfyyjFJ1x3MYp1mbHEhVoLkys7OzsT-hBMD10IDWJTWt9ddS04QnPjuFqby3_7--nqim_3oY_ZAGscmkOB1FSsV8XL9U_wF7nUfs6M-kSYmb_Io7G50exg8Jr6ibxzE_dkv6gAb52ahOx4zJw-aBVDPmcnRudFYuU0ekmKdMP0cB7h6uoP_9zsxblzoHpepLsg3Kcw" 
    })
   
    api_name = "查询对象";
    const res_login = await dua2.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        ugrp:   "A3bdXNT3",
        //ugrp:   "XdUaXduA",
        role:   "none"
    })

    res = await dua2.qryObj(obj_key)
    console.log(res);
    console.log(JSON.stringify(res));
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

query = {
    "filter": {"name":{"$regex":"^raw_list-.*|^step-|^hb_list-|^ecg_list-.*"}},
    "order":"key4:DESC",
    "offset":1,
    "limit":20
}

query = {
    "filter": {"name":{"$regex":"^raw_list-.*|^step-"},"key4":{"$gte":"2019-10-22","$lte":"2019-10-22"}},
    "group":["uid","key2","key3","key4","key1","type"],
    "order":"key4:DESC",
    "offset":1,
    "limit":20
}

test_qryObj(query)
return false

   
