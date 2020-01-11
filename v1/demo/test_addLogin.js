const lovearth = require('../lib')

async function test_addLogin() {
    //--------------------------------------------------
    const dua = await lovearth({
        APP_TOKEN:"eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1Nzg3NTMzODYsIm5iZiI6MTU3ODc1MzM4NiwiaXNzIjoieGR1YS5jb20iLCJleHAiOjE4OTQxMTMzODYsImF1ZCI6ImFIRVZZaEUxIiwic3ViIjoiQW5vTnltdVMiLCJqdGkiOiIxMjM0NTY3OCIsImlwbSI6IjAuMC4wLjAvMCIsImRldiI6IioiLCJhcGkiOiIqIiwiY2xyIjoiWCIsIm93biI6IkR0NW12cnRVIiwidGlkIjoiRmlSc3RUa24iLCJsZ24iOiJudWxsIiwidHlwIjoiQSIsInpvbmUiOiJYZFVhWGR1QSIsImNvcnAiOiJYZFVhWGR1QSIsInNob3AiOiJYZFVhWGR1QSIsInJvbGUiOiJudWxsIiwicnVsZSI6Im51bGwifQ.sciSJVJdkEh7w1onorhoxFdygi6tKlawA2VcM-rghBDaGfQ-ytE0Zs1eOiA08wi9Oz54vXXrjh2oR4foyeJnFgM7R-rDxD-QgtFTwrtqttzVOQ4_5CGXPnPngbco_PM2FCFersM3BPyATG8_x-M0ODY7alQ_kx4rOBkwva9nIY4nIwBoJ0A9tlP54hoQWBIfPaYZM-NEnd89lHBmMdqcYtcqp0brwBYTZjvTWmP-eZu05tFIP-njUR-uSiDRgJV88N1UYP9hkNub57Gd626n6MSAGHtCLLqeP9KwLtD_4bUAm2Dtc096mAGRi4B6vhnJYAuOIzxcgRqyELA7XUUsZw"
    })
    api_name = "用户登录";
    login_param = {
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        shop:   "A3bdXNT3",
        role:   "god"
    }
    const res = await dua.login(login_param)
    if(res.status == 200){
        if(res.error == 0){
            got_ugrp_id = res.result.id;
            console.log(api_name+"成功 ");
        }else{
            got_ugrp_id = res.result.id;
            console.log(api_name+"失败 "+res.reason);
        }
    }else{
        console.log(res);
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
