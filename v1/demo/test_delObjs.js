const lovearth = require('../lib')



async function test_delObjs(obj_key) {
    const dua2 = await lovearth({
        APP_TOKEN:"eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NzE1NDg2NDYsIm5iZiI6MTU3MTU0ODY0NiwiaXNzIjoieGR1YS5jb20iLCJleHAiOjE4ODY5MDg2NDYsImF1ZCI6IkVJeGNQZHBUIiwic3ViIjoiQW5vTnltdVMiLCJqdGkiOiIxMjM0NTY3OCIsImNpcCI6IjE1OS4yMjYuMzkuMSIsImN1YSI6IkNhQ2xpZW50VWEiLCJkZXYiOiJVbml2ZXJzYWwiLCJvd24iOiJEdDVtdnJ0VSJ9.EuUqA9xBMxhc2pV-Th9g-TF-N6tYJsiAdCBW5H47dEDQuLWihm93Z4GxpgZxWII6ngTlmTCzhYwXB7n1Q9WxhN1cuZFfFzKvfmwss3t-9ekR4AlRxU8Oqho7A-bWZjqTuMzhp7xKFYtvltAIjfyyjFJ1x3MYp1mbHEhVoLkys7OzsT-hBMD10IDWJTWt9ddS04QnPjuFqby3_7--nqim_3oY_ZAGscmkOB1FSsV8XL9U_wF7nUfs6M-kSYmb_Io7G50exg8Jr6ibxzE_dkv6gAb52ahOx4zJw-aBVDPmcnRudFYuU0ekmKdMP0cB7h6uoP_9zsxblzoHpepLsg3Kcw" 
    })
    api_name = "查询对象";
    let res_login = await dua2.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        shop:   "A3bdXNT3",
        role:   "none"
    })
   
    res_login = await dua2.login({
        by  :   "tel",
        ustr:   '+86-18017050119',
        pwd :   'e10adc3949ba59abbe56e057f20f883e',
        shop:   "A3bdXNT3",
        role:   "none"
    })
   
    res = await dua2.delObjs(obj_key)
    console.log(res);
    console.log(JSON.stringify(res));
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}


query = {
    "filter":{
        "name":{"$regex":"^step-147.*"},
    }
}
query = {
    "filter":{
        "key1":"5yN9vMFW","key2":"18017050118","key3":"F436C4837A28","key4":"2019-12-08","type":"raw"
    }
}

query = {
    "filter":{
        "key1":"GaLpeH5v","key2":"18017050118","key3":"F436C4837A28","key4":"2019-12-09","type":"raw"
    }
}


test_delObjs(query)
return false

   
