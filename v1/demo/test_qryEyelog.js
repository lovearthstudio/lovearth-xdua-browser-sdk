const lovearth = require('../lib')


async function test_qryEyegrp() {
    const dua = await lovearth({
        APP_TOKEN:"eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NzE1NDg2NDYsIm5iZiI6MTU3MTU0ODY0NiwiaXNzIjoieGR1YS5jb20iLCJleHAiOjE4ODY5MDg2NDYsImF1ZCI6ImFIRVZZaEUxIiwic3ViIjoiQW5vTnltdVMiLCJqdGkiOiIxMjM0NTY3OCIsImNpcCI6IjE1OS4yMjYuMzkuMSIsImN1YSI6IkNhQ2xpZW50VWEiLCJkZXYiOiJVbml2ZXJzYWwiLCJvd24iOiJEdDVtdnJ0VSJ9.oIWr9ozhMgHQ7306p00B9RuBEw2tJrgZtZwHE0d6EC5L98Q7AhzCPMgJiVbyd0gYqgW4heWm1m1SJQcjq3G_x9OCq7B3EPFHJ99csT-vBYrXmuX2VszkY5IaxY_9UOJiiXTTvX69vNEg1yXjqvfuSb9sduyj33XqM3M371h7jpqqdVHzRMZq7C2gIsWdVEo1FW0zC9P20jwnkw6KNPxOz9qGxgk6D3itqRZ1_Fb9wQVBhgcChk0uHyIuhs84dn2tgLN4no_GkxvJdbJmNMwhjN7Z0wp0lcJwl-lAckg7hk-FjroPZwUBO2iEOByxfl88cmcuGyx1bZPWLQSp66mMJQ",
    })
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        shop:   "0EvpoxJ3",// 中国科学院计算技术研究所济南分所 这家企业的官方店铺
        role:   "lord"      // 以CEO身份登录
    })
    //console.log(res_login);
    console.log(JSON.stringify(res_login));
    
    api_name = "空间查询";
    qry_eyegrp_param={
        where     : {},
        page      : 1,
        limit     :5,
        order     :"name:desc"
    }


    res = await dua.qryEyegrp(qry_eyegrp_param)
    console.log(res);
    console.log(JSON.stringify(res));
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

test_qryEyegrp();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
